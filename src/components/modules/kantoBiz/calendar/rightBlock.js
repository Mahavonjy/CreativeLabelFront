import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactTooltip from "react-tooltip";
import {addCurrentDateKey, addMaterialsCopy, addOptionCopy, addServicesCopy} from "../../../functionTools/functionProps";
import {addSpecialDateToData, checkIfHidden} from "../../../functionTools/tools";
import Materials from "../../../profile/edits/materials";
import LeftBlock from "./leftBlock";

function RightBlock(props) {

    const dispatch = useDispatch();
    const prestations = useSelector(state => state.profilePrestations.prestations);
    const props_options = useSelector(state => state.profilePrestations.options);
    const reservations_list = useSelector(state => state.profile.reservations_list);
    const prestationCopy = useSelector(state => state.Others.prestationCopy);
    const optionsCopy = useSelector(state => state.Others.optionsCopy);
    const dateKey = useSelector(state => state.Others.dateKey);

    const isMounted = useRef(false);
    const [loadMaterials, setLoadMaterials] = useState(true);
    const [selectedYear, setSelectedYear] = useState(props.date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(props.date.getMonth());
    const [selectedDay, setSelectedDay] = useState(props.date.getDate());
    const [price, setPrice] = useState(null);
    const [travel_expenses, setTravelExpenses] = useState(null);
    const [editPrestation, setEditPrestation] = useState({});
    const [editOptions, setEditOptions] = useState([]);
    const [arrMonth, setArrMonth] = useState({});
    const [index_, setIndex_] = useState(null);
    const [key, setKey] = useState(dateKey);
    const [firstDay, setFirstDay] = useState(
        new Date(props.date.getFullYear() + "-" + (props.date.getMonth() + 1) + "-01").getDay()
    );
    // let handleToUpdateDate = props.handleToUpdateDate;
    let monthOptions = Object.keys(arrMonth).map(month => (
        <option className="option-month" selected={month === Object.keys(arrMonth)[selectedMonth] ? "selected" : ""}>
            {month}
        </option>
    ));

    RightBlock.changeIndexPrestation = async (index) => {
        await fillProps(index, true);
    };

    const updateDiffenrentPrice = async (e, setValue, key_) => {
        let value = e.target.value;
        setValue(value);
        let tmpOriginalPrestation = [...prestationCopy];
        tmpOriginalPrestation[index_]["special_dates"][key][key_] = value;
        await dispatch(addServicesCopy(tmpOriginalPrestation));
    };

    const fillProps = async (i, opt, day) => {
        let daySelected;
        if (day || day === 0) {
            setSelectedDay(day);
            daySelected = day;
        } else daySelected = selectedDay;
        await setLoadMaterials(false);
        await setIndex_(i);
        let key = selectedMonth + "/" + daySelected + "/" + selectedYear;
        setKey(key);
        dispatch(addCurrentDateKey(key));
        let tmp_options = [...optionsCopy];
        if (!prestationCopy[i]["special_dates"][key] || !opt) {
            await addSpecialDateToData(tmp_options, selectedMonth, daySelected, selectedYear);
            await addSpecialDateToData(prestationCopy, selectedMonth, daySelected, selectedYear);
        }
        await setEditOptions(tmp_options);
        await setEditPrestation(prestationCopy[i]);
        await setPrice(prestationCopy[i]["special_dates"][key]["price"]);
        await setTravelExpenses(prestationCopy[i]["special_dates"][key]["travel_expenses"]);
        await dispatch(addMaterialsCopy(prestationCopy[i]["special_dates"][key]["materials"]));
        await setLoadMaterials(true);
        if (!opt)
            await LeftBlock.handleClick(prestationCopy, key)
    };

    const changeOptionHide = (index, opt) => {
        let tmp_editOptions = [...editOptions];
        let tmp_opt = tmp_editOptions[index]["special_dates"][key]['services_id_list'];
        if (opt) {
            tmp_editOptions[index]["special_dates"][key]['services_id_list'] = tmp_opt.filter(
                id => !editPrestation["id"] === id
            );
        } else {
            tmp_opt.push(editPrestation["id"]);
            tmp_editOptions[index]["special_dates"][key]['services_id_list'] = tmp_opt;
        }
        setEditOptions(tmp_editOptions);
        dispatch(addOptionCopy(tmp_editOptions));
    };

    const updateMonth = (event) => {
        let newMonth = Object.keys(arrMonth).indexOf(event.target.value);
        // handleToUpdateDate(selectedDay + "/" + newMonth + "/" + selectedYear);
        setSelectedMonth(newMonth + 1);
        setFirstDay(new Date(selectedYear + "-" + (newMonth + 1) + "-01").getDay());
    };

    const prevMonth = () => {
        if (selectedMonth - 1 < 0) {
            // handleToUpdateDate(selectedDay + "/" + 11 + "/" + selectedYear - 1);
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
            setFirstDay(new Date(selectedYear - 1 + "-12-01").getDay())
        } else {
            // handleToUpdateDate(selectedDay + "/" + selectedMonth - 1 + "/" + selectedYear);
            setSelectedMonth(selectedMonth - 1);
            setFirstDay(new Date(selectedYear + "-" + selectedMonth).getDay());
        }
    };

    const nextMonth = () => {
        if (selectedMonth + 1 > 11) {
            // handleToUpdateDate(selectedDay + "/" + 0 + "/" + selectedYear + 1);
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
            setFirstDay(new Date(selectedYear + 1 + "-01-01").getDay());
        } else {
            // handleToUpdateDate(selectedDay + "/" + selectedMonth + 1 + "/" + selectedYear);
            setSelectedMonth(selectedMonth + 1);
            setFirstDay(new Date(selectedYear + "-" + (selectedMonth + 2) + "-01").getDay());
        }
    };

    const updateYear = (event) => {
        if (event.target.value.length === 4) {
            // handleToUpdateDate(selectedDay + "/" + selectedMonth + "/" + event.target.value);
            setSelectedYear(parseInt(event.target.value));
            setFirstDay(new Date(parseInt(event.target.value) + "-" + (selectedMonth + 1) + "-01").getDay());
        } else if (event.target.value.length > 0) {
            setSelectedYear(parseInt(event.target.value));
        }
    };

    const getDayBlocks = () => {
        let arrNo = [];
        for (let n = 0; n < firstDay; n++) arrNo.push(<div className="day-block"/>);
        for (let i = 1; i < Object.values(arrMonth)[selectedMonth] + 1; i++) {
            let bg_color = "";
            Promise.all(reservations_list.map(element => {
                let date_   = element.event_date.split("T")[0];
                let year    = parseInt(date_.split("-")[0]);
                let month   = parseInt(date_.split("-")[1]) - 1;
                let day     = parseInt(date_.split("-")[2]) + 1;
                if (selectedYear === year && selectedMonth === month && i === day) {
                    if (element.status === "pending") bg_color = "bg-warning";
                    else if (element.status === "accepted") bg_color = "bg-info";
                }
                return true;
            })).then(r => null);
            arrNo.push(
                <div data-id={i} onClick={!props.noEdit ? () => fillProps(0, false, i) : null}
                     data-tip="Cliquer pour faire une modification"
                     className={
                         bg_color + ` day-block ${
                         i === selectedDay
                         && props.date.getMonth() + 1 === selectedMonth + 1
                         && props.date.getFullYear() === selectedYear
                             ? "m-1 active"
                             : (bg_color ? "m-1 day-in" : "m-1 inactive")}`
                     }>
                    <div className="inner">{i}</div>
                </div>
            );
        }
        return arrNo;
    };

    const checkServiceOptionToEdit = () => {
        return (
            <div className="text-center">
                <ReactTooltip/>
                <div className="row justify-content-center pt-5 mr-4">
                    <div className="col-md-4">
                        <h4 className="text-red text-center">Mes prix pour cette date</h4>
                        <div className="text-center">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center">
                                    <div className="input-group-text text-dark">Prix pour cette date&nbsp;
                                        <i
                                            className="icon icon-info text-red"
                                            data-tip="Ceci est le prix de la prestation pour ce jour"/>
                                    </div>
                                    <input className="form-control" type="number" id="global_price" name="global_price"
                                           value={price}
                                           onChange={
                                               (e) =>
                                                   updateDiffenrentPrice(
                                                       e,
                                                       setPrice,
                                                       "price"
                                                   )
                                           }/>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center">
                                    <div className="input-group-text text-dark">Frais pour cette date&nbsp;
                                        <i className="icon icon-info text-red"
                                           data-tip="Ceci est le prix du frais de transport ce jour"/>
                                    </div>

                                    <input className="form-control" type="number" id="global_price" name="global_price"
                                           value={travel_expenses}
                                           onChange={
                                               (e) => updateDiffenrentPrice(
                                                   e,
                                                   setTravelExpenses,
                                                   "travel_expenses"
                                               )
                                           }/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        {/*<h4 className="text-red text-center">Mes options pour cette date</h4>*/}
                        {/*{checkAllOptionsOfServices()}*/}
                        <h4 className="text-red text-center">Mes materiels pour cette date</h4>
                        {!props.toggle && loadMaterials && <Materials noExemple edit index={index_}/>}
                    </div>
                </div>
            </div>
        );
    };

    const checkAllOptionsOfServices = () => {
        return (
            <div>
                {!props.toggle &&
                <table className="table mt-4 mb-4">
                    {editOptions.length !== 0 ?
                        <tbody>
                        {editOptions.map((val, index) =>
                            <tr className="bg-secondary" key={index}>
                                {checkIfHidden(
                                    optionsCopy[index]["special_dates"][key].services_id_list,
                                    editPrestation["id"]) ?
                                    <i className="icon icon-eye s-24 text-red"
                                       data-tip="Cette Otpion est activer pour cette prestation sur cette journée"
                                       onClick={() => changeOptionHide(index, true)}/> :
                                    <i className="icon icon-eye-slash s-24 text-red"
                                       data-tip="Cette Otpion est déactiver pour cette prestation sur cette journée"
                                       onClick={() => changeOptionHide(index, false)}/>}
                                <td><small className="bolder">{val["special_dates"][key].name}</small></td>
                                <td><small className="bolder">{val["special_dates"][key].artist_tagged}</small></td>
                                <td><small className="bolder">{val["special_dates"][key].price}$</small></td>
                            </tr>)}
                        </tbody> :
                        <div className="text-center"><small className="bolder">Vous n'avez pas d'options</small></div>}
                </table>}
            </div>
        )
    };

    useEffect(() => {

        if (props.toggle && prestationCopy.length === 0) {
            dispatch(addOptionCopy(props_options));
            dispatch(addServicesCopy(prestations));
        }

        function getDayInMonth(year, month) {
            const isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
            return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
        }

        let months = [
            'Janvier',
            'Fevrier',
            'Mars',
            'Avril',
            'Mai',
            'Juin',
            'Juillet',
            'Aout',
            'Septembre',
            'Octobre',
            'Novembre',
            'Decembre'
        ];
        let tmp = {};
        for (let index in months) tmp[months[index]] = getDayInMonth(selectedYear, index);
        setArrMonth(tmp);

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [props_options, prestations, prestationCopy, optionsCopy]);

    return (
        <div className="flip-container-right">
            <ReactTooltip/>
            <div className={`flipper ${props.toggle ? "" : "toggle"}`}>
                <div className="front front-right">
                    <div className="container-date-picker">
                        <button className="btn btn-outline-danger r-5" data-tip="le mois precedent" onClick={prevMonth}>
                            <i className="text-red icon-long-arrow-left"/>
                        </button>
                        <select className="select-month" onChange={updateMonth}>
                            {props.toggle && monthOptions}
                        </select>
                        <input type="text" className="input-year" data-tip="changer manuelement l'année"
                               onChange={updateYear} value={selectedYear} maxlength="4"/>
                        <button className="btn btn-outline-danger r-5" data-tip="le mois suivant" onClick={nextMonth}>
                            <i className="text-red icon-long-arrow-right"/>
                        </button>
                    </div>
                    <div className="container-day">
                        {props.toggle && props.arrDays.map(day => (
                            <div className="weekday text-red">{day.substring(0, 3)}</div>))}
                        {props.toggle && getDayBlocks()}
                    </div>
                </div>
                <div className="back back-right overflow-auto scrollbar-isl">
                    {checkServiceOptionToEdit()}
                </div>
            </div>
        </div>
    );
}

export default RightBlock;
