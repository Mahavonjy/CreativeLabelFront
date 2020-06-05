import React, { useEffect, useRef, useState } from "react";
import InputRange from "react-input-range";
import { useDispatch, useSelector } from "react-redux";
// import Select from "react-select";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';
import "../../../../assets/css/style/KantoBiz.css"
import "../../../../assets/css/style/Results.css"
import { addFilterEventSelected, addSearchLoading, } from "../../../functionTools/functionProps";
// import {changeInitialized} from "../../../functionTools/functionProps";
import { LoadingSearch } from "../../../functionTools/popupFields";
import { checkValueIfExistInArray, generatePagination } from "../../../functionTools/tools";
import Pagination from "../../../pagination/pagination";
import { InputLabel, FormControl, MenuItem, Input, Modal, Select } from '@material-ui/core'
import red from "@material-ui/core/colors/red";
import { createMuiTheme, useTheme, ThemeProvider } from "@material-ui/core/styles";

const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiSelect:{
            select: {
                color: 'white',
                textDecoration: 'black',
            },
            root: {
                borderBottom:'2px solid red',
                '&.focus': {
                    borderBottom:'2px solid red'
                },
            },
            input: {
                color: 'white',
            },
            icon: {
                color: 'white',
            }
        },
        MuiInputLabel: {
            root: {
                color: "white"
            }
        }
    },
    palette: {
        primary: red
    }

});

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
    // const initialized = useSelector(state => state.KantobizSearchInfo.initialized);
    const filter_events_selected = useSelector(state => state.KantobizSearch.filter_events_selected);

    const isMounted = useRef(false);
    const searchRef = useRef(null);
    const [events_type, setEventsType] = useState([]);
    const [price, setPrice] = useState({ min: 0, max: 0 });
    const [priceActive, setPriceActive] = useState(false);
    const [starts, setStarts] = useState({ min: 0, max: 0 });
    const [startsActive, setStartsActive] = useState(false);
    const [pageOfItems, setPageOfItems] = useState([]);
    const [filterOpened, setFilterOpened] = useState(false);
    const [thisComponentResults, setThisComponentResults] = useState([]);
    const [state_events, setEvents] = useState([])

    const updateEvents = obj => {
        let tmp = obj.target.value
        setEvents(tmp);
        dispatch(addFilterEventSelected(tmp));

    }

    Results.onScrollViewSearch = () => {
        searchRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

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
                    return true
                })
            } else if (priceActive) filterPrice(value, tmp);
            return true
        })).then(r => {
            if (tmp.length !== 0) {
                setThisComponentResults(generatePagination(tmp, props.displayOne));
                dispatch(addSearchLoading(false));
            } else {
                dispatch(addSearchLoading(false));
                toast.warn("Pas de resultat")
            }
            setFilterOpened(false);
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

        if (props.stateResults.length !== 0)
            setThisComponentResults(props.stateResults);
        else setThisComponentResults(generatePagination(results, props.displayOne));
        // dispatch(changeInitialized(true));

        let tmp = [];
        Promise.all(events_allowed.map((value, row) => {
            tmp.push({ value: value, label: value, index: row });
            return true
        })).then(r => setEventsType(tmp));

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [loading, results, filter_price]);


    return (
        <div className="row row-eq-height p-b-100">
            <ReactTooltip />
            {filterOpened &&
                <Modal open={true} style={{ width: "400", height: "auto" }} disableScrollLock={true}>
                    <div className="form-material bg-dark" style={{ border: "2px solid red", borderRadius: "5px", marginTop: "150px", marginLeft: '150px', width: '500px' }}>
                        <button className="ModalClose float-left" onClick={() => { setFilterOpened(false) }}>
                            <i className="icon-close s-24" style={{ color: "orange", margin: "2px" }} />
                        </button>
                        <div className="col text-center pb-5 pt-5">
                            <div className="body">
                                <h4 className="text-red text-center">Filtrer le résultat</h4>
                                <div className="text-center ml-5 mr-5">
                                    {/* <label className="pb-3 pt-4">Évènement</label> */}
                                    {/* <Select isMulti
                                        options={events_type}
                                        placeholder="Choisir le/les thematics"
                                        onChange={obj => {
                                            let tmp = [];
                                            for (let row in obj) tmp.push(obj[row]["value"]);
                                            dispatch(addFilterEventSelected(tmp));
                                        }}/> */}
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <FormControl style={{margin:'10px',width:'240px'}}>
                                            <InputLabel id="demo-multiple-chip-label">Évènement</InputLabel>
                                            <Select
                                                labelId="demo-mutiple-name-label"
                                                id="demo-mutiple-name"
                                                multiple
                                                value={state_events}
                                                onChange={obj => updateEvents(obj)}
                                                input={<Input />}
                                                MenuProps={MenuProps}
                                            >
                                                {events_type.map((data) => (
                                                    <MenuItem key={data.index} value={data.value} style={getStyles(data, events_type, theme)}>
                                                        {data.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </ThemeProvider>
                                </div>
                                <div className="text-center text-red ml-5 mr-5">
                                    <label className="pb-3 pt-4">Prix de la prestation</label>
                                    {priceActive ?
                                        <InputRange draggableTrack maxValue={filter_price["min"]}
                                            minValue={filter_price["max"]} formatLabel={value => `${value} $`}
                                            onChange={value => setPrice(value)} step={10}
                                            onChangeComplete={value => setPrice(value)}
                                            value={price} /> : <i className="icon icon-plus ml-2 text-red s-18"
                                                onClick={() => setPriceActive(true)}
                                                data-tip="filtrer pas prix ?" />}
                                </div>
                                <div className="text-center text-red ml-5 mr-5">
                                    <label className={priceActive ? "pb-3 pt-4" : ''}>Notation (nombre d'étoile)</label>
                                    {startsActive ?
                                        <InputRange draggableTrack maxValue={5} minValue={0}
                                            formatLabel={value => `${value}✰`}
                                            onChange={value => setStarts(value)}
                                            onChangeComplete={value => setStarts(value)}
                                            value={starts} /> : <i className="icon icon-plus ml-2 text-red s-18"
                                                data-tip="Ce filtrage va bientôt arriver" />}
                                </div>
                                <div className="text-center ml-5 mr-5 mt-3">
                                    <button className="btn btn-outline-danger m-1" onClick={() => reset()}
                                        data-tip="Remettre tout a zéro">Retablir tout&nbsp;
                                    <i className="icon icon-remove" /></button>
                                    <button className="btn btn-outline-danger m-1" onClick={() => filter()}
                                        data-tip="Appliquer les filtres">Appliquer&nbsp;<i
                                            className="icon icon-search-1" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>}
            <div className="col-lg-12 pt-2">
                <button className="btn btn-outline-danger m-2 pl-5 pr-5"
                    data-tip="Filtres"
                    onClick={() => setFilterOpened(true)}
                ><i className="icon-th-list s-20" />&nbsp;<i className="icon-filter s-20" /> Filtrer les résultats
                </button>
                <h4 className="text-red text-center m-5">Résultat(s) de votre recente recherche</h4>

                {!loading ?
                    <div className="row justify-content-center">
                        {thisComponentResults.length !== 0 && pageOfItems.map(item => <div
                            key={item.id}>{item.name}</div>)}
                    </div> : <LoadingSearch />}

                {!loading &&
                    <div className="text-center pt-4" ref={searchRef}>
                        {thisComponentResults.length !== 0 ?
                            <Pagination items={thisComponentResults} onChangePage={onChangePage} initialPage={1} /> :
                            <h3><p className="text-red center-center m-5">0 recherche</p></h3>}
                    </div>}
            </div>
        </div>
    );
}

export default Results;
