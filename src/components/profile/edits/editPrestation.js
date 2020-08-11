import axios from "axios";
import React, {memo, useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addMaterialsOfService} from "../../functionTools/functionProps";
import {
    createOrUpdatePrestation,
    deleteInObject,
    objectToFormData,
    resetPropsForm,
    updateAllOptions
} from "../../functionTools/tools";
import Calendar from "../../modules/kantoBiz/calendar/calendar";
import PrestationDetails from "../../modules/kantoBiz/prestations/form/prestationDetails";
import PrestationInformation from "../../modules/kantoBiz/prestations/form/prestationInformation";
import Thematics from "../../modules/kantoBiz/prestations/form/thematics";
import {checkErrorMessage} from "../../validators/validatiors";
import TransportExpenses from "../category/section/myPrestations/transportExpenses";
import RefundPolicy from "../category/section/refundPolicy";
import Materials from "./materials";
import Options from "./options";

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

    const updateMaterials = () => {
        let tmp = {...props_materials};
        tmp["technical_sheet"] = technical_sheet;
        let _headers = props.headers;
        _headers['Content-Type'] = 'multipart/form-data';
        tmp = deleteInObject(tmp);
        return axios.put('api/materials/update_service_material/' + service_id, objectToFormData(tmp),
            {headers: _headers}).then((resp) => {
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
                props_travel_expenses,
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
                props_travel_expenses,
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

    const tabList = (dNone) => (
        <div className={dNone ? "nav flex-column nav-pills" : "nav flex-column nav-pills d-none d-sm-block"}
             id="v-pills-tab"
             role="tablist"
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
            {/*<a className="nav-link" id="v-pills-options-gestion-tab" data-toggle="pill"*/}
            {/*   href="#v-pills-options-gestion" role="tab" aria-controls="v-pills-options-gestion"*/}
            {/*   aria-selected="false">*/}
            {/*    Gestion des options*/}
            {/*</a>*/}
        </div>
    );

    const prestationNav = (
        <ul className="nav nav-tabs nav-material responsive-tab d-flex flex-wrap justify-content-center"
            role="tablist">
            <li className="nav-item">
                <a className="nav-link active show"
                   data-toggle="tab"
                   href="#edit-thematics"
                   role="tab"
                   aria-selected="false">
                    Thematique
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#edit-details"
                   role="tab"
                   aria-selected="false">
                    Informations sur la prestation
                </a>
            </li>
        </ul>
    );

    const prestationPCNav = (
        <ul className="nav nav-tabs nav-material responsive-tab d-flex flex-wrap justify-content-center"
            role="tablist">
            <li className="nav-item">
                <a className="nav-link active show"
                   data-toggle="tab"
                   href="#edit-travel-expenses"
                   role="tab"
                   aria-selected="false">
                    Frais de deplacement
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#edit-refund-policy"
                   role="tab"
                   aria-selected="false">
                    Politique de remboursement
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#edit-service-details"
                   role="tab"
                   aria-selected="false">
                    Details de la prestation
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link"
                   data-toggle="tab"
                   href="#show-calendar"
                   role="tab"
                   aria-selected="false">
                    Calendrier
                </a>
            </li>
        </ul>
    );

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
                        {tabList()}
                        <div className="ml-auto d-sm-none">
                            <a href="/#"
                               className="text-red"
                               data-toggle="dropdown"
                               aria-haspopup="true"
                               aria-expanded="false">
                                <i className="icon icon-more-1"/>
                                Afficher le menu
                            </a>
                            <div className="dropdown-menu dropdown-menu-right">
                                {tabList(true)}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-9 scrollbar-isl overflow-auto" style={{height: 350}}>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane text-center fade active show"
                                 id="v-pills-prestation"
                                 role="tabpanel"
                                 aria-labelledby="v-pills-prestation-tab">
                                {prestationNav}
                                <div className="tab-content mt-2">
                                    <div className="tab-pane fade show active" id="edit-thematics" role="tabpanel">
                                        <Thematics var={{artistType: role}} edit/>
                                    </div>
                                    <div className="tab-pane" id="edit-details" role="tabpanel">
                                        <PrestationInformation aartistType={role} edit/>
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel"
                                 className="tab-pane fade mt-2"
                                 id="v-pills-price-condition"
                                 aria-labelledby="v-pills-price-condition-tab">
                                {/*
                                    cette balise sera enlever pour les beatmakers et les
                                    monteurs vidéoclips au vue du caractère spécifique de leurs prestations
                                */}
                                {prestationPCNav}
                                <div className="tab-content mt-2">
                                    <div className="tab-pane fade show active"
                                         id="edit-travel-expenses"
                                         role="tabpanel">
                                        <div className="text-center">
                                            <TransportExpenses headers={props.headers} serviceEdit/>
                                        </div>
                                    </div>
                                    <div className="tab-pane" id="edit-refund-policy" role="tabpanel">
                                        <RefundPolicy headers={props.headers} edit/>
                                    </div>
                                    <div className="tab-pane" id="edit-service-details" role="tabpanel">
                                        <PrestationDetails edit/>
                                    </div>
                                    <div className="tab-pane" id="show-calendar" role="tabpanel">
                                        <Calendar noEdit/>
                                    </div>
                                </div>
                                {/* End */}
                            </div>
                            <div className="tab-pane fade"
                                 id="v-pills-materials"
                                 role="tabpanel"
                                 aria-labelledby="v-pills-materials-tab">
                                <Materials headers={props.headers} edit/>
                            </div>
                            {/*<div className="tab-pane fade"*/}
                            {/*     id="v-pills-options-gestion"*/}
                            {/*     role="tabpanel"*/}
                            {/*     aria-labelledby="v-pills-options-gestion-tab">*/}
                            {/*    <Options headers={props.headers} edit/>*/}
                            {/*</div>*/}
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

export default memo(EditPrestation);
