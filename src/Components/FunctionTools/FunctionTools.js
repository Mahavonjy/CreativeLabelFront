import React, {Component} from "react";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import Cookies from "universal-cookie";
import {toast, ToastContainer} from "react-toastify";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import Home from "../Home/Home";

// Global variable
let cookies = new Cookies();
let token;

try {
    token = cookies.get("Isl_Creative_pass")["Isl_Token"]
} catch (e) {
    token = Conf.configs.TokenVisitor
}

class FunctionTools extends Component {

    static async AddForPlay (that, state_name, beat_props, up_props) {
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
    }

    static async AddPropsCart(new_headers, props) {
        try {
            let carts = JSON.parse(localStorage.getItem("MyCarts"));
            localStorage.removeItem("MyCarts");
            for (let cart in carts) {
                let tmp = carts[cart];
                await FunctionTools.AddToCart(tmp.song_id, tmp.price, tmp.licenses_name, null, null, true)
            }
        } finally {
            FunctionTools.FillInCartProps(new_headers, props);
        }
    };

    static AddToCart = (song_id, price, licenses_name, beat, props, special) => {
        if (token !== Conf.configs.TokenVisitor) {
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            let data = {
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            };
            return axios.post(Conf.configs.ServerApi + "api/carts/addToCart", data, {headers: headers}).then(resp => {
                if (!special) {
                    FunctionTools.AddPropsCart(headers, props).then(() => console.log());
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
                    },
                    "song_id": song_id,
                    "price": price,
                    "licenses_name": licenses_name
                }]));
                Home.IncrementCart();
                toast.success("added");
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
                    toast.success("added");
                } else {
                    toast.warn("you have it in cart");
                }
            }
        }
    };

    static LikeOrFollow = (LikeOrFollow, id) => {
        if (token === Conf.configs.TokenVisitor) {
            document.getElementById("LoginRequire").click();
        } else if (LikeOrFollow === "like") {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            axios.post(Conf.configs.ServerApi + "api/medias/admire/" + id, {},{headers: new_headers}).then(() =>{
                toast.success("liked")
            }).catch(() => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            axios.post(Conf.configs.ServerApi + "api/admiration/admire_user/" + id, {},{headers: new_headers}).then(() =>{
                toast.success("followed");
                OtherProfile.UpdateStateFollowed();
            }).catch(() => {
                toast.warn("already followed");
            });
        };
    };

    static getIfToken = (special) => {
        try {
            let cookies = new Cookies();
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            return axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(() => {
                if (special) return true;
                else window.location.replace('/beats');
            }).catch(() => {
                return false
            })
        } catch (e) {}
    };

    static isNumber = (number_) => {
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

    static FillInCartProps = (headers, props) => {
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

    static changeFields = (that, e) => {that.setState({[e.target.id]: e.target.value})};

    render() {
        return(
            <ToastContainer/>
        )
    }

}

export default FunctionTools;
