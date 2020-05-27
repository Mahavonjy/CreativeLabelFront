import frLocale from "date-fns/locale/fr";
import axios from "axios";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactTooltip from 'react-tooltip';
import {
    addFilterPricing,
    addKantoBizSearchResults,
    addSearchLoading,
    changeCityToSearch,
    changeCountryToSearch,
    changeDateToSearch,
    changeEventsToSearch,
    changeThematicsToSearch
} from "../functionTools/functionProps";
import {
    ChangeDate,
    formatDate,
    funcToSpecifyValueForSpecialInput,
    generatePagination,
    onChangeListWithValueLabel,
    shuffleArray,
} from "../functionTools/tools";
import { validatorSearch } from "../validators/validatiors"
import Results from "./prestations/results/results";
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from "@date-io/date-fns";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const localeMap = {
    fr: frLocale
};


const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing(3)

    },
    formControl: {
        margin: theme.spacing(2),
        minWidth: 140,
    },
    select: {
        color: 'white',
        textDecoration: 'black',
    },

    select2: {
        color: 'black',
        textDecoration: 'white',
    },
    root: {
        borderBottom: '2px solid white'
    },
    root2: {
        borderBottom: '2px solid black'
    },
    input: {
        color: 'white',

    },
    input2: {
        color: 'black',

    },
    icon: {
        color: 'white',
    },
    icon2: {
        color: 'black',
    }

}));

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
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


function SearchBar(props) {

    const theme = useTheme();
    const locale = "fr";
    const classes = useStyles();
    const dispatch = useDispatch();
    const country_allowed = useSelector(state => state.Others.country_allowed);
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const artist_types = useSelector(state => state.Others.artist_types);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const city_to_search = useSelector(state => state.KantobizSearchInfo.city_to_search);
    const country_to_search = useSelector(state => state.KantobizSearchInfo.country_to_search);
    const thematics_to_search = useSelector(state => state.KantobizSearchInfo.thematics_to_search);
    const events_to_search = useSelector(state => state.KantobizSearchInfo.events_to_search);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    const isMounted = useRef(false);
    const [city, setCity] = useState(city_to_search);
    const [listOfCity, setListOfCity] = useState([]);
    const [state_events, setEvents] = useState(events_to_search);
    const [listOfEvents, setListOfEvents] = useState([]);
    const [country, setCountry] = useState("");
    const [countryAllowed, setCountryAllowed] = useState([]);
    const [state_thematics, setThematics] = useState([]);
    const [startDate, setStartDate] = useState(date_to_search);

    const valueAll = () => {
        setCountry(country_to_search);
        setThematics(thematics_to_search)
    }



    const Search = async () => {
        let if_errors = validatorSearch(state_thematics, startDate, country);
        if (if_errors['error']) {
            toast.error(if_errors['message'])
        } else {
            await dispatch(addSearchLoading(true));
            // await dispatch(changeInitialized(false));
            await axios.post("api/service_search/moment", {
                "country": country,
                "city": city,
                "event_date": startDate.toISOString(),
                "event": state_events,
                "thematics": state_thematics,
            }, { headers: props.headers }).then(async (resp) => {
                let data = resp.data || [];
                if (data.length === 0) toast.warn("Pas de presations");
                else if (data.length >= 2) {
                    await dispatch(addFilterPricing({
                        "min": resp.data[0]["price"],
                        "max": resp.data[resp.data.length - 1]["price"]
                    }));
                    data = shuffleArray(data);
                }
                await props.setStateResult(generatePagination(data, props.displayOne));
                await dispatch(addKantoBizSearchResults(data));
                await dispatch(addSearchLoading(false));
                await Results.onScrollViewSearch();
            })
        }
    };

    const changelistOfCity = async (value) => {
        let tmp = [];
        await Promise.all(country_allowed[country_allowed.findIndex(
            tmp => tmp.name === value)]["value"].map(element => {
                tmp.push({ value: element, label: element });
                return true
            })
        ).then(() => setListOfCity(tmp));
    };

    const resetDataOfCity = () => {
        setCity("");
        dispatch(changeCityToSearch(""))
    };

    const updateCountry = (obj) => {
        if (obj)
            new Promise(resolve => {
                resolve(onChangeListWithValueLabel(setCountry, obj, dispatch, changeCountryToSearch));
                resolve(changelistOfCity(obj.target.value).then(r => {
                    setCity("");
                    dispatch(changeCityToSearch(""))
                }));
            }).then(r => null);
        else resetDataOfCity()
    };

    const updateEvents = (obj) => {
        if (obj)
            onChangeListWithValueLabel(setEvents, obj, dispatch, changeEventsToSearch);
        else {
            setEvents("");
            dispatch(changeEventsToSearch(""))
        }
    };

    const updateCity = (obj) => {
        if (obj)
            onChangeListWithValueLabel(setCity, obj, dispatch, changeCityToSearch);
        else resetDataOfCity()
    };

    const updateDate = (daty) => {
        if (daty) {
            ChangeDate(daty, setStartDate, dispatch, changeDateToSearch)
            setStartDate(daty)
        } else {
            setStartDate("");
            dispatch(changeDateToSearch(""));
        }

    }

    const updateThematics = (obj) => {
        let tmp = obj.target.value
        setThematics(tmp)
        dispatch(changeThematicsToSearch(tmp));
    }


    useEffect(() => {

        valueAll()

        function _start() {
            let tmp = [];
            for (let row in events_allowed) {
                let value = events_allowed[row];
                tmp.push({ value: value, label: value, index: row })
            }
            setListOfEvents(tmp);
        }

        Promise.all([funcToSpecifyValueForSpecialInput(country_allowed, setCountryAllowed), _start()]).then();

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [city, country, listOfCity, service_to_show, startDate]);

    return (
        <div className={lightModeOn ? "Base shadow-lg search-bar theme-light relative p-b-40 mt-5 " : "Base search-bar theme-dark relative p-b-40 mt-5"}>
            {/* Input Search */}
            <ReactTooltip />
            <h3 className="text-center text-red mb-4 pt-4">
                Trouvez la meilleur prestation pour votre evenement
            </h3>
            <div className={lightModeOn ? "search-row row text-black justify-content-center ml-2 mr-2" : "search-row row text-white justify-content-center ml-2 mr-2"}>
                <FormControl className={classes.formControl} classes={lightModeOn ? { root: classes.root2 } : { root: classes.root }} >
                    <InputLabel id="demo-dialog-select-label" className={lightModeOn ? classes.select2 : classes.select} >Pays</InputLabel>
                    <NativeSelect
                        style={{ borderButtomColor: 'red' }}
                        value={countryAllowed.value}
                        placeholder="Choisir un pays"
                        onChange={obj => updateCountry(obj)}
                        className={lightModeOn ? classes.select2 : classes.select}
                        classes={lightModeOn ? { icon: classes.icon2 } : { icon: classes.icon }}
                        inputProps={{
                            name: 'pays',
                            id: 'age-native-helper',
                            borderColor: 'rbg(0,0,255)'
                        }}
                    >
                        <option value=""></option>
                        {
                            countryAllowed.map((data) => ([
                                <option key={data.value} value={data.value} style={{ color: 'black' }}>{data.label}</option>
                            ]))
                        }

                    </NativeSelect>
                </FormControl>
                <FormControl className={classes.formControl} classes={lightModeOn ? { root: classes.root2 } : { root: classes.root }} >
                    <InputLabel id="demo-dialog-select-label" className={lightModeOn ? classes.select2 : classes.select}>Villes</InputLabel>
                    <NativeSelect
                        value={listOfCity.value}
                        onChange={obj => updateCity(obj)}
                        inputProps={{
                            name: 'city',
                            id: 'age-native-helper'
                        }}
                        className={lightModeOn ? classes.select2 : classes.select}
                        classes={lightModeOn ? { icon: classes.icon2 } : { icon: classes.icon }}
                    >
                        <option value=""></option>
                        {
                            listOfCity.map((data) => ([
                                <option key={data.value} value={data.value} style={{ color: 'black' }}>{data.label}</option>
                            ]))
                        }

                    </NativeSelect>
                </FormControl>
                <FormControl className={classes.formControl} classes={lightModeOn ? { root: classes.root2 } : { root: classes.root }} >
                    <InputLabel id="demo-multiple-chip-label" className={lightModeOn ? classes.select2 : classes.select}>Thematics</InputLabel>
                    <Select
                        labelId="demo-mutiple-name-label"
                        id="demo-mutiple-name"
                        multiple
                        value={state_thematics}
                        onChange={obj => updateThematics(obj)}
                        input={<Input />}
                        MenuProps={MenuProps}
                        className={lightModeOn ? classes.select2 : classes.select}
                        classes={lightModeOn ? { icon: classes.icon2 } : { icon: classes.icon }}
                    >
                        {artist_types.map((data) => (
                            <MenuItem key={data.value} value={data.value} style={getStyles(data, artist_types, theme)}>
                                {data.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl className={classes.formControl} classes={lightModeOn ? { root: classes.root2 } : { root: classes.root }} >
                    <InputLabel id="demo-dialog-select-label" className={lightModeOn ? classes.select2 : classes.select}>Evenements</InputLabel>
                    <NativeSelect
                        value={listOfEvents.value}
                        placeholder="Choisir un pays"
                        onChange={obj => updateEvents(obj)}
                        className={lightModeOn ? classes.select2 : classes.select}
                        classes={lightModeOn ? { icon: classes.icon2 } : { icon: classes.icon }}
                        inputProps={{
                            name: 'events',
                            id: 'age-native-helper',
                        }}
                    >
                        <option value=""></option>
                        {
                            listOfEvents.map((data) => ([
                                <option key={data.value} value={data.value} style={{ color: 'black' }}>{data.label}</option>
                            ]))
                        }

                    </NativeSelect>
                </FormControl>
                <FormControl className={classes.formControl} classes={lightModeOn ? { root: classes.root2 } : { root: classes.root }} >
                    <MuiPickersUtilsProvider utils={DateFnsUtils} local={localeMap[locale]} >
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                id="date-picker-dialog"
                                label="Date"
                                style={{ textDecorationColor: 'white' }}
                                format="dd/MM/yyyy"
                                value={startDate}
                                onChange={daty => updateDate(daty)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                    'color': 'white'
                                }}
                                inputProps={lightModeOn ? { className: classes.input2 } : { className: classes.input }}
                                InputLabelProps={lightModeOn ? { className: classes.input2 } : { className: classes.input }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </FormControl>
                <div className="col-lg-10 mt-4">
                    <button type="submit"
                        onClick={Search}
                        className="btn btn-outline-primary btn-lg p-3 m-2 col">Recherche&nbsp;
                        <i className="icon-search-1 text-white" />
                    </button>
                </div>
            </div>
            {/* End Search */}
        </div>
    );
}

export default SearchBar;
