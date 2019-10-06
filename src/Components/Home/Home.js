import './Home.css';
import React, { Component } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import Music from '../Music/Music';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Profile from "../Profile/Profile";
import Beats from "../Beats/Beats";
import Cart from "../Cart/Cart";
import IslPlayer from "../Players/Players";
import PlayList from "../Playlist/Playlist";
import Conf from "../../Config/tsconfig";
import './Home.css';

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            music : true,
            profile: false,
            loading: false,
            isOpen: false,
            redirect: false,
            playMusic: false,
            logo_style: 'logo_navbar',
            PlayList: [],
            PlaListInfo : ''
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

    changeLogoStyle = () => {
        if (this.state.isOpen) {
            this.setState({logo_style: 'logo_navbar'});
            this.setState({isOpen: false});
        } else {
            this.setState({logo_style: 'new_logo_navbar'});
            this.setState({isOpen: true});
        }
    };

    logout = () => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/users/logout", {headers: new_headers}).then(resp =>{
            cookies.remove("Isl_Creative_pass");
            console.log(resp.data);
            this.setState({redirect: true});
        }).catch(err => {
            console.log(err.response)
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to="/login" />
        } else if (this.state.loading) {
            return (
                <div id="loader" className="loader">
                    <div className="loader-container">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
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

export default Home;
