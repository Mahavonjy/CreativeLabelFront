import React, { useEffect, useRef } from "react";
import { AddToCart } from "./Tools";
import SignInOrUp from "../Authentification/Login/Login";
import Loader from "react-loader-spinner";
import Modal from "react-awesome-modal";
import ReactTooltip from "react-tooltip";
import { useDispatch } from "react-redux";
import Fade from 'react-reveal/Fade';

export const DifferentArtist = (setArtistType, setChoiceArtistType, setBecomeArtistForm) => {

    const setValue = (type_) => {
        setArtistType(type_);
        setBecomeArtistForm(true);
        setChoiceArtistType(false);
    };

    return (
        <Modal visible={true} width="400" height="350" animationType='slide'>
            <ReactTooltip/>
            <div className="col text-center pt-4 pb-5" style={{height: "100%", borderRadius: 5, background: "#58585a"}}>
                <h4 className="text-green text-monospace">Quelle genre d'artiste êtes vous ?</h4>
                <div className="body row justify-content-center pt-2">

                    <button className="col-md-6 m-2 text-light" onClick={() => setValue("Spécialiste de l’audiovisuel")}
                            data-tip="Monteur vidéoclip, Cameraman, Photographes, Réalisateur clip vidéo, autres"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Spécialiste de l’audiovisuel</button>

                    <button className="col-md-3 m-2 text-light" onClick={() => setValue("Beatmaker")}
                            data-tip="Acapella, Afrobeat, Blues, Breakbeat, Classique, Dancehall, Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, Soul, Rap, Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo, Basesa, Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap, Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Beatmaker</button>

                    <button className="col-md-5 m-2 text-light" onClick={() => setValue("Chanteur/Musicien")}
                            data-tip="Acapella, Afrobeat, Blues, Breakbeat, Classique, Dancehall, Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, Soul, Rap, Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo, Basesa, Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap, Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Chanteur/Musicien</button>

                    <button className="col-md-6 m-2 text-light" onClick={() => setValue("Cirque/Artistes de la Rue")}
                            data-tip="acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur, marionnettiste, mime, autre"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Cirque/Artistes de la Rue</button>

                    <button className="col-md-3 m-2 text-light" onClick={() => setValue("Comédiens")}
                            data-tip="Burlesque, Comédie, Conteur, Drame, expérimental, Humoriste, imitateur, Stand up, autre"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Comédiens</button>

                    <button className="col-md-3 m-2 text-light" onClick={() => setValue("Danseurs")}
                            data-tip="Bachata, cabaret, capoeira, chachacha, classique, contemporain, ethnique, expérimental, hip hop, Improvisation, Jazz, Kizomba, Moderne, Oriental, Salsa, Samba, Tango, kilalaky, batrelaky, salegy, Ndombolo, Vakondrazana,zouk, Kawitri,Maloya, Kompas, autre"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Danseurs</button>

                    <button className="col-md-3 m-2 text-light" onClick={() => setValue("Magiciens")}
                            data-tip="Close-ups, Mentalistes, Prestidigitateurs, autre"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Magiciens</button>

                    <button className="col-md-2 m-2 text-light" onClick={() => setValue("Dj")}
                            data-tip="Animateur, Mix, Live set, DJ Set"
                            style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Dj</button>
                </div>
                <div className="footer pt-3">
                    <button className="btn btn-outline-danger btn-sm pl-4 pr-4" onClick={() => setChoiceArtistType(false)}>Annuler&nbsp;<i className="icon icon-remove align-middle"/></button>
                </div>
            </div>
        </Modal>
    )
};

export const ForAddToCard = (val, set_of_beats_name, props) => {

    const isMounted = useRef(false);
    const dispatch = useDispatch();

    useEffect( () => {
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
                        <h3 className="getlaid text-dark" id="trackModalLabel">Add To Cart</h3>
                        <button id={"closeOne" + val.id} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div className="modal-body" style={{overflow:"auto"}}>
                        <section className="relative" style={{margin:"0 auto"}}>
                            <div className="has-bottom-gradient">
                                <div className="row">
                                    <div className="col-md-10 offset-sm-1">
                                        <div className="row" style={{width:"300px", margin: "0 auto"}}>
                                            <img src={val.photo} alt="/" height={250} width="100%" style={{borderRadius: 10}}/>
                                            <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{val.title}</h1>
                                            <div className="col-md-12 text-center">
                                                <div className=" align-items-center justify-content-between">
                                                    <div className="ml-auto mb-2">
                                                        <a href="/#" className="snackbar" data-text="Bookmark clicked" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-bookmark s-24" /></a>
                                                        <a href="/#" className="snackbar ml-3" data-text="You like that song" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-heart s-24" /></a>
                                                        <a href="/#" className="snackbar ml-3" data-text="Thanks for sharing" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-share-1 s-24" /></a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bottom-gradient " />
                        </section>
                        <div className="p-lg-5" style={{background:"black", height:"500px"}}>
                            <div className="mb-3 card no-b p-3">
                                <div className="card-header transparent b-b">
                                    <strong>Prix</strong>
                                </div>
                                <ul className="playlist scrollbar-isl list-group list-group-flush">
                                    <li className="list-group-item" >
                                        <div className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Standard</h6>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>MP3</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.basic_price, "basic_price", val, props, dispatch)}
                                            }>
                                                <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-16">{val.basic_price} $</div>
                                                    <i className="icon-first-order"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item" >
                                        <div
                                            className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Silver</h6>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>MP3 + WAV</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                AddToCart(val.id, val.silver_price, "silver_price", val, props, dispatch);
                                            }}>
                                                <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-14">{val.silver_price} $</div>
                                                    <i className="icon-money"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="list-group-item" >
                                        <div
                                            className="d-flex align-items-center ">
                                            <div
                                                className="col-8 ">
                                                <h6>Gold</h6>
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>MP3 + WAV + STEMS</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.gold_price, "gold_price", val, props, dispatch)
                                            }}>
                                                <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
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
                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>Unlimited + Exclusive</small>
                                            </div>
                                            <div className="ml-auto" onClick={async () => {
                                                await document.getElementById("closeOne" + val.id).click();
                                                await AddToCart(val.id, val.platinum_price, "platinum_price", val, props, dispatch)
                                            }}>
                                                <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                    <div className="s-14">
                                                        {val.platinum_price} $
                                                    </div>
                                                    <i className="icon-money"/>
                                                </div>
                                            </div>
                                        </div>
                                    </li>: null}
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
            <button type="button" id="LoginRequire" className="btn btn-primary LoginRequire" data-toggle="modal" data-target="#exampleModal" hidden={true}/>
            <div aria-disabled={"false"} className="modal fade p-t-b-50" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
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
