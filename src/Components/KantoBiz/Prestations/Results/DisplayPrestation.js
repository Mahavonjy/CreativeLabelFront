import axios from "axios";
import dateFormat from 'dateformat';
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import StarRatings from 'react-star-ratings';
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import "../../../../assets/css/style/Results.css"
import PurchaseInformation from "../../../Cart/PurchaseInformation";
import {
    addListOfOptionsAdded,
    addReservationAddress,
    addServiceToShow,
    changeDateToSearch,
    changeInitialized
} from "../../../FunctionTools/FunctionProps";
import {
    ChangeDate,
    changeFields,
    checkUnitKey,
    checkValueIfExistInArray,
    formatDate
} from "../../../FunctionTools/Tools";
import Calendar from "../../Calendar/Calendar";

function DisplayPrestation(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const profile_info = useSelector(state => state.profile.profile_info);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const reservation_address = useSelector(state => state.KantobizSearchInfo.reservation_address);
    const list_of_options_added = useSelector(state => state.KantobizSearchInfo.list_of_options_added);

    const isMounted = useRef(false);
    const paymentRef = useRef(null);
    const [event_date, setEventDate] = useState(null);
    const [reservation, setReservation] = useState(false);
    const [address, setAddress] = useState(reservation_address);
    const [tva, setTva] = useState(0);
    const [ht_price, setHtPrice] = useState(0);
    const [isl_amount, setIslAmount] = useState(0);
    const [total_amount, setTotalAmount] = useState(0);
    const [rating, setRating] = useState(1);

    const onScrollViewSearch = () => {
        paymentRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const validReservation = async () => {
        if (!profile_info)
            document.getElementById("LoginRequire").click();
        else {
            if (!address) toast.error("Veuiller nous renseigner l'adresse de votre evenenment");
            else if (formatDate(date_to_search) === formatDate(new Date())) toast.error("Veuillez choisir une autre date");
            else {
                await setReservation(true);
                await onScrollViewSearch();
            }
        }
    };

    const ImageClick = (e) => {
        const cube = document.querySelector(".cube");
        let cubeImageClass = cube.classList[1];

        const targetNode = e.target.nodeName;
        const targetClass = e.target.className;

        if (targetNode === "INPUT" && targetClass !== cubeImageClass) cube.classList.replace(cubeImageClass, targetClass);
    };

    const addOption = async (value) => {
        let tmp = [...list_of_options_added];
        let tmpService = {...service_to_show};
        tmpService.price += value.price;
        if (!checkValueIfExistInArray(value.id, tmp)) {
            tmp.push(value.id);
            await dispatch(addListOfOptionsAdded(tmp));
            await dispatch(addServiceToShow(tmpService));
            await toast.success("Option Ajouter avec succès");
        }
    };

    const removeOption = async (value) => {
        let tmp = [];
        let tmpService = {...service_to_show};
        Promise.all(list_of_options_added.map(elem => {
            if (elem !== value.id) tmp.push(value.id);
            else tmpService.price -= value.price;
        })).then(r => {
            dispatch(addListOfOptionsAdded(tmp));
            dispatch(addServiceToShow(tmpService));
            toast.warn("Option supprimer avec succès");
        });
    };

    useEffect(() => {

        setEventDate(dateFormat(date_to_search, "yyyy-mm-dd"));
        axios.post("api/reservation/check_total_price",
            {price: service_to_show.price},
            {headers: props.headers}).then((resp) => {
                setTva(resp.data["tva"]);
                setHtPrice(resp.data["ht_price"]);
                setIslAmount(resp.data["isl_amount"]);
                setTotalAmount(resp.data["total_amount"])
            });

        return () => {
            isMounted.current = true
        };
    }, [service_to_show, profile_info, date_to_search]);

    return (
        <div className="Base pt-5 p-b-100 zIndex-1">
            <ReactTooltip/>
            <ReactTooltip className="special-color-dark" id='refund' aria-haspopup='true'>
                <h5 className="text-center text-green"> Details des rembouresement </h5><br/>
                <h6 className="text-center text-info"> Rembouresement flexible</h6>
                <small>• Si l’utilisateur annule jusqu à 7 jours avant le début de la représentation il est remboursé à
                    100%. </small><br/>
                <small>• Si l’utilisateur annule moins de 7 jours avant la représentation il est remboursé à
                    50% </small><br/><br/>
                <h6 className="text-center text-info"> Rembouresement stricte</h6>
                <small>• Si l’utilisateur annule jusqu’à 7 jours avant le début de la représentation, il est remboursé à
                    50%</small><br/>
                <small>• Si l’utilisateur annule moins de 7 jours avant la représentation, il n’y a pas de
                    remboursement.</small><br/><br/>
            </ReactTooltip>
            <ReactTooltip className="special-color-dark" id='option' aria-haspopup='true'>
                <h5 className="text-center text-green"> Explication des options </h5><br/>
                <small>• Quelque option en plus de la prestation d'origine que l'artist propose pour amelioré le
                    show </small><br/>
                <small>• Voici quelques exemple d'option : Featuring avec un artiste, shooting ... </small><br/><br/>
            </ReactTooltip>
            <div className="profile-page">
                <button
                    onClick={() => {
                        dispatch(changeInitialized(false));
                        if (props.read)
                            history.push("/Profile");
                        else history.push("/KantoBiz");
                    }}
                    style={{position: "fixed", bottom: "5%", zIndex: 99}}
                    className="btn-custom btn-outline-light border-bottom-0 border-right-0">
                    <i className="icon icon-long-arrow-left s-24 align-middle"/>&nbsp;Precedent
                </button>
                <div className="page-header header-filter border1" data-parallax="true"
                     style={{backgroundImage: 'url(' + service_to_show.galleries[0] + ')'}}/>
                <div className="main bg-dark main-raised ml-3 mr-3">
                    <div className="profile-content">
                        <div className="container">
                            <div className="col-md-6 ml-auto mr-auto">
                                <div className="profile">
                                    <div className="avatar-plain">
                                        <img
                                            src={service_to_show.galleries.length > 1
                                                ? service_to_show.galleries[1]
                                                : service_to_show.galleries[0]}
                                            alt="Circle" className="img-raised rounded-circle img-fluid"/>
                                    </div>
                                    <div className="name pt-5">
                                        <h3 className="title text-red text-center"
                                            data-tip="Titre de la Prestation">{service_to_show.title}</h3>
                                        <h6 className="pb-2"
                                            data-tip="Different genre produit par l'artiste">
                                            {service_to_show.thematics.join(", ")}
                                        </h6>
                                        <button className="btn btn-link btn-outline-info icon-instagram"
                                                data-tip="Partager Cette Prestation sur Instagram"/>
                                        <button className="btn btn-link btn-outline-info icon-facebook"
                                                data-tip="Partager Cette Prestation sur Facebook"/>
                                        <button className="btn btn-link btn-outline-info icon-twitter"
                                                data-tip="Partager Cette Prestation sur Twitter"/>
                                    </div>
                                </div>
                            </div>
                            <div className="description text-center">
                                <p data-tip="Description">{service_to_show.description}</p>
                                <div className="flex-column justify-content-center" data-tip="Noter Moi">
                                    <StarRatings rating={service_to_show.notes} starRatedColor="red"
                                                 numberOfStars={5} starDimension="20px"
                                                 starSpacing="10px" className="col" name='rating'/>
                                    <span className="col pt-2">5&nbsp;✰</span>
                                </div>
                            </div>
                            <div className="row text-center pt-5">
                                <div className="col-md-4">
                                    <div className="mb-4 p-1 rounded" style={{border: "dashed 1px white"}}>
                                        <h2 className="text-red border-bottom">Details de la reservations</h2>
                                        <h3 className="col"><small className="text-light">Prix
                                            HT:</small>&nbsp;{ht_price}$&nbsp;<i className="icon text-red icon-info"
                                                                                 data-tip="Ceci est le prix HT"/></h3>
                                        <h3 className="col"><small className="text-light">Tva
                                            (20%):</small>&nbsp;{tva}$&nbsp;<i className="icon text-red icon-info"
                                                                               data-tip="Ceci est le tva du prix HT"/>
                                        </h3>
                                        <h3 className="col"><small className="text-light">Prix
                                            TTC:</small>&nbsp;{total_amount}$&nbsp;<i
                                            className="icon text-red icon-info" data-tip="Ceci est le prix TTC"/></h3>
                                    </div>
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h4 className="col text-primary">Temps de préparation
                                                : {service_to_show.preparation_time}
                                                {checkUnitKey(service_to_show.unit_of_the_preparation_time)}&nbsp;
                                                <i className="icon icon-info"
                                                   data-tip="Ceci est le temps de preparation de l'artiste"/></h4>
                                            <h4 className="col text-primary">Durée de la prestation
                                                : {service_to_show.duration_of_the_service}
                                                {checkUnitKey(service_to_show.unit_duration_of_the_service)}&nbsp;
                                                <i className="icon icon-info"
                                                   data-tip="Ceci est le durée de l'evenement"/></h4>
                                            <div className="col pt-2 pb-2">
                                                <div className="custom-float">
                                                    <div className="input-group-prepend d-inline-block center">
                                                        <div className="input-group-text text-dark">
                                                            <i className="icon-clock-1"/>&nbsp;Date de l'évènement
                                                            *&nbsp;<i className="icon icon-info"
                                                                      data-tip="Indiquer la date et l'heure de l'évènement"/>
                                                        </div>
                                                        <input type="date" value={event_date} className="form-control"
                                                               onChange={
                                                                   (date) =>
                                                                       ChangeDate(
                                                                           date,
                                                                           setEventDate,
                                                                           dispatch,
                                                                           changeDateToSearch
                                                                       )
                                                               }/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col pt-2 pb-2">
                                                <div className="custom-float">
                                                    <div className="input-group-prepend d-inline-block center"
                                                         style={{width: "100%"}}>
                                                        <div className="input-group-text text-dark">
                                                            <i className="icon-map-marker"/>&nbsp;Adresse de l'évènement
                                                            *
                                                        </div>
                                                        <input type="text" value={address} id="address"
                                                               placeholder="Indiquer l'adresse de l'évènement"
                                                               name="address" className="form-control"
                                                               onChange={(e) => {if (!props.read) changeFields(setAddress, e, addReservationAddress, dispatch)}}/>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-outline-success"
                                                onClick={!props.read && validReservation}>Réserver
                                        </button>
                                    </div>
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Plus de détails</h2>
                                            <h4 className="col"><strong>Politique d’annulation
                                                :</strong> {service_to_show.refund_policy}&nbsp;<i
                                                className="icon icon-info" data-tip data-for='refund'/></h4>
                                            <h4 className="col"><strong>Catégorie
                                                :</strong> {service_to_show.thematics.join(", ")}</h4>
                                            <h4 className="col"><strong>Type(s) d’évènement(s)
                                                :</strong> {service_to_show.events.join(", ")}</h4>
                                            <h4 className="col"><strong>Nombre d'artistes
                                                :</strong> {service_to_show.number_of_artists}</h4>
                                            <h4 className="col"><strong>Ville de référence
                                                :</strong> {service_to_show.reference_city}</h4>
                                            <h4 className="col"><strong>Ville(s) annexe(s)
                                                :</strong> {service_to_show.others_city.join(", ")}</h4>
                                        </div>
                                    </div>
                                    <div className="mb-4 card">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Matériels nécessaires&nbsp;<i
                                                className="icon icon-info"
                                                data-tip="Une liste non exhaustive des matériels nécessaires à la prestation artistique. La liste complète des matériels nécessaires se trouve dans la fiche technique"/>
                                            </h2>
                                            <div className="col">
                                                {service_to_show.materials.list_of_materials.length !== 0 ?
                                                    <ul>
                                                        {service_to_show.materials.list_of_materials.map((val, index) =>
                                                            <li key={index}><i
                                                                className="icon icon-success text-green"/>{val}</li>
                                                        )}
                                                    </ul> : <p className="text-red">Pas de material necessaire</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {reservation ?
                                    <div className="col-md-8" ref={paymentRef}>
                                        <PurchaseInformation eventDate={event_date} address={address}
                                                             TotalPrice={service_to_show.price}
                                                             headers={props.headers} kantoBiz/>
                                    </div> :
                                    <div className="col-md-8">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Option(s) pour la prestation&nbsp;<i
                                                className="icon icon-info" data-tip data-for="option"/></h2>
                                            {service_to_show.options.length !== 0 ?
                                                <table className="responsive-table border-0">
                                                    <thead>
                                                    <tr>
                                                        <th scope="col">Nom&nbsp;<i className="icon icon-info"
                                                                                    data-tip="Nom donner par l'artiste cette option"/>
                                                        </th>
                                                        <th scope="col">Tag&nbsp;<i className="icon icon-info"
                                                                                    data-tip="Le nom des autres artiste proposé avec"/>
                                                        </th>
                                                        <th scope="col">Prix&nbsp;<i className="icon icon-info"
                                                                                     data-tip="Le prix de cette option en plus de la prestation"/>
                                                        </th>
                                                        <th scope="col">Description&nbsp;<i className="icon icon-info"
                                                                                            data-tip="quelque description qui explique l'option"/>
                                                        </th>
                                                        <th scope="col-lg-4">Ajouter&nbsp;<i className="icon icon-info"
                                                                                             data-tip="Ajouter cette l'option en plus de la prestation"/>
                                                        </th>
                                                    </tr>
                                                    </thead>

                                                    <tbody>
                                                    {service_to_show.options.map((val, index) =>
                                                        <tr key={index}>
                                                            <th className="text-center small bolder border-left-0 border-bottom-0"
                                                                scope="row">{val.name}</th>
                                                            <td className="small"
                                                                data-title="Tag">{val.artist_tagged}</td>
                                                            <td className="small" data-title="Prix">{val.price}$</td>
                                                            <td className="small"
                                                                data-title="Description">{val.description || "Pas de description"}</td>
                                                            <td className="small border-bottom-0 border-right-0"
                                                                data-title="Ajouter">
                                                                {checkValueIfExistInArray(val.id, list_of_options_added) ?
                                                                    <i className="icon icon-success text-green s-24"
                                                                       onClick={() => removeOption(val)}
                                                                       data-tip="Deja ajouté"/>
                                                                    :
                                                                    <i className="icon icon-plus text-red s-24"
                                                                       onClick={() => addOption(val)}
                                                                       data-tip="Ajoute moi"/>}
                                                            </td>
                                                        </tr>)}
                                                    </tbody>
                                                </table> :
                                                <h3 className="text-light text-center">Pas d'options pour cette
                                                    prestations</h3>
                                            }
                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">
                                                Galerie d'images&nbsp;
                                                <i className="icon icon-info"
                                                   data-tip="Quelques photo de l'artiste sur cette prestation"/>
                                            </h2>
                                            <div className="demo-gallery">
                                                <ul id="lightgallery">
                                                    {service_to_show.galleries.map((val, index) =>
                                                        <li key={index} data-src={val}>
                                                            <a href={val} target="_blank">
                                                                <img alt="gallery" className="img-responsive" src={val}/>
                                                                <div className="demo-gallery-poster">
                                                                    <i className="icon icon-search-1 s-36 text-red"/>
                                                                </div>
                                                            </a>
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Calendrier de la prestation&nbsp;<i
                                                className="icon icon-info"
                                                data-tip="Le planing de d'artiste sur cette prestation"/></h2>
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
