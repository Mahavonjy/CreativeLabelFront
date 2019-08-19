import React, { Component } from "react";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';
import Conf from "../../Config/tsconfig";
import Modal from 'react-awesome-modal';
import {ToastContainer, toast} from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: '', isActive: false, visible: false, redirect: false,
            email: '', password: '', confirm_password: '', name: '',
        };
    }
    changeKeys = (e) => {this.setState({keys : e.target.value});};
    changeEmail = (e) => {this.setState({email : e.target.value});};
    changeConfirmPassword = (e) => {this.setState({confirm_password: e.target.value});};
    changePassword = (e) => {this.setState({password: e.target.value});};
    changeName = (e) => {this.setState({name: e.target.value});};

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.password.length < 8) {
            toast.error("Password too short");
        } else {
            if (this.state.password === this.state.confirm_password) {
                let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
                let data = {name: this.state.name, email: this.state.email, password: this.state.password,};
                this.setState({isActive: true});
                axios.post(Conf.configs.ServerApi + "api/users/register", data, {headers: headers}).then(response => {
                    this.setState({isActive: false});
                    const cookies = new Cookies();
                    cookies.set("Isl_Creative_pass", {
                        "name": response.data.name,
                        "email": response.data.email,
                        "Isl_Token": response.data.token
                    });
                    toast.success("email send, Check your mailbox");
                    this.setState({visible: true});
                }).catch(error => {
                    this.setState({isActive: false});
                    if (error.response.data.email) {
                        toast.error(error.response.data.email[0]);
                    } else {
                        let response = JSON.stringify(error.response.data);
                        toast.error(response.replace(/"/g, ''));
                    }
                    toast.error(error.response.data);
                })
            } else {
                toast.error("Passwords Do Not Match")
            }
        }
    };

    verifyKeysSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email,
            keys: this.state.keys,
        };

        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data).then(response =>{
            this.setState({redirect: true});
        }).catch(error =>{
            let response = JSON.stringify(error.response.data);
            toast.error(response.replace(/"/g, ''));
        })
    };

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/preference" />
        } else {
            return (
                <main>
                    {!this.state.visible? <ToastContainer/>: null}
                    <LoadingOverlay active={this.state.isActive}
                                    spinner text="I'm sending you confirmation mail ..."
                                    styles={{
                                        spinner: (base) => ({
                                            ...base,
                                            width: '25px',
                                            margin_bottom: '10px',
                                            '& svg circle': {
                                                stroke: '#A4B129'
                                            }
                                        })
                                    }}
                    />
                        <Modal visible={this.state.visible} width="400" height="200" animationType='slide'>
                            <ToastContainer position="top-center"
                                            autoClose={5000}
                                            hideProgressBar={false}
                                            newestOnTop
                                            closeOnClick
                                            rtl={false}
                                            pauseOnVisibilityChange
                                            draggable
                                            pauseOnHover/>
                            <form onSubmit={this.verifyKeysSubmit} className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                                <div className="col text-center">
                                <div className="body">
                                    <label className="form-label" htmlFor="password" style={{paddingTop: "10px", color:"black"}}>Confirm your Email for activate your acount</label>
                                    <div className="custom-float">
                                        <div className="form-line">
                                            <input type="text" id="keys" className="form-control"
                                                   placeholder="Keys"
                                                   name="keys" value={this.state.keys}
                                                   onChange={this.changeKeys} required/>
                                        </div>
                                    </div>
                                </div>
                                    <button className="btn btn-outline-success btn-sm pl-4 pr-4">Send</button>
                                </div>
                            </form>
                        </Modal>
                    <div id="primary" className="p-t-b-100 height-full">
                        <div className="container">
                            <div className="text-center s-14 l-s-2 my-5">
                                <a className="my-5" href="/">
                                    <span>ISL CREATIVE</span>
                                </a>
                            </div>
                            <div className="row">
                                <div className="col-md-10 mx-md-auto">
                                    <div className="mt-5">
                                        <div className="row grid">
                                            <div className="col-md-7 card p-5">
                                                <form className="form-material" onSubmit={this.handleSubmit}>
                                                    {/* Input */}
                                                    <div className="body">
                                                        <div className="form-group form-float">
                                                            <div className="form-line">
                                                                <input type="text" id="name" className="form-control"
                                                                       placeholder="Enter your name" name="name"
                                                                       value={this.state.name}
                                                                       onChange={this.changeName} required/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-float">
                                                            <div className="form-line">
                                                                <input type="email" id="email" className="form-control"
                                                                       placeholder="Enter your email"
                                                                       name="email" value={this.state.email}
                                                                       onChange={this.changeEmail} required/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-float">
                                                            <div className="form-line">
                                                                <input type="password" id="password"
                                                                       className="form-control"
                                                                       placeholder="At least 8 character"
                                                                       name="password" value={this.state.password}
                                                                       onChange={this.changePassword} required/>
                                                            </div>
                                                        </div>
                                                        <div className="form-group form-float">
                                                            <div className="form-line">
                                                                <input type="password" id="password"
                                                                       className="form-control"
                                                                       placeholder="retype your password"
                                                                       name="confirm_password"
                                                                       value={this.state.confirm_password}
                                                                       onChange={this.changeConfirmPassword} required/>
                                                            </div>
                                                        </div>
                                                        <input type="submit"
                                                               className="btn btn-outline-primary btn-sm pl-4 pr-4"
                                                               value="Register"/>
                                                    </div>
                                                    {/* #END# Input */}
                                                </form>
                                            </div>
                                            <div className="col-md-5  p-5">
                                                <h1 className="mt-3 font-weight-lighter">Are you already
                                                    registered?</h1>
                                                <NavLink to="/login" activeClassName="PageSwitcher__Item--Active"
                                                         className="PageSwitcher__Item"><button className="btn btn-outline-primary btn-sm pl-4 pr-4">Login</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            );
        }
    }
}

export default Register;
