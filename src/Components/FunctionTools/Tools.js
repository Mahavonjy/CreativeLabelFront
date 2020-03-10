import axios from "axios";
import React from "react";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import Conf from "../../Config/tsconfig";
import Home from "../Home/Home";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import * as Validators from "../Validators/Validatiors";
import {
    addAllUserOptions,
    addAllUserPrestation,
    addCarts,
    addDescriptionOfService,
    addEventSelected,
    addNumberOfArtist,
    addOptionSelected,
    addOthersCityOfService,
    addPicturesOfService,
    addPreparationTime,
    addPriceOfService,
    addReferenceOfCity,
    addServiceCountry,
    addServiceRefundPolicy,
    addServiceTime,
    addTitleOfService,
    addTotalPrice,
    addTravelExpenses,
    addUnitTimeOfPreparation,
    addUnitTimeOfService,
    addUserId,
    changeStatusOfService
} from "./FunctionProps";

export const changeFields = (setState, e, up_props, dispatch, key, props) => {
    let value = e.target.value;
    setState(value);
    if (up_props && dispatch) {
        if (key && props) {
            props[key] = value;
            dispatch(up_props(props))
        } else dispatch(up_props(value))
    }
};

export const FillInCartProps = (headers, props) => {
    axios.get("api/carts/MyCart", {headers: headers}).then(resp => {
        let tmp = 0;
        let cart_length = resp.data.length;
        if (cart_length !== 0) {
            Home.IncrementCart(cart_length);
            for (let row in resp.data) tmp = tmp + resp.data[row]['price'];
            props.dispatch(props.addTotalPrice(Math.round(tmp * 100) / 100));
            props.dispatch(props.addCarts(resp.data));
        }
    }).catch(err => {
        console.log(err)
    });
};

export const AddToCart = async (song_id, price, licenses_name, beat, props, dispatch) => {
    const user_credentials = props.user_credentials;

    let data_global = {"song_id": song_id, "price": price, "licenses_name": licenses_name};
    if (user_credentials.token !== Conf.configs.TokenVisitor) {
        console.log(price);
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        return axios.post("api/carts/addToCart", data_global, {headers: headers}).then(() => {
            let tmp_cart = props.carts;
            tmp_cart.push({
                "media": {
                    "photo": beat["photo"],
                    "artist": beat["artist"],
                    "title": beat["title"]
                },
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            });
            dispatch(props.addTotalPrice(Math.round((props.totalPrice + price) * 100) / 100));
            dispatch(props.addCarts(tmp_cart));
            Home.IncrementCart();
            toast.success("Ajout avec succès");
        }).catch(err => {
            try {
                if (err.response.data === "cart existing")
                    toast.error("Vous l'avez déja");
                else toast.error(err.response.data)
            } catch (e) {
                console.log(err.response)
            }
        })
    } else {
        const carts = JSON.parse(localStorage.getItem("MyCarts"));
        if (!carts) {
            let data = [{
                "media": {
                    "photo": beat["photo"],
                    "artist": beat["artist"],
                    "title": beat["title"]
                },
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            }];
            localStorage.setItem("MyCarts", JSON.stringify(data));
            Home.IncrementCart();
            dispatch(addCarts(data));
            dispatch(addTotalPrice(price));
            toast.success("Ajout avec succès");
        } else {
            const cart_S = carts.some(item => item.song_id === song_id);
            if (!cart_S) {
                await localStorage.removeItem("MyCarts");
                let data = {
                    "media": {
                        "photo": beat["photo"],
                        "artist": beat["artist"],
                        "title": beat["title"]
                    },
                    "song_id": song_id,
                    "price": price,
                    "licenses_name": licenses_name
                };
                await carts.push(data);
                await localStorage.setItem("MyCarts", JSON.stringify(carts));
                await Home.IncrementCart();
                await dispatch(addCarts(carts));
                await dispatch(addTotalPrice(Math.round((props.totalPrice + price) * 100) / 100));
                toast.success("Ajout avec succès");
            } else {
                toast.warn("Vous l'avez déja");
            }
        }
    }
};

export const LikeOrFollow = (LikeOrFollow, id, user_credentials) => {
    if (user_credentials.token === Conf.configs.TokenVisitor) {
        document.getElementById("LoginRequire").click();
    } else {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        if (LikeOrFollow === "like") {
            axios.post("api/medias/admire/" + id, {}, {headers: headers}).then(() => {
                toast.success("liked")
            }).catch(() => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            axios.post("api/admiration/admire_user/" + id, {}, {headers: headers}).then(() => {
                toast.success("followed");
                OtherProfile.UpdateStateFollowed();
            }).catch(() => {
                toast.warn("already followed");
            });
        }
        ;
    }
};

export const isNumber = (number_) => {
    let _tmp = false;
    for (let r in number_) {
        let r_ = parseInt(number_[r]);
        if (isNaN(r_))
            _tmp = true
    }
    if (_tmp)
        return false;
    let tmp_ = number_.split(/[.,_/ -]/);
    if (tmp_.length > 1)
        return false;
    let tmp = parseInt(number_);
    return tmp === parseInt(tmp, 10);
};

export const formatDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth() + 1;
    let year = date.getFullYear();
    return monthIndex + '/' + day + '/' + year;
};

export const addSpecialDateToData = (tmp_data, selectedMonth, selectedDay, selectedYear, index, date_key) => {
    let key = !date_key ? selectedMonth + "/" + selectedDay + "/" + selectedYear : date_key;

    function addToSpecialIndex(i) {
        let tmp = {...tmp_data[i]};
        if (!tmp_data[i]["special_dates"][key]) {
            delete tmp["special_dates"];
            tmp = deleteInObject(tmp);
            tmp["materials"] = deleteInObject(tmp["materials"]);
            tmp_data[i]["special_dates"][key] = tmp;
        }
    }

    if (index) addToSpecialIndex(index);
    else for (let r in tmp_data) addToSpecialIndex(r);
};

export const checkIfHidden = (value, idPrestation) => {
    let tmp = false;
    for (let index in value)
        if (value[index] === idPrestation)
            tmp = true;
    return tmp;
};

export const changeBoolFields = (setState, e, up_props) => {
    let value = e.target.value;
    if (value === true || value === "true") setState(false);
    else setState(true);
    if (up_props) up_props(!value)
};

export const changeFileFields = (setState, e) => {
    setState(e.target.files[0]);
};

export const ImageClick = (e) => {
    const cube = document.querySelector(".cube");
    let cubeImageClass = cube.classList[1];

    const targetNode = e.target.nodeName;
    const targetClass = e.target.className;

    if (targetNode === "INPUT" && targetClass !== cubeImageClass) cube.classList.replace(cubeImageClass, targetClass);
};

export const checkValueOfUnit = (val) => {
    if (val["day"])
        return "j";
    else if (val['hours'])
        return "h";
    else if (val['min'])
        return "m";
    return "s";
};

export const calculateNumberDaysBetweenDates = (date1, date2) => {
    return (date1 - date2) / (1000 * 3600 * 24)
};

export const ChangeDate = (date, setStartDate, dispatch, func) => {
    if (new Date() < date) {
        setStartDate(date);
        if (dispatch && func)
            dispatch(func(date))
    }
};

export const getMediaLink = (setState, state, medias, up_props, dispatch) => {
    let all_call_api = [];
    let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
    for (let index in medias) {
        setState(state => [...state, {index: true}]);
        all_call_api.push(
            axios.get("api/medias/Streaming/" + medias[index]['id'], {headers: headers}).then(response => {
                dispatch(up_props({"index": index, "link": response.data}));
            }).catch(error => {
                console.log(error);
            })
        )
    }
    return Promise.all(all_call_api).then(() => null)
};

export const compareArrays = (first_array, second_array) => {
    return JSON.stringify(first_array) === JSON.stringify(second_array)
};

export const createOrUpdatePrestation = async (_props, dispatch, props, update) => {
    let secure = false;
    for (let row in _props.allPrestation) {
        if (_props.allPrestation[row]["id"] !== props.service_id) {
            if (_props.allPrestation[row]['title'] === props.PropsTitle && _props.allPrestation[row]['reference_city'] === props.PropsCityReference) {
                secure = true;
            } else if (_props.allPrestation[row]['title'] === props.PropsTitle && compareArrays(_props.allPrestation[row]['events'], props.props_events_selected)) {
                secure = true;
            }
        }
    }
    if (secure)
        return {"error": true, message: null};
    await _props.setActiveToast(true);
    let tmp_prestation = {};

    if (update) {
        tmp_prestation['user_id'] = props.user_id;
        tmp_prestation['materials_id'] = props.materials_id;
    }
    tmp_prestation['special_dates'] = {};
    tmp_prestation['title'] = props.PropsTitle;
    tmp_prestation['country'] = props.PropsCountry;
    tmp_prestation['reference_city'] = props.PropsCityReference;
    tmp_prestation['others_city'] = props.PropsOthersCity;
    tmp_prestation['description'] = props.PropsDescription;
    tmp_prestation['refund_policy'] = props.refund_policy;
    tmp_prestation['events'] = props.props_events_selected;
    tmp_prestation['price'] = props.props_price_of_service;
    tmp_prestation['travel_expenses'] = props.travel_expenses || 0.0;
    tmp_prestation['preparation_time'] = props.props_preparation_time;
    tmp_prestation['number_of_artists'] = props.props_number_of_artist;
    tmp_prestation['duration_of_the_service'] = props.props_service_time;
    tmp_prestation['thematics'] = props.props_thematics_options_selected;
    tmp_prestation['unit_of_the_preparation_time'] = checkUnit(props.props_unit_time_of_preparation);
    tmp_prestation['unit_duration_of_the_service'] = checkUnit(props.props_unit_time_of_service);

    let response = {};
    if (!update) {
        await axios.post("api/artist_services/newService", objectToFormData(tmp_prestation, props.PropsFiles), {headers: _props.headers}).then((resp) => {
            let tmp = _props.allPrestation;
            tmp.push(resp.data);
            _props.setAllPrestation(tmp);
            dispatch(addAllUserPrestation(tmp));
            _props.setActiveToast(true);
            _props.setAddNewPrestation(false);
            _props.close();
            resetPropsForm(dispatch);
            response = {"error": false, message: null}
        }).catch((error) => {
            response = {"error": true, message: Validators.checkErrorMessage(error).message}
        });
    } else {
        await axios.put("api/artist_services/update/" + props.service_id, objectToFormData(tmp_prestation, props.PropsFiles), {headers: _props.headers}).then((resp) => {
            let tmp = [..._props.allPrestation];
            tmp[tmp.findIndex(tmp => tmp.id === props.service_id)] = resp.data;
            _props.setAllPrestation(tmp);
            resetPropsForm(dispatch);
            dispatch(addAllUserPrestation(tmp));
            response = {"error": false, message: null}
        }).catch((error) => {
            response = {"error": true, message: Validators.checkErrorMessage(error).message}
        });
    }
    return response;
};

export const checkUnitKey = (val, opt) => {
    if (val === "min")
        if (opt)
            return {"day": false, "hours": false, "min": true, "sec": false};
        else return "m";
    else if (val === "day")
        if (opt)
            return {"day": true, "hours": false, "min": false, "sec": false};
        else return "j";
    else if (val === "sec")
        if (opt)
            return {"day": false, "hours": false, "min": false, "sec": true};
        else return "s";
    if (opt)
        return {"day": false, "hours": true, "min": false, "sec": false};
    return "h";
};

export const checkUnit = (object) => {

    return Object.keys(object).filter(function (key) {
        return object[key]
    })[0]
};

export const checkKeyOfValue = (object, value) => {

    return Object.keys(object).filter(function (key) {
        if (object[key] === value)
            return key
    })[0]
};

export const generateBodyFormOfGallery = (bodyFormData, PropsFiles) => {
    let galleries = [];
    for (let row in PropsFiles) {
        if (PropsFiles[row]['file'])
            bodyFormData.append('gallery_' + row, PropsFiles[row]['file']);
        if (typeof PropsFiles[row] === "string")
            galleries.push(PropsFiles[row])
    }
    if (galleries.length !== 0)
        bodyFormData.append('galleries', JSON.stringify(galleries));
};

export const objectToFormData = (object, PropsFiles) => {
    let bodyFormData = new FormData();

    for (let property in object) {
        if (object.hasOwnProperty(property)) {
            if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                if (object[property] && property !== 'materials')
                    bodyFormData.append(property, JSON.stringify(object[property]));
            } else
                bodyFormData.append(property, object[property]);
        }
    }
    if (PropsFiles)
        generateBodyFormOfGallery(bodyFormData, PropsFiles);
    return bodyFormData;
};

export const resetPropsForm = (dispatch) => {
    dispatch(addUserId(null));
    dispatch(addOptionSelected([]));
    dispatch(addTitleOfService(''));
    dispatch(addServiceCountry(''));
    dispatch(addReferenceOfCity(''));
    dispatch(addOthersCityOfService([]));
    dispatch(addDescriptionOfService(''));
    dispatch(addPicturesOfService([]));
    dispatch(changeStatusOfService(null));
    dispatch(addTravelExpenses(0.0));
    dispatch(addEventSelected([]));
    dispatch(addServiceTime(0.0));
    dispatch(addPriceOfService(0.0));
    dispatch(addPreparationTime(0.0));
    dispatch(addNumberOfArtist(1));
    dispatch(addNumberOfArtist(1));
    dispatch(addServiceRefundPolicy(""));
    dispatch(addUnitTimeOfPreparation({"day": false, "hours": false, "min": false, "sec": false}));
    dispatch(addUnitTimeOfService({"day": false, "hours": false, "min": false, "sec": false}));
};

export const deleteInObject = (object, special_key) => {

    try {
        delete object['id'];
    } catch (e) {
        //
    }

    try {
        delete object['created_at'];
    } catch (e) {
        //
    }

    try {
        delete object['modified_at'];
    } catch (e) {
        //
    }

    if (special_key) {
        for (let row in special_key) {
            try {
                delete object[special_key[row]];
            } catch (e) {
                //
            }
        }
    }
    return object
};

export const updateAllOptions = (optionToUpdate, dispatch, headers) => {
    let tmp_call = [];
    let tmpAllOptions = [...optionToUpdate];
    for (let row in tmpAllOptions) {
        let tmpOption = {...tmpAllOptions[row]};
        let option_id = tmpOption['id'];
        tmpOption = deleteInObject(tmpOption, ["materials"]);
        tmp_call.push(
            axios.put('api/options/update/' + option_id, tmpOption, {headers: headers}).then((resp) => {
                tmpAllOptions[row] = resp.data;
                dispatch(addAllUserOptions(tmpAllOptions));
            })
        )
    }
    Promise.all(tmp_call).then(() => null)
};

export const updateAllServices = (prestations, dispatch, headers) => {
    let api_call_update = [];
    let tmpPrestations = [...prestations];
    for (let index in tmpPrestations) {
        let prestation_id = tmpPrestations[index]["id"];
        let prestation_selected = deleteInObject(tmpPrestations[index]);
        api_call_update.push(
            axios.put('api/artist_services/update/' + prestation_id, objectToFormData(prestation_selected), {headers: headers}).then((resp) => {
                tmpPrestations[index] = resp.data;
                dispatch(addAllUserPrestation(tmpPrestations));
            })
        )
    }
    Promise.all(api_call_update).then(() => null)
};

export const onChangeListWithValueLabel = (setState, obj, dispatch, func) => {
    let value = obj.value;
    setState(value);
    if (func && dispatch)
        dispatch(func(value))
};

export const generatePagination = (_array, funcToDisplay) => {
    return _array.map((val, index) => ({
        id: (index + 1), name:
            <div key={index}>
                <ReactTooltip/>
                <div className="card_kanto" onClick={() => funcToDisplay(val)}>
                    <div className="additional">
                        <div className="user-card_kanto d-none d-sm-block" data-tip="Cliquer Moi">
                            <div className="level center-result">{val.title}</div>
                            <div className="points center-result">
                                5&nbsp;<i className="icon icon-star"/>
                            </div>
                            <div className="text-center" style={{paddingTop: 70}}>
                                <img className="border1" width={110} height={100} src={val.galleries[0]} alt=''/>
                            </div>
                        </div>
                        <div className="more-info">
                            <h1 className="pt-2">{val.artist_name}</h1>
                            <div className="row justify-content-center text-center" data-tip="Cliquer Moi">
                                <div className="col text-light d-none d-sm-block">
                                    <h4 className="text-light bolder">Genre</h4>
                                    <ul className="bg-transparent kanto-list m-1">
                                        {val.thematics.map((val, index) => <li key={index}>{val}</li>)}
                                    </ul>
                                </div>
                                <div className="col text-light d-none d-sm-block">
                                    <h4 className="text-light bolder">Ville</h4>
                                    <ul className="bg-transparent kanto-list m-1">
                                        <li key={0}>{val.reference_city}</li>
                                        {val.others_city.map((val, index) => <li key={index + 1}>{val}</li>)}
                                    </ul>
                                </div>
                                <div className="col ml-auto d-sm-none">
                                    <h4 className="text-red">Evenements</h4>
                                    <p className="events">{val.events.join(", ")}</p>
                                    <div className="row ml-2 mr-3">
                                        <div className="col">
                                            <small className="text-red">Ville</small>
                                            <ul className="small-kanto-list">
                                                <li key={0}>{val.reference_city}</li>
                                                {val.others_city.map((val, index) => <li key={index + 1}>{val}</li>)}
                                            </ul>
                                        </div>
                                        <div className="col">
                                            <div className="text-center" style={{marginTop: 10, marginLeft: 10}}>
                                                <img className="border1" src={val.galleries[0]} alt=''/>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <small className="text-red">Genre</small>
                                            <ul className="small-kanto-list">
                                                {val.thematics.map((val, index) => <li key={index}>{val}</li>)}
                                            </ul>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="stats">
                                <div data-tip="Le nombre d'artiste dans le groupe">
                                    <i className="icon icon-adjust"/>
                                    <div className="value">{val.number_of_artists}</div>
                                </div>
                                <div data-tip="La durée de la preparation">
                                    <i className="icon icon-clock-1"/>
                                    <div
                                        className="value">{val.preparation_time}&nbsp;{checkUnitKey(val.unit_of_the_preparation_time)}</div>
                                </div>
                                <div data-tip="La durée de la prestation">
                                    <i className="icon icon-clock-o"/>
                                    <div
                                        className="value">{val.duration_of_the_service}&nbsp;{checkUnitKey(val.unit_duration_of_the_service)}</div>
                                </div>
                                <div data-tip="Le prix de la prestation">
                                    <i className="icon icon-money"/>
                                    <div className="value">{val.price}$</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="general d-none d-sm-block">
                        <img alt=""
                             src={val.galleries.length > 1 ? val.galleries[1] : "https://zupimages.net/up/19/42/zyu8.bmp"}
                             width="100%" height="100%"/>
                        <h1 className="pt-2 ml-2 bolder text-red">{val.artist_name}</h1>
                        <p className="text-dark ml-2 font-weight-bold">{val.description}</p>
                        <h1 className="more text-black bolder">{val.price}$</h1>
                        <small className="more-genre pl-2 text-black">{val.thematics.join(", ")}</small>
                    </div>
                </div>
            </div>
    }));
};
