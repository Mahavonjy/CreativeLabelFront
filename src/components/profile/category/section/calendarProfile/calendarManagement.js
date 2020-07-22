import React, {useEffect, useRef} from "react";
import ReactTooltip from "react-tooltip";
import Calendar from "../../../../kantoBiz/calendar/calendar";
import AvailabilityPeriod from "./availabilityPeriod";

function CalendarManagement(props) {

    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

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
            <AvailabilityPeriod parentProps={props}/>
            <Calendar headers={props.headers}/>
        </div>
    );
}

export default CalendarManagement;
