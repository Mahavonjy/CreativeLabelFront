import axios from 'axios';
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, useHistory} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {sessionService} from 'redux-react-session';
import "../../assets/css/app.css";
import '../../assets/css/style/Home.css';
import Conf from "../../Config/tsconfig";
import OneBeat from "../BeatMaking/Beats/AllBeatsSuggestion/OneBeat";
import {CreateBeatsPlaylist, SideBars, SideBarsMain} from "../FunctionTools/CreateFields";
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
    beatsInitialisationPricing,
    changeUserGenreSelected,
    discoveryBeats,
    islBeats,
    latestBeats,
    newBeatMaker,
    profileAddBeats,
    profileInitialisationBanking,
    profileInitialisationCondition,
    profileInitialisationContract,
    profileInitialisationFollower,
    profileInitialisationFollowing,
    profileInitialisationInfo,
    profileInitialisationRole,
    topBeatMaker,
} from "../FunctionTools/FunctionProps";
import * as PopupFields from "../FunctionTools/PopupFields";
import {checkOnClickAwaySideBar, FillInCartProps} from "../FunctionTools/Tools";
import IslPlayer from "../Players/Players";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

function Home() {

    let user_credentials;
    const history = useHistory();
    const dispatch = useDispatch();
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
    const beats = useSelector(state => state.beats.beats);
    const ifUserGenreSelected = useSelector(state => state.Others.ifUserGenreSelected);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [openSideBar, setOpenSideBar] = useState(false);
    const [href] = useState(window.location.href.split("/"));
    const [single_beat, setSingleBeat] = useState('');
    const [beats_similar, setBeatsSimilar] = useState([]);
    const [profile_checked, setProfileChecked] = useState('');
    const [user_data, setUserData] = useState('');
    const [state_cart_length, setStateCartLength] = useState(0);
    const [logout_class, setLogoutClass] = useState("icon icon-users-1 s-24 mr-5 text-red");
    const [log_name, setLogName] = useState("Se Connecter");
    const [connexion_reloaded, setConnexionReloaded] = useState(0);

    Home.IncrementCart = (number) => {
        if (number)
            setStateCartLength(number);
        else setStateCartLength(state_cart_length + 1)
    };

    Home.Decrement = () => {
        setStateCartLength(state_cart_length - 1)
    };

    Home.beforeDataLoad = async () => {
        setLoading(true);
        await sessionService.loadSession().then((currentSession) => {
            sessionService.loadUser().then((data) => {
                let user_data = {name: data.name, email: data.email, token: currentSession.token};
                dispatch(addUserCredentials(user_data));
                user_credentials = user_data;
            });
            headers['Isl-Token'] = currentSession.token;
            if (beats.length === 0) Online();
        }).catch(() => {
            dispatch(addUserCredentials({token: Conf.configs.TokenVisitor}));
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            if (beats.length === 0) NotOnline();
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

    const CheckSpecialRoute = () => {
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
            axios.get("api/profiles/check_other_profile/" + firstRouteParsing, {headers: headers}).then(resp => {
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
        } else {
            setLoading(false);
            if (firstRouteParsing === "beats#LoginRequire")
                document.getElementsByClassName("LoginRequire")[0].click();
        }
    };

    const NotOnline = () => {
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
            ]).then(() => CheckSpecialRoute()).catch(() => NotOnline());
        }
    };

    const Online = () => {
        try {
            setLogName("Se déconnecter");
            setLogoutClass("icon icon-shutdown s-24 mr-5 text-red");
            let routeParsed = href[href.length - 1];
            if (routeParsed === 'register') {
                history.goBack();
                setLoading(false);
                return true
            } else if (routeParsed !== 'preference') {
                axios.get("api/users/if_choice_user_status", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(err => {
                    try {
                        if (err.response.data === "no choice music genre") {
                            history.push("/preference");
                            NotOnline()
                        } else if (err.response.data === "token invalid") {
                            logout().then(() => null)
                        } else NotOnline()
                    } catch (e) {
                        history.push("/badConnexion");
                    }
                });
            } else {
                axios.get("api/users/if_choice_user_status", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(() => {
                    NotOnline()
                });
            }
        } catch (e) {
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            NotOnline(headers)
        }
    };

    const fetchUserData = () => {
        Promise.all([
            axios.get("api/profiles/my_profile", {headers: headers}).then(resp => {
                new Promise(resolve => {
                    resolve(dispatch(addUserNote(resp.data['notes'])));
                    resolve(dispatch(addPaymentHistory(resp.data['payment_history'])));
                    resolve(dispatch(profileInitialisationInfo(resp.data['my_profile'])));
                    resolve(dispatch(profileInitialisationRole(resp.data['role'])));
                    resolve(dispatch(addAllUSerReservation(resp.data['reservations_list'])));
                    resolve(dispatch(addAllUSerBookingReservation(resp.data['reservations_booking_list'])));
                    resolve(dispatch(addAllUSerBookingReservation(resp.data['reservations_booking_list'])));
                    resolve(dispatch(profileInitialisationFollower(resp.data['my_followers'])));
                    resolve(dispatch(profileInitialisationFollowing(resp.data['my_followings'])));
                    resolve(dispatch(profileInitialisationCondition(resp.data['conditions'])));
                    resolve(dispatch(profileInitialisationBanking(resp.data['banking'])));
                }).then(r => null);
                if (resp.data['role'] === "beatmaker") {
                    Promise.all([
                        axios.get("api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                            dispatch(profileAddBeats(resp.data['beats']));
                        }).catch(err => ifConnectionError(err, fetchUserData)),
                        axios.get("api/beats/contract/user_artist_contract", {headers: headers}).then(resp => {
                            dispatch(profileInitialisationContract(resp.data));
                        }).catch(err => ifConnectionError(err, fetchUserData))
                    ]).then();
                }
                FillInCartProps(headers, {
                    addTotalPrice: addTotalPrice,
                    addCarts: addCarts,
                    dispatch: dispatch,
                    user_credentials: user_credentials
                }).then(() => null);
            }).catch(err => ifConnectionError(err, fetchUserData)),
            axios.get("api/beats/pricing", {headers: headers}).then(resp => {
                dispatch(beatsInitialisationPricing(resp.data));
            }).catch(err => ifConnectionError(err)),
            axios.get("api/artist_services/my_services", {headers: headers}).then(resp => {
                dispatch(addAllUserOptions(resp.data['user_options']));
                dispatch(addAllUserPrestation(resp.data['user_services']));
            }).catch(err => ifConnectionError(err))
        ]).then(() => {
            dispatch(changeUserGenreSelected());
            NotOnline()
        }).catch(() => fetchUserData())
    };

    const logout = async () => {
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
            } else {
                axios.delete("api/users/logout", {headers: headers}).then(() => null);
                await sessionService.deleteSession().then(() => null);
                await sessionService.deleteUser().then(() => null);
                window.location.replace('/beats');
            }
        } catch (e) {
            await sessionService.deleteSession().then(() => null);
            await sessionService.deleteUser().then(() => null);
            window.location.reload()
        }
    };

    Home.checkOpenSideBar = openSideBar;

    useEffect(() => {

        Home.beforeDataLoad().then(() => null);
        document.addEventListener('mousedown', (e) => checkOnClickAwaySideBar(e));

        return () => {
            isMounted.current = true
        };
    }, []);

    if (loading) {
        // Here is Loading page
        return (PopupFields.LoadingHome());
    } else {
        return (
            <div>
                <ToastContainer style={{zIndex: 999}}/>
                {/* Popup Login */}
                {PopupFields.Login()}
                {/* End of Popup */}
                <Router>
                    <Route render={({location, history}) => (
                        <React.Fragment>
                            <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas"
                                   // onMouseEnter={() => !openSideBar && document.getElementsByClassName("paper-nav-toggle pp-nav-toggle pl-2 ml-4")[0].click()}
                                   // onMouseLeave={() => document.getElementsByClassName("paper-nav-toggle pp-nav-toggle pl-2 ml-4")[0].click()}
                            >
                                {/* SideBars with ICON */}
                                {SideBars(state_cart_length, log_name, logout_class, location, history, headers, logout, isPlaying, ifUserGenreSelected, openSideBar)}
                                {/* End SideBars */}
                            </aside>
                            <main>
                                {/* Main of SideBars */}
                                {SideBarsMain(addToPlaylist, single_beat, beats_similar, profile_checked, user_data, headers, location, history, service_to_show)}
                                {/* End main of SideBars */}
                            </main>
                        </React.Fragment>)}
                    />
                </Router>
                {isPlaying ? <IslPlayer key={key}/> :
                    <nav className="relative fixed fixed-bottom">
                        <a href="/#" data-toggle="push-menu" data-tip="Ouvrir le menu"
                           onClick={() => openSideBar ? setOpenSideBar(false): setOpenSideBar(true)}
                           className="paper-nav-toggle pp-nav-toggle pl-2 ml-4">
                            <i/>
                        </a>
                    </nav>}
            </div>
        );
    }
}

export default Home;
