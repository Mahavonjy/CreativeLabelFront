import React, { Component } from "react";
import { connect } from 'react-redux';
import  "./Music.scss"
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg from "../../assets/img/demo/a2.jpg";
import TestImg1 from "../../assets/img/demo/b1.jpg";
import { ToastContainer, toast } from 'react-toastify';

class Music extends Component {
    ToPlay;
    IfToken;
    constructor(props) {
        super(props);
        this.state = {
            Played: "https://img.icons8.com/ios-glyphs/150/000000/play-button-circled.png",
            Paused: "https://img.icons8.com/ios-glyphs/150/000000/circled-pause.png",
            IfPlay: {},
            IfPlayed: {},
            redirect: false,
            button: false,
            isNotMatch : false,
            loading: false,
            errorMessage: '',
            alb: false,
            isMounted: false
        };
    }

    MediaSuggestion = () => {
        let cookies = new Cookies();
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/medias/medias_suggestion", {headers:headers}).then(response =>{
            // this.props.addTopSong(response.data['top_songs']);
            console.log(response.data);
            this.setState({loading : false});
        }).catch(error => {
            console.log(error.response);
        })
    };

    componentDidMount() {
        this.setState({isMounted: true}, () => {
            let cookies = new Cookies();
            try {
                if (!cookies.get("Isl_Creative_pass")["Isl_Token"]) {
                    this.props.Redirect();
                }
                let new_headers = {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "*",
                    'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
                };
                axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                    cookies.set("Isl_Creative_licenses", {"licenses":resp.data.licenses});
                    if (this.props.albums_array.length === 0) {
                        this.setState({loading: false});
                        this.albumSuggestion();
                        this.MediaSuggestion();
                    }
                }).catch(err => {
                    if (err.response.data === "token invalid") {
                        this.props.Redirect();
                    }
                })
            } catch (e) {
                this.props.Redirect();
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    addForPlay = (music_list) => {
        if (music_list) {
            for(let row in music_list) {
                this.setState(prevState => ({IfPlay: {...prevState.IfPlay, [music_list[row]['id']]: false}}));
                this.setState(prevState => ({IfPlayed: {...prevState.IfPlayed, [music_list[row]['id']]: false}}));
                if (parseInt(music_list[row]['album_photo']) === parseInt(0))
                    music_list[row]['album_photo'] = 'https://via.placeholder.com/240';
                this.props.addInArray(music_list[row]);
                this.props.AddAlbumNameList({[music_list[row]['id']]: false});
            }
        }
        this.props.boolLongAlbum();
        let album_id = Object.keys(this.props.album_name_list);
        for (let row in album_id) {this.getAlbumPlayList(album_id[row]);}
    };

    albumSuggestion = () => {
        let cookies = new Cookies();
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/albums/albums_suggestion", {headers:headers}).then(response =>{
            this.addForPlay(response.data['top_albums']);
            console.log(response.data);
            this.setState({loading : false});
        }).catch(error => {
            console.log(error.response);
        })
    };

    getAlbumPlayList = (album_id) => {
        let cookies = new Cookies();
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };

        axios.get(Conf.configs.ServerApi + "api/albums/oneAlbums/" + album_id, {headers:headers}).then(response =>{
            for (let row in this.props.albums_array) {
                if (this.props.albums_array[row]['id'] === parseInt(album_id)) {
                    this.props.addAlbumSongs({
                        "songs": response.data,
                        "album_info": this.props.albums_array[row]
                    });
                }
            }
            this.props.UpdateAlbumNameList(album_id);
        }).catch(error => {
            console.log(error);
        })
    };

    IfPlayAlbum = (index, type) => {
        let New = this.state.IfPlay;
        New[index] = !New[index];
        if (type === 'leave')
            New[index] = false;
        else if (type === 'enter')
            New[index] = true;
        this.setState({IfPlay: New})
    };

    PlayedAlbum = (index) => {
        let New =  this.state.IfPlayed;
        New[index] = !New[index];
        this.setState({IfPlayed: New}, () => {
            this.IfPlayAlbum(index);
            let album_info_and_songs;
            for (let row in this.props.albums_songs) {
                if (this.props.albums_songs[row]['album_info']['id'] === index) {
                    album_info_and_songs = this.props.albums_songs[row]
                }
            }
            this.props.ToPlay(album_info_and_songs['songs'], album_info_and_songs['album_info']);
        });

    };

    render() {
        return (
            <div>
                <ToastContainer />
                <section>
                    <div className="text-white">
                        <div className="xv-slide" data-bg-possition="top" style={{backgroundImage: 'url('+TestImg1+')'}}>
                            <div className="has-bottom-gradient">
                            <div className="home-menu p-md-5">
                            <div className="row">
                            <div className="col-12 col-lg-10 animated">
                                <div className="xv-slider-content clearfix color-white">
                                    <h1 className="s-64 mt-5 font-weight-lighter">Creative Music</h1>
                                    <p className="s-24 font-weight-lighter">Listen to any kind of African music <br /> you like with our platform. </p>
                                    <div className="pt-3">
                                        <a href="#" className="btn btn-primary btn-lg">Contact Us</a>
                                    </div>
                                </div>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="Base">
                    <section className="section mt-4">
                        <div className="row row-eq-height">
                            <div className="col-lg-8">
                                <div className="card no-b mb-md-3 p-2">
                                    <div className="card-header no-bg transparent">
                                        <div className="d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <div className="d-flex">
                                                    <i className="icon-music-player-2 s-36 mr-3  mt-2"/>
                                                    <div>
                                                        <h4>Songs List</h4>
                                                        <p>What's new?</p>
                                                        <div className="mt-3">
                                                            <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1" role="tablist">
                                                                <li className="nav-item">
                                                                    <a className="nav-link active show" id="w2--tab1" data-toggle="tab" href="#w2-tab1" role="tab" aria-selected="true">Top Songs</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body no-p">
                                        <div className="tab-content" id="v-pills-tabContent1">
                                            <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">
                                                <div className="playlist pl-lg-3 pr-lg-3">
                                                    {this.props.albums_array.map((album_info, index) =>
                                                        <div className="m-1 my-4" key={index}>
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-1">
                                                                    <a className="no-ajaxy media-url" data-wave="" onClick={() => {this.PlayedAlbum(album_info['id'])}}>
                                                                        <i className="icon-play s-28" />
                                                                    </a>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <figure className="avatar-md float-left  mr-3 mt-1">
                                                                        <img className="r-3" src={album_info['album_photo']} alt="" />
                                                                    </figure>
                                                                    <h6>{album_info['album_name']}</h6>{album_info['artist']}
                                                                </div>
                                                                <div className="col-md-5 d-none d-lg-block">
                                                                    <div className="d-flex">
                                                                        <span className="ml-auto">{album_info['number_songs']} {album_info['number_songs'] > 1 ? "Songs": "Song"}</span>
                                                                        <a href="#" className="ml-auto"><i className="icon-plus-circle" /></a>
                                                                        <div className="ml-auto">
                                                                            <a href="#" className="ml-auto"><i className="icon-like" /></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-1 ml-auto d-lg-none">
                                                                    <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                        <i className="icon-more-1" /></a>
                                                                    <div className="dropdown-menu dropdown-menu-right">
                                                                        <a className="dropdown-item" href="#"><i className="icon-add-3 mr-3" />Add to a playlist</a>
                                                                        <a className="dropdown-item" href="#"><i className="icon-like mr-3" />Like</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="mb-3 card p-3">
                                    <div>
                                        <div className="mr-3 float-left text-center">
                                            <div className="s-36"><i className="icon-music-player-3"/></div>
                                        </div>
                                        <div>
                                            <div>
                                                <h4 className="text-primary">Top Artist</h4>
                                            </div>
                                            <small> Best artist on the ISL platform </small>
                                        </div>
                                    </div>
                                            <ul className="playlist list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="d-flex align-items-center">
                                                        <div className="col-10">
                                                            <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                                <img src={TestImg} alt="" />
                                                            </figure>
                                                            <h6>Zoe Foe</h6>
                                                            <small>5 Albums - 50 Songs</small>
                                                        </div>
                                                        <a href="#" className="ml-auto"><i className="icon-user-plus" /></a>
                                                        <a href="#" className="ml-auto"><i className="icon-user-circle" /></a>
                                                    </div>
                                                </li>
                                            </ul>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="card-header transparent b-b">
                                    <strong>Top Album</strong>
                                </div>
                                <div className="card-body has-items-overlay playlist p-5">
                                    <div className="row">
                                        {this.props.albums_array.map((album_info, index) =>
                                        <div className="col-md-3 mb-12" key={index}>
                                            <figure className="mb-2">
                                                <div className="img-wrapper r-10">
                                                    <img className=" r-10" height="200" src={album_info['album_photo']} alt="/" />
                                                    <div className="img-overlay text-white p-5">
                                                        <div className="center-center">
                                                            <a className="no-ajaxy media-url" href="" data-wave="assets/media/track2.json">
                                                                <i className="icon-play s-48" />
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </figure>
                                            <div className="figure-title">
                                                <h6>{album_info['album_name']}</h6>
                                                <small>{album_info['artist']}</small>
                                            </div>
                                        </div>)}
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card-header transparent b-b">
                                    <strong>Recommended Albums</strong>
                                </div>
                                <ul className="playlist list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <a className="no-ajaxy media-url" href="" data-wave="">
                                                    <i className="icon-play s-28" />
                                                </a>
                                            </div>
                                            <div className="col-10">
                                                <figure className="avatar-md float-left  mr-3 mt-1">
                                                    <img className="r-3" src={TestImg} alt="" />
                                                </figure>
                                                <h6>Dance with me tonight</h6>
                                                <small>Atif Aslam</small>
                                            </div>
                                            <small className="ml-auto"> 5:03</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <a className="no-ajaxy media-url" href="" data-wave="">
                                                    <i className="icon-play s-28" />
                                                </a>
                                            </div>
                                            <div className="col-10">
                                                <figure className="avatar-md float-left  mr-3 mt-1">
                                                    <img className="r-3" src={TestImg} alt="" />
                                                </figure>
                                                <h6>Dance with me tonight</h6>
                                                <small>Jone Aslam</small>
                                            </div>
                                            <small className="ml-auto"> 5:03</small>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="d-flex align-items-center">
                                            <div>
                                                <a className="no-ajaxy media-url" href="assets/media/track2.mp3" data-wave="assets/media/track2.json">
                                                    <i className="icon-play s-28" />
                                                </a>
                                            </div>
                                            <div className="col-10">
                                                <figure className="avatar-md float-left  mr-3 mt-1">
                                                    <img className="r-3" src={TestImg} alt="" />
                                                </figure>
                                                <h6>Dance with me tonight</h6>
                                                <small>Yoo Doe</small>
                                            </div>
                                            <small className="ml-auto"> 5:03</small>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        IfAlbumSongsDownload: state.IfAlbumSongsDownload,
        album_name_list: state.album_name_list,
        albums_array: state.albums_array,
        albums_songs: state.albums_songs,
        shortAlbum: state.shortAlbum,
        longAlbum: state.longAlbum,
        top_song: state.top_song
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addInArray: (data) => {
            dispatch({type: "ADD_ALBUM", data: data})
        },
        addAlbumSongs: (data) => {
            dispatch({type: "ADD_SONG_ALBUM", data: data})
        },
        addTopSong: (data) => {
            dispatch({type: "ADD_TOP_SONG_INFO", data: data})
        },
        boolLongAlbum: () => {
            dispatch({type: "EDIT_LONG_ALBUM"})
        },
        AddAlbumNameList: (data) => {
            dispatch({type: "ADD_ALBUM_NAME_LIST", data: data})
        },
        UpdateAlbumNameList: (data) => {
            dispatch({type: "UPDATE_ALBUM_NAME_LIST", data: data})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Music);
