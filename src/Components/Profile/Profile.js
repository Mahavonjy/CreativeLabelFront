import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import EditProfile from './Edit/EditProfile';
import AddSingle from './AddMedia/AddSingle';
import EditSingle from './Edit/EditSingle';
import { useDispatch, useSelector } from 'react-redux';
import Conf from "../../Config/tsconfig";
import PhotoD from '../../images/socials/profile.png';
import PhotoTest from '../../images/Backgrounds/adult-banking-business-2254122.jpg';
import { ToastContainer, toast } from 'react-toastify';
import EditContractBeats from "./ContractBeats/EditContractBeats";
import * as Tools from "../FunctionTools/Tools";
import { CreateBeatsPlaylist, smallSpinner } from "../FunctionTools/CreateFields";
import Form from "../KantoBiz/Prestations/Form/Form";
import { DifferentArtist,  } from "../FunctionTools/PopupFields";
import PaymentsAndReservations from "./Section/PaymentsAndReservations";
import BankingDetails from "./Section/BankingDetails";
import RefundPolicy from "./Section/RefundPolicy";
import MyPrestations from "./Section/MyPrestations";
import EditPrestation from "./Section/EditPrestation";
import Modal from "react-awesome-modal";
import { profileAddBeats, profileUpdateBeats, profileReadyBeats } from "../FunctionTools/FunctionProps";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

function Profile (props) {

    const dispatch = useDispatch();
    const user_credentials = useSelector(state => state.Home.user_credentials);
    const redux_profile_info = useSelector(state => state.profile.profile_info);
    const ready_beats = useSelector(state => state.profile.ready_beats);
    const contract = useSelector(state => state.profile.contract);
    const user_beats = useSelector(state => state.profile.user_beats);
    const user_role = useSelector(state => state.profile.role);

    const isMounted = useRef(false);
    const [user_beats_link, setUserBeatsLink] = useState([]);
    const [song, setSong] = useState("");
    const [type_, setType_] = useState("");
    const [index, setIndex] = useState(null);
    const [tmp, setTmp] = useState(null);
    const [profile_info, setProfileInfo] = useState(redux_profile_info);
    const [state_user_beats, setStateUserBeats] = useState(user_beats);
    const [activeToast, setActiveToast] = useState(true);
    const [loading, setLoading] = useState(false);
    const [popupEditProfile, setPopupEditProfile] = useState(false);
    const [popupAddSingle, setPopupAddSingle] = useState(false);
    const [popupAddEditSingle, setPopupAddEditSingle] = useState(-1);
    const [choiceArtistType, setChoiceArtistType] = useState(false);
    const [becomeArtistForm, setBecomeArtistForm] = useState(false);
    const [artistType, setArtistType] = useState(user_role);

    const togglePopupEditProfile = async (success) => {
        setPopupEditProfile(!popupEditProfile);
        setActiveToast(false);
        if (success === 1) {
            await setActiveToast(true);
            toast.success("Profile updated");
        }
    };

    const updateUserBeats = async (data, message, edit) => {
        let user_tmp_beats = [...state_user_beats];
        if (edit) user_tmp_beats[user_tmp_beats.indexOf(song)] = data;
        else await setUserBeatsLink(user_beats_link => [...user_beats_link, {[user_beats_link.length]: true}]);
        if (!edit) await user_tmp_beats.push(data);
        await setActiveToast(true);
        await dispatch(profileAddBeats(user_tmp_beats));
        await setStateUserBeats(user_tmp_beats);
        toast.success(message);
    };

    const togglePopupAddSingle = async (success, data) => {
        setPopupAddSingle(!popupAddSingle);
        await setActiveToast(false);
        if (success === 1)
            updateUserBeats(data, "Ajout avec success", false).then(() => null);
    };

    const togglePopupEditSingle = async (index, type_) => {
        await setActiveToast(false);
        await setType_(type_);
        await setSong(user_beats[index]);
        await setPopupAddEditSingle(index);
    };

    const afterEditSingle = async (data) => {
        setPopupAddEditSingle(-1);
        await updateUserBeats(data, "Modification avec success", true);
    };

    const GenerateColInfo = (state_name, issue, index) => {
        return (
            <div className="col-md-4" key={index}>
                <div className="p-4">
                    <h5>{issue}</h5>
                    <span>{profile_info[state_name] ? profile_info[state_name] : "Votre " + issue}</span>
                </div>
            </div>
        );
    };

    const remove = async (e, type_) => {
        const id = e.target.id;
        await setActiveToast(true);
        await document.getElementById(id).setAttribute("disabled", "disabled");
        await setLoading(true);
        axios.delete(Conf.configs.ServerApi + "api/" + type_ + "/delete/" + id, {headers: headers}).then(() => {
            setLoading(false);
            let new_beats_array = state_user_beats.filter((beat) => beat.id !== parseInt(id));
            dispatch(profileAddBeats(new_beats_array));
            setStateUserBeats(new_beats_array);
            toast.success("Supprimé");
        }).catch(err => {
            setLoading(false);
            document.getElementById(id).removeAttribute("disabled");
            toast.error(err.response.data)
        })
    };

    let states = {
        link: user_beats_link,
        beats: state_user_beats,
        togglePopupEditSong: togglePopupEditSingle,
        index: index,
        setIndex: setIndex,
        tmp: tmp,
        remove: remove,
        setTmp: setTmp,
    };

    useEffect(() => {
        try {
            headers['Isl-Token'] = user_credentials.token;
        } catch (e) {
            //
        } finally {
            if (!ready_beats && user_beats.length !== 0) {
                Tools.getMediaLink(setUserBeatsLink, user_beats_link, user_beats, profileUpdateBeats, dispatch).then(() => null);
                dispatch(profileReadyBeats())
            } else if (user_beats.length !== 0) {
                for (let row_ in user_beats) setUserBeatsLink(user_beats_link => [...user_beats_link, {row: true}])
            }
        }
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base p-b-100">
            {activeToast && <ToastContainer/>}
            {popupAddSingle && <AddSingle Type={"beats"} closePopup={(e, data) => togglePopupAddSingle(e, data)}/>}
            {popupEditProfile && <EditProfile closePopup={(e) => togglePopupEditProfile(e)} updateProfile={setProfileInfo}/>}
            {popupAddEditSingle !== -1 && <EditSingle Song={song} Type={type_} Success={(data) => {afterEditSingle(data).then(() => null)}} CloseEdit={() => setPopupAddEditSingle(-1)}/>}
            {choiceArtistType && DifferentArtist(setArtistType, setChoiceArtistType, setBecomeArtistForm)}
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
                                        <p className="dropdown-item text-blue" onClick={() => setChoiceArtistType(true)}><i className="icon-user-plus mr-3"/>Changer de status</p>
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
                                    <img src={profile_info.photo ? profile_info.photo : PhotoD} alt="profile"/>
                                </figure>
                                <div className="pt-2" style={{opacity: 0.8}}>
                                    <h4 className="text-light bg-dark center pt-2"
                                        style={{width: "80%", borderTopLeftRadius: "10px", borderTopRightRadius: "10px"}}>
                                        {profile_info.name ? profile_info.name : "Name"}
                                    </h4>
                                    <h4 className="text-light bg-dark center pt-2 pb-2" style={{width: "80%", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
                                        {profile_info.email ? profile_info.email : "Email"}
                                    </h4>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-outline-primary btn-sm mt-3 pl-4 pr-4"
                                        onClick={() => togglePopupEditProfile(0)}>Modifier mon profil
                                </button>
                            </div>
                            {user_role !== "professional_auditor" ?
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
                                    {[
                                        ['email', 'Email'], ['age', 'Age'], ['gender', 'Genre'], ['birth', 'Anniversaire'],
                                        ['address', 'Adresse'], ['phone', 'Téléphone'], ['country', 'Pays'],
                                        ['region', 'Région'], ['city', 'Ville']].map((val, index) =>
                                        GenerateColInfo(val[0], val[1], index))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* if user choice become an artist*/}
            <Modal visible={becomeArtistForm} width="80%" height="80%" effect="fadeInUp" onClickAway={() => setBecomeArtistForm(false)}>
                <div className="bg-dark" style={{height:"100%"}}>
                    <button className="ModalClose" onClick={() => setBecomeArtistForm(false)}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <Form artistType={artistType.charAt(0).toUpperCase() + artistType.slice(1)}/>
                </div>
            </Modal>
            {/* end form become an artist*/}

            <Modal visible={false} width="80%" height="80%" effect="fadeInUp">
                <div className="bg-dark" style={{height:"100%"}}>
                    <button className="ModalClose">
                        <i className="icon-close s-24 text-warning"/>
                    </button>
                    <EditPrestation/>
                </div>
            </Modal>

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
                                                {loading && smallSpinner("absolute", "50px")}
                                                <div className="mt-3">
                                                    <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1" role="tablist">
                                                        {user_role === "beatmaker" &&
                                                            <li className="nav-item">
                                                                <a className="nav-link active show" data-toggle="tab" href="#beats-tab" role="tab" aria-selected="true">Beats</a>
                                                            </li>}
                                                        {user_role !== "professional_auditor" &&
                                                        <li className="nav-item">
                                                            <a className={user_role !== "beatmaker" ? "nav-link active show" : "nav-link"} data-toggle="tab" href="#Prestations" role="tab" aria-selected="false">Mes prestations</a>
                                                        </li>}
                                                        <li className="nav-item">
                                                            <a className={user_role === "professional_auditor" ? "nav-link active show" : "nav-link"} data-toggle="tab" href="#Paiements-Reservations" role="tab" aria-selected="false">Paiements & Réservations</a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab" href="#Coordonnees-bancaires" role="tab" aria-selected="false">Coordonnées bancaires</a>
                                                        </li>
                                                        {user_role !== "professional_auditor" ?
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
                                    {user_role === "beatmaker" &&
                                        <div className="tab-pane fade show active" id="beats-tab" role="tabpanel">
                                            {state_user_beats.length !== 0 ?
                                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                    {CreateBeatsPlaylist("user_profile", "user_profile", props, states, "user_profile")}
                                                </div>
                                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                    <p className="text-center">Pas d'instrumental</p>
                                                </div>}
                                        </div>}
                                    {user_role !== "professional_auditor" &&
                                    <div className={user_role !== "beatmaker" ? "tab-pane fade show active" : "tab-pane fade"} id="Prestations" role="tabpanel">
                                        <MyPrestations role={user_role}/>
                                    </div>}
                                    <div className={user_role === "professional_auditor" ? "tab-pane fade show active" : "tab-pane fade"} id="Paiements-Reservations" role="tabpanel">
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
                            {user_role === "beatmaker" ?
                                <div className="card-footer pb-2">
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <button className="btn btn-outline-success" onClick={() => togglePopupAddSingle(0)}>Ajouter un instrumental&nbsp;<i className="icon-plus-circle"/></button>
                                        </div>
                                        <div className="align-self-center">
                                            <button className="btn btn-outline-success" onClick={() => setBecomeArtistForm(true)}>Créer une prestation &nbsp;<i className="icon-plus-circle"/></button>
                                        </div>
                                    </div>
                                </div> : null}
                        </div>
                    </div>
                </div>
            </div>
            {contract && <EditContractBeats/>}
        </div>
    )
}

export default Profile;
