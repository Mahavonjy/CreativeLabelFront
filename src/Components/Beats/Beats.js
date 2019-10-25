import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg1 from "../../assets/img/demo/b1.jpg";
import TestImg from "../../assets/img/demo/a2.jpg";
import {ToastContainer, toast} from "react-toastify";
import {connect} from "react-redux";
import logo from "../../images/Logo/ISL_logo.png"
import IslPlayer from '../Players/Players'
import ReactTooltip from 'react-tooltip';
import Modal from "react-awesome-modal";
import {FacebookLogin} from "react-facebook-login-component";
import { FacebookProvider, Feed } from 'react-facebook';

let token = "";
let _this;

class Beats extends Component {
    ToPlay;
    constructor(props) {
        super(props);
        this.state = {
            genre:'', genre_info: [], beats: [], song_id: '', price: 0, licenses_name: '', samples: false,
            placeHolder: "Search", sort_by: ["Latest", "Oldest"], sort_placeHolder: "Sort", sort: '',
            link_beats : [], index: null, tmp: null, isMounted: false, usingAdBlock: false, song_id_shared: null
        };
        _this = this
    }

    changeGenre = (e) => {this.setState({genre: e.target.value}, () => {this.getBeats("genre")})};

    changeSort = (e) => {this.setState({sort: e.target.value}, () => {this.getBeats("sort")})};

    AddForPlay = (index) => {
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        axios.get(Conf.configs.ServerApi + "api/medias/Streaming/" + this.props.beats[index]['id'], {headers:new_headers}).then(response => {
            let temp = {"index": index, "link": response.data};
            this.props.updateBeats(temp);
            this.setState(prevState => ({link_beats: {...prevState.link_beats, [index]: true}}));
        }).catch(error => {
            console.log(error.response);
        })
    };

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "beats");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "beats");
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

    getBeats = (type_) => {
        this.props.resetBeats({"key": true});
        // const publicIp = require('public-ip');
        //
        // (async () => {
        //     console.log(await publicIp.v4());
        //     //=> '46.5.21.123'
        //
        //     console.log(await publicIp.v6());
        //     //=> 'fe80::200:f8ff:fe21:67cf'
        // }) ();
        if (token) {
            let url_ = "";
            let key = "";

            if (type_ === "genre") {
                this.setState({placeHolder: this.state.genre});
                url_ = "api/medias/genre/beats/" + this.state.genre;
                key = "songs"
            }
            if (type_ === "random") {
                url_ = "api/beats/random";
                key = "random"
            }
            if (type_ === "sort" && this.state.sort === "Latest") {
                url_ = "api/beats/increasing";
                key = "increasing"
            }
            if (type_ === "sort" && this.state.sort === "Oldest") {
                url_ = "api/beats/descending";
                key = "descending"
            }

            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };

            this.props.resetBeats();
            axios.get(Conf.configs.ServerApi + url_, {headers: new_headers}).then(resp =>{
                const info = resp.data[key];
                this.props.resetBeats();
                this.setState({genre: "", sort: ""});
                for(let row in info) {info[row]['link'] = ""}
                this.props.addBeats(info, {"key": true});
                for (let row_ in this.props.beats) {this.AddForPlay(row_)}
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    getGenre = () => {
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: new_headers}).then(resp =>{
            const info = resp.data;
            for(let row in info){
                this.setState(prevState => ({genre_info: [...prevState.genre_info, info[row].genre]}))
            }
        }).catch(err => {
            console.log(err.response)
        })
    };

    handleSubmit = (e) => {
        let data = {
            "song_id": this.state.song_id,
            "price": this.state.price,
            "licenses_name": this.state.licenses_name
        };
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        axios.post(Conf.configs.ServerApi + "api/carts/addToCart", data,  {headers: new_headers}).then(resp =>{
            toast.success(resp.data);
        }).catch(err => {
            toast.error(err.response.data);
        })
    };

    componentDidMount() {
        this.setState({ isMounted: true, usingAdBlock: this.fakeAdBanner.offsetHeight === 0 }, () => {
            try {
                if (this.state.usingAdBlock)
                    toast.error("disables your adblocker please");
                let cookies = new Cookies();
                token = cookies.get("Isl_Creative_pass")["Isl_Token"];
                this.getGenre();
                this.getBeats("random");
            } catch (e) {
                this.props.Redirect();
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div>
                <div ref={r => (this.fakeAdBanner = r)}
                     style={{ height: '1px', width: '1px', visiblity: 'none', pointerEvents: 'none' }}
                     className="adBanner"/>
                <ToastContainer/>
                <ReactTooltip/>
                <section>
                    <div className="text-white">
                        <div className="xv-slide" data-bg-possition="top" style={{backgroundImage: 'url('+TestImg1+')'}}>
                            <div className="has-bottom-gradient">
                                <div className="home-menu p-md-5">
                                    <div className="row">
                                        <div className="col-12 col-lg-10 animated">
                                            <div className="xv-slider-content clearfix color-white">
                                                <h1 className="s-64 mt-5 font-weight-lighter">Creative Beats</h1>
                                                <p className="s-24 font-weight-lighter">The exclusive buy & sell plateform for african beats <br /> For music professionals (Artists, Beatmakers, labels...)  </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <div className="Base">
                {/*PlayList & Events*/}
                <section className="section mt-4">
                    <div className="row row-eq-height">
                        <div className="col-lg-8">
                            <div className="card no-b mb-md-3 p-2">
                                <div className="card-header no-bg transparent">
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <div className="d-flex">
                                                <i className="icon-heartbeat s-36 mr-3  mt-2"/>
                                                <div>
                                                    <h4>All Beats</h4>
                                                    <p>Choose your type of beats, listen and buy</p>
                                                    <div className="mt-8 d-flex">
                                                        <div className="dropdown">
                                                            <button className="btn btn-outline-info btn-fab-md pl-md-6 pr-md-6" type="button"
                                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                <i className="icon-hand-peace-o"/>Offers
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton" style={{width: "300px"}}>
                                                                <ReactTooltip className="special-color-dark" id='basic_price' aria-haspopup='true'>
                                                                    <h5 className="text-center text-green"> Basic Lease (MP3) </h5>
                                                                    <small>• Receive untagged MP3 file</small><br/>
                                                                    <small>• Non-profit & promotional use only</small><br/>
                                                                    <small>• Upload to Soundcloud</small><br/>
                                                                    <small>• Use for non-profit Album + Performances</small><br/>
                                                                    <small>• Limited to 10,000 non-profitable streams</small><br/>
                                                                    <small>• Instant delivery</small><br/>
                                                                    <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
                                                                </ReactTooltip>
                                                                <ReactTooltip className="special-color-dark" id='silver_price' aria-haspopup='true'>
                                                                    <h5 className="text-center text-green"> Silver Lease (MP3 + WAVE) </h5>

                                                                    <small>• Receive untagged MP3 + WAV files</small><br/>
                                                                    <small>• Profitable – Sell up to 10,000 unit sales</small><br/>
                                                                    <small>• Upload to Soundcloud, Apple Music, iTunes , Spotify</small><br/>
                                                                    <small>• Use for profit Album + Performances + Music Video</small><br/>
                                                                    <small>• Limited to 100,000 streams</small><br/>
                                                                    <small>• Radio & TV airplays on 3 stations</small><br/>
                                                                    <small>• Instant delivery</small><br/>
                                                                    <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
                                                                </ReactTooltip>
                                                                <ReactTooltip className="special-color-dark" id='gold_price' aria-haspopup='true'>
                                                                    <h5 className="text-center text-green"> Gold Lease (MP3 + WAVE + STEMS) </h5>

                                                                    <small>• Receive untagged MP3 + WAV files+ Tracked-Out files/Stems</small><br/>
                                                                    <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                                                                    <small>• Includes the Silver Lease  features</small><br/>
                                                                    <small>• Limited to 200,000 streams</small><br/>
                                                                    <small>• Unlimited Radio & TV airplays</small><br/>
                                                                    <small>• Instant Delivery</small><br/>
                                                                    <small>• Must credits : Prod.by [Name of Producer] / ISL Creative</small>
                                                                </ReactTooltip>
                                                                <ReactTooltip className="special-color-dark" id='platinum_price' aria-haspopup='true'>
                                                                    <h5 className="text-center text-green"> Platinum Lease (Unlimited + Exclusive) </h5>

                                                                    <small>• Receive untagged MP3 + WAV files + Tracked-Out files/Stems</small><br/>
                                                                    <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                                                                    <small>• Unlimited profitable sales + streams (iTunes, Spotify  etc.)</small><br/>
                                                                    <small>• Use for unlimited profit Album + Performances + Music Video</small><br/>
                                                                    <small>• Unlimited TV broadcast + Radio airplay</small><br/>
                                                                    <small>• Credits : Prod. by [Name of Producer] / Beats Avenue</small>
                                                                </ReactTooltip>
                                                                <div className="card">
                                                                    <div className="card-header text-center text-green b-b">
                                                                        <strong>Price by beatmaker</strong>
                                                                    </div>
                                                                    <ul className="playlist list-group list-group-flush ">
                                                                        <li className="list-group-item" data-tip data-for='basic_price'>
                                                                            <div className="align-items-center text-center text-blue">
                                                                                <div className="col">
                                                                                    <h6>Basic Lease</h6>
                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                    Mp3 Only
                                                                                    </small>
                                                                                </div>
                                                                                {/*<div className="ml-auto">*/}
                                                                                {/*    <div*/}
                                                                                {/*        className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">*/}
                                                                                {/*        <div className="s-12">14.99 $</div>*/}
                                                                                {/*        <small>24.99 $</small>*/}
                                                                                {/*    </div>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                        </li>
                                                                        <li className="list-group-item" data-tip data-for='silver_price'>
                                                                            <div className="d-flex align-items-center text-blue ">
                                                                                <div className="col">
                                                                                    <h6>Silver Lease</h6>
                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                        Mp3 + Wave
                                                                                    </small>
                                                                                </div>
                                                                                {/*<div className="ml-auto">*/}
                                                                                {/*    <div*/}
                                                                                {/*        className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">*/}
                                                                                {/*        <div className="s-12">34.99 $</div>*/}
                                                                                {/*        <small>49.99 $</small>*/}
                                                                                {/*    </div>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                        </li>
                                                                        <li className="list-group-item" data-tip data-for='gold_price'>
                                                                            <div className="d-flex align-items-center text-blue ">
                                                                                <div className="col">
                                                                                    <h6>Gold Lease</h6>
                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                        Mp3 + Wave + Stems
                                                                                    </small>
                                                                                </div>
                                                                                {/*<div className="ml-auto">*/}
                                                                                {/*    <div*/}
                                                                                {/*        className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">*/}
                                                                                {/*        <div className="s-12">74.99 $</div>*/}
                                                                                {/*        <small>99.99 $</small>*/}
                                                                                {/*    </div>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                        </li>
                                                                        <li className="list-group-item" data-tip data-for='platinum_price'>
                                                                            <div className="d-flex align-items-center text-blue ">
                                                                                <div className="col">
                                                                                    <h6>Platinum Lease</h6>
                                                                                    <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                        Unlimited+ Exclusive
                                                                                    </small>
                                                                                </div>
                                                                                {/*<div className="ml-auto">*/}
                                                                                {/*    <div*/}
                                                                                {/*        className="text-lg-center  bg-primary r-10 p-2 text-white primary-bg">*/}
                                                                                {/*        <div className="s-12">74.99 $</div>*/}
                                                                                {/*        <small>99.99 $</small>*/}
                                                                                {/*    </div>*/}
                                                                                {/*</div>*/}
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button className="btn btn-outline-secondary btn-fab-md pl-md-4 pr-md-4" type="button"
                                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                <i className="icon-filter"/>Filters
                                                            </button>
                                                            <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                                                <button className="btn btn-outline-warning btn-fab-md" onClick={() => this.getBeats("random")}>
                                                                    <i className="icon-warning mr-2"/>Reset
                                                                </button>
                                                                <div className="md-form my-0">
                                                                    <div className="input-group-text bg-mdb-color">Genre&nbsp;
                                                                    <input className="form-control" type="text"
                                                                           placeholder={this.state.placeHolder}
                                                                           value={this.state.genre} onChange={this.changeGenre}
                                                                           list="music-genre"
                                                                    /></div>
                                                                    <datalist id="music-genre">{this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                                </div>
                                                                <div className="md-form my-0">
                                                                    <div className="input-group-text bg-mdb-color">Sort by&nbsp;
                                                                        <input className="form-control" type="text"
                                                                               placeholder={this.state.sort_placeHolder}
                                                                               value={this.state.sort} onChange={this.changeSort}
                                                                               list="music-sort"
                                                                        /></div>
                                                                    <datalist id="music-sort">{this.state.sort_by.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body no-p">
                                    <div className="tab-content" id="v-pills-tabContent1">
                                        <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">
                                            {this.props.beats ?
                                                <div className="playlist pl-lg-3 pr-lg-3">
                                                    {this.props.beats.map((val, index) =>
                                                        <div className="m-1 my-4" key={index}>
                                                            <div className="d-flex align-items-center">
                                                                <div className="col-1">
                                                                    {this.state.link_beats[index] ?
                                                                        <div>
                                                                            {this.state.index === index ?
                                                                                <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                                                <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "beats")}}/>}
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
                                                                    <h6>{val.title}</h6><small>{val.artist}</small>
                                                                </div>
                                                                <ReactTooltip/>
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
                                                                        <i className="icon-heart-1 ml-auto text-red" data-tip="Like me"/>
                                                                    </div>
                                                                </div>
                                                                <div className="col-sm-2 d-none d-sm-block">
                                                                    <div className="d-flex">
                                                                        <div className="ml-auto">
                                                                            <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                                                    data-target={"#trackModal" + val.id}><i className="icon-opencart"/>
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
                                                                <div className="modal custom show" id={"trackModal"+val.id} tabIndex="-1" role="dialog"
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
                                                                                            <strong>Beats Price</strong>
                                                                                        </div>
                                                                                        <ul className="playlist list-group list-group-flush">
                                                                                            <li className="list-group-item" >
                                                                                                <div className="d-flex align-items-center ">
                                                                                                    <div
                                                                                                        className="col-8 ">
                                                                                                        <h6>Basic Lease</h6>
                                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                            MP3 Only
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <div className="ml-auto" onClick={(e) => {this.setState({price: val.basic_price, licenses_name: "basic_price", song_id: val.id}
                                                                                                    , () => {this.handleSubmit(e)})}}>
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
                                                                                                        <h6>Silver Lease</h6>
                                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                            MP3 + WAVE
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <div className="ml-auto" onClick={(e) => {this.setState({price: val.silver_price, licenses_name: "silver_price", song_id: val.id}
                                                                                                        , () => {this.handleSubmit(e)})}}>
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
                                                                                                        <h6>Gold Lease</h6>
                                                                                                        <small className="mt-1"><i className="icon-placeholder-3 mr-1 "/>
                                                                                                            MP3 + WAVE + STEMS
                                                                                                        </small>
                                                                                                    </div>
                                                                                                    <div className="ml-auto" onClick={(e) => {this.setState({price: val.gold_price, licenses_name: "gold_price", song_id: val.id}
                                                                                                        , () => {this.handleSubmit(e)})}}>
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
                                                                                                    <div className="ml-auto" onClick={(e) => {this.setState({price: val.platinum_price, licenses_name: "platinum_price", song_id: val.id}
                                                                                                        , () => {this.handleSubmit(e)})}}>
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
                                                        </div>)}

                                                </div>
                                                :null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                                <div className="mb-3 card p-3">
                                    <div>
                                        <div className="mr-3 float-left text-center">
                                            <div className="s-36"><i className="icon-music-player-3"/></div>
                                        </div>
                                        <div>
                                            <div>
                                                <h4 className="text-primary">Top BeatMaker</h4>
                                            </div>
                                            <small> Best beatmaker on the ISL platform </small>
                                        </div>
                                    </div>
                                    <ul className="playlist list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="d-flex align-items-center">
                                                <div className="col-10">
                                                    <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                        <img src={TestImg} alt="" />
                                                    </figure>
                                                    <h6>Zoe Foe</h6>
                                                    <small>5 Beats</small>
                                                </div>
                                                <a href="#" className="ml-auto"><i className="icon-user-plus" /></a>
                                                <a href="#" className="ml-auto"><i className="icon-user-circle" /></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </section>
                <div>
                </div>
            </div>
            </div>
        );
    }

    static pausePlayer() {
        _this.pausePlayer(false);
    }

    static playPlayer(index, type_) {
        _this.Play(index, type_);
    }

    static changeIndex(index) {
        _this.setState({index: index});
    }
}

const mapStateToProps = state => {
    return {
        beats: state.beats.beats,
        pricing: state.profile.pricing
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBeats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        updateBeats: (data) => {
            dispatch({type: "UPDATE_BEATS_LIST", data: data})
        },
        resetBeats: (data) => {
            dispatch({type: "RESET_BEATS", data: data})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Beats);
