import React from "react";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import Home from "../Home/Home";
import { toast } from "react-toastify";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import {addTotalPrice, addCarts, addAllUserPrestation, addMaterialsOfService} from "./FunctionProps";

export const changeFields = (setState, e, up_props, dispatch) => {
    let value = e.target.value;
    setState(value);
    if (up_props && dispatch) dispatch(up_props(value))
};

export const FillInCartProps = (headers, props) => {
    axios.get( "api/carts/MyCart", {headers: headers}).then(resp => {
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

    let data_global = { "song_id": song_id, "price": price, "licenses_name": licenses_name };
    if (user_credentials.token !== Conf.configs.TokenVisitor) {
        console.log(price);
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        return axios.post( "api/carts/addToCart", data_global, {headers: headers}).then(() => {
            let tmp_cart = props.carts;
            tmp_cart.push({
                "media" : {
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
            toast.success( "Ajout avec succès");
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
            localStorage.setItem("MyCarts",  JSON.stringify(data));
            Home.IncrementCart();
            dispatch(addCarts(data));
            dispatch(addTotalPrice(price));
            toast.success("Ajout avec succès");
        } else {
            const cart_S = carts.some(item => item.song_id === song_id);
            if (!cart_S) {
                await localStorage.removeItem("MyCarts");
                let data = {
                    "media" : {
                        "photo": beat["photo"],
                        "artist": beat["artist"],
                        "title": beat["title"]
                    },
                    "song_id": song_id,
                    "price": price,
                    "licenses_name": licenses_name
                };
                await carts.push(data);
                await localStorage.setItem("MyCarts",  JSON.stringify(carts));
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
            axios.post( "api/medias/admire/" + id, {},{headers: headers}).then(() =>{
                toast.success("liked")
            }).catch(() => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            axios.post( "api/admiration/admire_user/" + id, {},{headers: headers}).then(() =>{
                toast.success("followed");
                OtherProfile.UpdateStateFollowed();
            }).catch(() => {
                toast.warn("already followed");
            });
        };
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
    let key = !date_key ? selectedMonth + "/" + selectedDay + "/" + selectedYear : date_key
    function addToSpecialIndex(i) {
        if (!tmp_data[i]["special_date"][key]) {
            let tmp = {...tmp_data[i]};
            delete tmp["special_date"];
            tmp_data[i]["special_date"][key] = tmp
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

export const ChangeDate = (date, setStartDate) => {
    if (new Date() < date)
        setStartDate(date);
};

export const getMediaLink = (setState, state, medias, up_props, dispatch) => {
    let all_call_api = [];
    let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
    for (let index in medias) {
        setState(state => [...state, {index: true}]);
        all_call_api.push(
            axios.get( "api/medias/Streaming/" + medias[index]['id'], {headers:headers}).then(response => {
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

export const createNewPrestation = async (setActiveToast, allPrestation, setAllPrestation, setAddNewPrestation, dispatch, close, props) => {
    let secure = false;
    for (let row in allPrestation) {
        if (allPrestation[row]['title'] === props.PropsTitle && allPrestation[row]['city_of_reference'] === props.PropsCityReference) {
            secure = true;
        } else if (allPrestation[row]['title'] === props.PropsTitle && compareArrays(allPrestation[row]['events_type'], props.props_events_selected)) {
            secure = true;
        }
    }
    if (secure)
        return false;
    await setActiveToast(true);
    let tmp_prestation = { "preparation_time": {"time": null, "unit": null},  "service_time": {"time": null, "unit": null }};
    tmp_prestation['id'] = 3;
    tmp_prestation['moving_price'] = 300;
    tmp_prestation['materials'] = [];
    tmp_prestation['hidden'] = true;
    tmp_prestation['title'] = props.PropsTitle;
    tmp_prestation['photo'] = props.PropsFiles;
    tmp_prestation['city_of_reference'] = props.PropsCityReference;
    tmp_prestation['others_city'] = props.PropsOthersCity;
    tmp_prestation['description'] = props.PropsDescription;
    tmp_prestation['events_type'] = props.props_events_selected;
    tmp_prestation['price'] = props.props_price_of_service;
    tmp_prestation['preparation_time']['time'] = props.props_preparation_time;
    tmp_prestation['number_of_artist'] = props.props_number_of_artist;
    tmp_prestation['service_time']['time'] = props.props_service_time;
    tmp_prestation['thematics_options_selected'] = props.props_thematics_options_selected;
    tmp_prestation['preparation_time']['unit'] = checkValueOfUnit(props.props_unit_time_of_preparation);
    tmp_prestation['service_time']['unit'] = checkValueOfUnit(props.props_unit_time_of_service);
    let tmp = allPrestation;
    tmp.push(tmp_prestation);
    await setAllPrestation(tmp);
    await dispatch(addAllUserPrestation(tmp));
    await setAddNewPrestation(false);
    await close();
    return true;
};
