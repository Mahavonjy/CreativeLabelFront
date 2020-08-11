import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import StepZilla from "react-stepzilla";
import {toast, ToastContainer} from "react-toastify";
import "../../../../../assets/css/style/Form.css"
import Register from "../../../../authentification/register/register";
import {smallSpinner} from "../../../../functionTools/createFields";
import {addStepsIndex, setValueOfToastGlobal} from "../../../../functionTools/functionProps"
import {createOrUpdatePrestation} from "../../../../functionTools/tools";
import HomeRoot from "../../../../home/homeRoot";
import {checkErrorMessage} from "../../../../validators/validatiors";
import PrestationDetails from "./prestationDetails";
import PrestationInformation from "./prestationInformation";
import Recaputilatif from "./recaputilatif";
import Thematics from "./thematics";

function Form(props) {

    const dispatch = useDispatch();
    const conditions = useSelector(state => state.profile.conditions);
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const PropsCountry = useSelector(state => state.KantoBizForm.country);
    const steps_index = useSelector(state => state.KantoBizForm.steps_index);
    const becomeArtistForm = useSelector(state => state.Others.becomeArtistForm);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
    const PropsOthersCity = useSelector(state => state.KantoBizForm.others_city);
    const PropsDescription = useSelector(state => state.KantoBizForm.description);
    const tmpArtistTypeSelected = useSelector(state => state.Others.tmpArtistTypeSelected);
    const props_events_selected = useSelector(state => state.KantoBizForm.events_selected);
    const props_price_of_service = useSelector(state => state.KantoBizForm.price_of_service);
    const props_preparation_time = useSelector(state => state.KantoBizForm.preparation_time);
    const props_number_of_artist = useSelector(state => state.KantoBizForm.number_of_artist);
    const props_unit_time_of_preparation = useSelector(state => state.KantoBizForm.unit_time_of_preparation);
    const props_unit_time_of_service = useSelector(state => state.KantoBizForm.unit_time_of_service);
    const props_service_time = useSelector(state => state.KantoBizForm.service_time);
    const props_thematics_options_selected = useSelector(state => state.KantoBizForm.thematics_options_selected);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [state_steps_index, setStepsIndex] = useState(steps_index);
    const component_steps = [Thematics, PrestationInformation, PrestationDetails, Recaputilatif];
    const steps = [
        {name: 'Choisir votre thématique', component: <Thematics var={props}/>},
        {name: 'Information de votre prestation', component: <PrestationInformation/>},
        {name: 'Detail de votre prestation', component: <PrestationDetails/>},
        {name: 'Recaputilatif', component: <Recaputilatif var={props}/>}
    ];

    const addNewPrestation = () => {
        setLoading(true);
        return createOrUpdatePrestation(props, dispatch, {
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
                "refund_policy": conditions['refund_policy'],
                "props_travel_expenses": conditions['travel_expenses'],
            }
        ).then(resp => {
            if (resp.error) {
                setLoading(false);
                if (!resp.message)
                    toast.error("Meme titre, type d'evenement dans la même ville ne peut pas etre dupliquer");
                else toast.error(resp.message);
                return false;
            } else {
                setLoading(false);
                return true
            }
        });
    };

    const auditorToArtist = () => {
        setLoading(true);
        axios.put("api/users/update_user_to/" + tmpArtistTypeSelected, {}, {headers: props.headers}).then(() => {
            addNewPrestation().then(r => HomeRoot.beforeDataLoad().then(() => toast.success("Vous artiste maintenant")));
            setLoading(true);
        }).catch(error => {
            let message = checkErrorMessage(error).message;
            if (message === "You are already artist right now")
                addNewPrestation().then(r => HomeRoot.beforeDataLoad().then(() => toast.success("Vous artiste maintenant")));
            else toast.error(message);
            setLoading(false);
        })
    };

    const next = async () => {
        let resp = component_steps[state_steps_index].validation();
        if (resp.error) toast.error(resp.message);
        else {
            let step_tmp = state_steps_index + 1;
            await setStepsIndex(step_tmp);
            await dispatch(addStepsIndex(step_tmp));
            await document.getElementById("next-button").click();
        }
    };

    const prev = async () => {
        let step_tmp = await state_steps_index - 1;
        await setStepsIndex(step_tmp);
        await dispatch(addStepsIndex(step_tmp));
        await document.getElementById("prev-button").click();
    };

    const checkProps = () => {
        if (props.new) return true;
        else if (props.register) return true;
        return false;
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [steps_index, state_steps_index, loading, becomeArtistForm]);

    return (
        <div className='step-progress bg-dark center' tabIndex="0"
             onKeyDown={(e) => {e.key === "Enter" && console.log("")}}>
            <ToastContainer/>
            {props.register &&
            <button className="ModalClose absolute" data-tip="Annuler" onClick={() => props.close()}>
                <i className="icon-close s-24" style={{color: "orange"}}/>
            </button>}
            <div className="mdl-card mdl-shadow--2dp d-none d-sm-block">
                <div className="mdl-card__supporting-text">
                    <div className="mdl-stepper-horizontal-alternative">
                        <div
                            className={state_steps_index === 0
                                ? "mdl-stepper-step active-step"
                                : "mdl-stepper-step success-step"}>
                            <div className="mdl-stepper-circle"><span>1</span></div>
                            <div className="mdl-stepper-title text-light">
                                <small className="d-none d-lg-block">Définir une thématique</small>
                            </div>
                            <div className="mdl-stepper-bar-left"/>
                            <div className="mdl-stepper-bar-right"/>
                        </div>
                        <div
                            className={(state_steps_index === 1 && "mdl-stepper-step active-step")
                            || (state_steps_index < 1 && "mdl-stepper-step")
                            || (state_steps_index > 1 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>2</span></div>
                            <div className="mdl-stepper-title text-light">
                                <small className="d-none d-lg-block">Informations sur la prestation</small>
                            </div>
                            <div className="mdl-stepper-bar-left"/>
                            <div className="mdl-stepper-bar-right"/>
                        </div>
                        <div
                            className={(state_steps_index === 2 && "mdl-stepper-step active-step")
                            || (state_steps_index < 2 && "mdl-stepper-step")
                            || (state_steps_index > 2 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>3</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Détails
                                de la prestation</small></div>
                            <div className="mdl-stepper-bar-left"/>
                            <div className="mdl-stepper-bar-right"/>
                        </div>
                        <div className={(state_steps_index === 3 && "mdl-stepper-step active-step")
                        || (state_steps_index < 3 && "mdl-stepper-step")
                        || (state_steps_index > 3 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>4</span></div>
                            <div className="mdl-stepper-title text-light d-none d-lg-block"><small
                                className="d-none d-lg-block">Récaputilatif</small></div>
                            <div className="mdl-stepper-bar-left"/>
                            <div className="mdl-stepper-bar-right"/>
                        </div>
                    </div>
                </div>
            </div>
            {(props.register || props.artistType === "professional_auditor") &&
            <h4 className="text-red mt-4 text-center">Créer votre première prestaion pour devenir artiste sur ISL</h4>}
            <StepZilla steps={steps} showSteps={false} showNavigation={false} startAtStep={state_steps_index}/>
            {state_steps_index !== component_steps.length - 1 &&
            <div className="text-center mt-4">
                <small className="text-center">Cliquer sur suivant pour passer à l'étape suivante</small>
            </div>}
            {checkProps() && !loading ?
                <div className="text-center">
                    {state_steps_index === component_steps.length - 1 && !props.register &&
                    <button className="btn btn-outline-success center pl-5 pr-5"
                            onClick={() => props.artistType === "professional_auditor" ? auditorToArtist() : addNewPrestation()}>
                        {props.artistType === "professional_auditor" ? "Devenir Artiste" : "Enregister"}</button>}
                </div> : <div className="text-center">
                    {smallSpinner("relative", "0")}
                </div>}
            <div className="NextOrPrevPageStepper mt-4 pb-5">
                {state_steps_index !== 0 &&
                <button className="btn-custom btn-outline-light pr-2 mb-3 bolder float-left border-bottom-0 border-right-0"
                        onClick={() => prev()}><i
                    className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>Precedent</button>}
                {state_steps_index !== component_steps.length - 1 &&
                <button className="btn-custom btn-outline-light pl-2 mb-3 bolder float-right border-bottom-0 border-left-0"
                        onClick={() => next()}>Suivant&nbsp;<i
                    className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></button>}
                {state_steps_index === component_steps.length - 1 && props.register &&
                <button className="btn btn-outline-success pl-5 mb-3 bolder float-right border-bottom-0 border-left-0"
                        onClick={(e) => Register.sendUserInfoToSingUp(e)}>Inscription</button>}
            </div>
        </div>
    );
}

export default Form;
