import React, {useEffect, useRef} from "react";
import {addTmpArtistSelected, displayBecomeArtistForm} from "./FunctionProps";
import {AddToCart} from "./Tools";
import SignInOrUp from "../Authentification/Login/Login";
import Loader from "react-loader-spinner";
import Modal from "react-awesome-modal";
import ReactTooltip from "react-tooltip";
import {useDispatch} from "react-redux";
import Fade from 'react-reveal/Fade';

export const DifferentArtist = (dispatch, setChoiceArtistType, listOfArtistTypes, setAddNewPrestation) => {

    const setValue = (type_) => {
        dispatch(addTmpArtistSelected(type_));
        dispatch(displayBecomeArtistForm(true));
        if (setAddNewPrestation)
            setAddNewPrestation(true);
        setChoiceArtistType(false);
    };

    return (
        <Modal visible={true} width="300" height="auto" animationType='slide'>
            <ReactTooltip/>
            <button className="ModalClose absolute" data-tip="Fermer" onClick={() => setChoiceArtistType(false)}>
                <i className="icon-close s-24" style={{color: "orange"}}/>
            </button>
            <div className="col text-center pt-5 pb-5" style={{height: "100%", borderRadius: 5, background: "#58585a"}}>
                <h4 className="text-light text-monospace">Quelle genre d'artiste êtes vous ?</h4>
                <div className="body row justify-content-center  pt-2">
                    {listOfArtistTypes.map((val, index) =>
                        <button key={index} className="btn btn-outline-danger pt-2 pl-5 pr-5 ml-3 mr-3 mt-1 mb-1 col-lg-10"
                                // style={{width: "250px"}}
                                data-tip={val.description && val.description.join(', ')}
                                onClick={() => setValue(val.name)}>{val.label}</button>
                    )}
                </div>
            </div>
        </Modal>
    )
};

export const ForAddToCard = (val, set_of_beats_name, props) => {

    const isMounted = useRef(false);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="modal custom show" id={set_of_beats_name + val.id} tabIndex="-1" role="dialog"
             aria-labelledby="trackModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content" style={{height: "100%"}}>

                    <div className="modal-header">
                        <h2 className="getlaid text-dark" id="trackModalLabel">Ajouter au panier</h2>
                        <button id={"closeOne" + val.id} type="button" className="close" data-dismiss="modal"
                                aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body" style={{overflow: "auto"}}>
                        <section className="relative" style={{margin: "0 auto"}}>
                            <div className="has-bottom-gradient">
                                <div className="row">
                                    <div className="col-md-10 offset-sm-1">
                                        <div className="row" style={{width: "300px", margin: "0 auto"}}>
                                            <img src={val.photo} alt="/" height={250} width="100%"
                                                 style={{borderRadius: 10}}/>
                                            <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{val.title}</h1>
                                            <div className="col-md-12 text-center">
                                                <div className=" align-items-center justify-content-between">
                                                    <div className="ml-auto mb-2">
                                                        <a href="/#" className="snackbar" data-text="Bookmark clicked"
                                                           data-pos="top-right" data-showaction="true"
                                                           data-actiontext="ok" data-actiontextcolor="#fff"
                                                           data-backgroundcolor="#0c101b"><i
                                                            className="icon-bookmark s-24"/></a>
                                                        <a href="/#" className="snackbar ml-3"
                                                           data-text="You like that song" data-pos="top-right"
                                                           data-showaction="true" data-actiontext="ok"
                                                           data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                            className="icon-heart s-24"/></a>
                                                        <a href="/#" className="snackbar ml-3"
                                                           data-text="Thanks for sharing" data-pos="top-right"
                                                           data-showaction="true" data-actiontext="ok"
                                                           data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                            className="icon-share-1 s-24"/></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-gradient "/>
                        </section>
                        <div className="p-lg-5" style={{background: "black", height: "500px"}}>
                            <div className="mb-3 card no-b p-3">
                                <div className="card-header transparent b-b">
                                    <strong>Prix du beat</strong>
                                </div>
                                <ul className="playlist scrollbar-isl list-group list-group-flush">
                                    <li className="list-group-item">
                                        <div className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Standard</h6>
                                                <small className="mt-1"><i
                                                    className="icon-placeholder-3 mr-1 "/>MP3</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.basic_price, "basic_price", val, props, dispatch)
                                            }
                                            }>
                                                <div
                                                    className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-16">{val.basic_price} $</div>
                                                    <i className="icon-first-order"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div
                                            className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Silver</h6>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>MP3 +
                                                    WAV</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                AddToCart(val.id, val.silver_price, "silver_price", val, props, dispatch);
                                            }}>
                                                <div
                                                    className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-14">{val.silver_price} $</div>
                                                    <i className="icon-money"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item">
                                        <div
                                            className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Gold</h6>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>MP3 +
                                                    WAV + STEMS</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.gold_price, "gold_price", val, props, dispatch)
                                            }}>
                                                <div
                                                    className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-14">{val.gold_price} $</div>
                                                    <i className="icon-money"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    {val.platinum_price ? <li className="list-group-item">
                                        <div className="d-flex align-items-center ">
                                            <div className="col-8 ">
                                                <h5> Platinum Lease</h5>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>Unlimited
                                                    + Exclusive</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.platinum_price, "platinum_price", val, props, dispatch)
                                            }}>
                                                <div
                                                    className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-14">
                                                        {val.platinum_price} $
                                                    </div>
                                                    <i className="icon-money"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li> : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export const Login = () => {
    return (
        <div>
            <button type="button" id="LoginRequire" className="btn btn-primary LoginRequire" data-toggle="modal"
                    data-target="#exampleModal" hidden={true}/>
            <div aria-disabled={"false"} className="modal fade p-t-b-50" id="exampleModal" tabIndex={-1} role="dialog"
                 aria-labelledby="exampleModalLabel">
                <div className="modal-dialog p-t-100" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">x</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <SignInOrUp/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export const LoadingHome = () => {
    return (
        <div className="center-center">
            <Loader type="Bars" height={150} width={150} color="#ED1C24"/>
            <Fade bottom>
                <h2 className="text-red">Independance Sound Label</h2>
                <h3 className="text-red">Creative</h3>
            </Fade>
        </div>
    )
};

export const LoadingSearch = () => {
    return (
        <div className="text-center p-t-100">
            <Loader type="Puff" height={100} width={100} color="#ED1C24"/>
        </div>
    )
};
