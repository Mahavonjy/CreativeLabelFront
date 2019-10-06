import React, { Component, useState } from "react";
import axios from 'axios';
import EditProfile from './Edit/EditProfile';
import AddSingle from './AddMedia/AddSingle';
import AddAlbum from './AddMedia/AddAlbum';
import EditSingle from './Edit/EditSingle';
import EditAlbum from './Edit/EditAlbum';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import Conf from "../../Config/tsconfig";
import PhotoD from '../../images/socials/profile.png';
import { ToastContainer, toast } from 'react-toastify';
import RequestToArtist from './Request/RequestToArtist';
import IslPlayer from "../Players/Players";
const cookies = new Cookies();
const date = new Date();
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let _this;

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wait: false, decline: false, loading: false, PopupEditProfile: false, PopupAddSingle: false,
            PopupAddAlbum: false, PopupAddEditSingle: -1, PopupAddEditAlbum: -1, PopupRequestToArtist: -1,
            isMounted: false, role: '', follower: '', following: '', song: "", type_: "", index: null, tmp: null
        };
        _this = this;
    }

    togglePopupEditProfile = (success) => {
        this.setState({PopupEditProfile: !this.state.PopupEditProfile}, () => {
            if (success === 1) {
                toast.success("Profile updated");
            }
        });
    };

    togglePopupAddSingle = (success) => {
        this.setState({PopupAddSingle: !this.state.PopupAddSingle}, () => {
            if (success === 1) {
                this.getMedia();
                toast.success("Song added");
            }
        });
    };

    togglePopupAddAlbum = (success) => {
        this.setState({PopupAddAlbum: !this.state.PopupAddAlbum}, () => {
            if (success === 1) {
                this.getMedia();
                toast.success("Album added");
            }
        });
    };

    togglePopupEditSingle = (index, type_) => {
        this.setState({PopupAddEditSingle: index});
        if (type_ === "beats") {
            this.setState({type_: type_, song: this.props.beats[index]}, () => {
                this.setState({PopupAddEditSingle: index});
            })
        } else if (type_ === "medias") {
            this.setState({type_: type_, song: this.props.single[index]}, () => {
                this.setState({PopupAddEditSingle: index});
            })
        }
    };

    togglePopupEditAlbum = (index) => {this.setState({PopupAddEditAlbum: index});};

    togglePopupRequestToArtist = () => {this.setState({PopupRequestToArtist: 0});};

    componentDidMount() {
        this.setState({ isMounted: true });
        this.getIfToken();
        this.getMedia();
        this.IfRequest();
    }

    componentWillUnmount() {this.setState({ isMounted: false });}

    getIfToken = () => {
        let data = cookies.get("Isl_Creative_pass");
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/profiles/my_profile", {headers: new_headers}).then(resp =>{
                    this.props.profile_initialisation(resp.data['my_profile']);
                    this.setState({role : resp.data.role});
                    this.setState({follower : resp.data.my_followers});
                    this.setState({following : resp.data.my_followings});
                }).catch(err => {
                    console.log(err.response)
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    getMedia = () => {
        let data = cookies.get("Isl_Creative_pass");
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: new_headers}).then(resp =>{
                    this.props.profile_add_beats(resp.data['beats']);
                    this.props.profile_add_single(resp.data['music']);
                    this.props.profile_add_albums(resp.data['albums']);
                }).catch(err => {
                    console.log(err.response)
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    delete = (e, type_) => {
        document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/" + type_ + "/delete/" + e.target.id, {headers: new_headers}).then(resp =>{
            this.setState({loading: false});
            toast.success("deleted");
            this.getMedia();
        }).catch(err => {
            toast.error(err.response.data)
        })
    };

    IfRequest = () => {
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.put(Conf.configs.ServerApi + "api/users/update_user_to/artist", {}, {headers: new_headers}).then(resp =>{
        }).catch(err => {
            try {
                if (err.response.data === "wait a few day") {
                    this.setState({wait: true});
                } else if (err.response.data === "your request is declined") {
                    this.setState({decline: true});
                }
            } catch (e) {
                console.log("request")
            }
        });
    };

    pausePlayer = (run) => {
        if (this.state.index !== null) {
            this.setState({tmp: this.state.index}, () => {
                this.setState({index: null}, () => {
                    if (run) {
                        IslPlayer.pauseOrPlayPlayer();
                    }
                })
            });
        }
    };

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "profile");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "profile");
                })
            } else {
                this.setState({tmp: null}, () => {
                    IslPlayer.pauseOrPlayPlayer();
                })
            }
        }
    };

    render() {
        return (
            <div className="Base">
                {this.state.PopupAddAlbum ? <AddAlbum closePopup={(e) => this.togglePopupAddAlbum(e)}/> : <ToastContainer/>}
                {this.state.PopupAddSingle ? <AddSingle closePopup={(e) => this.togglePopupAddSingle(e)}/> : <ToastContainer/>}
                {this.state.PopupEditProfile ? <EditProfile closePopup={(e) => this.togglePopupEditProfile(e)}/> : <ToastContainer/>}
                {this.state.PopupAddEditSingle !== -1 ? <EditSingle Song={this.state.song} Type={this.state.type_} Success={() => {
                    this.getMedia();
                    this.setState({PopupAddEditSingle: -1});
                    toast.success("Updated");
                }} CloseEdit={() => this.setState({PopupAddEditSingle: -1})}
                />: <ToastContainer/>}
                {this.state.PopupAddEditAlbum !== -1 ? <EditAlbum Album={this.props.albums[this.state.PopupAddEditAlbum]} Success={() => {
                    this.getMedia();
                    this.setState({PopupAddEditAlbum: -1});
                    toast.success("Updated");
                }} CloseEdit={() => this.setState({PopupAddEditAlbum: -1})}
                />: <ToastContainer/>}
                {this.state.PopupRequestToArtist !== -1 ? <RequestToArtist ProfileName={this.props.profile_info.name} Success={() => {
                    this.setState({PopupRequestToArtist: -1});
                    toast.success("Request Send");
                }} CloseRequest={() => this.setState({PopupRequestToArtist: -1})}
                />: <ToastContainer/>}
                <div className="container-fluid relative animatedParent animateOnce p-lg-5">
                    <div className="card no-b shadow no-r">
                        <div className="row no-gutters">
                            <div className="col-md-4 b-r">
                                <div className="dropdown" style={{position:"absolute", paddingTop: "10px"}}>
                                    <button className="btn btn-outline-info btn-sm pl-1 pr-1" type="button"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                        <i className="icon-more-1"/>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        {this.state.role !== "Artist" && this.state.role !== "Manager" ?
                                            <div>
                                                <a className="dropdown-item text-blue" onClick={this.togglePopupRequestToArtist}><i className="icon-user-plus mr-3"/>Become an artist</a>
                                                <a className="dropdown-item" href="#"><i className="icon-user-4 mr-3"/>Become an manager</a>
                                            </div> : null }
                                        <a className="dropdown-item" href="#"><i className="icon-settings-6 mr-3"/>settings</a>
                                    </div>
                                </div>
                                {this.state.role === 'Artist' ?
                                    <div className="text-center" style={{paddingTop: "10px"}}>
                                            {/*<button className="btn btn-outline-info btn-sm pl-2 pr-2"*/}
                                            {/*    onClick={() => this.togglePopupAddAlbum(0)}>Add Album*/}
                                            {/*</button>*/}
                                            <button className="btn btn-outline-success btn-sm pl-2 pr-2"
                                                    onClick={() => this.togglePopupAddSingle(0)}>Add Single
                                            </button>
                                        </div> : null}
                                    <div className="text-center p-5 mt-5">
                                        <figure className="avatar avatar-xl">
                                            <img
                                                src={this.props.profile_info.photo ? this.props.profile_info.photo : PhotoD}
                                                alt="profile"/>
                                        </figure>
                                        <div>
                                            <h4 className="p-t-10">{this.props.profile_info.name ? this.props.profile_info.name : "Name"}</h4>
                                            {this.props.profile_info.email ? this.props.profile_info.email : "Email"}
                                        </div>
                                        <button className="btn btn-outline-primary btn-sm  mt-3 pl-4 pr-4"
                                                onClick={() => this.togglePopupEditProfile(0)}>Edit
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="p5 b-b">
                                        <div className="pl-8 mt-4">
                                            <h3>Official Information</h3>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Email</h5>
                                                    <span>{this.props.profile_info.email ? this.props.profile_info.email : "Email"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Age</h5>
                                                    <span>{this.props.profile_info.age ? this.props.profile_info.age : "Age"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Gender</h5>
                                                    <span>{this.props.profile_info.gender ? this.props.profile_info.gender : "Gender"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Birth day</h5>
                                                    <span>{this.props.profile_info.birth ? this.props.profile_info.birth : "0000-00-00"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Address</h5>
                                                    <span>{this.props.profile_info.address ? this.props.profile_info.address : "Address"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Phone</h5>
                                                    <span>{this.props.profile_info.phone ? this.props.profile_info.phone : "Phone"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Country</h5>
                                                    <span>{this.props.profile_info.country ? this.props.profile_info.country : "Country"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Region</h5>
                                                    <span>{this.props.profile_info.region ? this.props.profile_info.region : "Region"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>City</h5>
                                                    <span>{this.props.profile_info.city ? this.props.profile_info.city : "City"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.role === 'Artist' ?
                        <div className="container-fluid relative animatedParent animateOnce p-lg-5">
                            <div className="row row-eq-height">
                                <div className="col-lg-12">
                                    <div className="card no-b mb-md-3 p-2">
                                        <div className="card-header no-bg transparent">
                                            <div className="d-flex justify-content-between">
                                                <div className="align-self-center">
                                                    <div className="d-flex">
                                                        <i className="icon-music s-36 mr-3  mt-2"/>
                                                        <div>
                                                            <h4>Album & Song & Beat</h4>
                                                            <p>all albums, singles and beats added</p>
                                                            {this.state.loading ?
                                                                <div className="preloader-wrapper small active"
                                                                     style={{position: "absolute", right: "50px"}}>
                                                                    <div className="spinner-layer spinner-yellow-only">
                                                                        <div className="circle-clipper left">
                                                                            <div className="circle"/>
                                                                        </div>
                                                                        <div className="circle-clipper right">
                                                                            <div className="circle"/>
                                                                        </div>
                                                                    </div>
                                                                </div> : null}
                                                            <div className="mt-3">
                                                                <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1"
                                                                    role="tablist">
                                                                    {/*<li className="nav-item">*/}
                                                                    {/*    <a className="nav-link"*/}
                                                                    {/*       id="w2--tab1" data-toggle="tab"*/}
                                                                    {/*       href="#w2-tab1" role="tab"*/}
                                                                    {/*       aria-selected="false">Albums</a>*/}
                                                                    {/*</li>*/}
                                                                    {/*<li className="nav-item">*/}
                                                                    {/*    <a className="nav-link" id="w3--tab1"*/}
                                                                    {/*       data-toggle="tab" href="#w2-tab2" role="tab"*/}
                                                                    {/*       aria-selected="false">Single</a>*/}
                                                                    {/*</li>*/}
                                                                    <li className="nav-item">
                                                                        <a className="nav-link active show"
                                                                           id="w3--tab2" data-toggle="tab"
                                                                           href="#w2-tab3" role="tab"
                                                                           aria-selected="true">Beats</a>
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
                                                {/*<div className="tab-pane fade show active" id="w2-tab1" role="tabpanel"*/}
                                                {/*     aria-labelledby="w2-tab1">*/}
                                                {/*    {this.props.albums.length !== 0 ?*/}
                                                {/*        <div className="playlist pl-lg-3 pr-lg-3">*/}
                                                {/*            {this.props.albums.map((val, index) =>*/}
                                                {/*                <div className="m-1 my-4" key={index}>*/}
                                                {/*                    <div className="d-flex align-items-center">*/}
                                                {/*                        <div className="col-1">*/}
                                                {/*                            <a className="no-ajaxy media-url" href=""*/}
                                                {/*                               data-wave="assets/media/track1.json">*/}
                                                {/*                                <i className="icon-play s-28"/>*/}
                                                {/*                            </a>*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-md-6">*/}
                                                {/*                            <figure*/}
                                                {/*                                className="avatar-md float-left  mr-3 mt-1">*/}
                                                {/*                                <img className="r-3"*/}
                                                {/*                                     src={val.album_photo ? val.album_photo : "https://via.placeholder.com/500"}*/}
                                                {/*                                     alt=""/>*/}
                                                {/*                            </figure>*/}
                                                {/*                            <h6>{val.album_name}</h6>{val.artist}*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-md-5 d-none d-lg-block">*/}
                                                {/*                            <div className="d-flex">*/}
                                                {/*                                <span*/}
                                                {/*                                    className="ml-auto">{val.number_songs} {val.number_songs > 1 ? "Songs" : "Song"}</span>*/}
                                                {/*                                <div className="ml-auto">*/}
                                                {/*                                    <button*/}
                                                {/*                                        className="btn btn-outline-info btn-sm"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={() => this.togglePopupEditAlbum(index)}>Edit*/}
                                                {/*                                    </button>*/}
                                                {/*                                </div>*/}
                                                {/*                                <div className="ml-auto">*/}
                                                {/*                                    <button*/}
                                                {/*                                        className="btn btn-outline-primary btn-sm"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={(e) => this.delete(e, "albums")}>delete*/}
                                                {/*                                    </button>*/}
                                                {/*                                </div>*/}
                                                {/*                            </div>*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-1 ml-auto d-lg-none">*/}
                                                {/*                            <a href="#" data-toggle="dropdown"*/}
                                                {/*                               aria-haspopup="true"*/}
                                                {/*                               aria-expanded="false">*/}
                                                {/*                                <i className="icon-more-1"/></a>*/}
                                                {/*                            <div*/}
                                                {/*                                className="dropdown-menu dropdown-menu-right">*/}
                                                {/*                                <button className="dropdown-item"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={() => this.togglePopupEditAlbum(index)}><i*/}
                                                {/*                                    className="icon-edit mr-3"/>Edit*/}
                                                {/*                                </button>*/}
                                                {/*                                <button className="dropdown-item"><i*/}
                                                {/*                                    className="icon-shopping-bag mr-3"*/}
                                                {/*                                    id={val.id}*/}
                                                {/*                                    onClick={(e) => this.delete(e, "albums")}/>Delete*/}
                                                {/*                                </button>*/}
                                                {/*                            </div>*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}
                                                {/*                </div>)}*/}
                                                {/*        </div> : <h4 className="text-center">Empty</h4>}*/}
                                                {/*</div>*/}
                                                {/*<div className="tab-pane fade" id="w2-tab2" role="tabpanel"*/}
                                                {/*     aria-labelledby="w2-tab3">*/}
                                                {/*    {this.props.single.length !== 0 ?*/}
                                                {/*        <div className="playlist pl-lg-3 pr-lg-3">*/}
                                                {/*            {this.props.single.map((val, index) =>*/}
                                                {/*                <div className="m-1 my-4" key={index}>*/}
                                                {/*                    <div className="d-flex align-items-center">*/}
                                                {/*                        <div className="col-1">*/}
                                                {/*                            <a className="no-ajaxy media-url" href="">*/}
                                                {/*                                <i className="icon-play s-28"/>*/}
                                                {/*                            </a>*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-md-6">*/}
                                                {/*                            <figure*/}
                                                {/*                                className="avatar-md float-left  mr-3 mt-1">*/}
                                                {/*                                <img className="r-3"*/}
                                                {/*                                     src={val.photo ? val.photo : "https://via.placeholder.com/450"}*/}
                                                {/*                                     alt=""/>*/}
                                                {/*                            </figure>*/}
                                                {/*                            <h6>{val.title}</h6>{val.artist_tag ? val.artist + " ft " + val.artist_tag : val.artist}*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-md-5 d-none d-lg-block">*/}
                                                {/*                            <div className="d-flex">*/}
                                                {/*                                <span className="ml-auto">{val.number_play ? val.number_play: 0}</span>*/}
                                                {/*                                <div className="ml-auto">*/}
                                                {/*                                    <button*/}
                                                {/*                                        className="btn btn-outline-info btn-sm"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={() => this.togglePopupEditSingle(index, "medias")}>Edit*/}
                                                {/*                                    </button>*/}
                                                {/*                                </div>*/}
                                                {/*                                <div className="ml-auto">*/}
                                                {/*                                    <button*/}
                                                {/*                                        className="btn btn-outline-primary btn-sm"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={(e) => this.delete(e, "medias")}>delete*/}
                                                {/*                                    </button>*/}
                                                {/*                                </div>*/}
                                                {/*                            </div>*/}
                                                {/*                        </div>*/}
                                                {/*                        <div className="col-1 ml-auto d-lg-none">*/}
                                                {/*                            <a href="#" data-toggle="dropdown"*/}
                                                {/*                               aria-haspopup="true"*/}
                                                {/*                               aria-expanded="false">*/}
                                                {/*                                <i className="icon-more-1"/></a>*/}
                                                {/*                            <div*/}
                                                {/*                                className="dropdown-menu dropdown-menu-right">*/}
                                                {/*                                <button className="dropdown-item"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={() => this.togglePopupEditSingle(index, "medias")}><i*/}
                                                {/*                                    className="icon-edit mr-3"/>Edit*/}
                                                {/*                                </button>*/}
                                                {/*                                <button className="dropdown-item"*/}
                                                {/*                                        id={val.id}*/}
                                                {/*                                        onClick={(e) => this.delete(e, "medias")}><i*/}
                                                {/*                                    className="icon-shopping-bag mr-3"/>Delete*/}
                                                {/*                                </button>*/}
                                                {/*                            </div>*/}
                                                {/*                        </div>*/}
                                                {/*                    </div>*/}
                                                {/*                </div>)}*/}
                                                {/*        </div> : <h4 className="text-center">Empty</h4>}*/}
                                                {/*</div>*/}
                                                <div className="tab-pane fade  show active" id="w2-tab3" role="tabpanel"
                                                     aria-labelledby="w2-tab3">
                                                    {this.props.beats.length !== 0 ?
                                                        <div className="playlist pl-lg-3 pr-lg-3">
                                                            {this.props.beats.map((val, index) =>
                                                                <div className="m-1 my-4" key={index}>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="col-1">
                                                                            <div>
                                                                                {this.state.index === index ?
                                                                                    <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                                                    <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "beats")}}/>}
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <figure
                                                                                className="avatar-md float-left  mr-2 mt-1">
                                                                                <img className="r-3"
                                                                                     src={val.photo ? val.photo : "https://via.placeholder.com/450"}
                                                                                     alt=""/>
                                                                            </figure>
                                                                            <h6>{val.title}</h6>{val.artist}
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <small className="ml-auto">{val.time}</small>
                                                                        </div>
                                                                        <div className="col-sm-2">
                                                                            <small className="ml-auto">{val.bpm}/bpm</small>
                                                                        </div>
                                                                        <div className="col-sm-2 d-none d-lg-block">
                                                                            <div className="d-flex">
                                                                                <div className="ml-auto" title={"Edit this beats"}>
                                                                                    <i
                                                                                        className="icon-edit s-24"
                                                                                        id={val.id}
                                                                                        onClick={() => this.togglePopupEditSingle(index, "beats")}>
                                                                                    </i>
                                                                                </div>
                                                                                <div className="ml-auto" title={"Delete this beats"}>
                                                                                    <i className="icon-trash s-24"
                                                                                        id={val.id}
                                                                                        onClick={(e) => this.delete(e, "beats")}>
                                                                                    </i>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-1 ml-auto d-lg-none">
                                                                            <a href="#" data-toggle="dropdown"
                                                                               aria-haspopup="true"
                                                                               aria-expanded="false">
                                                                                <i className="icon-more-1"/></a>
                                                                            <div
                                                                                className="dropdown-menu dropdown-menu-right">
                                                                                <button className="dropdown-item"
                                                                                        title={"Edit this beats"}
                                                                                        id={val.id}
                                                                                        onClick={() => this.togglePopupEditSingle(index, "beats")}><i
                                                                                    className="icon-edit mr-3"/>Edit
                                                                                </button>
                                                                                <button className="dropdown-item"
                                                                                        title={"Delete this beats"}
                                                                                        id={val.id}
                                                                                        onClick={(e) => this.delete(e, "beats")}><i
                                                                                    className="icon-trash mr-3"/>Delete
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>)}
                                                        </div> : <h4 className="text-center">Empty</h4>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                {this.state.wait ?
                    <div className="p-lg-5">
                        <div className="mb-3 card no-b p-3">
                            <button className="ModalClose" onClick={() => this.setState({wait: false})}>
                                <i className="icon-close s-24" style={{color:"orange", position:"absolute", right: 0}} />
                            </button>
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36">{date.getDate()}</div>
                                    <span>{monthNames[date.getMonth()]}</span>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-info">Statut</h4>
                                    </div>
                                    <small> Status of your application to become an artist</small>
                                    <div className="mt-2">
                                        <i className="icon-clock-o mr-1"> </i> wait a few day
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null}
                {this.state.decline ?
                    <div className="p-lg-5">
                        <div className="mb-3 card no-b p-3">
                            <button className="ModalClose" onClick={() => this.setState({decline: false})}>
                                <i className="icon-close s-24" style={{color:"orange", position:"absolute", right: 0}} />
                            </button>
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36">{date.getDate()}</div>
                                    <span>{monthNames[date.getMonth()]}</span>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-primary">Statut</h4>
                                    </div>
                                    <small> Status of your application to become an artist</small>
                                    <div className="mt-2">
                                        <i className="icon-clock-o mr-1"> </i> your request is declined
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :null}
                </div>
            );
    }
    static pausePlayer() {
        _this.pausePlayer(false);
    }

    static playPlayer(index, type_) {
        _this.Play(index, type_);
    }

    static changeIndex(index) {
        _this.setState({index: index});
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info,
        albums: state.profile.albums,
        beats: state.profile.beats,
        single: state.profile.single
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_initialisation: (data) => {
            dispatch({type: "ADD_PROFILE_INFO", data: data})
        },
        profile_add_albums: (data) => {
            dispatch({type: "ADD_ALBUMS", data: data})
        },
        profile_add_single: (data) => {
            dispatch({type: "ADD_SINGLE", data: data})
        },
        profile_add_beats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
