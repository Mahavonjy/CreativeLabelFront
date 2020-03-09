import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import ReactTooltip from 'react-tooltip';
import "../../assets/css/style/KantoBiz.css";
import {CreativeHeaders} from "../FunctionTools/CreateFields";
import {activeEventAndThematicsPage, activeResultPage, addServiceToShow} from "../FunctionTools/FunctionProps";
import {EventAndThematics as EventAndThematics_} from "./EventsAndThematics";
import DisplayPrestation from "./Prestations/Results/DisplayPrestation";
import Results from "./Prestations/Results/Results";

function KantoBiz(props) {

    const dispatch = useDispatch();
    const results = useSelector(state => state.KantobizSearch.results);
    const ResultsPage = useSelector(state => state.KantobizSearch.ResultsPage);
    const EventAndThematics = useSelector(state => state.KantobizSearch.EventAndThematics);
    // const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);

    const isMounted = useRef(false);
    const [eventAndThematics, setEventAndThematics] = useState(EventAndThematics);
    const [resultsPage, setResultsPage] = useState(ResultsPage);
    const [stateResults, setStateResult] = useState([]);
    const [showOne, setShowOne] = useState(false);

    const displayOne = async (val) => {
        await dispatch(addServiceToShow(val));
        await setShowOne(true);
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

        return () => {
            isMounted.current = true
        };
    }, [results]);

    return (
        <div>
            <ReactTooltip/>
            <Modal visible={showOne} width="100%" height="100%" effect="fadeInUp">
                <div className="bg-dark overflow-auto scrollbar-isl" style={{height: "100%"}}>
                    <button className="ModalClose" style={{position: "fixed", left: 0, top: 0}}
                            onClick={() => setShowOne(false)}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    {showOne && <DisplayPrestation/>}
                </div>
            </Modal>
            {/* Headers */}
            {CreativeHeaders("Creative KantoBiz", "Creation de prestation pour les professionnels de la musique (artistes,producteurs, labels...)", props.headers, setStateResult, next, displayOne)}
            {/* End Headers */}

            {/* This is a main of for show different component */}
            <div className="Base">
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
                        {eventAndThematics && EventAndThematics_(props.headers, dispatch, setStateResult, displayOne) ||
                        resultsPage && <Results next={next} setStateResult={setStateResult} stateResults={stateResults}/>}
                        {/* End */}
                    </div>
                </div>
            </div>
            }
            {/* End */}
        </div>
    );

}

export default KantoBiz;
