import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg from "../../assets/img/demo/a2.jpg";
import StripeCheckout from "react-stripe-checkout";
import {toast} from "react-toastify";

let cookies = new Cookies();
class Cart extends Component {
    ToPlay;
    IfToken;
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loading: false,
            cart: [],
        };
    }

    getCart = () =>{
        try {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/carts/MyCart", {headers: new_headers}).then(resp =>{
                for (let row in resp.data) {
                    this.setState(prevState => ({
                        cart: [...prevState.cart, resp.data[row]]
                    }))
                }
            }).catch(err => {
                console.log(err.response)
            })
        } catch (e) {
            this.setState({cart: JSON.parse(localStorage.getItem("MyCarts"))})
        }
    };

    deleteCart = (i) =>{
        try {
            let headers = {
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin":'*',
                'Isl-Token':  cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.delete(Conf.configs.ServerApi + "api/carts/delete/" + i , {headers: headers}).then(resp =>{
               toast.success(resp.data)
            }).catch(err => {
                console.log(err.response)
            })
        } catch (e) {
            let Carts = JSON.parse(localStorage.getItem("MyCarts"));
            Carts.splice(Carts.findIndex(item => item.song_id === i.target.id));
            localStorage.removeItem("MyCarts");
            this.setState({cart: Carts}, () => {localStorage.setItem("MyCarts",  JSON.stringify(Carts))})
        }
    };

    HandleTokenStripe = (token, addresses) => {
        try {
            let headers = {
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin":'*',
                'Isl-Token':  cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            let data = {
                "stripe_token": token,
                "addresses": addresses,
                "MyCarts": this.state.cart
            };
            axios.post(Conf.configs.ServerApi + "api/beats/payment/beatShop", data,{headers: headers}).then(resp =>{
                console.log(resp.data);
            }).catch(err => {
                console.log(err.response)
            })
        } catch (e) {
            let headers = {
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin":'*'
            };
            let data = {
                "stripe_token": token,
                "addresses": addresses,
                "MyCarts": this.state.cart
            };
            axios.post(Conf.configs.ServerApi + "api/beats/payment/beatShop", data,{headers: headers}).then(resp =>{
                console.log(resp.data);
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    componentDidMount() {
        this.getCart();
    }

    render() {
        return (
            <div className="Base">
                <div className="row no-gutters">
                <div className="col-lg-8 no-b p-lg-3 m-t-10 ">
                <div className="card-header dark-grey darken-1 text-white">
                <h4><i className="icon-message mr-2 mb-5" />Your Cart</h4>
                <div className="d-flex justify-content-between">
                    <div className="align-self-end">
                        <ul className="nav nav-material nav-material-white card-header-tabs" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active show" id="w6--tab1" data-toggle="tab" href="#w6-tab1" role="tab" aria-controls="tab1" aria-expanded="true" aria-selected="true">
                                    List
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                </div>
                <div className="card-body no-p">
                    <div className="tab-content" id="v-pills-tabContent2">
                        <div className="tab-pane fade active show" id="w6-tab1" role="tabpanel" aria-labelledby="w6-tab1">
                            <div className="table-responsive border black" style={{height: 400}}>
                                <table className="table table-hover earning-box ">
                                    <tbody>
                                    {this.state.cart.map((val, index) =>
                                    <tr className="no-b " key={index}>
                                        <td className="w-10">
                                            <figure className="avatar-md float-left  mr-3 mt-1">
                                                <img className="r-3" src={val.media.photo || val.photo} alt="" />
                                            </figure>
                                        </td>
                                        <td>
                                            <h6 className="text-center">{val.media.artist || val.artist}</h6>
                                            <p className="text-muted text-center">{val.media.title || val.title}</p>
                                        </td>
                                        <td className="text-muted text-center">{val.price} $</td>
                                        <td className="text-muted text-center">
                                            <i className="icon-trash text-red s-24"
                                               id={val.id}
                                               onClick={(e) => this.deleteCart(e)}>
                                            </i>
                                        </td>
                                    </tr>
                                    )}
                                    </tbody>
                                </table>
                                <StripeCheckout
                                    className="btn border fab-right-bottom absolute shadow btn-primary"
                                    style={{marginBottom: "40px"}}
                                    stripeKey="pk_test_Wg94pwR4mTzxLSdh5CL8JMRb"
                                    token={this.HandleTokenStripe}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                    <div className="col-lg-4 p-lg-3">
                        <div className="mb-3 card p-3">
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36"><i className="icon-music-player-3"/></div>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-primary">Same Artist</h4>
                                    </div>
                                    <small> Artist with the same beats</small>
                                </div>
                            </div>
                            <ul className="playlist list-group bg-black list-group-flush" style={{height: 388}}>
                                <li className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <div className="col-10">
                                            <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                <img src={TestImg} alt="" />
                                            </figure>
                                            <h6>Zoe Foe</h6>
                                            <small>5 Albums - 50 Songs</small>
                                        </div>
                                        <a href="#" className="ml-auto"><i className="icon-user-plus" /></a>
                                        <a href="#" className="ml-auto"><i className="icon-user-circle" /></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;
