import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
    addAllUserOptions,
    addAllUserPrestation,
    profileInitialisationCondition
} from "../../FunctionTools/FunctionProps";
import {
    addSpecialDateToData,
    calculateNumberDaysBetweenDates,
    ChangeDate,
    changeFields, deleteInObject,
    formatDate,
} from "../../FunctionTools/Tools";
import Calendar from "../../KantoBiz/Calendar/Calendar";

function CalendarManagement(props) {

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

    const changeDayOfAvailability = (day) => {
        let tmp = {...condition};
        tmp[day] = !tmp[day];
        setCondition(tmp);
        dispatch(profileInitialisationCondition(tmp));
        tmp = deleteInObject(tmp);
        axios.put('api/artist_conditions/update', tmp, {headers: props.headers}).then((err) => null)
    };

    const editEnable = (e) => {
        setDeActiveEdit(false);
        let val = e.target.value === "true";
        if (enable !== val) setEnable(val)
    };

    const addOneNewSpecialDate = async (date_, state_props, func_props, index) => {
        let tmp = [...state_props];
        await addSpecialDateToData(tmp, null, null, null, index, date_);
        tmp[index]["special_date"][date_]["hidden"] = enable;
        await dispatch(func_props(tmp));
    };

    const addAllNewSpecialDateTo = (date_, state_props, func_props) => {
        for (let index in state_props)
            addOneNewSpecialDate(date_, state_props, func_props, index).then(r => null)
    };

    const addNewSpecialDateInPrestationOrOption = (date_) => {
        if (selectedOption !== "all" && selectedOption !== null)
            addOneNewSpecialDate(date_, props_options, addAllUserOptions, selectedOption).then(() => null);
        else addAllNewSpecialDateTo(date_, props_options, addAllUserOptions);
        if (selectedPrestation !== "all" && selectedPrestation !== null)
            addOneNewSpecialDate(date_, prestations, addAllUserPrestation, selectedPrestation).then(() => null);
        else addAllNewSpecialDateTo(date_, prestations, addAllUserPrestation);
    };

    const checkAllKeyOfDates = (start, end) => {
        for (let date = start; date <= end; date.setDate(date.getDate() + 1))
            addNewSpecialDateInPrestationOrOption(formatDate(date));
    };

    const checkModification = () => {
        let now = formatDate(new Date());
        let start = formatDate(startDate);
        let end = formatDate(endDate);
        if (start === now || end === now) toast.error("Veuillez choisir un autre date");
        else if (start > end) toast.error("Date de Fin invalide");
        else if (selectedOption === null && selectedPrestation === null) toast.error("Choisir une Prestation ou une option");
        else {
            let numberOfDaysDifference = calculateNumberDaysBetweenDates(new Date(end), new Date(start));
            if (numberOfDaysDifference === 0) addNewSpecialDateInPrestationOrOption(start, end);
            else checkAllKeyOfDates(startDate, endDate);
            toast.success("Enregister avec succès")
        }
    };

    useEffect(() => {
        const list_of_prestations = prestations.map((val, index) => <option key={index}
                                                                            value={index}>{val.title}</option>);
        const list_of_options = props_options.map((val, index) => <option key={index}
                                                                          value={index}>{val.name}&nbsp;({val.tag})</option>);
        list_of_prestations.push(<option key={prestations.length} value="all">Tout (appliquer à toutes les
            prestations)</option>);
        list_of_options.push(<option key={props_options.length} value="all">Tout (appliquer à toutes les
            options)</option>);
        setPrestationLists(list_of_prestations);
        setOptionLists(list_of_options);

        return () => {
            isMounted.current = true
        };
    }, [condition]);

    return (
        <div>
            <ReactTooltip place="right" className="special-color-dark" id='statut' aria-haspopup='true'>
                <h5 className="text-center text-green"> Les applications de mon statut </h5><br/>

                <small>• Choisir les prestations et les options sur lesquelles s'appliquent mon statut (Disponible ou
                    non) </small><br/>
                <small>• Le statut peut s'appliquer sur une seule prestation, sur plusieurs prestations séléctionnées ou
                    sur toutes les prestations</small><br/>
            </ReactTooltip>

            <div className="d-md-flex align-items-center">
                <div className="ml-5 pl-5">
                    <h2 className="font-weight-lighter h3 my-3 text-primary">Gérer mes disponibilités</h2>
                    <ul className="align-baseline list-inline">
                        <li className="list-inline-item"><i className="icon-folder text-primary mr-2"/>Pour mes
                            prestations
                        </li>
                        <li className="list-inline-item"><i className="icon-list-1 text-primary mr-2"/>Pour mes options
                        </li>
                    </ul>
                </div>
            </div>
            <div className="list-group-item">

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
                        <h4 className="text-red bolder pb-4">Définir une période</h4>
                        <div className="row justify-content-center">
                            <label className="col-md-2 input-group-addon bg-transparent pt-3">
                                <h4 className="text-red">Début<i className="icon ml-2 icon-info"
                                                                 data-tip="La date de début"/></h4>
                            </label>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={startDate}
                                        onChange={(e) => ChangeDate(e, setStartDate)}/>
                            <label className="col-md-2 input-group-addon bg-transparent pt-3">
                                <h4 className="text-red">Fin<i className="icon ml-2 icon-info"
                                                               data-tip="La date de fin"/></h4>
                            </label>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={endDate}
                                        onChange={(e) => ChangeDate(e, setEndDate)}/>
                        </div>
                    </div>
                    <div className="form-group text-center col-md-8 pt-3">
                        <h4 className="text-red bolder pb-3">Mon statut</h4>
                        <div className="row justify-content-center">
                            <div className="selecto">
                                <select name="slct" id="slct" style={selectStyle} onChange={editEnable}>
                                    <option selected disabled>Choisir mon statut pour cette période</option>
                                    <option value={false}>Disponible</option>
                                    <option value={true}>Indisponible</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group text-center col-md-8 border-bottom pb-3">
                        <h4 className="text-red bolder pb-3">Appliquer mon statut<i className="icon ml-2 icon-info"
                                                                                    data-tip data-for="statut"/></h4>
                        <div className="row justify-content-center">
                            <div className="col selecto">
                                <select name="slct" id="slct" style={selectStyle}
                                        onChange={(e) => changeFields(setSelectedPrestation, e)}>
                                    <option selected disabled>Choisir la prestation</option>
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
                        <button className="btn btn-outline-danger pl-5 pr-5 mt-4"
                                style={deActiveEdit ? cursorBlock : cursorResize}
                                onClick={checkModification} disabled={deActiveEdit}>Appliquer les modifications
                        </button>
                    </div>
                </div>

            </div>
            <Calendar/>
        </div>
    );
}

export default CalendarManagement;
