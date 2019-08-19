import React, { Component } from "react";
import "../../assets/css/app.css";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Conf from "../../Config/tsconfig";
import AddList from "../../images/socials/plus-5-64.png";
import List from "../../images/socials/list-2-64.png";
import Play from 'react-icons/lib/md/play-circle-outline';
import Pause from 'react-icons/lib/md/pause-circle-filled';
import './styles/main.scss'
import './styles/_global.scss'
import './styles/_player.scss'
import './styles/_variables.scss'
import './styles/style.css'

class Players extends Component {
    Playlist;
    PlaylistInfo;
    constructor(props) {
        super(props);
        this.state = { currentIndex: 0, currentTitle: '', currentArtist: '', currentImage: '',
            IsPlaying: false, progressbar: 0, VolumeBar: 100, VolumeUp: true,
            currentTime: '00:00', totalTime: '00:00', loop: false, shuffle: false,
            visible: false, list: null, listInfo: null, tmp: 0, SecondVisible: false,
            listen: false, listen_min: null, isMounted: false , userPlaylist: [], songId: '',
        };
        this.history = [];
        this.player = new Audio();
    }

    SwapValVisibility = (t) => {
        if (t) {
            this.setState({visible: !this.state.visible});
            if (this.state.SecondVisible)
                this.setState({SecondVisible: !this.state.SecondVisible})
        } else {
            this.setState({SecondVisible: !this.state.SecondVisible});
            if (this.state.visible)
                this.setState({visible: !this.state.visible})
        }
    };

    toStartPlayer = (index) => {
        if (this.state.list[index]['IfPlay']) {
            this.state.list[index]['IfPlayIcon'] = !this.state.list[index]['IfPlayIcon'];
            this.PlayOrPause();
        } else {
            this.state.list[index]['IfPlayIcon'] = !this.state.list[index]['IfPlayIcon'];
            for (let row in this.state.list) {
                let r = parseInt(row);
                if (r !== index) {
                    if (this.state.list[r]['IfPlay'])
                        this.setState({
                            list: this.state.list.map((item, idx) => idx !== r ? item : {
                                ...item,
                                IfPlayIcon: false,
                                IfPlay: false
                            })})
                }
            }
            this.startPlayer(index);
            this.state.list[index]['IfPlay'] = !this.state.list[index]['IfPlay'];
        }
    };

    startPlayer = (index) => {
        const currentSong = this.state.list[index ? index: this.state.currentIndex];
        this.player.src = currentSong.src;
        this.setState({
            currentTitle: currentSong.title,
            currentArtist: currentSong.artist,
            currentImage: currentSong.photo,
            songId : currentSong.id,
            IsPlaying: true
        });
        this.player.play();
    };

    PlayOrPause = () => {
        if(this.player.paused){
            this.player.play();
            this.setState({IsPlaying: true})
        }else{
            this.player.pause();
            this.setState({IsPlaying: false})
        }
    };

    playNext = () => {
        this.state.tmp = 0;
        this.state.listen = false;
        if(this.state.shuffle){
            this.history.push(this.state.currentIndex);
            this.setState({currentIndex: Math.floor(Math.random() * this.state.list.length)}, function(){
                this.startPlayer()
            })
        } else {
            if(this.state.currentIndex === this.state.list.length - 1){
                this.player.pause();
                this.setState({IsPlaying: false});
            } else {
                this.history.push(this.state.currentIndex);
                this.setState({currentIndex: this.state.currentIndex + 1}, function(){
                    this.startPlayer()
                });
            }
        }
    };

    playPrev = () => {
        this.state.tmp = 0;
        this.state.listen = false;
        if(this.history[this.history.length - 1]>= 0){
            this.setState({currentIndex: this.history.pop()}, function(){
                this.startPlayer()
            });
        }else{
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

    componentDidMount() {
        this.setState({ isMounted: true });
        this.state.list = this.props.Playlist;
        this.state.listInfo = this.props.PlaylistInfo;
        const that = this;
        // this.startPlayer();
        this.player.addEventListener('volumechange', function() {
            that.setState({VolumeBar: this.volume * 100})
        }, false);
        this.player.addEventListener('timeupdate', function() {
            if (!that.props.play)
                that.player.pause();
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
        this.getPlayList();
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
            <div id="mediaPlayer" className="player-bar col-lg-8 col-md-5" data-auto="true">
                <div className="row align-items-center grid">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <button id="previousTrack" className="btn btn-link d-none d-sm-block">
                                <i className="icon-back s-18"/>
                            </button>
                            <button className=" btn btn-link" id="playPause">
                                <span id="play"><i className="icon-play s-36"/></span>
                                <span id="pause" style={{display: "none"}}><i className="icon-pause s-36 text-primary"/></span>
                            </button>
                            <button id="nextTrack" className="btn btn-link d-none d-sm-block">
                                <i className="icon-next s-18"/>
                            </button>
                        </div>
                    </div>
                    {/*progress bar*/}

                    {/*End/progress bar*/}
                    <div className="col d-none d-lg-block">
                        <small className="track-time mr-2 text-primary align-middle"/>
                        <a data-toggle="control-sidebar">
                            <i className="icon icon-menu-3 s-24 align-middle"/>
                        </a>
                    </div>

                </div>

            </div>
        );
    }
}

export default Players;
