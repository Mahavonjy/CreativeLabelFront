import React, { useRef, useState, useEffect } from "react";
import StepZilla from "react-stepzilla";
import Thematics from "./Thematics";
import PrestationDetails from "./PrestationDetails";
import PrestationInformation from "./PrestationInformation";
import Recaputilatif from "./Recaputilatif";
import { addStepsIndex } from "../../../FunctionTools/FunctionProps"
import { useDispatch, useSelector } from "react-redux";
import "../../style/Form.css"
import { toast } from "react-toastify";

function Form (props) {

    const dispatch = useDispatch();
    const component_steps = [Thematics, PrestationInformation, PrestationDetails, Recaputilatif];
    const steps_index = useSelector(state => state.KantoBizForm.steps_index);

    const isMounted = useRef(false);
    const [state_steps_index, setStepsIndex] = useState(steps_index);
    const steps = [
            {name: 'Choisir votre thematiques', component: <Thematics var={props}/>},
            {name: 'Information de votre prestation', component: <PrestationInformation />},
            {name: 'Detail de votre prestation', component: <PrestationDetails />},
            {name: 'Recaputilatif', component: <Recaputilatif var={props}/>},
    ];

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
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className='step-progress bg-dark center'>
            <div className="mdl-card mdl-shadow--2dp">
                <div className="mdl-card__supporting-text">
                    <div className="mdl-stepper-horizontal-alternative">
                        <div className={state_steps_index === 0 ? "mdl-stepper-step active-step" : "mdl-stepper-step success-step"}>
                            <div className="mdl-stepper-circle"><span>1</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Choisir la thematiques</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 1 && "mdl-stepper-step active-step") || (state_steps_index < 1 && "mdl-stepper-step") || (state_steps_index > 1 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>2</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Information de la prestation</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 2 && "mdl-stepper-step active-step") || (state_steps_index < 2 && "mdl-stepper-step") || (state_steps_index > 2 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>3</span></div>
                            <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Detail de la prestation</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                        <div className={(state_steps_index === 3 && "mdl-stepper-step active-step") || (state_steps_index < 3 && "mdl-stepper-step") || (state_steps_index > 3 && "mdl-stepper-step success-step")}>
                            <div className="mdl-stepper-circle"><span>4</span></div>
                            <div className="mdl-stepper-title text-light d-none d-lg-block"><small className="d-none d-lg-block">Recaputilatif</small></div>
                            <div className="mdl-stepper-bar-left" />
                            <div className="mdl-stepper-bar-right" />
                        </div>
                    </div>
                </div>
            </div>
            <StepZilla steps={steps} showSteps={false} showNavigation={false} startAtStep={state_steps_index}/>
            <div className="row justify-content-center pt-5">
                <small className="text-center">Veuillez cliquer sur suivant si vous avez fini cette pages</small>
            </div>
            <div className="NextOrPrevPageStepper mt-5">
                {state_steps_index === 0 ? null : <span className="float-left" onClick={() => Prev()}><i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent</span>}
                {state_steps_index === component_steps.length - 1 ?
                    <div>
                        {props.noRegister ? <button className="btn btn-outline-success float-right pl-2 pr-3">Enregister</button>:
                        <a href="#register" className="text-black float-right mr-5 m-b-50 bg-success pr-5 pl-5 text-center" style={{borderRadius: 5}}>Valider</a>}
                    </div> : <span className="float-right" onClick={() => Next()}>Suivant&nbsp;<i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></span>}
            </div>
        </div>
    );
}

export default Form;
