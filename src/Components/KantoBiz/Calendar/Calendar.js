import React, { useEffect, useRef, useState } from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import moment from "moment";
import '../style/Calendar.css'
import ReactTooltip from "react-tooltip";
import {useDispatch, useSelector} from "react-redux";
import {changeFields} from "../../FunctionTools/Tools";

const arrMonth = {
    January: 31,
    February: 28,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
};

const arrDays = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ];

function LeftBlock (props) {

    const dispatch = useDispatch();

    const isMounted = useRef(false);
    const [toggle, setToggle] = useState(false); // to change false after development
    const [allPrestation, setAllPrestation] = useState(props.other_user_prestations);
    const [clicked, setClicked] = useState({});

    LeftBlock.handleClick = async () => {
        props.handleToUpdate(!toggle);
        setToggle(!toggle);
    };

    const changeClicked = (index) => {
        if (!clicked[index]) {
            let tmp_clicked = {...clicked};
            for (let r in tmp_clicked) {
                if (tmp_clicked[r] === true)
                    tmp_clicked[r] = !tmp_clicked[r];
            }
            tmp_clicked[index] = true;
            setClicked(tmp_clicked);
        }
    };

    useEffect(() => {

        let i = 0;
        let tmp = {};
        while (i < allPrestation.length) {
            tmp[i] = i === 0;
            i++;
        }
        setClicked(tmp);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="flip-container-left">
            <div className={`flipper ${toggle ? "" : "toggle"}`}>
                <div className="front front-left">
                    <h2>{arrDays[props.date.getDay()]}</h2>
                    <h1>{props.date.getDate()}</h1>
                    <h2>Aujourd'hui</h2>
                </div>
                <div className="back back-left">
                    <span className="mb-1">
                        <i className="icon-long-arrow-left bg-transparent text-red s-24" data-tip="revenir au calendrier" onClick={LeftBlock.handleClick}/>
                    </span>
                    <div className="text-center mt-4" style={{width: "100%", height: "100px"}}>
                        <h4 className="text-red bolder mb-4">Prestation d'aujourd'hui</h4>
                        <table className="table">
                            <tbody>
                            {allPrestation.map((val, index) =>
                                <tr className={clicked[index] ? "bg-grey" : "bg-secondary"} key={index} onClick={() => changeClicked(index)}>
                                    <td><img src={val.photo[0]} width="20" height="20" alt="prestation-image"/></td>
                                    <td><small className="bolder">{val.title}</small></td>
                                    <td><small className="bolder">{val.price}$</small></td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RightBlock (props) {

    const isMounted = useRef(false);
    const [firstDay, setFirstDay] = useState(new Date(props.date.getFullYear() + "-" + (props.date.getMonth() + 1) + "-01").getDay());
    const [selectedYear, setSelectedYear] = useState(props.date.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(props.date.getMonth());
    const [selectedDay, setSelectedDay] = useState(props.date.getDate());
    const [price, setPrice] = useState( 300);
    const [moving_price, setMovingPrice] = useState( 300);
    let handleToUpdateDate = props.handleToUpdateDate;
    let monthOptions = Object.keys(arrMonth).map(month => (
        <option className="option-month" selected={month === Object.keys(arrMonth)[selectedMonth] ? "selected" : ""}>
            {month}
        </option>
    ));

    const updateMonth = (event) => {
        let newMonth = Object.keys(arrMonth).indexOf(event.target.value);
        handleToUpdateDate(selectedDay + "/" + newMonth + "/" + selectedYear);
        setSelectedMonth(newMonth);
        setFirstDay(new Date(selectedYear + "-" + (newMonth + 1) + "-01").getDay());
    };

    const prevMonth = () => {
        if (selectedMonth - 1 < 0) {
            handleToUpdateDate(selectedDay + "/" + 11 + "/" + selectedYear -1);
            setSelectedMonth(11);
            setSelectedYear(selectedYear - 1);
            setFirstDay(new Date(selectedYear - 1 + "-" + "12-01").getDay())
        } else {
            handleToUpdateDate(selectedDay + "/" + selectedMonth -1 + "/" + selectedYear);
            setSelectedMonth(selectedMonth - 1);
            setFirstDay(new Date(selectedYear - 1 + "-" + "12-01").getDay())
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

    const handleClick = (event) => {
        handleToUpdateDate(event.currentTarget.dataset.id + "/" + selectedMonth + "/" + selectedYear);
        setSelectedDay(parseInt(event.currentTarget.dataset.id));
    };

    const getDayBlocks = () => {
        let arrNo = [];
        for (let n = 0; n < firstDay; n++)
            arrNo.push(<div className="day-block" />);
        for (let i = 1; i < Object.values(arrMonth)[selectedMonth] + 1; i++)
            arrNo.push(
                <div data-id={i} onClick={handleClick} onDoubleClick={LeftBlock.handleClick} className={`day-block ${i === selectedDay ? "active" : ""}`}>
                    <div className="inner">{i}</div>
                </div>
            );
        return arrNo;
    };

    const getEvents = () => {
        return (
            <div>
                <i className="icon-eye float-right mr-5 s-36"/>
                <div className="row justify-content-center pt-5">
                    <div className="col-md-4">
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
                        <table className="table mt-2 mb-2">
                            <tbody>
                                <tr className="bg-secondary">
                                    <td><i className="icon icon-eye s-24 text-red" data-tip="Cette Otpion est activer pour cette prestation sur cette journée"/></td>
                                    <td><small className="bolder">nom</small></td>
                                    <td><small className="bolder">Tag</small></td>
                                    <td><small className="bolder">Prix</small></td>
                                </tr>
                            </tbody>
                        </table>
                        <h4 className="text-red text-center">Les materiels</h4>

                        <div className="tag-editor">
                            <span className="tag-editor-inner">
                                <div className="tag-editor-title text-center">
                                    <h1 className="text-light">Materiels a disposition&nbsp;<i className="icon icon-info s-18"/></h1>
                                </div>
                                <div className="tag-editor-tags">
                                    <div className="input-tag">
                                        <div className="input-tag__tags__input pb-3">
                                            <input className="input-add-tag" placeholder="Ajouter un materiel" type="text"/>
                                        </div>

                                    </div>
                                </div>
                            </span>
                        </div>

                    </div>
                </div>
            </div>
        );
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="flip-container-right">
            <div className={`flipper ${props.toggle ? "" : "toggle"}`}>
                <div className="front front-right">
                    <div className="container-date-picker">
                        <button className="btn btn-prev" onClick={prevMonth}>
                            &lt;
                        </button>
                        <select className="select-month" onChange={updateMonth}>
                            {props.toggle && monthOptions}
                        </select>
                        <input type="text" className="input-year" onChange={updateYear} value={selectedYear} maxlength="4"/>
                        <button className="btn btn-next" onClick={nextMonth}>
                            &gt;
                        </button>
                    </div>
                    <div className="container-day">
                        {props.toggle && arrDays.map(day => (<div className="weekday">{day.substring(0, 3)}</div>))}
                        {props.toggle && getDayBlocks()}
                    </div>
                </div>
                <div className="back back-right overflow-auto scrollbar-isl">
                    {getEvents()}
                </div>
            </div>
        </div>
    );
}

function Calendar (props) {

    const other_user_prestations = useSelector(state => state.profilePrestations.other_user_prestations);

    const now = new Date();
    const isMounted = useRef(false);
    const [date, setDate] = useState(now);
    const [toggle, setToggle] = useState(false); // to change false after development
    const [eventList, setEventList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear());

    const handleToUpdate = (isToggle) => {
        setToggle(isToggle);
    };

    const handleToUpdateDate = (date) => {
        setSelectedDate(date);
    };

    const tick = () => {
        setDate(new Date());
    };

    useEffect(() => {

        const timerID = setInterval(tick, 1000); // refresh each second

        return () => {
            clearInterval(timerID);
            isMounted.current = true
        };
    }, []);

    return (
        <div className="outer">
            <ReactTooltip/>
            <div className="wrapper justify-content-center">
                {!props.noEdit && <LeftBlock date={date} handleToUpdate={handleToUpdate} other_user_prestations={other_user_prestations}/>}
                <RightBlock date={date} toggle={toggle} handleToUpdateDate={handleToUpdateDate} other_user_prestations={other_user_prestations}/>
            </div>
        </div>
    );
}

export default Calendar;
