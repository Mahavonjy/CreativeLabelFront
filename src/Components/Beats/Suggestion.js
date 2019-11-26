import React, { Component } from "react";
import {connect} from "react-redux";
import TestImg from "../../assets/img/demo/a2.jpg";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import IslPlayer from "../Players/Players";
import FunctionTools from "../FunctionTools/FunctionTools";
import {Link} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import {FacebookProvider, Feed} from "react-facebook";
import Beats from "./Beats";

let _this;

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link_latest_beats: [], link_discovery_beats: [], tmp: null,
            link_top_beats: [], link_isl_playlist: [], index: null
        };
         _this = this
    }

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "suggestion");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "suggestion");
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

    static pausePlayer() {
        _this.pausePlayer(false);
    }

    static playPlayer(index, type_) {
        _this.Play(index, type_);
    }

    static changeIndex(index) {
        _this.setState({index: index});
    }

    AddForPlay = (index, _state) => {
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        };
        let url = "";
        if (_state === "link_latest_beats")
            url = "api/medias/Streaming/" + this.props.latest_beats[index]['id'];
        if (_state === "link_discovery_beats")
            url = "api/medias/Streaming/" + this.props.discovery_beats[index]['id'];
        if (_state === "link_isl_playlist")
            url = "api/medias/Streaming/" + this.props.isl_playlist[index]['id'];
        axios.get(Conf.configs.ServerApi + url, {headers: new_headers}).then(response => {
            let temp = {"index": index, "link": response.data};
            if (_state === "link_latest_beats") {
                this.props.updateLatestBeats(temp);
                this.setState(prevState => ({link_latest_beats: {...prevState.link_latest_beats, [index]: true}}))
            } else if (_state === "link_discovery_beats") {
                this.props.updateDiscoveryBeats(temp);
                this.setState(prevState => ({link_discovery_beats: {...prevState.link_discovery_beats, [index]: true}}))
            } else if (_state === "link_isl_playlist") {
                this.props.updateIslBeats(temp);
                this.setState(prevState => ({link_isl_playlist: {...prevState.link_isl_playlist, [index]: true}}))
            }

        }).catch(error => {
            console.log(error);
        })
    };

    componentDidMount() {
        if (!this.props.ready_latest_beats) {
            for (let row_ in this.props.latest_beats) {
                this.AddForPlay(row_, "link_latest_beats");
                if (parseInt(row_) === parseInt(this.props.latest_beats.length) -1)
                    this.props.readyLatestBeats()
            }
        } else {
            for (let row_ in this.props.latest_beats) {
                this.setState(prevState => ({link_latest_beats: {...prevState.link_latest_beats, [row_]: true}}))
            }
        }

        if (!this.props.ready_discovery_beats) {
            for (let row_ in this.props.discovery_beats) {
                this.AddForPlay(row_, "link_discovery_beats");
                if (parseInt(row_) === parseInt(this.props.discovery_beats.length) -1)
                    this.props.readyDiscoveryBeats()
            }
        } else {
            for (let row_ in this.props.discovery_beats) {
                this.setState(prevState => ({link_discovery_beats: {...prevState.link_discovery_beats, [row_]: true}}))
            }
        }

        if (!this.props.ready_top_beats) {
            for (let row_ in this.props.top_beats) {
                this.AddForPlay(row_, "link_top_beats")
                if (parseInt(row_) === parseInt(this.props.top_beats.length) -1)
                    this.props.readyTopBeats()
            }
        } else {
            for (let row_ in this.props.top_beats) {
                this.setState(prevState => ({link_top_beats: {...prevState.link_top_beats, [row_]: true}}))
            }
        }

        if (!this.props.ready_isl_playlist) {
            for (let row_ in this.props.isl_playlist) {
                this.AddForPlay(row_, "link_isl_playlist");
                if (parseInt(row_) === parseInt(this.props.isl_playlist.length) -1)
                    this.props.readyIslBeats()
            }
        } else {
            for (let row_ in this.props.isl_playlist) {
                this.setState(prevState => ({link_isl_playlist: {...prevState.link_isl_playlist, [row_]: true}}))
            }
        }
    }

    render() {
        return (
            <div>
                <FunctionTools/>
                <div className="row row-eq-height pb-xl-1">
                    <div className="col-lg-8">
                        <div className="card no-b mb-md-3 p-2">
                            <div className="card-header no-bg transparent">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <div className="d-flex">
                                            <i className="icon-list-1 s-36 mr-3  mt-2"/>
                                            <div>
                                                <div>
                                                    <h4 className="text-primary">Playlist ISL</h4>
                                                </div>
                                                <small> La playlist pour vous </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="playlist list-group bg-dark list-group-flush" style={{height: 315}}>
                                {this.props.isl_playlist ? this.props.isl_playlist.map((val, index) =>
                                    <div className="d-flex list-group-item  align-items-center" key={index}>
                                        <div className="col-1">
                                            {this.state.link_isl_playlist[index] ?
                                                <a className="text-red">
                                                    {this.state.index === index ?
                                                        <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                        <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "isl_playlist")}}/>}
                                                </a> :
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
                                            <figure className="avatar-md float-left  mr-3 mt-1">
                                                <img className="r-3" src={val.photo || TestImg} alt=""/>
                                            </figure>
                                            <Link to={'CheckThisBeat/' + val.id}>
                                                <h6>{val.title}</h6>
                                                <small>{val.artist}</small>
                                            </Link>
                                        </div>
                                        <div className="col-md-5 d-none d-sm-block">
                                            <div className="d-flex">
                                                <small className="ml-auto">{val.silver_price}$</small>
                                                <small className="ml-auto">{val.bpm}/bpm</small>
                                                <FacebookProvider appId="423325871770542">
                                                    <Feed link="https://www.tests.com/">
                                                        {({ handleClick }) => (
                                                            <div className="ml-auto transparent border-0">
                                                                <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                            </div>
                                                        )}
                                                    </Feed>
                                                </FacebookProvider>
                                                <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => FunctionTools.LikeOrFollow("like", val.id)}/>
                                            </div>
                                        </div>
                                        <div className="col-sm-2 d-none d-sm-block">
                                            <div className="d-flex">
                                                <div className="ml-auto">
                                                    <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                            data-target={"#trackModalSuggestionIslPlaylist" + val.id}><i className="icon-opencart"/>
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
                                                        data-target={"#trackModalSuggestionIslPlaylist" + val.id}><i
                                                    className="icon-shopping-bag mr-3"/>Add To Cart
                                                </button>
                                                <small className="dropdown-item"><i className="icon-money mr-3"/>{val.silver_price}$</small>
                                            </div>
                                        </div>
                                        <div className="modal custom show" id={"trackModalSuggestionIslPlaylist" + val.id} tabIndex="-1" role="dialog"
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.basic_price, "basic_price", val)}>
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.silver_price, "silver_price", val)}>
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.gold_price, "gold_price", val)}>
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
                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.platinum_price, "platinum_price", val)}>
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
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3 card no-b p-3">
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36"><i className="icon-eye s-36"/></div>
                                    <span>see me</span>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-primary">Les découvertes</h4>
                                    </div>
                                    <small> Des instrus uniques pour donner de la singularité à vos projets</small>
                                    <div className="mt-2">
                                        <i className="icon-clock-o mr-1"/>
                                        I'ts time for all Africa
                                    </div>
                                </div>
                            </div>
                            <small className="my-3">Beats Performing</small>
                            <div className="playlist list-group bg-dark list-group-flush" style={{height: 250}}>
                                {this.props.discovery_beats ? this.props.discovery_beats.map((val, index) =>
                                    <div>
                                    <div className="list-group-item" key={index}>
                                        <div className="d-flex align-items-center">
                                            <div>
                                                {this.state.link_discovery_beats[index] ?
                                                    <div className="text-red">
                                                        {this.state.index === index ?
                                                            <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                            <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "discovery_beats")}}/>}
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
                                            <div className="col-10">
                                                <Link to={'CheckThisBeat/' + val.id}>
                                                    <small>{val.title}</small>
                                                </Link>
                                            </div>
                                            <button className="dropdown-item"
                                                    type="button" data-toggle="modal"
                                                    data-target={"#trackModalDiscovery" + val.id}>
                                                <small className="ml-auto"><i
                                                    className="icon-opencart text-red"/>
                                                </small>
                                            </button>
                                        </div>
                                    </div>
                                        <div className="modal custom show" id={"trackModalDiscovery"+ val.id} tabIndex="-1" role="dialog"
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.basic_price, "basic_price", val)}>
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.silver_price, "silver_price", val)}>
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
                                                                            <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.gold_price, "gold_price", val)}>
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
                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.platinum_price, "platinum_price", val)}>
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
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row row-eq-height pb-xl-5">
                    <div className="col-lg-8">
                        <div className="card no-b mb-md-3 p-2">
                            <div className="card-header no-bg transparent">
                                <div className="d-flex justify-content-between">
                                    <div className="align-self-center">
                                        <div className="d-flex">
                                            <i className="icon-list-1 s-36 mr-3  mt-2"/>
                                            <div>
                                                <div>
                                                    <h4 className="text-primary">Les dernières créations</h4>
                                                </div>
                                                <small> Ecouter les instrus afro tropicales sorties récemment </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="playlist list-group bg-dark list-group-flush" style={{height: 335}}>
                                {this.props.latest_beats ? this.props.latest_beats.map((val, index) =>
                                    <li className="list-group-item" key={index}>
                                        <div className="d-flex align-items-center">
                                            <div className="col-1">
                                                {this.state.link_latest_beats[index] ?
                                                    <div className="text-red">
                                                        {this.state.index === index ?
                                                            <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                            <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "latest_beats")}}/>}
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
                                                    </div>}
                                            </div>
                                            <div className="col-md-3">
                                                <figure className="avatar-md float-left  mr-3 mt-1">
                                                    <img className="r-3" src={val.photo || TestImg} alt=""/>
                                                </figure>
                                                <Link to={'CheckThisBeat/' + val.id}>
                                                    <h6>{val.title}</h6>
                                                    <small>{val.artist}</small>
                                                </Link>
                                            </div>
                                            <div className="col-md-5 d-none d-sm-block">
                                                <div className="d-flex">
                                                    <small className="ml-auto">{val.silver_price}$</small>
                                                    <small className="ml-auto">{val.bpm}/bpm</small>
                                                    <FacebookProvider appId="423325871770542">
                                                        <Feed link="https://www.tests.com/">
                                                            {({ handleClick }) => (
                                                                <div className="ml-auto transparent border-0">
                                                                    <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                                </div>
                                                            )}
                                                        </Feed>
                                                    </FacebookProvider>
                                                    <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => FunctionTools.LikeOrFollow("like", val.id)}/>
                                                </div>
                                            </div>
                                            <div className="col-sm-2 d-none d-sm-block">
                                                <div className="d-flex">
                                                    <div className="ml-auto">
                                                        <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                                data-target={"#trackModalLatest" + val.id}><i className="icon-opencart"/>
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
                                            <div className="modal custom show" id={"trackModalLatest"+ val.id} tabIndex="-1" role="dialog"
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
                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.basic_price, "basic_price", val)}>
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
                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.silver_price, "silver_price", val)}>
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
                                                                                <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.gold_price, "gold_price", val)}>
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
                                                                                    <div className="ml-auto" onClick={(e) => FunctionTools.AddToCart(val.id, val.platinum_price, "platinum_price", val)}>
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
                                    </li>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-header transparent b-b">
                                <strong>Nouveaux Beatmakers</strong>
                                <br/> Les beatmakers qui rejoignent ISL Creative
                            </div>
                            <ul className="playlist list-group bg-dark list-group-flush" style={{height: 350}}>
                                {this.props.new_beatMaker ? this.props.new_beatMaker.map((val, index) =>
                                    <li className="list-group-item" key={index}>
                                        <div className="d-flex align-items-center">
                                            <div className="col-10">
                                                <Link to={"isl_artist_profile/" + val.id}>
                                                    <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                        <img src={val.photo || TestImg} alt=""/>
                                                    </figure>
                                                    <h6>{val.name}</h6>
                                                    <small>5 Albums - 50 Songs</small>
                                                </Link>
                                            </div>
                                            <i className="icon-user-plus ml-auto" onClick={() => FunctionTools.LikeOrFollow("follow", val.id)}/>
                                            <Link to={"isl_artist_profile/" + val.id} className="ml-auto">
                                                <i className="icon-user-circle"/>
                                            </Link>
                                        </div>
                                    </li>
                                ) : null}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        top_beats: state.beats.top_beats,
        latest_beats: state.beats.latest_beats,
        discovery_beats: state.beats.discovery_beats,
        new_beatMaker: state.beats.new_beatMaker,
        isl_playlist: state.beats.isl_playlist,
        ready_top_beats: state.beats.ready_top_beats,
        ready_latest_beats: state.beats.ready_latest_beats,
        ready_discovery_beats: state.beats.ready_discovery_beats,
        ready_isl_playlist: state.beats.ready_isl_playlist,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateLatestBeats: (data) => {
            dispatch({type: "UPDATE_LATEST_BEATS_LIST", data: data})
        },
        updateDiscoveryBeats: (data) => {
            dispatch({type: "UPDATE_DISCOVERY_BEATS_LIST", data: data})
        },
        updateIslBeats: (data) => {
            dispatch({type: "UPDATE_ISL_PLAYLIST_LIST", data: data})
        },
        readyTopBeats: () => {
            dispatch({type: "TOP_BEATS_READY"})
        },
        readyLatestBeats: () => {
            dispatch({type: "LATEST_BEATS_READY"})
        },
        readyDiscoveryBeats: () => {
            dispatch({type: "DISCOVERY_BEATS_READY"})
        },
        readyIslBeats: () => {
            dispatch({type: "ISL_BEATS_READY"})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
