import React, { useEffect, useRef, useState } from "react";
import '../style/Calendar.css'
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import LeftBlock from "./LeftBlock";
import RightBlock from "./RightBlock";

const arrDays = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ];

function Calendar (props) {

    const prestations = useSelector(state => state.profilePrestations.prestations);

    const now = new Date();
    const isMounted = useRef(false);
    const [date, setDate] = useState(now);
    const [toggle, setToggle] = useState(true); // to change false after development
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
                {!props.noEdit && <LeftBlock arrDays={arrDays} date={date} handleToUpdate={handleToUpdate} prestations={prestations}/>}
                <RightBlock arrDays={arrDays} date={date} toggle={toggle} handleToUpdateDate={handleToUpdateDate} prestations={prestations} noEdit={props.noEdit && props.noEdit}/>
            </div>
        </div>
    );
}

export default Calendar;
