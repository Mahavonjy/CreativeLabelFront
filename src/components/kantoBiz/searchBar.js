import DateFnsUtils from "@date-io/date-fns";
import red from '@material-ui/core/colors/red'
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';
import {ThemeProvider, useTheme} from '@material-ui/core/styles';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import axios from "axios";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
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
    ChangeDate, checkMinMax,
    funcToSpecifyValueForSpecialInput,
    generatePagination,
    onChangeListWithValueLabel,
    shuffleArray,
} from "../functionTools/tools";
import {defaultMaterialTheme, defaultMaterialTheme1, MenuProps, useStyles} from "../functionTools/utilStyles";
import {validatorSearch} from "../validators/validatiors"
import Results from "./prestations/results/results";


class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "d MMM yyyy", {locale: this.locale});
    }
}

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
    };

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
            }, {headers: props.headers}).then(async (resp) => {
                let data = resp.data || [];
                if (data.length >= 2) {
                    await checkMinMax(dispatch, resp, data);
                }
                await props.setStateResult(generatePagination(data, props.displayOne));
                await console.log(generatePagination(data, props.displayOne));
                await dispatch(addKantoBizSearchResults(data));
                await dispatch(addSearchLoading(false));
                if (data.length === 0) {
                    toast.warn("Pas de prestations trouvées");
                } else await Results.onScrollViewSearch();
            })
        }
    };

    const changelistOfCity = async (value) => {
        let tmp = [];
        await Promise.all(country_allowed[country_allowed.findIndex(
            tmp => tmp.name === value)]["value"].map(element => {
                tmp.push({value: element, label: element});
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
    };

    const updateThematics = (obj) => {
        let tmp = obj.target.value;
        setThematics(tmp);
        dispatch(changeThematicsToSearch(tmp));
    };

    useEffect(() => {

        valueAll();

        function _start() {
            let tmp = [];
            for (let row in events_allowed) {
                let value = events_allowed[row];
                tmp.push({value: value, label: value, index: row})
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
        <div
            className={lightModeOn
                ? "Base shadow-lg search-bar theme-light relative p-b-40 mt-5 "
                : "Base search-bar theme-dark relative p-b-40 mt-5"}>
            {/* Input Search */}
            <ReactTooltip/>
            <h3 className="text-center text-red mb-4 pt-4">Trouvez la meilleur prestation pour votre evenement</h3>
            <div className={lightModeOn
                ? "search-row row text-black justify-content-center ml-2 mr-2"
                : "search-row row text-white justify-content-center ml-2 mr-2"}>
                <ThemeProvider theme={lightModeOn ? defaultMaterialTheme1 : defaultMaterialTheme}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">Choisir un Pays</InputLabel>
                        <NativeSelect
                            style={{borderButtomColor: 'red'}}
                            value={countryAllowed.value}
                            onChange={obj => updateCountry(obj)}
                            inputProps={{
                                name: 'pays',
                                id: 'age-native-helper'
                            }}
                        >
                            <option value=""/>
                            {
                                countryAllowed.map((data) => ([
                                    <option key={data.value} value={data.value}
                                            style={{color: 'black'}}>{data.label}</option>
                                ]))
                            }

                        </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">Choisir une Ville</InputLabel>
                        <NativeSelect
                            value={listOfCity.value}
                            onChange={obj => updateCity(obj)}
                            inputProps={{
                                name: 'city',
                                id: 'age-native-helper'
                            }}
                        >
                            <option value=""/>
                            {
                                listOfCity.map((data) => ([
                                    <option key={data.value} value={data.value}
                                            style={{color: 'black'}}>{data.label}</option>
                                ]))
                            }

                        </NativeSelect>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-multiple-chip-label">Thematique(s)</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            multiple
                            value={state_thematics}
                            onChange={obj => updateThematics(obj)}
                            input={<Input/>}
                            MenuProps={MenuProps}
                        >
                            {artist_types.map((data) => (
                                <MenuItem
                                    key={data.value} value={data.value}
                                    style={getStyles(data, artist_types, theme)}>
                                    {data.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-dialog-select-label">Evenements</InputLabel>
                        <NativeSelect
                            value={listOfEvents.value}
                            placeholder="Choisir un pays"
                            onChange={obj => updateEvents(obj)}
                            inputProps={{
                                name: 'events',
                                id: 'age-native-helper',
                            }}
                        >
                            <option value=""/>
                            {
                                listOfEvents.map((data) => ([
                                    <option key={data.value} value={data.value}
                                            style={{color: 'black'}}>{data.label}</option>
                                ]))
                            }

                        </NativeSelect>
                    </FormControl>
                </ThemeProvider>
                <FormControl className={classes.formControl}
                             classes={lightModeOn ? {root: classes.root2} : {root: classes.root}}>
                    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                        <ThemeProvider theme={defaultMaterialTheme}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    style={{headerColor: 'red'}}
                                    id="date-picker-dialog"
                                    label="Date"
                                    style={{textDecorationColor: 'white'}}
                                    format="dd/MM/yyyy"
                                    cancelLabel='annuler'
                                    autoOk='true'
                                    value={startDate}
                                    onChange={_date => updateDate(_date)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                        'headerColor': 'red'
                                    }}
                                    inputProps={lightModeOn ? {className: classes.input2} : {className: classes.input}}
                                    InputLabelProps={lightModeOn
                                        ? {className: classes.input2}
                                        : {className: classes.input}}
                                />
                            </Grid>
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </FormControl>
                <div className="col-lg-10 mt-4">
                    <button type="submit"
                            onClick={Search}
                            className="btn btn-outline-primary btn-lg p-3 m-2 col">Recherche&nbsp;
                        <i className="icon-search-1 text-white"/>
                    </button>
                </div>
            </div>
            {/* End Search */}
        </div>
    );
}

export default SearchBar;
