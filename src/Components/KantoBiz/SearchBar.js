import React, {useEffect, useRef, useState} from "react";
import DatePicker from "react-datepicker";
import {useDispatch, useSelector} from "react-redux";
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {toast, ToastContainer} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import axios from "axios";
import {
    changeCityToSearch,
    changeCountryToSearch,
    changeEnventsToSearch,
    changeThematicsToSearch
} from "../FunctionTools/FunctionProps";
import {ChangeDate, onChangeListWithValueLabel,} from "../FunctionTools/Tools";
import {validatorSearch} from "../Validators/Validatiors"

function SearchBar(props) {

    const dispatch = useDispatch();
    const country_allowed = useSelector(state => state.Others.country_allowed);
    const events_allowed = useSelector(state => state.Others.events_allowed);
    const artist_types = useSelector(state => state.Others.artist_types);
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

    const Search = () => {
        let if_errors = validatorSearch(state_thematics, startDate, country);
        if (if_errors['error']) {
            toast.error(if_errors['message'])
        } else {
            axios.post("api/service_search/moment", {
                "country": country,
                "city": city,
                "event_date": startDate.toISOString(),
                "event": state_events,
                "thematics": state_thematics,
            }, {headers: props.headers}).then((resp) => {
                console.log(resp.data)
            }).catch((error) => {

            })
        }
    };

    const changeCity = async (value) => {
        let tmp = [];
        await Promise.all(country_allowed[country_allowed.findIndex(tmp => tmp.name === value)]["value"].map(element => {
            tmp.push({value: element, label: element})
        })).then(() => setListOfCity(tmp));
    };

    useEffect(() => {

        function one() {
            let tmp = [];
            for (let row in country_allowed) {
                let cityTmp = [];
                for (let index in country_allowed[row]["value"]) {
                    let tmpName = country_allowed[row]["value"][index];
                    cityTmp.push({value: tmpName, label: tmpName, index: index})
                }
                tmp.push({value: country_allowed[row]["name"], label: country_allowed[row]["name"], city: cityTmp});
            }
            setCountryAllowed(tmp);
        }

        function two() {
            let tmp = [];
            for (let row in events_allowed) {
                let value = events_allowed[row];
                tmp.push({value: value, label: value, index: row})
            }
            setListOfEvents(tmp);
        }

        Promise.all([one(), two()]).then(r => null);

        return () => {
            isMounted.current = true
        };
    }, [city, country, listOfCity]);

    return (
        <div className="Base search-bar relative p-b-40 p-t-10">
            <ToastContainer/>
            {/* Input Search */}
            <h3 className="text-center text-red">Trouvez la meilleur prestation pour votre evenement</h3><br/>
            <div className="search-row row justify-content-center ml-2 mr-2">
                <div className=" col-lg-2 d-inline-block text-center">
                    <CreatableSelect placeholder="Choisir un pays"
                                     onChange={obj => {
                                         new Promise(resolve => {
                                             resolve(setCity(""));
                                             resolve(dispatch(changeCityToSearch("")));
                                             resolve(onChangeListWithValueLabel(setCountry, obj, dispatch, changeCountryToSearch));
                                             resolve(changeCity(obj.value).then(r => null));
                                         }).then(r => null);
                                     }}
                                     options={countryAllowed}/>
                </div>
                <div className=" col-lg-2 d-inline-block text-center">
                    <CreatableSelect placeholder="Choisir une ville"
                                     onChange={obj => onChangeListWithValueLabel(setCity, obj, dispatch, changeCityToSearch)}
                                     options={listOfCity}/>
                </div>

                <div className=" col-lg-3 d-inline-block text-center">
                    <Select isMulti options={artist_types} placeholder="Choisir le/les thematics" onChange={obj => {
                        let tmp = [];
                        for (let row in obj) tmp.push(obj[row]["value"]);
                        setThematics(tmp);
                        dispatch(changeThematicsToSearch(tmp));
                    }}/>
                </div>

                <div className=" col-lg-3 d-inline-block text-center">
                    <Select options={listOfEvents} placeholder="Choisir le/les evenements" onChange={obj => {
                        onChangeListWithValueLabel(setEvents, obj, dispatch, changeEnventsToSearch)
                    }}/>
                </div>

                <div className=" col-lg-2 d-inline-block text-center">
                    <ReactTooltip/>
                    <DatePicker selected={startDate} className="special-date-picker text-center"
                                onChange={(e) => ChangeDate(e, setStartDate)}/>
                    <label className="input-group-addon bg-transparent" data-tip="La date de votre Evenement">
                        <i className="icon-calendar text-center text-red"/>
                        <span className="ml-2 text-white"><i className="icon icon-info"/></span>
                    </label>
                </div>

                <div className="col-md-10">
                    <button type="submit" onClick={Search}
                            className="btn btn-outline-primary btn-lg p-3 m-2 col">Recherche&nbsp;<i
                        className="icon-search-1 text-white"/></button>
                </div>
            </div>
            {/* End Search */}
        </div>
    );
}

export default SearchBar;
