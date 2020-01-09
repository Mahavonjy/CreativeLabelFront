import React, { Component } from "react";
import {connect} from "react-redux";
import FunctionTools from "../FunctionTools/FunctionTools";
import {toast} from "react-toastify";
import Modal from "react-awesome-modal";
import axios from "axios";
import Conf from "../../Config/tsconfig";
let headers = {
    "Content-Type":'application/json',
    "Access-Control-Allow-Origin":'*',
    'Isl-Token':  ''
};

class PurchaseInformation extends Component {
    state = {
        isMounted: false,
        cvc: '',
        card_name: '',
        rules: false,
        lastname: '',
        postal_code: '',
        card_number: '',
        expiration: '',
        payment_loading: false,
        name: this.props.profile_info.name,
        email: this.props.profile_info.email,
        address: this.props.profile_info.address,
        city: this.props.profile_info.city,
        phone: this.props.profile_info.phone,
    };

    changeCardNumber = (e) => {
        let cardNumber = e.target.value;
        cardNumber = cardNumber.match(/\d{1,4}/g);
        try {
            if (cardNumber.length <= 4) {
                let tmp = cardNumber.join('');
                if (FunctionTools.isNumber(tmp)) this.setState({card_number: cardNumber.join(' ')})
            }
        } catch (e) {
            this.setState({card_number: null})
        }
    };

    changeCVC = (e) => {
        let cvc = e.target.value;
        if (cvc <= 999)
            this.setState({cvc: e.target.value})
    };

    beatsHandleTokenStripe = (stripe_data) => {
        this.setState({payment_loading: true}, () => {
            let cart_tmp = [];
            if (this.props.cart.length !== 0)
                cart_tmp = this.props.cart;
            else cart_tmp = this.props.Cart;
            let data = {
                "user_data": {
                    "name": this.state.name,
                    "lastname": this.state.lastname,
                    "email": this.state.email,
                    "address": this.state.address,
                    "city": this.state.city,
                    "postal_code": this.state.postal_code,
                    "phone": this.state.phone
                },
                "stripe_token": stripe_data,
                "addresses": this.state.address,
                "MyCarts": cart_tmp
            };
            try {
                let user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
                headers['Isl-Token'] = user_credentials.token;
            } catch (e) {
                headers['Isl-Token'] = Conf.configs.TokenVisitor;
            } finally {
                axios.post(Conf.configs.ServerApi + "api/beats/payment/beatShop", data,{headers: headers}).then(resp =>{
                    this.setState({payment_loading: false}, () => {
                        window.location.replace('/CommandSuccess')
                    });
                }).catch(err => {
                    this.setState({payment_loading: false}, () => {
                        window.location.replace('/CommandError')
                    });
                })
            }
        });
    };

    kantoBizHandleTokenStripe = (stripe_data) => {
        this.setState({payment_loading: true}, () => {
            setTimeout(() => {
                this.setState({payment_loading: true})
            }, 2000)
        });
    };

    stateInvalid (state_name, message) {
        if (!this.state[state_name]) {
            toast.error("Veuiller remplier le champ " + message);
            return false
        }
        return true
    }

    loadStripe = () => {
        if(!window.document.getElementById('stripe-script')) {
            let s = window.document.createElement("script");
            s.id = "stripe-script";
            s.type = "text/javascript";
            s.src = "https://js.stripe.com/v2/";
            s.onload = () => {window['Stripe'].setPublishableKey('pk_test_Wg94pwR4mTzxLSdh5CL8JMRb')};
            window.document.body.appendChild(s);
        }
    };

    InputValidators = () => {
        if (
            this.stateInvalid(this.state.name, "name") && this.stateInvalid(this.state.email, "email") &&
            this.stateInvalid(this.state.address, "address") && this.stateInvalid(this.state.postal_code, "code postal") &&
            this.stateInvalid(this.state.city, "ville") && this.stateInvalid(this.state.card_number, "numero de la carte") &&
            this.stateInvalid(this.state.expiration, "date d'expiration") && this.stateInvalid(this.state.cvc, "cvc") &&
            this.stateInvalid(this.state.card_name, "nom sur la carte")
        ) {
            if (!this.state.rules) {
                toast.error("Veuiller lire et accepter la condition d'utilisation");
            } else {
                let card_tmp = this.state.card_number.match(/\d{1,4}/g);
                if (card_tmp.length !== 4 || card_tmp[card_tmp.length - 1].length !== 4) {
                    toast.error("Carte de credit invalide");
                } else if (this.state.cvc.length !== 3) {
                    toast.error("CVC invalide");
                } else this.Command();
            }
        }
    };

    Command = () => {
        let expiration_years = this.state.expiration.split('-')[0];
        let expiration_month = this.state.expiration.split('-')[1];
        let card_number = this.state.card_number.split(' ');
        window.Stripe.card.createToken({
            number: card_number.join(''),
            exp_month: expiration_month,
            exp_year: expiration_years,
            cvc: this.state.cvc,
            address_city: this.state.city + ", " + this.state.address,
            name: this.state.card_name,
            address_zip: this.state.postal_code
        }, (status, response) => {
            if (status === 200) {
                if (this.props.beats_cart) this.beatsHandleTokenStripe(response);
                else if (this.props.kantoBiz) this.kantoBizHandleTokenStripe(response);
            } else {
                toast.error(response.error.message)
            }
        });
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {this.loadStripe()})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="row-eq-height p-b-100">
                <Modal visible={this.state.payment_loading} width="250" height="55" animationType='slide'>
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
                                    {this.props.profile_info.name ? <h4 className="text-red"><strong>Informations personnelles</strong></h4>

                                        : <h4 className="text-red"><strong>Vous avez déjà un compte ?
                                            <button className="border-top-0 border-left-0 border-right-0 text-red transparent" onClick={() =>  document.getElementById("LoginRequire").click()}>&nbsp;Se connecter</button></strong></h4>}


                                </div>
                                <div className="card-body text-center">
                                    <form className="form-material">
                                        {/* Input */}
                                        <div className="body">
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="name" className="form-control"
                                                           placeholder="Votre nom" name="name"
                                                           value={this.state.name || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="lastname" className="form-control"
                                                           placeholder="Votre prénom" name="lastname"
                                                           value={this.state.lastname}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="email" id="email" className="form-control"
                                                           placeholder="E-mail"
                                                           name="email" value={this.state.email || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
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
                                                           placeholder="Votre address" name="address"
                                                           value={this.state.address || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="postal_code" className="form-control"
                                                           placeholder="Votre code postal" name="postal_code"
                                                           value={this.state.postal_code || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="city" className="form-control"
                                                           placeholder="votre ville" name="city"
                                                           value={this.state.city || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="phone" className="form-control"
                                                           placeholder="votre telephone" name="phone"
                                                           value={this.state.phone || ''}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)}/>
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
                                        <h4 className="text-red"><i className="icon-locked-2 s-14"/>&nbsp;<strong>C’est un paiement sécurisé crypté en SSL.</strong></h4>
                                    </div>
                                    <div className="form-material pb-md-5">
                                        {/* Input */}
                                        <div className="body">
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Numero de la carte</label>
                                                <div className="col-sm-8">
                                                    <input type="text" id="card_number" className="form-control"
                                                           placeholder="0000 0000 0000 0000" name="card_number"
                                                           value={this.state.card_number}
                                                           onChange={this.changeCardNumber} required/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Expiration (MM/AA)</label>
                                                <div className="col-sm-8">
                                                    <input type="month" id="expiration" className="form-control"
                                                           name="expiration" value={this.state.expiration}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">CVC</label>
                                                <div className="col-sm-8">
                                                    <input type="number" id="cvc" className="form-control"
                                                           placeholder="CVC"
                                                           name="cvc" value={this.state.cvc}
                                                           onChange={this.changeCVC} required/>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-4 col-form-label">Nom sur la carte</label>
                                                <div className="col-sm-8">
                                                    <input type="text" id="card_name" className="form-control"
                                                           placeholder="Nom du proprietaire de la carte"
                                                           name="card_name" value={this.state.card_name}
                                                           onChange={(e) => FunctionTools.changeFields(this, e)} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <div className="material-switch">
                                                        <input id="unlimited" name="unlimited" type="checkbox" onChange={() => {this.setState({rules: !this.state.rules})}}/>
                                                        <label htmlFor="sw2" className="text-red text-monospace text-muted" > J'accepte les Conditions Générales d'Utilisation</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-success btn-fab-md pl-4 pr-4" onClick={() => {this.InputValidators()}} >{this.props.kantoBiz ? "Confirmer la reservation": "Commander"}</button>
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
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info,
        cart: state.Carts.carts,
    };
};

export default connect(mapStateToProps, null)(PurchaseInformation);
