import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    addAllUserOptions,
    addAllUserPrestation,
    profileInitialisationCondition
} from "../../../../FunctionTools/FunctionProps";
import {
    addSpecialDateToData,
    calculateNumberDaysBetweenDates,
    changeFields,
    deleteInObject,
    formatDate,
    objectToFormData, updateAllOptions, updateAllServices
} from "../../../../FunctionTools/Tools";

function AvailabilityPeriod(props) {

    const dispatch = useDispatch();
    const conditions = useSelector(state => state.profile.conditions);
    const prestations = useSelector(state => state.profilePrestations.prestations);
    const props_options = useSelector(state => state.profilePrestations.options);

    const isMounted = useRef(false);
    const [startDate, setStartDate] = useState(new Date());
    const [deActiveEdit, setDeActiveEdit] = useState(true);
    const [endDate, setEndDate] = useState(new Date());
    const [condition, setCondition] = useState(conditions);
    const [prestationLists, setPrestationLists] = useState([]);
    const [optionLists, setOptionLists] = useState([]);
    const [enable, setEnable] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedPrestation, setSelectedPrestation] = useState(null);
    const [oneDate, setOneDate] = useState(false);
    const [periodDate, setPeriodDate] = useState(false);
    const [status, setStatus] = useState(false);
    const [applyStatus, setApplyStatus] = useState(false);
    const cursorResize = {cursor: "wait"};
    const cursorBlock = {cursor: "not-allowed"};
    const selectStyle = {
        flex: 1,
        appearance: "none",
        outline: 0,
        boxShadow: "none",
        border: 0,
        background: "#2c3e50 none",
        padding: "0 .5em",
        color: "#fff",
        cursor: "pointer"
    };

    const changeStartDateFields = (date) => {
        setStartDate(date);
        if (oneDate) setStatus(true);
    };

    const changeEndDateFields = (date) => {
        setEndDate(date);
        setStatus(true);
    };

    const addOneNewSpecialDate = async (date_, state_props, func_props, index) => {
        let tmp = [...state_props];
        await addSpecialDateToData(tmp, null, null, null, index, date_);
        tmp[index]["special_dates"][date_]["hidden"] = enable;
        await dispatch(func_props(tmp));
    };

    const addAllNewSpecialDateTo = (date_, state_props, func_props) => {
        for (let index in state_props)
            addOneNewSpecialDate(date_, state_props, func_props, index).then(r => null)
    };

    const addNewSpecialDateInPrestationOrOption = (start, end) => {

        if (start && end) start = start + "-" + end;

        if (selectedOption !== "all" && selectedOption !== null)
            addOneNewSpecialDate(start, props_options, addAllUserOptions, selectedOption).then(() => null);
        else if (selectedOption !== null) addAllNewSpecialDateTo(start, props_options, addAllUserOptions);
        if (selectedPrestation !== "all" && selectedPrestation !== null)
            addOneNewSpecialDate(start, prestations, addAllUserPrestation, selectedPrestation).then(() => null);
        else if (selectedPrestation !== null) addAllNewSpecialDateTo(start, prestations, addAllUserPrestation);
    };

    const checkModification = () => {
        let nowDate = new Date();
        let now = formatDate(nowDate);
        let start = formatDate(startDate);
        let end = formatDate(endDate);
        if (oneDate && start === now) toast.error("Ne pas choisir la date d'aujourd'hui");
        else if (periodDate && startDate === nowDate || periodDate && endDate === nowDate) toast.error("date de debut et/ou de fin pour aujourd'hui n'est pas valide");
        else if (periodDate && startDate > endDate) toast.error("Date de Fin invalide");
        else if (selectedOption === null && selectedPrestation === null) toast.error("Choisir une Prestation ou une option");
        else {
            let numberOfDaysDifference = calculateNumberDaysBetweenDates(new Date(end), new Date(start));
            if (numberOfDaysDifference === 0) addNewSpecialDateInPrestationOrOption(start);
            else addNewSpecialDateInPrestationOrOption(start, end);
            updateOptionAndServiceWithSpecialDates()
        }
    };

    const generateVariableAllOptionUpdated = (val, index, state_props, func) => {
        let tmp = [...state_props];
        tmp[index] = val;
        dispatch(func(tmp));
    };

    const  cancelDate = () => {
        setOneDate(false);
        setPeriodDate(false);
        setStatus(false);
        setApplyStatus(false);
    };

    const updateOptionAndServiceWithSpecialDates = () => {

        let api_call_update = [];
        let headers = props.parentProps.headers;
        headers['Content-Type'] = 'application/json';

        if (selectedOption !== "all" && selectedOption !== null) {
            let selectedOptionToUpdate = {...props_options[selectedOption]};
            let id = selectedOptionToUpdate["id"];
            selectedOptionToUpdate = deleteInObject(selectedOptionToUpdate);
            delete selectedOptionToUpdate["materials"];
            api_call_update.push(
                axios.put('api/options/update/' + id, selectedOptionToUpdate, {headers: headers}).then((resp) => {
                    generateVariableAllOptionUpdated(resp.data, selectedOption, props_options, addAllUserOptions)
                })
            )
        } else if (selectedOption !== null)
            api_call_update.push(updateAllOptions(props_options, dispatch, headers));

        if (selectedPrestation !== "all" && selectedPrestation !== null) {
            let selectedPrestationToUpdate = {...prestations[selectedPrestation]};
            let id = selectedPrestationToUpdate["id"];
            selectedPrestationToUpdate = deleteInObject(selectedPrestationToUpdate);
            api_call_update.push(
                axios.put('api/artist_services/update/' + id, objectToFormData(selectedPrestationToUpdate), {headers: props.parentProps.headers}).then((resp) => {
                    generateVariableAllOptionUpdated(resp.data, selectedPrestation, prestations, addAllUserPrestation)
                })
            )
        } else if (selectedPrestation !== null)
            api_call_update.push(updateAllServices(prestations, dispatch, props.parentProps.headers));

        Promise.all(api_call_update).then(() => {
            toast.success("Changement pris en compte");
            setDeActiveEdit(true);
            setSelectedOption(null);
            setSelectedPrestation(null);
            setStartDate(new Date());
            setEndDate(new Date());
            cancelDate();
        })

    };

    const changeDayOfAvailability = (day) => {
        let tmp = {...condition};
        tmp[day] = !tmp[day];
        setCondition(tmp);
        dispatch(profileInitialisationCondition(tmp));
        tmp = deleteInObject(tmp);
        axios.put('api/artist_conditions/update', tmp, {headers: props.parentProps.headers}).then((err) => null)
    };

    const editEnable = (e) => {
        setDeActiveEdit(false);
        let val = e.target.value === "true";
        if (enable !== val) setEnable(val)
    };

    useEffect(() => {

        const list_of_prestations = prestations.map((val, index) =>
            <option key={index} value={index}>{val.title}</option>);
        const list_of_options = props_options.map((val, index) =>
            <option key={index} value={index}>{val.name}&nbsp;({val.artist_tagged})</option>);

        list_of_prestations.push(
            <option key={prestations.length} value="all">Tout (appliquer à toutes les prestations)</option>);
        list_of_options.push(
            <option key={props_options.length} value="all">Tout (appliquer à toutes les options)</option>);

        setPrestationLists(list_of_prestations);
        setOptionLists(list_of_options);

        return () => {
            isMounted.current = true
        };
    }, [condition, props_options, prestations, status, startDate, endDate]);

    return (
        <div className="list-group-item justify-content-center">

            <div className="form-row justify-content-center">
                <div className="text-center mb-3">
                    <h4 className="text-red bolder pb-4">Je suis disponible chaque </h4>
                    <div className="countDown">
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("monday")}>
                                    {condition["monday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Lundi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("tuesday")}>
                                    {condition["tuesday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Mardi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("wednesday")}>
                                   {condition["wednesday"] ? <i className="icon-success text-green"/> :
                                       <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Mercredi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("thursday")}>
                                    {condition["thursday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Jeudi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("friday")}>
                                    {condition["friday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Vendredi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("saturday")}>
                                    {condition["saturday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Samedi</small>
                        </div>
                        <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("sunday")}>
                                    {condition["sunday"] ? <i className="icon-success text-green"/> :
                                        <i className="icon-error text-red"/>}
                                </span>
                            <small className="count-type text-white">Dimanche</small>
                        </div>
                    </div>
                </div>

                <div className="form-group text-center col-md-8 border-top pt-3">
                    <h4 className="text-red bolder pb-4">Choisir une date ou une période d'indisponibilité ou de
                        disponibilité</h4>
                    <div className="row justify-content-center">
                        {oneDate || periodDate ? <div className="ml-2 mr-2">
                            <h4 className="text-red">{oneDate ? "Le statut sera appliquer le" : "Début"}<i
                                className="icon ml-2 icon-info"
                                data-tip="La date de début"/></h4>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={startDate}
                                        onChange={(date) => changeStartDateFields(date)}/>
                        </div> : <div className="row justify-content-center">
                            <button className="btn btn-outline-danger ml-2 mr-2" onClick={() => setOneDate(true)}>
                                <i className="icon icon-calendar-plus-o"/>Choisir une date
                            </button>
                            <button className="btn btn-outline-danger ml-2 mr-2 pl-5 pr-5"
                                    onClick={() => setPeriodDate(true)}>
                                <i className="icon icon-calendar"/>Choisir une periode
                            </button>
                        </div>}
                        {periodDate &&
                        <div className="ml-2 mr-2">
                            <h4 className="text-red">Jusqu'au<i className="icon ml-2 icon-info"
                                                                data-tip="La date de fin"/></h4>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={endDate}
                                        onChange={(e) => changeEndDateFields(e)}/>
                        </div>}
                    </div>
                </div>


                {status &&
                <div className="form-group text-center col-md-8 pt-3">
                    <h4 className="text-red bolder pb-3">Mon statut</h4>
                    <div className="row justify-content-center">
                        <div className="selecto">
                            <select name="slct" id="slct" style={selectStyle} onChange={(e) => {
                                editEnable(e);
                                setApplyStatus(true)
                            }}>
                                <option defaultValue={false} selected disabled>Choisir mon statut pour cette période
                                </option>
                                <option value={false}>Disponible</option>
                                <option value={true}>Indisponible</option>
                            </select>
                        </div>
                    </div>
                </div>}


                <div className="form-group text-center col-md-8 border-bottom pb-3">
                    {applyStatus && <div>
                        <h4 className="text-red bolder pb-3">Appliquer mon statut<i className="icon ml-2 icon-info"
                                                                                    data-tip data-for="statut"/></h4>
                        <div className="row justify-content-center">
                            <div className="col selecto">
                                <select name="slct" id="slct" style={selectStyle}
                                        onChange={(e) => changeFields(setSelectedPrestation, e)}>
                                    <option defaultValue={false} selected disabled>Choisir la prestation</option>
                                    {prestationLists}
                                </select>
                            </div>
                            <div className="col selecto">
                                <select name="slct" id="slct" style={selectStyle}
                                        onChange={(e) => changeFields(setSelectedOption, e)}>
                                    <option selected disabled>Choisir l'option</option>
                                    {optionLists}
                                </select>
                            </div>
                        </div>
                    </div>}

                    {periodDate || oneDate ? <button className="btn btn-outline-danger pl-5 pr-5 mt-4 ml-1 mr-1"
                                                      onClick={() => cancelDate()}>revenir</button>: null}
                    {applyStatus &&
                    <button className="btn btn-outline-danger pl-5 pr-5 mt-4 ml-1 mr-1"
                            style={deActiveEdit ? cursorBlock : cursorResize}
                            onClick={checkModification} disabled={deActiveEdit}>Appliquer les modifications
                    </button>}

                </div>

            </div>

        </div>
    );
}

export default AvailabilityPeriod;
