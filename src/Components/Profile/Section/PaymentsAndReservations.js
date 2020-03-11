import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addAllUSerBookingReservation, addAllUSerReservation} from "../../FunctionTools/FunctionProps";
import {checkErrorMessage} from "../../Validators/Validatiors";

function PaymentsAndReservations(props) {

    const dispatch = useDispatch();
    const reservations_list = useSelector(state => state.profile.reservations_list);
    const reservations_booking_list = useSelector(state => state.profile.reservations_booking_list);
    const role = useSelector(state => state.profile.role);

    const isMounted = useRef(false);
    const [headers, setHeaders] = useState({});

    const replace_array_value = async (id_of_reservation, value, array_, func_to_dispatch) => {
        let tmp = [];
        await Promise.all(array_.map(element => {
            if (element.id === id_of_reservation) tmp.push(value);
            else tmp.push(element);
        })).then( r => {
            toast.success("Changement prise en compte");
            dispatch(func_to_dispatch(tmp));
        });
    };

    const canceled_reservation_booked = (id_of_reservation) => {
        axios.put( "api/reservation/auditor_decline/" + id_of_reservation, {}, {headers: headers}).then((resp) => {
            replace_array_value(id_of_reservation, resp.data, reservations_booking_list, addAllUSerBookingReservation).then(r => null)
        }).catch(error => toast.error(checkErrorMessage(error).message));
    };

    const accepted_reservation_demand = (id_of_reservation) => {
        axios.put( "api/reservation/artist_accept/" + id_of_reservation, {}, {headers: headers}).then((resp) => {
            replace_array_value(id_of_reservation, resp.data, reservations_list, addAllUSerReservation).then(r => null)
        }).catch(error => toast.error(checkErrorMessage(error).message));
    };

    const canceled_reservation_demand = (id_of_reservation) => {
        axios.put( "api/reservation/artist_decline/" + id_of_reservation, {}, {headers: headers}).then((resp) => {
            replace_array_value(id_of_reservation, resp.data, reservations_list, addAllUSerReservation).then(r => null)
        }).catch(error => toast.error(checkErrorMessage(error).message));
    };

    const tableGenerator = (val, demand) => {
        return (
            <table className="responsive-table mt-4">
                <thead>
                <tr>
                    <th scope="col-lg-4">Titre&nbsp;<i className="icon icon-info" data-tip="Le titre de la prestation que vous avez choisie"/></th>
                    <th scope="col">Date&nbsp;<i className="icon icon-info" data-tip="Date de l'évènement"/></th>
                    {demand ? <th scope="col">Auditeur&nbsp;<i className="icon icon-info" data-tip="Le nom de l'auditeur concerné"/></th>
                        : <th scope="col">Artiste&nbsp;<i className="icon icon-info" data-tip="Le nom de l'artiste concerné par l'évènement"/></th>}
                    <th scope="col">Évènement&nbsp;<i className="icon icon-info" data-tip="Le type d'évènement de l'auditeur pro "/></th>
                    <th scope="col">Adresse&nbsp;<i className="icon icon-info" data-tip="L'adresse où se déroulera l'évènement"/></th>
                    <th scope="col">Montant&nbsp;<i className="icon icon-info" data-tip="Montant HT de la prestation (fixé par l'artiste)"/></th>
                    <th scope="col">Status&nbsp;<i className="icon icon-info" data-tip="Le statut de la réservation de l'auditeur pro."/></th>
                    <th scope="col">Facture&nbsp;<i className="icon icon-info" data-tip="Vous pouvez telecharger votre facture ici en cliquant sur 'télécharger' ou via votre email"/></th>
                    <th scope="col">Note&nbsp;<i className="icon icon-info" data-tip={"Donner une note a la cette prestaion"}/></th>
                    <th scope="col">Action&nbsp;<i className="icon icon-info" data-tip={"Ce boutton sera est utile afin d'annuler la prestation sauf si le status est en échec"}/></th>
                </tr>
                </thead>

                <tbody>
                {val.map((value, index) =>
                    <tr key={index}>
                        <th className="text-center small bolder" scope="row">{value.title}</th>
                        <td className="small" data-title="Date">{value.event_date.split("T")[0]}</td>
                        {demand ? <td className="small" data-title="Auditeur">{value.auditor_name}</td>:
                            <td className="small" data-title="Artist">{value.artist_name}</td>}
                        <td className="small" data-title="Évènenment">{value.event}</td>
                        <td className="small" data-title="Adresse">{value.address}</td>
                        <td className="small" data-title="Montant">{value.total_amount}$</td>
                        {value.status === "pending" ? <td className="small text-yellow" data-title="Status">En attente</td>
                            : value.status === "accepted" ? <td className="small text-green" data-title="Status">Accepter</td> : <td className="small text-red" data-title="Status">Refuser</td>}
                        {value.status === "pending" || val.status === "declined" ? <td className="small text-red" data-title="Status">pas de facture</td>: <td className="small text-red" data-title="Status">telecharger</td>}
                        <td className="small text-red border-top" data-title="Status" data-tip="Donner une note à l'auditeur pro (sens de l'accueil, convivialité, sympathie, etc...)">Donner une note</td>
                        {value.status === "pending" ?
                            <td className="text-center border-bottom-0 border-right-0">
                                {!demand && <button className="btn btn-outline-danger text-center mt-2" onClick={() => canceled_reservation_booked(value.id)}>Annuler</button>}
                                {demand && <button className="btn btn-outline-danger text-center mt-2" onClick={() => canceled_reservation_demand(value.id)}>Annuler</button>}
                                {demand && <button className="btn btn-outline-success text-center mt-2" onClick={() => accepted_reservation_demand(value.id)}>Accepter</button>}
                            </td> :
                            <td className="text-center border-bottom-0 border-right-0">
                                <button className="btn btn-outline-danger text-center mt-2" onClick={() => canceled_reservation_demand(value.id)} disabled={!(value.status === "accepted")}>Annuler</button>
                            </td>
                        }
                    </tr>
                )}
                </tbody>
            </table>
        );
    };

    useEffect(() => {

        let headers = props.headers;
        headers['Content-Type'] = 'application/json';
        setHeaders(headers);

        return () => {
            isMounted.current = true
        };
    }, [reservations_list, reservations_booking_list]);

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
                                {role !== "professional_auditor" &&
                                <a className="nav-link" data-toggle="pill" href="#v-pills-demandes" role="tab" aria-controls="v-pills-demandes" aria-selected="false">
                                    Les demandes de réservations
                                </a>}
                                {/*<a className="nav-link" id="v-pills-payment-done-tab" data-toggle="pill" href="#v-pills-payment-done" role="tab" aria-controls="v-pills-payment-done" aria-selected="false">*/}
                                {/*    Paiements effectués*/}
                                {/*</a>*/}
                                {/*<a className="nav-link" id="v-pills-payment-repaid-tab" data-toggle="pill" href="#v-pills-payment-repaid" role="tab" aria-controls="v-pills-payment-repaid" aria-selected="false">*/}
                                {/*    Paiements remboursés*/}
                                {/*</a>*/}
                            </div>
                        </div>
                        <div className="col-lg-10">
                            <div className="tab-content" id="v-pills-tabContent">
                                <div className="tab-pane fade active show" id="v-pills-reservation" role="tabpanel" aria-labelledby="v-pills-reservation-tab">
                                    {reservations_booking_list.length !== 0 ? tableGenerator(reservations_booking_list):
                                        <h3 className="text-red center-center ">Vous n'avez pas de reservations</h3>}
                                </div>
                                {role !== "professional_auditor" &&
                                <div className="tab-pane fade" id="v-pills-demandes" role="tabpanel" aria-labelledby="v-pills-demandes-tab">
                                    {reservations_list.length !== 0 ? tableGenerator(reservations_list, true):
                                        <h3 className="text-red center-center ">Vous n'avez pas de demandes de reservation</h3>}
                                </div>}
                                {/*<div className="tab-pane fade" id="v-pills-payment-done" role="tabpanel" aria-labelledby="v-pills-payment-done-tab">*/}
                                {/*    {tableGenerator(false, false)}*/}
                                {/*</div>*/}
                                {/*<div className="tab-pane fade" id="v-pills-payment-repaid" role="tabpanel" aria-labelledby="v-pills-payment-repaid-tab">*/}
                                {/*    {tableGenerator(false, false)}*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentsAndReservations;
