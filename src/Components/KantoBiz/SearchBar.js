import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
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
    changeInitialized,
    changeThematicsToSearch
} from "../FunctionTools/FunctionProps";
import {
    ChangeDate,
    funcToSpecifyValueForSpecialInput,
    generatePagination,
    onChangeListWithValueLabel,
    shuffleArray,
} from "../FunctionTools/Tools";
import {validatorSearch} from "../Validators/Validatiors"
import Results from "./Prestations/Results/Results";

function SearchBar(props) {

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

    const isMounted = useRef(false);
    const [city, setCity] = useState(city_to_search);
    const [listOfCity, setListOfCity] = useState([]);
    const [state_events, setEvents] = useState(events_to_search);
    const [listOfEvents, setListOfEvents] = useState([]);
    const [country, setCountry] = useState("");
    const [countryAllowed, setCountryAllowed] = useState(country_to_search);
    const [state_thematics, setThematics] = useState(thematics_to_search);
    const [startDate, setStartDate] = useState(date_to_search);

    const Search = async () => {
        let if_errors = validatorSearch(state_thematics, startDate, country);
        if (if_errors['error']) {
            toast.error(if_errors['message'])
        } else {
            await dispatch(addSearchLoading(true));
            await dispatch(changeInitialized(false));
            await axios.post("api/service_search/moment", {
                "country": country,
                "city": city,
                "event_date": startDate.toISOString(),
                "event": state_events,
                "thematics": state_thematics,
            }, {headers: props.headers}).then(async (resp) => {
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

    const changeCity = async (value) => {
        let tmp = [];
        await Promise.all(country_allowed[country_allowed.findIndex(
            tmp => tmp.name === value)]["value"]
            .map(element => {
                tmp.push({value: element, label: element})
            })
        ).then(() => setListOfCity(tmp));
    };

    useEffect(() => {

        function two() {
            let tmp = [];
            for (let row in events_allowed) {
                let value = events_allowed[row];
                tmp.push({value: value, label: value, index: row})
            }
            setListOfEvents(tmp);
        }

        Promise.all([funcToSpecifyValueForSpecialInput(country_allowed, setCountryAllowed), two()]).then();

        return () => {
            isMounted.current = true
        };
    }, [city, country, listOfCity, service_to_show]);

    return (
        <div className="Base search-bar relative p-b-40 mt-5">
            {/* Input Search */}
            <h3 className="text-center text-red pt-4">Trouvez la meilleur prestation pour votre evenement</h3><br/>
            <div className="search-row row justify-content-center ml-2 mr-2">
                <div className="col-lg-2 d-inline-block text-center required">
                    <label className="control-label">Pays</label>
                    <CreatableSelect placeholder="Choisir un pays"
                                     onChange={obj => {
                                         new Promise(resolve => {
                                             resolve(setCity(""));
                                             resolve(dispatch(changeCityToSearch("")));
                                             resolve(changeCity(obj.value).then(r => null));
                                             resolve(onChangeListWithValueLabel(
                                                 setCountry,
                                                 obj,
                                                 dispatch,
                                                 changeCountryToSearch));
                                         }).then(r => null)
                                     }}
                                     options={countryAllowed}/>
                </div>
                <div className=" col-lg-2 d-inline-block text-center">
                    <label className="control-label">Villes</label>
                    <CreatableSelect placeholder="Choisir une ville"
                                     options={listOfCity}
                                     onChange={
                                         obj => onChangeListWithValueLabel(
                                             setCity,
                                             obj,
                                             dispatch,
                                             changeCityToSearch
                                         )
                                     }/>
                </div>
                <div className=" col-lg-3 d-inline-block text-center required">
                    <label className="control-label">Thematics</label>
                    <Select isMulti options={artist_types} placeholder="Choisir le/les thematics" onChange={obj => {
                        let tmp = [];
                        for (let row in obj) tmp.push(obj[row]["value"]);
                        setThematics(tmp);
                        dispatch(changeThematicsToSearch(tmp));
                    }}/>
                </div>
                <div className=" col-lg-2 d-inline-block text-center">
                    <label className="control-label">Evenements</label>
                    <Select options={listOfEvents} placeholder="Choisir le/les evenements"
                            onChange={obj => {
                                onChangeListWithValueLabel(setEvents, obj, dispatch, changeEventsToSearch)
                            }}/>
                </div>
                <div className="col-lg-2 d-inline-block text-center required">
                    <ReactTooltip/>
                    <label className="control-label">Date de votre evenement</label>
                    <input type="date"
                           className="special-date-picker text-center"
                           onChange={
                               (e) => ChangeDate(
                                   e,
                                   setStartDate,
                                   dispatch,
                                   changeDateToSearch)
                           }/>
                    {/*<i className="icon-calendar text-center ml-2 s-20 text-red" */}
                    {/*   data-tip="Ceci est votre date d'Evenement"/>*/}
                </div>
                <div className="col-lg-10 mt-4">
                    <button type="submit" onClick={Search}
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
