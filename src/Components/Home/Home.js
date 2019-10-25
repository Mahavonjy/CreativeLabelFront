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

let key = Math.floor(Math.random() * Math.floor(999999999));
let cookies = new Cookies();
let ifStopPlayer = {};
let headers;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, loading: false, redirect: false
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
                console.log(err)
            }
        } catch (e) {
            this.logout();
        }
    };

    componentDidMount() {
        this.setState({isMounted: true }, () => {
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
                                axios.get(Conf.configs.ServerApi + "api/beats/contract/user_artist_contact", {headers: headers}).then(resp => {
                                    this.props.profile_initialisation_contract(resp.data);
                                    this.setState({loading: false})
                                }).catch(err => {
                                    this.ifConnectionError(err);
                                })
                            } else {
                                this.setState({loading: false})
                            }
                        }).catch(err => {
                            this.ifConnectionError(err);
                        });
                    }).catch(err => {
                        this.ifConnectionError(err);
                    });
                } catch (e) {
                    this.setState({redirect: true});
                }
            });
        });
    }

    componentWillUnmount() {
        const publicIp = require("react-public-ip");

        const ipv4 = publicIp.v4() || "192.168.1.19";
        const ipv6 = publicIp.v6() || "";
        console.log(ipv4, ipv6)
        this.setState({ isMounted: false });
    }

    logout = () => {
        axios.delete(Conf.configs.ServerApi + "api/users/logout", {headers: headers}).then(resp =>{
            cookies.remove("Isl_Creative_pass");
            this.setState({redirect: true});
        }).catch(err => {
            cookies.remove("Isl_Creative_pass");
            this.setState({redirect: true});
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
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
                                                }
                                            }}>
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
                                                if (location.pathname !== "/Profile") {
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
                                                <i className="icon icon-exit-2 s-24" /> <span>Logout</span>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                                <main>
                                    {/*<Route path="/Music" exact component={() =>*/}
                                    {/*    <Music Redirect={() => this.setState({redirect: true})}*/}
                                    {/*           IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/> } />*/}
                                    <Route path="/Profile" component={() =>
                                        <Profile Redirect={() => this.logout()} IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    <Route path="/home" exact component={() =>
                                        <Beats Redirect={() => this.logout()} IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    <Route path="/Cart" component={() =>
                                        <Cart Redirect={() => this.logout()} IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    {/*<Route path="/Playlist" component={() =>*/}
                                    {/*    <PlayList Redirect={() => this.setState({redirect: true})}*/}
                                    {/*              IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />*/}
                                </main>
                            </React.Fragment>)}
                        />
                    </Router>/
                    <IslPlayer/>
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
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
    };
};

export default connect(null, mapDispatchToProps)(Home);
