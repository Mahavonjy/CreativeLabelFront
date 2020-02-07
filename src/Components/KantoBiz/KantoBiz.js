import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreativeHeaders } from "../FunctionTools/CreateFields";
import { EventAndThematics as EventAndThematics_ } from "./EventsAndThematics";
import Results from "./Prestations/Results/Results";
import "./style/KantoBiz.css";
import DisplayPrestation from "./Prestations/Results/DisplayPrestation";
import ReactTooltip from 'react-tooltip';
import { activeDisplayServicePage, activeEventAndThematicsPage, activeResultPage } from "../FunctionTools/FunctionProps";

function KantoBiz(props) {

    const dispatch = useDispatch();
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

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div>
            <ReactTooltip/>
            {/* Headers */}
            {CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)")}
            {/* End Headers */}

            {/* This is a main of for show different component */}

            <div className="Base">
                {/* Navigation Page*/}
                <div className="NextOrPrevPage">
                    {!eventAndThematics ?
                        <span className="float-left" data-tip="Revenir a la page d'acceuil KantoBiz" onClick={prev}>
                                <i className="icon icon-long-arrow-left ml-5 s-24 align-middle"/>&nbsp;Precedent
                            </span> : null}
                    {!displayService ?
                        <span className="float-right" data-tip="Aller dernier resultat de recherche" onClick={next}>Suivant&nbsp;
                            <i className="icon icon-long-arrow-right mr-5 s-24 align-middle"/>
                            </span> : null}
                </div>
                {/* End Navigation Page*/}

                <div className="main-page">
                    {/* Show Different events/thematics or all Prestation result of search or Prestation selected*/}
                    {(eventAndThematics && EventAndThematics_()) || (resultsPage && <Results/>) || (displayService && <DisplayPrestation/>)}
                    {/* End */}
                </div>

            </div>
            {/* End */}
        </div>
    );

}

export default KantoBiz;