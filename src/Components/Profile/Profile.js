import React, { Component } from "react";
import axios from 'axios';
import EditProfile from './Edit/EditProfile';
import AddSingle from './AddMedia/AddSingle';
import AddAlbum from './AddMedia/AddAlbum';
import EditSingle from './Edit/EditSingle';
import EditAlbum from './Edit/EditAlbum';
import { connect } from 'react-redux';
import Conf from "../../Config/tsconfig";
import PhotoD from '../../images/socials/profile.png';
import { ToastContainer, toast } from 'react-toastify';
import EditContractBeats from "./ContractBeats/EditContractBeats";
import FunctionTools from "../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../FunctionTools/CreateFields";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

class Profile extends Component {
    state = {
        loading: false, PopupEditProfile: false, PopupAddSingle: false,
        PopupAddAlbum: false, PopupAddEditSingle: -1, PopupAddEditAlbum: -1,
        isMounted: false, song: "", type_: "", index: null, tmp: null,
        user_beats_link: [], user_beats: this.props.user_beats
    };

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
                this.getMedia("Song added", "success").then(r => this.setState({user_beats_link: []}, () => {
                    this.props.profile_clean_add_beats();
                    this.getMedia().then(r => this.main());
                }));
            }
        });
    };

    togglePopupAddAlbum = (success) => {
        this.setState({PopupAddAlbum: !this.state.PopupAddAlbum}, () => {
            if (success === 1) {
                this.getMedia("Album added", "success").then(r => this.main());
            }
        });
    };

    togglePopupEditSingle = (index, type_) => {
        this.setState({PopupAddEditSingle: index});
        if (type_ === "beats") {
            this.setState({type_: type_, song: this.props.user_beats[index]}, () => {
                this.setState({PopupAddEditSingle: index});
            })
        } else if (type_ === "medias") {
            this.setState({type_: type_, song: this.props.single[index]}, () => {
                this.setState({PopupAddEditSingle: index});
            })
        }
    };

    togglePopupEditAlbum = (index) => {this.setState({PopupAddEditAlbum: index})};

    main = () => {
        if (!this.props.ready_beats) {
            FunctionTools.AddForPlay(this, "user_beats_link", this.props.user_beats, this.props.profile_update_beats).then(() => console.log(''));
            this.props.profile_ready_beats()
        } else {
            for (let row_ in this.props.user_beats) this.setState(prevState => ({user_beats_link: {...prevState.user_beats_link, [row_]: true}}))
        }
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            try {
                const user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
                headers['Isl-Token'] = user_credentials.token;
            } catch (e) {
                //
            } finally {
                this.main();
            }
        });
    }

    componentWillUnmount() {this.setState({ isMounted: false })}

    async getMedia (message, status) {
        return await axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: headers}).then(resp =>{
            this.setState({user_beats_link: []}, () => {
                this.props.profile_add_beats(resp.data['beats']);
                this.props.profile_not_ready_beats();
                if (status === "success") toast.success(message);
                if (status === "error") toast.error(message);
            });
            return true
        }).catch(err => {
            console.log(err.response);
            return false
        });
    };

    delete = (e, type_) => {
        const id = e.target.id;
        document.getElementById(id).setAttribute("disabled", "disabled");
        this.setState({loading: true}, () => {
            axios.delete(Conf.configs.ServerApi + "api/" + type_ + "/delete/" + id, {headers: headers}).then(resp => {
                this.props.profile_delete_in_beats(id);
                this.setState({loading: false, user_beats: this.state.user_beats.filter((beat) => beat.id !== parseInt(id))}, () => {
                    toast.success("Deleted");
                })
            }).catch(err => {
                this.setState({loading: false}, () => {
                    document.getElementById(id).removeAttribute("disabled");
                    toast.error(err.response.data)
                });
            })
        });
    };

    render() {
        return (
            <div className="Base">
                {this.state.PopupAddAlbum ? <AddAlbum closePopup={(e) => this.togglePopupAddAlbum(e)}/> : <ToastContainer/>}
                {this.state.PopupAddSingle ? <AddSingle Type={"beats"} closePopup={(e) => this.togglePopupAddSingle(e)}/> : <ToastContainer/>}
                {this.state.PopupEditProfile ? <EditProfile closePopup={(e) => this.togglePopupEditProfile(e)}/> : <ToastContainer/>}
                {this.state.PopupAddEditSingle !== -1 ? <EditSingle Song={this.state.song} Type={this.state.type_} Success={() => {
                    this.setState({PopupAddEditSingle: -1});
                    this.getMedia("Updated", "success").then(r => this.main());
                }} CloseEdit={() => this.setState({PopupAddEditSingle: -1})}
                />: <ToastContainer/>}
                {this.state.PopupAddEditAlbum !== -1 ? <EditAlbum Album={this.props.albums[this.state.PopupAddEditAlbum]} Success={() => {
                    this.setState({PopupAddEditAlbum: -1});
                    this.getMedia("Updated", "success").then(r => this.main());
                }} CloseEdit={() => this.setState({PopupAddEditAlbum: -1})}
                />: <ToastContainer/>}
                <div className="container-fluid relative animatedParent animateOnce p-lg-3">
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
                                        {this.props.role !== "Artist" ?
                                            <div>
                                                <p className="dropdown-item text-blue" ><i className="icon-user-plus mr-3"/>Become an Artist</p>
                                            </div> : null }
                                        <li className="dropdown-item list-group-item d-flex justify-content-between align-items-center">
                                            <div>
                                                <i className="icon icon-cogs text-blue mr-3" />
                                                <small className="mr-3">Send Notification by mail</small>
                                            </div>
                                            <div className="material-switch">
                                                <input id="sw2" name="someSwitchOption001" type="checkbox" />
                                                <label htmlFor="sw2" className="bg-secondary" />
                                            </div>
                                        </li>
                                        {/*<p className="dropdown-item" ><i className="icon-settings-6 mr-3"/>settings</p>*/}
                                    </div>
                                </div>
                                {this.props.role === 'Artist' ?
                                    <div className="text-center" style={{paddingTop: "10px"}}>
                                            {/*<button className="btn btn-outline-info btn-sm pl-2 pr-2"*/}
                                            {/*    onClick={() => this.togglePopupAddAlbum(0)}>Add Album*/}
                                            {/*</button>*/}
                                            <button className="btn btn-outline-success btn-sm pl-2 pr-2"
                                                    onClick={() => this.togglePopupAddSingle(0)}>Ajout de beats
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
                                                onClick={() => this.togglePopupEditProfile(0)}>Modifier
                                        </button>
                                    </div>
                                </div>
                                <div className="col-md-8">
                                    <div className="p5 b-b">
                                        <div className="pl-8 mt-4">
                                            <h3>Informations personnelles </h3>
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
                                                    <h5>Genre</h5>
                                                    <span>{this.props.profile_info.gender ? this.props.profile_info.gender : "Genre"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Anniversaire</h5>
                                                    <span>{this.props.profile_info.birth ? this.props.profile_info.birth : "0000-00-00"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Adresse</h5>
                                                    <span>{this.props.profile_info.address ? this.props.profile_info.address : "Adresse"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Téléphone</h5>
                                                    <span>{this.props.profile_info.phone ? this.props.profile_info.phone : "Téléphone"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Pays</h5>
                                                    <span>{this.props.profile_info.country ? this.props.profile_info.country : "Pays"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Région</h5>
                                                    <span>{this.props.profile_info.region ? this.props.profile_info.region : "Région"}</span>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="p-4">
                                                    <h5>Ville</h5>
                                                    <span>{this.props.profile_info.city ? this.props.profile_info.city : "Ville"}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.props.role === 'Artist' ?
                        <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                            <div className="row row-eq-height">
                                <div className="col-lg-12">
                                    <div className="card no-b mb-md-3 p-2">
                                        <div className="card-header no-bg transparent">
                                            <div className="d-flex justify-content-between">
                                                <div className="align-self-center">
                                                    <div className="d-flex">
                                                        <i className="icon-music s-36 mr-3  mt-2"/>
                                                        <div>
                                                            <h4>Les sorties populaires </h4>
                                                            <p>Albums, singles & beats </p>
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
                                                <div className="tab-pane fade  show active" id="w2-tab3" role="tabpanel"
                                                     aria-labelledby="w2-tab3">

                                                    {this.state.user_beats.length !== 0 ?
                                                        <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                            {this.props.CreateBeatsPlaylist(this, "UserProfile", this.state.user_beats, this.state.user_beats_link, "user_profile")}
                                                        </div>
                                                        : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                            <p className="text-center">Pas d'instrumental</p>
                                                        </div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> : null}
                {this.props.contract ? <EditContractBeats/> : null}
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info,
        ready_beats: state.profile.ready_beats,
        contract: state.profile.contract,
        user_beats: state.profile.user_beats,
        role: state.profile.role,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_add_beats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        profile_clean_add_beats: () => {
            dispatch({type: "CLEAN_PROFILE_BEATS"})
        },
        profile_delete_in_beats: (data) => {
            dispatch({type: "DELETE_IN_PROFILE_BEATS", data: data})
        },
        addNewPlayerList: (data) => {
            dispatch({type: "ADD_NEW_PLAYER_PLAYLIST", data: data})
        },
        profile_update_beats: (data) => {
            dispatch({type: "UPDATE_PROFILE_BEATS", data: data})
        },
        profile_ready_beats: (data) => {
            dispatch({type: "SET_READY_BEATS_TO_TRUE", data: data})
        },
        profile_not_ready_beats: (data) => {
            dispatch({type: "SET_READY_BEATS_TO_FALSE", data: data})
        },
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
