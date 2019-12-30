import React, { Component } from "react";
import StepZilla from "react-stepzilla";
import Thematics from "./Thematics";
import PrestationDetails from "./PrestationDetails";
import PrestationInformation from "./PrestationInformation";
import Recaputilatif from "./Recaputilatif";
import "./Form.css"
import {toast} from "react-toastify";
const index_steps = [PrestationDetails, PrestationInformation, Thematics, Recaputilatif];

class Form extends Component {
    state = {
        isMounted: false,
        current_step: PrestationDetails,
        steps_index: 0
    };

    steps =
        [
            {name: 'Detail de votre prestation', component: <PrestationDetails />},
            {name: 'Information de votre prestation', component: <PrestationInformation artistType={this.props.artistType}/>},
            {name: 'Choisir votre thematiques', component: <Thematics artistType={this.props.artistType}/>},
            {name: 'Recaputilatif', component: <Recaputilatif />},
        ];

    Next = ()=> {
        let resp = this.state.current_step.validation();
        if (resp.error) toast.error(resp.message);
        else this.setState({steps_index: this.state.steps_index + 1}, () => {
                this.setState({current_step: index_steps[this.state.steps_index]}, () => {
                    document.getElementById("next-button").click();
                })
        })
    };

    Prev = () => {
        this.setState({steps_index: this.state.steps_index - 1}, () => {
            this.setState({current_step: index_steps[this.state.steps_index]}, () => {
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
            <div className='Base step-progress bg-dark center'>
                <StepZilla steps={this.steps} showNavigation={false}/>
                <div className="row justify-content-center pt-5">
                    <small className="text-center">Veuillez cliquer sur suivant si vous avez fini cette pages</small>
                </div>
                <div className="NextOrPrevPageStepper mt-5">
                    <span className="float-left" onClick={this.Prev}><i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent</span>
                    <span className="float-right" onClick={this.Next}>Suivant&nbsp;<i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/></span>
                </div>
            </div>
        );
    }
}

export default Form;
