import React, { Component } from "react";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import Cookies from "universal-cookie";
import {toast, ToastContainer} from "react-toastify";
import IslPlayer from "../Players/Players";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";

// Global variable
let cookies = new Cookies();
let token;
let _that;

try {
    token = cookies.get("Isl_Creative_pass")["Isl_Token"]
} catch (e) {
    token = Conf.configs.TokenVisitor
}

class FunctionTools extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, response: false
        };

        _that = this;
    }

    static AddToCart = (song_id, price, licenses_name, beat) => {
        if (token !== Conf.configs.TokenVisitor) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            let data = {
                "song_id": song_id,
                "price": price,
                "licenses_name": licenses_name
            };
            axios.post(Conf.configs.ServerApi + "api/carts/addToCart", data, {headers: new_headers}).then(resp => {
                toast.success(resp.data);
            }).catch(err => {
                toast.error(err.response.data);
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

    render() {
        return(
            <ToastContainer/>
        )
    }

}

export default FunctionTools;
