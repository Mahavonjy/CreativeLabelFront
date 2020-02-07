import React, { useEffect, useRef, useState } from "react";
import Thematics from "../../KantoBiz/Prestations/Form/Thematics";
import {useDispatch, useSelector} from "react-redux";
import PrestationInformation from "../../KantoBiz/Prestations/Form/PrestationInformation";
import { ImageClick, changeFields, checkValueOfUnit, createNewPrestation } from "../../FunctionTools/Tools";
import PrestationDetails from "../../KantoBiz/Prestations/Form/PrestationDetails";
import RefundPolicy from "../Section/RefundPolicy";
import ReactTooltip from "react-tooltip";
import Calendar from "../../KantoBiz/Calendar/Calendar";
import Materials from "./Materials";
import Options from "./Options";
import { toast, ToastContainer } from "react-toastify";
import { addPicturesOfService } from "../../FunctionTools/FunctionProps";

function EditPrestation(props) {

    const dispatch = useDispatch();
    const role = useSelector(state => state.profile.role);
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const props_prestation = useSelector(state => state.profilePrestations.prestations);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
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
    const props_moving_price = useSelector(state => state.KantoBizForm.moving_price);
    const props_hidden = useSelector(state => state.KantoBizForm.hidden);
    const props_materials = useSelector(state => state.KantoBizForm.materials);

    const isMounted = useRef(false);
    const [files, setFiles] = useState((PropsFiles));
    const [global_price, setGlobalPrice] = useState(300);

    const deleteImage = (indexImage) => {
        if (files.length > 1) {
            let tmp = files.filter((file, index) => index !== indexImage);
            setFiles(tmp);
            dispatch(addPicturesOfService(tmp));
            toast.success("Supprimer avec succès")
        }
        else toast.error("Vous ne pouvez pas supprimer toute les prestations")
    };

    const updatePrestation = async () => {
        let tmp_prestation = props_prestation[props.index];
        tmp_prestation['hidden'] = props_hidden;
        tmp_prestation['title'] = PropsTitle;
        tmp_prestation['city_of_reference'] = PropsCityReference;
        tmp_prestation['others_city'] = PropsOthersCity;
        tmp_prestation['description'] = PropsDescription;
        tmp_prestation['events_type'] = props_events_selected;
        tmp_prestation['price'] = props_price_of_service;
        tmp_prestation['preparation_time']['time'] = props_preparation_time;
        tmp_prestation['number_of_artist'] = props_number_of_artist;
        tmp_prestation['service_time']['time'] = props_service_time;
        tmp_prestation['thematics_options_selected'] = props_thematics_options_selected;
        tmp_prestation['moving_price'] = props_moving_price;
        tmp_prestation['materials'] = props_materials;
        tmp_prestation['preparation_time']['unit'] = checkValueOfUnit(props_unit_time_of_preparation);
        tmp_prestation['service_time']['unit'] = checkValueOfUnit(props_unit_time_of_service);
        await props.updated();
    };

    const createPrestation = () => {
        createNewPrestation(
            props.setActiveToast, props_prestation, props.setAllPrestation, props.setAddNewPrestation, dispatch,
            props.close, { PropsTitle, PropsFiles, PropsCityReference, PropsOthersCity, PropsDescription,
            props_events_selected, props_price_of_service, props_preparation_time, props_number_of_artist, props_service_time,
            props_thematics_options_selected, props_unit_time_of_preparation, props_unit_time_of_service }
        ).then(resp => {
            if (!resp)
                toast.error("Meme titre, type d'evenement dans la même ville ne peut pas etre dupliquer");
            else props.updated(true);
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
                <small>• Vous pouvez personnaliser pour chaque prestation le frais de déplacement ou bien en fonction de la date aussi</small><br/><br/>
            </ReactTooltip>
            <h3 className="text-red text-center">Modifier cette prestation</h3>
            <div className="card-body">
                <div className="row justify-content-center">
                    <div className="col-lg-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" data-toggle="pill" href="#v-pills-prestation" role="tab" aria-controls="v-pills-prestation" aria-selected="true">
                                Préstation
                            </a>
                            <a className="nav-link" id="v-pills-price-condition-tab" data-toggle="pill" href="#v-pills-price-condition" role="tab" aria-controls="v-pills-price-condition" aria-selected="false">
                                Prix & conditions
                            </a>
                            <a className="nav-link" id="v-pills-materials-tab" data-toggle="pill" href="#v-pills-materials" role="tab" aria-controls="v-pills-materials" aria-selected="false">
                                Matériels nécessaires
                            </a>
                            <a className="nav-link" id="v-pills-options-gestion-tab" data-toggle="pill" href="#v-pills-options-gestion" role="tab" aria-controls="v-pills-options-gestion" aria-selected="false">
                                Gestion des options
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-9 scrollbar-isl overflow-auto" style={{height: 600}}>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane text-center fade active show" id="v-pills-prestation" role="tabpanel" aria-labelledby="v-pills-prestation-tab">
                                <div className="form-group pt-5">
                                    <div className="custom-file" data-tip="Fiche technique en pdf">
                                        <input type="file" accept="application/pdf" className="custom-file-input" />
                                        <label className="custom-file-label text-black" htmlFor="inputGroupFile01">Importer ici la fiche technique de cette prestation</label>
                                    </div>
                                </div>
                                <Thematics var={{artistType: role.charAt(0).toUpperCase() + role.slice(1)}} edit/>
                                <PrestationInformation aartistType={role.charAt(0).toUpperCase() + role.slice(1)} edit/>
                                <div className="pt-5 mb-2">
                                    <div className="cube-container">
                                        <div className="cube initial-position">
                                            {files.map((val, index) => <img key={index} data-tip="Cliquez moi pour me supprimer" className={"cube-face-image image-" + index} src={val} onClick={() => deleteImage(index)} alt=""/>)}
                                        </div>
                                    </div>
                                    <div className="image-buttons">
                                        {files.map((val, index) => <input style={{width: 120}} key={index} onClick={(e) => ImageClick(e)} type="image" className={"show-image-" + index} src={val} alt=""/>)}
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-price-condition" role="tabpanel" aria-labelledby="v-pills-price-condition-tab">
                                {/* cette balise sera enlever pour les beatmakers et les monteurs vidéoclips au vue du caractère spécifique de leurs prestations*/}
                                <div className="text-center">
                                    <h4 className="text-light text-center bolder pt-3 pb-2">Votre frais de déplacement générale est de:</h4>
                                    <div className="col text-center pt-2 pb-3">
                                        <h2 className="text-red">{global_price} $&nbsp;
                                            <i className="icon icon-info text-red" data-tip data-for="global_price" /></h2>
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center">
                                                <div className="input-group-text text-dark"><i className="icon-money"/>&nbsp;Modifier le prix ici *</div>
                                                <input className="form-control" type="number" id="global_price" name="global_price"
                                                       onChange={(e) => changeFields(setGlobalPrice, e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}
                                <RefundPolicy edit/>
                                <PrestationDetails edit/>
                                <h2 className="text-center text-primary pb-3">Calendrier&nbsp;<i className="icon icon-info" data-tip="Ceci est un aperçu de votre planing"/></h2>
                                <Calendar noEdit/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-materials" role="tabpanel" aria-labelledby="v-pills-materials-tab">
                                <Materials edit/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-options-gestion" role="tabpanel" aria-labelledby="v-pills-options-gestion-tab">
                                <Options edit/>
                            </div>
                        </div>
                    </div>
                </div>
                {props.copyEdit ? <button className="btn btn-outline-danger pl-5 pr-5 center mb-2 mt-3" onClick={() => createPrestation()}>Créer après modification</button>:
                <button className="btn btn-outline-danger pl-5 pr-5 center mb-2 mt-3" onClick={() => updatePrestation()}>mettre a jour</button>}
            </div>
        </div>
    );
}

export default EditPrestation;
