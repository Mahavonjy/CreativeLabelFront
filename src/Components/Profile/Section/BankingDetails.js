import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {profileInitialisationBanking, profileShowBankingDetails} from "../../FunctionTools/FunctionProps";
import {changeFields, deleteInObject} from "../../FunctionTools/Tools";
import {checkErrorMessage, countryRegex, validatorBanking} from "../../Validators/Validatiors";

function BankingDetails(props) {

    const dispatch = useDispatch();
    const banking = useSelector(state => state.profile.banking);
    const show_banking_details = useSelector(state => state.profile.show_banking_details);

    const isMounted = useRef(false);
    const [name, setName] = useState(banking['name']);
    const [lastname, setLastname] = useState(banking['lastname']);
    const [email, setEmail] = useState(banking['email']);
    const [country, setCountry] = useState(banking['country']);
    const [countryReg, setCountryReg] = useState([]);
    const [phone, setPhone] = useState(banking['phone']);
    const [iban, setIban] = useState(banking['iban']);
    const [swift_bic, setSwiftBic] = useState(banking['swift']);
    const [rules, setRules] = useState(banking["rules"]);
    const [password, setPassword] = useState("");
    const [headersCustomed, setCustomHeaders] = useState({});

    const dispatchFunc = (func) => {
        let validate = validatorBanking(banking);
        if (validate['error']) toast.error(validate.message);
        else {
            if (func === "create") createBanking();
            else updateBanking()
        }
    };

    const _setRules = () => {
        setRules(!rules);
        let tmp = {...banking};
        tmp["rules"] = !rules;
        dispatch(profileInitialisationBanking(tmp))
    };

    const checkPassword = () => {
        axios.post('api/users/check_password', {password}, {headers: headersCustomed}).then((resp) => {
            dispatch(profileShowBankingDetails(true));
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
        })
    };

    const createBanking = () => {
        let tmp = {...banking};
        axios.post('api/banking/create', deleteInObject(tmp), {headers: headersCustomed}).then((resp) => {
            dispatch(profileShowBankingDetails(true));
            dispatch(profileInitialisationBanking(resp.data));
            toast.success("créer avec success")
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
        })
    };

    const updateBanking = () => {
        let tmp = {...banking};
        tmp = deleteInObject(tmp);
        if (tmp["phone"] == null) tmp["phone"] = "";
        axios.put('api/banking/update', tmp, {headers: headersCustomed}).then((resp) => {
            dispatch(profileInitialisationBanking(resp.data));
            toast.success("details mise a jour")
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
        })
    };

    useEffect(() => {

        let tmp = [];
        for (const [key, value] of Object.entries(countryRegex)) tmp.push(value);
        setCountryReg(tmp);
        let _headers = props.headers;
        _headers['Content-Type'] = 'application/json';
        setCustomHeaders(_headers);

        return () => {
            isMounted.current = true
        };
    }, [headersCustomed]);

    return (
        <div className="col">
            <div
                className={!show_banking_details && banking['id'] ? "row justify-content-center my-3 blur" : "row justify-content-center my-3"}>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header transparent">
                            <h4 className="text-red"><strong>Informations personnelles</strong></h4>
                        </div>
                        <div className="card-body text-center">
                            <form className="form-material">
                                {/* Input */}
                                <div className="body ">

                                    <div className="form-group d-flex flex-wrap required">
                                        <label className="col-sm-4 control-label">Nom</label>
                                        <div className="col-sm-8 center">
                                            <input type="text" id="name" className="form-control text-center"
                                                   placeholder="le nom du propriétaire du compte en banque" name="name"
                                                   value={name || ''}
                                                   onChange={(e) => changeFields(setName, e, profileInitialisationBanking, dispatch, "name", banking)}/>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex flex-wrap">
                                        <label className="col-sm-4 control-label">Prénom</label>
                                        <div className="col-sm-8 center">
                                            <input type="text" id="lastname" className="form-control text-center"
                                                   placeholder="le prénom du propriétaire du compte en banque" name="lastname"
                                                   value={lastname}
                                                   onChange={(e) => changeFields(setLastname, e, profileInitialisationBanking, dispatch, "lastname", banking)}
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex flex-wrap required">
                                        <label className="col-sm-4 control-label">Email</label>
                                        <div className="col-sm-8 center">
                                            <input type="email" id="p-email" className="form-control text-center"
                                                   placeholder="l'email du proprietaire du compte en banque"
                                                   name="email" value={email || ''}
                                                   onChange={(e) => changeFields(setEmail, e, profileInitialisationBanking, dispatch, "email", banking)}
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
                            <form className="form-material">
                                {/* Input */}
                                <div className="body">

                                    <div className="form-group d-flex flex-wrap required">
                                        <label className="col-sm-4 control-label">Pays</label>
                                        <div className="col-sm-8 center">
                                            <input id="country" className="form-control text-center"
                                                   placeholder="Veuillez choisir ici le pays ou reside le compte en banque" list="country-regex"
                                                   name="country" value={country || ''}
                                                   onChange={(e) => changeFields(setCountry, e, profileInitialisationBanking, dispatch, "country", banking)}/>
                                            <datalist id="country-regex">
                                                {countryReg.map((val, index) => <option key={index}
                                                                                        value={val}>{val}</option>)}
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="form-group d-flex flex-wrap">
                                        <label className="col-sm-4 control-label">Téléphone</label>
                                        <div className="col-sm-8 center">
                                            <input type="number" id="phone" className="form-control text-center"
                                                   placeholder="le téléphone du proprietaire du compte en banque" name="phone"
                                                   value={phone || ''}
                                                   onChange={(e) => changeFields(setPhone, e, profileInitialisationBanking, dispatch, "phone", banking)}/>
                                        </div>
                                    </div>

                                </div>
                                {/* #END# Input */}
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header transparent">
                            <h4 className="text-red"><strong>Informations carte bancaire</strong></h4>
                        </div>
                        <div className="flex-row ml-3">
                            <img alt="Stripe" src="https://img.icons8.com/nolan/64/000000/stripe.png"/>
                            <img alt="VISA Card" src="https://img.icons8.com/cute-clipart/64/000000/visa.png"/>
                            <img alt="MasterCard" src="https://img.icons8.com/color/64/000000/mastercard.png"/>
                        </div>
                        <div className="card-body text-center">
                            <div className="card-header transparent">
                                <h4 className="text-red"><i className="icon-locked-2 s-14"/>&nbsp;<strong>Vos données
                                    sont sécurisé & crypté en SSL.</strong></h4>
                            </div>
                            <div className="form-material pb-md-5">
                                {/* Input */}
                                <div className="body">

                                    <div className="form-group d-flex flex-wrap required">
                                        <label className="col-sm-4 control-label"><i
                                            className="icon icon-info text-red" data-tip="A remplir"/>&nbsp;IBAN</label>
                                        <div className="col-sm-8 center">
                                            <input type="text" id="iban" className="form-control"
                                                   placeholder="..........................................." name="iban"
                                                   value={iban || ''}
                                                   onChange={(e) => changeFields(setIban, e, profileInitialisationBanking, dispatch, "iban", banking)}
                                                   required/>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex flex-wrap required">
                                        <label className="col-sm-4 control-label"><i
                                            className="icon icon-info text-red" data-tip="A remplir"/>&nbsp;SWIFT / BIC</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="swift_bic" className="form-control"
                                                   placeholder="..........................................." name="swift_bic"
                                                   value={swift_bic || ''}
                                                   onChange={(e) => changeFields(setSwiftBic, e, profileInitialisationBanking, dispatch, "swift", banking)}
                                                   required/>
                                        </div>
                                    </div>

                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <div className="material-switch">
                                                <input id="unlimited" name="unlimited" type="checkbox"
                                                       onChange={() => _setRules()} checked={rules}/>
                                                <label htmlFor="sw2"
                                                       className="text-red text-monospace text-muted"> J'accepte les
                                                    Conditions Générales d'Utilisation</label>
                                            </div>
                                        </div>
                                    </div>
                                    {banking['id'] ?
                                        <button className="btn btn-outline-success btn-fab-md pl-4 pr-4"
                                                onClick={() => dispatchFunc("update")}>Changer les
                                            informations</button> :
                                        <button className="btn btn-outline-success btn-fab-md pl-4 pr-4"
                                                onClick={() => dispatchFunc("create")}>Ajouter les
                                            informations</button>}
                                </div>
                                {/* #END# Input */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {!show_banking_details && banking['id'] &&
            <div className="absolute center-center col" tabIndex="0"
                 onKeyDown={(e) => {e.key === "Enter" && checkPassword()}}>
                <i className="icon icon-locked s-24 text-red"/>
                <h4 className="mb-3 mt-3">Veuiller entrer votre mot de passe avant de voir</h4>
                <div className="form-group form-float col-md-4 center">
                    <div className="form-line">
                        <input type="password" id="password" className="form-control"
                               placeholder="insérer votre mot de passe" name="password"
                               value={password || ''}
                               onChange={(e) => changeFields(setPassword, e)}/>
                    </div>
                </div>
                <button className="btn btn-outline-success mt-3" onClick={() => checkPassword()}>Déverouiller</button>
            </div>}
        </div>
    );
}

export default BankingDetails;
