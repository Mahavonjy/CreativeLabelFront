import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg from "../../assets/img/demo/a2.jpg";
import {toast, ToastContainer} from "react-toastify";
import {connect} from "react-redux";
import PurchaseInformation from "./PurchaseInformation";
import Home from "../Home/Home";

let cookies = new Cookies();
class Cart extends Component {
    ToPlay;
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loading: false,
            total_price: this.props.total_price,
            cart: this.props.cart,
            isMounted: false,
            delete: null
        };
    }

    getCart = () => {
        try {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            if (this.state.cart.length === 0) {
                axios.get(Conf.configs.ServerApi + "api/carts/MyCart", {headers: new_headers}).then(resp => {
                    let tmp = 0;
                    for (let row in resp.data) {
                        tmp = tmp + resp.data[row]['price'];
                        this.setState(prevState => ({cart: [...prevState.cart, resp.data[row]]}));
                    }
                    this.setState({total_price: Math.round(tmp * 100) / 100});
                }).catch(err => {
                    console.log(err.response)
                })
            }
        } catch (e) {
            this.setState({cart: JSON.parse(localStorage.getItem("MyCarts"))}, () => {
                let carts = JSON.parse(localStorage.getItem("MyCarts"));
                let tmp = 0;
                for (let cart in carts) {tmp = tmp + carts[cart].price;}
                this.setState({total_price: Math.round(tmp * 100) / 100})
            })
        }
    };

    deleteCart = (song_id, id) => {
        this.setState({delete: song_id}, () => {
            try {
                let headers = {
                    "Content-Type":'application/json',
                    "Access-Control-Allow-Origin":'*',
                    'Isl-Token':  cookies.get("Isl_Creative_pass")["Isl_Token"]
                };

                axios.delete(Conf.configs.ServerApi + "api/carts/delete/" + id , {headers: headers}).then(resp => {
                    let tmp = this.state.cart;
                    for (let cart in tmp) {
                        if (tmp[cart].id === id) this.state.cart.splice(this.state.cart.indexOf(tmp[cart]), 1);
                    }
                    toast.success("deleted");
                    Home.Decrement();
                    if (tmp.length === 0) window.location.replace('/beats')
                }).catch(err => {
                    console.log(err.response)
                })
            } catch (e) {
                toast.success("deleted");
                let Carts = JSON.parse(localStorage.getItem("MyCarts"));
                let carts_tmp = [];
                for (let cart in Carts) {
                    if (Carts[cart].song_id === song_id) {
                        this.setState({total_price: Math.round((this.state.total_price - Carts[cart].price) * 100) / 100 })
                    } else carts_tmp.push(Carts[cart])
                }
                localStorage.removeItem("MyCarts");
                this.setState({cart: carts_tmp}, () => {
                    localStorage.setItem("MyCarts",  JSON.stringify(carts_tmp));
                    Home.Decrement();
                });
            }
        });
    };

    componentDidMount() {
        this.setState({isMounted: true}, () => {this.getCart();});
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="Base">
                <ToastContainer/>
                <div className="row no-gutters">
                    <div className="col-lg-6 no-b p-lg-3 m-t-10 ">
                <div className="card-header dark-grey darken-1 text-white">
                    <h3 className="border float-right fab-right-top relative shadow btn-outline-info btn-lg mt-3 pl-4 pr-4">
                        Total: {this.state.total_price}$
                    </h3>
                    <h4><i className="icon-cart-arrow-down mr-2 mb-5" />Your Cart</h4>

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
                                    {this.state.cart ?
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
                                            {this.state.delete === val.song_id ?
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
                                                </div>:<i className="icon-trash text-red s-24" onClick={() => this.deleteCart(val.song_id, val.id)}/>
                                            }

                                        </td>
                                    </tr>
                                    )}
                                    </tbody>
                                        : <p className="p-t-100 text-center text-light align-content-center"> Your Cart is empty </p>}
                                </table>
                            </div>
                        </div>
                    </div>

                </div>
                </div>
                    <div className="col-lg-6 p-lg-3">
                        <div className="mb-3 card p-3">
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36"><i className="icon-music-player-3"/></div>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-primary">Same Artist</h4>
                                    </div>
                                    <small>Artist with the same beats</small>
                                </div>
                            </div>
                            <ul className="playlist list-group bg-dark list-group-flush" style={{height: 388}}>
                                <li className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <div className="col-10">
                                            <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                <img src={TestImg} alt="" />
                                            </figure>
                                            <h6>Zoe Foe</h6>
                                            <small>5 Albums - 50 Songs</small>
                                        </div>
                                        <a href="/#" className="ml-auto"><i className="icon-user-plus" /></a>
                                        <a href="/#" className="ml-auto"><i className="icon-user-circle" /></a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <PurchaseInformation Cart={this.state.cart} TotalPrice={this.state.total_price}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart: state.Carts.carts,
        total_price: state.Carts.total_price,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
