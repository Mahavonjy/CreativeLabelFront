import React, { useEffect, useRef, useState } from "react";
import * as Tools from "../../FunctionTools/Tools";

function BankingDetails() {

    const isMounted = useRef(false);
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [country, setCountry] = useState("");
    const [phone, setPhone] = useState("");
    const [iban, setIban] = useState("");
    const [swift_bic, setSwiftBic] = useState("");
    const [rules, setRules] = useState(false);

    useEffect(() => {

        document.getElementById('iban').addEventListener('input', function (e) {
            e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
        });

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="col">
            <div className="row justify-content-center my-3">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header transparent">
                            <h4 className="text-red"><strong>Informations personnelles</strong></h4>
                        </div>
                        <div className="card-body text-center">
                            <form className="form-material">
                                {/* Input */}
                                <div className="body">
                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <input type="text" id="name" className="form-control" placeholder="Nom du propriétaire" name="name"
                                                   value={name || ''} onChange={(e) => Tools.changeFields(setName, e)}/>
                                        </div>
                                    </div>
                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <input type="text" id="lastname" className="form-control" placeholder="Prénom du propriétaire" name="lastname"
                                                   value={lastname} onChange={(e) => Tools.changeFields(setLastname, e)} required/>
                                        </div>
                                    </div>
                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <input type="email" id="p-email" className="form-control" placeholder="Email du propriétaire"
                                                   name="email" value={email || ''} onChange={(e) => Tools.changeFields(setEmail, e)} required/>
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
                                            <input type="text" id="country" className="form-control" placeholder="Pays du propriétaire"
                                                   name="country" value={country || ''} onChange={(e) => Tools.changeFields(setCountry, e)}/>
                                        </div>
                                    </div>
                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <input type="number" id="phone" className="form-control" placeholder="Téléphone du propriétaire" name="phone"
                                                   value={phone || ''} onChange={(e) => Tools.changeFields(setPhone, e)}/>
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
                                <h4 className="text-red"><i className="icon-locked-2 s-14"/>&nbsp;<strong>Vos données sont sécurisé & crypté en SSL.</strong></h4>
                            </div>
                            <div className="form-material pb-md-5">
                                {/* Input */}
                                <div className="body">

                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label"><i className="icon icon-info text-red" data-tip="A remplir"/>&nbsp;IBAN</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="iban" className="form-control" placeholder="0000 0000 0000 0000" name="iban"
                                                   value={iban || ''} onChange={(e) => Tools.changeFields(setIban, e)} required/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label"><i className="icon icon-info text-red" data-tip="A remplir"/>&nbsp;SWIFT / BIC</label>
                                        <div className="col-sm-8">
                                            <input type="text" id="swift_bic" className="form-control" placeholder="0000 0000 0000 0000" name="swift_bic"
                                                   value={swift_bic || ''} onChange={(e) => Tools.changeFields(setSwiftBic, e)} required/>
                                        </div>
                                    </div>

                                    <div className="form-group form-float">
                                        <div className="form-line">
                                            <div className="material-switch">
                                                <input id="unlimited" name="unlimited" type="checkbox" onChange={() => setRules(!rules)}/>
                                                <label htmlFor="sw2" className="text-red text-monospace text-muted" > J'accepte les Conditions Générales d'Utilisation</label>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-success btn-fab-md pl-4 pr-4">Confirmer</button>
                                </div>
                                {/* #END# Input */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BankingDetails;
