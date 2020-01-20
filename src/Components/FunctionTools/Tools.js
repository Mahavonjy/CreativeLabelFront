import React from "react";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import { toast } from "react-toastify";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import Home from "../Home/Home";

export const changeFields = (setState, e, up_props) => {
    let value = e.target.value;
    setState(value);
    if (up_props) up_props(value)
};

export const AddForPlay = async (that, state_name, beat_props, up_props) => {
    let all_call_api = [];
    let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
    for (let index in beat_props) {
        await that.setState(prevState => ({[state_name]: {...prevState[state_name], [index]: true}}), () => {
            all_call_api.push(
                axios.get(Conf.configs.ServerApi + "api/medias/Streaming/" + beat_props[index]['id'], {headers:headers}).then(response => {
                    up_props({"index": index, "link": response.data});
                }).catch(error => {
                    console.log(error.data);
                })
            )
        });
    }
    return Promise.all(all_call_api).then(r => console.log(''))
};

export const AddPropsCart = async (headers, props) => {
    try {
        let carts = JSON.parse(localStorage.getItem("MyCarts"));
        localStorage.removeItem("MyCarts");
        for (let cart in carts) {
            let tmp = carts[cart];
            await AddToCart(tmp.song_id, tmp.price, tmp.licenses_name, null, null, true)
        }
    } finally {
        FillInCartProps(headers, props);
    }
};

export const AddToCart = (song_id, price, licenses_name, beat, props, special) => {
    const user_credentials = props.user_credentials;

    let data = { "song_id": song_id, "price": price, "licenses_name": licenses_name };
    if (user_credentials.token !== Conf.configs.TokenVisitor) {
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };
        return axios.post(Conf.configs.ServerApi + "api/carts/addToCart", data, {headers: headers}).then(resp => {
            if (!special) {
                AddPropsCart(headers, props).then(() => console.log());
                toast.success(resp.data);
            } else return true
        }).catch(err => {
            if (!special) toast.error(err.response.data);
            else return false
        })
    } else {
        const carts = JSON.parse(localStorage.getItem("MyCarts"));
        if (!carts) {
            localStorage.setItem("MyCarts",  JSON.stringify([{
                "media" : {
                    "photo": beat["photo"],
                    "artist": beat["artist"],
                    "title": beat["title"]
                }, data
            }]));
            Home.IncrementCart();
            toast.success("Ajout avec succès");
        } else {
            const cart_S = carts.some(item => item.song_id === song_id);
            if (!cart_S) {
                localStorage.removeItem("MyCarts");
                carts.push({
                    "media" : {
                        "photo": beat["photo"],
                        "artist": beat["artist"],
                        "title": beat["title"]
                    },
                    "song_id": song_id,
                    "price": price,
                    "licenses_name": licenses_name
                });
                localStorage.setItem("MyCarts",  JSON.stringify(carts));
                Home.IncrementCart();
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
            axios.post(Conf.configs.ServerApi + "api/medias/admire/" + id, {},{headers: headers}).then(() =>{
                toast.success("liked")
            }).catch(() => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            axios.post(Conf.configs.ServerApi + "api/admiration/admire_user/" + id, {},{headers: headers}).then(() =>{
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

export const FillInCartProps = (headers, props) => {
    axios.get(Conf.configs.ServerApi + "api/carts/MyCart", {headers: headers}).then(resp => {
        let tmp = 0;
        if (resp.data.length !== 0) Home.IncrementCart(resp.data.length);
        for (let row in resp.data) {tmp = tmp + resp.data[row]['price']}
        props.addTotalPrice(Math.round(tmp * 100) / 100);
        props.addCarts(resp.data);
    }).catch(err => {
        console.log(err)
    });
};

export const formatDate = (date) => {
    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + '-' + monthIndex + '-' + year;
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

export const getMediaLink = (setState, state, medias, up_props) => {
    let all_call_api = [];
    let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
    for (let index in medias) {
        setState(state => [...state, {index: true}]);
        all_call_api.push(
            axios.get(Conf.configs.ServerApi + "api/medias/Streaming/" + medias[index]['id'], {headers:headers}).then(response => {
                up_props({"index": index, "link": response.data});
            }).catch(error => {
                console.log(error.data);
            })
        )
    }
    return Promise.all(all_call_api).then(() => null)
};
