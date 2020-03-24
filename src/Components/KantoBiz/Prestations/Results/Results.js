import React, {useEffect, useRef, useState} from "react";
import InputRange from "react-input-range";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import "../../../../assets/css/style/KantoBiz.css"
import "../../../../assets/css/style/Results.css"
import {addFilterEventSelected, addSearchLoading, changeInitialized} from "../../../FunctionTools/FunctionProps";
import {LoadingSearch} from "../../../FunctionTools/PopupFields";
import {checkValueIfExistInArray, generatePagination} from "../../../FunctionTools/Tools";
import Pagination from "../../../Pagination/Pagination";

function Results(props) {

    const dispatch = useDispatch();
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const loading = useSelector(state => state.KantobizSearch.loading);
    const results = useSelector(state => state.KantobizSearch.results);
    const initialized = useSelector(state => state.KantobizSearchInfo.initialized);
    const filter_events_selected = useSelector(state => state.KantobizSearch.filter_events_selected);

    const isMounted = useRef(false);
    const [events_type, setEventsType] = useState([]);
    const [price, setPrice] = useState({min: 0, max: 0});
    const [priceActive, setPriceActive] = useState(false);
    const [starts, setStarts] = useState({min: 0, max: 0});
    const [startsActive, setStartsActive] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);
    const [thisComponentResults, setThisComponentResults] = useState([]);

    const onChangePage = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems);
    };

    const filterPrice = (value, arr) => {
        if (price["min"] <= value["price"] && value["price"] <= price["max"])
            arr.push(value)
    };

    const filter = async () => {
        await dispatch(addSearchLoading(true));
        let tmp = [];
        await Promise.all(results.map(value => {
            if (filter_events_selected.length !== 0) {
                filter_events_selected.map(val => {
                    if (checkValueIfExistInArray(val, value.events)) {
                        if (priceActive) filterPrice(value, tmp);
                        else tmp.push(value)
                    }
                })
            } else if (priceActive) filterPrice(value, tmp);
        })).then(r => {
            if (tmp.length !== 0) {
                setThisComponentResults(generatePagination(tmp, props.displayOne));
                dispatch(addSearchLoading(false));
            } else {
                dispatch(addSearchLoading(false));
                toast.warn("Pas de resultat")
            }
        });
    };

    const reset = async () => {
        await dispatch(addSearchLoading(true));
        setPriceActive(false);
        setStartsActive(false);
        dispatch(addFilterEventSelected([]));
        await setThisComponentResults(props.stateResults);
        await dispatch(addSearchLoading(false));
    };

    useEffect(() => {

        if (!initialized) {
            if (props.stateResults.length !== 0)
                setThisComponentResults(props.stateResults);
            else setThisComponentResults(generatePagination(results, props.displayOne));
            dispatch(changeInitialized(true));
        }

        let tmp = [];
        Promise.all(events_allowed.map((value, row) => {
            tmp.push({value: value, label: value, index: row})
        })).then(r => setEventsType(tmp));

        return () => {
            isMounted.current = true
        };
    }, [loading, results, thisComponentResults]);

    return (
        <div className="row row-eq-height p-b-100">
            <ReactTooltip/>
            <div className="col-lg-3 pt-5">
                <h4 className="text-red text-center">Filtrer le résultat</h4>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Évènement</label>
                    <Select isMulti options={events_type} placeholder="Choisir le/les thematics" onChange={obj => {
                        let tmp = [];
                        for (let row in obj) tmp.push(obj[row]["value"]);
                        dispatch(addFilterEventSelected(tmp));
                    }}/>
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Prix de la prestation</label>
                    {priceActive ?
                        <InputRange draggableTrack maxValue={1000} minValue={0} formatLabel={value => `${value} $`}
                                    onChange={value => setPrice(value)} step={10}
                                    onChangeComplete={value => setPrice(value)}
                                    value={price}/> : <i className="icon icon-plus ml-2 text-red s-18"
                                                         onClick={() => setPriceActive(true)}
                                                         data-tip="filtrer pas prix ?"/>}
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className={priceActive && "pb-3 pt-4"}>Notation (nombre d'étoile)</label>
                    {startsActive ?
                        <InputRange draggableTrack maxValue={5} minValue={0} formatLabel={value => `${value}✰`}
                                    onChange={value => setStarts(value)}
                                    onChangeComplete={value => setStarts(value)}
                                    value={starts}/> : <i className="icon icon-plus ml-2 text-red s-18"
                                                          data-tip="Nouvelle filtrage qui va arriver bientôt"/>}
                </div>
                <div className="text-center ml-5 mr-5 mt-3">
                    <button className="btn btn-outline-danger m-1" onClick={() => reset()}
                            data-tip="Remettre tout a zéro">Retablir tout&nbsp;
                        <i className="icon icon-remove"/></button>
                    <button className="btn btn-outline-danger m-1" onClick={() => filter()}
                            data-tip="Appliquer les filtres">Appliquer&nbsp;<i
                        className="icon icon-search-1"/></button>
                </div>
            </div>
            <div className="col-lg-9 pt-2">
                <h4 className="text-red text-center">Résultat(s) de votre recherche</h4>

                {!loading ?
                    <div className="row justify-content-center">
                        {thisComponentResults.length !== 0 && pageOfItems.map(item => <div key={item.id}>{item.name}</div>)}
                    </div> : <LoadingSearch/>}

                {!loading &&
                <div className="text-center">
                    {thisComponentResults.length !== 0 ?
                        <Pagination items={thisComponentResults} onChangePage={onChangePage} initialPage={1}/> :
                        <h3><p className="text-red center-center m-5">0 recherche</p></h3>}
                </div>}
            </div>
        </div>
    );
}

export default Results;
