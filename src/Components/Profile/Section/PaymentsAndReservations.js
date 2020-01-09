import React, { Component } from "react";

class PaymentsAndReservations extends Component {
    state = {
        isMounted: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="col" style={{height: 320}}>
                <div className="card no-b">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3">
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
                            <div className="col-9">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade active show"
                                         id="v-pills-reservation"
                                         role="tabpanel"
                                         aria-labelledby="v-pills-reservation-tab">
                                        <p>
                                            Rien pour la reservation pour le moment
                                        </p>
                                    </div>
                                    <div className="tab-pane fade"
                                         id="v-pills-payment-done"
                                         role="tabpanel"
                                         aria-labelledby="v-pills-payment-done-tab">
                                        <p>
                                            Rien pour le payment effectués pour le moment
                                        </p>
                                    </div>
                                    <div className="tab-pane fade"
                                         id="v-pills-payment-repaid"
                                         role="tabpanel"
                                         aria-labelledby="v-pills-payment-repaid-tab">
                                        <p>
                                            Rien pour le payment remboursée pour le moment
                                        </p>
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

export default PaymentsAndReservations;
