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

let playMusic = false;
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
            logo_style: 'logo_navbar',
            PlayList: [],
            PlaListInfo : '',
            select: ''
        };
    }

    redirectToLogin = () => {this.setState({redirect: true})};

    ediStatePlaylist = (all_list_of_musics, album_info) => {
        for (let row in all_list_of_musics['all_songs']) {
            if (parseInt(all_list_of_musics['all_songs'][row]['photo']) === parseInt(0))
                all_list_of_musics['all_songs'][row]['photo'] = 'https://via.placeholder.com/240';
            this.setState(prevState => ({
                PlayList: [...prevState.PlayList, {
                    'id': all_list_of_musics['all_songs'][row]['id'],
                    'src': all_list_of_musics['all_songs'][row]['link'],
                    'photo': all_list_of_musics['all_songs'][row]['photo'],
                    'title': all_list_of_musics['all_songs'][row]['title'],
                    'artist': all_list_of_musics['all_songs'][row]['artist'],
                    'genre': all_list_of_musics['all_songs'][row]['genre'],
                    'description': all_list_of_musics['all_songs'][row]['description'],
                    'IfPlay': false,
                    'IfPlayIcon': false,
                }]
            }))
        }
        this.setState({ playMusic: true });
        this.setState({ PlaListInfo: album_info });
    };

    addToPlaylist = (all_list_of_musics, album_info) => {
        if (playMusic) {
            ifStopPlayer[key] = false;
            this.setState({ PlayList: [], PlaListInfo: ''}, () => {
                if (!ifStopPlayer[key]) {
                    key = Math.floor(Math.random() * Math.floor(999999999));
                    ifStopPlayer[key] = true;
                    this.ediStatePlaylist(all_list_of_musics, album_info);
                }
            });
        } else {
            ifStopPlayer[key] = true;
            playMusic = true;
            this.ediStatePlaylist(all_list_of_musics, album_info);
        }
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
                                                console.log("/" + this.state.select);
                                                if (location.pathname !== "/") {
                                                    history.push("/");
                                                    this.setState({select: ""})
                                                }
                                            }}>
                                                <i className="icon icon-home-1 s-24" /> <span>Music</span>
                                            </li>
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/Beats") {
                                                    history.push("/Beats");
                                                    this.setState({select: "Beats"})
                                                }
                                            }}>
                                                <i className="icon icon-heartbeat s-24" /> <span>beats</span>
                                            </li>
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
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                            if (location.pathname !== "/Playlist") {
                                                history.push("/Playlist");
                                                this.setState({select: "Playlist"})
                                            }
                                        }}>
                                            <i className="icon icon-dedent s-24" /> <span>Playlist</span>
                                        </li>
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/Cart") {
                                                    history.push("/Cart");
                                                    this.setState({select: "Cart"})
                                                }
                                            }}>
                                                <i className="icon icon-cart-plus s-24" /> <span>Cart</span>
                                            </li>

                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/Contact") {
                                                    history.push("/Contact");
                                                    this.setState({select: "Contact"})
                                                }
                                            }}>
                                                <i className="icon icon-envelope-o s-24" /> <span>Contact Us</span>
                                            </li>
                                            <li style={{margin: "0 0 20px 10px"}} onClick={() => {
                                                if (location.pathname !== "/About") {
                                                    history.push("/About");
                                                    this.setState({select: "About"})
                                                }
                                            }}>
                                                <i className="icon icon-info s-24" /> <span>About Us</span>
                                            </li>
                                            <li style={{margin: "0 0 20px 10px"}} onClick={this.logout}>
                                                <i className="icon icon-exit-2 s-24" /> <span>Logout</span>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                                <main>
                                    <Route path="/" exact component={() => <Music IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/> } />
                                    <Route path="/Profile" component={() => <Profile IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    <Route path="/Beats" component={() => <Beats IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    <Route path="/Cart" component={() => <Cart IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                    <Route path="/Playlist" component={() => <PlayList IfToken={this.redirectToLogin} ToPlay={this.addToPlaylist}/>} />
                                </main>
                            </React.Fragment>
                        )}
                        />
                    </Router>
                    {playMusic ?
                        <IslPlayer
                            play={ifStopPlayer[key]}
                            key={key}
                            Playlist={this.state.PlayList}
                            PlaylistInfo={this.state.PlaListInfo}
                        />
                        : null}
                </div>
            );
        }
    }
}

export default Home;

