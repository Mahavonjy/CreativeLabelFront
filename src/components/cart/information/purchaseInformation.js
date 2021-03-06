import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import Conf from "../../../config/tsconfig.json";
import {
    addAllUSerBookingReservation,
    addSuccessMessage
} from "../../functionTools/functionProps";
import {changeFields, isNumber, inputControl} from "../../functionTools/tools";
import HomeRoot from "../../home/homeRoot";
import {checkErrorMessage} from "../../validators/validatiors";
import DatePicker from 'react-datepicker';


let headers = {
    "Content-Type": 'application/json',
    "Access-Control-Allow-Origin": '*',
    'Isl-Token': ''
};

function PurchaseInformation(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.Carts.carts);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const reservations_booking_list = useSelector(state => state.profile.reservations_booking_list);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const events_to_search = useSelector(state => state.KantobizSearchInfo.events_to_search);
    const list_of_options_added = useSelector(state => state.KantobizSearchInfo.list_of_options_added);
    const reservation_rue  = useSelector(state => state.KantobizSearchInfo.reservation_rue);
    const name     = useSelector(state => state.KantoBizForm.name);
    const lastname = useSelector(state => state.KantoBizForm.last_name);
    const email    = useSelector(state => state.KantoBizForm.email)
    const address  = useSelector(state => state.KantoBizForm.address);
    const city     = useSelector(state => state.KantoBizForm.city);
    const phone    = useSelector(state => state.KantoBizForm.phone);
    const postal_code    = useSelector(state => state.KantoBizForm.postal_code);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    const isMounted = useRef(false);
    const [cvc, setCvc] = useState("");
    const [rules, setRules] = useState(false);
    const [card_name, setCardName] = useState("");
    const [card_number, setCardNumber] = useState("");
    const [expiration, setExpiration] = useState(new Date());
    const [payment_loading, setPaymentLoading] = useState(false);

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
            "event": events_to_search,
            "event_date": date_to_search,
            "address": reservation_rue + " " + city + " " + postal_code,
            "services_id": service_to_show.id,
            "total_amount": service_to_show.price,
            "phone": phone ? phone.toString() : "0",
            "options_id_list": list_of_options_added,
            "artist_owner_id": service_to_show.user_id,
        };
        console.log(data)
        axios.post("api/reservation/new", data, {headers: props.headers}).then(async (resp) => {
            let tmp = [...reservations_booking_list];
            tmp.push(resp.data);
            await dispatch(addAllUSerBookingReservation(tmp));
            await dispatch(addSuccessMessage("Votre reservation a été prise en compte, veuillez voir votre email pour plus de details"))
            setPaymentLoading(false);
            history.push("/CommandSuccess");
            HomeRoot.beforeDataLoad().then(() => null);
            toast.success("reservation prise en compte");
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
            setPaymentLoading(false);
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
            s.onload = () => {
                window['Stripe'].setPublishableKey('pk_test_Wg94pwR4mTzxLSdh5CL8JMRb')
            };
            window.document.body.appendChild(s);
        }
    };

    const inputValidators = () => {
        if (
            stateInvalid(card_number, "numero de la carte") &&
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
        let expiration_years = expiration.getFullYear();
        let expiration_month = expiration.getMonth();
        let new_card_number = card_number.split(' ');
        window.Stripe.card.createToken({
            number: new_card_number.join(''),
            exp_month: expiration_month,
            exp_year: expiration_years,
            cvc: cvc,
            address_city: reservation_rue + " " + city + " " + postal_code,
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
        inputControl();
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
                <div className="row justify-content-center">
                    {/*Carte de crédit*/}
                    <div className="col-lg-6">
                        <div className="center">
                            <div className="cardCredit">
                                <div className="front">
                                    <div className="top">
                                        <div className="chip"/>
                                        <div className="cardType">
                                            <img src="https://www.iconsdb.com/icons/preview/white/visa-xxl.png"
                                                 alt="cardBank-icon"/>
                                        </div>
                                    </div>
                                    <div className="middle">
                                        <div className="cd-number">
                                            <p><span className="num-1">#### #### #### ####</span></p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <div className="cardholder col-7">
                                            <span className="label row">Nom du porteur</span>
                                            <span className="holder row">Nom et prénom</span>
                                        </div>
                                        <div className="expires col-4">
                                            <span className="label row">Date d'expiration
                                            </span>
                                            <span className="row"><span className="month">09</span>/<span
                                                className="year">19</span></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="back">
                                    <div className="top">
                                        <div className="magstripe"/>
                                    </div>
                                    <div className="middle">
                                        <p className="label">CCV</p>
                                        <div className="cvc">
                                            <p>****</p>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* credit card form */}
                        <div className={lightModeOn ? "form shadow1" : "form shadow2"}>
                            <div>
                                <div className="cd-numbers">
                                    <label>Numéro</label>
                                    <div className="fields">
                                        <input type="text"
                                               id="card_number"
                                               name="card_number"
                                               value={card_number}
                                               onChange={changeCardNumber}
                                               autocomplete="off"
                                               className={1}
                                               maxLength={19} required/>
                                    </div>
                                </div>

                                <div className="cd-holder">
                                    <label htmlFor="cd-holder-input">Nom du porteur</label>
                                    <input type="text"
                                           id="card_name"
                                           name="card_name"
                                           value={card_name}
                                           onChange={(e) => changeFields(setCardName, e)}
                                           autocomplete="off" required/>
                                </div>
                                <div className="cd-validate">
                                    <div className="expiration">
                                        <div className="field">
                                            <label htmlFor="month">Date d'expiration</label>
                                            <DatePicker
                                                dateFormat="MM/yy"
                                                showPopperArrow={false}
                                                selected={expiration}
                                                id="expiration"
                                                name="expiration"
                                                onChange={date => {setExpiration(date)}}
                                                showMonthYearPicker
                                            />
                                        </div>
                                    </div>
                                    <div className="cvc">
                                        <label htmlFor="cvc">CCV</label>
                                        <input type="text"
                                               id="cvc"
                                               maxLength={4}
                                               name="cvc"
                                               value={cvc}
                                               onChange={changeCVC}
                                               autocomplete="off"
                                               required/>
                                    </div>
                                </div>
                                <div className="material-switch m-t-50 condition">
                                    <input className="ml-3" id="unlimited" name="unlimited" type="checkbox"
                                           onChange={() => setRules(!rules)} autoComplete="off" required/>
                                    <label htmlFor="sw2"
                                           className="condition-label text-red text-monospace cursor-pointer text-muted border-bottom"
                                           onClick={() => document.getElementById("legaleNoticesbtn").click()}> J'accepte les
                                        Conditions Générales d'Utilisation</label>
                                </div>
                                <button className="submit" onClick={() => {
                                    inputValidators()
                                }}>
                                    {props.kantoBiz ? "Confirmer la reservation" : "Commander"}
                                </button>
                            </div>
                        </div>
                        {/* end of credit card form */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchaseInformation;
