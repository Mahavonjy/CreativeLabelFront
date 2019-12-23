import React, { Component } from "react";
import "./Sign.css"
import axios from "axios";
import Conf from "../../../Config/tsconfig";
import {toast, ToastContainer} from "react-toastify";
import Modal from "react-awesome-modal";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../FunctionTools/CreateFields";
import {connect} from "react-redux";

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

    changeFields = (e) => {this.setState({[e.target.id]: e.target.value})};

    sendLoginCredentials = (e) => {
        e.preventDefault();

        let data = {
            email: this.state.email,
            password: this.state.password,
        };
        this.setState({loading : true}, () => {
            axios.post(Conf.configs.ServerApi + "api/users/login", data, {headers: headers}).then(response =>{
                localStorage.setItem("Isl_Credentials", JSON.stringify(response.data));
                this.setState({loading : false}, () => {
                    toast.success("Vous etes connecté");
                    document.getElementsByClassName("close")[0].click();
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                });
            }).catch(error =>{
                this.setState({loading : false}, () => {
                    let response = JSON.stringify(error.response.data).replace(/"/g, '');
                    if (response === "Veuillez activer votre compte") {
                        this.setState({visible: true}, () => {
                            toast.error(response)
                        });
                    } else {
                        this.setState({loading: false}, () => {
                            toast.error("email ou mot de passe incorrect")
                        });
                    }
                })
            })
        });
    };

    verifyKeysSubmit = () => {
        const data = {
            email: this.state.email,
            keys: this.state.keys,
        };
        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data, {headers: headers}).then(() => {
            this.setState({visible: false}, () => {toast.success("validate, you can log now")});
        }).catch(error =>{
            toast.error(error.response.data);
        })
    };

    verifyEmail = () => {
        axios.post(Conf.configs.ServerApi + "api/users/get_mail", {email: this.state.email}).then(() =>{
            this.setState({visibility: false, ResetPassword: true});
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

        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data).then(() =>{
            this.setState({ResetPassword: false, changePass: true});
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

    close = () => {document.getElementsByClassName("close")[0].click()};

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
                                    {this.props.InputCreate('password', this.state.password, this.changeFields, "Au moins 8 caractères", "password", true)}
                                </div>

                                <div className="custom-float">
                                    <label className="ModalFormField__Label" style={{paddingTop: "10px", color:"black"}}> Confirm_Password</label> <br/>
                                    {this.props.InputCreate('confirm_password', this.state.confirm_password, this.changeFields, "Entrez le mot de passe à nouveau", "password", true)}
                                </div>

                                <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.changeMyPassword}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal visible={this.state.ResetPassword} width="400" height="100" animationType='slide'>
                    <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                        <div className="col text-center">
                            <div className="body">
                                <div className="custom-float">
                                    {this.props.InputCreate('keys', this.state.keys, this.changeFields, "Inserer votre clé ici", "number", true)}
                                </div>
                                <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.verifyKeysResetPass}>Verifier</button>
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
                                    {this.props.InputCreate('email', this.state.email, this.changeFields, "E-mail", "email", true)}
                                </div>
                                <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.verifyEmail}>Envoyer</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal visible={this.state.visible} width="400" height="100" animationType='slide'>
                    <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                        <div className="col text-center">
                            <div className="body">
                                <div className="custom-float">
                                    {this.props.InputCreate('keys', this.state.keys, this.changeFields, "Inserer votre clé ici", "number", true)}
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

                        <input className="l-usr" placeholder="You email" name="email" id="email"
                               value={this.state.email} onChange={this.changeFields}/>

                        <div className="pass-wrap l-pass">
                            <input className="pass" placeholder="password" type="password" id="password"
                                   name="password" value={this.state.password} onChange={this.changeFields}/>
                        </div>

                        <button className="l-go" onClick={this.sendLoginCredentials}>Connexion</button>
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
                        {/* HERE IS REGISTER */}
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

const mapDispatch = (dispatch) => {
    return {
        InputCreate: bindActionCreators(CreateFields.CreateInput, dispatch),
    };
};

export default connect(null, mapDispatch)(SignInOrUp);
