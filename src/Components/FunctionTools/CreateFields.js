import React from "react";
import {Link, Route} from "react-router-dom";
import ReactTooltip from "react-tooltip";
import {FacebookProvider, Feed} from "react-facebook";
import Conf from "../../Config/tsconfig";
import FunctionTools from "./FunctionTools";
import TestImg from "../../assets/img/demo/a2.jpg";
import TestImg1 from "../../assets/img/demo/b1.jpg";
import {toast} from "react-toastify";
import Register from "../Register/Register";
import CommandSuccess from "../StatusPage/CommandStatus/Success/CommandSuccess";
import CommandError from "../StatusPage/CommandStatus/Error/CommandError";
import Beats from "../Beats/AllBeatsSuggestion/Beats";
import Cart from "../Cart/Cart";
import Preference from "../Preference/Preference";
import Profile from "../Profile/Profile";
import OneBeat from "../Beats/AllBeatsSuggestion/OneBeat";
import OtherProfile from "../Profile/SeeOtherProfile/OtherProfile";

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

export const CreateBeatsPlaylist = (that, set_of_beats_name) => {

    return () => {
        return (
            <div>
                {that.props.beats.map((val, index) =>
                    <div className="m-1 my-4" key={index}>
                        <div className="d-flex align-items-center">
                            <div className="col-1">
                                {that.state.link_beats[index] ?
                                    <div>
                                        {that.state.index === index ?
                                            <i className="icon-pause s-28 text-danger" onClick={() => that.pausePlayer(true)}/>:
                                            <i className="icon-play s-28 text-danger" onClick={() => {that.Play(index, "beats")}}/>}
                                    </div>
                                    :
                                    <div className="preloader-wrapper small active">
                                        <div className="spinner-layer spinner-red-only">
                                            <div className="circle-clipper left">
                                                <div className="circle"/>
                                            </div>
                                            <div className="gap-patch">
                                                <div className="circle"/>
                                            </div>
                                            <div className="circle-clipper right">
                                                <div className="circle"/>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="col-md-3">
                                <figure className="avatar-md float-left  mr-2">
                                    <img className="r-3" src={val.photo} alt="" />
                                </figure>
                                <Link to={'CheckThisBeat/' + val.id}>
                                    <h6>{val.title}</h6>
                                    <small className="text-red">{val.artist}</small>
                                </Link>
                            </div>
                            <ReactTooltip/>
                            <div className="col-md-5 d-none d-sm-block">
                                <div className="d-flex">
                                    <small className="ml-auto">{val.silver_price}$</small>
                                    <small className="ml-auto">{val.bpm}/bpm</small>
                                    <FacebookProvider appId={Conf.configs.FacebookId}>
                                        <Feed link={"http://" + window.location.host + '/CheckThisBeat/' + val.id}>
                                            {({ handleClick }) => (
                                                <div className="ml-auto transparent border-0">
                                                    <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                </div>
                                            )}
                                        </Feed>
                                    </FacebookProvider>
                                    <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => {
                                        FunctionTools.LikeOrFollow("like", val.id);
                                    }}/>
                                </div>
                            </div>
                            <div className="col-sm-2 d-none d-sm-block">
                                <div className="d-flex">
                                    <div className="ml-auto">
                                        <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                data-target={"#" + set_of_beats_name + val.id}><i className="icon-opencart"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1 ml-auto d-sm-none" >
                                <a href="#" data-toggle="dropdown"
                                   aria-haspopup="true"
                                   aria-expanded="false">
                                    <i className="icon-more-1"/></a>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <button className="dropdown-item"
                                            type="button" data-toggle="modal"
                                            data-target={"#trackModal" + val.id}><i
                                        className="icon-shopping-bag mr-3"/>Add To Cart
                                    </button>
                                    <small className="dropdown-item"><i className="icon-money mr-3"/>{val.silver_price}$</small>
                                </div>
                            </div>

                            {/* Here is Popup for add to cart */}
                            {that.props.ForAddToCard(that, val, set_of_beats_name)}
                        </div>
                    </div>
                )}
            </div>
        )
    };
};

export const DisplayArtist = (that) => {
    return () => {
        return (
            <ul className="playlist list-group bg-black list-group-flush" style={{height: 428}}>
                {that.props.top_beatmaker ? that.props.top_beatmaker.map((val, index) =>
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

export const CreativeHeaders = () => {
    return () => {
        return (
            <section>
                <div className="text-white">
                    <div className="xv-slide" data-bg-possition="top" style={{backgroundImage: 'url('+TestImg1+')'}}>
                        <div className="has-bottom-gradient">
                            <div className="home-menu p-md-5">
                                <div className="row">
                                    <div className="col-12 col-lg-10 animated">
                                        <div className="xv-slider-content clearfix color-white">
                                            <h1 className="s-64 mt-5 font-weight-lighter">Creative Beats</h1>
                                            <p className="s-24 font-weight-lighter"> Des créations orginales qui font la différence  <br /> Pour les professionnels de la musique (artistes,producteurs, labels...)  </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
};

export const SideBars = (that, location, history, headers) => {
    return () => {
        return (
            <div className="sidebar">
                <ul className="sidebar-menu">
                    <ReactTooltip className="special-color-dark" id='beats' aria-haspopup='true'/>

                    {/* BEATS */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet Instrumental" onClick={() => {
                        if (location.pathname !== "/beats") {
                            history.push("/beats");
                            that.setState({select: ""})
                        }
                    }}><i className="icon icon-heartbeat s-24" /> <span>Beats</span>
                    </li>

                    {/* PROFILE */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip="Onglet profile" onClick={() => {
                        if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                            document.getElementById("LoginRequire").click();
                        } else if (location.pathname !== "/Profile") {
                            history.push("/Profile");
                            that.setState({select: "Profile"})
                        }
                    }}><i className="icon icon-user s-24" /> <span>Profile</span>
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
                            <span className="p1" data-count={that.state.cart}>
                                <i className="p3 icon icon-cart-plus s-24" data-count="4b"/> cart
                            </span>
                        </div>
                    </li>

                    {/* LOGOUT OR LOGIN */}
                    <li style={{margin: "0 0 20px 10px"}} data-tip={that.state.logout_class === "icon icon-login s-24"? "Se Connecter": " Se deconnecter"} onClick={that.logout}>
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
                    () => <OneBeat ToPlay={that.addToPlaylist}
                                   SingleBeat={that.state.single_beat}
                                   ArtistBeats={that.state.all_artist_beats}
                                   SimilarBeats={that.state.beats_similar}/>}/>
                <Route path="/Profile/isl_artist_profile/:id(\d+)" component={
                    () => <OtherProfile ToPlay={that.addToPlaylist}
                                        ProfileChecked={that.state.profile_checked}
                                        UserData={that.state.user_data}
                                        UserBeats={that.state.user_beats}/>}/>
            </div>
        )
    }
};
