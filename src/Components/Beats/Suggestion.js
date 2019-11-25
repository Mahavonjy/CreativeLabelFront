import React, { Component } from "react";
import {connect} from "react-redux";
import TestImg from "../../assets/img/demo/a2.jpg";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import IslPlayer from "../Players/Players";
import {Link} from 'react-router-dom';
import ReactTooltip from "react-tooltip";
import {FacebookProvider, Feed} from "react-facebook";

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
                                                <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => this.LikeOrFollow("like", val.id)}/>
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
                            <ul className="playlist list-group bg-dark list-group-flush" style={{height: 250}}>
                                {this.props.discovery_beats ? this.props.discovery_beats.map((val, index) =>
                                    <li className="list-group-item" key={index}>
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
                                            <small className="ml-auto"><i
                                                className="icon-opencart text-red"/></small>
                                        </div>
                                    </li>
                                ) : null}
                            </ul>
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
                                                    <i className="icon-heart-1 ml-auto text-red" data-tip="Like me" onClick={() => this.LikeOrFollow("like", val.id)}/>
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
                                            <div className="ml-auto">
                                                <Link to={"isl_artist_profile/" + val.id}><i
                                                    className="icon-user-circle text-blue"/>
                                                </Link>
                                            </div>
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
