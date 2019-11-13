import React, { Component } from "react";
import {connect} from "react-redux";
import axios from "axios";
import Conf from "../../../Config/tsconfig";
import Cookies from "universal-cookie";
import {toast, ToastContainer} from "react-toastify";

const cookies = new Cookies();
class EditBeats extends Component {
    constructor (props) {
        super(props);
        this.state = {
            basic_enable: this.props.contract['basic_lease']['enabled'],
            basic_north_price: this.props.contract['basic_lease']['north_price'],
            basic_south_price: this.props.contract['basic_lease']['south_price'],
            basic_number_audio_stream: this.props.contract['basic_lease']['number_audio_stream'],
            basic_number_radio_station: this.props.contract['basic_lease']['number_radio_station'],
            basic_number_of_distribution_copies: this.props.contract['basic_lease']['number_of_distribution_copies'],

            silver_enable: this.props.contract['silver_lease']['enabled'],
            silver_north_price: this.props.contract['silver_lease']['north_price'],
            silver_south_price: this.props.contract['silver_lease']['south_price'],
            silver_number_audio_stream: this.props.contract['silver_lease']['number_audio_stream'],
            silver_number_radio_station: this.props.contract['silver_lease']['number_radio_station'],
            silver_number_of_distribution_copies: this.props.contract['silver_lease']['number_of_distribution_copies'],

            gold_enable: this.props.contract['gold_lease']['enabled'],
            gold_north_price: this.props.contract['gold_lease']['north_price'],
            gold_south_price: this.props.contract['gold_lease']['south_price'],
            gold_number_audio_stream: this.props.contract['gold_lease']['number_audio_stream'],
            gold_number_radio_station: this.props.contract['gold_lease']['number_radio_station'],
            gold_number_of_distribution_copies: this.props.contract['gold_lease']['number_of_distribution_copies'],

            platinum_enable: this.props.contract['platinum_lease']['enabled'],
            platinum_unlimited: this.props.contract['platinum_lease']['unlimited'],
            platinum_north_price: this.props.contract['platinum_lease']['north_price'],
            platinum_south_price: this.props.contract['platinum_lease']['south_price'],
            platinum_number_audio_stream: this.props.contract['platinum_lease']['number_audio_stream'],
            platinum_number_radio_station: this.props.contract['platinum_lease']['number_radio_station'],
            platinum_number_of_distribution_copies: this.props.contract['platinum_lease']['number_of_distribution_copies'],
        };
    }

    // Initialisation of all basic lease state
    changeBasicEnabled =  (e) => {this.setState({basic_enable : !this.state.basic_enable})};
    changeBasicNorthPrice =  (e) => {this.setState({basic_north_price : e.target.value})};
    changeBasicSouthPrice =  (e) => {this.setState({basic_south_price : e.target.value})};
    changeBasicAudioStream =  (e) => {this.setState({basic_number_audio_stream : e.target.value})};
    changeBasicRadioStation =  (e) => {this.setState({basic_number_radio_station : e.target.value})};
    changeBasicDistributionCopies =  (e) => {this.setState({basic_number_of_distribution_copies : e.target.value})};
    // Initialisation of all silver lease state
    changeSilverEnabled =  (e) => {this.setState({silver_enable : !this.state.silver_enable})};
    changeSilverNorthPrice =  (e) => {this.setState({silver_north_price : e.target.value})};
    changeSilverSouthPrice =  (e) => {this.setState({silver_south_price : e.target.value})};
    changeSilverAudioStream =  (e) => {this.setState({silver_number_audio_stream : e.target.value})};
    changeSilverRadioStation =  (e) => {this.setState({silver_number_radio_station : e.target.value})};
    changeSilverDistributionCopies =  (e) => {this.setState({silver_number_of_distribution_copies : e.target.value})};
    // Initialisation of all gold lease state
    changeGoldEnabled =  (e) => {this.setState({gold_enable : !this.state.gold_enable})};
    changeGoldNorthPrice =  (e) => {this.setState({gold_north_price : e.target.value})};
    changeGoldSouthPrice =  (e) => {this.setState({gold_south_price : e.target.value})};
    changeGoldAudioStream =  (e) => {this.setState({gold_number_audio_stream : e.target.value})};
    changeGoldRadioStation =  (e) => {this.setState({gold_number_radio_station : e.target.value})};
    changeGoldDistributionCopies =  (e) => {this.setState({gold_number_of_distribution_copies : e.target.value})};
    // Initialisation of all platinum lease state
    changePlatinumEnabled =  (e) => {this.setState({platinum_enable : !this.state.platinum_enable})};
    changePlatinumNorthPrice =  (e) => {this.setState({platinum_north_price : e.target.value})};
    changePlatinumSouthPrice =  (e) => {this.setState({platinum_south_price : e.target.value})};
    changePlatinumAudioStream =  (e) => {this.setState({platinum_number_audio_stream : e.target.value})};
    changePlatinumRadioStation =  (e) => {this.setState({platinum_number_radio_station : e.target.value})};
    changePlatinumDistributionCopies =  (e) => {this.setState({platinum_number_of_distribution_copies : e.target.value})};

    handleSubmit = (e) => {
        let url, data;
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        if (e.target.id === "basic_contract") {
            url = 'update_basic';
            data = this.props.contract['basic_lease'];
            data['enabled'] = this.state.basic_enable;
            data['south_price'] = this.state.basic_south_price;
            data['north_price'] = this.state.basic_north_price;
            data['number_audio_stream'] = this.state.basic_number_audio_stream;
            data['number_radio_station'] = this.state.basic_number_radio_station;
            data['number_of_distribution_copies'] = this.state.basic_number_of_distribution_copies;
        } else if (e.target.id === "silver_contract") {
            url = 'update_silver';
            data = this.props.contract['silver_lease'];
            data['enabled'] = this.state.silver_enable;
            data['south_price'] = this.state.silver_south_price;
            data['north_price'] = this.state.silver_north_price;
            data['number_audio_stream'] = this.state.silver_number_audio_stream;
            data['number_radio_station'] = this.state.silver_number_radio_station;
            data['number_of_distribution_copies'] = this.state.silver_number_of_distribution_copies;
        } else if (e.target.id === "gold_contract") {
            url = 'update_gold';
            data = this.props.contract['gold_lease'];
            data['enabled'] = this.state.gold_enable;
            data['south_price'] = this.state.gold_south_price;
            data['north_price'] = this.state.gold_north_price;
            data['number_audio_stream'] = this.state.gold_number_audio_stream;
            data['number_radio_station'] = this.state.gold_number_radio_station;
            data['number_of_distribution_copies'] = this.state.gold_number_of_distribution_copies;
        }  else {
            url = 'update_platinum';
            data = this.props.contract['platinum_lease'];
            data['enabled'] = this.state.platinum_enable;
            data['south_price'] = this.state.platinum_south_price;
            data['north_price'] = this.state.platinum_north_price;
            data['number_audio_stream'] = this.state.platinum_number_audio_stream;
            data['number_radio_station'] = this.state.platinum_number_radio_station;
            data['number_of_distribution_copies'] = this.state.platinum_number_of_distribution_copies;
        }
        axios.put(Conf.configs.ServerApi + "api/beats/contract/" + url, data, {headers: headers}).then(resp => {
            let tmp = this.props.contract;
            tmp[data['contract_name']] = data;
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

    componentDidMount() {
        console.log("here")
    }

    render() {
        return (
            <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                <ToastContainer/>
                <div className="card no-b">
                    <div className="card-header pb-0">
                        <div className="d-flex justify-content-between">
                            <div className="align-self-center">
                                <h4>Custom your beats contract</h4>
                            </div>
                            <div className="align-self-center">
                                <ul className="nav nav-pills mb-3" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active show" id="w4--tab1" data-toggle="tab" href="#w4-tab1" role="tab" aria-controls="tab1" aria-expanded="true" aria-selected="true">
                                            basic</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab2" data-toggle="tab" href="#w4-tab2" role="tab" aria-controls="tab2" aria-selected="false">silver</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab3" data-toggle="tab" href="#w4-tab3" role="tab" aria-controls="tab3" aria-selected="false">gold</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="w4--tab4" data-toggle="tab" href="#w4-tab4" role="tab" aria-controls="tab4" aria-selected="false">platinum</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="card-body no-p">
                        <div className="tab-content">
                            <div className="tab-pane fade text-center p-5 show active" id="w4-tab1" role="tabpanel" aria-labelledby="w4-tab1">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	north price *</div>
                                                <input value={this.state.basic_north_price} onChange={this.changeBasicNorthPrice} id="basic_north_price" name="basic_north_price"
                                                       className="form-control" type="text" required/>
                                            </div>
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp;	south price *</div>
                                                <input value={this.state.basic_south_price} onChange={this.changeBasicSouthPrice} id="basic_south_price"
                                                       name="basic_south_price" className="form-control" type="text" required/>
                                            </div>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of radio station *</small>
                                            <input value={this.state.basic_number_radio_station} id="basic_number_radio_station"
                                                   onChange={this.changeBasicRadioStation} name="basic_number_radio_station" className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of distribution copies *</small>
                                            <input value={this.state.basic_number_of_distribution_copies} onChange={this.changeBasicDistributionCopies}
                                                   id="basic_number_of_distribution_copies" name="basic_number_of_distribution_copies"
                                                   className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp; nb of audio stream *</small>
                                            <input value={this.state.basic_number_audio_stream} onChange={this.changeBasicAudioStream}
                                                   id="basic_number_audio_stream" name="basic_number_audio_stream" className="form-control"
                                                   type="number" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header transparent">
                                                <strong> Your basic settings </strong>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="list-group no-b">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-check-circle purple-text" />enable
                                                        </div>
                                                        <div className="material-switch">
                                                            <input id="basic_enabled" name="basic_enabled" type="checkbox" onChange={this.changeBasicEnabled} checked={!!this.state.basic_enable}/>
                                                            <label htmlFor="sw1" className="bg-primary" />
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-eyeglasses text-blue" />unlimited
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

                                <button className="col text-center btn btn-outline-info btn-sm pl-md-4 pr-md-4" id="basic_contract"
                                        onClick={(e)=> this.handleSubmit(e)} style={{marginTop: 25, marginBottom: 25}}>Update</button>

                            </div>
                            <div className="tab-pane fade text-center p-5" id="w4-tab2" role="tabpanel" aria-labelledby="w4-tab2">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	north price *</div>
                                                <input value={this.state.silver_north_price} onChange={this.changeSilverNorthPrice} id="silver_north_price" name="silver_north_price"
                                                       className="form-control" type="text" required/>
                                            </div>
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp;	south price *</div>
                                                <input value={this.state.silver_south_price} onChange={this.changeSilverSouthPrice} id="silver_south_price"
                                                       name="silver_south_price" className="form-control" type="text" required/>
                                            </div>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of radio station *</small>
                                            <input value={this.state.silver_number_radio_station} id="basic_number_radio_station"
                                                   onChange={this.changeSilverRadioStation} name="basic_number_radio_station" className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of distribution copies *</small>
                                            <input value={this.state.silver_number_of_distribution_copies} onChange={this.changeSilverDistributionCopies}
                                                   id="basic_number_of_distribution_copies" name="basic_number_of_distribution_copies"
                                                   className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp; nb of audio stream *</small>
                                            <input value={this.state.silver_number_audio_stream} onChange={this.changeSilverAudioStream}
                                                   id="basic_number_audio_stream" name="basic_number_audio_stream" className="form-control"
                                                   type="number" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header transparent">
                                                <strong> Your silver settings </strong>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="list-group no-b">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-check-circle purple-text" />enable
                                                        </div>
                                                        <div className="material-switch">
                                                            <input id="silver_enabled" name="silver_enabled" type="checkbox" onChange={this.changeSilverEnabled} checked={!!this.state.silver_enable}/>
                                                            <label htmlFor="sw1" className="bg-primary" />
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-eyeglasses text-blue" />unlimited
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

                                <button className="col text-center btn btn-outline-info btn-sm pl-md-4 pr-md-4" id="silver_contract"
                                        onClick={(e)=> this.handleSubmit(e)} style={{marginTop: 25, marginBottom: 25}}>Update</button>
                            </div>
                            <div className="tab-pane fade text-center p-5" id="w4-tab3" role="tabpanel" aria-labelledby="w4-tab3">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	north price *</div>
                                                <input value={this.state.gold_north_price} onChange={this.changeGoldNorthPrice} id="gold_north_price" name="gold_north_price"
                                                       className="form-control" type="text" required/>
                                            </div>
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp;	south price *</div>
                                                <input value={this.state.gold_south_price} onChange={this.changeGoldSouthPrice} id="gold_south_price"
                                                       name="gold_south_price" className="form-control" type="text" required/>
                                            </div>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of radio station *</small>
                                            <input value={this.state.gold_number_radio_station} id="gold_number_radio_station"
                                                   onChange={this.changeGoldRadioStation} name="gold_number_radio_station" className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of distribution copies *</small>
                                            <input value={this.state.gold_number_of_distribution_copies} onChange={this.changeGoldDistributionCopies}
                                                   id="gold_number_of_distribution_copies" name="gold_number_of_distribution_copies"
                                                   className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp; nb of audio stream *</small>
                                            <input value={this.state.gold_number_audio_stream} onChange={this.changeGoldAudioStream}
                                                   id="gold_number_audio_stream" name="gold_number_audio_stream" className="form-control"
                                                   type="number" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header transparent">
                                                <strong> Your gold settings </strong>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="list-group no-b">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-check-circle purple-text" />enable
                                                        </div>
                                                        <div className="material-switch">
                                                            <input id="silver_enabled" name="silver_enabled" type="checkbox" onChange={this.changeGoldEnabled} checked={!!this.state.gold_enable}/>
                                                            <label htmlFor="sw1" className="bg-primary" />
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-eyeglasses text-blue" />unlimited
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

                                <button className="col text-center btn btn-outline-info btn-sm pl-md-4 pr-md-4" id="gold_contract"
                                        onClick={(e)=> this.handleSubmit(e)} style={{marginTop: 25, marginBottom: 25}}>Update</button>
                            </div>
                            <div className="tab-pane fade text-center p-5" id="w4-tab4" role="tabpanel" aria-labelledby="w4-tab4">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	north price *</div>
                                                <input value={this.state.platinum_north_price} onChange={this.changePlatinumNorthPrice} id="platinum_north_price" name="platinum_north_price"
                                                       className="form-control" type="text" required/>
                                            </div>
                                            <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                                                <div className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp;	south price *</div>
                                                <input value={this.state.platinum_south_price} onChange={this.changePlatinumSouthPrice} id="platinum_south_price"
                                                       name="platinum_south_price" className="form-control" type="text" required/>
                                            </div>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of radio station *</small>
                                            <input value={this.state.platinum_number_radio_station} id="platinum_number_radio_station"
                                                   onChange={this.changePlatinumRadioStation} name="platinum_number_radio_station" className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	nb of distribution copies *</small>
                                            <input value={this.state.platinum_number_of_distribution_copies} onChange={this.changePlatinumDistributionCopies}
                                                   id="platinum_number_of_distribution_copies" name="platinum_number_of_distribution_copies"
                                                   className="form-control" type="number" required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                                            <small className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp; nb of audio stream *</small>
                                            <input value={this.state.platinum_number_audio_stream} onChange={this.changePlatinumAudioStream}
                                                   id="platinum_number_audio_stream" name="platinum_number_audio_stream" className="form-control"
                                                   type="number" required/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card">
                                            <div className="card-header transparent">
                                                <strong> Your platinum settings </strong>
                                            </div>
                                            <div className="card-body p-0">
                                                <ul className="list-group no-b">
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-check-circle purple-text" />enable
                                                        </div>
                                                        <div className="material-switch">
                                                            <input id="platinum_enabled" name="platinum_enabled" type="checkbox"
                                                                   onChange={this.changePlatinumEnabled} checked={!!this.state.platinum_enable}/>
                                                            <label htmlFor="sw1" className="bg-primary" />
                                                        </div>
                                                    </li>
                                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                                        <div>
                                                            <i className="icon icon-eyeglasses text-blue" />unlimited
                                                        </div>
                                                        <div className="material-switch">
                                                            <input id="unlimited" name="unlimited" type="checkbox" checked={this.state.platinum_unlimited} disabled={true}/>
                                                            <label htmlFor="sw2" className="bg-secondary" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="col text-center btn btn-outline-info btn-sm pl-md-4 pr-md-4" id="platinum_contract"
                                        onClick={(e)=> this.handleSubmit(e)} style={{marginTop: 25, marginBottom: 25}}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        contract: state.profile.contract
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBeats);
