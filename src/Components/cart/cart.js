import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Conf from "../../config/tsconfig";
import TestImg from "../../assets/images/demo/a2.jpg";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import PurchaseInformation from "./purchaseInformation";
import HomeRoot from "../home/homeRoot";
import {addCarts, addTotalPrice} from "../functionTools/functionProps";
import {LightModeToggle} from "../functionTools/createFields";

let headers = {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": '*',
    'Isl-Token': ''
};

function Cart(props) {

    const dispatch = useDispatch();
    const user_credentials = useSelector(state => state.Home.user_credentials);
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);

    const lightModeOn = LightModeToggle.lightModeOn;

    const isMounted = useRef(false);
    const [total_price, setTotalPrice] = useState(totalPrice);
    const [cart, setCart] = useState(carts);
    const [remove, setRemove] = useState(null);

    const deleteCart = async (song_id) => {
        setRemove(song_id);
        if (user_credentials.token === Conf.configs.TokenVisitor) {
            let Carts = await JSON.parse(localStorage.getItem("MyCarts"));
            let carts_tmp = [];
            for (let cart in Carts) {
                if (Carts[cart].song_id === song_id) {
                    let price = Math.round((total_price - Carts[cart].price) * 100) / 100;
                    dispatch(addTotalPrice((price)));
                    await setTotalPrice(price)
                } else carts_tmp.push(Carts[cart])
            }
            await localStorage.removeItem("MyCarts");
            dispatch(addCarts(carts_tmp));
            await setCart(carts_tmp);
            await localStorage.setItem("MyCarts", JSON.stringify(carts_tmp));
            await HomeRoot.Decrement();
            toast.success("suprimé avec succes");
            if (carts_tmp.length === 0) window.location.replace('/beats');
        } else {
            headers['Isl-Token'] = user_credentials.token;
            axios.delete("api/carts/delete/" + song_id, {headers: headers}).then(() => {
                let carts_tmp = [];
                for (let cart in carts) {
                    if (carts[cart].song_id === song_id) {
                        let price = Math.round((total_price - carts[cart].price) * 100) / 100;
                        dispatch(addTotalPrice((price)));
                        setTotalPrice(price)
                    } else carts_tmp.push(carts[cart])
                }
                if (carts_tmp.length === 0) window.location.replace('/beats');
                else {
                    setCart(carts_tmp);
                    dispatch(addCarts(carts_tmp));
                    HomeRoot.Decrement();
                    toast.success("suprimé avec succes");
                }
            }).catch(err => {
                try {
                    toast.error(err.response.data)
                } catch (e) {
                    console.log(err)
                }
            })
        }
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <div className="row no-gutters" >
                <div className="col-lg-6 no-b p-lg-3 m-t-10 ">
                    <div className="card-header theme-dark darken-1 card-border-top" >
                        <h3 className="border float-right fab-right-top relative shadow btn-outline-info btn-lg mt-3 pl-4 pr-4">
                            Total: {total_price}$
                        </h3>
                        <h4><i className="icon-cart-arrow-down mr-2 mb-5"/>Votre panier</h4>

                        <div className="d-flex justify-content-between">
                            <div className="align-self-end">
                                <ul className="nav nav-material nav-material-white card-header-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active show" id="w6--tab1" data-toggle="tab"
                                           href="#w6-tab1" role="tab" aria-controls="tab1" aria-expanded="true"
                                           aria-selected="true">
                                            Liste
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </div>
                    <div className="card-body no-p">
                        <div className="tab-content" id="v-pills-tabContent2">
                            <div className="tab-pane fade active show" id="w6-tab1" role="tabpanel"
                                 aria-labelledby="w6-tab1">
                                <div className="table-responsive theme-dark border scrollbar-isl card-border-bottom" style={{height: 400}}>
                                    <table className="table table-hover earning-box ">
                                        {cart ?
                                            <tbody>
                                            {cart.map((val, index) =>
                                                <tr className="no-b " key={index}>
                                                    <td className="w-10">
                                                        <figure className="avatar-md float-left  mr-3 mt-1">
                                                            <img className="r-3" src={val.media.photo || val.photo}
                                                                 alt=""/>
                                                        </figure>
                                                    </td>
                                                    <td>
                                                        <h6 className="text-center">{val.media.artist || val.artist}</h6>
                                                        <p className="text-muted text-center">{val.media.title || val.title}</p>
                                                    </td>
                                                    <td className="text-muted text-center">{val.price} $</td>
                                                    <td className="text-muted text-center">
                                                        {remove === val.song_id ?
                                                            <div className="preloader-wrapper small active">
                                                                <div className="spinner-layer spinner-red-only">
                                                                    <div className="circle-clipper left">
                                                                        <div className="circle"/>
                                                                    </div>
                                                                    <div className="gap-patch">
                                                                        <div className="circle"/>
                                                                    </div>
                                                                    <div className="circle-clipper right">
                                                                        <div className="circle"/>
                                                                    </div>
                                                                </div>
                                                            </div> :
                                                            <i className="icon-trash text-red s-24"
                                                               onClick={() => deleteCart(val.song_id)}/>}
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                            : <p className="p-t-100 text-center text-light align-content-center"> Votre
                                                panier est vide </p>}
                                    </table>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-lg-6 p-lg-3">
                    <div className={lightModeOn ? "mb-3 card p-3 bg-dark" : "mb-3 card p-3 bg-white"}>
                        <div>
                            <div className="mr-3 float-left text-center">
                                <div className="s-36"><i className="icon-music-player-3"/></div>
                            </div>
                            <div>
                                <div>
                                    <h4 className="text-primary">Beatmakers similaires</h4>
                                </div>
                                <small>D'autres créations similaires</small>
                            </div>
                        </div>
                        <ul className="playlist list-group list-group-flush" style={{height: 388}}>
                            <li className="list-group-item">
                                <div className="d-flex align-items-center">
                                    <div className="col-10">
                                        <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                            <img src={TestImg} alt=""/>
                                        </figure>
                                        <h6>Zoe Foe</h6>
                                        <small>5 Albums - 50 Songs</small>
                                    </div>
                                    <a href="/#" className="ml-auto"><i className="icon-user-plus"/></a>
                                    <a href="/#" className="ml-auto"><i className="icon-user-circle"/></a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <PurchaseInformation Cart={cart} TotalPrice={total_price} beats_cart/>

        </div>
    );
}

export default Cart;
