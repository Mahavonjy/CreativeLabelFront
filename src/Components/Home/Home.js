import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import './Home.css';
import "../../assets/css/app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IslPlayer from "../Players/Players";
import Conf from "../../Config/tsconfig";
import { useSelector, useDispatch } from "react-redux";
import { FillInCartProps } from "../FunctionTools/Tools";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as PopupFields from "../FunctionTools/PopupFields";
import OneBeat from "../BeatMaking/Beats/AllBeatsSuggestion/OneBeat";
import { sessionService } from 'redux-react-session';
import {
    addBeatMakerBeats, addSimilarBeats, addOtherBeatMakerBeats, addAllMediaGenre, addPrefAllMediaGenre,
    addBeats, newBeatMaker, topBeatMaker, latestBeats, discoveryBeats, islBeats, profileInitialisationInfo,
    profileInitialisationRole, profileInitialisationFollower, profileInitialisationFollowing, profileAddBeats,
    profileInitialisationContract, addTotalPrice, addCarts, beatsInitialisationPricing, addAllArtistTypes,
    addAllCountryAllowed, addOtherUserService, addOtherUserOptions, addUserCredentials, addAllUserPrestation,
    addAllUserOptions

} from "../FunctionTools/FunctionProps";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

function Home () {

    let user_credentials;
    const dispatch = useDispatch();
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
    const beats = useSelector(state => state.beats.beats);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [href] = useState(window.location.href.split("/"));
    const [single_beat, setSingleBeat] = useState('');
    const [beats_similar, setBeatsSimilar] = useState([]);
    const [profile_checked, setProfileChecked] = useState('');
    const [user_data, setUserData] = useState('');
    const [state_cart_length, setStateCartLength] = useState(0);
    const [logout_class, setLogoutClass] = useState("icon icon-login s-24 mr-5");
    const [log_name, setLogName] = useState("Login");
    const [connexion_reloaded, setConnexionReloaded] = useState(0);

    Home.IncrementCart = (number) => {
        if (number)
            setStateCartLength(number);
        else setStateCartLength(state_cart_length + 1)
    };

    Home.Decrement = () => {
        setStateCartLength(state_cart_length - 1)
    };

    const addToPlaylist = async (index, type_, run, height_div, set_of_beats_name, states, state_value) => {
        if (!isPlaying) {
            await setIsPlaying(true);
            CreateFields.CreateBeatsPlaylist.changeIndex(index);
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
                    window.location.replace('/badConnexion')
                } else {
                    if (func) func();
                    else
                        setTimeout(() => {
                            window.location.reload();
                        }, 5000);
                }
            } else if (err.response.data === "token invalid") {
                logout();
            } else {
                if (func) func();
                else
                    logout();
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
            }).catch(() => window.location.replace("/BeatsNotFound") )
        } else if (secondRouteParsing === "isl_artist_profile") {
            axios.get("api/profiles/check_other_profile/" + firstRouteParsing, {headers: headers}).then(resp =>{
                dispatch(addOtherBeatMakerBeats(resp.data['user_beats']));
                dispatch(addOtherUserOptions(resp.data['user_options']));
                dispatch(addOtherUserService(resp.data['user_services']));
                setProfileChecked(resp.data['profile_checked']);
                setUserData(resp.data['user_data']);
                setLoading(false);
            }).catch(() => window.location.replace("/ArtistNotFound"))
        } else if (firstRouteParsing === 'Cart') {
            if (!state_cart_length)
                window.location.replace('/beats');
            else setLoading(false);
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
                axios.get("api/medias/allMediaGenre").then(resp =>{
                    let tmp_arr = [];
                    for (let row in resp.data) {tmp_arr.push(resp.data[row].genre)}
                    dispatch(addAllMediaGenre(tmp_arr));
                    dispatch(addPrefAllMediaGenre(resp.data));
                }).catch(err => ifConnectionError(err)),
                axios.get("api/artist_types/all").then(resp => {
                    dispatch(addAllArtistTypes(resp.data.artist_types));
                }).catch(err => ifConnectionError(err)),
                axios.get("api/flags/check_country_and_city").then(resp => {
                    dispatch(addAllCountryAllowed(resp.data));
                }).catch(err => ifConnectionError(err)),
                axios.get( "api/beats/AllSuggestion").then(resp => {
                    dispatch(addBeats(resp.data["random"]));
                    dispatch(newBeatMaker(resp.data["new_beatMaker"]));
                    dispatch(topBeatMaker(resp.data["top_beatmaker"]));
                    dispatch(latestBeats(resp.data["latest_beats"]));
                    dispatch(discoveryBeats(resp.data["discovery_beats"]));
                    dispatch(islBeats(resp.data["isl_playlist"]));
                }).catch(err => ifConnectionError(err))
            ]).then(() => CheckSpecialRoute()).catch(() => NotOnline());
        }
    };

    const Online = () => {
        try {
            setLogName("logout");
            setLogoutClass("icon icon-exit-2 s-24 mr-5");
            let routeParsed = href[href.length - 1];
            if (routeParsed === 'register') {
                window.location.replace('/beats')
            } else if (routeParsed !== 'preference') {
                axios.get( "api/users/if_choice_user_status", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(err => {
                    try {
                        if (err.response.data === "no choice music genre") {
                            window.location.replace('/preference');
                        } else if (err.response.data === "token invalid") {
                            logout().then(() => null)
                        } else NotOnline()
                    } catch(e) {
                        window.location.replace('/badConnexion')
                    }
                });
            } else {
                axios.get( "api/users/if_choice_user_status", {headers: headers}).then(() => {
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
            axios.get( "api/profiles/my_profile", {headers: headers}).then(resp => {
                dispatch(profileInitialisationInfo(resp.data['my_profile']));
                dispatch(profileInitialisationRole(resp.data['role']));
                dispatch(profileInitialisationFollower(resp.data['my_followers']));
                dispatch(profileInitialisationFollowing(resp.data['my_followings']));
                if (resp.data['role'] === "beatmaker") {
                    Promise.all([
                        axios.get( "api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                            dispatch(profileAddBeats(resp.data['beats']));
                        }).catch(err => ifConnectionError(err, fetchUserData)),
                        axios.get( "api/beats/contract/user_artist_contact", {headers: headers}).then(resp => {
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
            axios.get( "api/beats/pricing", {headers: headers}).then(resp => {
                dispatch(beatsInitialisationPricing(resp.data));
            }).catch(err => ifConnectionError(err)),
            axios.get( "api/artist_services/my_services", {headers: headers}).then(resp => {
                dispatch(addAllUserOptions(resp.data['user_options']));
                dispatch(addAllUserPrestation(resp.data['user_services']));
            }).catch(err => ifConnectionError(err))
        ]).then(() => NotOnline()).catch(() => fetchUserData())
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

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await sessionService.loadSession().then((currentSession) => {
                sessionService.loadUser().then((data) => {
                    let user_data = {
                        name: data.name,
                        email: data.email,
                        token: currentSession.token
                    };
                    dispatch(addUserCredentials(user_data));
                    user_credentials = user_data;
                });
                headers['Isl-Token'] = currentSession.token;
                if (beats.length === 0) Online();
            }).catch(() => {
                dispatch(addUserCredentials({ token: Conf.configs.TokenVisitor }));
                headers['Isl-Token'] = Conf.configs.TokenVisitor;
                if (beats.length === 0) NotOnline();
            });
        }
        fetchData().then(() => null);
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
                {/* Popup Login */}
                {PopupFields.Login()}
                {/* End of Popup */}
                <Router>
                    <Route render={({ location, history }) => (
                        <React.Fragment>
                            <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas">
                                {/* SideBars with ICON */}
                                {CreateFields.SideBars(state_cart_length, log_name, logout_class, location, history, headers, logout, isPlaying)}
                                {/* End SideBars */}
                            </aside>
                            <main>
                                {/* Main of SideBars */}
                                {CreateFields.SideBarsMain(addToPlaylist, single_beat, beats_similar, profile_checked, user_data, headers)}
                                {/* End main of SideBars */}
                            </main>
                        </React.Fragment>)}
                    />
                </Router>
                {isPlaying && <IslPlayer key={key}/>}
            </div>
        );
    }
}

export default Home;
