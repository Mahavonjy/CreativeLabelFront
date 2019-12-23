import React, { Component } from "react";
import {connect} from "react-redux";
import FunctionTools from "../../../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import * as PopupFields from "../../../FunctionTools/PopupFields";

let _this;

class Suggestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            link_latest_beats: [], link_discovery_beats: [], tmp: null,
            link_top_beats: [], link_isl_playlist: [], index: null, isMounted: false,
        };
         _this = this
    }

    componentDidMount() {
        this.setState({isMounted: true }, () => {
            if (!this.props.ready_latest_beats) {
                for (let row_ in this.props.latest_beats) {
                    FunctionTools.AddForPlay(row_, "link_latest_beats", this, this.props.latest_beats[row_]['id']);
                    if (parseInt(row_) === this.props.latest_beats.length - 1) this.props.readyLatestBeats()
                }
            } else {
                for (let row_ in this.props.latest_beats) {
                    this.setState(prevState => ({link_latest_beats: {...prevState.link_latest_beats, [row_]: true}}))
                }
            }

            if (!this.props.ready_discovery_beats) {
                for (let row_ in this.props.discovery_beats) {
                    FunctionTools.AddForPlay(row_, "link_discovery_beats", this, this.props.discovery_beats[row_]['id']);
                    if (parseInt(row_) === this.props.discovery_beats.length - 1) this.props.readyDiscoveryBeats()
                }
            } else {
                for (let row_ in this.props.discovery_beats) {
                    this.setState(prevState => ({link_discovery_beats: {...prevState.link_discovery_beats, [row_]: true}}))
                }
            }

            if (!this.props.ready_top_beats) {
                for (let row_ in this.props.top_beats) {
                    FunctionTools.AddForPlay(row_, "link_top_beats", this, this.props.top_beats[row_]['id']);
                    if (parseInt(row_) === this.props.top_beats.length - 1) this.props.readyTopBeats()
                }
            } else {
                for (let row_ in this.props.top_beats) {
                    this.setState(prevState => ({link_top_beats: {...prevState.link_top_beats, [row_]: true}}))
                }
            }

            if (!this.props.ready_isl_playlist) {
                for (let row_ in this.props.isl_playlist) {
                    FunctionTools.AddForPlay(row_, "link_isl_playlist", this, this.props.isl_playlist[row_]['id']);
                    if (parseInt(row_) === this.props.isl_playlist.length - 1) this.props.readyIslBeats()
                }
            } else {
                for (let row_ in this.props.isl_playlist) {
                    this.setState(prevState => ({link_isl_playlist: {...prevState.link_isl_playlist, [row_]: true}}))
                }
            }
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
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
                            {this.props.isl_playlist ?
                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                    {this.props.CreateBeatsPlaylist(this, "link_isl_playlist", this.props.isl_playlist, this.state.link_isl_playlist, "long_beats")}
                                </div>
                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                    <p className="text-center">Vide</p>
                                </div>}
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3 card no-b p-3">
                            <div>
                                <div className="mr-3 float-left text-center">
                                    <div className="s-36"><i className="icon-eye s-36"/></div>
                                </div>
                                <div>
                                    <div>
                                        <h4 className="text-primary">Les découvertes</h4>
                                    </div>
                                    <small> Des instrus uniques pour donner de la singularité à vos projets</small>
                                    <div className="mt-2">
                                        <i className="icon-clock-o mr-1"/>
                                        Beats Performing
                                    </div>
                                </div>
                            </div>
                            {this.props.discovery_beats ?
                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 328}}>
                                    {this.props.CreateBeatsPlaylist(this, "link_discovery_beats", this.props.discovery_beats, this.state.link_discovery_beats, "short_beats")}
                                </div>
                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 328}}>
                                    <p className="text-center">Vide</p>
                                </div>}
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
                            {this.props.latest_beats ?
                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 434}}>
                                    {this.props.CreateBeatsPlaylist(this, "latest_beats", this.props.latest_beats, this.state.link_latest_beats, "long_beats")}
                                </div>
                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 434}}>
                                    <p className="text-center">Vide</p>
                                </div>}
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
                                        <h4 className="text-primary">Nouveaux Beatmakers</h4>
                                    </div>
                                    <small> Les beatmakers qui rejoignent ISL Creative </small>
                                </div>
                            </div>
                            {/* Here is top beatmakers */}
                            {this.props.DisplayArtist(this.props.new_beatMaker)}
                            {/* end of top beatmakers */}
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
        addNewPlayerList: (data) => {
            dispatch({type: "ADD_NEW_PLAYER_PLAYLIST", data: data})
        },
        readyDiscoveryBeats: () => {
            dispatch({type: "DISCOVERY_BEATS_READY"})
        },
        readyIslBeats: () => {
            dispatch({type: "ISL_BEATS_READY"})
        },
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        },
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
        DisplayArtist: bindActionCreators(CreateFields.DisplayArtist, dispatch),
        ForAddToCard: bindActionCreators(PopupFields.ForAddToCard, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
