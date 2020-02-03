import React, { useEffect, useRef, useState } from "react";
import LeftBlock from "./LeftBlock";
import Materials from "../../Profile/PrestationEdits/Materials";
import { changeFields, checkIfHidden, compareArrays, addSpecialDateToData } from "../../FunctionTools/Tools";
import { addAllUserPrestation, addAllUserOptions } from "../../FunctionTools/FunctionProps";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";

function RightBlock (props) {

    const dispatch = useDispatch();
    const materials = useSelector(state => state.KantoBizForm.materials);
    const prestations = useSelector(state => state.profilePrestations.prestations);
    const props_options = useSelector(state => state.profilePrestations.options);

    const isMounted = useRef(false);
    const [loadMaterials, setLoadMaterials] = useState(true);
    const [firstDay, setFirstDay] = useState(new Date(props.date.getFullYear() + "-" + (props.date.getMonth() + 1) + "-01").getDay());
    const [selectedYear, setSelectedYear] = useState(props.date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(props.date.getMonth());
    const [selectedDay, setSelectedDay] = useState(props.date.getDate());
    const [price, setPrice] = useState( null);
    const [moving_price, setMovingPrice] = useState( null);
    const [editPrestation, setEditPrestation] = useState({});
    const [editOptions, setEditOptions] = useState([]);
    const [state_materials, setStateMaterials] = useState([]);
    const [arrMonth, setArrMonth] = useState({});

    const [index_, setIndex_] = useState(null);
    let handleToUpdateDate = props.handleToUpdateDate;
    let monthOptions = Object.keys(arrMonth).map(month => (
        <option className="option-month" selected={month === Object.keys(arrMonth)[selectedMonth] ? "selected" : ""}>
            {month}
        </option>
    ));

    const fillProps = async (i, opt, day) => {
        console.log(prestations, props_options);
        let daySelected;
        if (day || day === 0) {
            setSelectedDay(day);
            daySelected = day;
        } else daySelected = selectedDay;
        await setLoadMaterials(false);
        await setIndex_(i);
        let tmp_options = [...props_options];
        await addSpecialDateToData([...tmp_options], selectedMonth, daySelected, selectedYear);
        await setEditOptions([...tmp_options]);
        await addSpecialDateToData(prestations, selectedMonth, daySelected, selectedYear);
        await setEditPrestation(prestations[i]);
        await setPrice(prestations[i]["special_date"][selectedMonth + "/" + daySelected + "/" + selectedYear]["price"]);
        await setMovingPrice(prestations[i]["special_date"][selectedMonth + "/" + daySelected + "/" + selectedYear]["moving_price"]);
        setStateMaterials(prestations[i]["special_date"][selectedMonth + "/" + daySelected + "/" + selectedYear]["materials"]);
        await setLoadMaterials(true);
        if (!opt)
            await LeftBlock.handleClick(i)
    };

    const update = async () => {
        let tmp_originalPrestation = prestations;
        tmp_originalPrestation[index_] = {...editPrestation};
        tmp_originalPrestation[index_]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]["price"] = price;
        tmp_originalPrestation[index_]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]["moving_price"] = moving_price;
        tmp_originalPrestation[index_]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]["materials"] = materials;
        await dispatch(addAllUserPrestation([...tmp_originalPrestation]));
        await dispatch(addAllUserOptions([...editOptions]));
    };

    const checkIfUpdate = () => {
        if (
            price !== editPrestation["price"]
            || moving_price !== editPrestation["moving_price"]
            || editPrestation["hidden"] !== editPrestation["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]["hidden"]
            || !compareArrays(editPrestation["materials"], materials)
        ) {
            update().then(r => null)
        } else {
            for (let r in  editOptions) {
                if (!compareArrays(editOptions[r]['service_id_who_is_active'], editOptions[r]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['service_id_who_is_active'])) {
                    update().then(r => null);
                }
            }
        }
    };

    const changePrestationHide = () => {
        let first_tmp = {...editPrestation};
        let second_tmp = first_tmp["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['hidden'];
        first_tmp["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['hidden'] = !second_tmp;
        setEditPrestation(first_tmp);
    };

    const changeOptionHide = (index, opt) => {
        let tmp_editOptions = [...editOptions];
        let tmp_opt = tmp_editOptions[index]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['service_id_who_is_active'];
        if (opt) tmp_editOptions[index]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['service_id_who_is_active'] = tmp_opt.filter(id => !editPrestation["id"] === id);
        else {
            tmp_opt.push(editPrestation["id"]);
            tmp_editOptions[index]["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['service_id_who_is_active'] = tmp_opt;
        }
        setEditOptions(tmp_editOptions);
    };

    const updateMonth = (event) => {
        let newMonth = Object.keys(arrMonth).indexOf(event.target.value);
        handleToUpdateDate(selectedDay + "/" + newMonth + "/" + selectedYear);
        setSelectedMonth(newMonth + 1);
        setFirstDay(new Date(selectedYear + "-" + (newMonth + 1) + "-01").getDay());
    };

    const prevMonth = () => {
        if (selectedMonth - 1 < 0) {
            handleToUpdateDate(selectedDay + "/" + 11 + "/" + selectedYear -1);
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
            setFirstDay(new Date(selectedYear - 1 + "-" + "12-01").getDay())
        } else {
            handleToUpdateDate(selectedDay + "/" + selectedMonth - 1 + "/" + selectedYear);
            setSelectedMonth(selectedMonth - 1);
            setFirstDay(new Date(selectedYear + "-" + selectedMonth).getDay());
        }
    };

    const nextMonth = () => {
        if (selectedMonth + 1 > 11) {
            handleToUpdateDate(selectedDay + "/" +0 + "/" + selectedYear + 1);
            setSelectedMonth(0);
            setSelectedYear(selectedYear + 1);
            setFirstDay(new Date(selectedYear + 1 + "-" + "01-01").getDay());
        } else {
            handleToUpdateDate(selectedDay + "/" + selectedMonth + 1 + "/" + selectedYear);
            setSelectedMonth(selectedMonth + 1);
            setFirstDay(new Date(selectedYear + "-" + (selectedMonth + 2) + "-01").getDay());
        }
    };

    const updateYear = (event) => {
        if (event.target.value.length === 4) {
            handleToUpdateDate(selectedDay + "/" + selectedMonth + "/" + event.target.value);
            setSelectedYear(parseInt(event.target.value));
            setFirstDay(new Date(parseInt(event.target.value) + "-" + (selectedMonth + 1) + "-01").getDay());
        } else if (event.target.value.length > 0) {
            setSelectedYear(parseInt(event.target.value));
        }
    };

    const getDayBlocks = () => {
        let arrNo = [];
        for (let n = 0; n < firstDay; n++)
            arrNo.push(<div className="day-block" />);
        for (let i = 1; i < Object.values(arrMonth)[selectedMonth] + 1; i++)
            arrNo.push(
                <div data-id={i} onClick={() => fillProps(0,false, i)} data-tip="Cliquer pour faire une modification"
                     className={`day-block ${i === selectedDay && props.date.getMonth() + 1 === selectedMonth + 1 && props.date.getFullYear() === selectedYear ? "active" : "inactive"}`}>
                    <div className="inner">{i}</div>
                </div>
            );
        return arrNo;
    };

    const getHidePrestation = () => {
        if (editPrestation["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]['hidden'] && editPrestation["special_date"]["hidden"])
            return (<i className="icon-eye absolute right-0 s-36 mr-3" onClick={changePrestationHide}/>);
        else return (<i className="icon-eye-slash absolute right-0 s-36 mr-3" onClick={changePrestationHide}/>)
    };

    const getEvents = () => {
        return (
            <div className="text-center">
                <ReactTooltip/>
                {!props.toggle && getHidePrestation()}
                <div className="row justify-content-center pt-5 mr-4">
                    <div className="col-md-4">
                        <h4 className="text-red text-center">Les Prix d'aujourd'hui</h4>
                        <div className="text-center">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center">
                                    <div className="input-group-text text-dark">Modifier le prix&nbsp;<i className="icon icon-info text-red" data-tip="Ceci est le prix de la prestation pour ce jour"/></div>
                                    <input className="form-control" type="number" id="global_price" name="global_price" value={price}
                                           onChange={(e) => changeFields(setPrice, e)}/>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center">
                                    <div className="input-group-text text-dark">Modifier le frais&nbsp;<i className="icon icon-info text-red" data-tip="Ceci est le prix du frais de transport ce jour"/></div>
                                    <input className="form-control" type="number" id="global_price" name="global_price" value={moving_price}
                                           onChange={(e) => changeFields(setMovingPrice, e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <h4 className="text-red text-center">Les options</h4>
                        {getTableOfOptions()}
                        <h4 className="text-red text-center">Les materiels</h4>
                        {!props.toggle && loadMaterials && <Materials value={state_materials} noExemple edit/>}
                    </div>
                </div>
            </div>
        );
    };

    const getTableOfOptions = () => {
        return (
            <div>
                {!props.toggle &&
                <table className="table mt-2 mb-2">
                    {editOptions.length !== 0 ?
                        <tbody>
                        {editOptions.map((val, index) =>
                            <tr className="bg-secondary" key={index}>
                                {val["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear]["hidden"] ?
                                    <td><i className="icon icon-eye-slash s-24 text-red" data-tip="Cette Otpion est déactiver pour cette prestation sur cette journée" onClick={() => changeOptionHide(index, false)}/></td> :
                                    <td>
                                        {checkIfHidden(val["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear].service_id_who_is_active, editPrestation["id"]) ?
                                            <i className="icon icon-eye s-24 text-red" data-tip="Cette Otpion est activer pour cette prestation sur cette journée" onClick={() => changeOptionHide(index, true)}/>:
                                            <i className="icon icon-eye-slash s-24 text-red" data-tip="Cette Otpion est déactiver pour cette prestation sur cette journée" onClick={() => changeOptionHide(index, false)}/>}
                                    </td>}
                                <td><small className="bolder">{val["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear].name}</small></td>
                                <td><small className="bolder">{val["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear].tag}</small></td>
                                <td><small className="bolder">{val["special_date"][selectedMonth + "/" + selectedDay + "/" + selectedYear].price}$</small></td>
                            </tr>)}
                        </tbody> : <div className="text-center"><small className="bolder">Vous n'avez pas d'options</small></div>}
                </table>}
            </div>
        )
    };

    RightBlock.changeIndexPrestation = async (index) => {
        await fillProps(index, true);
    };

    useEffect(() => {

        if (!props.toggle)
            setTimeout(() => {checkIfUpdate()});
        else {
            function getDayInMonth (year, month) {
                const isLeap = ((year % 4) === 0 && ((year % 100) !== 0 || (year % 400) === 0));
                return [31, (isLeap ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month]
            }
            let months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Decembre'], tmp = {};
            for (let index in  months) tmp[months[index]] = getDayInMonth(selectedYear, index);
            setArrMonth(tmp);
        }

        return () => {
            isMounted.current = true
        };
    }, [price, moving_price, editPrestation, editOptions, materials, selectedYear, selectedDay, selectedMonth]);

    return (
        <div className="flip-container-right">
            <ReactTooltip/>
            <div className={`flipper ${props.toggle ? "" : "toggle"}`}>
                <div className="front front-right">
                    <div className="container-date-picker">
                        <button className="btn btn-outline-danger" data-tip="le mois precedent" onClick={prevMonth}><i className="text-red icon-long-arrow-left"/></button>
                        <select className="select-month" onChange={updateMonth}>
                            {props.toggle && monthOptions}
                        </select>
                        <input type="text" className="input-year" data-tip="changer manuelement l'année" onChange={updateYear} value={selectedYear} maxlength="4"/>
                        <button className="btn btn-outline-danger" data-tip="le mois suivant" onClick={nextMonth}><i className="text-red icon-long-arrow-right"/></button>
                    </div>
                    <div className="container-day">
                        {props.toggle && props.arrDays.map(day => (<div className="weekday text-red">{day.substring(0, 3)}</div>))}
                        {props.toggle && getDayBlocks()}
                    </div>
                    <div className='my-legend pt-1 text-center'>
                        <div className="legend-title text-black">Legend&nbsp;<i className="icon icon-info-circle" data-tip="Ceci pourraît vous aidez pour comprendre le calendrier"/></div>
                        <div className="legend-scale text-black pt-3">
                            <ul className="row justify-content-center legend-labels border1">
                                <li><span className="bolder" style={{background: '#74A9CF'}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Reserver&nbsp;<i className="icon-info" data-tip="L'artiste est indisponible car il va realiser une prestation"/></span></li>
                                <li><span className="bolder" style={{background: '#00c853'}}>Disponible&nbsp;<i className="icon icon-info" data-tip="L'artiste est libre de pour un evenement"/></span></li>
                                <li><span className="bolder" style={{background: '#ef6c00'}}>Indifférent&nbsp;<i className="icon icon-info" data-tip="L'artiste est en vue de faire une prestation mais peut recevoir une reservation"/></span></li>
                                <li><span className="bolder" style={{background: '#ED1C24'}}>Indisponible&nbsp;<i className="icon icon-info" data-tip="L'artiste est ne travail tout simplement pendant cette journée"/></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="back back-right overflow-auto scrollbar-isl">
                    {getEvents()}
                </div>
            </div>
        </div>
    );
}

export default RightBlock;
