import React from "react";
import {Link, Route} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {FacebookProvider, Feed} from "react-facebook";
import Conf from "../../Config/tsconfig";
import FunctionTools from "./FunctionTools";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export const CreateInput = (state_name, value, functionToOnchange, placeholder, type, required) => {
    return () => {
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
};

export const CreateBeatsPlaylist = (that, set_of_beats_name, props_value, state_value, height_div) => {

    function Play (that, index, type_, run) {
        if (that.state.index !== index && that.state.tmp === null) {
            that.setState({index: index, tmp: index}, () => {
                that.props.addNewPlayerList(props_value);
                that.props.ToPlay(index, type_, run, that, set_of_beats_name);
            })
        } else {
            if (index !== that.state.index) {
                let tmp;
                if (that.state.index === that.state.tmp) tmp = true;
                that.setState({index: index, tmp: index}, () => {
                    if (tmp) that.props.ToPlay(index, type_, run);
                    else IslPlayer.pauseOrPlayPlayer(true);
                })
            } else that.setState({tmp: null}, () => {pausePlayer(that, false)});
        }
    }

    function pausePlayer (that, run) {
        if (that.state.index !== null) {
            that.setState({tmp: that.state.index}, () => {
                that.setState({index: null}, () => {
                    if (run) {
                        IslPlayer.pauseOrPlayPlayer(false);
                    }
                })
            });
        }
    }

    return () => {
        if (height_div === "short_beats") {
            return (
                <div>
                    {props_value.map((val, index) =>
                        <div className="list-group-item" key={index}>
                            <div className="d-flex align-items-center">
                                <div>
                                    {state_value === "oneBeats"?
                                        <div className="text-red">
                                        {that.state.index === index ?
                                            <i className="icon-pause s-28 text-danger" onClick={() => pausePlayer(that, true)}/>:
                                            <i className="icon-play s-28 text-danger" onClick={() => {Play(that, index, "beats", false)}}/>}
                                        </div> : <div>
                                        {state_value[index] ?
                                            <div className="text-red">
                                                {that.state.index === index ?
                                                    <i className="icon-pause s-28 text-danger" onClick={() => pausePlayer(that, true)}/>:
                                                    <i className="icon-play s-28 text-danger" onClick={() => {Play(that, index, "beats", false)}}/>}
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
                                {that.props.ForAddToCard(that, val, set_of_beats_name)}
                            </div>
                        </div>)}
                </div>
            )
        } else {
            return (
                <div>
                    <ReactTooltip/>
                    {props_value.map((val, index) =>
                        <div className="m-1 my-4" key={index}>
                            <div className="d-flex align-items-center">
                                <div className="col-1">
                                    {state_value[index] ?
                                        <div>
                                            {that.state.index === index ?
                                                <i className="icon-pause s-28 text-danger" onClick={() => pausePlayer(that, true)}/>:
                                                <i className="icon-play s-28 text-danger" onClick={() => Play(that, index, "beats", false)}/>}
                                        </div>
                                        :
                                        <div className="spinner-grow text-primary" role="status">
                                            <span className="sr-only"/>
                                        </div>
                                    }
                                </div>
                                <div className="col-md-3">
                                    <figure className="avatar-md float-left  mr-2">
                                        <img className="r-3" src={val.photo} alt="" />
                                    </figure>
                                    {height_div !== "user_profile" ?
                                        <Link to={'beats/CheckThisBeat/' + val.id}>
                                            <h6>{val.title}</h6>
                                            <small className="text-red">{val.artist}</small>
                                        </Link>:
                                        <div className="d-flex">
                                            <h6 className="ml-auto mr-2">{val.title}</h6>
                                            <small className="ml-auto mr-2">{val.time}</small>
                                        </div>
                                    }
                                </div>
                                <ReactTooltip/>
                                <div className={height_div !== "user_profile" ? "col-md-6 d-none d-sm-block" : "col-md-7 d-none d-sm-block"}>
                                    <div className="d-flex">
                                        {height_div !== "user_profile" ? <small className="ml-auto">{val.silver_price}$</small>: null}
                                        <small className="ml-auto">{val.bpm}/bpm</small>
                                        {height_div !== "user_profile" ?
                                            <FacebookProvider appId={Conf.configs.FacebookId}>
                                            <Feed link={"http://" + window.location.host + '/beats/CheckThisBeat/' + val.id}>
                                                {({ handleClick }) => (
                                                    <div className="ml-auto transparent border-0">
                                                        <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                    </div>
                                                )}
                                            </Feed>
                                        </FacebookProvider> :
                                            <div className="ml-auto" title={"Edit this beats"}>
                                                <small className="ml-auto">Ecouté {val.number_play} fois</small>
                                            </div>}
                                        {height_div !== "user_profile" ?
                                            <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => {
                                                FunctionTools.LikeOrFollow("like", val.id);
                                            }}/> :
                                            <div className="ml-auto" title={"Edit this beats"}>
                                                <i className="icon-edit s-24" id={val.id}
                                                   onClick={() => that.togglePopupEditSingle(index, "beats")}>
                                                </i>
                                            </div>}
                                    </div>
                                </div>
                                {height_div !== "user_profile" ?
                                <div className="col-sm-2 d-none d-sm-block">
                                    <div className="d-flex">
                                        <div className="ml-auto">
                                            <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                    data-target={"#" + set_of_beats_name + val.id}><i className="icon-opencart"/>
                                            </button>
                                        </div>
                                    </div>
                                </div> :
                                    <div className="col-sm-1 d-none d-sm-block">
                                        <div className="d-flex">
                                            <div className="ml-auto">
                                                <i className="icon-trash s-24"
                                                   id={val.id}
                                                   onClick={(e) => that.delete(e, "beats")}>
                                                </i>
                                            </div>
                                        </div>
                                    </div> }

                                <div className="col-1 ml-auto d-sm-none" >
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
                                            <small className="dropdown-item"><i className="icon-money mr-3"/>{val.silver_price}$</small>
                                        </div>:
                                            <div>
                                                <button className="dropdown-item"
                                                        title={"Edit this beats"}
                                                        id={val.id}
                                                        onClick={() => that.togglePopupEditSingle(index, "beats")}><i
                                                    className="icon-edit mr-3"/>Edit
                                                </button>
                                                <button className="dropdown-item"
                                                        title={"Delete this beats"}
                                                        id={val.id}
                                                        onClick={(e) => that.delete(e, "beats")}><i
                                                    className="icon-trash mr-3"/>Delete
                                                </button>
                                            </div>}
                                    </div>
                                </div>

                                {/* Here is Popup for add to cart */}
                                {height_div !== "user_profile" ? <div> {that.props.ForAddToCard(that, val, set_of_beats_name)} </div>: null}
                            </div>
                        </div>
                    )}
                </div>
            )
        }
    };
};

export const DisplayArtist = (that_value) => {
    return () => {
        return (
            <ul className="playlist list-group bg-dark list-group-flush" style={{height: 428}}>
                {that_value ? that_value.map((val, index) =>
                    <li className="list-group-item" key={index}>
                        <div className="d-flex align-items-center">
                            <div className="col-10">
                                <Link to={"Profile/isl_artist_profile/" + val.id}>
                                    <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                        <img src={val.photo || TestImg} alt=""/>
                                    </figure>
                                    <h6>{val.name}</h6>
                                    <small>5 Beats</small>
                                </Link>
                            </div>
                            <i className="icon-user-plus ml-auto" onClick={() => FunctionTools.LikeOrFollow("follow", val.id)}/>
                            <Link to={"Profile/isl_artist_profile/" + val.id} className="ml-auto"><i className="icon-user-circle"/></Link>
                        </div>
                    </li>
                ): <p className="text-center">Vide</p>}
            </ul>
        )
    }
};

export const CreativeHeaders = (Title, Description, that) => {
    return () => {
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
                        <div className={that && Title === "Creative KantoBiz"? "has-bottom-gradient d-none d-sm-block": "has-bottom-gradient" }>
                            <div className="home-menu pl-md-5">
                                <div className="row">
                                    <div className="col-12 col-lg-10 animated">
                                        <div className="xv-slider-content clearfix color-white">
                                            <h1 className="s-64 mt-5 font-weight-lighter"> {Title} </h1>
                                            <p className="s-24 font-weight-lighter" dangerouslySetInnerHTML={{__html: Description }}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {that && Title === "Creative KantoBiz"?
                            <div className="Base search-bar relative p-b-40 p-t-10">
                            {/* Input Search */}
                                <h3 className="text-center text-red">Trouvez la meilleur prestation pour votre evenement</h3><br/>
                                <form action="#">
                                    <div className="search-row row justify-content-center">
                                        <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px"}}>
                                            <input className="bg-transparent text-center text-white border-0" type="text" name="city" placeholder="Madagascar" id="location" value="Madagascar" disabled={true}/>
                                            <label className="input-group-addon bg-transparent"><i className="icon-map-location text-center text-red"/><span className="ml-2 text-white">?</span></label>
                                        </div>

                                        <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px"}}>
                                            <div className="btn-group bootstrap-select listing-categories">
                                                <button className="btn btn-outline-dark border-0 dropdown-toggle text-white" type="button"
                                                        data-toggle="dropdown" aria-haspopup="true" id="city"
                                                        aria-expanded="false">Choisir la ville
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="/#">Action</a>
                                                </div>
                                            </div>
                                            <label className="input-group-addon bg-transparent"><i className="icon-location-arrow text-red"/><span className="ml-2 text-white">?</span></label>
                                        </div>

                                        <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px"}}>
                                            <div className="btn-group bootstrap-select listing-categories">
                                                <button className="btn btn-outline-dark border-0 dropdown-toggle text-left text-white" type="button"
                                                        data-toggle="dropdown" aria-haspopup="true" id="city"
                                                        aria-expanded="false">Thematiques
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="/#">Action</a>
                                                </div>
                                            </div>
                                            <label className="input-group-addon bg-transparent"><i className="icon-tasks text-center text-red"/><span className="ml-2 text-white">?</span></label>
                                        </div>

                                        <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px"}}>
                                            <div className="btn-group bootstrap-select listing-categories">
                                                <button className="btn btn-outline-dark border-0 dropdown-toggle text-white" type="button"
                                                        data-toggle="dropdown" aria-haspopup="true" id="Evenement"
                                                        aria-expanded="false">	&nbsp;	Evenements
                                                </button>
                                                <div className="dropdown-menu">
                                                    <a className="dropdown-item" href="/#">Action</a>
                                                </div>
                                            </div>
                                            <label className="input-group-addon bg-transparent"><i className="icon-network text-center text-red"/><span className="ml-2 text-white">?</span></label>
                                        </div>

                                        <div className=" col-sm-2 d-inline-block border border-primary text-center " style={{borderRadius: "5px"}}>
                                            <DatePicker className="bg-transparent text-center text-white border-0" selected={that.state.startDate} onChange={that.ChangeDate}/>
                                            <label className="input-group-addon bg-transparent"><i className="icon-calendar text-center text-red"/><span className="ml-2 text-white">?</span></label>
                                        </div>

                                        <div className="col-md-10">
                                            <button type="submit" className="btn btn-outline-primary btn-lg p-3 m-2 col">Recherche&nbsp;<i className="icon-search-1 text-white"/></button>
                                        </div>

                                    </div>
                                </form>
                            {/* End Search */}
                            </div>
                            :null}

                    </div>
                    <a className="carousel-control-prev" href="#islCreativeCarousel" role="button" data-slide="prev" style={{fontSize: 0}}>prev</a>
                    <a className="carousel-control-next" href="#islCreativeCarousel" role="button" data-slide="next" style={{fontSize: 0}}>next</a>
                </div>
            </div>
        )
    }
};

export const SideBars = (that, location, history, headers) => {
    return () => {
        return (
            <div className="sidebar">
                <a href="/beats"><img alt="Logo" src="https://zupimages.net/up/19/18/3ltf.png"/></a>
                <ul className="sidebar-menu">
                    <ReactTooltip className="special-color-dark" id='beats' aria-haspopup='true'/>

                    {/* BEATS */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Instrumental" onClick={() => {
                        if (location.pathname !== "/beats") {
                            history.push("/beats");
                            that.setState({select: ""})
                        }
                    }}><i className="icon icon-heartbeat s-24" /> <span className="ml-5">BeatMaking</span>
                    </li>

                    {/* KantoBiz */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet KantoBiz" onClick={() => {
                        if (location.pathname !== "/kantobiz") {
                            history.push("/kantobiz");
                            that.setState({select: ""})
                        }
                    }}><i className="icon icon-compact-disc-2 s-24" /> <span className="ml-5">KantoBiz</span>
                    </li>

                    {/* PROFILE */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet profile" onClick={() => {
                        if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                            document.getElementById("LoginRequire").click();
                        } else if (location.pathname !== "/Profile") {
                            history.push("/Profile");
                            that.setState({select: "Profile"})
                        }
                    }}><i className="icon icon-user s-24" /> <span className="ml-5">Profile</span>
                    </li>

                    {/* CART */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Panier" onClick={() => {
                        if (that.state.cart) {
                            if (location.pathname !== "/Cart" ) {
                                history.push("/Cart");
                                that.setState({select: "Cart"})
                            }
                        } else toast.warn("Your cart is empty")
                    }}>
                        <div id="CartBadge">
                            <span className="p1 " data-count={that.state.cart}>
                                <i className="icon icon-cart-plus s-24 mr-5" data-count="4b"/> Cart
                            </span>
                        </div>
                    </li>

                    {/* LOGOUT OR LOGIN */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip={that.state.logout_class === "icon icon-login s-24 mr-5"? "Se Connecter": " Se deconnecter"} onClick={that.logout}>
                        <i className={that.state.logout_class}/> <span>{that.state.log_name}</span>
                    </li>

                </ul>
            </div>
        )
    }
};

export const SideBarsMain = (that) => {
    return () => {
        return (
            <div>
                <Route path="/register" exact component={() => <Register/>}/>
                <Route path="/CommandSuccess" exact component={() => <CommandSuccess/>}/>
                <Route path="/CommandError" exact component={() => <CommandError/>}/>
                <Route path="/kantobiz" exact component={() => <KantoBiz/>}/>
                <Route path="/beats" exact component={() => <Beats ToPlay={that.addToPlaylist}/>}/>
                <Route path="/Cart" component={() => <Cart ToPlay={that.addToPlaylist}/>}/>
                <Route path="/preference" exact component={() => {
                    if (JSON.parse(localStorage.getItem("Isl_Credentials"))) return (<Preference/>);
                    else window.location.replace('/beats#LoginRequire')}}/>
                <Route exact path="/Profile" component={
                    () => {if (JSON.parse(localStorage.getItem("Isl_Credentials")))
                        return (<Profile ToPlay={that.addToPlaylist}/>);
                    else window.location.replace('/beats#LoginRequire')}}/>
                <Route path="/beats/CheckThisBeat/:id(\d+)" component={
                    () => <OneBeat ToPlay={that.addToPlaylist} SingleBeat={that.state.single_beat} SimilarBeats={that.state.beats_similar}/>}/>
                <Route path="/Profile/isl_artist_profile/:id(\d+)" component={
                    () => <OtherProfile ToPlay={that.addToPlaylist} ProfileChecked={that.state.profile_checked} UserData={that.state.user_data}/>}/>
            </div>
        )
    }
};

export const pausePlayer = (_that , set_of_beats_name) => {
    return () => {
        CreateBeatsPlaylist(_that , set_of_beats_name);
        return true;
    }
};

export const playPlayer = (index, type_, _that , set_of_beats_name) => {
    return () => {
        CreateBeatsPlaylist(_that , set_of_beats_name);
        return true;
    }
};

export const changeIndex = (index, _that) => {
    return () => {
        _that.setState({index: index});
        return true;
    }
};
