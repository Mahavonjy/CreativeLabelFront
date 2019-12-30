import React, { Component } from "react";
import FunctionTools from "../../../FunctionTools/FunctionTools";
import ReactTooltip from 'react-tooltip';
import MultiselectTools from "../../../FunctionTools/MultiselectTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import {connect} from "react-redux";


class PrestationDetails extends Component {
    state = {
        isMounted: false,
        preparation_time: 0,
        service_time: 0,
        price_of_service: 0,
        events_type: [{id: 0, value: 'Mariage'}, {id: 1, value: 'Anniversaire'}, {id: 2, value: 'Traditionnel'}],
        number_of_artist: 1,
        unit_time_of_service: {"day": false, "hours": false, "min": false, "sec": false},
        unit_time_of_preparation: {"day": false, "hours": false, "min": false, "sec": false}
    };

    OnchangeUnitOfTime = (unit, state_name) => {
        let time = {...this.state[state_name]};
        for (let row in time) {
            if (row === unit) time[unit] = !this.state[state_name][unit];
            else time[row] = false
        }
        this.setState({[state_name]: time});
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    createCheckBox = (title, functionToOnchange, data_tip, state_name, key_name, bg) => {
        return (
            <div className={"input-group-text " + bg + " text-dark"} style={{height: 28, width: 50}}>
                {title}&nbsp;
                <input className="custom-checkbox align-middle" type="checkbox" onChange={() => {functionToOnchange(key_name, 'unit_time_of_preparation')}} checked={this.state[state_name][key_name]}/>

            </div>
        );
    };

    render() {
        return (
            <div className="Base">
                <ReactTooltip/>
                <div className="card-header transparent b-b">
                    <strong className="text-red">Precisez nous quelques details</strong>
                </div>
                <div className="row justify-content-center">
                    <div className="form-group pt-5">
                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label text-center pb-3 text-light">Prix de la prestation</label>
                            <div className="col-sm-12">
                                <div className="input-group-prepend center">
                                    <span className="text-info pt-2" data-tip="Ceci est le prix HT">?&nbsp;</span>
                                    <input value={this.state.price_of_service} id="price_of_service" name="price_of_service"
                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                           className="form-control" placeholder="Prix " type="number" style={{width: "100%"}} required/>
                                    <input className="custom-checkbox text-center text-black align-middle bg-light" placeholder="Euros" style={{width: 300}} disabled/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label text-center pb-3 text-light">La durée de votre prestaion</label>
                            <div className="col-sm-12">
                                <div className="input-group-prepend center">
                                    <span className="text-info pt-2" data-tip="Durée de votre prestation, exemple: 12 min ou 1 heures de durée de prestation">?&nbsp;</span>
                                    <input value={this.state.service_time} id="service_time" name="service_time"
                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                           className="form-control" type="number" style={{width: "100%"}} required/>
                                    {this.createCheckBox("Jrs", this.OnchangeUnitOfTime, "Votre preparation dure quelque jours ?", "unit_time_of_service", "day", "bg-grey")}
                                    {this.createCheckBox("Hrs", this.OnchangeUnitOfTime, "Votre preparation dure quelque Heures ?", "unit_time_of_service", "hours", "bg-success")}
                                    {this.createCheckBox("Min", this.OnchangeUnitOfTime, "Votre preparation dure quelque Minutes ?", "unit_time_of_service", "min", "bg-info")}
                                    {this.createCheckBox("Sec", this.OnchangeUnitOfTime, "Votre preparation dure quelque Secondes ?", "unit_time_of_service", "sec", "bg-warning")}
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label text-center pb-3 text-light">Temps de préparation</label>
                            <div className="col-sm-12">
                                <div className="input-group-prepend center">
                                    <span className="text-info pt-2" data-tip="Temp de préparation, exemple: 12 min de preparation ou 1 heures de preparation">?&nbsp;</span>
                                    <input value={this.state.preparation_time} id="preparation_time" name="preparation_time"
                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                           className="form-control" placeholder="Préparation" type="number" style={{width: "100%"}} required/>
                                    {this.createCheckBox("Jrs", this.OnchangeUnitOfTime, "Votre temps de preparation dure quelque jours ?", "unit_time_of_preparation", "day", "bg-grey")}
                                    {this.createCheckBox("Hrs", this.OnchangeUnitOfTime, "Votre temps de preparation dure quelque Heures ?", "unit_time_of_preparation", "hours", "bg-success")}
                                    {this.createCheckBox("Min", this.OnchangeUnitOfTime, "Votre temps de preparation dure quelque Minutes ?", "unit_time_of_preparation", "min", "bg-info")}
                                    {this.createCheckBox("Sec", this.OnchangeUnitOfTime, "Votre temps de preparation dure quelque Secondes ?", "unit_time_of_preparation", "sec", "bg-warning")}
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label text-center pb-3 text-light">Nombre d'artist</label>
                            <div className="col-sm-12">
                                <div className="input-group-prepend center">
                                    <span className="text-info pt-2" data-tip="Le nombre de votre equipe pour cette prestation">?&nbsp;</span>
                                    <input value={this.state.number_of_artist} id="number_of_artist" name="number_of_artist"
                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                           className="form-control" placeholder="Nombre d'artist" type="number" style={{width: "100%"}} required/>
                                    <input className="custom-checkbox text-center text-black align-middle bg-light" placeholder="Dans l'equipe" style={{width: 300}} disabled/>
                                </div>
                            </div>
                        </div>

                        <div className="form-group row">
                            <label className="col-sm-12 col-form-label text-center pb-3 text-light">Type d'evenement</label>
                            <div className="col-sm-12">
                                <div className="input-group-prepend center">
                                    <span className="text-info pt-2" data-tip="Exemple: Pour un Mariage, anniversaire ou autres">?&nbsp;</span>
                                    <MultiselectTools tags={[]} list={this.state.events_type} placeholder="Ajouter un evenement" sort/>
                                </div>
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
        events_selected: state.KantoBizForm.events_selected,
        price_of_service: state.KantoBizForm.price_of_service,
        preparation_time: state.KantoBizForm.preparation_time,
        number_of_artist: state.KantoBizForm.number_of_artist,
        unit_time_of_preparation: state.KantoBizForm.unit_time_of_preparation,
        unit_time_of_service: state.KantoBizForm.unit_time_of_service,
        service_time: state.KantoBizForm.service_time,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addEventSelected: (data) => {
            dispatch({type: "ADD_EVENTS_SELECTED", data: data})
        },
        addServiceTime: (data) => {
            dispatch({type: "ADD_SERVICE_TIME", data: data})
        },
        addPriceOfService: (data) => {
            dispatch({type: "ADD_PRICE_OF_SERVICE", data: data})
        },
        addPreparationTime: (data) => {
            dispatch({type: "ADD_PREPARATION_TIME", data: data})
        },
        addNumberOfArtist: (data) => {
            dispatch({type: "ADD_NUMBER_OF_ARTIST", data: data})
        },
        addUnitTimeOfPreparation: (data) => {
            dispatch({type: "ADD_UNIT_TIME_OF_PREPARATION", data: data})
        },
        addUnitTimeOfService: (data) => {
            dispatch({type: "ADD_UNIT_TIME_OF_SERVICE", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PrestationDetails);
