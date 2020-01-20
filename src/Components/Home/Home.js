import React, {useEffect, useRef, useState} from "react";
import axios from 'axios';
import './Home.css';
import "../../assets/css/app.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import IslPlayer from "../Players/Players";
import Conf from "../../Config/tsconfig";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Tools from "../FunctionTools/Tools";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as PopupFields from "../FunctionTools/PopupFields";
import * as HomeProps from "../FunctionTools/FunctionProps";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

function Home () {

    let user_credentials;
    const dispatch = useDispatch();
    const beats = useSelector(state => state.beats.beats);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [href] = useState(window.location.href.split("/"));
    const [single_beat, setSingleBeat] = useState('');
    const [beats_similar, setBeatsSimilar] = useState([]);
    const [profile_checked, setProfileChecked] = useState('');
    const [user_data, setUserData] = useState('');
    const [state_cart, setStateCart] = useState(0);
    const [logout_class, setLogoutClass] = useState("icon icon-exit-2 s-24 mr-5");
    const [log_name, setLogName] = useState("logout");
    const [connexion_reloaded, setConnexionReloaded] = useState(0);

    Home.IncrementCart = (number) => {
        if (number)
            setStateCart(number);
        setStateCart(state_cart + 1)
    };

    Home.Decrement = () => {
        setStateCart(state_cart - 1)
    };

    const addToPlaylist = (index, type_, run, set_of_beats_name) => {
        ifStopPlayer[key] = false;
        if (!ifStopPlayer[key]) {
            key = Math.floor(Math.random() * Math.floor(999999999));
            ifStopPlayer[key] = true;
        }
        IslPlayer.startPlayerComponent(index, type_, run, set_of_beats_name);
    };

    const ifConnectionError = (err) => {
        setConnexionReloaded(connexion_reloaded + 1);
        try {
            if (err.response.data === "Connection error") {
                if (connexion_reloaded > 3) {
                    window.location.replace('/badConnexion')
                } else {
                    setTimeout(() => {
                        window.location.reload();
                    }, 5000);
                }
            } else if (err.response.data === "token invalid") {
                logout();
            } else {
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
            axios.get(Conf.configs.ServerApi + "api/beats/OneBeat/" + firstRouteParsing, {headers: headers}).then(resp => {
                dispatch(HomeProps.addBeatMakerBeats(resp.data['all_artist_beats']));
                dispatch(HomeProps.addSimilarBeats(resp.data['similar_beats']));
                setSingleBeat(resp.data['single_beat']);
                setLoading(false);
            }).catch(() => window.location.replace('/NotFound'))
        } else if (secondRouteParsing === "isl_artist_profile") {
            axios.get(Conf.configs.ServerApi + "api/profiles/check_other_profile/" + firstRouteParsing, {headers: headers}).then(resp =>{
                dispatch(HomeProps.addOtherBeatMakerBeats(resp.data['user_beats']));
                setProfileChecked(resp.data['profile_checked']);
                setUserData(resp.data['user_data']);
                setLoading(false);
            }).catch(() => {toast.error("Connection Error")})
        } else if (firstRouteParsing === 'Cart') {
            if (!state_cart)
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
            setStateCart(JSON.parse(localStorage.getItem("MyCarts")).length);
        } catch (e) {
            //
        } finally {
            Promise.all([
                axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: headers}).then(resp =>{
                    let tmp_arr = [];
                    for (let row in resp.data) {tmp_arr.push(resp.data[row].genre)}
                    dispatch(HomeProps.addAllMediaGenre(tmp_arr));
                    dispatch(HomeProps.addPrefAllMediaGenre(resp.data));
                }).catch(err => ifConnectionError(err)),
                axios.get(Conf.configs.ServerApi + "api/beats/AllSuggestion", {headers: headers}).then(resp => {
                    dispatch(HomeProps.addBeats(resp.data["random"]));
                    dispatch(HomeProps.newBeatMaker(resp.data["new_beatMaker"]));
                    dispatch(HomeProps.topBeatMaker(resp.data["top_beatmaker"]));
                    dispatch(HomeProps.latestBeats(resp.data["latest_beats"]));
                    dispatch(HomeProps.discoveryBeats(resp.data["discovery_beats"]));
                    dispatch(HomeProps.islBeats(resp.data["isl_playlist"]));
                }).catch(err => ifConnectionError(err))
            ]).then(() => CheckSpecialRoute()).catch(() => NotOnline());
        }
    };

    const Online = () => {
        try {
            let routeParsed = href[href.length - 1];
            if (routeParsed === 'register') {
                window.location.replace('/beats')
            } else if (routeParsed !== 'preference') {
                axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(err => {
                    try {
                        if (err.response.data === "no choice music genre") {
                            window.location.replace('/preference');
                        } else if (err.response.data === "token invalid") {
                            logout()
                        } else NotOnline()
                    } catch(e) {
                        window.location.replace('/badConnexion')
                    }
                });
            } else {
                axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: headers}).then(() => {
                    fetchUserData()
                }).catch(() => {
                    NotOnline()
                });
            }
        } catch (e) {
            setLogoutClass("icon icon-login s-24 mr-5");
            setLogName("Login");
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            NotOnline(headers)
        }
    };

    const fetchUserData = () => {
        Promise.all([
            axios.get(Conf.configs.ServerApi + "api/profiles/my_profile", {headers: headers}).then(resp => {
                dispatch(HomeProps.profileInitialisationInfo(resp.data['my_profile']));
                dispatch(HomeProps.profileInitialisationRole(resp.data['role']));
                dispatch(HomeProps.profileInitialisationFollower(resp.data['my_followers']));
                dispatch(HomeProps.profileInitialisationFollowing(resp.data['my_followings']));
                if (resp.data['role'] === "beatmaker") {
                    Promise.all([
                        axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                            dispatch(HomeProps.profileAddBeats(resp.data['beats']));
                        }).catch(err => ifConnectionError(err)),
                        axios.get(Conf.configs.ServerApi + "api/beats/contract/user_artist_contact", {headers: headers}).then(resp => {
                            dispatch(HomeProps.profileInitialisationContract(resp.data));
                        }).catch(err => ifConnectionError(err))
                    ]).then();
                    Tools.AddPropsCart(headers, HomeProps).then(() => null);
                } else Tools.AddPropsCart(headers, HomeProps).then(() => null);
            }).catch(err => ifConnectionError(err)),
            axios.get(Conf.configs.ServerApi + "api/beats/pricing", {headers: headers}).then(resp => {
                dispatch(HomeProps.beatsInitialisationPricing(resp.data));
            }).catch(err => ifConnectionError(err))
        ]).then(() => NotOnline()).catch(() => fetchUserData())
    };

    const logout = () => {
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
            } else {
                axios.delete(Conf.configs.ServerApi + "api/users/logout", {headers: headers}).then(() => {
                    localStorage.removeItem('Isl_Credentials');
                    window.location.replace('/beats');
                }).catch(() => {
                    localStorage.removeItem('Isl_Credentials');
                    // window.location.replace('/beats');
                })
            }
        } catch (e) {
            window.location.reload()
        }
    };

    useEffect( () => {
        setLoading(true);
        user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
        if (user_credentials) {
            dispatch(HomeProps.addUserCredentials(user_credentials));
            headers['Isl-Token'] = user_credentials.token;
            if (beats.length === 0) Online();
        } else {
            dispatch(HomeProps.addUserCredentials({token: Conf.configs.TokenVisitor}));
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
            if (beats.length === 0) NotOnline();
        }
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
                                {CreateFields.SideBars(state_cart, log_name, logout_class, location, history, headers, logout)}
                                {/* End SideBars */}
                            </aside>
                            <main>
                                {/* Main of SideBars */}
                                {CreateFields.SideBarsMain(addToPlaylist, single_beat, beats_similar, profile_checked, user_data)}
                                {/* End main of SideBars */}
                            </main>
                        </React.Fragment>)}
                    />
                </Router>
                <IslPlayer/>
            </div>
        );
    }
}

export default Home;
