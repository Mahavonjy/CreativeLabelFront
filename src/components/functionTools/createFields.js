import {MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBCol, MDBRow, MDBView} from "mdbreact";
import React, {useEffect, useRef, useState} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {FacebookProvider, Feed} from "react-facebook";
import {useDispatch, useSelector} from "react-redux";
import {Link, Route} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "../../assets/css/style/style.scss";
import "../../assets/css/style/themeMode.scss";
import firstBlockImg from "../../assets/images/backgrounds/dark.jpg";
import thirdBlockImg from "../../assets/images/backgrounds/instru.jpg"
import secondBlockImg from "../../assets/images/backgrounds/moon.jpg";
import TestImg from "../../assets/images/demo/a2.jpg";
import Conf from "../../config/tsconfig";
import About from "../about/about";
import Register from "../authentification/register/register";
// import Beats from "../beatMaking/beats/allBeatsSuggestion/beats";
// import OneBeat from "../beatMaking/beats/allBeatsSuggestion/oneBeat";
// import Cart from "../cart/cart";
import LegalNotices from "../home/legalNotices";
import KantoBiz from "../modules/kantoBiz/kantoBiz";
import DisplayPrestation from "../modules/kantoBiz/prestations/results/displayPrestation";
import SearchBar from "../modules/kantoBiz/searchBar";
import IslPlayer from "../players/players";
import OtherProfile from "../profile/otherProfile";
import Profile from "../profile/profile";
import CommandError from "../statusPage/commandStatus/error/commandError";
import CommandSuccess from "../statusPage/commandStatus/success/commandSuccess";
import {activeThemeLight, addNewPlayerList} from "./functionProps"
import {ForAddToCard} from "./popupFields"
import {changeFields, LikeOrFollow} from "./tools";

export const CreateInput = (state_name, value, functionToOnchange, placeholder, type, required) => {
    if (type === "text" || "password" || "email" || "number") {
        return (
            <MDBRow>
                <MDBCol className='mb-3'>
                    <input type={type}
                           value={value}
                           id={state_name}
                           className="form-control"
                           placeholder={placeholder}
                           onChange={functionToOnchange} required={required} autoComplete="off"/>
                </MDBCol>
            </MDBRow>
        )
    } else return true
};

export const CreateBeatsPlaylist = (height_div, set_of_beats_name, props, states, state_value) => {

    const dispatch = useDispatch();
    const isMounted = useRef(false);

    CreateBeatsPlaylist.changeIndex = (index) => {
        states.setIndex(index);
        states.setTmp(index);
    };

    CreateBeatsPlaylist.Play = async (index, type_, run) => {
        if (states.index !== index && states.tmp === null) {
            await dispatch(addNewPlayerList(states.beats));
            await states.setIndex(index);
            await states.setTmp(index);
            await props.ToPlay(index, type_, run, height_div, set_of_beats_name, states, state_value);
        } else {
            if (index !== states.index) {
                let tmp;
                if (states.index === states.tmp) tmp = true;
                if (run) states.setIndex(states.tmp);
                else {
                    await states.setIndex(index);
                    await states.setTmp(index);
                }
                if (tmp) await props.ToPlay(index, type_, run, height_div, set_of_beats_name, states, state_value);
                else if (run === false) await IslPlayer.pauseOrPlayPlayer(true);
            } else {
                await states.setTmp(null);
                await CreateBeatsPlaylist.pausePlayer(false).then(() => null)
            }
        }
    };

    CreateBeatsPlaylist.pausePlayer = async (run) => {
        if (states.index !== null) {
            await states.setTmp(states.index);
            await states.setIndex(null);
            if (run) await IslPlayer.pauseOrPlayPlayer(false);
        }
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    if (height_div === "short_beats") {
        return (
            <div>
                {states.beats.map((val, index) =>
                    <div className="list-group-item scrollbar-isl" key={index}>
                        <div className="d-flex align-items-center">
                            <div>
                                {state_value === "oneBeats" ?
                                    <div className="text-red">
                                        {states.index === index ?
                                            <i className="icon-pause s-28 text-danger"
                                               onClick={() => CreateBeatsPlaylist.pausePlayer(true)}/> :
                                            <i className="icon-play s-28 text-danger"
                                               onClick={
                                                   () => CreateBeatsPlaylist.Play(
                                                       index,
                                                       "beats",
                                                       false
                                                   ).then(() => null)
                                               }
                                            />}
                                    </div> : <div>
                                        {states.link[index] ?
                                            <div className="text-red">
                                                {states.index === index ?
                                                    <i className="icon-pause s-28 text-danger"
                                                       onClick={() => CreateBeatsPlaylist.pausePlayer(true)}/> :
                                                    <i className="icon-play s-28 text-danger"
                                                       onClick={
                                                           () => CreateBeatsPlaylist.Play(
                                                               index,
                                                               "beats",
                                                               false
                                                           ).then(() => null)
                                                       }/>
                                                }
                                            </div> :
                                            <div className="spinner-grow text-primary" role="status">
                                                <span className="sr-only"/>
                                            </div>}
                                    </div>}
                            </div>
                            <div className="col-10">
                                <Link to={'beats/CheckThisBeat/' + val.id}>
                                    <small>{val.title}</small>
                                </Link>
                            </div>
                            <button className="dropdown-item"
                                    type="button" data-toggle="modal"
                                    data-target={"#" + set_of_beats_name + val.id}>
                                <small className="ml-auto"><i className="icon-opencart text-red"/></small>
                            </button>
                            {/* Here is Popup for add to cart */}
                            <div> {ForAddToCard(val, set_of_beats_name, states)} </div>
                        </div>
                    </div>)}
            </div>
        )
    } else {
        return (
            <div>
                <ReactTooltip/>
                {states.beats.map((val, index) =>
                    <div className="m-1 my-4" key={index}>
                        <div className="d-flex align-items-center">
                            <div className="col-1">
                                {states.link[index] ?
                                    <div>
                                        {states.index === index ?
                                            <i className="icon-pause s-28 text-danger"
                                               onClick={() => CreateBeatsPlaylist.pausePlayer(true)}/> :
                                            <i className="icon-play s-28 text-danger"
                                               onClick={
                                                   () => CreateBeatsPlaylist.Play(index, "beats", false)
                                               }
                                            />}
                                    </div>
                                    :
                                    <div className="spinner-grow text-primary" role="status">
                                        <span className="sr-only"/>
                                    </div>
                                }
                            </div>
                            <div className="col-md-3">
                                <figure className="avatar-md float-left  mr-2">
                                    <img className="r-3" src={val.photo} alt=""/>
                                </figure>
                                {height_div !== "user_profile" ?
                                    <a href={'beats/CheckThisBeat/' + val.id}>
                                        <h6>{val.title}</h6>
                                        <small className="text-red">{val.artist}</small>
                                    </a> :
                                    <div className="d-flex">
                                        <h6 className="ml-auto mr-2">{val.title}</h6>
                                        <small className="ml-auto mr-2">{val.time}</small>
                                    </div>
                                }
                            </div>
                            <div className={
                                height_div !== "user_profile"
                                    ? "col-md-6 d-none d-sm-block"
                                    : "col-md-7 d-none d-sm-block"}>
                                <div className="d-flex">
                                    {height_div !== "user_profile" ?
                                        <small className="ml-auto">{val.silver_price}$</small> : null}
                                    <small className="ml-auto">{val.bpm}/bpm</small>
                                    {height_div !== "user_profile" ?
                                        <FacebookProvider appId={Conf.configs.FacebookId} debug>
                                            <Feed link={
                                                "http://" + window.location.host + '/beats/CheckThisBeat/' + val.id
                                            }>
                                                {({handleClick}) => (
                                                    <div className="ml-auto transparent border-0">
                                                        <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                    </div>
                                                )}
                                            </Feed>
                                        </FacebookProvider> :
                                        <div className="ml-auto">
                                            <small className="ml-auto">Ecouté(e) {val.number_play} fois</small>
                                        </div>}
                                    {height_div !== "user_profile" ?
                                        <i className="icon-heart-1 ml-auto text-red" data-tip="Like me"
                                           onClick={() => {
                                               LikeOrFollow("like", val.id, states.user_credentials);
                                           }}/> :
                                        <div className="ml-auto">
                                            <i className="icon-edit s-24" id={val.id} data-tip="Modifier"
                                               onClick={() => states.togglePopupEditSong(index, "beats")}>
                                            </i>
                                        </div>}
                                </div>
                            </div>
                            {height_div !== "user_profile" ?
                                <div className="col-sm-2 d-none d-sm-block">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <button className="btn btn-outline-primary btn-sm"
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target={"#" + set_of_beats_name + val.id}>
                                                <i className="icon-opencart"/>
                                            </button>
                                        </div>
                                    </div>
                                </div> :
                                <div className="col-sm-1 d-none d-sm-block">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <i className="icon-trash s-24"
                                               id={val.id}
                                               data-tip="supprimer"
                                               onClick={(e) => states.remove(e, "beats")}>
                                            </i>
                                        </div>
                                    </div>
                                </div>}

                            <div className="col-1 ml-auto d-sm-none">
                                <a href="/#" data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false">
                                    <i className="icon-more-1"/></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    {height_div !== "user_profile" ?
                                        <div>
                                            <button className="dropdown-item"
                                                    type="button"
                                                    data-toggle="modal"
                                                    data-target={"#" + set_of_beats_name + val.id}>
                                                <i className="icon-shopping-bag mr-3"/>Ajouter au panier
                                            </button>
                                            <small className="dropdown-item"><i
                                                className="icon-money mr-3"/>{val.silver_price}$</small>
                                        </div> :
                                        <div>
                                            <button className="dropdown-item"
                                                    id={val.id} data-tip="Modifier"
                                                    onClick={() => states.togglePopupEditSong(index, "beats")}>
                                                <i className="icon-edit mr-3"/> Modifier
                                            </button>
                                            <button className="dropdown-item"
                                                    id={val.id} data-tip="supprimer"
                                                    onClick={
                                                        (e) => states.remove(e, "beats")}>
                                                <i className="icon-trash mr-3"/> Supprimer
                                            </button>
                                        </div>}
                                </div>
                            </div>
                            {/* Here is Popup for add to cart */}
                            {height_div !== "user_profile" &&
                            <div> {ForAddToCard(val, set_of_beats_name, states)} </div>}
                        </div>
                    </div>
                )}
            </div>
        )
    }
};

export const DisplayArtist = (artist_info, user_credentials) => {
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    return (
        <ul className={"playlist scrollbar-isl list-group " + (lightModeOn ? "bg-white" : "bg-dark") + " list-group-flush scrollbar-isl"}
            style={{height: 428}}>
            {artist_info.length !== 0 ? artist_info.map((val, index) =>
                <li className="list-group-item" key={index}>
                    <div className="d-flex align-items-center">
                        <div className="col-10">
                            <Link to={"profile/isl_artist_profile/" + val.id}>
                                <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                    <img src={val.photo || TestImg} alt=""/>
                                </figure>
                                <h6>{val.name}</h6>
                                <small>{val.number_of_beats} Instru</small>
                            </Link>
                        </div>
                        <i className="icon-user-plus ml-auto"
                           onClick={() => LikeOrFollow("follow", val.id, user_credentials)}/>
                        <Link to={"profile/isl_artist_profile/" + val.id} className="ml-auto"><i
                            className="icon-user-circle"/></Link>
                    </div>
                </li>
            ) : <p className="text-center text-red pt-5"> Pas de BeatMaker </p>}
        </ul>
    )
};

export const CreativeHeaders = (Title, Description, headers, setStateResult, next, displayOne, auth, history) => {
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    return (
        <div>
            <MDBCarousel
                activeItem={1}
                length={3}
                showControls={false}
                showIndicators={false}
                className="z-depth-1"
                slide
            >
                <MDBCarouselInner>
                    <MDBCarouselItem itemId="1" className="d-none d-sm-block active">
                        <MDBView>
                            <img
                                className="d-block w-100 zIndex-1"
                                src={firstBlockImg}
                                alt=""
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="2" className="d-none d-sm-block active">
                        <MDBView>
                            <img
                                className="d-block w-100 zIndex-1"
                                src={secondBlockImg}
                                alt=""
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <MDBCarouselItem itemId="3" className="d-none d-sm-block active">
                        <MDBView>
                            <img
                                className="d-block w-100 zIndex-1"
                                src={thirdBlockImg}
                                alt=""
                            />
                        </MDBView>
                    </MDBCarouselItem>
                    <div className="zIndex99 relative">
                        <div className="mt-5 p-5 rounded"
                             style={lightModeOn ? {backgroundColor: "rgba(255, 255, 255, 0.5)"} : {backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                            <h2 className="s-60 text-center text-primary"> {Title} </h2>
                            <p className={lightModeOn ? "s-18 text-center text-dark" : "s-18 text-center  text-white"}
                               dangerouslySetInnerHTML={{__html: Description}}/>
                        </div>
                    </div>
                    {!auth &&
                    <div className="absolute p-2 zIndex99" style={{right: 0, bottom: 0}}>
                        <button className="btn btn-outline-primary m-2 r-5"
                                onClick={() => document.getElementById("LoginRequire").click()}>
                            <i className="icon icon-user-secret"/>S'identifier
                        </button>
                        <button className="btn btn-outline-primary m-2 r-5"
                                onClick={async () => {
                                    history.push("/register");
                                    // HomeRoot.beforeDataLoad().then(() => null);
                                }}><i className="icon icon-user-plus"/>&nbsp;Créer votre compte
                        </button>
                    </div>}
                </MDBCarouselInner>
            </MDBCarousel>
            {Title === "Creative kantoBiz"
            && <SearchBar next={next}
                          headers={headers}
                          displayOne={displayOne}
                          setStateResult={setStateResult}
            />}
        </div>
    )
};

export const SideBars = (
    state_cart,
    log_name,
    logout_class,
    location,
    history,
    headers,
    logout,
    isPlaying
) => {
    return (
        <div className="sidebar">
            <ul className="sidebar-menu">
                <ReactTooltip place="right" className="special-color-dark" id='i_kt' aria-haspopup='true'>
                    Creative KantoBiz
                </ReactTooltip>
                <ReactTooltip place="right" className="special-color-dark" id='i_pr' aria-haspopup='true'>
                    {headers['Isl-Token'] === Conf.configs.TokenVisitor
                        ? "Connecter pour voir votre profil": "Voir votre profile"}
                </ReactTooltip>
                <ReactTooltip place="right" className="special-color-dark" id='i_ab' aria-haspopup='true'>
                    A propos de Nous
                </ReactTooltip>
                <ReactTooltip place="right" className="special-color-dark" id='i_ml' aria-haspopup='true'>
                    Les Mentions légales
                </ReactTooltip>
                <ReactTooltip place="right" className="special-color-dark" id='i_log' aria-haspopup='true'>
                    {logout_class === "icon icon-users-1 s-24 mr-5 text-red" ? "Se Connecter" : " Se déconnecter"}
                </ReactTooltip>
                {/* BEATS */}
                {/*<li style={{margin: "0 0 20px 10px"}}*/}
                {/*    data-tip="Creative BeatMaking" onClick={() => {*/}
                {/*    (location.pathname !== "/beats") && history.push("/beats")*/}
                {/*}}><i className={*/}
                {/*    location.pathname === "/beats"*/}
                {/*        ? "icon icon-heartbeat cursor-pointer text-red s-24"*/}
                {/*        : "icon icon-heartbeat cursor-pointer s-24"}/>*/}
                {/*    <span className="ml-5">BeatMaking</span>*/}
                {/*</li>*/}

                {/* kantoBiz */}
                <li style={{margin: "0 0 20px 10px"}} data-tip data-for="i_kt" onClick={() => {
                    location.pathname !== "/kantobiz" && history.push("/kantobiz")
                }}><i className={
                    location.pathname === "/kantobiz" || location.pathname === "/"
                        ? "icon icon-compact-disc-2 cursor-pointer text-red s-24"
                        : "icon icon-compact-disc-2 cursor-pointer s-24"}/>
                    <span className="ml-5">KantoBiz</span>
                </li>

                {/* PROFILE */}
                <li style={{margin: "0 0 20px 10px"}} data-tip data-for="i_pr" onClick={() => {
                    headers['Isl-Token'] === Conf.configs.TokenVisitor && location.pathname !== "/profile"
                        ? document.getElementById("LoginRequire").click()
                        : history.push("/profile");
                }}><i className={
                    location.pathname === "/profile"
                        ? "icon icon-user cursor-pointer text-red s-24"
                        : "icon icon-user cursor-pointer s-24"}/>
                    <span className="ml-5">Votre profil</span>
                </li>

                {/* CART */}
                {/*<li style={{margin: "0 0 20px 10px"}} data-tip="Votre Panier" onClick={() => {*/}
                {/*    ((state_cart > 0)*/}
                {/*        && (location.pathname !== "/cart"))*/}
                {/*        ? history.push("/cart")*/}
                {/*        : toast.warn("Veuillez remplir votre panier avant")*/}
                {/*}}>*/}
                {/*    <div id="CartBadge">*/}
                {/*            <span className="p1 " data-count={state_cart}>*/}
                {/*                <i data-count="4b"*/}
                {/*                   className={*/}
                {/*                       location.pathname === "/cart"*/}
                {/*                           ? "icon icon-cart-plus cursor-pointer text-red s-24 mr-5"*/}
                {/*                           : "icon icon-cart-plus cursor-pointer s-24 mr-5"*/}
                {/*                   }*/}
                {/*                /> Panier*/}
                {/*            </span>*/}
                {/*    </div>*/}
                {/*</li>*/}

                {/* about */}
                <li style={{margin: "0 0 20px 11px"}} data-tip data-for="i_ab" onClick={() => {
                    (location.pathname !== "/about") && history.push("/about")
                }}><i className={
                    location.pathname === "/about"
                        ? "icon text-red cursor-pointer icon-info-circle s-24"
                        : "icon icon-info-circle cursor-pointer s-24"}/>
                    <span className="ml-5">À propos de nous</span>
                </li>

                {/* Mention */}
                <li style={{margin: "0 0 20px 11px"}} data-tip data-for="i_ml" >
                    <i className="icon icon-shield s-24 cursor-pointer"
                       data-toggle="modal" data-target="#legaleNotices"/>
                    <span className="ml-5">Les mentions légales</span>
                </li>

                {/* LOGOUT OR LOGIN */}
                <li onClick={() =>
                    headers['Isl-Token'] === Conf.configs.TokenVisitor
                        ? document.getElementById("LoginRequire").click()
                        : logout()}
                    style={
                        logout_class === "icon icon-users-1 s-24 mr-5 text-red"
                            ? {margin: "50px 0 20px 8px"}
                            : {margin: "50px 0 20px 12px"}
                    }
                    data-tip
                    data-for="i_log">
                    <i className={logout_class + " cursor-pointer"}/> <span>{log_name}</span>
                </li>
            </ul>
            {!isPlaying &&
            <a href="/">
                <img alt="Logo"
                     className="absolute"
                     style={{bottom: 0}}
                     src="https://zupimages.net/up/19/18/3ltf.png"/>
            </a>}
        </div>
    )
};

export const SideBarsMain = (
    addToPlaylist,
    single_beat,
    beats_similar,
    profile_checked,
    user_data,
    headers,
    location,
    history
) => {
    return (
        <div>
            <Route exact
                   path="/about"
                   component={() => <About/>}
            />
            <Route exact
                   path="/CommandError"
                   component={() => <CommandError/>}
            />
            <Route exact
                   path="/CommandSuccess"
                   component={() => <CommandSuccess/>}
            />
            {/*<Route exact*/}
            {/*       path="/Cart"*/}
            {/*       component={() => <Cart ToPlay={addToPlaylist}/>}*/}
            {/*/>*/}
            {/*<Route exact*/}
            {/*       path="/beats"*/}
            {/*       component={() => <Beats ToPlay={addToPlaylist}/>}*/}
            {/*/>*/}
            <Route exact
                   path="/(|kantobiz)"
                   component={() => <KantoBiz headers={headers}/>}
            />
            {/*<Route exact*/}
            {/*       path="/beats/CheckThisBeat/:id(\d+)"*/}
            {/*       component={() =>*/}
            {/*           <OneBeat*/}
            {/*               ToPlay={addToPlaylist}*/}
            {/*               SingleBeat={single_beat}*/}
            {/*               SimilarBeats={beats_similar}*/}
            {/*           />*/}
            {/*       }/>*/}
            <Route exact
                   path="/profile/isl_artist_profile/:id(\d+)"
                   component={() =>
                       <OtherProfile
                           ToPlay={addToPlaylist}
                           ProfileChecked={profile_checked}
                           UserData={user_data}
                       />
                   }/>
            <Route exact
                   path="/profile"
                   component={() => {
                       return headers['Isl-Token'] === Conf.configs.TokenVisitor
                           ? history.goBack() : (<Profile ToPlay={addToPlaylist}/>)
                   }}/>
            {/*<Route exact*/}
            {/*       path="/preference"*/}
            {/*       component={() => {*/}
            {/*           return headers['Isl-Token'] === Conf.configs.TokenVisitor*/}
            {/*               ? history.goBack() : (<Preference/>)*/}
            {/*       }}/>*/}
            <Route exact
                   path="/show-service/:id"
                   component={() => <DisplayPrestation headers={headers}/>
                   }/>
            <Route exact
                   path="/show-service-read"
                   component={() => <DisplayPrestation headers={headers} read/>
                   }/>
            <Route exact
                   path="/register"
                   component={() => {
                       return headers['Isl-Token'] === Conf.configs.TokenVisitor ? (<Register/>) : history.goBack()
                   }}/>
            <LegalNotices headers={headers}/>
            <LightModeToggle/>
        </div>
    )
};

export const generateInput = (label, value, setValue, field_, type_, icon, tip, disable, required) => {
    return (
        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
            <div className="input-group-text black-text bolder" data-tip={tip}>
                <i className={icon}/>&nbsp;{label}{required && "*"}</div>
            <input value={value}
                   onChange={(e) => changeFields(setValue, e)}
                   id={field_}
                   name={field_}
                   placeholder={field_}
                   className="form-control"
                   type={type_}
                   disabled={disable}/>
        </div>
    );
};

export const smallSpinner = (position, right) => {
    return (
        <div className="preloader-wrapper small active" style={{position: position, right: right, zIndex: 99}}>
            <div className="spinner-layer spinner-yellow-only">
                <div className="circle-clipper left">
                    <div className="circle"/>
                </div>
                <div className="circle-clipper right">
                    <div className="circle"/>
                </div>
            </div>
        </div>
    )
};

export const LightModeToggle = () => {
    //const [lightModeOn, setlightMode] = useState(false);
    const dispatch = useDispatch();
    const lightModeOn = useSelector(state => state.Home.lightModeOn);
    const [isLightOn, setIsLightOn] = useState(lightModeOn);

    useEffect(() => {

        document.documentElement.setAttribute("data-dark-mode", lightModeOn);

        try {
            if (isLightOn) {
                document.getElementsByClassName("sidebar-mini sidebar-collapse theme-dark sidebar-expanded-on-hover")[0].classList.replace("theme-dark", "theme-light")
                document.getElementsByClassName("card-header theme-dark darken-1 card-border-top")[0].classList.replace("theme-dark", "theme-light")
                document.getElementsByClassName("table-responsive theme-dark border scrollbar-isl card-border-bottom")[0].classList.replace("theme-dark", "theme-light")

            } else {
                document.getElementsByClassName("sidebar-mini sidebar-collapse theme-light sidebar-expanded-on-hover")[0].classList.replace("theme-light", "theme-dark")
                document.getElementsByClassName("card-header theme-light darken-1 card-border-top")[0].classList.replace("theme-light", "theme-dark")
                document.getElementsByClassName("table-responsive theme-light border scrollbar-isl card-border-bottom")[0].classList.replace("theme-light", "theme-dark")
            }

        } catch (e) {

        }

    });

    return (
        <div>
            <ReactTooltip place="left" className="special-color-dark" id='light-if-is-on' aria-haspopup='true'>
                {isLightOn
                    ? <h5 className="text-center text-light">Thème clair activé</h5>
                    : <h5 className="text-center text-light">Thème sombre activé</h5>}
            </ReactTooltip>
            <div className="fab-right-bottom-fixed" data-tip data-for="light-if-is-on">
                <input type="checkbox" onClick={() => {
                    setIsLightOn(!isLightOn)
                    dispatch(activeThemeLight(!isLightOn))
                }} checked={isLightOn} className="toggle" id="toggle"/>
                <label htmlFor="toggle">
                <span className="off text-secondary">
                    <i className="icon icon-moon-o s-24"/>
                </span>
                    <span className="on text-yellow">
                    <i className="icon icon-sun-o s-24"/>
                </span>
                </label>
            </div>
        </div>
    );
};

