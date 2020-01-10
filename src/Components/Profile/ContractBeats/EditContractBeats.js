import React, { Component } from "react";
import {connect} from "react-redux";
import axios from "axios";
import Conf from "../../../Config/tsconfig";
import {toast, ToastContainer} from "react-toastify";
import FunctionTools from "../../FunctionTools/FunctionTools";

class EditContractBeats extends Component {
    state = {
        basic_enable: this.props.contract['basic_lease']['enabled'],
        basic: this.props.contract['basic_lease']['price'],
        basic_number_audio_stream: this.props.contract['basic_lease']['number_audio_stream'],
        basic_number_radio_station: this.props.contract['basic_lease']['number_radio_station'],
        basic_number_of_distribution_copies: this.props.contract['basic_lease']['number_of_distribution_copies'],

        silver_enable: this.props.contract['silver_lease']['enabled'],
        silver: this.props.contract['silver_lease']['price'],
        silver_number_audio_stream: this.props.contract['silver_lease']['number_audio_stream'],
        silver_number_radio_station: this.props.contract['silver_lease']['number_radio_station'],
        silver_number_of_distribution_copies: this.props.contract['silver_lease']['number_of_distribution_copies'],

        gold_enable: this.props.contract['gold_lease']['enabled'],
        gold: this.props.contract['gold_lease']['price'],
        gold_number_audio_stream: this.props.contract['gold_lease']['number_audio_stream'],
        gold_number_radio_station: this.props.contract['gold_lease']['number_radio_station'],
        gold_number_of_distribution_copies: this.props.contract['gold_lease']['number_of_distribution_copies'],

        platinum_enable: this.props.contract['platinum_lease']['enabled'],
        platinum_unlimited: this.props.contract['platinum_lease']['unlimited'],
        platinum: this.props.contract['platinum_lease']['price'],
        platinum_number_audio_stream: this.props.contract['platinum_lease']['number_audio_stream'],
        platinum_number_radio_station: this.props.contract['platinum_lease']['number_radio_station'],
        platinum_number_of_distribution_copies: this.props.contract['platinum_lease']['number_of_distribution_copies'],
    };

    generateContractTab = (state_name, active, tab_id) => {
        return (
            <div className={"tab-pane fade text-center p-5 " + active} id={tab_id} role="tabpanel" aria-labelledby={tab_id}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                            <div className="input-group-text text-dark" data-tip={"Le prix de votre instrumental pour un contrat en " + state_name}>
                                <i className="icon-text-width"/>&nbsp;prix du beat *
                            </div>
                            <input value={this.state[state_name]} onChange={(e) => FunctionTools.changeFields(this, e)} id={state_name} name={state_name}
                                   className="form-control" type="text"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de diffusion Radio & TV de votre instrumental pour un contrat en " + state_name}><i className="icon-text-width"/>&nbsp;nb de diffusion Radio & TV *</small>
                            <input value={this.state[state_name + "_number_radio_station"]} id={state_name + "_number_radio_station"}
                                   onChange={(e) => FunctionTools.changeFields(this, e)} name={state_name + "_number_radio_station"} className="form-control" type="number"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de copie distribuée de votre instrumental pour un contrat en " + state_name}><i className="icon-text-width"/>&nbsp;nb de copie distribuée *</small>
                            <input value={this.state[state_name + "_number_of_distribution_copies"]} onChange={(e) => FunctionTools.changeFields(this, e)}
                                   id={state_name + "_number_of_distribution_copies"} name={state_name + "_number_of_distribution_copies"} className="form-control" type="number"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de stream de votre instrumental pour un contrat en " + state_name}><i className="icon-user"/>&nbsp;nb de stream *</small>
                            <input value={this.state.basic_number_audio_stream} onChange={(e) => FunctionTools.changeFields(this, e)}
                                   id="basic_number_audio_stream" name="basic_number_audio_stream" className="form-control" type="number" required/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header transparent">
                                <strong>{"Paramètres " + state_name}</strong>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group no-b">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="icon icon-check-circle text-red" />{"Activer l'offre " + state_name}
                                        </div>
                                        <div className="material-switch">
                                            <input id={state_name + "_enable"} name={state_name + "_enable"} type="checkbox" onChange={(e) => FunctionTools.changeBoolFields(this, e)} checked={!!this.state[state_name + "_enable"]}/>
                                            <label htmlFor="sw1" className="bg-primary" />
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="icon icon-eyeglasses text-blue" />Activer l'offre unlimited
                                        </div>
                                        <div className="material-switch">
                                            <input id="unlimited" name="unlimited" type="checkbox" disabled={true}/>
                                            <label htmlFor="sw2" className="bg-secondary" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="col text-center btn btn-outline-info btn-sm pl-md-4 pr-md-4" id={state_name + "_contract"}
                        onClick={(e)=> this.handleSubmitContractUpdate(e)} style={{marginTop: 25, marginBottom: 25}}>{"Enregistrer ce contrat " + state_name}</button>

            </div>
        )
    };

    generateData = (contract_name) => {
        let data;
        let url = 'update_' + contract_name;
        data = this.props.contract[contract_name + '_lease'];
        data['enabled'] = this.state[contract_name + '_enable'];
        data['price'] = this.state[contract_name];
        data['number_audio_stream'] = this.state[contract_name + '_number_audio_stream'];
        data['number_radio_station'] = this.state[contract_name + '_number_radio_station'];
        data['number_of_distribution_copies'] = this.state[contract_name + '_number_of_distribution_copies'];
        return {'data': data, 'url': url}
    };

    handleSubmitContractUpdate = (e) => {
        let contract_name = e.target.id;
        let response = this.generateData(contract_name.split('_')[0]);
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': this.props.user_credentials.token
        };

        axios.put(Conf.configs.ServerApi + "api/beats/contract/" + response.url, response.data, {headers: headers}).then(() => {
            let tmp = this.props.contract;
            tmp[response.data['contract_name']] = response.data;
            this.props.profile_initialisation_contract(tmp);
            toast.success("contract updated");
            axios.get(Conf.configs.ServerApi + "api/beats/pricing", {headers: headers}).then(resp => {
                this.props.beats_initialisation_pricing(resp.data);
            }).catch(err => {
                console.log(err)
            })
        }).catch(err => {
            console.log(err.response)
        })
    };

    render() {
        return (
            <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                <ToastContainer/>
                <div className="card no-b">
                    <div className="card-header pb-0">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center">
                                <h3 className="text-red">Personnaliser les contrats</h3>
                            </div>
                            <div className="align-self-center">
                                <ul className="nav nav-pills mb-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active show" id="w4--tab1" data-toggle="tab" href="#w4-tab1" role="tab" aria-controls="tab1" aria-expanded="true" aria-selected="true">Standard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab2" data-toggle="tab" href="#w4-tab2" role="tab" aria-controls="tab2" aria-selected="false">Silver</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab3" data-toggle="tab" href="#w4-tab3" role="tab" aria-controls="tab3" aria-selected="false">Gold</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab4" data-toggle="tab" href="#w4-tab4" role="tab" aria-controls="tab4" aria-selected="false">Platinum</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body no-p">
                        <div className="tab-content">
                            {this.generateContractTab("basic", "show active", "w4-tab1")}
                            {this.generateContractTab("silver", "", "w4-tab2")}
                            {this.generateContractTab("gold", "", "w4-tab3")}
                            {this.generateContractTab("platinum", "", "w4-tab4")}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contract: state.profile.contract,
        user_credentials: state.Home.user_credentials,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_initialisation_contract: (data) => {
            dispatch({type: "ADD_CONTRACT", data: data})
        },
        beats_initialisation_pricing: (data) => {
            dispatch({type: "ADD_PRICING", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditContractBeats);
