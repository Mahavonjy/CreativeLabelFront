import React, {useEffect, useRef, useState} from "react";
import InputRange from "react-input-range";
import {useDispatch, useSelector} from "react-redux";
import Select from "react-select";
import ReactTooltip from 'react-tooltip';
import "../../../../assets/css/style/KantoBiz.css"
import "../../../../assets/css/style/Results.css"
import {addFilterEventSelected} from "../../../FunctionTools/FunctionProps";
import {LoadingSearch} from "../../../FunctionTools/PopupFields";
import Pagination from "../../../Pagination/Pagination";

function Results(props) {

    const dispatch = useDispatch();
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const loading = useSelector(state => state.KantobizSearch.loading);
    const filter_events_selected = useSelector(state => state.KantobizSearch.filter_events_selected);

    const isMounted = useRef(false);
    const [events_type, setEventsType] = useState([]);
    const [price, setPrice] = useState({min: 0, max: 0});
    const [priceActive, setPriceActive] = useState(false);
    const [starts, setStarts] = useState({min: 0, max: 0});
    const [startsActive, setStartsActive] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);

    const onChangePage = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems);
    };

    const checkValueIfExistInArray = (val, array_) => {
        for (let row in array_) if (array_[row]["id"] === val["id"]) return true;
        return false
    };

    const filter = async () => {
        // await setItemResults([]);
        // let tmp = [];
        // if (priceActive) {
        //     for (let index in props.stateResults)
        //         if (price["min"] <= props.stateResults[index]["price"] && props.stateResults[index]["price"] <= price["max"])
        //             await tmp.push(props.stateResults[index])
        // }
        // dispatch(addKantoBizSearchResults(tmp));
    };

    const reset = () => {
        setPriceActive(false);
        setStartsActive(false);
        dispatch(addFilterEventSelected([]));
    };

    useEffect(() => {

        let tmp = [];
        for (let row in events_allowed) {
            let value = events_allowed[row];
            tmp.push({value: value, label: value, index: row})
        }
        setEventsType(tmp);

        return () => {
            isMounted.current = true
        };
    }, [loading, props.stateResults]);

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
                                    onChange={value => setPrice(value)}
                                    onChangeComplete={value => setPrice(value)}
                                    value={price}/>: <i className="icon icon-plus ml-2 text-red s-18"
                                                        onClick={() => setPriceActive(true)}
                                                        data-tip="filtrer pas prix ?"/>}
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Notation (nombre d'étoile)</label>
                    {startsActive ?
                    <InputRange draggableTrack maxValue={5} minValue={0} formatLabel={value => `${value}✰`}
                                onChange={value => setStarts(value)}
                                onChangeComplete={value => setStarts(value)}
                                value={starts}/>: <i className="icon icon-plus ml-2 text-red s-18"
                                                     data-tip="Nouvelle filtrage qui va arriver bientôt"/>}
                </div>
                <div className="text-center ml-5 mr-5 mt-3">
                    <button className="btn btn-outline-danger m-1" onClick={() => reset()}
                            data-tip="Appliquer les filtres">Retablir tout&nbsp;
                        <i className="icon icon-remove"/></button>
                    <button className="btn btn-outline-danger m-1" onClick={() => filter()}
                            data-tip="Remettre tout a zéro">Appliquer&nbsp;<i
                        className="icon icon-search-1"/></button>
                </div>
            </div>
            <div className="col-lg-9 pt-2">
                <h4 className="text-red text-center">Résultat(s) de votre recherche</h4>

                <div className="row justify-content-center">
                    {pageOfItems.map(item => <div key={item.id}>{item.name}</div>)}
                </div>

                {!loading ?
                <div className="text-center">
                    {props.stateResults.length !== 0 ? <Pagination items={props.stateResults} onChangePage={onChangePage} initialPage={1}/> :
                        <h3><p className="text-red center-center m-5">0 recherche</p></h3>}
                </div>: <LoadingSearch/>}
            </div>
        </div>
    );
}

export default Results;
