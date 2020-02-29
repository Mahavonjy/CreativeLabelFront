import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker"
import {useDispatch, useSelector} from "react-redux";
import StarRatings from 'react-star-ratings';
import Calendar from "../../Calendar/Calendar";
import {formatDate, changeFields, checkUnit, checkUnitKey} from "../../../FunctionTools/Tools";
import { toast } from "react-toastify";
import "../../style/Results.css"
import ReactTooltip from "react-tooltip";
import PurchaseInformation from "../../../Cart/PurchaseInformation";

function DisplayPrestation(props) {

    const dispatch = useDispatch();
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);

    const isMounted = useRef(false);
    const [event_date, setEventDate] = useState(new Date()); // synchroniser avec la recherche après
    const [reservation, setReservation] = useState(false);
    const [address, setAddress] = useState("");
    const [price] = useState(400);
    const [rating, setRating] = useState(1);

    const Reserve = () => {
        if (!props.read) {
            let new_date = formatDate(event_date);
            let now = formatDate(new Date());
            if (!address) toast.error("Veuiller nous renseigner l'adresse de votre evenenment");
            else if (parseInt(new_date) - parseInt(now) <= 0) toast.error("Veuillez mettre une autre date");
            else setReservation(true)
        }
    };

    const ImageClick = (e) => {
        const cube = document.querySelector(".cube");
        let cubeImageClass = cube.classList[1];

        const targetNode = e.target.nodeName;
        const targetClass = e.target.className;

        if (targetNode === "INPUT" && targetClass !== cubeImageClass) cube.classList.replace(cubeImageClass, targetClass);
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base pt-5 p-b-100">
            <ReactTooltip/>
            <ReactTooltip className="special-color-dark" id='refund' aria-haspopup='true'>
                <h5 className="text-center text-green"> Details des rembouresement </h5><br/>
                <h6 className="text-center text-info"> Rembouresement flexible</h6>
                <small>• Si l’utilisateur annule jusqu à 7 jours avant le début de la représentation il est remboursé à 100%. </small><br/>
                <small>• Si l’utilisateur annule moins de 7 jours avant la représentation il est remboursé à 50% </small><br/><br/>
                <h6 className="text-center text-info"> Rembouresement stricte</h6>
                <small>• Si l’utilisateur annule jusqu’à 7 jours avant le début de la représentation, il est remboursé à 50%</small><br/>
                <small>• Si l’utilisateur annule moins de 7 jours avant la représentation, il n’y a pas de remboursement.</small><br/><br/>
            </ReactTooltip>
            <ReactTooltip className="special-color-dark" id='option' aria-haspopup='true'>
                <h5 className="text-center text-green"> Explication des options </h5><br/>
                <small>• Quelque option en plus de la prestation d'origine que l'artist propose pour amelioré le show </small><br/>
                <small>• Voici quelques exemple d'option : Featuring avec un artiste, shooting ... </small><br/><br/>
            </ReactTooltip>
            <div className="profile-page">
                <div className="page-header header-filter" data-parallax="true" style={{backgroundImage: 'url(' + service_to_show.galleries[0] + ')'}} />
                <div className="main bg-dark main-raised ml-3 mr-3">
                    <div className="profile-content">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 ml-auto mr-auto">
                                    <div className="profile">
                                        <div className="avatar-plain">
                                            <img src={service_to_show.galleries.length > 1 ? service_to_show.galleries[1]: service_to_show.galleries[0]} alt="Circle" className="img-raised rounded-circle img-fluid" />
                                        </div>
                                        <div className="name pt-5">
                                            <h3 className="title text-red text-center" data-tip="Titre de la Prestation">{service_to_show.title}</h3>
                                            <h6 className="pb-2" data-tip="Different genre produit par l'artiste">{service_to_show.thematics.join(", ")}</h6>
                                            <button className="btn btn-link btn-outline-info icon-instagram" data-tip="Partager Cette Prestation sur Instagram"/>
                                            <button className="btn btn-link btn-outline-info icon-facebook" data-tip="Partager Cette Prestation sur Facebook"/>
                                            <button className="btn btn-link btn-outline-info icon-twitter" data-tip="Partager Cette Prestation sur Twitter"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="description text-center">
                                <p data-tip="Description">{service_to_show.description}</p>
                                <div className="flex-column justify-content-center" data-tip="Noter Moi">
                                    <StarRatings rating={rating}
                                                 starRatedColor="red"
                                                 changeRating={newRating => { if (!props.read) setRating(newRating)}}
                                                 numberOfStars={5}
                                                 starDimension="20px"
                                                 starSpacing="10px"
                                                 className="col"
                                                 name='rating'/>
                                    <span className="col pt-2">5&nbsp;✰</span>
                                </div>

                            </div>
                            <div className="row text-center pt-5">
                                <div className="col-md-4">
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">{service_to_show.price}$&nbsp;<i className="icon icon-info" data-tip="Ceci est le prix HT de la prestation"/></h2>
                                            <h4 className="col text-primary">Temps de préparation : {service_to_show.preparation_time}{checkUnitKey(service_to_show.unit_of_the_preparation_time)}&nbsp;<i className="icon icon-info" data-tip="Ceci est le temps de preparation de l'artiste"/></h4>
                                            <h4 className="col text-primary">Durée de la prestation : {service_to_show.duration_of_the_service}{checkUnitKey(service_to_show.unit_duration_of_the_service)}&nbsp;<i className="icon icon-info" data-tip="Ceci est le durée de l'evenement"/></h4>
                                            <div className="col">
                                                <div className="s-24">09</div>
                                                <span>March 2019</span>
                                            </div>
                                            <div className="col">
                                                <small><i className="icon-clock-o mr-1"/> 7:00 PM - 11:00 PM</small>
                                            </div>
                                            <div className="col pt-2 pb-2">
                                                <div className="custom-float">
                                                    <div className="input-group-prepend d-inline-block center">
                                                        <div className="input-group-text text-dark">
                                                            <i className="icon-clock-1"/>&nbsp;Date de l'évènement *&nbsp;<i className="icon icon-info" data-tip="Indiquer la date et l'heure de l'évènement"/></div>
                                                        <DatePicker selected={event_date}
                                                                    onChange={date => {if (!props.read) setEventDate(date)}}
                                                                    className="form-control"
                                                                    style={{zIndex: 99}}
                                                                    dateFormat="MMMM d, yyyy"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col pt-2 pb-2">
                                                <div className="custom-float">
                                                    <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                                        <div className="input-group-text text-dark">
                                                            <i className="icon-map-marker"/>&nbsp;Adresse de l'évènement *</div>
                                                        <input type="text" value={address} id="address"
                                                               placeholder="Indiquer l'adresse de l'évènement"
                                                               name="address" className="form-control"
                                                               onChange={(e) => {if (!props.read) changeFields(setAddress, e)}} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-success" onClick={Reserve}>Réserver</button>
                                    </div>
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Plus de détails</h2>
                                            <h4 className="col"><strong>Politique d’annulation  :</strong> {service_to_show.refund_policy}&nbsp;<i className="icon icon-info" data-tip data-for='refund'/></h4>
                                            <h4 className="col"><strong>Catégorie :</strong> {service_to_show.thematics.join(", ")}</h4>
                                            <h4 className="col"><strong>Type(s) d’évènement(s) :</strong> {service_to_show.events.join(", ")}</h4>
                                            <h4 className="col"><strong>Nombre d'artistes :</strong> {service_to_show.number_of_artists}</h4>
                                            <h4 className="col"><strong>Ville de référence :</strong> {service_to_show.reference_city}</h4>
                                            <h4 className="col"><strong>Ville(s) annexe(s) :</strong> {service_to_show.others_city.join(", ")}</h4>
                                        </div>
                                    </div>
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Matériels nécessaires&nbsp;<i className="icon icon-info" data-tip="Une liste non exhaustive des matériels nécessaires à la prestation artistique. La liste complète des matériels nécessaires se trouve dans la fiche technique"/></h2>
                                            <div className="col">
                                                {service_to_show.materials.list_of_materials.length !== 0 ?
                                                <ul>
                                                    {service_to_show['materials'].map((val, index) =>
                                                        <li key={index}><i className="icon icon-success text-green"/>{val}</li>
                                                    )}
                                                </ul> : <p className="text-red">Pas de material necessaire</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {reservation ?
                                    <div className="col-md-8">
                                        <PurchaseInformation eventDate={event_date} address={address} TotalPrice={price} kantoBiz/>
                                    </div> :
                                    <div className="col-md-8">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Option(s) pour la prestation&nbsp;<i className="icon icon-info" data-tip data-for="option"/></h2>

                                            <table className="responsive-table border-0">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Nom&nbsp;<i className="icon icon-info" data-tip="Nom donner par l'artiste cette option"/></th>
                                                    <th scope="col">Tag&nbsp;<i className="icon icon-info" data-tip="Le nom des autres artiste proposé avec"/></th>
                                                    <th scope="col">Prix&nbsp;<i className="icon icon-info" data-tip="Le prix de cette option en plus de la prestation"/></th>
                                                    <th scope="col">Description&nbsp;<i className="icon icon-info" data-tip="quelque description qui explique l'option"/></th>
                                                    <th scope="col-lg-4">Ajouter&nbsp;<i className="icon icon-info" data-tip="Ajouter cette l'option en plus de la prestation"/></th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                <tr>
                                                    <th className="text-center small bolder border-left-0 border-bottom-0" scope="row">Shooting</th>
                                                    <td className="small" data-title="Tag">Photographe</td>
                                                    <td className="small" data-title="Prix">800$</td>
                                                    <td className="small" data-title="Description">New Description</td>
                                                    <td className="small border-bottom-0 border-right-0" data-title="Ajouter"><i className="icon icon-plus s-24" data-tip="Ajoute moi"/></td>
                                                </tr>
                                                <tr>
                                                    <th className="text-center small bolder border-left-0 border-bottom-0" scope="row">Featuring</th>
                                                    <td className="small" data-title="Tag">Jazz mmc</td>
                                                    <td className="small" data-title="Prix">800$</td>
                                                    <td className="small" data-title="Description">New Description</td>
                                                    <td className="small border-bottom-0 border-right-0" data-title="Ajouter"><i className="icon icon-plus s-24" data-tip="Ajoute moi"/></td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Galerie d'images&nbsp;<i className="icon icon-info" data-tip="Quelques photo de l'artiste sur cette prestation"/></h2>
                                            <div>
                                                <div className="cube-container">
                                                    <div className="cube initial-position">
                                                        {service_to_show.galleries.map((val, index) =>
                                                            <img key={index} className={"cube-face-image image-" + index} src={val} alt=""/>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="image-buttons">
                                                    {service_to_show.galleries.map((val, index) =>
                                                        <input onClick={ImageClick} width={100} type="image" className={"show-image-" + index} src={val} alt=""/>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Calendrier de la prestation&nbsp;<i className="icon icon-info" data-tip="Le planing de d'artiste sur cette prestation"/></h2>
                                            <Calendar noEdit/>
                                        </div>
                                    </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DisplayPrestation;
