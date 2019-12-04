import React, {Component} from "react";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import Cookies from "universal-cookie";
import {toast, ToastContainer} from "react-toastify";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import Cart from "../Cart/Cart";

// Global variable
let cookies = new Cookies();
let token;

try {
    token = cookies.get("Isl_Creative_pass")["Isl_Token"]
} catch (e) {
    token = Conf.configs.TokenVisitor
}

class FunctionTools extends Component {

    static FillInCartProps = (headers, props) => {
        axios.get(Conf.configs.ServerApi + "api/carts/MyCart", {headers: headers}).then(resp => {
            let tmp = 0;
            for (let row in resp.data) {tmp = tmp + resp.data[row]['price']}
            props.addTotalPrice(Math.round(tmp * 100) / 100);
            props.addCarts(resp.data);
        }).catch(err => {
            console.log(err)
        });
    };

    static async AddPropsCart(new_headers, props) {
        try {
            let carts = JSON.parse(localStorage.getItem("MyCarts"));

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
                    FunctionTools.AddPropsCart(headers, props);
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
                else window.location.replace('/home');
            }).catch(() => {
                return false
            })
        } catch (e) {}
    };

    render() {
        return(
            <ToastContainer/>
        )
    }

}

export default FunctionTools;
