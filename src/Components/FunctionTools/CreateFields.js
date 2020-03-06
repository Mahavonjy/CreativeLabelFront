import React, {useEffect, useRef} from "react";
import {Link, Route} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {FacebookProvider, Feed} from "react-facebook";
import Conf from "../../Config/tsconfig";
import * as Tools from "./Tools";
import TestImg from "../../assets/img/demo/a2.jpg";
import {toast} from "react-toastify";
import Register from "../Authentification/Register/Register";
import CommandSuccess from "../StatusPage/CommandStatus/Success/CommandSuccess";
import CommandError from "../StatusPage/CommandStatus/Error/CommandError";
import Beats from "../BeatMaking/Beats/AllBeatsSuggestion/Beats";
import Cart from "../Cart/Cart";
import Preference from "../Preference/Preference";
import Profile from "../Profile/Profile";
import OneBeat from "../BeatMaking/Beats/AllBeatsSuggestion/OneBeat";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";
import IslPlayer from "../Players/Players";
import KantoBiz from "../KantoBiz/KantoBiz";
import TestImageTwo from "../../assets/img/demo/a3.jpg"
import TestImageOne from "../../assets/img/demo/a7.jpg";
import TestImageThree from "../../assets/img/demo/a5.jpg";
import "react-datepicker/dist/react-datepicker.css"
import SearchBar from "../KantoBiz/SearchBar";
import {ForAddToCard} from "./PopupFields"
import {addNewPlayerList} from "../FunctionTools/FunctionProps"
import {useDispatch} from "react-redux";
import About from "../About/about";

export const CreateInput = (state_name, value, functionToOnchange, placeholder, type, required) => {
    if (type === "text" || "password" || "email" || "number") {
        return (
            <input type={type}
                   value={value}
                   id={state_name}
                   name={state_name}
                   className="form-control"
                   placeholder={placeholder}
                   onChange={functionToOnchange} required={required}/>
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
                                               onClick={() => CreateBeatsPlaylist.Play(index, "beats", false).then(() => null)}/>}
                                    </div> : <div>
                                        {states.link[index] ?
                                            <div className="text-red">
                                                {states.index === index ?
                                                    <i className="icon-pause s-28 text-danger"
                                                       onClick={() => CreateBeatsPlaylist.pausePlayer(true)}/> :
                                                    <i className="icon-play s-28 text-danger"
                                                       onClick={() => CreateBeatsPlaylist.Play(index, "beats", false).then(() => null)}/>}
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
                                <small className="ml-auto"><i
                                    className="icon-opencart text-red"/>
                                </small>
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
                                               onClick={() => CreateBeatsPlaylist.Play(index, "beats", false)}/>}
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
                            <div
                                className={height_div !== "user_profile" ? "col-md-6 d-none d-sm-block" : "col-md-7 d-none d-sm-block"}>
                                <div className="d-flex">
                                    {height_div !== "user_profile" ?
                                        <small className="ml-auto">{val.silver_price}$</small> : null}
                                    <small className="ml-auto">{val.bpm}/bpm</small>
                                    {height_div !== "user_profile" ?
                                        <FacebookProvider appId={Conf.configs.FacebookId}>
                                            <Feed
                                                link={"http://" + window.location.host + '/beats/CheckThisBeat/' + val.id}>
                                                {({handleClick}) => (
                                                    <div className="ml-auto transparent border-0">
                                                        <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                    </div>
                                                )}
                                            </Feed>
                                        </FacebookProvider> :
                                        <div className="ml-auto">
                                            <small className="ml-auto">Ecouté {val.number_play} fois</small>
                                        </div>}
                                    {height_div !== "user_profile" ?
                                        <i className="icon-heart-1 ml-auto text-red" data-tip="Like me"
                                           onClick={() => {
                                               Tools.LikeOrFollow("like", val.id, states.user_credentials);
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
                                            <button className="btn btn-outline-primary btn-sm" type="button"
                                                    data-toggle="modal"
                                                    data-target={"#" + set_of_beats_name + val.id}><i
                                                className="icon-opencart"/>
                                            </button>
                                        </div>
                                    </div>
                                </div> :
                                <div className="col-sm-1 d-none d-sm-block">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <i className="icon-trash s-24"
                                               id={val.id} data-tip="supprimer"
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
                                                    type="button" data-toggle="modal"
                                                    data-target={"#" + set_of_beats_name + val.id}><i
                                                className="icon-shopping-bag mr-3"/>Add To Cart
                                            </button>
                                            <small className="dropdown-item"><i
                                                className="icon-money mr-3"/>{val.silver_price}$</small>
                                        </div> :
                                        <div>
                                            <button className="dropdown-item"
                                                    id={val.id} data-tip="Modifier"
                                                    onClick={() => states.togglePopupEditSong(index, "beats")}><i
                                                className="icon-edit mr-3"/>Edit
                                            </button>
                                            <button className="dropdown-item"
                                                    id={val.id} data-tip="supprimer"
                                                    onClick={(e) => states.remove(e, "beats")}><i
                                                className="icon-trash mr-3"/>Delete
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
    return (
        <ul className="playlist scrollbar-isl list-group bg-dark list-group-flush scrollbar-isl" style={{height: 428}}>
            {artist_info.length !== 0 ? artist_info.map((val, index) =>
                <li className="list-group-item" key={index}>
                    <div className="d-flex align-items-center">
                        <div className="col-10">
                            <Link to={"Profile/isl_artist_profile/" + val.id}>
                                <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                    <img src={val.photo || TestImg} alt=""/>
                                </figure>
                                <h6>{val.name}</h6>
                                <small>{val.number_of_beats} Instru</small>
                            </Link>
                        </div>
                        <i className="icon-user-plus ml-auto"
                           onClick={() => Tools.LikeOrFollow("follow", val.id, user_credentials)}/>
                        <Link to={"Profile/isl_artist_profile/" + val.id} className="ml-auto"><i
                            className="icon-user-circle"/></Link>
                    </div>
                </li>
            ) : <p className="text-center text-red pt-5"> Pas de BeatMaker </p>}
        </ul>
    )
};

export const CreativeHeaders = (Title, Description, headers) => {
    return (
        <div>
            <div id="islCreativeCarousel" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner" style={{height: 470}}>
                    <div className="carousel-item active">
                        <img className="d-block w-100" src={TestImageThree} alt=""/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={TestImageOne} alt=""/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src={TestImageTwo} alt=""/>
                    </div>
                    <div
                        className={Title === "Creative KantoBiz" ? "has-bottom-gradient d-none d-sm-block" : "has-bottom-gradient"}>
                        <div className="home-menu pl-md-5">
                            <div className="row">
                                <div className="col-12 col-lg-10 animated">
                                    <div className="xv-slider-content clearfix color-white">
                                        <h1 className="s-64 mt-5 font-weight-lighter"> {Title} </h1>
                                        <p className="s-24 font-weight-lighter"
                                           dangerouslySetInnerHTML={{__html: Description}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {Title === "Creative KantoBiz" ? <SearchBar headers={headers}/> : null}
                </div>
            </div>
        </div>
    )
};

export const SideBars = (state_cart, log_name, logout_class, location, history, headers, logout, isPlaying, ifUserGenreSelected) => {
    return (
        <div className="sidebar">
            <a href="/beats"><img alt="Logo" src="https://zupimages.net/up/19/18/3ltf.png"/></a>
            {!isPlaying &&
            <a href="/#" data-toggle="push-menu" data-tip="Ouvrir ou le menu"
               className="paper-nav-toggle text-center pp-nav-toggle pt-5 ml-3">
                <i/>
            </a>}
            <ul className="sidebar-menu">
                <ReactTooltip className="special-color-dark" id='beats' aria-haspopup='true'/>
                {/* BEATS */}
                <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Creative BeatMaking" onClick={() => {
                    (location.pathname !== "/beats") && history.push("/beats")
                }}><i className="icon icon-heartbeat s-24"/> <span className="ml-5">BeatMaking</span>
                </li>

                {/* KantoBiz */}
                <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Creative KantoBiz" onClick={() => {
                    location.pathname !== "/kantobiz" && history.push("/kantobiz")
                }}><i className="icon icon-compact-disc-2 s-24"/> <span className="ml-5">KantoBiz</span>
                </li>

                {/* PROFILE */}
                <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet profil" onClick={() => {
                    if (headers['Isl-Token'] !== Conf.configs.TokenVisitor && !ifUserGenreSelected)
                        toast.warn("Preference not defined");
                    else headers['Isl-Token'] === Conf.configs.TokenVisitor && location.pathname !== "/Profile"
                        ? document.getElementById("LoginRequire").click()
                        : history.push("/Profile");
                }}><i className="icon icon-user s-24"/> <span className="ml-5">Profile</span>
                </li>

                {/* CART */}
                <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Panier" onClick={() => {
                    ((state_cart > 0) && (location.pathname !== "/Cart")) ? history.push("/Cart") : toast.warn("Veuillez remplir votre panier avant")
                }}>
                    <div id="CartBadge">
                            <span className="p1 " data-count={state_cart}>
                                <i className="icon icon-cart-plus s-24 mr-5" data-count="4b"/> Cart
                            </span>
                    </div>
                </li>

                {/* About */}
                <li style={{margin: "0 0 20px 11px"}} data-tip="Onglet à propos" onClick={() => {
                    (location.pathname !== "/about") && history.push("/about")
                }}><i className="icon icon-info-circle s-24"/> <span className="ml-5">À propos</span>
                </li>

                {/* LOGOUT OR LOGIN */}
                <li style={logout_class === "icon icon-login s-24 mr-5" ? {margin: "50px 0 20px 8px"} : {margin: "50px 0 20px 12px"}}
                    data-tip={logout_class === "icon icon-login s-24 mr-5" ? "Se Connecter" : " Se déconnecter"}
                    onClick={() => logout()}>
                    <i className={logout_class}/> <span>{log_name}</span>
                </li>
            </ul>
        </div>
    )
};

export const SideBarsMain = (addToPlaylist, single_beat, beats_similar, profile_checked, user_data, headers) => {
    return (
        <div>
            <Route path="/beats" exact component={() => <Beats ToPlay={addToPlaylist}/>}/>
            <Route path="/Profile" exact component={() => {
                return headers['Isl-Token'] === Conf.configs.TokenVisitor ? window.location.replace('/beats#LoginRequire') : (
                    <Profile ToPlay={addToPlaylist}/>)
            }}/>
            <Route path="/preference" exact component={() => {
                return headers['Isl-Token'] === Conf.configs.TokenVisitor ? window.location.replace('/beats#LoginRequire') : (
                    <Preference/>)
            }}/>
            <Route path="/register" exact component={() => <Register/>}/>
            <Route path="/CommandSuccess" exact component={() => <CommandSuccess/>}/>
            <Route path="/CommandError" exact component={() => <CommandError/>}/>
            <Route path="/kantobiz" exact component={() => <KantoBiz headers={headers}/>}/>
            <Route path="/Cart" exact component={() => <Cart ToPlay={addToPlaylist}/>}/>
            <Route path="/beats/CheckThisBeat/:id(\d+)" exact
                   component={() => <OneBeat ToPlay={addToPlaylist} SingleBeat={single_beat}
                                             SimilarBeats={beats_similar}/>}/>
            <Route path="/Profile/isl_artist_profile/:id(\d+)" exact
                   component={() => <OtherProfile ToPlay={addToPlaylist} ProfileChecked={profile_checked}
                                                  UserData={user_data}/>}/>
            <Route path="/about" exact component={() => <About/>}/>
        </div>
    )
};

export const generateInput = (label, value, setValue, field_, type_, icon, tip, disable) => {
    return (
        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
            <div className="input-group-text black-text bolder" data-tip={tip}><i className={icon}/>&nbsp;{label}</div>
            <input value={value} onChange={(e) => Tools.changeFields(setValue, e)}
                   id={field_} name={field_} placeholder={field_} className="form-control" type={type_}
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
