import React, { useState } from "react";
import axios from "axios";
import Conf from "../../../Config/tsconfig";
import {toast, ToastContainer} from "react-toastify";
import Modal from "react-awesome-modal";
import * as CreateFields from "../../FunctionTools/CreateFields";
import * as Tools from "../../FunctionTools/Tools";
import { saveUserCredentials } from "../../FunctionTools/Tools";
import "./Sign.css"
import {smallSpinner} from "../../FunctionTools/CreateFields";
import {sessionService} from "redux-react-session";
import LoginGoogle from "../SocialCredentials/Google/Google";
import LoginFacebook from "../SocialCredentials/Facebook/Facebook";

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

function Login() {

    const [loading, setLoading] = useState(false);
    const [keys, setKeys] = useState('');
    const [changePass, setChangePass] = useState(false);
    const [resetPassword, setResetPassword] = useState(false);
    const [visible, setVisible] = useState(false);
    const [visibility, setVisibility] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const sendLoginCredentials = (e) => {
        e.preventDefault();

        let data = { email: email, password: password };
        setLoading(true);
        axios.post( "api/users/login", data, {headers: headers}).then(async response => {
            const { token } = response.data;
            setLoading(false);
            toast.success("Vous etes connecté");
            document.getElementsByClassName("close")[0].click();
            await sessionService.saveSession({ token });
            await sessionService.saveUser(response.data);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }).catch(error => {
            setLoading(false);
            let response = JSON.stringify(error.response.data).replace(/"/g, '');
            if (response === "Veuillez activer votre compte") {
                setVisible(true);
                toast.error(response)
            } else toast.error("email ou mot de passe incorrect")
        })
    };

    const verifyKeysSubmit = () => {
        setLoading(true);
        let data = { email: email, password: password };
        axios.post( "api/users/get_if_keys_validate", data, {headers: headers}).then(() => {
            setLoading(false);
            setVisible(false);
            toast.success("validé, vous pouvez vous reconnecter")
        }).catch(error =>{
            setLoading(false);
            toast.error(error.response.data);
        })
    };

    const verifyEmail = () => {
        setLoading(true);
        axios.post( "api/users/get_mail", {email: email}).then(() => {
            setVisibility(false);
            setLoading(false);
            setResetPassword(true);
        }).catch(error =>{
            setLoading(false);
            let response = JSON.stringify(error.response.data);
            toast.error(response.replace(/"/g, ''));
        })
    };

    const verifyKeysResetPass = () => {
        setLoading(true);
        let data = { email: email, keys: keys };
        axios.post("api/users/get_if_keys_validate", data).then(() => {
            setLoading(false);
            setResetPassword(false);
            setChangePass(true);
        }).catch(error =>{
            setLoading(false);
            let response = JSON.stringify(error.response.data);
            toast.error(response.replace(/"/g, ''));
        })
    };

    const changeMyPassword = (e) => {
        e.preventDefault();

        if (password === confirm_password) {
            setLoading(true);
            let data = { email: email, password: password };
            axios.put("api/users/reset_password", data, {headers: headers}).then(() => {
                setLoading(false);
                toast.success("Password updated");
                setChangePass(false);
            }).catch(error => {
                setLoading(false);
                if (data["password"].length < 8) {
                    toast.warn("password too short");
                } else {
                    let response = JSON.stringify(error.response.data);
                    toast.warn(response.replace(/"/g, ''));
                }
                toast.warn(error.response.data);
            })
        } else {
            setLoading(false);
            toast.warn("Passwords Do Not Match");
        }
    };

    return (
        <div>
            {!changePass && !resetPassword && !visibility && !visible && <ToastContainer/>}

            <Modal visible={changePass} width="400" height="300" animationType='slide'>
                {loading && smallSpinner("absolute", "0")}
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <div className="col text-center">
                        <div className="body">
                            <h3 className="text-light pt-5 mb-3">Crée votre nouveau mot de passe</h3>
                            <div className="custom-float">
                                <label className="ModalFormField__Label" style={{paddingTop: "10px", color:"black"}}>Nouveau mot de passe</label><br/>
                                {CreateFields.CreateInput('password', password, (e) => {Tools.changeFields(setPassword, e)}, "Au moins 8 caractères", "password", true)}
                            </div>

                            <div className="custom-float">
                                <label className="ModalFormField__Label" style={{paddingTop: "10px", color:"black"}}>confirmer</label> <br/>
                                {CreateFields.CreateInput('confirm_password', confirm_password, (e) => {Tools.changeFields(setConfirmPassword, e)}, "Entrez le mot de passe à nouveau", "password", true)}
                            </div>

                            <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e) => changeMyPassword(e)}>Envoyer</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal visible={resetPassword} width="400" height="100" animationType='slide'>
                {loading && smallSpinner("absolute", "0")}
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <div className="col text-center">
                        <div className="body">
                            <h3 className="text-light pt-5 mb-3">Verifier votre clé</h3>
                            <div className="custom-float">
                                {CreateFields.CreateInput('keys', keys, (e) => {Tools.changeFields(setKeys, e)}, "Inserer votre clé ici", "number", true)}
                            </div>
                            <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={() => verifyKeysResetPass()}>Verifier</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal visible={visibility} width="400" height="150" animationType='slide'>
                {loading && smallSpinner("absolute", "0")}
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <button className="ModalClose" onClick={(e) => setVisibility(false)}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <div className="body">
                            <h3 className="text-light pt-5 mb-3">Verifier votre adresse mail</h3>
                            <div className="custom-float center">
                                {CreateFields.CreateInput('email', email, (e) => {Tools.changeFields(setEmail, e)}, "E-mail", "email", true)}
                            </div>
                            <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={() => verifyEmail()}>Envoyer</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal visible={visible} width="400" height="100" animationType='slide'>
                {loading && smallSpinner("absolute", "0")}
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <div className="col text-center">
                        <div className="body">
                            <h3 className="text-light pt-5 mb-3">Verifier votre clé</h3>
                            <div className="custom-float">
                                {CreateFields.CreateInput('keys', keys, (e) => {Tools.changeFields(setKeys, e)}, "Inserer votre clé ici", "number", true)}
                            </div>
                            <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={() => verifyKeysSubmit()}>Envoyer</button>
                        </div>
                    </div>
                </div>
            </Modal>

            <div className="container-login">
                <div className="absolute text-red ml-2" style={{zIndex: 99}}>
                    <i className="icon-window-close s-36" onClick={() => document.getElementsByClassName("close")[0].click()}/>
                </div>
                <div className="row l-form">

                    <input className="l-usr" placeholder="You email" name="email" id="login-email"
                           value={email} onChange={(e) => {Tools.changeFields(setEmail, e)}}/>

                    <div className="pass-wrap l-pass">
                        <input className="pass" placeholder="password" type="password" id="login-password"
                               name="password" value={password} onChange={(e) => {Tools.changeFields(setPassword, e)}}/>
                    </div>

                    <button className="l-go btn btn-outline-success" onClick={(e) => sendLoginCredentials(e)}>Connexion</button>
                    <small className="f-p" onClick={() => setVisibility(true)}>Forgot password?</small>
                </div>
                {loading &&
                <div className="absolute preloader-wrapper small active" style={{marginLeft: 400}}>
                    <div className="spinner-layer spinner-red-only">
                        <div className="circle-clipper left"><div className="circle"/></div>
                        <div className="gap-patch"><div className="circle"/></div>
                        <div className="circle-clipper right"><div className="circle"/></div>
                    </div>
                </div>}

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
                <div className="col-md-6 right float-right m-t-150 pt-4 mr-2">
                    <LoginGoogle Label="Connecter avec Google"/>
                    <LoginFacebook Label="Connecter avec Facebook"/>
                </div>
                <small className="r-disc">Vous n'avez pas de compte ?</small>
                <button className="r-btn btn btn-outline-danger" onClick={() => window.location.replace('/register')}>Inscrivez vous ici</button>
            </div>
        </div>
    );
}

export default Login;
