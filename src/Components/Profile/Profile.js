import React, { Component } from "react";
import axios from 'axios';
import EditProfile from './Edit/EditProfile';
import AddSingle from './AddMedia/AddSingle';
import EditSingle from './Edit/EditSingle';
import { connect } from 'react-redux';
import Conf from "../../Config/tsconfig";
import PhotoD from '../../images/socials/profile.png';
import PhotoTest from '../../images/Backgrounds/adult-banking-business-2254122.jpg';
import { ToastContainer, toast } from 'react-toastify';
import EditContractBeats from "./ContractBeats/EditContractBeats";
import FunctionTools from "../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../FunctionTools/CreateFields";
import Form from "../KantoBiz/Prestations/Form/Form";
import * as PopupFields from "../FunctionTools/PopupFields";
import PaymentsAndReservations from "./Section/PaymentsAndReservations";
import BankingDetails from "./Section/BankingDetails";
import RefundPolicy from "./Section/RefundPolicy";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

class Profile extends Component {
    state = {
        song: "",
        type_: "",
        index: null,
        tmp: null,
        activeToast: true,
        isMounted: false,
        loading: false,
        PopupEditProfile: false,
        PopupAddSingle: false,
        PopupAddEditSingle: -1,
        PopupAddEditAlbum: -1,
        choiceArtistType: false,
        user_beats_link: [],
        user_beats: this.props.user_beats,
        becomeArtistForm: false,
        artist_type: "Beatmaker"
    };

    togglePopupEditProfile (success) {
        this.setState({PopupEditProfile: !this.state.PopupEditProfile, activeToast: false}, () => {
            if (success === 1) {
                this.setState({activeToast: true}, () => {
                    toast.success("Profile updated");
                })
            }
        });
    };

    updateUserBeats (data, message, edit) {
        let user_tmp_beats = [...this.state.user_beats];
        if (edit) user_tmp_beats.splice(user_tmp_beats.indexOf(this.state.song), 1);
        else this.setState(prevState => ({user_beats_link: {...prevState['user_beats_link'], [this.state.user_beats_link.length]: true}}));
        user_tmp_beats.push(data);
        this.setState({user_beats: user_tmp_beats, activeToast: true}, () => {
            this.props.profile_add_beats(user_tmp_beats);
            toast.success(message);
        })
    };

    togglePopupAddSingle (success, data) {
        this.setState({PopupAddSingle: !this.state.PopupAddSingle, activeToast: false}, () => {
            if (success === 1) this.updateUserBeats(data, "Ajout avec success", false);
        });
    };

    togglePopupEditSingle (index, type_) {
        this.setState({PopupAddEditSingle: index, activeToast: false});
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

    afterEditSingle (data) {
        this.setState({PopupAddEditSingle: -1}, () => {
            this.updateUserBeats(data, "Modification avec success", true);
        });
    };

    GenerateColInfo (state_name, issue) {
        return (
            <div className="col-md-4">
                <div className="p-4">
                    <h5>{issue}</h5>
                    <span>{this.props.profile_info[state_name] ? this.props.profile_info[state_name] : "Votre " + issue}</span>
                </div>
            </div>
        );
    };

    delete (e, type_) {
        const id = e.target.id;
        this.setState({activeToast: true}, () => {
            document.getElementById(id).setAttribute("disabled", "disabled");
            this.setState({loading: true}, () => {
                axios.delete(Conf.configs.ServerApi + "api/" + type_ + "/delete/" + id, {headers: headers}).then(() => {
                    this.props.profile_delete_in_beats(id);
                    this.setState({loading: false, user_beats: this.state.user_beats.filter((beat) => beat.id !== parseInt(id))});
                    toast.success("Supprimé");
                }).catch(err => {
                    this.setState({loading: false}, () => {
                        document.getElementById(id).removeAttribute("disabled");
                        toast.error(err.response.data)
                    });
                })
            });
        })
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            try {
                headers['Isl-Token'] = this.props.user_credentials.token;
            } catch (e) {
                //
            } finally {
                if (!this.props.ready_beats) {
                    FunctionTools.AddForPlay(this, "user_beats_link", this.props.user_beats, this.props.profile_update_beats).then(() => console.log(''));
                    this.props.profile_ready_beats()
                } else {
                    for (let row_ in this.props.user_beats) this.setState(prevState => ({user_beats_link: {...prevState.user_beats_link, [row_]: true}}))
                }
            }
        });
    }

    componentWillUnmount() {this.setState({ isMounted: false })}

    render() {
        return (
            <div className="Base p-b-100">
                {this.state.activeToast ? <ToastContainer/> : null}
                {this.state.PopupAddSingle && <AddSingle Type={"beats"} closePopup={(e, data) => this.togglePopupAddSingle(e, data)}/>}
                {this.state.PopupEditProfile && <EditProfile closePopup={(e) => this.togglePopupEditProfile(e)}/>}
                {this.state.PopupAddEditSingle !== -1 && <EditSingle Song={this.state.song} Type={this.state.type_} Success={(data) => {this.afterEditSingle(data)}} CloseEdit={() => this.setState({PopupAddEditSingle: -1})}/>}
                {this.state.choiceArtistType? this.props.DifferentArtist(this): null}
                <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                    <div className="card no-b shadow no-r">
                        <div className="row no-gutters">
                            <div className="col-md-4 b-r">
                                <div className="dropdown" style={{position:"absolute", paddingTop: "10px"}}>
                                    <button className="btn btn-outline-info btn-sm pt-3 pb-3" type="button" data-tip="Plus d'options"
                                            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="icon-more-1 s-12"/>
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <div>
                                            <p className="dropdown-item text-blue" onClick={() => {this.setState({choiceArtistType: true})}}><i className="icon-user-plus mr-3"/>Changer de status</p>
                                        </div>
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
                                    </div>
                                </div>

                                <div className="text-center p-5 mt-5" style={{background: "url(" + PhotoTest + ")", backgroundSize: "80%", opacity: 0.5, backgroundRepeat: "no-repeat", backgroundPosition: "center"}}>
                                    <figure className="avatar avatar-xl">
                                        <img src={this.props.profile_info.photo ? this.props.profile_info.photo : PhotoD} alt="profile"/>
                                    </figure>
                                    <div className="pt-2" style={{opacity: 0.8}}>
                                        <h4 className="text-light bg-dark center pt-2"
                                            style={{width: "80%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}>
                                            {this.props.profile_info.name ? this.props.profile_info.name : "Name"}
                                        </h4>
                                        <h4 className="text-light bg-dark center pt-2 pb-2" style={{width: "80%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
                                            {this.props.profile_info.email ? this.props.profile_info.email : "Email"}
                                        </h4>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-outline-primary btn-sm mt-3 pl-4 pr-4"
                                            onClick={() => this.togglePopupEditProfile(0)}>Modifier mon profil
                                    </button>
                                </div>
                                {this.props.role !== "professional_auditor" ?
                                <div className="text-center mt-2 mb-2">
                                    <span className="text-red">Note:&nbsp;5&nbsp;<i className="icon-star-1"/></span>
                                </div> : null }
                            </div>
                                <div className="col-md-8">
                                    <div className="p5 b-b text-center">
                                        <div className="pl-8 mt-4">
                                            <h3>Informations personnelles </h3>
                                        </div>
                                        <div className="row justify-content-center">
                                            {this.GenerateColInfo('email', 'Email')}
                                            {this.GenerateColInfo('age', 'Age')}
                                            {this.GenerateColInfo('gender', 'Genre')}
                                            {this.GenerateColInfo('birth', 'Anniversaire')}
                                            {this.GenerateColInfo('address', 'Adresse')}
                                            {this.GenerateColInfo('phone', 'Téléphone')}
                                            {this.GenerateColInfo('country', 'Pays')}
                                            {this.GenerateColInfo('region', 'Région')}
                                            {this.GenerateColInfo('city', 'Ville')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* if user choice become an artist*/}
                    {this.state.becomeArtistForm ? <Form artistType={this.state.artist_type}/>: null}
                    {/* end form become an artist*/}
                    <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                            <div className="row row-eq-height">
                                <div className="col-lg-12">
                                    <div className="card no-b mb-md-3 p-2">
                                        <div className="card-header no-bg transparent">
                                            <div className="d-flex justify-content-between">
                                                <div className="align-self-center">
                                                    <div className="d-flex">
                                                        <i className="icon-th-list s-36 mr-3 mt-2 text-red"/>
                                                        <div>
                                                            <h4>Gerer votre planning</h4>
                                                            <p>Verifier, Ajouter les information</p>
                                                            {this.state.loading ? this.props.smallSpinner("absolute", "50px") : null}
                                                            <div className="mt-3">
                                                                <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1" role="tablist">
                                                                    {this.props.role === "beatmaker" ?
                                                                        <li className="nav-item">
                                                                            <a className="nav-link active show" data-toggle="tab" href="#beats-tab" role="tab" aria-selected="true">Beats</a>
                                                                        </li> : null}
                                                                    <li className="nav-item">
                                                                        <a className={this.props.role !== "beatmaker" ? "nav-link active show" : "nav-link"} data-toggle="tab" href="#Paiements-Reservations" role="tab" aria-selected="false">Paiements & Réservations</a>
                                                                    </li>
                                                                    <li className="nav-item">
                                                                        <a className="nav-link" data-toggle="tab" href="#Coordonnees-bancaires" role="tab" aria-selected="false">Coordonnées bancaires</a>
                                                                    </li>
                                                                    {this.props.role !== "professional_auditor" ?
                                                                        <li className="nav-item">
                                                                            <a className="nav-link" data-toggle="tab" href="#Refund-Policy" role="tab" aria-selected="false">Politique de remboursement </a>
                                                                        </li> : null}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body no-p">
                                            <div className="tab-content">
                                                {this.props.role === "beatmaker" ?
                                                <div className="tab-pane fade show active" id="beats-tab" role="tabpanel">
                                                    {this.state.user_beats.length !== 0 ?
                                                        <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                            {this.props.CreateBeatsPlaylist(this, "UserProfile", this.state.user_beats, this.state.user_beats_link, "user_profile")}
                                                        </div>
                                                        : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                            <p className="text-center">Pas d'instrumental</p>
                                                        </div>}
                                                </div> : null}
                                                <div className={this.props.role !== "beatmaker" ? "tab-pane fade show active" : "tab-pane fade"} id="Paiements-Reservations" role="tabpanel">
                                                    <PaymentsAndReservations/>
                                                </div>
                                                <div className="tab-pane fade" id="Coordonnees-bancaires" role="tabpanel">
                                                    <BankingDetails/>
                                                </div>
                                                <div className="tab-pane fade" id="Refund-Policy" role="tabpanel">
                                                    <RefundPolicy/>
                                                </div>
                                            </div>
                                        </div>
                                        {this.props.role === "beatmaker" ?
                                            <div className="card-footer pb-2">
                                                <div className="d-flex justify-content-between">
                                                    <div className="align-self-center">
                                                        <button className="btn btn-outline-danger" onClick={() => this.togglePopupAddSingle(0)}>Ajouter un instrumental&nbsp;<i className="icon-plus-circle"/></button>
                                                    </div>
                                                </div>
                                            </div> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    {this.props.contract ? <EditContractBeats/> : null}
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info,
        ready_beats: state.profile.ready_beats,
        user_credentials: state.Home.user_credentials,
        contract: state.profile.contract,
        user_beats: state.profile.user_beats,
        role: state.profile.role,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_add_beats: (data) => {
            dispatch({type: "ADD_PROFILE_BEATS", data: data})
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
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
        smallSpinner: bindActionCreators(CreateFields.smallSpinner, dispatch),
        DifferentArtist: bindActionCreators(PopupFields.DifferentArtist, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
