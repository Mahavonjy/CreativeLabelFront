import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import "../../assets/css/style/KantoBiz.css";
import {CreativeHeaders} from "../functionTools/createFields";
import {activeEventAndThematicsPage, activeResultPage, addServiceToShow} from "../functionTools/functionProps";
import {EventAndThematics as EventAndThematics_} from "./eventsAndThematics";
import Results from "./prestations/results/results";

function KantoBiz(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.session.authenticated);
    const results = useSelector(state => state.KantobizSearch.results);
    const ResultsPage = useSelector(state => state.KantobizSearch.ResultsPage);
    const loading = useSelector(state => state.KantobizSearch.loading);
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const user_connected_prestations = useSelector(state => state.profilePrestations.prestations);
    const EventAndThematics = useSelector(state => state.KantobizSearch.EventAndThematics);

    const isMounted = useRef(false);
    const [eventAndThematics, setEventAndThematics] = useState(EventAndThematics);
    const [resultsPage, setResultsPage] = useState(ResultsPage);
    const [stateResults, setStateResult] = useState([]);
    const [show, setShow] = useState(false);
    const [eventType, setEventTypes] = useState([]);
    const [event, setEvent] = useState("");
    const [thematics, setThematics] = useState("");

    const displayOne = async (val) => {
        let tmp = false;
        await Promise.all(user_connected_prestations.map(element => {
            if (element["id"] === val["id"]) tmp = true
            return true
        })).then(async () => {
            if (tmp) {
                toast.warn("Vous ne pouvez pas acheter votre propre prestaion")
            } else {
                await dispatch(addServiceToShow(val));
                history.push("/show-service")
            }
        });

    };

    const next = () => {
        if (eventAndThematics) {
            setResultsPage(true);
            setEventAndThematics(false);
            dispatch(activeResultPage())
        }
    };

    const prev = () => {
        if (resultsPage) {
            setResultsPage(false);
            setEventAndThematics(true);
            dispatch(activeEventAndThematicsPage())
        }
    };

    useEffect(() => {

        if (results.length > 0)
            if (!resultsPage) next();

        let tmp = [];
        Promise.all(events_allowed.map((value, row) => {
            tmp.push({value: value, label: value, index: row})
            return true
        })).then(r => setEventTypes(tmp));

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [loading, results]);

    return (
        <div>
            <ReactTooltip/>
            {/* Headers */}
            {CreativeHeaders(
                "Creative kantoBiz",
                "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)",
                props.headers,
                setStateResult,
                next,
                displayOne,
                auth,
                history)}
            {/* End Headers */}

            {/* This is a main of for show different component */}
            <div className="Base mt-5">
                {/* Navigation Page*/}

                <div className="NextOrPrevPage">
                    <div>
                        {resultsPage &&
                            <button
                                className="float-left btn-custom btn-outline-light border-bottom-0 border-right-0"
                                onClick={prev}>
                                <i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent
                            </button>}
                        {eventAndThematics &&
                        <button
                            className="float-right btn-custom btn-outline-light border-bottom-0 border-left-0"
                            onClick={next}>Suivant&nbsp;
                            <i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/>
                        </button>}

                    </div>
                </div>
                {/* End Navigation Page*/}
                <div className="main-page">
                    <div>
                        {/* Show Different events/thematics or all Prestation result of search or Prestation selected*/}
                        {(eventAndThematics
                        && EventAndThematics_(
                            props.headers,
                            dispatch,
                            setStateResult,
                            displayOne,
                            setShow,
                            show,
                            eventType,
                            setEvent,
                            event,
                            thematics,
                            setThematics) )
                        ||
                        (resultsPage
                        && <Results next={next}
                                    displayOne={displayOne}
                                    setStateResult={setStateResult}
                                    stateResults={stateResults}/>)}
                        {/* End */}
                    </div>
                </div>
            </div>
            {/* End */}
        </div>
    );

}

export default KantoBiz;
