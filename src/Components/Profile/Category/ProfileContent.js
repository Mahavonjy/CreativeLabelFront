import axios from "axios";
import React, {memo, useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {CreateBeatsPlaylist, smallSpinner} from "../../FunctionTools/CreateFields";
import {profileAddBeats} from "../../FunctionTools/FunctionProps";
import {resetPropsForm} from "../../FunctionTools/Tools";
import Form from "../../KantoBiz/Prestations/Form/Form";
import AddSingle from "../AddMedia/AddSingle";
import EditSingle from "../Edits/EditSingle";
import BankingDetails from "./Section/BankingDetails";
import CalendarManagement from "./Section/CalendarProfile/CalendarManagement";
import MyPrestations from "./Section/MyPrestations";
import PaymentsAndReservations from "./Section/PaymentsAndReservations";
import RefundPolicy from "./Section/RefundPolicy";

function ProfileContent(props) {

    const dispatch = useDispatch();
    const props_prestation = useSelector(state => state.profilePrestations.prestations);

    const isMounted = useRef(false);
    const [song, setSong] = useState("");
    const [type_, setType_] = useState("");
    const [tmp, setTmp] = useState(null);
    const [index, setIndex] = useState(null);
    const [loading, setLoading] = useState(false);
    const [allPrestation, setAllPrestation] = useState(props_prestation);
    const [popupAddSingle, setPopupAddSingle] = useState(false);
    const [popupAddEditSingle, setPopupAddEditSingle] = useState(-1);

    const togglePopupEditSingle = async (index, type_) => {
        await setType_(type_);
        await setSong(props.user_beats[index]);
        await setPopupAddEditSingle(index);
    };

    const togglePopupAddSingle = async (success, data) => {
        setPopupAddSingle(!popupAddSingle);
        if (success === 1)
            updateUserBeats(data, "Ajout avec success", false).then(() => null);
    };

    const updateUserBeats = async (data, message, edit) => {
        let user_tmp_beats = [...props.state_user_beats];
        if (edit) user_tmp_beats[user_tmp_beats.indexOf(song)] = data;
        else {
            await props.setUserBeatsLink(
                user_beats_link => [
                    ...props.user_beats_link, {[props.user_beats_link.length]: true}
                ]
            );
            await user_tmp_beats.push(data);
        }
        await dispatch(profileAddBeats(user_tmp_beats));
        await props.setStateUserBeats(user_tmp_beats);
        await toast.success(message);
    };

    const afterEditSingle = async (data) => {
        setPopupAddEditSingle(-1);
        await updateUserBeats(data, "Modification avec success", true);
    };

    const remove = async (e, type_) => {
        const id = e.target.id;
        await document.getElementById(id).setAttribute("disabled", "disabled");
        await setLoading(true);
        axios.delete("api/" + type_ + "/delete/" + id, {headers: props.headers}).then(() => {
            setLoading(false);
            let new_beats_array = props.state_user_beats.filter((beat) => beat.id !== parseInt(id));
            dispatch(profileAddBeats(new_beats_array));
            props.setStateUserBeats(new_beats_array);
            toast.success("Supprimé");
        }).catch(err => {
            setLoading(false);
            document.getElementById(id).removeAttribute("disabled");
            toast.error(err.response.data)
        })
    };

    const tabList = (
        <ul className="nav nav-tabs nav-material responsive-tab d-flex flex-wrap justify-content-center" role="tablist">
            {props.user_role !== "professional_auditor" &&
            <li className="nav-item">
                <a className="nav-link active show"
                   data-toggle="tab"
                   href="#Calendar-Management"
                   role="tab"
                   aria-selected="false">
                    Gestion de Calendrier
                </a>
            </li>}
            {props.user_role === "beatmaker" &&
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#beats-tab"
                   role="tab"
                   aria-selected="true">
                    Beats & contrats
                </a>
            </li>}
            {props.user_role !== "professional_auditor" &&
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#Prestations"
                   role="tab"
                   aria-selected="false">
                    Mes prestations
                </a>
            </li>}
            <li className="nav-item">
                <a className={
                    props.user_role === "professional_auditor"
                        ? "nav-link active show"
                        : "nav-link"}
                   data-toggle="tab"
                   href="#Paiements-Reservations"
                   role="tab" aria-selected="false">
                    Paiements & Réservations
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#Coordonnees-bancaires"
                   role="tab"
                   aria-selected="false">
                    Coordonnées bancaires
                </a>
            </li>
            {props.user_role !== "professional_auditor" &&
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#Refund-Policy"
                   role="tab"
                   aria-selected="false">
                    Politique de remboursement
                </a>
            </li>}
        </ul>
    );

    let states = {
        link: props.user_beats_link,
        beats: props.state_user_beats,
        togglePopupEditSong: togglePopupEditSingle,
        index: index,
        setIndex: setIndex,
        tmp: tmp,
        remove: remove,
        setTmp: setTmp,
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [props_prestation]);

    return (
        <div className="container-fluid relative animatedParent animateOnce p-lg-3">

            {popupAddEditSingle !== -1 &&
            <EditSingle
                Song={song}
                Type={type_}
                Success={(data) => afterEditSingle(data).then(() => null)}
                CloseEdit={() => setPopupAddEditSingle(-1)}
            />}

            {popupAddSingle && <AddSingle Type={"beats"} closePopup={(e, data) => togglePopupAddSingle(e, data)}/>}

            <Modal width="80%"
                   height="60%"
                   effect="fadeInUp"
                   visible={(props.addNewPrestation ? props.addNewPrestation : props.addNewPrestationForNewArtist)}>
                <div className="bg-dark scrollbar-isl overflow-auto">
                    <button className="ModalClose"
                            onClick={() => {
                                resetPropsForm(dispatch);
                                props.addNewPrestation
                                    ? props.setAddNewPrestation(false)
                                    : props.setAddNewPrestationForNewArtist(false)
                            }}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    {(props.addNewPrestation ? props.addNewPrestation : props.addNewPrestationForNewArtist) &&
                    <Form
                        new
                        headers={props.headers}
                        artistType={props.user_role}
                        allPrestation={allPrestation}
                        setAllPrestation={setAllPrestation}
                        setAddNewPrestation={props.setAddNewPrestation}
                        close={() => toast.success("Ajouter avec succes")}
                        setAddNewPrestationForNewArtist={props.setAddNewPrestationForNewArtist}
                    />}
                </div>
            </Modal>

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
                                            <div className="mt-3 d-none d-sm-block">
                                                {tabList}
                                            </div>
                                            <div className="ml-auto d-sm-none">
                                                <a href="/#"
                                                   data-toggle="dropdown"
                                                   aria-haspopup="true"
                                                   aria-expanded="false">
                                                    <i className="icon icon-more-1"/>
                                                    Afficher le menu
                                                </a>
                                                <div className="dropdown-menu dropdown-menu-right">
                                                    {tabList}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body no-p">
                            <div className="tab-content">
                                {props.user_role !== "professional_auditor" &&
                                <div className="tab-pane fade show active" id="Calendar-Management" role="tabpanel">
                                    <CalendarManagement headers={props.headers}/>
                                </div>}
                                {props.user_role === "beatmaker" &&
                                <div className="tab-pane fade" id="beats-tab" role="tabpanel">
                                    {props.state_user_beats.length !== 0 ?
                                        <div className="playlist bg-dark pl-lg-3 pr-lg-3 scrollbar-isl"
                                             style={{height: 320}}>
                                            {CreateBeatsPlaylist(
                                                "user_profile",
                                                "user_profile",
                                                props,
                                                states,
                                                "user_profile"
                                            )}
                                        </div> :
                                        <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                            <p className="text-center pt-5 text-red">Pas de beat</p>
                                        </div>}
                                </div>}
                                {props.user_role !== "professional_auditor" &&
                                <div className="tab-pane fade" id="Prestations" role="tabpanel">
                                    <MyPrestations
                                        profile
                                        role={props.user_role}
                                        headers={props.headers}
                                        setAllPrestation={setAllPrestation}
                                        allPrestation={allPrestation}
                                        setAddNewPrestation={props.setAddNewPrestation}
                                        close={() => toast.success("Ajouter avec succes")}
                                    />
                                </div>}
                                <div
                                    className={
                                        props.user_role === "professional_auditor"
                                            ? "tab-pane fade show active"
                                            : "tab-pane fade"}
                                    id="Paiements-Reservations" role="tabpanel">
                                    <PaymentsAndReservations headers={props.headers}/>
                                </div>
                                <div className="tab-pane fade" id="Coordonnees-bancaires" role="tabpanel">
                                    <BankingDetails headers={props.headers}/>
                                </div>
                                <div className="tab-pane fade" id="Refund-Policy" role="tabpanel">
                                    <RefundPolicy headers={props.headers}/>
                                </div>
                            </div>
                        </div>
                        {props.user_role !== "professional_auditor" &&
                        <div className="card-footer pb-2">
                            <div className="d-flex justify-content-between">
                                {props.user_role === "beatmaker" &&
                                <div className="align-self-center">
                                    <button className="btn btn-outline-danger"
                                            onClick={() => togglePopupAddSingle(0)}>
                                        Ajouter un beat&nbsp;
                                        <i className="icon-plus-circle"/></button>
                                </div>}
                                <div className="align-self-center">
                                    <button className="btn btn-outline-danger"
                                            onClick={() => {props.setAddNewPrestation(true)}}>
                                        Créer une prestation &nbsp;
                                        <i className="icon-plus-circle"/></button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(ProfileContent);
