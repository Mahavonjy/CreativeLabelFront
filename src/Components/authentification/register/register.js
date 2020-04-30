import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import LoadingOverlay from 'react-loading-overlay';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";
import {sessionService} from "redux-react-session";
import {CreateInput} from "../../functionTools/createFields";
import {addTmpArtistSelected, displayBecomeArtistForm} from "../../functionTools/functionProps";
import {DifferentArtist} from "../../functionTools/popupFields";
import {changeFields, checkUnit, generateBodyFormOfGallery} from "../../functionTools/tools";
import HomeRoot from "../../home/homeRoot";
import Form from "../../kantoBiz/prestations/form/form";
import {checkErrorMessage, RegisterValidation} from "../../validators/validatiors";
import LoginGoogle from "../socialCredentials/google/google";

const style_ =
    "radial-gradient" +
    "circle, #58585a, #4b4b4e, #3f3e41, #333236, #28262a, " +
    "#232125, #1f1c20, #1a171b, #1a171b, #1a171b, #1a171b, #1a171b)";

function Register() {

    const history = useHistory();
    const dispatch = useDispatch();
    const artist_types = useSelector(state => state.Others.artist_types);
    const tmpArtistTypeSelected = useSelector(state => state.Others.tmpArtistTypeSelected);
    const becomeArtistForm = useSelector(state => state.Others.becomeArtistForm);
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
    const [choiceArtistType, setChoiceArtistType] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [keys, setKeys] = useState("");
    const [disable, setDisable] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [user_credentials, setUserCredentials] = useState({});
    const [visible, setVisible] = useState(false);

    const close = () => {
        dispatch(addTmpArtistSelected(""));
        dispatch(displayBecomeArtistForm(false));
    };

    const verifyKeysSubmit = () => {
        axios.post("api/users/get_if_keys_validate", {email, keys}).then(async (resp) => {
            await sessionService.saveSession({token: user_credentials.token}).then(() => {
                sessionService.saveUser(user_credentials).then(() => {
                    HomeRoot.beforeDataLoad().then(() => null);
                });
            });
        }).catch(error => {toast.error(checkErrorMessage(error).message)})
    };

    Register.registerButton = (toAuditor) => {
        return (
            <div className="text-center">
                <button className="btn btn-outline-primary btn-fab-md m-2 pl-4 pr-4"
                        onClick={(e) => Register.sendUserInfoToSingUp(e, true)}>
                    Créer votre compte Artiste
                </button>
                <button type="submit" id="register" disabled={disable}
                        className="btn btn-outline-primary btn-fab-md m-2 pl-4 pr-4"
                        onClick={(e) =>
                            toAuditor
                                ? HomeRoot.beforeDataLoad().then(() => null)
                                : Register.sendUserInfoToSingUp(e)
                        }>
                    Créer votre compte Auditor Pro
                </button>
            </div>
        );
    };

    Register.sendUserInfoToSingUp = (e, toArtist) => {
        e.preventDefault();

        setDisable(true);
        const validator = RegisterValidation(password, confirm_password);

        if (validator.error) {
            setDisable(false);
            toast.error(validator.message);
        } else {
            if (toArtist) {
                setDisable(false);
                setChoiceArtistType(true)
            } else {
                setIsActive(true);
                let headers = {'Content-Type': 'multipart/form-data', 'Access-Control-Allow-Origin': "*"};
                let bodyFormData = new FormData();
                bodyFormData.append('name', name);
                bodyFormData.append('email', email);
                bodyFormData.append('password', password);
                if (tmpArtistTypeSelected) {
                    dispatch(displayBecomeArtistForm(false));
                    generateBodyFormOfGallery(bodyFormData, PropsFiles);
                    bodyFormData.append('user_type', tmpArtistTypeSelected);
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
                    setIsActive(false);
                    setVisible(true);
                    setUserCredentials(response.data)
                }).catch(error => {
                    setDisable(false);
                    setIsActive(false);
                    toast.error(checkErrorMessage(error).message)
                })
            }
        }
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [isMounted, tmpArtistTypeSelected, becomeArtistForm, disable]);

    return (
        <main style={{backgroundImage: style_}}>
            <LoadingOverlay active={isActive}
                            spinner text="Nous sommes en train de vous envoyer un email de confirmation ..."
                            styles={{
                                spinner: (base) => ({
                                    ...base, width: '25px', margin_bottom: '10px', '& svg circle': {stroke: '#A4B129'}
                                })
                            }}/>
            <Modal visible={visible} className="zIndex99" width="400" height="150" animationType='slide'>
                <ToastContainer position="top-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover/>
                <div className="form-material"
                     style={{background: "lightslategray", height: "100%", borderRadius: "5px"}}>
                    <div className="col text-center">
                        <div className="body">
                            <label className="form-label" htmlFor="password"
                                   style={{paddingTop: "10px", color: "black"}}>Veuiller confirmer votre email</label>

                            <div className="center p-10">
                                <div className="form-line">
                                    {CreateInput(
                                        'keys',
                                        keys,
                                        (e) => changeFields(setKeys, e),
                                        "Inserer votre clé ici",
                                        "number",
                                        true
                                    )}
                                </div>
                            </div>

                        </div>
                        <button className="btn btn-outline-success btn-sm pl-4 pr-4"
                                onClick={(e) => verifyKeysSubmit(e)}>Verifier
                        </button>
                    </div>
                </div>
            </Modal>

            {choiceArtistType && DifferentArtist(dispatch, setChoiceArtistType, artist_types)}

            <div id="primary" className="p-t-b-100 height-full">
                <div className="container">
                    <div className="text-center s-14 l-s-2 my-5">
                        <a className="my-5" href="/">
                            <h2 className="text-red">ISL CREATIVE</h2>
                        </a>
                    </div>
                    {/* if user choice become an artist*/}
                    {becomeArtistForm &&
                    <Form
                        register
                        setIsActive={setIsActive}
                        tmpArtistTypeSelected={tmpArtistTypeSelected}
                        artistType={tmpArtistTypeSelected}
                        close={() => close()}
                    />}
                    {/* end form become an artist*/}
                    <div className="row">
                        {!becomeArtistForm && <div className="col-md-10 mx-md-auto">
                            <div className="mt-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-7 card p-5 text-center" tabIndex="0"
                                        // onKeyDown={(e) => {e.key === "Enter" && register.sendUserInfoToSingUp(e)}}
                                    >
                                        <div className="form-material">
                                            {/* Input */}
                                            <div className="body">
                                                <h4 className="font-weight-lighter pb-4 text-center bolder">Formulaire
                                                    d'inscription</h4>
                                                {CreateInput(
                                                    'name',
                                                    name, (e) => changeFields(setName, e),
                                                    "Votre nom",
                                                    "text",
                                                    true
                                                )}
                                                {CreateInput(
                                                    'email',
                                                    email,
                                                    (e) => changeFields(setEmail, e),
                                                    "Email valide",
                                                    "email",
                                                    true
                                                )}
                                                {CreateInput(
                                                    'password',
                                                    password, (e) => changeFields(setPassword, e),
                                                    "Mot de passe (au moins 8 caractères)",
                                                    "password",
                                                    true
                                                )}
                                                {CreateInput(
                                                    'confirm_password', confirm_password,
                                                    (e) => changeFields(setConfirmPassword, e),
                                                    "Entrez le mot de passe à nouveau",
                                                    "password",
                                                    true
                                                )}
                                                {Register.registerButton()}
                                            </div>
                                            {/* #END# Input */}
                                        </div>
                                    </div>
                                    <div className="col-md-5 pt-5 text-center">
                                        <h4 className="font-weight-lighter bolder">Vous possédez déjà un compte?</h4>
                                        <div className="text-center">
                                            <button className="btn btn-outline-primary m-3 pl-5 pr-5"
                                                    onClick={() => {
                                                        history.goBack();
                                                        document.getElementsByClassName(
                                                            "LoginRequire"
                                                        )[0].click();
                                                    }}> Identifiez-vous
                                            </button>
                                            <LoginGoogle register Label="S'inscrire avec Google"/>
                                            {/*<LoginFacebook register Label="S'inscrire avec facebook"/>*/}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
