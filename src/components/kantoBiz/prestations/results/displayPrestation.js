import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Stepper from '@material-ui/core/Stepper';
// import Calendar from "../../calendar/calendar";
//import stepper from Material react
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import dateFormat from 'dateformat';
import {MDBRating} from "mdbreact";
import React, {useEffect, useRef, useState} from "react";
import {FacebookProvider, Feed} from "react-facebook";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";
// import StarRatings from 'react-star-ratings';
import ReactTooltip from "react-tooltip";
import "../../../../assets/css/style/Results.css"
import Conf from "../../../../config/tsconfig";
import PersonalInformation from "../../../cart/personalInformation";
import PurchaseInformation from "../../../cart/purchaseInformation";
import Reservation from "../../../cart/Reservation";
import {addIslAmount, addServiceToShow, addThPrice, addTotalAmount, addTva} from "../../../functionTools/functionProps";
import {getSteps, handleStep} from "../../../functionTools/tools";

function DisplayPrestation(props) {

    let {id} = useParams()
    const history = useHistory();
    const dispatch = useDispatch();
    const service_to_show = useSelector(state => state.KantobizSearch.service_to_show);
    const profile_info = useSelector(state => state.profile.profile_info);
    const reservation_address = useSelector(state => state.KantobizSearchInfo.reservation_address);
    const date_to_search = useSelector(state => state.KantobizSearchInfo.date_to_search);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const reservation = useSelector(state => state.KantoBizForm.reservation);
    const tvas = useSelector(state => state.KantoBizForm.tva);
    const ht_prices = useSelector(state => state.KantoBizForm.ht_price);
    const isl_amounts = useSelector(state => state.KantoBizForm.isl_amount);
    const total_amounts = useSelector(state => state.KantoBizForm.total_amount);
    const activeStep = useSelector(state => state.KantoBizForm.activeStep);
    const valeur = useSelector(state => state.KantoBizForm.val);
    const steps = getSteps();

    const paymentRef = useRef(null);

    const isMounted = useRef(false);
    const [event_date, setEventDate] = useState(null);
    const [address, setAddress] = useState(reservation_address);
    const [tva, setTva] = useState(tvas);
    const [ht_price, setHtPrice] = useState(ht_prices);
    /* eslint-disable-next-line no-unused-vars */
    const [isl_amount, setIslAmount] = useState(isl_amounts);
    const [total_amount, setTotalAmount] = useState(total_amounts);
    // const [rating, setRating] = useState(1);
    const [val, setVal] = useState(valeur);

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%'
        },
        step: {
            "& $completed": {
                color: "lightgreen"
            },
            "& $active": {
                color: "pink"
            },
            "& $disabled": {
                color: "red"
            }
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
    const classes = useStyles();

    const checkServiceValue = () => {
        axios.get("/api/artist_services/" + id, {headers: props.headers}
        ).then((resp) => dispatch(addServiceToShow(resp.data["service"])))
    }

    useEffect(() => {
        if (!(Object.getOwnPropertyNames(service_to_show).length > 0))
            checkServiceValue();
        setEventDate(dateFormat(date_to_search, "yyyy-mm-dd"));
        axios.post("api/reservation/check_total_price",
            {price: service_to_show.price},
            {headers: props.headers}).then((resp) => {
            setTva(resp.data["tva"]);
            setHtPrice(resp.data["ht_price"]);
            setIslAmount(resp.data["isl_amount"]);
            setTotalAmount(resp.data["total_amount"])
            dispatch(addTva(tva));
            dispatch(addTotalAmount(total_amount));
            dispatch(addIslAmount(isl_amount));
            dispatch(addThPrice(ht_price));
        });

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [service_to_show, profile_info, date_to_search]);

    return (
        (Object.getOwnPropertyNames(service_to_show).length > 0) ? <div className="Base pt-5 p-b-100 zIndex-1">
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
                        // dispatch(changeInitialized(false));
                        if (props.read)
                            history.push("/profile");
                        else history.push("/kantoBiz");
                    }}
                    style={{position: "fixed", bottom: "5%", zIndex: 99}}
                    className="btn-custom btn-outline-light border-bottom-0 border-right-0">
                    <i className="icon icon-long-arrow-left s-24 align-middle"/>&nbsp;Precedent
                </button>
                <div className="page-header header-filter border1" data-parallax="true"
                     style={{backgroundImage: 'url(' + service_to_show.galleries[0] + ')'}}/>
                <div
                    className={
                        lightModeOn
                            ? "main bg-white main-raised ml-3 mr-3"
                            : "main bg-dark main-raised ml-3 mr-3"}>
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
                                        <h6 className={lightModeOn ? "pb-2 text-black" : "pb-2"}
                                            data-tip="Different genre produit par l'artiste">
                                            {service_to_show.thematics.join(", ")}
                                        </h6>

                                        <div className="m-2">
                                            <i className="icon icon-instagram text-red"
                                               data-tip="Partager Cette Prestation sur Instagram"/>
                                            <FacebookProvider appId={Conf.configs.FacebookId} debug>
                                                <Feed link={"http://" + window.location.host + "/kantoBiz"}>
                                                    {({handleClick}) => (
                                                        <i className="icon icon-facebook text-red"
                                                           onClick={handleClick}
                                                           data-tip="Partager Cette Prestation sur facebook"/>
                                                    )}
                                                </Feed>
                                            </FacebookProvider>
                                            <i className="icon icon-twitter text-red"
                                               data-tip="Partager Cette Prestation sur Twitter"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="description text-center">
                                <p data-tip="Description">{service_to_show.description}</p>
                                <div className="flex-column justify-content-center m-4" data-tip="Noter Moi">
                                    <MDBRating iconFaces iconSize='2x' iconRegular
                                               containerClassName="justify-content-center"
                                               fillColors={[
                                                   'red-text',
                                                   'orange-text',
                                                   'yellow-text',
                                                   'lime-text',
                                                   'light-green-text'
                                               ]}
                                    />
                                    {/*<StarRatings rating={service_to_show.notes} starRatedColor="red"*/}
                                    {/*             numberOfStars={5} starDimension="20px"*/}
                                    {/*             starSpacing="10px" className="col" name='rating'/>*/}
                                    {/*<span className="col pt-2">5&nbsp;✰</span>*/}
                                </div>
                                <Stepper alternativeLabel nonLinear activeStep={activeStep}
                                         style={lightModeOn ?
                                             {
                                                 backgroundColor: "#f4f6f9",
                                                 borderRadius: "10px",
                                                 boxShadow: "0 0 6px rgba(0,0,0,.1)"
                                             } : {
                                                 backgroundColor: "#f4f6f9",
                                                 borderRadius: "10px",
                                                 boxShadow: "0 0 6px rgba(255,255,255,.5)"
                                             }}>
                                    {steps.map((label, index) => {
                                        const stepProps = {};
                                        const buttonProps = {};
                                        return (
                                            <Step key={label} {...stepProps}>
                                                <StepButton onClick={handleStep(index, dispatch)}{...buttonProps}>
                                                    {label}
                                                </StepButton>
                                            </Step>
                                        );
                                    })}
                                </Stepper>
                            </div>
                            {(activeStep === 0) && <Typography className={classes.instructions}>
                                <Reservation/>
                            </Typography>}
                            {reservation &&
                            <div className="row text-center pt-5">
                                <div className="col" ref={paymentRef}>
                                    {(activeStep === 1) && <Typography className={classes.instructions}>

                                        <PersonalInformation/>

                                    </Typography>}
                                    {(activeStep === 2) && <Typography className={classes.instructions}>

                                        <PurchaseInformation eventDate={event_date} address={address}
                                                             TotalPrice={service_to_show.price}
                                                             headers={props.headers} kantoBiz/>

                                    </Typography>}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div> : <div className="Base pt-5 p-b-100 zIndex-1">
            <button style={{position: "fixed", bottom: "5%", zIndex: 99}}
                    className="btn-custom btn-outline-light border-bottom-0 border-right-0"
                    onClick={() => {
                        // dispatch(changeInitialized(false));
                        if (props.read)
                            history.push("/profile");
                        else history.push("/kantoBiz");
                    }}
            >
                <i className="icon icon-long-arrow-left s-24 align-middle"/>&nbsp;Precedent
            </button>
            <h1 className="text-red center-center m-5">Cet Service n'est pas encore disponible pour le moment</h1>
        </div>
    );

}

export default DisplayPrestation;
