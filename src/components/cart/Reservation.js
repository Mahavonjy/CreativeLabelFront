import DateFnsUtils from "@date-io/date-fns";
import {TextField} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
// import Calendar from "../../calendar/calendar";
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import AddLocation from '@material-ui/icons/AddLocation';
import {DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import format from "date-fns/format";
import frLocale from "date-fns/locale/fr";
import React, {useRef, useState} from "react";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {useDispatch, useSelector} from "react-redux";
// import StarRatings from 'react-star-ratings';
import {toast} from "react-toastify";
import "../../assets/css/style/Results.css"
import {
    addListOfOptionsAdded,
    addReservation,
    addReservationCodePostal,
    addReservationRue,
    addReservationVille,
    addServiceToShow,
    changeDateToSearch
} from "../functionTools/functionProps";
import {
    ChangeDate,
    changeFields,
    checkUnitKey,
    checkValueIfExistInArray,
    formatDate,
    getSteps,
    handleNext
} from "../functionTools/tools";

import {defaultMaterialThemePrestation, defaultThemeDark, defaultThemeLight} from "../functionTools/utilStyles";


class LocalizedUtils extends DateFnsUtils {
    getDatePickerHeaderText(date) {
        return format(date, "d MMM yyyy", {locale: this.locale});
    }
}

function Reservation(props) {

    const dispatch = useDispatch();
    const profile_info = useSelector(state => state.profile.profile_info);
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const reservations = useSelector(state => state.KantoBizForm.reservation);
    const tva = useSelector(state => state.KantoBizForm.tva);
    const ht_price = useSelector(state => state.KantoBizForm.ht_price);
    const total_amount = useSelector(state => state.KantoBizForm.total_amount);
    const completed = useSelector(state => state.KantoBizForm.completed);
    const activeStep = useSelector(state => state.KantoBizForm.activeStep);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const reservation_code_postal = useSelector(state => state.KantobizSearchInfo.reservation_code_postal);
    const reservation_rue = useSelector(state => state.KantobizSearchInfo.reservation_rue);
    const reservation_ville = useSelector(state => state.KantobizSearchInfo.reservation_ville);


    const list_of_options_added = useSelector(state => state.KantobizSearchInfo.list_of_options_added);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    const paymentRef = useRef(null);
    const [event_date, setEventDate] = useState(null);
    const [reservation, setReservation] = useState(reservations);
    const [code_postal, setCodePostal] = useState(reservation_code_postal);
    const [rue, setRue] = useState(reservation_rue);
    const [ville, setVille] = useState(reservation_ville);
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);
    /* eslint-disable-next-line no-unused-vars */
    // const [rating, setRating] = useState(1);
    //const [val, setVal] = useState(0);
    //state for stepper
    const steps = getSteps();

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        button: {
            marginRight: theme.spacing(1),
        },
        backButton: {
            marginRight: theme.spacing(1),
        },
        completed: {
            display: 'inline-block',
        },
        instructions: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    }));

    const onScrollViewSearch = () => {
        paymentRef.current.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const validReservation = async () => {
        if (!profile_info)
            document.getElementById("LoginRequire").click();
        else {
            if (!code_postal) toast.error("Veuiller nous renseigner le code postal de l'adresse");
            else if (!ville) toast.error("Veuiller nous renseigner la ville où aura lieu l'événement");
            else if (formatDate(date_to_search) === formatDate(new Date())) toast.error("Veuillez choisir une autre date");
            else {
                await setReservation(true);
                await dispatch(addReservation(true));
                await onScrollViewSearch();
                handleNext(steps, activeStep, completed, dispatch);
            }
        }
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
            return true
        })).then(r => {
            dispatch(addListOfOptionsAdded(tmp));
            dispatch(addServiceToShow(tmpService));
            toast.warn("Option supprimer avec succès");
        });
    };
    const [date, changeDate] = useState(new Date());

    return (
        <div className="row text-center pt-5">
            <div className="col-md-4" ref={paymentRef}>
                <div className="mb-4 p-1 rounded"
                     style={lightModeOn ? {border: "dashed 1px black"} : {border: "dashed 1px white"}}>
                    <h2 className="text-red border-bottom">Details de la reservations</h2>
                    <h3 className="col"><small
                        className={lightModeOn ? "text-dark" : "text-light"}>Prix
                        HT:</small>&nbsp;{ht_price}€&nbsp;<i className="icon text-red icon-info"
                                                             data-tip="Ceci est le prix HT"/>
                    </h3>
                    <h3 className="col"><small
                        className={lightModeOn ? "text-dark" : "text-light"}>Tva
                        (20%):</small>&nbsp;{tva}€&nbsp;<i className="icon text-red icon-info"
                                                           data-tip="Ceci est le tva du prix HT"/>
                    </h3>
                    <h3 className="col"><small
                        className={lightModeOn ? "text-dark" : "text-light"}>Prix
                        TTC:</small>&nbsp;{total_amount}€&nbsp;<i
                        className="icon text-red icon-info" data-tip="Ceci est le prix TTC"/>
                    </h3>
                </div>
                <div className={lightModeOn ? "mb-4 card shadow1" : "mb-4 card shadow2"}>
                    <div className="flex-grow-0 text-center pt-3 mb-3">
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
                                        <span className="text-red">&nbsp; *&nbsp;</span>
                                        <i className="icon icon-info"
                                           data-tip="Indiquer la date et l'heure de l'évènement"/>
                                    </div>
                                    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                                        <ThemeProvider theme={lightModeOn ? defaultThemeLight : defaultThemeDark}>
                                            <KeyboardDatePicker
                                                id="date-picker-dialog"
                                                disablePast="false"
                                                format="dd/MM/yyyy"
                                                cancelLabel='annuler'
                                                autoOk='true'
                                                value={event_date}
                                                onChange={
                                                    (date) => {
                                                        ChangeDate(
                                                            date,
                                                            setEventDate,
                                                            dispatch,
                                                            changeDateToSearch
                                                        )
                                                    }}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                    'headerColor': 'red'
                                                }}
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </div>
                        </div>
                        <div className="col pt-2 pb-2">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                    <div className="input-group-text text-dark">
                                        <i className="icon-map-marker"/>&nbsp; Code postal
                                        <span className="text-red">&nbsp; *</span>
                                    </div>
                                    <ThemeProvider theme={lightModeOn ? defaultThemeLight : defaultThemeDark}>
                                        <TextField id="standard-basic" value={code_postal} label=""
                                                   style={{width: '100%'}}
                                                   onChange={(e) => {
                                                       if (!props.read)
                                                           changeFields(setCodePostal, e, addReservationCodePostal, dispatch)
                                                   }}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <AddLocation/>
                                                           </InputAdornment>
                                                       ),
                                                   }}
                                        />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                        <div className="col pt-2 pb-2">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center"
                                     style={{width: "100%"}}>
                                    <div className="input-group-text text-dark">
                                        <i className="icon-map-marker"/>&nbsp; Rue (optionnel)
                                    </div>
                                    <ThemeProvider
                                        theme={lightModeOn ? defaultThemeLight : defaultThemeDark}>
                                        <TextField id="standard-basic" value={rue} label=""
                                                   style={{width: '100%'}}
                                                   onChange={(e) => {
                                                       if (!props.read)
                                                           changeFields(setRue, e, addReservationRue, dispatch)
                                                   }}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <AddLocation/>
                                                           </InputAdornment>
                                                       ),
                                                   }}
                                        />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                        <div className="col pt-2 pb-2">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center"
                                     style={{width: "100%"}}>
                                    <div className="input-group-text text-dark">
                                        <i className="icon-map-marker"/>&nbsp; Ville
                                        <span className="text-red">&nbsp; *</span>
                                    </div>
                                    <ThemeProvider
                                        theme={lightModeOn ? defaultThemeLight : defaultThemeDark}>
                                        <TextField id="standard-basic" value={ville} label=""
                                                   style={{width: '100%'}}
                                                   onChange={(e) => {
                                                       if (!props.read)
                                                           changeFields(setVille, e, addReservationVille, dispatch)
                                                   }}
                                                   InputProps={{
                                                       endAdornment: (
                                                           <InputAdornment position="end">
                                                               <AddLocation/>
                                                           </InputAdornment>
                                                       ),
                                                   }}
                                        />
                                    </ThemeProvider>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-success"
                            onClick={!props.read && validReservation}>Réserver
                    </button>
                </div>
                <div className={lightModeOn ? "mb-4 card shadow1" : "mb-4 card shadow2"}>
                    <div className="flex-grow-0 pt-3 pb-3">
                        <h2 className="col text-primary pb-3">Plus de détails</h2>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Politique d’annulation :</strong> <br/>
                            {service_to_show.refund_policy}&nbsp;
                            <i className="icon icon-info" data-tip data-for='refund'/>
                        </h4>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Catégorie :</strong> <br/>
                            {service_to_show.thematics.join(", ")}
                        </h4>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Type(s) d’évènement(s) :</strong> <br/>
                            {service_to_show.events.join(", ")}
                        </h4>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Nombre d'artistes :</strong> <br/>
                            {service_to_show.number_of_artists}
                        </h4>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Ville de référence :</strong> <br/>
                            {service_to_show.reference_city}
                        </h4>
                        <h4 className={lightModeOn ? "col text-black mb-3" : "col mb-3"}>
                            <strong className="bolder">Ville(s) annexe(s) :</strong> <br/>
                            {service_to_show.others_city.join(", ")}
                        </h4>
                    </div>
                </div>
                <div className={lightModeOn ? "mb-3 mt-3 card shadow1" : "mb-3 mt-3 card shadow2"}>
                    <div className="flex-grow-0 text-center pb-3">
                        <h2 className="col text-primary pb-3">Matériels nécessaires&nbsp;<i
                            className="icon icon-info"
                            data-tip="Une liste non exhaustive des matériels nécessaires à la prestation artistique.
                             La liste complète des matériels nécessaires se trouve dans la fiche technique"/>
                        </h2>
                        <div className="col">
                            {service_to_show.materials.list_of_materials.length !== 0 ?
                                <ul>
                                    {service_to_show.materials.list_of_materials.map((val, index) =>
                                        <li key={index}>
                                            <i className="icon icon-success text-green"/>{val}
                                        </li>
                                    )}
                                </ul> : <p className="text-red">Pas de material necessaire</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-8">
                <div className="flex-grow-0 text-center pb-3">
                    <h2 className="col text-primary pb-3">Option(s) pour la prestation&nbsp;
                        <i className="icon icon-info" data-tip data-for="option"/></h2>
                    {service_to_show.options.length !== 0 ?
                        <table className="responsive-table border-0">
                            <thead>
                            <tr>
                                <th scope="col">Nom&nbsp;
                                    <i className="icon icon-info"
                                       data-tip="Nom donner par l'artiste cette option"/>
                                </th>
                                <th scope="col">Tag&nbsp;
                                    <i className="icon icon-info"
                                       data-tip="Le nom des autres artiste proposé avec"/>
                                </th>
                                <th scope="col">Prix&nbsp;
                                    <i className="icon icon-info"
                                       data-tip="Le prix de cette option en plus de la prestation"/>
                                </th>
                                <th scope="col">Description&nbsp;<i
                                    className="icon icon-info"
                                    data-tip="quelque description qui explique l'option"/>
                                </th>
                                <th scope="col-lg-4">Ajouter&nbsp;<i
                                    className="icon icon-info"
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
                                    <td className="small" data-title="Prix">{val.price}$
                                    </td>
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
                        <h3 className={lightModeOn ? "text-black text-center" : "text-light text-center"}>
                            Pas d'options pour cette prestations
                        </h3>
                    }
                </div>
                <div className="flex-grow-0 text-center pb-3">
                    <h2 className="col text-primary pb-3">
                        Galerie d'images&nbsp;
                        <i className="icon icon-info" data-tip="Quelques photo de l'artiste sur cette prestation"/>
                    </h2>
                    <div className="demo-gallery">
                        <ul id="lightgallery">
                            {service_to_show.galleries.map((val, index) =>
                                <li key={index} data-src={val}>
                                    <a>
                                        <img alt="gallery" className="img-responsive"
                                             src={val}/>
                                        {(photoIndex === index) && (isOpen) && (
                                            <Lightbox
                                                mainSrc={val}
                                                nextSrc={(photoIndex + 1) % service_to_show.galleries.length}
                                                prevSrc={(photoIndex + service_to_show.galleries.length - 1)
                                                % service_to_show.galleries.length}
                                                onCloseRequest={() => setIsOpen(false)}
                                                onMovePrevRequest={() =>
                                                    setPhotoIndex(
                                                        (photoIndex + service_to_show.galleries.length - 1)
                                                        % service_to_show.galleries.length)
                                                }
                                                onMoveNextRequest={() =>
                                                    setPhotoIndex(
                                                        (photoIndex + service_to_show.galleries.length + 1)
                                                        % service_to_show.galleries.length)
                                                }
                                            />
                                        )}
                                        <div className="demo-gallery-poster" onClick={() => {
                                            setIsOpen(true)
                                            setPhotoIndex(index)
                                        }}>
                                            <i className="icon icon-search-1 s-36 text-red"/>
                                        </div>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
                <div className="flex-grow-0 text-center pb-3">
                    <h2 className="col text-primary pb-3">Calendrier de la prestation&nbsp;
                        <i
                            className="icon icon-info"
                            data-tip="Le planing de d'artiste sur cette prestation"/></h2>
                    <MuiPickersUtilsProvider utils={LocalizedUtils} locale={frLocale}>
                        {/* <Calendar noEdit
                                                    value={date}
                                                    onChange={changeDate}
                                                /> */}
                        <ThemeProvider theme={defaultMaterialThemePrestation}>
                            <DatePicker
                                autoOk
                                // orientation="landscape"
                                variant="static"
                                openTo="date"
                                value={event_date}
                                onChange={changeDate}
                            />
                        </ThemeProvider>
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </div>
    )
}

export default Reservation;
