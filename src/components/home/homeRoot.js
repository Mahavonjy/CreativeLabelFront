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
import {CreateBeatsPlaylist, SideBars, SideBarsMain} from "../functionTools/createFields";
import {
    addAllArtistTypes,
    addAllCountryAllowed,
    addAllEventsTypes,
    addAllMediaGenre,
    addBeatMakerBeats,
    addCarts,
    addOtherBeatMakerBeats,
    addOtherUserOptions,
    addOtherUserService,
    addPrefAllMediaGenre,
    addSimilarBeats,
    addTotalPrice,
    addUserCredentials,
} from "../functionTools/functionProps";
import {LoadingHome, Login} from "../functionTools/popupFields";
import {checkOnClickAwaySideBar} from "../functionTools/tools";
import OneBeat from "../modules/beatMaking/beats/allBeatsSuggestion/oneBeat";
import IslPlayer from "../players/players";
import {fetchUserData, insertUserData} from "./getAllCurrentUserData";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};

function HomeRoot() {

    let user_credentials;
    const history = useHistory();
    const dispatch = useDispatch();
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const toastGlobal = useSelector(state => state.Home.toastGlobal);

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
    let _bg = lightModeOn
        ? 'https://images.wallpaperscraft.com/image/texture_surface_dirty_138707_1920x1080.jpg'
        : 'https://images.wallpaperscraft.com/image/stars_patterns_black_133520_3840x2400.jpg'
    const [headers] = useState({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': "*",
        'Isl-Token': Conf.configs.TokenVisitor
    });

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
            HomeRoot.notOnline();
        });
    };

    HomeRoot.ifConnectionError = (err, func) => {
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

    HomeRoot.notOnline = () => {
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
                }).catch(err => HomeRoot.ifConnectionError(err)),
                axios.get("api/artist_types/all").then(resp => {
                    dispatch(addAllArtistTypes(resp.data.artist_types));
                    dispatch(addAllEventsTypes(resp.data.events));
                }).catch(err => HomeRoot.ifConnectionError(err)),
                axios.get("api/flags/check_country_and_city").then(resp => {
                    dispatch(addAllCountryAllowed(resp.data));
                }).catch(err => HomeRoot.ifConnectionError(err)),
                // axios.get("api/beats/AllSuggestion").then(resp => {
                //     new Promise(resolve => {
                //         resolve(dispatch(addBeats(resp.data["random"])));
                //         resolve(dispatch(newBeatMaker(resp.data["new_beatMaker"])));
                //         resolve(dispatch(topBeatMaker(resp.data["top_beatmaker"])));
                //         resolve(dispatch(latestBeats(resp.data["latest_beats"])));
                //         resolve(dispatch(discoveryBeats(resp.data["discovery_beats"])));
                //         resolve(dispatch(islBeats(resp.data["isl_playlist"])));
                //     }).then(r => null);
                // }).catch(err => HomeRoot.ifConnectionError(err))
            ]).then(() => checkSpecialRoute()).catch(() => HomeRoot.notOnline());
        }
    };

    HomeRoot.checkOpenSideBar = openSideBar;

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

    const online = () => {
        try {
            setLogName("Se déconnecter");
            setLogoutClass("icon icon-sign-out s-24 mr-5 text-red");
            let routeParsed = href[href.length - 1];
            if (routeParsed === 'register') {
                history.goBack();
                setLoading(false);
                return true
            } else {
                axios.get("api/users/if_token_valide", {headers: headers}).then(() => {
                    fetchUserData(headers, user_credentials, dispatch)
                }).catch(() => {
                    logout().then(r => null)
                });
            }
        } catch (e) {
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            HomeRoot.notOnline()
        }
    };

    const logout = async () => {
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
            } else await axios.delete("api/users/logout", {headers: headers}).then(() => null);
        } catch (e) {
            //
        } finally {
            await sessionService.deleteSession().then(async () => {
                await sessionService.deleteUser().then(async () => {
                    HomeRoot.beforeDataLoad().then(() => insertUserData(null, dispatch));
                }).catch(() => HomeRoot.beforeDataLoad().then(() => insertUserData(null, dispatch)))
            }).catch(() => HomeRoot.beforeDataLoad().then(() => insertUserData(null, dispatch)));
            setLogName("Se Connecter");
            headers['Isl-Token'] = Conf.configs.TokenVisitor
            setLogoutClass("icon icon-users-1 s-24 mr-5 text-red");
        }
    };

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
                                    isPlaying)}
                                {/* End SideBars */}
                            </aside>
                            <main style={{
                                // backgroundRepeat: "no-repeat",
                                // backgroundSize: "cover",
                                backgroundImage: 'url(' + _bg + ')'
                            }}>
                                {/* Main of SideBars */}
                                {SideBarsMain(
                                    addToPlaylist,
                                    single_beat,
                                    beats_similar,
                                    profile_checked,
                                    user_data,
                                    headers,
                                    location,
                                    history)}
                                {/* End main of SideBars */}
                            </main>
                        </React.Fragment>)}
                    />
                </Router>
                <nav className="relative width-80 fixed fixed-top">
                    <a href="/#" data-toggle="push-menu"
                       onClick={() => openSideBar ? setOpenSideBar(false) : setOpenSideBar(true)}
                       className="paper-nav-toggle pp-nav-toggle ml-4"><i/>
                    </a>
                </nav>
                {isPlaying && <IslPlayer key={key}/>}
            </div>
        );
    }
}

export default HomeRoot;
