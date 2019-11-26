import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./Sign.css"
import Cookies from "universal-cookie";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import {toast, ToastContainer} from "react-toastify";
import Modal from "react-awesome-modal";

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

class SignInOrUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to_route: '/', keys: '', loading : false, changePass: false, ResetPassword: false, visible: false,
            visibility: false, redirect: false, email: '', password: '', confirm_password: '', isMounted: false,
        };
    }

    changeKeys = (e) => {this.setState({keys : e.target.value})};

    changeConfirmPassword = (e) => {this.setState({confirm_password: e.target.value})};

    changeEmail = (e) => {this.setState({email : e.target.value})};

    changePassword = (e) => {this.setState({password: e.target.value})};

    changeName = (e) => {this.setState({name: e.target.value});};

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
                toast.success("You are logged");
                document.getElementsByClassName("close")[0].click();
                window.location.reload();
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }).catch(err => {
                try {
                    if (err.response.data === "no choice music genre") {
                        this.setState({to_route: '/preference'}, () => {
                            this.setState({loading: false});
                            window.location.replace(this.state.to_route)
                        });
                    } else {
                        console.log(err)
                    }
                } catch (e) {
                    console.log(err)
                }
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

            axios.put(Conf.configs.ServerApi + "api/users/reset_password", data, {headers: headers}).then(() => {
                toast.success("Password updated");
                this.setState({changePass: false});
            }).catch(error => {
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

    onClickSignUp = () => {
        let right = document.getElementsByClassName("right")[0];
        let left = document.getElementsByClassName("left")[0];
        right.classList.replace('r-inactive', 'r-active');
        right.style.transform = 'rotate(-31deg) translate(-650px, 115px)';
        right.style.transition = '0.4s ease-in-out';
        let lbtn = document.getElementsByClassName("l-btn")[0];
        let ldisc = document.getElementsByClassName("l-disc")[0];
        let rdisc = document.getElementsByClassName("r-disc")[0];
        let rbtn = document.getElementsByClassName("r-btn")[0];
        lbtn.style.display = 'block';
        ldisc.style.display = 'block';
        rdisc.style.display = 'none';
        rbtn.style.display = 'none';
        left.classList.replace('l-inactive', 'l-active');
        left.style.transform = 'rotate(-31deg) translate(-60px, -184px)';
        left.style.transition = '0.4s ease-in-out';
    };

    onClickSignIn = () => {
        let right = document.getElementsByClassName("right")[0];
        let left = document.getElementsByClassName("left")[0];

        right.classList.replace('r-active', 'r-inactive');
        right.style.transform = 'rotate(-31deg) translate(-50px, 116px)';
        right.style.transition = '0.4s ease-in-out';
        let lbtn = document.getElementsByClassName("l-btn")[0];
        let ldisc = document.getElementsByClassName("l-disc")[0];
        let rdisc = document.getElementsByClassName("r-disc")[0];
        let rbtn = document.getElementsByClassName("r-btn")[0];
        lbtn.style.display = 'none';
        ldisc.style.display = 'none';
        rdisc.style.display = 'block';
        rbtn.style.display = 'block';
        left.classList.replace('l-inactive', 'l-active');
        left.style.transform = 'rotate(-31deg) translate(-660px, -184px)';
        left.style.transition = '0.4s ease-in-out';
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    close = () => {
        document.getElementsByClassName("close")[0].click();
    };

    render() {
        return (
            <div>
                {!this.state.changePass && !this.state.ResetPassword && !this.state.visibility && !this.state.visible ? <ToastContainer/>: null}

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

                <div className="container-login">
                    <div className="absolute text-red ml-2" style={{zIndex: 99}}>
                        <i className="icon-window-close s-36" onClick={this.close}/>
                    </div>
                    <div className="row l-form">

                        <input className="l-usr" placeholder="You email" name="email"
                               value={this.state.email} onChange={this.changeEmail}/>

                        <div className="pass-wrap l-pass">
                            <input className="pass" placeholder="password" type="password"
                                   name="password" value={this.state.password} onChange={this.changePassword}/>
                        </div>

                        <button className="l-go" onClick={this.handleSubmit}>Connexion</button>
                        <small className="f-p" onClick={(e) => this.setState({visibility: true})}>Forgot password?</small>
                    </div>
                    {this.state.loading ?
                    <div className="absolute preloader-wrapper small active" style={{marginLeft: 400}}>
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
                    </div> : null}

                    <div className="r-form">
                        <input className="r-usr"
                               placeholder="Votre nom"
                               name="name"
                               value={this.state.name}
                               onChange={this.changeName}/>

                        <input className="r-email" placeholder="E-mail"
                               name="email" value={this.state.email}
                               onChange={this.changeEmail}/>

                        <div className="pass-wrap r-pass">
                            <input className="pass" type="password"
                                   placeholder="Au moins 8 caractères"
                                   name="password" value={this.state.password}
                                   onChange={this.changePassword}/>
                        </div>

                        <div className="pass-wrap r-con">
                            <input className="pass" type="password"
                                   placeholder="Entrez le mot de passe à nouveau"
                                   name="confirm_password"
                                   value={this.state.confirm_password}
                                   onChange={this.changeConfirmPassword}/>
                        </div>

                        <button className="r-go">Inscription</button>
                    </div>
                    <div className="l-overlay l-inactive left">
                        <div className="tri-l tri-l1"/>
                        <div className="tri-l tri-l2"/>
                        <div className="tri-l tri-l3"/>
                        <div className="tri-l tri-l4"/>
                        <div className="tri-l tri-l5"/>
                    </div>
                    <div className="r-overlay r-inactive right">
                        <div className="tri-r tri-r1"/>
                        <div className="tri-r tri-r2"/>
                        <div className="tri-r tri-r3"/>
                        <div className="tri-r tri-r4"/>
                        <div className="tri-r tri-r5"/>
                    </div>
                    <small className="l-disc" style={{display: 'none'}}>Already have an account?</small>
                    <small className="r-disc">Don't have an account?</small>
                    <button className="l-btn" onClick={this.onClickSignIn}>SIGN IN</button>
                    <button className="r-btn" onClick={() => window.location.replace('/register')}>SIGN UP</button>
                </div>
            </div>
        );
    }
}

export default SignInOrUp;
