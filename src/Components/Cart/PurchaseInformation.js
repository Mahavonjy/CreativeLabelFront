import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import Conf from "../../Config/tsconfig";
import {addAllUSerBookingReservation} from "../FunctionTools/FunctionProps";
import {changeFields, isNumber} from "../FunctionTools/Tools";
import {checkErrorMessage} from "../Validators/Validatiors";

let headers = {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": '*',
    'Isl-Token': ''
};

function PurchaseInformation(props) {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.Carts.carts);
    const profile_info = useSelector(state => state.profile.profile_info);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const reservations_booking_list = useSelector(state => state.profile.reservations_booking_list);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const events_to_search = useSelector(state => state.KantobizSearchInfo.events_to_search);
    const reservation_address = useSelector(state => state.KantobizSearchInfo.reservation_address);
    const list_of_options_added = useSelector(state => state.KantobizSearchInfo.list_of_options_added);

    const isMounted = useRef(false);
    const [cvc, setCvc] = useState("");
    const [rules, setRules] = useState(false);
    const [card_name, setCardName] = useState("");
    const [lastname, setLastname] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [card_number, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState("");
    const [payment_loading, setPaymentLoading] = useState(false);
    const [name, setName] = useState(profile_info.name);
    const [email, setEmail] = useState(profile_info.email);
    const [address, setAddress] = useState(profile_info.address);
    const [city, setCity] = useState(profile_info.city);
    const [phone, setPhone] = useState(profile_info.phone);

    const changeCardNumber = (e) => {
        let cardNumber = e.target.value;
        cardNumber = cardNumber.match(/\d{1,4}/g);
        try {
            if (cardNumber.length <= 4) {
                let tmp = cardNumber.join('');
                if (isNumber(tmp)) setCardNumber(cardNumber.join(' '))
            }
        } catch (e) {
            setCardNumber(null)
        }
    };

    const changeCVC = (e) => {
        let cvc = e.target.value;
        if (cvc <= 999)
            setCvc(e.target.value)
    };

    const beatsHandleTokenStripe = (stripe_data) => {
        setPaymentLoading(true);
        let cart_tmp = [];
        if (cart.length !== 0)
            cart_tmp = cart;
        else cart_tmp = props.Cart;
        let data = {
            "user_data": {
                "name": name,
                "lastname": lastname,
                "email": email,
                "address": address,
                "city": city,
                "postal_code": postal_code,
                "phone": phone
            },
            "stripe_token": stripe_data,
            "addresses": address,
            "MyCarts": cart_tmp
        };
        try {
            let user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
            headers['Isl-Token'] = user_credentials.token;
        } catch (e) {
            headers['Isl-Token'] = Conf.configs.TokenVisitor;
        } finally {
            axios.post("api/beats/payment/beatShop", data, {headers: headers}).then(() => {
                setPaymentLoading(false);
                window.location.replace('/CommandSuccess')
            }).catch(() => {
                setPaymentLoading(false);
                window.location.replace('/CommandError')
            })
        }
    };

    const kantoBizHandleTokenStripe = (stripe_data) => {
        setPaymentLoading(true);
        let data = {
            "stripe_token": stripe_data,
            "name": name,
            "lastname": lastname,
            "email": email,
            "city": city,
            "postal_code": postal_code,
            "phone": phone && phone.toString() || "0",
            "event": events_to_search,
            "event_date": date_to_search,
            "address": reservation_address,
            "services_id": service_to_show.id,
            "total_amount": service_to_show.price,
            "options_id_list": list_of_options_added,
            "artist_owner_id": service_to_show.user_id,
        };
        axios.post("api/reservation/new", data, {headers: props.headers}).then(async (resp) => {
            let tmp = [...reservations_booking_list];
            tmp.push(resp.data);
            await dispatch(addAllUSerBookingReservation(tmp));
            setPaymentLoading(false);
            toast.success("Reservation prise en compte");
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
        });
    };

    const stateInvalid = (state, state_name) => {
        if (!state) {
            toast.error("Veuiller remplier le champ " + state_name);
            return false
        }
        return true
    };

    const loadStripe = () => {
        if (!window.document.getElementById('stripe-script')) {
            let s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://js.stripe.com/v2/";
            s.onload = () => {window['Stripe'].setPublishableKey('pk_test_Wg94pwR4mTzxLSdh5CL8JMRb')};
            window.document.body.appendChild(s);
        }
    };

    const inputValidators = () => {
        if (
            stateInvalid(name, "name") && stateInvalid(email, "email") &&
            stateInvalid(address, "address") && stateInvalid(postal_code, "code postal") &&
            stateInvalid(city, "ville") && stateInvalid(card_number, "numero de la carte") &&
            stateInvalid(expiration, "date d'expiration") && stateInvalid(cvc, "cvc") &&
            stateInvalid(card_name, "nom sur la carte")
        ) {
            if (!rules) {
                toast.error("Veuiller lire et accepter la condition d'utilisation");
            } else {
                let card_tmp = card_number.match(/\d{1,4}/g);
                if (card_tmp.length !== 4 || card_tmp[card_tmp.length - 1].length !== 4) {
                    toast.error("Carte de credit invalide");
                } else if (cvc.length !== 3) {
                    toast.error("CVC invalide");
                } else command();
            }
        }
    };

    const command = () => {
        let expiration_years = expiration.split('-')[0];
        let expiration_month = expiration.split('-')[1];
        let new_card_number = card_number.split(' ');
        window.Stripe.card.createToken({
            number: new_card_number.join(''),
            exp_month: expiration_month,
            exp_year: expiration_years,
            cvc: cvc,
            address_city: city + ", " + address,
            name: card_name,
            address_zip: postal_code
        }, (status, response) => {
            if (status === 200) {
                if (props.beats_cart) beatsHandleTokenStripe(response);
                else if (props.kantoBiz) kantoBizHandleTokenStripe(response);
            } else {
                toast.error(response.error.message)
            }
        });
    };

    useEffect(() => {
        loadStripe();

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="row-eq-height p-b-100">
            <Modal visible={payment_loading} width="250" height="55" animationType='slide'>
                <div className="modal-content bg-dark">
                    <div className="flex-row text-center">
                        <h3 className="text-muted text-red">Un instant s'il vous plaît </h3>
                        <div className="spinner-grow text-primary" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-secondary" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-success" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-warning" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-info" role="status">
                            <span className="sr-only"/>
                        </div>
                        <div className="spinner-grow text-light" role="status">
                            <span className="sr-only"/>
                        </div>

                    </div>
                </div>
            </Modal>
            <div className="col-12 pl-lg-3">
                <div className="row justify-content-center my-3">
                    <div className="col-lg-6">
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
                                                       onChange={(e) => changeFields(setName, e)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="text" id="lastname" className="form-control"
                                                       placeholder="Votre prénom" name="lastname"
                                                       value={lastname}
                                                       onChange={(e) => changeFields(setLastname, e)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="email" id="email" className="form-control"
                                                       placeholder="E-mail"
                                                       name="email" value={email || ''}
                                                       onChange={(e) => changeFields(setEmail, e)} required/>
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
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="text" id="address" className="form-control"
                                                       placeholder="Votre addresse" name="address"
                                                       value={address || ''}
                                                       onChange={(e) => changeFields(setAddress, e)}
                                                       required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="number" id="postal_code" className="form-control"
                                                       placeholder="Votre code postal" name="postal_code"
                                                       value={postal_code || ''}
                                                       onChange={(e) => changeFields(setPostalCode, e)}
                                                       required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="text" id="city" className="form-control"
                                                       placeholder="Votre ville" name="city"
                                                       value={city || ''}
                                                       onChange={(e) => changeFields(setCity, e)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <input type="number" id="phone" className="form-control"
                                                       placeholder="Votre téléphone" name="phone"
                                                       value={phone || ''}
                                                       onChange={(e) => changeFields(setPhone, e)}/>
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
                                    <h4 className="text-red"><i className="icon-locked-2 s-14"/>&nbsp;<strong>C’est un
                                        paiement sécurisé crypté en SSL.</strong></h4>
                                </div>
                                <div className="form-material pb-md-5">
                                    {/* Input */}
                                    <div className="body">
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Numero de la carte</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="card_number" className="form-control"
                                                       placeholder="0000 0000 0000 0000" name="card_number"
                                                       value={card_number}
                                                       onChange={changeCardNumber} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Expiration (MM/AA)</label>
                                            <div className="col-sm-8">
                                                <input type="month" id="expiration" className="form-control"
                                                       name="expiration" value={expiration}
                                                       onChange={(e) => changeFields(setExpiration, e)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">CVC</label>
                                            <div className="col-sm-8">
                                                <input type="number" id="cvc" className="form-control"
                                                       placeholder="CVC"
                                                       name="cvc" value={cvc}
                                                       onChange={changeCVC} required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-4 col-form-label">Nom sur la carte</label>
                                            <div className="col-sm-8">
                                                <input type="text" id="card_name" className="form-control"
                                                       placeholder="Nom du proprietaire de la carte"
                                                       name="card_name" value={card_name}
                                                       onChange={(e) => changeFields(setCardName, e)} required/>
                                            </div>
                                        </div>
                                        <div className="form-group form-float">
                                            <div className="form-line">
                                                <div className="material-switch">
                                                    <input id="unlimited" name="unlimited" type="checkbox"
                                                           onChange={() => setRules(!rules)}/>
                                                    <label htmlFor="sw2"
                                                           className="text-red text-monospace text-muted"> J'accepte les
                                                        Conditions Générales d'Utilisation</label>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-success btn-fab-md pl-4 pr-4"
                                                onClick={() => {inputValidators()}}>{props.kantoBiz ? "Confirmer la reservation" : "Commander"}</button>
                                    </div>
                                    {/* #END# Input */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseInformation;
