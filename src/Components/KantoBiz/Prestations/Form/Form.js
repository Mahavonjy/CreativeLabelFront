import React, { useRef, useState, useEffect } from "react";
import StepZilla from "react-stepzilla";
import Thematics from "./Thematics";
import PrestationDetails from "./PrestationDetails";
import PrestationInformation from "./PrestationInformation";
import Recaputilatif from "./Recaputilatif";
import { createNewPrestation } from "../../../FunctionTools/Tools";
import { addStepsIndex } from "../../../FunctionTools/FunctionProps"
import { useDispatch, useSelector } from "react-redux";
import "../../style/Form.css"
import { toast, ToastContainer } from "react-toastify";

function Form (props) {

    const dispatch = useDispatch();
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
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

    const component_steps = [Thematics, PrestationInformation, PrestationDetails, Recaputilatif];
    const steps_index = useSelector(state => state.KantoBizForm.steps_index);

    const isMounted = useRef(false);
    const [state_steps_index, setStepsIndex] = useState(steps_index);
    const steps = [
            {name: 'Choisir votre thématique', component: <Thematics var={props}/>},
            {name: 'Information de votre prestation', component: <PrestationInformation />},
            {name: 'Detail de votre prestation', component: <PrestationDetails />},
            {name: 'Recaputilatif', component: <Recaputilatif var={props}/>},
    ];

    const addNewPrestation = () => {
        createNewPrestation(
            props.setActiveToast, props.allPrestation, props.setAllPrestation, props.setAddNewPrestation, dispatch,
            props.close, { PropsTitle, PropsFiles, PropsCityReference, PropsOthersCity, PropsDescription,
            props_events_selected, props_price_of_service, props_preparation_time, props_number_of_artist, props_service_time,
            props_thematics_options_selected, props_unit_time_of_preparation, props_unit_time_of_service }
        ).then(resp => {
            if (!resp)
                toast.error("Meme titre, type d'evenement dans la même ville ne peut pas etre dupliquer")
        });
    };

    const Next = async () => {
        let resp = component_steps[state_steps_index].validation();
        if (resp.error) toast.error(resp.message);
        else {
            let step_tmp = await state_steps_index + 1;
            await setStepsIndex(step_tmp);
            await dispatch(addStepsIndex(step_tmp));
            await document.getElementById("next-button").click();
        }
    };

    const Prev = async () => {
        let step_tmp = await state_steps_index - 1;
        await setStepsIndex(step_tmp);
        await dispatch(addStepsIndex(step_tmp));
        await document.getElementById("prev-button").click();
    };

    useEffect(() => {

        if (props.new)
            props.setActiveToast(false);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className='step-progress bg-dark center'>
            <ToastContainer/>
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__supporting-text">
                    <div className="mdl-stepper-horizontal-alternative">
                        <div className={state_steps_index === 0 ? "mdl-stepper-step active-step" : "mdl-stepper-step success-step"}>
                            <div className="mdl-stepper-circle"><span>1</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Définir une thématique</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 1 && "mdl-stepper-step active-step") || (state_steps_index < 1 && "mdl-stepper-step") || (state_steps_index > 1 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>2</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Informations sur la prestation</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 2 && "mdl-stepper-step active-step") || (state_steps_index < 2 && "mdl-stepper-step") || (state_steps_index > 2 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>3</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Détails de la prestation</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 3 && "mdl-stepper-step active-step") || (state_steps_index < 3 && "mdl-stepper-step") || (state_steps_index > 3 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>4</span></div>
                            <div className="mdl-stepper-title text-light d-none d-lg-block"><small className="d-none d-lg-block">Récaputilatif</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                    </div>
                </div>
            </div>
            <StepZilla steps={steps} showSteps={false} showNavigation={false} startAtStep={state_steps_index}/>
            <div className="text-center pt-2">
                <small className="text-center">Cliquer sur suivant pour passer à la page suivante</small>
            </div>
            {props.new &&
            <div className="text-center pt-2">
                {state_steps_index === component_steps.length - 1 && <button className="btn btn-outline-success center pl-5 pr-5" onClick={() => addNewPrestation()}>Enregister</button>}
            </div>}
            <div className="NextOrPrevPageStepper mt-4">
                {state_steps_index !== 0 && <span className="float-left" onClick={() => Prev()}><i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent</span>}
                {state_steps_index === component_steps.length - 1 ?
                    <div>
                        {!props.new && <a href="#register" className="text-black float-right mr-5 m-b-50 bg-success pr-5 pl-5 text-center" style={{borderRadius: 5}}>Valider</a>}
                    </div> : <span className="float-right" onClick={() => Next()}>Suivant&nbsp;<i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></span>}
            </div>
        </div>
    );
}

export default Form;
