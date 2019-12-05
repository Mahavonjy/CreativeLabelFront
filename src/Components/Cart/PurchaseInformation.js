import React, { Component } from "react";
import {connect} from "react-redux";
import FunctionTools from "../FunctionTools/FunctionTools";
import {toast} from "react-toastify";
import Modal from "react-awesome-modal";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import Cookies from "universal-cookie";

let cookies = new Cookies();

class PurchaseInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, name: this.props.profile_info.name, lastname: '',
            email: this.props.profile_info.email, address: this.props.profile_info.address, postal_code: '',
            city: this.props.profile_info.city, phone: this.props.profile_info.phone, rules: false,
            card_number: '', expiration: '', cvc: '', card_name: '', payment_loading: false
        };
    }

    changeName = (e) => {this.setState({name: e.target.value})};

    changeEmail = (e) => {this.setState({email: e.target.value})};

    changeLastName = (e) => {this.setState({lastname: e.target.value})};

    changeAddress = (e) => {this.setState({address: e.target.value})};

    changePostalCode = (e) => {this.setState({postal_code: e.target.value})};

    changeCity = (e) => {this.setState({city: e.target.value})};

    changePhone = (e) => {this.setState({phone: e.target.value})};

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

    changeExpiration = (e) => {this.setState({expiration: e.target.value})};

    changeCardName = (e) => {this.setState({card_name: e.target.value})};

    changeCVC = (e) => {
        let cvc = e.target.value;
        if (cvc <= 999)
            this.setState({cvc: e.target.value})
    };

    HandleTokenStripe = (stripe_data) => {
        this.setState({payment_loading: true}, () => {
            let headers = {
                "Content-Type":'application/json',
                "Access-Control-Allow-Origin":'*',
            };
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
                "MyCarts": this.props.cart
            };
            try {
                headers['Isl-Token'] = cookies.get("Isl_Creative_pass")["Isl_Token"];
            } catch (e) {
                headers['Isl-Token'] = Conf.configs.TokenVisitor;
            } finally {
                axios.post(Conf.configs.ServerApi + "api/beats/payment/beatShop", data,{headers: headers}).then(resp =>{
                    this.setState({payment_loading: false}, () => {
                        window.location.replace('/CommandSuccess')
                    });
                }).catch(err => {
                    this.setState({payment_loading: false}, () => {
                        console.log(err.response)
                    });
                    // window.location.replace('/CommamndError')
                })
            }
        });
    };

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
        if (!this.state.name) {
            toast.error("Veuiller remplier le champ nom");
        } else if (!this.state.email) {
            toast.error("Veuiller remplier le champ email");
        } else if (!this.state.address) {
            toast.error("Veuiller remplier le champ addresse");
        } else if (!this.state.postal_code) {
            toast.error("Veuiller remplier le champ code postal");
        } else if (!this.state.city) {
            toast.error("Veuiller remplier le champ ville");
        } else if (!this.state.card_number) {
            toast.error("Veuiller rensigner le champ numero de la carte");
        } else if (!this.state.expiration) {
            toast.error("Veuiller rensigner le champ date d'expiration");
        } else if (!this.state.cvc) {
            toast.error("Veuiller rensigner le champ cvc");
        } else if (!this.state.card_name) {
            toast.error("Veuiller rensigner le champ nom sur la carte");
        } else if (!this.state.rules) {
            toast.error("Veuiller lire et accepter la condition d'utilisation");
        } else {
            let card_tmp = this.state.card_number.match(/\d{1,4}/g);
            if (card_tmp.length !== 4 || card_tmp[card_tmp.length - 1].length !== 4) {
                toast.error("Carte de credit invalide");
            } else if (this.state.cvc.length !== 3) {
                toast.error("CVC invalide");
            } else this.Command();
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
                this.HandleTokenStripe(response);
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
                    <div className="row row-eq-height my-3">
                        <div className="col-md-6">
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
                                                           onChange={this.changeName} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="lastname" className="form-control"
                                                           placeholder="Votre prénom" name="lastname"
                                                           value={this.state.lastname}
                                                           onChange={this.changeLastName} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="email" id="email" className="form-control"
                                                           placeholder="E-mail"
                                                           name="email" value={this.state.email || ''}
                                                           onChange={this.changeEmail} required/>
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
                                                           onChange={this.changeAddress}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="postal_code" className="form-control"
                                                           placeholder="Votre code postal" name="postal_code"
                                                           value={this.state.postal_code || ''}
                                                           onChange={this.changePostalCode}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="city" className="form-control"
                                                           placeholder="votre ville" name="city"
                                                           value={this.state.city || ''}
                                                           onChange={this.changeCity} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="phone" className="form-control"
                                                           placeholder="votre telephone" name="phone"
                                                           value={this.state.phone || ''} onChange={this.changePhone}/>
                                                </div>
                                            </div>
                                        </div>
                                        {/* #END# Input */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
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
                                                           onChange={this.changeExpiration} required/>
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
                                                           name="cvc" value={this.state.card_name}
                                                           onChange={this.changeCardName} required/>
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
                                            <button className="btn btn-outline-success btn-fab-md pl-4 pr-4" onClick={() => {this.InputValidators()}} >Commander</button>
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
