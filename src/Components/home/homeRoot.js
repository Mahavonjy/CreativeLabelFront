import axios from 'axios';
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {sessionService} from 'redux-react-session';
import "../../assets/css/app.css";
import '../../assets/css/style/Home.css';
import "../../assets/css/style/style.scss";
import Conf from "../../config/tsconfig";
import OneBeat from "../beatMaking/beats/allBeatsSuggestion/oneBeat";
import {CreateBeatsPlaylist, SideBars, SideBarsMain} from "../functionTools/createFields";
import {
    addAllArtistTypes,
    addAllCountryAllowed,
    addAllEventsTypes,
    addAllMediaGenre,
    addAllUSerBookingReservation,
    addAllUserOptions,
    addAllUserPrestation,
    addAllUSerReservation,
    addBeatMakerBeats,
    addBeats,
    addCarts,
    addOtherBeatMakerBeats,
    addOtherUserOptions,
    addOtherUserService,
    addPaymentHistory,
    addPrefAllMediaGenre,
    addSimilarBeats,
    addTotalPrice,
    addUserCredentials,
    addUserNote,
    // beatsInitialisationPricing, // add if beatMaking is active
    changeUserGenreSelected,
    discoveryBeats,
    islBeats,
    latestBeats,
    newBeatMaker,
    // profileAddBeats, // add if beatMaking is active
    profileInitialisationBanking,
    profileInitialisationCondition,
    // profileInitialisationContract, // add if beatMaking is active
    profileInitialisationFollower,
    profileInitialisationFollowing,
    profileInitialisationInfo,
    profileInitialisationRole,
    topBeatMaker,
} from "../functionTools/functionProps";
import {LoadingHome, Login} from "../functionTools/popupFields";
import {checkOnClickAwaySideBar, dispatchPayment, FillInCartProps} from "../functionTools/tools";
import IslPlayer from "../players/players";
import "../../assets/css/style/style.scss";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

function HomeRoot() {

    let user_credentials;
    const history = useHistory();
    const dispatch = useDispatch();
    const toastGlobal = useSelector(state => state.Home.toastGlobal);
    const ifUserGenreSelected = useSelector(state => state.Others.ifUserGenreSelected);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [href] = useState(window.location.href.split("/"));
    const [single_beat, setSingleBeat] = useState('');
    /* eslint-disable-next-line no-unused-vars */
    const [beats_similar, setBeatsSimilar] = useState([]);
    const [profile_checked, setProfileChecked] = useState('');
    const [user_data, setUserData] = useState('');
    const [state_cart_length, setStateCartLength] = useState(0);
    const [logout_class, setLogoutClass] = useState("icon icon-users-1 s-24 mr-5 text-red");
    const [log_name, setLogName] = useState("Se Connecter");
    const [connexion_reloaded, setConnexionReloaded] = useState(0);

    HomeRoot.IncrementCart = (number) => {
        if (number)
            setStateCartLength(number);
        else setStateCartLength(state_cart_length + 1)
    };

    HomeRoot.Decrement = () => {
        setStateCartLength(state_cart_length - 1)
    };

    HomeRoot.beforeDataLoad = async () => {
        setLoading(true);
        await sessionService.loadSession().then((currentSession) => {
            sessionService.loadUser().then((data) => {
                let user_data = {name: data.name, email: data.email, token: currentSession.token};
                dispatch(addUserCredentials(user_data));
                user_credentials = user_data;
            });
            headers['Isl-Token'] = currentSession.token;
            online();
        }).catch(() => {
            dispatch(addUserCredentials({token: Conf.configs.TokenVisitor}));
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            notOnline();
        });
    };

    const addToPlaylist = async (index, type_, run, height_div, set_of_beats_name, states, state_value) => {
        if (!isPlaying) {
            await setIsPlaying(true);
            CreateBeatsPlaylist.changeIndex(index);
            if (height_div === "single")
                OneBeat.PauseOrPlaySingle(index);
        }
        ifStopPlayer[key] = false;
        if (!ifStopPlayer[key]) {
            key = Math.floor(Math.random() * Math.floor(999999999));
            ifStopPlayer[key] = true;
        }
        await IslPlayer.startPlayerComponent(index, type_, run, height_div, set_of_beats_name, states, state_value);
    };

    const ifConnectionError = (err, func) => {
        setConnexionReloaded(connexion_reloaded + 1);
        try {
            if (err.response.data === "Connection error") {
                if (connexion_reloaded > 3) {
                    history.push("/badConnexion");
                    setLoading(false);
                } else {
                    if (func) func();
                    else
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                }
            } else if (err.response.data === "token invalid") {
                logout().then(r => null);
            } else {
                if (func) func();
                else
                    logout().then(r => null);
            }
        } catch (e) {
            //
        }
    };

    const checkSpecialRoute = () => {
        let firstRouteParsing = href[href.length - 1];
        let secondRouteParsing = href[href.length - 2];
        if (secondRouteParsing === "CheckThisBeat") {
            axios.get("api/beats/OneBeat/" + firstRouteParsing, {headers: headers}).then(resp => {
                dispatch(addBeatMakerBeats(resp.data['all_artist_beats']));
                dispatch(addSimilarBeats(resp.data['similar_beats']));
                setSingleBeat(resp.data['single_beat']);
                setLoading(false);
            }).catch(() => {
                history.push("/BeatsNotFound");
                setLoading(false);
            })
        } else if (secondRouteParsing === "isl_artist_profile") {
            axios.get("api/profiles/check_other_profile/" + firstRouteParsing,
                {headers: headers}).then(resp => {
                dispatch(addOtherBeatMakerBeats(resp.data['user_beats']));
                dispatch(addOtherUserOptions(resp.data['user_options']));
                dispatch(addOtherUserService(resp.data['user_services']));
                setProfileChecked(resp.data['profile_checked']);
                setUserData(resp.data['user_data']);
                setLoading(false);
            }).catch(() => {
                history.push("/ArtistNotFound");
                setLoading(false);
            })
        } else if (firstRouteParsing === 'Cart') {
            if (!state_cart_length) {
                history.push("/beats");
                setLoading(false);
            } else setLoading(false);
        } else setLoading(false);
    };

    const notOnline = () => {
        try {
            let tmp_carts = JSON.parse(localStorage.getItem("MyCarts"));
            setStateCartLength(tmp_carts.length);
            let tmp = 0;
            for (let cart in tmp_carts) tmp = tmp + tmp_carts[cart].price;
            dispatch(addCarts(tmp_carts));
            dispatch(addTotalPrice(Math.round(tmp * 100) / 100));
        } catch (e) {
            //
        } finally {
            Promise.all([
                axios.get("api/medias/allMediaGenre").then(resp => {
                    let tmp_arr = [];
                    for (let row in resp.data) tmp_arr.push(resp.data[row].genre);
                    dispatch(addAllMediaGenre(tmp_arr));
                    dispatch(addPrefAllMediaGenre(resp.data));
                }).catch(err => ifConnectionError(err)),
                axios.get("api/artist_types/all").then(resp => {
                    dispatch(addAllArtistTypes(resp.data.artist_types));
                    dispatch(addAllEventsTypes(resp.data.events));
                }).catch(err => ifConnectionError(err)),
                axios.get("api/flags/check_country_and_city").then(resp => {
                    dispatch(addAllCountryAllowed(resp.data));
                }).catch(err => ifConnectionError(err)),
                axios.get("api/beats/AllSuggestion").then(resp => {
                    new Promise(resolve => {
                        resolve(dispatch(addBeats(resp.data["random"])));
                        resolve(dispatch(newBeatMaker(resp.data["new_beatMaker"])));
                        resolve(dispatch(topBeatMaker(resp.data["top_beatmaker"])));
                        resolve(dispatch(latestBeats(resp.data["latest_beats"])));
                        resolve(dispatch(discoveryBeats(resp.data["discovery_beats"])));
                        resolve(dispatch(islBeats(resp.data["isl_playlist"])));
                    }).then(r => null);
                }).catch(err => ifConnectionError(err))
            ]).then(() => checkSpecialRoute()).catch(() => notOnline());
        }
    };

    const online = () => {
        try {
            setLogName("Se déconnecter");
            setLogoutClass("icon icon-shutdown s-24 mr-5 text-red");
            let routeParsed = href[href.length - 1];
            if (routeParsed === 'register') {
                history.goBack();
                setLoading(false);
                return true
            } else {
                axios.get("api/users/if_token_valide", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(() => {
                    notOnline()
                });
            }
        } catch (e) {
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            notOnline(headers)
        }
    };

    const insertUserData = (data) => {
        new Promise(resolve => {
            resolve(dispatch(addUserNote(data ? data['notes'] : '')));
            resolve(dispatch(addPaymentHistory(data ? data['payment_history'] : [])));
            resolve(dispatch(profileInitialisationInfo(data ? data['my_profile'] : '')));
            resolve(dispatch(profileInitialisationRole(data ? data['role'] : '')));
            resolve(dispatch(addAllUSerReservation(data ? data['reservations_list'] : [])));
            resolve(dispatch(addAllUSerBookingReservation(data ? data['reservations_booking_list'] : [])));
            resolve(dispatch(addAllUSerBookingReservation(data ? data['reservations_booking_list'] : [])));
            resolve(dispatch(profileInitialisationFollower(data ? data['my_followers'] : '')));
            resolve(dispatch(profileInitialisationFollowing(data ? data['my_followings'] : '')));
            resolve(dispatch(profileInitialisationCondition(data ? data['conditions'] : {})));
            resolve(dispatch(profileInitialisationBanking(data ? data['banking'] : {})));
        }).then(r => {
            if (!data) {
                dispatch(addAllUserOptions([]));
                dispatch(addAllUserPrestation([]));
            }
        });
    };

    const fetchUserData = () => {
        Promise.all([
            axios.get("api/profiles/my_profile", {headers: headers}).then(resp => {
                let payment_history = resp.data['payment_history'];
                dispatchPayment(payment_history, dispatch);
                insertUserData(resp.data);
                // if (resp.data['role'] === "beatmaker") {
                //     Promise.all([
                //         axios.get("api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                //             dispatch(profileAddBeats(resp.data['beats']));
                //         }).catch(err => ifConnectionError(err, fetchUserData)),
                //         axios.get("api/beats/contract/user_artist_contract", {headers: headers}).then(resp => {
                //             dispatch(profileInitialisationContract(resp.data));
                //         }).catch(err => ifConnectionError(err, fetchUserData))
                //     ]).then();
                // }
                FillInCartProps(headers, {
                    addTotalPrice: addTotalPrice,
                    addCarts: addCarts,
                    dispatch: dispatch,
                    user_credentials: user_credentials
                }).then(() => null);
            }).catch(err => ifConnectionError(err, fetchUserData)),
            // axios.get("api/beats/pricing", {headers: headers}).then(resp => {
            //     dispatch(beatsInitialisationPricing(resp.data));
            // }).catch(err => ifConnectionError(err)),
            axios.get("api/artist_services/my_services", {headers: headers}).then(resp => {
                dispatch(addAllUserOptions(resp.data['user_options']));
                dispatch(addAllUserPrestation(resp.data['user_services']));
            }).catch(err => ifConnectionError(err))
        ]).then(() => {
            dispatch(changeUserGenreSelected());
            notOnline()
        }).catch(() => fetchUserData())
    };

    const logout = async () => {
        // setLoading(true);
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
            } else await axios.delete("api/users/logout", {headers: headers}).then(() => null);
        } catch (e) {
            //
        } finally {
            setLogName("Se Connecter");
            await sessionService.deleteSession().then(async () => {
                await sessionService.deleteUser().then(async () => {
                    HomeRoot.beforeDataLoad().then(() => insertUserData());
                }).catch(() => HomeRoot.beforeDataLoad().then(() => insertUserData()))
            }).catch(() => HomeRoot.beforeDataLoad().then(() => insertUserData()));
            setLogoutClass("icon icon-users-1 s-24 mr-5 text-red");
        }
    };

    HomeRoot.checkOpenSideBar = openSideBar;

    useEffect(() => {
        HomeRoot.beforeDataLoad().then(() => null);
        document.addEventListener('mousedown', (e) => checkOnClickAwaySideBar(e));

        return () => {
            isMounted.current = true
        };
    }, []);

    if (loading) {
        // Here is Loading page
        return (LoadingHome());
    } else {
        return (
            <div>
                {toastGlobal && <ToastContainer style={{zIndex: 999}}/>}
                {/* Popup login */}
                {Login()}
                {/* End of Popup */}
                <Router>
                    <Route render={({location, history}) => (
                        <React.Fragment>
                            <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas">
                                {/* SideBars with ICON */}
                                {SideBars(
                                    state_cart_length,
                                    log_name,
                                    logout_class,
                                    location,
                                    history,
                                    headers,
                                    logout,
                                    isPlaying,
                                    ifUserGenreSelected,
                                    openSideBar)}
                                {/* End SideBars */}
                            </aside>
                            <main>
                                {/* Main of SideBars */}
                                {SideBarsMain(
                                    addToPlaylist,
                                    single_beat,
                                    beats_similar,
                                    profile_checked,
                                    user_data,
                                    headers,
                                    location,
                                    history,
                                    service_to_show)}
                                {/* End main of SideBars */}
                            </main>
                        </React.Fragment>)}
                    />
                </Router>
                <nav className="relative width-80 fixed fixed-top">
                    <a href="/#" data-toggle="push-menu"
                       onClick={() => openSideBar ? setOpenSideBar(false) : setOpenSideBar(true)}
                       className="paper-nav-toggle pp-nav-toggle pl-2 ml-4"><i/>
                    </a>
                </nav>
                {isPlaying && <IslPlayer key={key}/>}
            </div>
        );
    }
}

export default HomeRoot;
