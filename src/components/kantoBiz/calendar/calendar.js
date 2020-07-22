import React, { useEffect, useRef, useState, memo } from "react";
import '../../../assets/css/style/Calendar.css'
import ReactTooltip from "react-tooltip";
import { useSelector } from "react-redux";
import LeftBlock from "./leftBlock";
import RightBlock from "./rightBlock";

const arrDays = [ "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi" ];

function Calendar (props) {

    const prestations = useSelector(state => state.profilePrestations.prestations);

    const now = new Date();
    const isMounted = useRef(false);
    const [date] = useState(now);
    const [toggle, setToggle] = useState(true);
    // const [selectedDate, setSelectedDate] = useState(now.getDate() + "/" + now.getMonth() + 1 + "/" + now.getFullYear());

    const handleToUpdate = (isToggle) => {
        setToggle(isToggle);
    };

    // const handleToUpdateDate = (date) => {
    //     setSelectedDate(date);
    // };


    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [toggle, prestations]);

    return (
        <div className="outer zIndex99">
            <ReactTooltip/>
            <div className="wrapper justify-content-center">
                {!props.noEdit &&

                <LeftBlock headers={props.headers}
                           arrDays={arrDays}
                           date={date}
                           handleToUpdate={handleToUpdate}
                           prestations={prestations}/>}

                <RightBlock arrDays={arrDays}
                            date={date}
                            toggle={toggle}
                            // handleToUpdateDate={handleToUpdateDate}
                            prestations={prestations}
                            noEdit={props.noEdit}/>
            </div>
        </div>
    );
}

export default memo(Calendar);
