import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import Thematics from "./Thematics";
import PrestationDetails from "./PrestationDetails";
import PrestationInformation from "./PrestationInformation";
import Recaputilatif from "./Recaputilatif";
import "../../style/Form.css"
import {toast} from "react-toastify";
import {connect} from "react-redux";
const index_steps = [Thematics, PrestationInformation, PrestationDetails, Recaputilatif];

class Form extends Component {
    state = {
        isMounted: false,
        current_step: this.props.Thematics_component,
        steps_index: this.props.steps_index
    };

    steps =
        [
            {name: 'Choisir votre thematiques', component: <Thematics artistType={this.props.artistType}/>},
            {name: 'Information de votre prestation', component: <PrestationInformation artistType={this.props.artistType}/>},
            {name: 'Detail de votre prestation', component: <PrestationDetails />},
            {name: 'Recaputilatif', component: <Recaputilatif artistType={this.props.artistType}/>},
        ];

    Next = ()=> {
        let resp = this.state.current_step.validation();
        if (resp.error) toast.error(resp.message);
        else this.setState({steps_index: this.state.steps_index + 1}, () => {
            this.props.addStepsIndex(this.state.steps_index);
            this.setState({current_step: index_steps[this.state.steps_index]}, () => {
                this.props.addStepComponent(this.state.current_step);
                document.getElementById("next-button").click();
            })
        })
    };

    Prev = () => {
        this.setState({steps_index: this.state.steps_index - 1}, () => {
            this.props.addStepsIndex(this.state.steps_index);
            this.setState({current_step: index_steps[this.state.steps_index]}, () => {
                this.props.addStepComponent(this.state.current_step);
                document.getElementById("prev-button").click();
            })
        })
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className='step-progress bg-dark center'>
                <div className="mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__supporting-text">
                        <div className="mdl-stepper-horizontal-alternative">
                            <div className={this.state.steps_index === 0 ? "mdl-stepper-step active-step" : "mdl-stepper-step success-step"}>
                                <div className="mdl-stepper-circle"><span>1</span></div>
                                <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Choisir la thematiques</small></div>
                                <div className="mdl-stepper-bar-left" />
                                <div className="mdl-stepper-bar-right" />
                            </div>
                            <div className={(this.state.steps_index === 1 && "mdl-stepper-step active-step") || (this.state.steps_index < 1 && "mdl-stepper-step") || (this.state.steps_index > 1 && "mdl-stepper-step success-step")}>
                                <div className="mdl-stepper-circle"><span>2</span></div>
                                <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Information de la prestation</small></div>
                                <div className="mdl-stepper-bar-left" />
                                <div className="mdl-stepper-bar-right" />
                            </div>
                            <div className={(this.state.steps_index === 2 && "mdl-stepper-step active-step") || (this.state.steps_index < 2 && "mdl-stepper-step") || (this.state.steps_index > 2 && "mdl-stepper-step success-step")}>
                                <div className="mdl-stepper-circle"><span>3</span></div>
                                <div className="mdl-stepper-title text-light"><small className="d-none d-lg-block">Detail de la prestation</small></div>
                                <div className="mdl-stepper-bar-left" />
                                <div className="mdl-stepper-bar-right" />
                            </div>
                            <div className={(this.state.steps_index === 3 && "mdl-stepper-step active-step") || (this.state.steps_index < 3 && "mdl-stepper-step") || (this.state.steps_index > 3 && "mdl-stepper-step success-step")}>
                                <div className="mdl-stepper-circle"><span>4</span></div>
                                <div className="mdl-stepper-title text-light d-none d-lg-block"><small className="d-none d-lg-block">Recaputilatif</small></div>
                                <div className="mdl-stepper-bar-left" />
                                <div className="mdl-stepper-bar-right" />
                            </div>
                        </div>
                    </div>
                </div>
                <StepZilla steps={this.steps} showSteps={false} showNavigation={false} startAtStep={this.state.steps_index}/>
                <div className="row justify-content-center pt-5">
                    <small className="text-center">Veuillez cliquer sur suivant si vous avez fini cette pages</small>
                </div>
                <div className="NextOrPrevPageStepper mt-5">
                    {this.state.steps_index === 0 ? null : <span className="float-left" onClick={this.Prev}><i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent</span>}
                    {this.state.steps_index === index_steps.length -1 ?
                        <a href="#register" className="text-black float-right mr-5 m-b-50 bg-success pr-5 pl-5 text-center" style={{borderRadius: 5}}>Valider</a>:
                        <span className="float-right" onClick={this.Next}>Suivant&nbsp;<i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></span>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        Thematics_component: state.KantoBizForm.Thematics_component,
        steps_index: state.KantoBizForm.steps_index,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addStepsIndex: (data) => {
            dispatch({type: "ADD_STEPS_INDEX", data: data})
        },
        addStepComponent: (data) => {
            dispatch({type: "ADD_STEP_COMPONENT", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
