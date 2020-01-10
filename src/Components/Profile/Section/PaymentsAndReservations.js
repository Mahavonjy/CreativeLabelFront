import React, { Component } from "react";
import ReactTooltip from 'react-tooltip';
import {connect} from "react-redux";

class PaymentsAndReservations extends Component {
    state = {
        isMounted: false,
    };

    auditor_pro_canceled = () => {
        console.log("L'auditeur annule la prestation");
    };

    artist_canceled = () => {
        console.log("L'artist annule la prestation");
    };

    tableGenerator = (status, action) => {
        return (
            <table className="responsive-table">
                <thead>
                <tr>
                    <th scope="col-lg-4">Titre&nbsp;<i className="icon icon-info" data-tip="Le titre de la prestation que vous avez choisi"/></th>
                    <th scope="col">Date&nbsp;<i className="icon icon-info" data-tip="Ceci est la date ou votre evenement va se dérouler"/></th>
                    <th scope="col">Artist&nbsp;<i className="icon icon-info" data-tip="Ceci est le nom de l'artist concerné par l'evenement avec un lien qui va direct sur son profile"/></th>
                    <th scope="col">Évènenment&nbsp;<i className="icon icon-info" data-tip="Ceci sera le type d'evenement de l'autideur qui a reserver "/></th>
                    <th scope="col">Adresse&nbsp;<i className="icon icon-info" data-tip="Ceci est l'adresse choisi par l'auditeur ou se déroulera l'evenement"/></th>
                    <th scope="col">Montant&nbsp;<i className="icon icon-info" data-tip="Ici sera le montant HT de la prestation (Choisi par l'artiste)"/></th>
                    {status ?
                        <th scope="col">Status&nbsp;<i className="icon icon-info" data-tip="Ici s'affichera le status de votre réservation qui sera varier"/></th>
                        : <th scope="col">Facture&nbsp;<i className="icon icon-info" data-tip="Vous pouvez telecharger votre facture ici en cliquant sur 'télécharger' ou via votre email"/></th>}
                    {action ? <th scope="col">Action&nbsp;<i className="icon icon-info" data-tip="Ce boutton sera est utile afin d'annuler la prestation sauf si le status est en échec"/></th> : null}
                </tr>
                </thead>

                <tbody>
                <tr>
                    <th className="text-center small bolder" scope="row">MariageFete</th>
                    <td className="small" data-title="Date">12/12/2020</td>
                    <td className="small" data-title="Artist">Jazz Mmc</td>
                    <td className="small" data-title="Évènenment">Mariage</td>
                    <td className="small" data-title="Adresse">Lot 1M 30 Andragnovato-Est</td>
                    <td className="small" data-title="Montant">$875,742,326</td>
                    {status ? <td className="small text-yellow" data-title="Status">En attente</td>
                        : <td className="small text-red" data-title="Status">télécharger</td>}
                    {action ? <div className="text-center mt-2">
                        <button className="btn btn-outline-danger" onClick={this.props.role === "professional_auditor" ? this.auditor_pro_canceled : this.artist_canceled}>Annuler</button>
                    </div>: null}
                </tr>
                <tr>
                    <th className="text-center small bolder" scope="row">BFete</th>
                    <td className="small" data-title="Date">12/12/2021</td>
                    <td className="small" data-title="Artist">Lôla</td>
                    <td className="small" data-title="Évènenment">Anniversaire</td>
                    <td className="small" data-title="Adresse">Lot 1M 30 Andragnovato-Est</td>
                    <td className="small" data-title="Montant">$875,742,326</td>
                    {status ? <td className="small text-red" data-title="Status">Echec</td>
                        : <td className="small text-red" data-title="Status">télécharger</td>}
                    {action ?
                        <div className="text-center mt-2">
                            <button className="btn btn-outline-danger" disabled>Annuler</button>
                        </div>: null}
                </tr>
                <tr>
                    <th className="text-center small bolder" scope="row">ForaZazaParty</th>
                    <td className="small" data-title="Date">23/12/2021</td>
                    <td className="small" data-title="Artist">Tsiliva</td>
                    <td className="small" data-title="Évènenment">ForaZaza</td>
                    <td className="small" data-title="Adresse">Lot 1M 30 Andragnovato-Est</td>
                    <td className="small" data-title="Montant">$875,742,326</td>
                    {status ? <td className="small text-green" data-title="Status">Validé</td>
                        : <td className="small text-red" data-title="Status">télécharger</td>}
                    {action ?
                        <div className="text-center mt-2">
                            <button className="btn btn-outline-success" onClick={this.props.role === "professional_auditor" ? this.auditor_pro_canceled : this.artist_canceled}>Annuler</button>
                        </div>: null}
                </tr>
                </tbody>
            </table>
        );
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="col" style={{minHeight: 320}}>
                <ReactTooltip/>
                <div className="card no-b">
                    <div className="card-body">
                        <div className="row justify-content-center">
                            <div className="col-lg-2">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link active" data-toggle="pill" href="#v-pills-reservation" role="tab" aria-controls="v-pills-reservation" aria-selected="true">
                                        Mes réservations
                                    </a>
                                    <a className="nav-link" id="v-pills-payment-done-tab" data-toggle="pill" href="#v-pills-payment-done" role="tab" aria-controls="v-pills-payment-done" aria-selected="false">
                                        Paiements effectués
                                    </a>
                                    <a className="nav-link" id="v-pills-payment-repaid-tab" data-toggle="pill" href="#v-pills-payment-repaid" role="tab" aria-controls="v-pills-payment-repaid" aria-selected="false">
                                        Paiement remboursés
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-10">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade active show" id="v-pills-reservation" role="tabpanel" aria-labelledby="v-pills-reservation-tab">
                                        {this.tableGenerator(true, true)}
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-payment-done" role="tabpanel" aria-labelledby="v-pills-payment-done-tab">
                                        {this.tableGenerator(false, false)}
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-payment-repaid" role="tabpanel" aria-labelledby="v-pills-payment-repaid-tab">
                                        {this.tableGenerator(false, false)}
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
        role: state.profile.role,
    };
};

export default connect(mapStateToProps, null)(PaymentsAndReservations);
