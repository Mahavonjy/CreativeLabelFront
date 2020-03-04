import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addMaterialsOfService, addPicturesOfService, addTravelExpenses} from "../../FunctionTools/FunctionProps";
import {
    changeFields,
    createOrUpdatePrestation,
    deleteInObject,
    ImageClick,
    objectToFormData,
    resetPropsForm,
    updateAllOptions
} from "../../FunctionTools/Tools";
import Calendar from "../../KantoBiz/Calendar/Calendar";
import PrestationDetails from "../../KantoBiz/Prestations/Form/PrestationDetails";
import PrestationInformation from "../../KantoBiz/Prestations/Form/PrestationInformation";
import Thematics from "../../KantoBiz/Prestations/Form/Thematics";
import {checkErrorMessage} from "../../Validators/Validatiors";
import RefundPolicy from "../Section/RefundPolicy";
import Materials from "./Materials";
import Options from "./Options";

function EditPrestation(props) {

    const dispatch = useDispatch();
    const role = useSelector(state => state.profile.role);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const user_id = useSelector(state => state.KantoBizForm.user_id);
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const props_options = useSelector(state => state.profilePrestations.options);
    const technical_sheet = useSelector(state => state.KantoBizForm.technical_sheet);
    const props_travel_expenses = useSelector(state => state.KantoBizForm.travel_expenses);
    const service_id = useSelector(state => state.KantoBizForm.service_id);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
    const refund_policy = useSelector(state => state.KantoBizForm.refund_policy);
    const PropsOthersCity = useSelector(state => state.KantoBizForm.others_city);
    const PropsDescription = useSelector(state => state.KantoBizForm.description);
    const props_events_selected = useSelector(state => state.KantoBizForm.events_selected);
    const props_price_of_service = useSelector(state => state.KantoBizForm.price_of_service);
    const props_preparation_time = useSelector(state => state.KantoBizForm.preparation_time);
    const props_number_of_artist = useSelector(state => state.KantoBizForm.number_of_artist);
    const props_unit_time_of_preparation = useSelector(state => state.KantoBizForm.unit_time_of_preparation);
    const props_unit_time_of_service = useSelector(state => state.KantoBizForm.unit_time_of_service);
    const props_service_time = useSelector(state => state.KantoBizForm.service_time);
    const props_thematics_options_selected = useSelector(state => state.KantoBizForm.thematics_options_selected);
    const PropsCountry = useSelector(state => state.KantoBizForm.country);
    const props_materials = useSelector(state => state.KantoBizForm.materials);

    const isMounted = useRef(false);
    const [files, setFiles] = useState((PropsFiles));
    const [travel_expenses, setTravelExpense] = useState(props_travel_expenses);

    const deleteImage = (indexImage) => {
        if (files.length > 1) {
            let tmp = files.filter((file, index) => index !== indexImage);
            setFiles(tmp);
            dispatch(addPicturesOfService(tmp));
            toast.success("Supprimer avec succès")
        } else toast.error("Vous ne pouvez pas supprimer toute les photos")
    };

    const updateMaterials = () => {
        let tmp = {...props_materials};
        tmp["technical_sheet"] = technical_sheet;
        let _headers = props.headers;
        _headers['Content-Type'] = 'multipart/form-data';
        tmp = deleteInObject(tmp);
        return axios.put('api/materials/update_service_material/' + service_id, objectToFormData(tmp), {headers: _headers}).then((resp) => {
            dispatch(addMaterialsOfService(resp.data));
            return true;
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message);
            return false;
        })
    };

    const updatePrestation = async () => {
        updateAllOptions(props_options, dispatch, props.headers);
        let response_of_materials_update = await updateMaterials();
        if (!response_of_materials_update) return;
        createOrUpdatePrestation(props, dispatch, {
                PropsTitle,
                PropsFiles,
                PropsCityReference,
                PropsOthersCity,
                PropsDescription,
                props_events_selected,
                props_price_of_service,
                props_preparation_time,
                props_number_of_artist,
                props_service_time,
                props_thematics_options_selected,
                props_unit_time_of_preparation,
                props_unit_time_of_service,
                PropsCountry,
                refund_policy,
                service_id,
                travel_expenses,
                "materials_id": props_materials.id,
                user_id
            }, "update"
        ).then(resp => {
            if (resp.error) {
                if (!resp.message)
                    toast.error("Meme titre, type d'evenement dans la même ville ne peut pas etre dupliquer");
                else toast.error(resp.message);
            } else {
                resetPropsForm(dispatch);
                props.updated();
            }
        });
    };

    const createPrestation = () => {
        createOrUpdatePrestation(props, dispatch, {
                PropsTitle,
                PropsFiles,
                PropsCityReference,
                PropsOthersCity,
                PropsDescription,
                props_events_selected,
                props_price_of_service,
                props_preparation_time,
                props_number_of_artist,
                props_service_time,
                props_thematics_options_selected,
                props_unit_time_of_preparation,
                props_unit_time_of_service,
                PropsCountry,
                refund_policy,
                travel_expenses,
            }
        ).then(resp => {
            if (resp.error) {
                if (!resp.message)
                    toast.error("Meme titre, type d'evenement dans la même ville ne peut pas etre dupliquer");
                else toast.error(resp.message);
            } else {
                resetPropsForm(dispatch);
                props.updated(true)
            }
        });
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="card no-b">
            <ToastContainer/>
            <ReactTooltip place="left" className="special-color-dark" id='global_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Frais de déplacement génerale</h5><br/>

                <small>• Ce prix sera le frais de déplacement globale de chaque nouvelle préstation </small><br/>
                <small>• Au début ce prix sera synchroniser avec votre première préstation</small><br/>
                <small>• Vous pouvez personnaliser pour chaque prestation le frais de déplacement ou bien en fonction de
                    la date aussi</small><br/><br/>
            </ReactTooltip>
            <h3 className="text-red text-center">Modifier cette prestation</h3>
            <div className="card-body">
                <div className="row justify-content-center">
                    <div className="col-lg-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist"
                             aria-orientation="vertical">
                            <a className="nav-link active" data-toggle="pill" href="#v-pills-prestation" role="tab"
                               aria-controls="v-pills-prestation" aria-selected="true">
                                Préstation
                            </a>
                            <a className="nav-link" id="v-pills-price-condition-tab" data-toggle="pill"
                               href="#v-pills-price-condition" role="tab" aria-controls="v-pills-price-condition"
                               aria-selected="false">
                                Prix & conditions
                            </a>
                            <a className="nav-link" id="v-pills-materials-tab" data-toggle="pill"
                               href="#v-pills-materials" role="tab" aria-controls="v-pills-materials"
                               aria-selected="false">
                                Matériels nécessaires
                            </a>
                            <a className="nav-link" id="v-pills-options-gestion-tab" data-toggle="pill"
                               href="#v-pills-options-gestion" role="tab" aria-controls="v-pills-options-gestion"
                               aria-selected="false">
                                Gestion des options
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-9 scrollbar-isl overflow-auto" style={{height: 600}}>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane text-center fade active show" id="v-pills-prestation"
                                 role="tabpanel" aria-labelledby="v-pills-prestation-tab">
                                <Thematics var={{artistType: role}} edit/>
                                <PrestationInformation aartistType={role} edit/>
                                <div className="pt-5 mb-2">
                                    <div className="cube-container">
                                        <div className="cube initial-position">
                                            {files.map((val, index) => <img key={index}
                                                                            data-tip="Cliquez moi pour me supprimer"
                                                                            className={"cube-face-image image-" + (index + 1)}
                                                                            src={val} onClick={() => deleteImage(index)}
                                                                            alt=""/>)}
                                        </div>
                                    </div>
                                    <div className="image-buttons">
                                        {files.map((val, index) => <input style={{width: 120, height: 120}} key={index}
                                                                          onClick={(e) => ImageClick(e)} type="image"
                                                                          className={"show-image-" + (index + 1)}
                                                                          src={val} alt=""/>)}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-price-condition" role="tabpanel"
                                 aria-labelledby="v-pills-price-condition-tab">
                                {/* cette balise sera enlever pour les beatmakers et les monteurs vidéoclips au vue du caractère spécifique de leurs prestations*/}
                                <div className="text-center">
                                    <h4 className="text-light text-center bolder pt-3 pb-2">Votre frais de déplacement
                                        pour cette prestation:</h4>
                                    <div className="col text-center pt-2 pb-3">
                                        <h2 className="text-red">{travel_expenses} $&nbsp;
                                            <i className="icon icon-info text-red" data-tip data-for="global_price"/>
                                        </h2>
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center">
                                                <div className="input-group-text text-dark"><i
                                                    className="icon-money"/>&nbsp;Modifier le prix ici *
                                                </div>
                                                <input className="form-control" type="number" id="global_price"
                                                       name="global_price"
                                                       onChange={(e) => changeFields(setTravelExpense, e, addTravelExpenses, dispatch)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}
                                <RefundPolicy headers={props.headers} edit/>
                                <PrestationDetails edit/>
                                <h2 className="text-center text-primary pb-3">Calendrier&nbsp;<i
                                    className="icon icon-info" data-tip="Ceci est un aperçu de votre planing"/></h2>
                                <Calendar noEdit/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-materials" role="tabpanel"
                                 aria-labelledby="v-pills-materials-tab">
                                <Materials headers={props.headers} edit/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-options-gestion" role="tabpanel"
                                 aria-labelledby="v-pills-options-gestion-tab">
                                <Options headers={props.headers} edit/>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="btn btn-outline-danger pl-5 pr-5 center mb-2 mt-3"
                        onClick={!props.copyEdit ? () => updatePrestation() : () => createPrestation()}>
                    {!props.copyEdit ? "mettre a jour" : "Créer après modification"}</button>
            </div>
        </div>
    );
}

export default EditPrestation;
