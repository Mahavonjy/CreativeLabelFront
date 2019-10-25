import React, { Component } from "react";
import beats from '../Beats/Beats';
import profile from '../Profile/Profile';
import {connect} from "react-redux";
import logo from "../../images/Logo/ISL_logo.png"
import "../../assets/css/app.css";
import Cookies from 'universal-cookie';
import Conf from "../../Config/tsconfig";
import './styles/main.scss'
import './styles/_global.scss'
import './styles/_player.scss'
import './styles/_variables.scss'
import './styles/style.css'
import axios from 'axios';

let _this;

class Players extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0, currentTitle: '', currentArtist: '', currentImage: '',
            IsPlaying: false, progressbar: 0, VolumeBar: 100, VolumeUp: true,
            currentTime: '00:00', totalTime: '00:00', loop: false, shuffle: false,
            component: null, listInfo: null, tmp: 0, listen: false, listen_min: null,
            isMounted: false , userPlaylist: [], songId: null,
        };
        this.history = [];
        this.player = new Audio();
        _this = this
    }

    toStartPlayer = (songId) => {
        console.log(this.state.songId, songId);
        if (this.state.songId === songId) {
            this.PlayOrPause();
            console.log("i am paused here");
        } else {
            if (this.state.component === "beats") {
                for (let row in this.props.beats) {
                    if (this.props.beats[row]['id'] === songId) {
                        this.setState({currentIndex: row}, () => {
                            this.startPlayer(this.state.currentIndex);
                        });
                    }
                }
            } else if (this.state.component === "profile") {
                for (let row in this.props.profile_beats) {
                    if (this.props.profile_beats[row]['id'] === songId) {
                        this.setState({currentIndex: row}, () => {
                            this.startPlayer(this.state.currentIndex);
                        });
                    }
                }
            }
        }
    };

    startPlayer = (index) => {
        const currentSong = this.state.list[index ? index: this.state.currentIndex];
        this.player.src = currentSong.link;
        this.setState({
            currentTitle: currentSong.title,
            currentArtist: currentSong.artist,
            currentImage: currentSong.photo,
            songId : currentSong.id,
            IsPlaying: true
        });
        this.setState({IsPlaying: true}, () => this.player.play())
    };

    PlayOrPause = (run) => {
        if (this.player.paused && this.state.songId) {
            this.setState({IsPlaying: true}, () => {
                if (run) {
                    this.player.play();
                } else {
                    beats.playPlayer(this.state.currentIndex , "beats");

                }
            })
        } else if (this.state.songId) {
            this.setState({IsPlaying: false}, () => {
                beats.pausePlayer();
                this.player.pause()
            })
        }
    };

    playNext = () => {
        this.state.tmp = 0;
        this.state.listen = false;
        if (this.state.shuffle) {
            this.history.push(this.state.currentIndex);
            this.setState({currentIndex: Math.floor(Math.random() * this.state.list.length)}, function() {
                if (this.state.component === "beats") {
                    beats.changeIndex(this.state.currentIndex)
                } else if (this.state.component === "profile") {
                    profile.changeIndex(this.state.currentIndex)
                }
                this.startPlayer()
            })
        } else {
            if(this.state.currentIndex === this.state.list.length - 1){
                this.player.pause();
                this.setState({IsPlaying: false});
            } else {
                this.history.push(this.state.currentIndex);
                this.setState({currentIndex: this.state.currentIndex + 1}, function(){
                    if (this.state.component === "beats") {
                        beats.changeIndex(this.state.currentIndex)
                    } else if (this.state.component === "profile") {
                        profile.changeIndex(this.state.currentIndex)
                    }
                    this.startPlayer()
                });
            }
        }
    };

    playPrev = () => {
        this.state.tmp = 0;
        this.state.listen = false;
        if (this.history[this.history.length - 1]>= 0) {
            this.setState({currentIndex: this.history.pop()}, function(){
                if (this.state.component === "beats") {
                    beats.changeIndex(this.state.currentIndex)
                } else if (this.state.component === "profile") {
                    profile.changeIndex(this.state.currentIndex)
                }
                this.startPlayer()
            });
        } else {
            this.player.pause();
            this.setState({IsPlaying: false});
        }
    };

    convertTime = (seconds) => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        this.setState({currentTime: min + ":" + sec});
    };

    totalTime = (seconds) => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        min = (min < 10) ? "0" + min : min;
        sec = (sec < 10) ? "0" + sec : sec;
        this.setState({totalTime: min + ":" + sec});
        if ((this.state.totalTime !== 'NaN:NaN') && (!this.state.listen)) {
            let temp = this.state.totalTime.split(':');
            let tot = parseInt(temp[0]) * 60 + parseInt(temp[1]);
            this.setState({listen_min: Math.floor(( (( tot * 40 ) / 10 ) * 70 ) / 100) });
            this.setState({listen: true})
        }
    };

    onBarClick = (e) => {
        const offsetX = e.nativeEvent.offsetX;
        const offsetWidth = e.nativeEvent.target.offsetWidth;
        const percent = offsetX / offsetWidth;
        this.player.currentTime = percent * this.player.duration;
    };

    onVolumeClick = (e) => {
        const offsetX = e.nativeEvent.offsetX;
        const offsetWidth = e.nativeEvent.target.offsetWidth;
        this.player.volume = offsetX / offsetWidth;
    };

    toggleLoop = () => {
        this.setState({loop: !this.state.loop}, function(){
            this.player.loop = this.state.loop
        });
    };

    toggleShuffle = () => {
        console.log("i am here");
        this.setState({shuffle: !this.state.shuffle})
    };

    toggleVolume = () => {
        this.setState({VolumeUp: !this.state.VolumeUp}, function(){
            if(!this.state.VolumeUp){
                this.player.volume = 0;
            }else{
                this.player.volume = 1;
            }
        })
    };

    componentDidMount(index, type_, component) {
        this.setState({ isMounted: true , component: component});
        const that = this;
        if (type_ === "beats" && component === "beats") {
            this.state.list = this.props.beats;
            this.state.listInfo = null;
            this.startPlayer(index);
        } else if (type_ === "beats" && component === "profile") {
            this.state.list = this.props.profile_beats;
            this.state.listInfo = null;
            this.startPlayer(index);
        } else {
            this.state.list = this.props.Playlist;
            this.state.listInfo = this.props.PlaylistInfo;
        }
        this.player.addEventListener('volumechange', function() {
            that.setState({VolumeBar: this.volume * 100})
        }, false);
        this.player.addEventListener('timeupdate', function() {
            that.state.tmp = that.state.tmp + 1;
            let position = this.currentTime / this.duration;
            that.setState({progressbar: position * 100});
            that.convertTime(Math.round(this.currentTime));
            that.totalTime(Math.round(this.duration));
            if (that.state.tmp === that.state.listen_min) {
                console.log("balance la fonction pour dire qu'il a ecouter")
            }
            if (this.ended) {
                that.state.tmp = 0;
                that.playNext()
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    getPlayList = () => {
        let cookies = new Cookies();
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };

        axios.get(Conf.configs.ServerApi + "api/playlists/userPlaylist", {headers:headers}).then(resp =>{
            const info = resp.data['users_playlist'];
            for (let row in info) {
                this.setState(prevState => ({
                    userPlaylist: [...prevState.userPlaylist, info[row]]
                }))
            }
        }).catch(error => {
            console.log(error);
        })
    };

    addToPlaylist = (playlist_id) => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.post(Conf.configs.ServerApi + "api/playlists/addInPlaylist/" + playlist_id + "/" + this.state.songId , {},{headers: new_headers}).then(resp =>{
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response)
        })
    };
    render() {
        return (
            <div>
                <aside className="control-sidebar fixed ">
                    <div className="slimScroll">
                        <div className="sidebar-header">
                            <h4>Beats Playlist</h4>
                            <a href="#" data-toggle="control-sidebar" className="paper-nav-toggle  active"><i /></a>
                        </div>
                        <div className="p-3">
                            <ul id="playlist" className="playlist">
                                {this.state.songId ? this.props.beats.map((val, index) =>
                                    <li className="list-group-item my-1" key={index}>
                                        <div className="no-ajaxy media-url">
                                            <div className="d-flex justify-content-between align-items-center">
                                                {this.state.songId === val['id'] && this.state.IsPlaying ?
                                                    <i className="icon-pause s-28" onClick={() => this.toStartPlayer(val['id'])} /> :
                                                    <i className="icon-play s-28" onClick={() => this.toStartPlayer(val['id'])} />}
                                                <figure className="avatar-md float-left mr-3 mt-1">
                                                    <img className="r-5" src={val['photo']} alt="" />
                                                </figure>
                                                <div>
                                                    <h6>{val['artist']}</h6>{val['title']}
                                                </div>
                                                <span className="badge badge-primary badge-pill">{val.time}</span>
                                            </div>
                                        </div>
                                    </li>): <h4 className="text-center">Playlist Empty</h4>}
                            </ul>
                        </div>
                    </div>
                </aside>
                <nav className="navbar-wrapper navbar-bottom-fixed shadow">
                    <div className="navbar navbar-expand player-header justify-content-between  bd-navbar">
                        <div className="d-flex align-items-center">
                            <a href="#" data-toggle="push-menu" className="paper-nav-toggle pp-nav-toggle ml-2 mr-2">
                                <i />
                            </a>
                            <a className="navbar-brand d-none d-lg-block" href="/home">
                                <div className="d-flex align-items-center s-14 l-s-2">
                                    <figure className="avatar-md float-left mr-3 mt-1">
                                        <img className="r-5" src={logo} alt="" />
                                    </figure>
                                    <span>ISL CREATIVE</span>
                                </div>
                            </a>
                        </div>
                        {/*Player*/}
                        <div id="mediaPlayer" className="player-bar col-lg-6 col-md-5" data-auto="true">
                            <div className="row align-items-center d-block">
                                <div className="col-md-10">
                                    <div className="d-block align-items-center">
                                        <div className="text-center" style={{margin: "0 auto"}}>
                                            <div className="d-none d-lg-inline-flex">
                                                <small className="track-time mr-2 text-primary align-middle" style={{margin: "0 auto"}}>{this.state.currentTime}</small>
                                            </div>
                                            {this.state.shuffle ?
                                                <button id="shuffle" className="d-none d-lg-inline-flex btn btn-link" onClick={() => this.toggleShuffle()}>
                                                    <i className="icon-shuffle s-14" />
                                                </button>:
                                                <button id="shuffle" className="d-none d-lg-inline-flex btn btn-link text-light" onClick={() => this.toggleShuffle()}>
                                                    <i className="icon-shuffle s-14"/>
                                                </button>}
                                            <button id="previousTrack" className="btn btn-link" onClick={this.state.songId ? this.playPrev: null}>
                                                <i className="icon-back s-14" />
                                            </button>
                                            <button className="btn btn-link" id="playPause">
                                                {!this.state.IsPlaying ?
                                                    <span id="play" onClick={this.state.songId ? () => this.PlayOrPause(true): null}><i className="icon-play s-24"/></span> :
                                                    <span id="pause" onClick={this.state.songId ? this.PlayOrPause: null}><i className="icon-pause s-24 text-primary"/></span>
                                                }
                                            </button>
                                            <button id="nextTrack" className="btn btn-link" onClick={this.state.songId ? this.playNext: null}>
                                                <i className="icon-next s-14" />
                                            </button>
                                            {this.state.loop ?
                                                <button id="shuffle" className="d-none d-lg-inline-flex btn btn-link" onClick={() => this.toggleLoop()}>
                                                    <i className="icon-repeat s-14" />
                                                </button>:
                                                <button id="shuffle" className="d-none d-lg-inline-flex btn btn-link text-light" onClick={() => this.toggleLoop()}>
                                                    <i className="icon-repeat s-14"/>
                                                </button>}
                                            <div className="d-none d-lg-inline-flex">
                                                <small className="track-time ml-2 mr-2 text-primary align-middle">{this.state.totalTime}</small>
                                            </div>
                                        </div>
                                        <div className="progress" style={{width: "100%", height: "4px"}}
                                             onClick={this.state.songId ? this.onBarClick : null}>
                                            <div className="bar" style={{width: this.state.progressbar + '%', background: "red"}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*@Player*/}
                        {/*Top Menu Start */}
                        <div className="navbar-custom-menu">
                            <ul className="nav navbar-nav">
                                {/* User Playlist*/}
                                <li className="d-none d-lg-inline-flex flex-column">
                                    <a data-toggle="control-sidebar">
                                        <i className="icon icon-menu s-36" />
                                    </a>
                                </li>
                                {/* User Account*/}
                                <li className="dropup custom-dropdown user user-menu ">
                                    <a href="#" className="nav-link" data-toggle="dropdown">
                                        {this.state.songId ?
                                            <figure className="avatar">
                                                <img src={this.state.currentImage} alt="" />
                                            </figure> :
                                            <figure className="avatar">
                                                <i className="icon-user-circle" />
                                            </figure>}
                                    </a>
                                    <div className="dropdown-menu p-4 dropdown-menu-right">
                                        <div className="row box justify-content-between my-2">
                                            <div className="col text-center">
                                                <a className="ajaxifyPage" href="saved.html">
                                                    <i className="icon icon-heart s-24" />
                                                    <div className="pt-1">Follow</div>
                                                </a>
                                            </div>
                                            <div className="col text-center">
                                                <a className="ajaxifyPage" href="profile.html">
                                                    <i className="icon-user-4  s-24" />
                                                    <div className="pt-1">Profile</div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }

    static startPlayerComponent(index, type_, component) {
        _this.componentDidMount(index, type_, component)
    }

    static  pauseOrPlayPlayer() {
        _this.PlayOrPause();
    }
}

const mapStateToProps = state => {
    return {
        beats: state.beats.beats,
        profile_beats: state.profile.beats
    };
};

export default connect(mapStateToProps, null)(Players);
