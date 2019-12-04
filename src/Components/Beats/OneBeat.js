import React, { Component } from "react";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import Cookies from "universal-cookie/cjs";
import {toast, ToastContainer} from "react-toastify";
import TestImg from "../../assets/img/demo/a2.jpg";
import IslPlayer from "../Players/Players";
import FunctionTools from "../FunctionTools/FunctionTools";
import {connect} from "react-redux";

let PhotoD =" https://zupimages.net/up/19/18/3ltf.png";
let _that;
class OneBeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false, NotFound: false, playing: false,
            single_beat: '', all_artist_beats: '', index: null, tmp: null, song_id_shared: null, songId: null
        };
        _that = this
    }

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "OneBeats");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "OneBeats");
                })
            } else {
                this.setState({tmp: null}, () => {
                    IslPlayer.pauseOrPlayPlayer();
                })
            }
        }
    };

    pausePlayer = (run) => {
        if (this.state.index !== null) {
            this.setState({tmp: this.state.index}, () => {
                this.setState({index: null}, () => {
                    if (run) {
                        IslPlayer.pauseOrPlayPlayer();
                    }
                })
            });
        }
    };

    PlaySingle = (index, type_) => {
        if (!this.state.playing) {
            this.setState({playing: true, songId: index}, () => {
                if (this.state.songId)
                    IslPlayer.pauseOrPlayPlayer();
                else this.props.ToPlay(index, type_, Array(this.props.SingleBeat));
            })
        } else {
            this.setState({playing: false}, () => {
                IslPlayer.pauseOrPlayPlayer();
            })
        }
    };

    static PauseOrPlaySingle = () => {
        _that.setState({playing: false});
    };

    static pausePlayer() {
        _that.pausePlayer(false);
    }

    static playPlayer(index, type_) {
        _that.Play(index, type_);
    }

    static changeIndex(index) {
        _that.setState({index: index});
    }

    componentDidMount() {
        this.setState({ isMounted: true});
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        if (this.state.NotFound) {
            return (
                <NotFound/>
            )
        } else {
            return (
                <div className="Base">
                    <ToastContainer/>
                    <section className="pl-lg-3 bg-dark"
                             style={{backgroundImage: 'url(' + this.props.SingleBeat.photo + ')'}}>
                        <div className="has-bottom-gradient">
                        <div className="row pt-5 ml-lg-5 mr-lg-5">
                            <div className="col-md-10 offset-1">
                                <div className="row my-5 pt-5">
                                    <div className="col-md-3">
                                        <img src={this.props.SingleBeat.photo || TestImg} alt="/"/>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="d-md-flex align-items-center justify-content-between">
                                            <h1 className="my-3 text-white ">{this.props.SingleBeat.title}</h1>
                                            <div className="ml-auto mb-2">
                                                <a href="#" className="snackbar" data-text="Bookmark clicked"
                                                   data-pos="top-right" data-showaction="true" data-actiontext="ok"
                                                   data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                    className="icon-bookmark s-24"/></a>
                                                <a href="#" className="snackbar ml-3" data-text="You like this song"
                                                   data-pos="top-right" data-showaction="true" data-actiontext="ok"
                                                   data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                    className="icon-heart s-24"/></a>
                                                <a href="#" className="snackbar ml-3" data-text="Thanks for sharing"
                                                   data-pos="top-right" data-showaction="true" data-actiontext="ok"
                                                   data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                    className="icon-share-1 s-24"/></a>
                                            </div>
                                        </div>
                                        <div className="text-white my-2">
                                            <p>{this.props.SingleBeat.description}</p>
                                        </div>
                                        <div className="row pt-3">
                                            {this.state.playing ?
                                            <i className="icon-pause-1 s-36 text-red ml-3 mr-4" onClick={() => {this.PlaySingle(0, "OneBeats")}} />:
                                            <i className="icon-play-button-1 s-36 text-red ml-3 mr-4" onClick={() => {this.PlaySingle(0, "OneBeats")}} />}
                                            <button className="btn btn-primary btn-lg" data-toggle="modal"
                                                    data-target={"#trackModalSingleBeat" + this.props.SingleBeat.id}>Buy Now
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </section>
                    <section className="section mt-4">
                        <div className="row row-eq-height">
                            <div className="col-lg-8">
                                <div className="card no-b mb-md-3 p-2">
                                    <div className="card-header no-bg transparent">
                                        <div className="d-flex justify-content-between">
                                            <div className="align-self-center">
                                                <div className="d-flex">
                                                    <i className="icon-music s-36 mr-3  mt-2"/>
                                                    <div>
                                                        <h4>All beats of this beatmaker</h4>
                                                        <p>Checkout What's new</p>
                                                        <div className="mt-3">
                                                            <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1"
                                                                role="tablist">
                                                                <li className="nav-item">
                                                                    <a className="nav-link show active" id="w2--tab1"
                                                                       data-toggle="tab" href="#w2-tab1" role="tab"
                                                                       aria-selected="true">Beats</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body no-p">
                                        <div className="tab-content" id="v-pills-tabContent1">
                                            <div className="tab-pane fade active show" id="w2-tab1" role="tabpanel"
                                                 aria-labelledby="w2-tab1">
                                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 300}}>
                                                    <div className="m-1 my-4">
                                                        {this.props.ArtistBeats.map((val, index) =>
                                                        <div className="d-flex align-items-center" key={0}>
                                                            <div className="col-1">
                                                                {this.state.index === index ?
                                                                    <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                                    <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, this.props.ArtistBeats)}}/>}
                                                            </div>
                                                            <div className="col-md-5">
                                                                <figure className="avatar-md float-left  mr-3 mt-1">
                                                                    <img className="r-3" src={val.photo || PhotoD}
                                                                         alt=""/>
                                                                </figure>
                                                                <h6>{val.title}</h6>{val.artist}
                                                            </div>
                                                            <div className="col=md-3">
                                                                <span className="ml-2">{val.basic_price}$</span>
                                                            </div>
                                                            <div className="col-md-5 d-none d-lg-block">
                                                                <div className="d-flex">
                                                                    <span className="ml-auto">{val.time}</span>
                                                                    <a href="#" className="ml-auto"><i
                                                                        className="icon-share-1"/></a>
                                                                    <button className="btn btn-outline-primary btn-sm ml-auto" type="button" data-toggle="modal"
                                                                            data-target={"#trackModalArtistBeats" + val.id}>
                                                                        <i className="icon-opencart"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="col-1 ml-auto d-lg-none">
                                                                <a href="#" data-toggle="dropdown" aria-haspopup="true"
                                                                   aria-expanded="false">
                                                                    <i className="icon-more-1"/></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="#"><i
                                                                        className="icon-share-1 mr-3"/> Share</a>
                                                                    <a className="dropdown-item text-light" type="button" data-toggle="modal"
                                                                       data-target={"#trackModalArtistBeats" + val.id}><i
                                                                        className="icon-shopping-bag mr-3"/>Buy Me
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <div className="modal custom show" id={"trackModalArtistBeats"+ val.id} tabIndex="-1" role="dialog"
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
                                                                                                <img src={val.photo} alt="/" style={{width:"300px", margin:"0 auto"}}/>
                                                                                                <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{val.title}</h1>
                                                                                                <div className="col-md-9">
                                                                                                    <div className="d-md-flex align-items-center justify-content-between">
                                                                                                        <div className="ml-auto mb-2">
                                                                                                            <a href="#" className="snackbar" data-text="Bookmark clicked" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-bookmark s-24" /></a>
                                                                                                            <a href="#" className="snackbar ml-3" data-text="You like this song" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-heart s-24" /></a>
                                                                                                            <a href="#" className="snackbar ml-3" data-text="Thanks for sharing" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-share-1 s-24" /></a>
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
                                                                                    <ul className="playlist list-group list-group-flush">
                                                                                        <li className="list-group-item" >
                                                                                            <div className="d-flex align-items-center ">
                                                                                                <div
                                                                                                    className="col-8 ">
                                                                                                    <h6>Standard</h6>
                                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                        MP3
                                                                                                    </small>
                                                                                                </div>
                                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.basic_price, "basic_price", val, this.props)}>
                                                                                                    <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                                        <div className="s-16">
                                                                                                            {val.basic_price} $
                                                                                                        </div>
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
                                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                        MP3 + WAV
                                                                                                    </small>
                                                                                                </div>
                                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.silver_price, "silver_price", val, this.props)}>
                                                                                                    <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                                        <div className="s-14">
                                                                                                            {val.silver_price} $
                                                                                                        </div>
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
                                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                        MP3 + WAV + STEMS
                                                                                                    </small>
                                                                                                </div>
                                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.gold_price, "gold_price", val, this.props)}>
                                                                                                    <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                                        <div className="s-14">
                                                                                                            {val.gold_price} $
                                                                                                        </div>
                                                                                                        <i className="icon-money"/>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </li>
                                                                                        {val.platinum_price ?
                                                                                            <li className="list-group-item">
                                                                                                <div
                                                                                                    className="d-flex align-items-center ">
                                                                                                    <div
                                                                                                        className="col-8 ">
                                                                                                        <h5> Platinum Lease</h5>
                                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                            Unlimited + Exclusive
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.platinum_price, "platinum_price", val, this.props)}>
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
                                                        </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-header transparent b-b">
                                        <strong>Similar Beats</strong>
                                    </div>
                                    <div className="playlist list-group bg-dark list-group-flush" style={{height: 383}}>
                                        {this.props.SimilarBeats.length > 0 ? this.props.SimilarBeats.map((val, index) =>
                                            <div className="list-group-item" key={index}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <div className="text-red">
                                                            {this.state.index === index ?
                                                                <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                                <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, this.props.SimilarBeats)}}/>}
                                                        </div>
                                                    </div>
                                                    <div className="col-10 text-center">
                                                        <figure className="avatar-md float-left  mr-3 mt-1">
                                                            <img className="r-3" src={val.photo || PhotoD} alt=""/>
                                                        </figure>
                                                        <h6>{val.title}</h6>
                                                        <small>{val.artist}</small>
                                                    </div>

                                                    {/*<div className="ml-auto text-red">*/}
                                                    {/*    <i className="icon-opencart"/>*/}
                                                    {/*</div>*/}
                                                    <button className="btn btn-outline-primary btn-sm ml-auto text-red" type="button" data-toggle="modal"
                                                            data-target={"#trackModalSimilarBeats" + val.id}>
                                                        <i className="icon-opencart"/>
                                                    </button>
                                                </div>
                                                <div className="modal custom show" id={"trackModalSimilarBeats"+ val.id} tabIndex="-1" role="dialog"
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
                                                                                    <img src={val.photo} alt="/" style={{width:"300px", margin:"0 auto"}}/>
                                                                                    <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{val.title}</h1>
                                                                                    <div className="col-md-9">
                                                                                        <div className="d-md-flex align-items-center justify-content-between">
                                                                                            <div className="ml-auto mb-2">
                                                                                                <a href="#" className="snackbar" data-text="Bookmark clicked" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-bookmark s-24" /></a>
                                                                                                <a href="#" className="snackbar ml-3" data-text="You like this song" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-heart s-24" /></a>
                                                                                                <a href="#" className="snackbar ml-3" data-text="Thanks for sharing" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-share-1 s-24" /></a>
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
                                                                        <ul className="playlist list-group list-group-flush">
                                                                            <li className="list-group-item" >
                                                                                <div className="d-flex align-items-center ">
                                                                                    <div
                                                                                        className="col-8 ">
                                                                                        <h6>Standard</h6>
                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                            MP3
                                                                                        </small>
                                                                                    </div>
                                                                                    <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.basic_price, "basic_price", val, this.props)}>
                                                                                        <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                            <div className="s-16">
                                                                                                {val.basic_price} $
                                                                                            </div>
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
                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                            MP3 + WAV
                                                                                        </small>
                                                                                    </div>
                                                                                    <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.silver_price, "silver_price", val, this.props)}>
                                                                                        <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                            <div className="s-14">
                                                                                                {val.silver_price} $
                                                                                            </div>
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
                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                            MP3 + WAV + STEMS
                                                                                        </small>
                                                                                    </div>
                                                                                    <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.gold_price, "gold_price", val, this.props)}>
                                                                                        <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                                            <div className="s-14">
                                                                                                {val.gold_price} $
                                                                                            </div>
                                                                                            <i className="icon-money"/>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                            {val.platinum_price ?
                                                                                <li className="list-group-item">
                                                                                    <div
                                                                                        className="d-flex align-items-center ">
                                                                                        <div
                                                                                            className="col-8 ">
                                                                                            <h5> Platinum Lease</h5>
                                                                                            <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                Unlimited + Exclusive
                                                                                            </small>
                                                                                        </div>
                                                                                        <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.platinum_price, "platinum_price", val, this.props)}>
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
                                            </div>
                                        ) : <h4 className="text-center">Not Beat similar</h4>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="modal custom show" id={"trackModalSingleBeat"+ this.props.SingleBeat.id} tabIndex="-1" role="dialog"
                         aria-labelledby="trackModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content" style={{height: "100%"}}>

                                <div className="modal-header">
                                    <h3 className="getlaid text-dark" id="trackModalLabel">Add To Cart</h3>
                                    <button id={"closeOne" + this.props.SingleBeat.id} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>

                                <div className="modal-body" style={{overflow:"auto"}}>
                                    <section className="relative" style={{margin:"0 auto"}}>
                                        <div className="has-bottom-gradient">
                                            <div className="row">
                                                <div className="col-md-10 offset-sm-1">
                                                    <div className="row" style={{width:"300px", margin: "0 auto"}}>
                                                        <img src={this.props.SingleBeat.photo} alt="/" style={{width:"300px", margin:"0 auto"}}/>
                                                        <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{this.props.SingleBeat.title}</h1>
                                                        <div className="col-md-9">
                                                            <div className="d-md-flex align-items-center justify-content-between">
                                                                <div className="ml-auto mb-2">
                                                                    <a href="#" className="snackbar" data-text="Bookmark clicked" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-bookmark s-24" /></a>
                                                                    <a href="#" className="snackbar ml-3" data-text="You like this song" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-heart s-24" /></a>
                                                                    <a href="#" className="snackbar ml-3" data-text="Thanks for sharing" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-share-1 s-24" /></a>
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
                                            <ul className="playlist list-group list-group-flush">
                                                <li className="list-group-item" >
                                                    <div className="d-flex align-items-center ">
                                                        <div
                                                            className="col-8 ">
                                                            <h6>Standard</h6>
                                                            <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                MP3
                                                            </small>
                                                        </div>
                                                        <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(this.props.SingleBeat.id, this.props.SingleBeat.basic_price, "basic_price", this.props.SingleBeat, this.props)}>
                                                            <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                <div className="s-16">
                                                                    {this.props.SingleBeat.basic_price} $
                                                                </div>
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
                                                            <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                MP3 + WAV
                                                            </small>
                                                        </div>
                                                        <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(this.props.SingleBeat.id, this.props.SingleBeat.silver_price, "silver_price", this.props.SingleBeat, this.props)}>
                                                            <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                <div className="s-14">
                                                                    {this.props.SingleBeat.silver_price} $
                                                                </div>
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
                                                            <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                MP3 + WAV + STEMS
                                                            </small>
                                                        </div>
                                                        <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(this.props.SingleBeat.id, this.props.SingleBeat.gold_price, "gold_price", this.props.SingleBeat, this.props)}>
                                                            <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                <div className="s-14">
                                                                    {this.props.SingleBeat.gold_price} $
                                                                </div>
                                                                <i className="icon-money"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                {this.props.SingleBeat.platinum_price ?
                                                    <li className="list-group-item">
                                                        <div
                                                            className="d-flex align-items-center ">
                                                            <div
                                                                className="col-8 ">
                                                                <h5> Platinum Lease</h5>
                                                                <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                    Unlimited + Exclusive
                                                                </small>
                                                            </div>
                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(this.props.SingleBeat.id, this.props.SingleBeat.platinum_price, "platinum_price", this.props.SingleBeat, this.props)}>
                                                                <div className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">
                                                                    <div className="s-14">
                                                                        {this.props.SingleBeat.platinum_price} $
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
                </div>
            );
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        }
    };
};

export default connect(null, mapDispatchToProps)(OneBeat);
