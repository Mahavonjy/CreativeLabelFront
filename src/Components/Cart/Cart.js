import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";

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
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/carts/MyCart", {headers: new_headers}).then(resp =>{
            console.log(resp.data);
            for(let row in resp.data){
                this.setState(prevState => ({
                    cart: [...prevState.cart, resp.data[row]]
                }))
            }
        }).catch(err => {
            console.log(err.response)
        })
    };

    deleteCart = (i) =>{
        let cookies = new Cookies();
        let headers = {
            "Content-Type":'application/json',
            "Access-Control-Allow-Origin":'*',
            'Isl-Token':  cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/carts/delete/"+i , {headers: headers}).then(resp =>{
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response)
        })
    };

    componentDidMount() {
        this.getCart();
    }

    render() {
        return (
            <div className="Base">
                <div className="card-body no-p">
                    <div className="tab-content" id="v-pills-tabContent1">
                        <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">
                            <div className="playlist pl-lg-3 pr-lg-3">
                                <div className="m-1 my-4">
                                    {this.state.cart.map((val, index) =>
                                    <div className="d-flex align-items-center" key={index}>
                                        <div className="col-1">
                                            <a className="no-ajaxy media-url" href="assets/media/track1.mp3" data-wave="assets/media/track1.json">
                                                <i className="icon-play s-28" />
                                            </a>
                                        </div>
                                        <div className="col-md-6">
                                            <figure className="avatar-md float-left  mr-3 mt-1">
                                                <img className="r-3" src={val.media.photo} alt="" />
                                            </figure>
                                            <h6>{val.media.title}</h6>{val.media.artist}
                                        </div>
                                        <div className="col-md-5 d-none d-lg-block">
                                            <div className="d-flex">
                                                <span className="ml-auto"> {val.price} $</span>
                                            </div>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="col text-center btn btn-outline-info btn-sm pl-1 pr-1" style={{marginTop: 50}}>Purchase</button>
            </div>
        );
    }
}

export default Cart;
