import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addName, addLastName, addAddress, addCity, addPhone, addPostalCode, addEmail} from "../functionTools/functionProps";
import {changeFields, getSteps, handleNext} from "../functionTools/tools";
import {toast} from "react-toastify";


function PersonalInformation(props) {

    const dispatch = useDispatch();
    const profile_info = useSelector(state => state.profile.profile_info);
    const userName     = useSelector(state => state.KantoBizForm.name);
    const userLastName = useSelector(state => state.KantoBizForm.last_name);
    const userEmail    = useSelector(state => state.KantoBizForm.email)
    const userAddress  = useSelector(state => state.KantoBizForm.address);
    const userCity     = useSelector(state => state.KantoBizForm.city);
    const userPhone    = useSelector(state => state.KantoBizForm.phone);
    const userPostalCode    = useSelector(state => state.KantoBizForm.postal_code);
    const completed = useSelector(state => state.KantoBizForm.completed);
    const activeStep = useSelector(state => state.KantoBizForm.activeStep);
    const steps = getSteps();


    const [postal_code, setPostalCode] = useState(userPostalCode);
    const [name, setName] = useState(userName);
    const [lastname, setLastname] = useState(userLastName);
    const [email, setEmail] = useState(userEmail);
    const [address, setAddress] = useState(userAddress);
    const [city, setCity] = useState(userCity);
    const [phone, setPhone] = useState(userPhone);

    const stateInvalid = (state, state_name) => {
        if (!state) {
            toast.error("Veuiller remplier le champ " + state_name);
            return false
        }
        return true
    };

    const inputValidators = () => {
        if (
            stateInvalid(name, "name") && stateInvalid(email, "email") &&
            stateInvalid(address, "address") && stateInvalid(postal_code, "code postal") &&
            stateInvalid(city, "ville")
        ) {
            handleNext(steps, activeStep, completed, dispatch)
        }
    };

    return (
        <div className="col-lg-5 center">
            <div className="card">
                <div className="card-header transparent">
                    {profile_info.name ?
                        <h4 className="text-red"><strong>Informations personnelles</strong></h4>
                        : <h4 className="text-red"><strong>Vous avez déjà un compte ?
                            <button
                                className="border-top-0 border-left-0 border-right-0 text-red transparent"
                                onClick={() => document.getElementById("LoginRequire").click()}>&nbsp;Se
                                connecter</button></strong></h4>}

                </div>
                <div className="card-body text-center">
                    <form className="form-material">
                        {/* Input */}
                        <div className="body">
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="text" id="name" className="form-control"
                                           placeholder="Votre nom" name="name"
                                           value={name || ''}
                                           onChange={(e) => {
                                               changeFields(setName, e);
                                               dispatch(addName(e.target.value))
                                           }} autoComplete="off"
                                           required/>
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="text" id="lastname" className="form-control"
                                           placeholder="Votre prénom" name="lastname"
                                           value={lastname}
                                           onChange={(e) => {
                                               changeFields(setLastname, e);
                                               dispatch(addLastName(e.target.value))
                                           }} autoComplete="off"
                                           required/>
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="email" id="email" className="form-control"
                                           placeholder="E-mail"
                                           name="email" value={email || ''}
                                           onChange={(e) => {
                                               changeFields(setEmail, e);
                                               dispatch(addEmail(e.target.value))
                                           }} autoComplete="off"
                                           required/>
                                </div>
                            </div>
                        </div>
                        {/* #END# Input */}
                    </form>
                </div>
                <div className="card-header  transparent">
                    <h4 className="text-red"><strong> Adresse de facturation </strong></h4>
                </div>
                <div className="card-body text-center">
                    <div className="form-material">
                        {/* Input */}
                        <div className="body">
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="text" id="address" className="form-control"
                                           placeholder="Votre addresse" name="address"
                                           value={address || ''}
                                           onChange={(e) => {
                                               changeFields(setAddress, e);
                                               dispatch(addAddress(e.target.value))
                                           }}
                                           autoComplete="off"
                                           required/>
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="number" id="postal_code" className="form-control"
                                           placeholder="Votre code postal" name="postal_code"
                                           value={postal_code || ''}
                                           onChange={(e) => {
                                               changeFields(setPostalCode, e);
                                               dispatch(addPostalCode(e.target.value))
                                           }}
                                           autoComplete="off"
                                           required/>
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="text" id="city" className="form-control"
                                           placeholder="Votre ville" name="city"
                                           value={city || ''}
                                           onChange={(e) => {
                                               changeFields(setCity, e);
                                               dispatch(addCity(e.target.value))
                                           }} autoComplete="off"
                                           required/>
                                </div>
                            </div>
                            <div className="form-group form-float">
                                <div className="form-line">
                                    <input type="number" id="phone" className="form-control"
                                           placeholder="Votre téléphone" name="phone"
                                           value={phone || ''}
                                           onChange={(e) => {
                                               changeFields(setPhone, e);
                                               dispatch(addPhone(e.target.value))
                                           }} autoComplete="off"/>
                                </div>
                            </div>

                            <button className="btn btn-primary m-2 mr-5"  onClick={() => {
                                inputValidators()
                            }}>Suivant
                            </button>
                        </div>
                        {/* #END# Input */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalInformation;
