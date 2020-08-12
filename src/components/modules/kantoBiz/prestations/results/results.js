import {FormControl, Input, InputLabel, MenuItem, Modal, Select} from '@material-ui/core';
import {ThemeProvider, useTheme} from "@material-ui/core/styles";
import React, {useEffect, useRef, useState} from "react";
import InputRange from "react-input-range";
import {useDispatch, useSelector} from "react-redux";
// import Select from "react-select";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import "../../../../../assets/css/style/KantoBiz.css"
import "../../../../../assets/css/style/Results.css"
import {addFilterEventSelected, addSearchLoading,} from "../../../../functionTools/functionProps";
import {LoadingSearch} from "../../../../functionTools/popupFields";
import {generatePagination} from "../../../../functionTools/tools";
import {defaultResultTheme} from "../../../../functionTools/utilStyles";
import Pagination from "../../../../pagination/pagination";


export const ITEM_HEIGHT = 38;

export const ITEM_PADDING_TOP = 4;

export const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function Results(props) {

    const theme = useTheme();
    const dispatch = useDispatch();
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const loading = useSelector(state => state.KantobizSearch.loading);
    const results = useSelector(state => state.KantobizSearch.results);
    const filter_price = useSelector(state => state.KantobizSearch.filter_price);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    // const initialized = useSelector(state => state.KantobizSearchInfo.initialized);
    const filter_events_selected = useSelector(state => state.KantobizSearch.filter_events_selected);

    const isMounted = useRef(false);
    const searchRef = useRef(null);
    const [events_type, setEventsType] = useState([]);
    const [price, setPrice] = useState({min: 0, max: 0});
    const [priceActive, setPriceActive] = useState(false);
    const [starts, setStarts] = useState({min: 0, max: 0});
    const [startsActive, setStartsActive] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);
    const [filterOpened, setFilterOpened] = useState(false);
    const [thisComponentResults, setThisComponentResults] = useState([]);
    const [thisComponentFilter, setThisComponentFilter] = useState([]);
    const [state_events, setEvents] = useState([])

    const updateEvents = obj => {
        let tmp = obj.target.value
        setEvents(tmp);
        dispatch(addFilterEventSelected(tmp));

    }

    Results.onScrollViewSearch = () => {
        searchRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const onChangePage = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems);
    };

    const filterPrice = (value, arr) => {
        if (price["min"] <= value["price"] && value["price"] <= price["max"])
            arr.push(value)
    };

    const groupBy = (array, key) => {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    };

    const filter = async () => {
        await dispatch(addSearchLoading(true));
        let tmp = [];
        await Promise.all(results.map(value => {
            if (filter_events_selected.length !== 0) {
                filter_events_selected.map(val => {
                    if (value.events.includes(val)) {
                        if (priceActive) filterPrice(value, tmp);
                        else tmp.push(value)
                    }
                    return true
                })
            } else if (priceActive) filterPrice(value, tmp);
            return true
        })).then(async r => {
            if (tmp.length !== 0) {
                let groupId = groupBy(tmp, 'id');
                let _ = require("underscore");

                if (_.size(groupId) === 1) {
                    await setThisComponentFilter(generatePagination(tmp, props.displayOne));
                    await dispatch(addSearchLoading(false));
                } else {
                    let tmp2 = [];
                    for (let i = 1; i <= _.size(groupId); i++) {
                        for (let j = 0; j < 1; j++) {
                            if (j === 0) tmp2.push(groupId[i][j]);
                        }
                    }
                    await setThisComponentFilter(generatePagination(tmp2, props.displayOne));
                    await dispatch(addSearchLoading(false));
                }


            } else {
                dispatch(addSearchLoading(false));
                toast.warn("Pas de resultat")
            }
            await setFilterOpened(false);
        });
    };

    const reset = async () => {
        await dispatch(addSearchLoading(true));
        setPrice({min: 0, max: 0});
        setEvents([]);
        setPriceActive(false);
        setStartsActive(false);
        setThisComponentFilter([]);
        dispatch(addFilterEventSelected([]));
        await setThisComponentResults(props.stateResults);
        await dispatch(addSearchLoading(false));
    };

    useEffect(() => {

        if (props.stateResults.length !== 0)
            setThisComponentResults(props.stateResults);
        else setThisComponentResults(generatePagination(results, props.displayOne));
        // dispatch(changeInitialized(true));

        let tmp = [];
        Promise.all(events_allowed.map((value, row) => {
            tmp.push({value: value, label: value, index: row});
            return true
        })).then(r => setEventsType(tmp));

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [loading, results, filter_price]);


    return (
        <div className="row row-eq-height p-b-100">
            <ReactTooltip/>
            <div className="col-lg-12 pt-2">
                <fieldset className="border col-lg-6 border-danger p-5 m-auto">
                    <legend className="text-red text-center">Filtrer les resultats</legend>
                    <div className="row-cols-6 justify-content-center">
                        <div className="text-center m-auto">
                            <ThemeProvider theme={defaultResultTheme}>
                                <FormControl style={{width: 200}} >
                                    <InputLabel className={lightModeOn ? "text-dark" : "text-white"} id="demo-multiple-chip-label">Évènement</InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        multiple
                                        value={state_events}
                                        onChange={obj => updateEvents(obj)}
                                        input={<Input/>}
                                        MenuProps={MenuProps}
                                    >
                                        {events_type.map((data) => (
                                            <MenuItem
                                                key={data.index}
                                                value={data.value}
                                                style={getStyles(data, events_type, theme)}>
                                                {data.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </ThemeProvider>
                        </div>
                        <div className="text-center text-red">
                            <label className="pb-3 pt-4">Par prix de la prestation</label>
                            {priceActive ?
                                <InputRange draggableTrack
                                            maxValue={filter_price["max"]}
                                            minValue={filter_price["min"]}
                                            formatLabel={value => `${value} $`}
                                            onChange={value => setPrice(value)}
                                            step={10}
                                            onChangeComplete={value => setPrice(value)}
                                            value={price}/>
                                            : <i className="icon icon-plus ml-2 text-red s-18"
                                                 onClick={() => filter_price["min"] && setPriceActive(true)}
                                                 data-tip={filter_price["min"]
                                                     ? "filtrer par prix ?"
                                                     : "Il faut trouver 2 prestations au moins"}/>}
                        </div>

                        {/*<div className="text-center text-red ml-5 mr-5">*/}
                        {/*    <label className="pb-3 pt-4">Notation (nombre d'étoile)</label>*/}
                        {/*    {startsActive ?*/}
                        {/*        <InputRange draggableTrack maxValue={5}*/}
                        {/*                    minValue={0} formatLabel={value => `${value}✰`}*/}
                        {/*                    onChange={value => setStarts(value)} step={10}*/}
                        {/*                    onChangeComplete={value => setStarts(value)}*/}
                        {/*                    value={starts}/> : <i className="icon icon-plus ml-2 text-red s-18"*/}
                        {/*                                          data-tip="Ce filtrage va bientôt arriver"/>}*/}
                        {/*</div>*/}

                        <div className={"text-center " + (priceActive && "mt-4")}>
                            <button className="btn btn-outline-danger m-1" onClick={() => reset()}
                                    data-tip="Remettre tout a zéro">Retablir tout&nbsp;
                                <i className="icon icon-remove"/></button>
                            <button className="btn btn-outline-danger m-1" onClick={() => filter()}
                                    data-tip="Appliquer les filtres">Appliquer&nbsp;<i
                                className="icon icon-search-1"/></button>
                        </div>
                    </div>
                </fieldset>

                <h4 className="text-red text-center m-5"  ref={searchRef}>
                    Résultat(s) de votre recente recherche
                </h4>

                {!loading ?
                    <div className="row justify-content-center">
                        {thisComponentResults.length !== 0 && pageOfItems.map(item => <div
                            key={item.id}>{item.name}</div>)}
                    </div> : <LoadingSearch/>
                }

                {!loading &&
                <div className="text-center pt-4">
                    {thisComponentResults.length !== 0 ?
                        (thisComponentFilter.length !== 0 ?
                            <Pagination items={thisComponentFilter} onChangePage={onChangePage} initialPage={1}/> :
                            <Pagination items={thisComponentResults} onChangePage={onChangePage} initialPage={1}/>) :
                        <h3 className="text-red  m-5">Aucune prestation trouvée</h3>}
                </div>
                }
            </div>
        </div>
    );
}

export default Results;
