import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ReactTooltip from 'react-tooltip';
import "../../assets/css/style/KantoBiz.css";
import {CreativeHeaders} from "../FunctionTools/CreateFields";
import {activeDisplayServicePage, activeEventAndThematicsPage, activeResultPage} from "../FunctionTools/FunctionProps";
import {EventAndThematics as EventAndThematics_} from "./EventsAndThematics";
import DisplayPrestation from "./Prestations/Results/DisplayPrestation";
import Results from "./Prestations/Results/Results";

function KantoBiz(props) {

    const dispatch = useDispatch();
    const results = useSelector(state => state.KantobizSearch.results);
    const ResultsPage = useSelector(state => state.KantobizSearch.ResultsPage);
    const EventAndThematics = useSelector(state => state.KantobizSearch.EventAndThematics);
    const DisplayService = useSelector(state => state.KantobizSearch.DisplayService);

    const isMounted = useRef(false);
    const [eventAndThematics, setEventAndThematics] = useState(EventAndThematics);
    const [resultsPage, setResultsPage] = useState(ResultsPage);
    const [displayService, setDisplayService] = useState(DisplayService);

    const next = () => {
        if (eventAndThematics) {
            setResultsPage(true);
            setEventAndThematics(false);
            setDisplayService(false);
            dispatch(activeResultPage())
        } else if (resultsPage) {
            setResultsPage(false);
            setEventAndThematics(false);
            setDisplayService(true);
            dispatch(activeDisplayServicePage())
        }
    };

    const prev = () => {
        if (displayService) {
            setResultsPage(true);
            setEventAndThematics(false);
            setDisplayService(false);
            dispatch(activeResultPage())
        } else if (resultsPage) {
            setResultsPage(false);
            setEventAndThematics(true);
            setDisplayService(false);
            dispatch(activeEventAndThematicsPage())
        }
    };

    useEffect(() => {

        if (results.length > 0)
            if (!resultsPage) next();

        return () => {
            isMounted.current = true
        };
    }, [results]);

    return (
        <div>
            <ReactTooltip/>
            {/* Headers */}
            {CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)", props.headers)}
            {/* End Headers */}

            {/* This is a main of for show different component */}

            <div className="Base">
                {/* Navigation Page*/}
                <div className="NextOrPrevPage">
                    {!eventAndThematics ?
                        <button className="float-left btn-custom btn-outline-light border-bottom-0 border-right-0"
                                onClick={prev}>
                            <i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent
                        </button> : null}
                    {!displayService ?
                        <button className="float-right btn-custom btn-outline-light border-bottom-0 border-left-0"
                                onClick={next}>Suivant&nbsp;
                            <i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/>
                        </button> : null}
                </div>
                {/* End Navigation Page*/}

                <div className="main-page">
                    {/* Show Different events/thematics or all Prestation result of search or Prestation selected*/}
                    {(eventAndThematics && EventAndThematics_(props.headers, dispatch))
                    || (resultsPage && <Results next={next}/>)
                    || (displayService && <DisplayPrestation/>)}
                    {/* End */}
                </div>

            </div>
            {/* End */}
        </div>
    );

}

export default KantoBiz;
