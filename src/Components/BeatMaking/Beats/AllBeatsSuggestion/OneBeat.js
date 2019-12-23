import React, { Component } from "react";
import NotFound from "../../../StatusPage/NotFound/NotFound";
import {ToastContainer} from "react-toastify";
import TestImg from "../../../../assets/img/demo/a2.jpg";
import IslPlayer from "../../../Players/Players";
import FunctionTools from "../../../FunctionTools/FunctionTools";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import * as PopupFields from "../../../FunctionTools/PopupFields";

let _that;
class OneBeat extends Component {
    SingleBeat;
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false, NotFound: false, playing: false,
            single_beat: '', index: null, tmp: null, song_id_shared: null,
            songId: null, link_all_artist_beats: []
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

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            this.props.addBeatMakerBeats(this.props.ArtistBeats);
            for (let row_ in this.props.ArtistBeats) {
                FunctionTools.AddForPlay(row_, "link_all_artist_beats", this, this.props.ArtistBeats[row_]['id'])
            }
        });
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
                                                    <a href="/#" className="snackbar" data-text="Bookmark clicked"
                                                       data-pos="top-right" data-showaction="true" data-actiontext="ok"
                                                       data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                        className="icon-bookmark s-24"/></a>
                                                    <a href="/#" className="snackbar ml-3" data-text="You like this song"
                                                       data-pos="top-right" data-showaction="true" data-actiontext="ok"
                                                       data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i
                                                        className="icon-heart s-24"/></a>
                                                    <a href="/#" className="snackbar ml-3" data-text="Thanks for sharing"
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
                                                        data-target={"#SingleBeats" + this.props.SingleBeat.id}>Buy Now
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
                                                        <h4 className="text-red">All beats of this beatmaker</h4>
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

                                                {this.props.beat_maker_beats.length !== 0 ?
                                                    <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                        {this.props.CreateBeatsPlaylist(this, "ArtistBeats", this.props.beat_maker_beats, this.state.link_all_artist_beats, "long_beats")}
                                                    </div>
                                                    : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                        <p className="text-center">L'artiste n'a pas d'autres instrumental</p>
                                                    </div>}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card mb-3">
                                    <div className="card-header transparent b-b">
                                        <strong className="text-red">Similar Beats</strong>
                                    </div>
                                    {this.props.SimilarBeats.length !== 0 ?
                                        <div className="playlist pl-lg-3 pr-lg-3" style={{height: 400}}>
                                            {this.props.CreateBeatsPlaylist(this, "SimilarBeats", this.props.SimilarBeats, "oneBeats", "long_beats")}
                                        </div>
                                        : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 400}}>
                                            <p className="text-center">Pas d'instrumental similaire</p>
                                        </div>}
                                </div>
                            </div>
                        </div>
                    </section>
                    {this.props.ForAddToCard(this, this.props.SingleBeat, "SingleBeats")}
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        beat_maker_beats: state.beats.beat_maker_beats,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        },
        addBeatMakerBeats: (data) => {
            dispatch({type: "ADD_BEAT_MAKER_BEATS", data: data})
        },
        updateBeatMakerBeats: (data) => {
            dispatch({type: "UPDATE_BEAT_MAKER_BEATS", data: data})
        },
        addNewPlayerList: (data) => {
            dispatch({type: "ADD_NEW_PLAYER_PLAYLIST", data: data})
        },
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
        DisplayArtist: bindActionCreators(CreateFields.DisplayArtist, dispatch),
        ForAddToCard: bindActionCreators(PopupFields.ForAddToCard, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneBeat);
