import React, { Component } from "react";
import {connect} from "react-redux";
import StripeCheckout from "react-stripe-checkout";

class PurchaseInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, name: this.props.profile_info.name, lastname: '',
            email: this.props.profile_info.email, address: this.props.profile_info.address, postal_code: null,
            city: this.props.profile_info.city, phone: this.props.profile_info.phone, rules: false,
            card_number: null,
        };
    }

    changeName = (e) => {this.setState({name: e.target.value})};

    changeEmail = (e) => {this.setState({email: e.target.value})};

    changeLastName = (e) => {this.setState({lastname: e.target.value})};

    changeAddress = (e) => {this.setState({address: e.target.value})};

    changePostalCode = (e) => {this.setState({postal_code: e.target.value})};

    changeCity = (e) => {this.setState({city: e.target.value})};

    changePhone = (e) => {this.setState({phone: e.target.value})};

    changeCardNumber = (e) => {this.setState({card_number: e.target.value})};

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="row-eq-height p-b-100">
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
                                                           value={this.state.name}
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
                                                           name="email" value={this.state.email}
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
                                                           value={this.state.address}
                                                           onChange={this.changeAddress}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="postal_code" className="form-control"
                                                           placeholder="Votre code postal" name="postal_code"
                                                           value={this.state.postal_code}
                                                           onChange={this.changePostalCode}
                                                           required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="text" id="city" className="form-control"
                                                           placeholder="votre ville" name="city"
                                                           value={this.state.city}
                                                           onChange={this.changeCity} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="number" id="phone" className="form-control"
                                                           placeholder="votre telephone" name="phone"
                                                           value={this.state.phone} onChange={this.changePhone}/>
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
                                <div className="card-body text-center">
                                    <form className="form-material">
                                        {/* Input */}
                                        <div className="body">
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <label className="col-form-label">Numero de la carte</label>
                                                    <input type="text" id="card_number" className="form-control"
                                                           placeholder="0000 0000 0000 0000" name="card_number"
                                                           value={this.state.card_number}
                                                           onChange={this.changeCardNumber} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <label className="col-form-label">Expiration (MM/AA)</label>
                                                    <input type="date"  data-date="" data-date-format="MMMM YYYY" id="lastname" className="form-control"
                                                           placeholder="Votre prénom" name="lastname"
                                                           value={this.state.lastname}
                                                           onChange={this.changeLastName} required/>
                                                </div>
                                            </div>
                                            <div className="form-group form-float">
                                                <div className="form-line">
                                                    <input type="email" id="email" className="form-control"
                                                           placeholder="E-mail"
                                                           name="email" value={this.state.email}
                                                           onChange={this.changeEmail} required/>
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
                                        </div>
                                        {/* #END# Input */}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*<StripeCheckout*/}
                    {/*    className="btn border fab-right-bottom absolute shadow btn-primary"*/}
                    {/*    style={{marginBottom: "40px"}}*/}
                    {/*    stripeKey="pk_test_Wg94pwR4mTzxLSdh5CL8JMRb"*/}
                    {/*    token={this.HandleTokenStripe}*/}
                    {/*/>*/}
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info
    };
};

export default connect(mapStateToProps, null)(PurchaseInformation);
