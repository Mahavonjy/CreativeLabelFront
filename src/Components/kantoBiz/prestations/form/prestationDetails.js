import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactTooltip from 'react-tooltip';
import {
    addEventSelected,
    addNumberOfArtist,
    addPreparationTime,
    addPriceOfService,
    addServiceTime,
    addUnitTimeOfPreparation,
    addUnitTimeOfService
} from "../../../FunctionTools/FunctionProps";
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import {changeFields} from "../../../FunctionTools/Tools";

function PrestationDetails(props) {

    const dispatch = useDispatch();
    const props_events_selected = useSelector(state => state.KantoBizForm.events_selected);
    const props_price_of_service = useSelector(state => state.KantoBizForm.price_of_service);
    const props_preparation_time = useSelector(state => state.KantoBizForm.preparation_time);
    const props_number_of_artist = useSelector(state => state.KantoBizForm.number_of_artist);
    const props_unit_time_of_preparation = useSelector(state => state.KantoBizForm.unit_time_of_preparation);
    const props_unit_time_of_service = useSelector(state => state.KantoBizForm.unit_time_of_service);
    const props_service_time = useSelector(state => state.KantoBizForm.service_time);

    const isMounted = useRef(false);
    const [preparation_time, setPreparationTime] = useState(props_preparation_time);
    const [service_time, setServiceTime] = useState(props_service_time);
    const [price_of_service, setPriceOfService] = useState(props_price_of_service);
    const [number_of_artist, setNumberOfArtist] = useState(props_number_of_artist);
    const [unit_time_of_service, setUnitTimeOfService] = useState(props_unit_time_of_service);
    const [unit_time_of_preparation, setUnitTimeOfPreparation] = useState(props_unit_time_of_preparation);
    const [events_type] = useState([
        "Mariage", "Fête traditionnelle", "Anniversaire", "Show-case", "Festival et défilé", "Événement sportif",
        "Évènement d’entreprise", "Évènement associative", "Création d’instrumentale", "Montage vidéo"
    ]);

    const onchangeUnitOfTime = (unit, state, setName, up_props) => {
        let time = {...state};
        for (let row in time) {
            if (row === unit) time[unit] = !state[unit];
            else time[row] = false
        }
        setName(time);
        dispatch(up_props(time));
    };

    const createCheckBox = (title, data_tip, state_name, state, setName, key_name, bg) => {
        let props_function;
        if (state_name === "unit_time_of_service") props_function = addUnitTimeOfService;
        if (state_name === "unit_time_of_preparation") props_function = addUnitTimeOfPreparation;
        return (
            <div className={"input-group-text " + bg + " text-dark"}
                 onClick={() => onchangeUnitOfTime(key_name, state, setName, props_function)}
                 style={{height: 28, width: 60}}>{title}&nbsp;
                <input className="custom-checkbox align-middle" type="checkbox" value={true} checked={state[key_name]}/>
            </div>
        );
    };

    PrestationDetails.validation = () => {
        if (!props_price_of_service)
            return {"error": true, "message": "veuillez remplir le prix de votre service "};
        if (!props_service_time)
            return {"error": true, "message": "veuillez remplir votre durée de prestation "};
        if (!props_preparation_time)
            return {"error": true, "message": "veuillez remplir votre temps de preparation "};
        if (props_number_of_artist <= 0)
            return {"error": true, "message": "veuillez remplir le nombre d'artist "};
        let tmp_unit_time_of_service = false;
        for (let row in props_unit_time_of_service) {
            if (props_unit_time_of_service[row]) tmp_unit_time_of_service = true
        }
        if (!tmp_unit_time_of_service)
            return {"error": true, "message": "veuillez choisir l'uniteé de temps de service "};
        let tmp_unit_time_of_preparation = false;
        for (let row in props_unit_time_of_preparation) {
            if (props_unit_time_of_preparation[row]) tmp_unit_time_of_preparation = true
        }
        if (!tmp_unit_time_of_preparation)
            return {"error": true, "message": "veuillez choisir l'uniteé de temps de preparation "};
        if (props_events_selected.length <= 1)
            return {"error": true, "message": "veuillez choisir au moins 2 evenements "};
        return {"error": false};
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <ReactTooltip/>
            <div className="card-header transparent b-b">
                <strong className="text-red">Préciser les détails de votre prestation</strong>
            </div>
            <div className="row rounded border pt-5 bg-grey justify-content-center overflow-auto scrollbar-isl"
                 style={{height: 300}}>
                <div className="col form-material">

                    <div className="form-group d-flex flex-wrap required">
                        <label className="col-sm-4 control-label bolder">
                            <i className="icon icon-warning text-red"
                               data-tip="Définir les évènements pour lesquels vous souhaiter réaliser la prestation"/>&nbsp;Type(s)
                            d'évènement(s)</label>
                        <div className="input-group-prepend col-sm-8 center">
                            <MultiSelectTools funcToFillInProps={addEventSelected} tags={props_events_selected}
                                              list={events_type} placeholder="Ajouter un ou plusieurs évènements"/>
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap required">
                        <label className="col-sm-4 control-label bolder">
                            <i className="icon icon-warning text-red"
                               data-tip="Prix HT de la prestation "/>&nbsp;Prix de la prestation</label>
                        <div className="input-group-prepend col-sm-8 center">
                            <input value={price_of_service} id="price_of_service" name="price_of_service"
                                   onChange={(e) => changeFields(setPriceOfService, e, addPriceOfService, dispatch)}
                                   className="form-control" placeholder="Prix " type="number" style={{width: "100%"}}/>
                            <input className="custom-checkbox text-center text-black align-middle bg-light"
                                   placeholder="Euros" style={{width: 300}} disabled/>
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap required">
                        <label className="col-sm-4 control-label bolder">
                            <i className="icon icon-warning text-red"
                               data-tip="Le nombre de personnes impliquées dans la prestation"/>&nbsp;Nombre
                            d'artiste</label>
                        <div className="input-group-prepend col-sm-8 center">
                            <input value={number_of_artist} id="number_of_artist" name="number_of_artist"
                                   onChange={(e) => changeFields(setNumberOfArtist, e, addNumberOfArtist, dispatch)}
                                   className="form-control" placeholder="Nombre d'artist" type="number"
                                   style={{width: "100%"}}/>
                            <input className="custom-checkbox text-center text-black align-middle bg-light"
                                   placeholder="Dans l'equipe" style={{width: 300}} disabled/>
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap required">
                        <label className="col-sm-4 control-label bolder">
                            <i className="icon icon-warning text-red"
                               data-tip="Définir la durée de la prestation"/>&nbsp;Durée de prestation</label>
                        <div className="input-group-prepend col-sm-8 center">
                            <input value={service_time} id="service_time" name="service_time"
                                   onChange={(e) => changeFields(setServiceTime, e, addServiceTime, dispatch)}
                                   className="form-control" type="number" placeholder="Durée d'execution"
                                   style={{width: "100%"}} required/>
                            {createCheckBox("Jrs", "Votre preparation dure quelque jours ?", "unit_time_of_service", unit_time_of_service, setUnitTimeOfService, "day", "bg-grey")}
                            {createCheckBox("Hrs", "Votre preparation dure quelque Heures ?", "unit_time_of_service", unit_time_of_service, setUnitTimeOfService, "hours", "bg-success")}
                            {createCheckBox("Min", "Votre preparation dure quelque Minutes ?", "unit_time_of_service", unit_time_of_service, setUnitTimeOfService, "min", "bg-info")}
                            {createCheckBox("Sec", "Votre preparation dure quelque Secondes ?", "unit_time_of_service", unit_time_of_service, setUnitTimeOfService, "sec", "bg-warning")}
                        </div>
                    </div>

                    <div className="form-group d-flex flex-wrap required">
                        <label className="col-sm-4 control-label bolder">
                            <i className="icon icon-warning text-red"
                               data-tip="Définir le temps de préparation nécessaire à la préparation de votre prestation"/>&nbsp;Temps
                            de préparation</label>
                        <div className="input-group-prepend col-sm-8 center">
                            <input value={preparation_time} id="preparation_time" name="preparation_time"
                                   onChange={(e) => changeFields(setPreparationTime, e, addPreparationTime, dispatch)}
                                   className="form-control" placeholder="Préparation" type="number"
                                   style={{width: "100%"}} required/>
                            {createCheckBox("Jrs", "Votre temps de preparation dure quelque jours ?", "unit_time_of_preparation", unit_time_of_preparation, setUnitTimeOfPreparation, "day", "bg-grey")}
                            {createCheckBox("Hrs", "Votre temps de preparation dure quelque Heures ?", "unit_time_of_preparation", unit_time_of_preparation, setUnitTimeOfPreparation, "hours", "bg-success")}
                            {createCheckBox("Min", "Votre temps de preparation dure quelque Minutes ?", "unit_time_of_preparation", unit_time_of_preparation, setUnitTimeOfPreparation, "min", "bg-info")}
                            {createCheckBox("Sec", "Votre temps de preparation dure quelque Secondes ?", "unit_time_of_preparation", unit_time_of_preparation, setUnitTimeOfPreparation, "sec", "bg-warning")}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default PrestationDetails;
