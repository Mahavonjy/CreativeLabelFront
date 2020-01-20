import React, { Component } from "react";
import * as Tools from "../../../FunctionTools/Tools";
import ReactTooltip from 'react-tooltip';
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import {connect} from "react-redux";
let that;

class PrestationDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            preparation_time: this.props.preparation_time,
            service_time: this.props.service_time,
            price_of_service: this.props.price_of_service,
            number_of_artist: this.props.number_of_artist,
            unit_time_of_service: this.props.unit_time_of_service,
            unit_time_of_preparation: this.props.unit_time_of_preparation,
            events_type:
                [
                    "Mariage", "Fête traditionnelle", "Anniversaire", "Show-case", "Festival et défilé", "Événement sportif",
                    "Évènement d’entreprise", "Évènement associative", "Création d’instrumentale", "Montage vidéo"
                ]
        };
        that = this
    }

    OnchangeUnitOfTime = (unit, state_name, up_props) => {
        let time = {...this.state[state_name]};
        for (let row in time) {
            if (row === unit) time[unit] = !this.state[state_name][unit];
            else time[row] = false
        }
        this.setState({[state_name]: time}, () => {up_props(time)});
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    static validation () {
        if (!that.state.price_of_service)
            return {"error": true, "message": "veuillez remplir le prix de votre service "};
        if (!that.state.service_time)
            return {"error": true, "message": "veuillez remplir votre durée de prestation "};
        if (!that.state.preparation_time)
            return {"error": true, "message": "veuillez remplir votre temps de preparation "};
        if (that.state.number_of_artist <= 0)
            return {"error": true, "message": "veuillez remplir le nombre d'artist "};
        let tmp_unit_time_of_service = false;
        for (let row in that.state.unit_time_of_service) {
            if (that.state.unit_time_of_service[row]) tmp_unit_time_of_service = true
        }
        if (!tmp_unit_time_of_service)
            return {"error": true, "message": "veuillez choisir l'uniteé de temps de service "};
        let tmp_unit_time_of_preparation = false;
        for (let row in that.state.unit_time_of_preparation) {
            if (that.state.unit_time_of_preparation[row]) tmp_unit_time_of_preparation = true
        }
        if (!tmp_unit_time_of_preparation)
            return {"error": true, "message": "veuillez choisir l'uniteé de temps de preparation "};
        if (that.props.events_selected.length <= 1)
            return {"error": true, "message": "veuillez choisir au moins 2 evenements "};
        return {"error": false};
    };

    createCheckBox = (title, functionToOnchange, data_tip, state_name, key_name, bg) => {
        let props_function;
        if (state_name === "unit_time_of_service") props_function = this.props.addUnitTimeOfService;
        if (state_name === "unit_time_of_preparation") props_function = this.props.addUnitTimeOfPreparation;
        return (
            <div className={"input-group-text " + bg + " text-dark"} style={{height: 28, width: 50}}>
                {title}&nbsp;
                <input className="custom-checkbox align-middle" type="checkbox"
                       onChange={() => {functionToOnchange(key_name, state_name, props_function)}}
                       checked={this.state[state_name][key_name]}/>
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
                                           onChange={(e) => Tools.changeFields(this, e, this.props.addPriceOfService)}
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
                                           onChange={(e) => Tools.changeFields(this, e, this.props.addServiceTime)}
                                           className="form-control" type="number" placeholder="Duré d'execution" style={{width: "100%"}} required/>
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
                                           onChange={(e) => Tools.changeFields(this, e, this.props.addPreparationTime)}
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
                                           onChange={(e) => Tools.changeFields(this, e, this.props.addNumberOfArtist)}
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
                                    <MultiSelectTools funcToFillInProps={this.props.addEventSelected} tags={this.props.events_selected} list={this.state.events_type} placeholder="Ajouter un evenement"/>
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
