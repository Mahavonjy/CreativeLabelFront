import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useSelector} from "react-redux";
import {toast, ToastContainer} from "react-toastify";
import {sessionService} from "redux-react-session";
import * as CreateFields from "../../FunctionTools/CreateFields";
import {checkUnit, generateBodyFormOfGallery} from "../../FunctionTools/Tools";
import * as Tools from "../../FunctionTools/Tools";
import * as Validators from "../../Validators/Validatiors";
import LoginFacebook from "../SocialCredentials/Facebook/Facebook";
import LoginGoogle from "../SocialCredentials/Google/Google";

function RegisterForm(props) {

    const PropsCountry = useSelector(state => state.KantoBizForm.country);
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
    const PropsOthersCity = useSelector(state => state.KantoBizForm.others_city);
    const PropsDescription = useSelector(state => state.KantoBizForm.description);
    const props_events_selected = useSelector(state => state.KantoBizForm.events_selected);
    const props_price_of_service = useSelector(state => state.KantoBizForm.price_of_service);
    const props_preparation_time = useSelector(state => state.KantoBizForm.preparation_time);
    const props_number_of_artist = useSelector(state => state.KantoBizForm.number_of_artist);
    const props_unit_time_of_preparation = useSelector(state => state.KantoBizForm.unit_time_of_preparation);
    const props_unit_time_of_service = useSelector(state => state.KantoBizForm.unit_time_of_service);
    const props_service_time = useSelector(state => state.KantoBizForm.service_time);
    const props_thematics_options_selected = useSelector(state => state.KantoBizForm.thematics_options_selected);

    const isMounted = useRef(false);
    const [keys, setKeys] = useState("");
    const [disable, setDisable] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [user_credentials, setUserCredentials] = useState({});
    const [visible, setVisible] = useState(false);

    const verifyKeysSubmit = (e) => {
        e.preventDefault();

        const data = {email: email, keys: keys};
        axios.post("api/users/get_if_keys_validate", data).then(async (data) => {
            await sessionService.saveSession({token: user_credentials.token}).then(() => {
                sessionService.saveUser(user_credentials);
            });
            window.location.replace('/preference');
        }).catch(error => {
            let errorMessage = Validators.checkErrorMessage(error);
            toast.error(errorMessage.message)
        })
    };

    const sendUserInfoToSingUp = (e) => {
        e.preventDefault();

        setDisable(true);
        const validator = Validators.RegisterValidation(password, confirm_password);

        if (validator.error) {
            setDisable(false);
            toast.error(validator.message);
        } else {
            props.setIsActive(true);
            let headers = {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': "*"};
            let bodyFormData = new FormData();
            bodyFormData.append('name', name);
            bodyFormData.append('email', email);
            bodyFormData.append('password', password);
            if (props.tmpArtistTypeSelected) {
                generateBodyFormOfGallery(bodyFormData, PropsFiles);
                bodyFormData.append('user_type', props.tmpArtistTypeSelected);
                bodyFormData.append('services', JSON.stringify({
                    "title": PropsTitle,
                    "price": props_price_of_service,
                    "hidden": false,
                    "refund_policy": "flexible",
                    "country": PropsCountry,
                    "thematics": props_thematics_options_selected,
                    "description": PropsDescription,
                    "reference_city": PropsCityReference,
                    "travel_expenses": 0,
                    "number_of_artists": props_number_of_artist,
                    "preparation_time": props_preparation_time,
                    "events": props_events_selected,
                    "others_city": PropsOthersCity,
                    "duration_of_the_service": props_service_time,
                    "special_dates": {},
                    "unit_duration_of_the_service": checkUnit(props_unit_time_of_service),
                    "unit_of_the_preparation_time": checkUnit(props_unit_time_of_preparation),
                }));
            }
            axios.post("api/users/register", bodyFormData, {headers: headers}).then(response => {
                toast.success("Un email vous a eté envoyé");
                props.setIsActive(false);
                setVisible(true);
                setUserCredentials(response.data)
            }).catch(error => {
                setDisable(false);
                props.setIsActive(false);
                let errorMessage = Validators.checkErrorMessage(error);
                toast.error(errorMessage.message)
            })
        }
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [disable]);

    return (
        <div>
            {!visible && <ToastContainer/>}
            <Modal visible={visible} width="400" height="150" animationType='slide'>
                <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick
                                rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>
                <div className="form-material"
                     style={{background: "lightslategray", height: "100%", borderRadius: "5px"}}>
                    <div className="col text-center">
                        <div className="body">
                            <label className="form-label" htmlFor="password"
                                   style={{paddingTop: "10px", color: "black"}}>Veuiller confirmer votre email</label>

                            <div className="center p-10">
                                <div className="form-line">
                                    {CreateFields.CreateInput('keys', keys, (e) => Tools.changeFields(setKeys, e), "Inserer votre clé ici", "number", true)}
                                </div>
                            </div>

                        </div>
                        <button className="btn btn-outline-success btn-sm pl-4 pr-4"
                                onClick={(e) => verifyKeysSubmit(e)}>Verifier
                        </button>
                    </div>
                </div>
            </Modal>

            <div className="row justify-content-center">
                <div className="col-md-7 card p-5 text-center" tabIndex="0"
                     onKeyDown={(e) => {e.key === "Enter" && sendUserInfoToSingUp(e)}}>
                    <div className="form-material">
                        {/* Input */}
                        <div className="body">
                            <h4 className="font-weight-lighter pb-4 text-center bolder">Formulaire
                                d'inscription</h4>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    {CreateFields.CreateInput('name', name, (e) => Tools.changeFields(setName, e), "Votre nom", "text", true)}
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    {CreateFields.CreateInput('email', email, (e) => Tools.changeFields(setEmail, e), "E-mail", "email", true)}
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    {CreateFields.CreateInput('password', password, (e) => Tools.changeFields(setPassword, e), "Mot de passe (au moins 8 caractères)", "password", true)}
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    {CreateFields.CreateInput('confirm_password', confirm_password, (e) => Tools.changeFields(setConfirmPassword, e), "Entrez le mot de passe à nouveau", "password", true)}
                                </div>
                            </div>

                            <div className="ml-1 mt-5 text-center">
                                <button type="submit" id="register" disabled={disable}
                                        className="btn btn-outline-primary btn-fab-md pl-4 pr-4"
                                        onClick={(e) => sendUserInfoToSingUp(e)}>Créer votre compte
                                    ISL Creative
                                </button>
                            </div>
                        </div>
                        {/* #END# Input */}
                    </div>
                </div>

                {props.noArtist &&
                <div className="col-md-5 pt-5 text-center">
                    <h4 className="font-weight-lighter bolder pb-3">Vous possédez déjà un compte?</h4>
                    <div className="pt-3">
                        <button className="btn btn-outline-primary mt-4 btn-xl pl-5 pr-5 mr-5 ml-5"
                                onClick={() => window.location.replace('/beats#LoginRequire')}> Identifiez-vous
                        </button>
                        <button className="btn btn-outline-primary mt-4 btn-xl pl-5 pr-5 mr-5 ml-5"
                                onClick={() => props.setChoiceArtistType(true)}> Devenir Artiste
                        </button>
                        <LoginGoogle Label="S'inscrire avec Google"/>
                        <LoginFacebook Label="S'inscrire avec Facebook"/>
                    </div>
                </div>}

            </div>
        </div>
    );
}

export default RegisterForm;
