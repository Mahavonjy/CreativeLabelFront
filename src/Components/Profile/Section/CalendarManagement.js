import React, { useEffect, useRef, useState } from "react";
import Calendar from "../../KantoBiz/Calendar/Calendar";
import DatePicker from "react-datepicker";
import { ChangeDate } from "../../FunctionTools/Tools";
import { addDayOfAvailability } from "../../FunctionTools/FunctionProps";
import { useDispatch, useSelector } from "react-redux";

function CalendarManagement() {

    const dispatch = useDispatch();
    const week_days_and_week_end = useSelector(state => state.profile.week_days_and_week_end);

    const isMounted = useRef(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [weekday, setWeekday] = useState(week_days_and_week_end);

    const changeDayOfAvailability = (day) => {
        let tmp = {...weekday};
        tmp[day] = !tmp[day];
        setWeekday(tmp);
        dispatch(addDayOfAvailability(tmp));
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div>
            <div className="d-md-flex align-items-center">
                <div className="ml-5 pl-5">
                    <h2 className="font-weight-lighter h3 my-3 text-primary">Gérer La disponibilités</h2>
                    <ul className="align-baseline list-inline">
                        <li className="list-inline-item"><i className="icon-folder text-primary mr-2" />Des préstations</li>
                        <li className="list-inline-item"><i className="icon-list-1 text-primary mr-2" />Des options</li>
                    </ul>
                </div>
            </div>
            <div className="list-group-item">
                <div className="row">
                    <div className="col text-center">
                        <h3 className="text-red pb-4">Votre jour de disponibilitê</h3>
                        <div className="countDown">
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Monday")}>
                                    {weekday["Monday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Lundi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Tuesday")}>
                                    {weekday["Tuesday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Mardi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Wednesday")}>
                                   {weekday["Wednesday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Mercredi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Thursday")}>
                                    {weekday["Thursday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Jeudi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Friday")}>
                                    {weekday["Friday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Vendredi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Saturday")}>
                                    {weekday["Saturday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Samedi</small>
                            </div>
                            <div className="bg-secondary">
                                <span onClick={() => changeDayOfAvailability("Sunday")}>
                                    {weekday["Sunday"] ? <i className="icon-success text-green"/>: <i className="icon-error text-red"/>}
                                </span>
                                <small className="count-type text-white">Dimanche</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group text-center col">
                        <h3 className="text-red pb-4">Choisissez une date</h3>
                        <div className="row justify-content-center">
                            <label className="col-md-2 input-group-addon bg-transparent pt-3">
                                <h4 className="text-red">Début<i className="icon ml-2 icon-info" data-tip="La date de début"/></h4>
                            </label>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={startDate} onChange={(e) => ChangeDate(e, setStartDate)}/>
                            <label className="col-md-2 input-group-addon bg-transparent pt-3">
                                <h4 className="text-red">Fin<i className="icon ml-2 icon-info" data-tip="La date de fin"/></h4>
                            </label>
                            <DatePicker className="form-control text-white pl-5 pr-5" selected={endDate} onChange={(e) => ChangeDate(e, setEndDate)}/>
                        </div>
                    </div>
                </div>
            </div>
           <Calendar/>
        </div>
    );
}

export default CalendarManagement;
