import './Home.css';
import React, { Component } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
// import Music from '../Music/Music';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Profile from "../Profile/Profile";
import Beats from "../Beats/Beats";
import Cart from "../Cart/Cart";
import IslPlayer from "../Players/Players";
// import PlayList from "../Playlist/Playlist";
import Conf from "../../Config/tsconfig";
import './Home.css';
import Loader from 'react-loader-spinner'
import {connect} from "react-redux";
import Modal from "react-awesome-modal";
import OneBeat from "../Beats/OneBeat";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import {toast} from "react-toastify";
import SignInOrUp from "../SingnInOrUp/SignInOrUp";
import Register from "../Register/Register";
import Preference from "../Preference/SongGenre";

let key = Math.floor(Math.random() * Math.floor(999999999));
let cookies = new Cookies();
let ifStopPlayer = {};
let headers;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, loading: false, redirect: false,
            href: window.location.href.split("/"),
            single_beat: '', all_artist_beats: [], beats_similar: [],
            profile_checked: '', user_data: '', user_beats: [],
            logout_class: "icon icon-exit-2 s-24", log_name: "logout"
        };
    }

    redirectToLogin = () => {this.setState({redirect: true})};

    addToPlaylist = (index, type_, component) => {
        ifStopPlayer[key] = false;
        if (!ifStopPlayer[key]) {
            key = Math.floor(Math.random() * Math.floor(999999999));
            ifStopPlayer[key] = true;
        }
        IslPlayer.startPlayerComponent(index, type_, component);
    };

    ifConnectionError = (err) => {
        try {
            if (err.response.data === "Connection error") {
                setTimeout(() => {
                    this.componentDidMount();
                }, 5000);
            } else if (err.response.data === "token invalid") {
                this.logout();
            } else {
                this.logout();
            }
        } catch (e) {
            this.logout();
        }
    };

    NotOnline = (headers_) => {
        axios.get(Conf.configs.ServerApi + "api/beats/AllSuggestion", {headers: headers_}).then(resp => {
            this.props.addBeats(resp.data["random"]);
            this.props.newBeatMaker(resp.data["new_beatMaker"]);
            this.props.topBeatMaker(resp.data["top_beatmaker"]);
            this.props.latestBeats(resp.data["latest_beats"]);
            this.props.discoveryBeats(resp.data["discovery_beats"]);
            this.props.islBeats(resp.data["isl_playlist"]);
            if (this.state.href[this.state.href.length - 2] === "CheckThisBeat") {
                axios.get(Conf.configs.ServerApi + "api/beats/OneBeat/" + this.state.href[this.state.href.length -1], {headers: headers_}).then(resp =>{
                    this.setState({
                        single_beat: resp.data['single_beat'],
                        all_artist_beats: resp.data['all_artist_beats'],
                        beats_similar: resp.data['similar_beats']
                    }, () => {
                        this.setState({loading: false})
                    })
                }).catch(err => {
                    toast.error("Connection Error")
                })
            } else if (this.state.href[this.state.href.length - 2] === "isl_artist_profile") {
                axios.get(Conf.configs.ServerApi + "api/profiles/check_other_profile/" + this.state.href[this.state.href.length -1], {headers: headers_}).then(resp =>{
                    this.setState({
                        profile_checked: resp.data['profile_checked'],
                        user_data: resp.data['user_data'],
                        user_beats: resp.data['user_beats']
                    }, () => {
                        this.setState({loading: false})
                    })
                }).catch(err => {
                    toast.error("Connection Error")
                })
            } else {
                this.setState({loading: false}, () => {
                    if (this.state.href[this.state.href.length - 1] === "home#LoginRequire")
                        document.getElementsByClassName("LoginRequire")[0].click();
                })
            }
        }).catch(err => {
            console.log(err)
        });
    };

    componentDidMount() {
        this.setState({isMounted: true }, () => {
            if (this.props.beats.length === 0) {
                this.setState({loading: true}, () => {
                    try {
                        headers = {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': "*",
                            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
                        };
                        axios.get(Conf.configs.ServerApi + "api/beats/pricing", {headers: headers}).then(resp => {
                            this.props.beats_initialisation_pricing(resp.data);
                            axios.get(Conf.configs.ServerApi + "api/profiles/my_profile", {headers: headers}).then(resp => {
                                this.props.profile_initialisation_info(resp.data['my_profile']);
                                this.props.profile_initialisation_role(resp.data['role']);
                                this.props.profile_initialisation_follower(resp.data['my_followers']);
                                this.props.profile_initialisation_following(resp.data['my_followings']);
                                if (resp.data['role'] === "Artist") {
                                    axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                                        this.props.profile_add_beats(resp.data['beats']);
                                        this.props.profile_add_single(resp.data['music']);
                                        this.props.profile_add_albums(resp.data['albums']);
                                        axios.get(Conf.configs.ServerApi + "api/beats/contract/user_artist_contact", {headers: headers}).then(resp => {
                                            this.props.profile_initialisation_contract(resp.data);
                                            this.NotOnline(headers)
                                        }).catch(err => {
                                            this.ifConnectionError(err);
                                        })
                                    }).catch(err => {
                                        console.log(err.response)
                                    })
                                }
                            }).catch(err => {
                                this.ifConnectionError(err);
                            });
                        }).catch(err => {
                            this.ifConnectionError(err);
                        });
                    } catch (e) {
                        this.setState({logout_class: "icon icon-login s-24", log_name: "login"}, () => {
                            headers = {
                                'Content-Type': 'application/json',
                                'Access-Control-Allow-Origin': "*",
                                'Isl-Token': Conf.configs.TokenVisitor
                            };
                            this.NotOnline(headers)
                        });
                    }
                });
            } else {
                console.log()
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    logout = () => {
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
                this.props.home_edit_auth(true);
            } else {
                axios.delete(Conf.configs.ServerApi + "api/users/logout", {headers: headers}).then(resp => {
                    cookies.remove("Isl_Creative_pass");
                    window.location.replace('/home');
                }).catch(err => {
                    cookies.remove("Isl_Creative_pass");
                    window.location.replace('/home');
                })
            }
        } catch (e) {
            window.location.reload()
        }
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/home" />
        } else if (this.state.loading) {
            return (
                <div className="absolute center-center">
                    <Loader
                        type="Bars"
                        color="#636466"
                        height={150}
                        width={150}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <button type="button" id="LoginRequire" className="btn btn-primary LoginRequire" data-toggle="modal" data-target="#exampleModal" hidden={true}/>
                    <div aria-disabled={"false"} className="modal fade p-t-b-50" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                        <div className="modal-dialog p-t-100" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">x</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <SignInOrUp/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Router>
                        <Route render={({ location, history }) => (
                            <React.Fragment>
                                <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas">
                                    <div className="sidebar">
                                        <ul className="sidebar-menu">
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/home") {
                                                    history.push("/home");
                                                    this.setState({select: ""})
                                                }}}>
                                                <i className="icon icon-heartbeat s-24" /> <span>Beats</span>
                                            </li>
                                            {/*<li style={{margin: "0 0 20px 10px"}} onClick={() => {*/}
                                            {/*    if (location.pathname !== "/Musics") {*/}
                                            {/*        history.push("/Musics");*/}
                                            {/*        this.setState({select: "Musics"})*/}
                                            {/*    }*/}
                                            {/*}}>*/}
                                            {/*    <i className="icon icon-home-1 s-24" /> <span>Music</span>*/}
                                            {/*</li>*/}
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {

                                                if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                                                    document.getElementById("LoginRequire").click();
                                                    this.props.home_edit_auth(true);
                                                } else if (location.pathname !== "/Profile") {
                                                    history.push("/Profile");
                                                    this.setState({select: "Profile"})
                                                }

                                            }}>
                                            <i className="icon icon-user s-24" /> <span>Profile</span>
                                        </li>
                                            <li>
                                        </li>
                                        {/*<li style={{margin: "0 0 20px 10px"}} onClick={() => {*/}
                                        {/*    if (location.pathname !== "/Playlist") {*/}
                                        {/*        history.push("/Playlist");*/}
                                        {/*        this.setState({select: "Playlist"})*/}
                                        {/*    }*/}
                                        {/*}}>*/}
                                        {/*    <i className="icon icon-dedent s-24" /> <span>Playlist</span>*/}
                                        {/*</li>*/}
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/Cart") {
                                                    history.push("/Cart");
                                                    this.setState({select: "Cart"})
                                                }
                                            }}>
                                                <i className="icon icon-cart-plus s-24" /> <span>Cart</span>
                                            </li>

                                            {/*<li style={{margin: "0 0 20px 10px"}} onClick={() => {*/}
                                            {/*    if (location.pathname !== "/Contact") {*/}
                                            {/*        history.push("/Contact");*/}
                                            {/*        this.setState({select: "Contact"})*/}
                                            {/*    }*/}
                                            {/*}}>*/}
                                            {/*    <i className="icon icon-envelope-o s-24" /> <span>Contact Us</span>*/}
                                            {/*</li>*/}
                                            {/*<li style={{margin: "0 0 20px 10px"}} onClick={() => {*/}
                                            {/*    if (location.pathname !== "/About") {*/}
                                            {/*        history.push("/About");*/}
                                            {/*        this.setState({select: "About"})*/}
                                            {/*    }*/}
                                            {/*}}>*/}
                                            {/*    <i className="icon icon-info s-24" /> <span>About Us</span>*/}
                                            {/*</li>*/}

                                            <li style={{margin: "0 0 20px 10px"}} onClick={this.logout}>
                                                <i className={this.state.logout_class}/> <span>{this.state.log_name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                                <main>
                                    {/*<Route path="/Music" exact component={() =>*/}
                                    {/*    <Music Redirect={() => this.setState({redirect: true})}*/}
                                    {/*           IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/> } />*/}
                                    <Route path="/register" exact component={
                                        () => <Register/>
                                    } />
                                    <Route path="/preference" exact component={
                                        () => {
                                            if (cookies.get("Isl_Creative_pass"))
                                                return (<Preference/>)
                                            else window.location.replace('/home#LoginRequire')
                                        }
                                    } />
                                    <Route path="/Profile" component={
                                        () => <Profile Redirect={() => this.logout()}
                                                       IfToken={this.redirectToLogin}
                                                       ToPlay={this.addToPlaylist}
                                        />
                                    } />
                                    <Route path="/home" exact component={
                                        () => <Beats Redirect={() => this.logout()}
                                                     IfToken={this.redirectToLogin}
                                                     ToPlay={this.addToPlaylist}
                                        />
                                    } />
                                    <Route path="/Cart" component={
                                        () => <Cart Redirect={() => this.logout()}
                                                    IfToken={this.redirectToLogin}
                                                    ToPlay={this.addToPlaylist}
                                        />
                                    } />
                                    <Route path="/CheckThisBeat/:id(\d+)" component={
                                        () => <OneBeat Redirect={() => this.logout()}
                                                       IfToken={this.redirectToLogin}
                                                       ToPlay={this.addToPlaylist}
                                                       SingleBeat={this.state.single_beat}
                                                       ArtistBeats={this.state.all_artist_beats}
                                                       SimilarBeats={this.state.beats_similar}
                                        />
                                    }/>
                                    <Route path="/isl_artist_profile/:id(\d+)" component={
                                        () => <OtherProfile Redirect={() => this.logout()}
                                                            IfToken={this.redirectToLogin}
                                                            ToPlay={this.addToPlaylist}
                                                            ProfileChecked={this.state.profile_checked}
                                                            UserData={this.state.user_data}
                                                            UserBeats={this.state.user_beats}
                                        />
                                    }/>
                                    {/*profile_checked: '', user_data: '', user_beats: []*/}
                                    {/*<Route path="/Playlist" component={() =>*/}
                                    {/*    <PlayList Redirect={() => this.setState({redirect: true})}*/}
                                    {/*              IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />*/}
                                </main>
                            </React.Fragment>)}
                        />
                    </Router>
                    <IslPlayer/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        auth: state.Home.auth,
        contract: state.profile.contract,
        beats: state.beats.beats,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_add_albums: (data) => {
            dispatch({type: "ADD_ALBUMS", data: data})
        },
        profile_add_single: (data) => {
            dispatch({type: "ADD_SINGLE", data: data})
        },
        profile_add_beats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        beats_initialisation_pricing: (data) => {
            dispatch({type: "ADD_PRICING", data: data})
        },
        profile_initialisation_info: (data) => {
            dispatch({type: "ADD_PROFILE_INFO", data: data})
        },
        profile_initialisation_role: (data) => {
            dispatch({type: "ADD_ROLE", data: data})
        },
        profile_initialisation_follower: (data) => {
            dispatch({type: "ADD_FOLLOWER", data: data})
        },
        profile_initialisation_following: (data) => {
            dispatch({type: "ADD_FOLLOWING", data: data})
        },
        profile_initialisation_contract: (data) => {
            dispatch({type: "ADD_CONTRACT", data: data})
        },
        home_edit_auth: (data) => {
            dispatch({type: "EDIT_AUTH", data: data})
        },
        addBeats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        newBeatMaker: (data) => {
            dispatch({type: "ADD_NEW_BEATMAKER", data: data})
        },
        topBeatMaker: (data) => {
            dispatch({type: "ADD_TOP_BEATMAKER", data: data})
        },
        latestBeats: (data) => {
            dispatch({type: "ADD_LATEST_BEATS", data: data})
        },
        discoveryBeats: (data) => {
            dispatch({type: "ADD_DISCOVERY_BEATS", data: data})
        },
        islBeats: (data) => {
            dispatch({type: "ADD_ISL_PLAYLIST", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
