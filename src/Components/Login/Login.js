import React, { Component } from "react";
import {NavLink, Redirect} from "react-router-dom";
import Cookies from 'universal-cookie';
import axios from 'axios';
import Modal from "react-awesome-modal";
import Conf from "../../Config/tsconfig";
import { ToastContainer, toast } from 'react-toastify';
import LoginFacebook from "../Facebook/Facebook";
import LoginGoogle from "../Google/Google";

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_route: '/', keys: '', loading : false, changePass: false, ResetPassword: false, visible: false,
            visibility: false, redirect: false, email: '', password: '', confirm_password: ''
        };
    }

    changeKeys = (e) => {this.setState({keys : e.target.value});};

    changeConfirmPassword = (e) => {this.setState({confirm_password: e.target.value});};

    changeEmail = (e) => {this.setState({email : e.target.value});};

    changePassword = (e) => {this.setState({password: e.target.value});};

    componentDidMount() {
        this.setState({loading : true});
        this.getIfToken();
    };

    getIfToken = () => {
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass");
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: new_headers}).then(resp => {
                    this.setState({redirect: true});
                }).catch(err =>{
                    if (err.response.data === "no choice music genre") {
                        this.setState({to_route: '/preference'});
                        this.setState({loading: false});
                        this.setState({redirect: true});
                    }
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password,
        };
        this.setState({loading : true});
        axios.post(Conf.configs.ServerApi + "api/users/login", data, {headers: headers}).then(response =>{
            const cookies = new Cookies();
            cookies.set("Isl_Creative_pass", {"name":response.data.name, "email":response.data.email, "Isl_Token":response.data.token});
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            this.setState({loading : false});
            axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: new_headers}).then(resp =>{
                this.setState({redirect: true});
            }).catch(err => {
                if (err.response.data === "no choice music genre") {
                    this.setState({to_route: '/preference'});
                    this.setState({loading: false});
                    this.setState({redirect: true});
                }
                toast.error(err.response.data);
            })
        }).catch(error =>{
            let response = JSON.stringify(error.response.data).replace(/"/g, '');
            if (response === "Active your account") {
                this.setState({visible: true}, () => {toast.error(response)});
            } else {
                toast.error(response);
            }
        })
    };

    verifyKeysSubmit = () => {
        const data = {
            email: this.state.email,
            keys: this.state.keys,
        };
        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data, {headers: headers}).then(response => {
            this.setState({visible: false});
            toast.success("validate, you can log now")
        }).catch(error =>{
            toast.error(error.response.data);
        })
    };

    verifyEmail = () => {
        const data = {
            email: this.state.email
        };
        axios.post(Conf.configs.ServerApi + "api/users/get_mail", data).then(response =>{
            console.log(response.data);
            this.setState({visibility: false});
            this.setState({ResetPassword: true});
        }).catch(error =>{
            let response = JSON.stringify(error.response.data);
            toast.error(response.replace(/"/g, ''));
        })
    };

    verifyKeysResetPass = () => {
        const data = {
            email: this.state.email,
            keys: this.state.keys,
        };

        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data).then(response =>{
            this.setState({ResetPassword: false});
            this.setState({changePass: true});
        }).catch(error =>{
            let response = JSON.stringify(error.response.data);
            toast.error(response.replace(/"/g, ''));
        })
    };

    changeMyPassword = (e) => {
        e.preventDefault();

        if (this.state.password === this.state.confirm_password) {
            let headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*"
            };

            let data = {
                email: this.state.email,
                password: this.state.password,
            };

            axios.put(Conf.configs.ServerApi + "api/users/reset_password", data, {headers: headers}).then(response =>{
                const cookies = new Cookies();
                cookies.set("Isl_Creative_pass", {"name":response.data.name, "email":response.data.email, "Isl_Token":response.data.token});
                console.log(cookies.get("Isl_Creative_pass"));
                this.setState({redirect: true});
            }).catch(error =>{
                if (data["password"].length < 8) {
                    toast.warn("password too short");
                } else {
                    let response = JSON.stringify(error.response.data);
                    toast.warn(response.replace(/"/g, ''));
                }
                toast.warn(error.response.data);
            })
        } else {
            toast.warn("Passwords Do Not Match");
        }
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={this.state.to_route}/>
        } else {
            return (
                <div id="primary" className="p-t-b-100 height-full">
                    {!this.state.changePass && !this.state.ResetPassword && !this.state.visibility && !this.state.visible ? <ToastContainer/>: null}
                    <a className="btn fab-right-top right-side absolute shadow btn-primary m-t-50" href="/home"><i className="icon-home-1"/></a>

                    <Modal visible={this.state.changePass} width="400" height="300" animationType='slide'>
                        <ToastContainer position="top-center"
                                        autoClose={5000}
                                        hideProgressBar={false}
                                        newestOnTop
                                        closeOnClick
                                        rtl={false}
                                        pauseOnVisibilityChange
                                        draggable
                                        pauseOnHover/>
                        <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                            <div className="col text-center">
                                <div className="body">
                                    <div className="custom-float">
                                        <label className="ModalFormField__Label" style={{paddingTop: "10px", color:"black"}}>New Password</label><br/>
                                        <input type="password" id="password" className="form-control"
                                               placeholder="At least 8 character" name="password"
                                               value={this.state.password}
                                               onChange={this.changePassword} required/>
                                    </div>
                                    <div className="custom-float">
                                        <label className="ModalFormField__Label" style={{paddingTop: "10px", color:"black"}}> Confirm_Password</label> <br/>
                                        <input type="password" id="confirm_password" className="form-control"
                                               placeholder="retype your password" name="confirm_password"
                                               value={this.state.confirm_password} onChange={this.changeConfirmPassword}
                                               required/>
                                    </div>
                                    <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.changeMyPassword}>Send</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal visible={this.state.ResetPassword} width="400" height="100" animationType='slide'>
                        <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                            <div className="col text-center">
                                <div className="body">
                                    <div className="custom-float">
                                        <input type="text" id="keys" className="form-control"
                                               placeholder="this key is in your mailbox" name="keys" value={this.state.keys}
                                               onChange={this.changeKeys} required/>
                                    </div>
                                    <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.verifyKeysResetPass}>Send</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal visible={this.state.visibility} width="400" height="200" animationType='slide'>
                        <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                            <button className="ModalClose" onClick={(e) => this.setState({visibility: false})}>
                                <i className="icon-close s-24" style={{color:"orange"}} />
                            </button>
                            <div className="col text-center">
                                <div className="body">
                                    <div className="custom-float center">
                                        <input type="email" id="email" className="form-control"
                                               placeholder="Your email here" name="email" value={this.state.email}
                                               onChange={this.changeEmail} required/>
                                    </div>
                                    <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.verifyEmail}>Send</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <Modal visible={this.state.visible} width="400" height="100" animationType='slide'>
                        <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                            <div className="col text-center">
                                <div className="body">
                                    <div className="custom-float">
                                        <input type="text" id="keys" className="form-control"
                                               placeholder="Type your key in your mailbox"
                                               name="keys" value={this.state.keys}
                                               onChange={this.changeKeys} required/>
                                    </div>
                                <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.verifyKeysSubmit}>Send</button>
                                </div>
                            </div>
                        </div>
                    </Modal>

                    <div className="container">
                        <div className="text-center s-14 l-s-2 my-5">
                            <a className="my-5" href="index.html">
                                <span>ISL CREATIVE</span>
                            </a>
                        </div>
                        <div className="row">
                            <div className="col-md-10 mx-md-auto">
                                <div className="mt-5">
                                    <div className="row grid">
                                        <div className="col-md-7 card p-5">
                                            <div className="form-material">
                                                {/* Input */}
                                                <div className="body">
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            <input type="email" className="form-control"
                                                                   placeholder="Enter your email"
                                                                   name="email" value={this.state.email}
                                                                   onChange={this.changeEmail} required/>
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            <input type="password" className="form-control"
                                                                   placeholder="Enter your password"
                                                                   name="password" value={this.state.password}
                                                                   onChange={this.changePassword} required/>
                                                        </div>
                                                    </div>
                                                    <div className="row ml-1">
                                                    <input onClick={this.handleSubmit}
                                                           className="btn btn-outline-primary btn-sm"
                                                           value="Log In"/>
                                                        {/*<LoginFacebook/>*/}
                                                        {/*<LoginGoogle/>*/}
                                                    </div>

                                                </div>
                                                {/* #END# Input */}
                                            </div>
                                            <div className="pt-5">
                                                <small>
                                                    <a
                                                        onClick={(e) => this.setState({visibility: true})}>Forgot
                                                        Password?
                                                    </a>
                                                </small>
                                            </div>
                                        </div>
                                        <div className="col-md-5  p-5">
                                            <h2 className="mt-3 font-weight-lighter">Are You New Here?</h2>
                                            <div className="pt-3 mb-5">
                                                <small>Welcome, register to benefit from all the offers of ISL</small>
                                            </div>
                                            <NavLink exact to="/register" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">
                                                <button className="btn btn-outline-primary btn-sm pl-4 pr-4"> Register </button>
                                            </NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default Login;
