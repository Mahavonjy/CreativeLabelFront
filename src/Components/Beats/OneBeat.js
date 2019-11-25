import React, { Component } from "react";
import NotFound from "../NotFound/NotFound";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import Cookies from "universal-cookie/cjs";
import {toast, ToastContainer} from "react-toastify";
import TestImg from "../../assets/img/demo/a2.jpg";

let PhotoD =" https://zupimages.net/up/19/18/3ltf.png";
class OneBeat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false, NotFound: false,
            single_beat: '', all_artist_beats: ''
        };
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
                                            <i className="icon-play-button-1 s-36 text-red ml-3 mr-4"/>
                                            <button className="btn btn-primary btn-lg">Buy Now</button>
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
                                                    <i class="icon-music s-36 mr-3  mt-2"></i>
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
                                                                <i className="icon-play s-28 text-red"/>
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
                                                                    <div className="ml-auto">
                                                                        <a href="#"
                                                                           className="btn btn-outline-primary btn-sm">Buy Me</a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-1 ml-auto d-lg-none">
                                                                <a href="#" data-toggle="dropdown" aria-haspopup="true"
                                                                   aria-expanded="false">
                                                                    <i className="icon-more-1"/></a>
                                                                <div className="dropdown-menu dropdown-menu-right">
                                                                    <a className="dropdown-item" href="#"><i
                                                                        className="icon-share-1 mr-3"/> Share</a>
                                                                    <a className="dropdown-item" href="#"><i
                                                                        className="icon-shopping-bag mr-3"/>Buy Me</a>
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
                                    <ul className="playlist list-group bg-dark list-group-flush" style={{height: 383}}>
                                        {this.props.SimilarBeats.length > 0 ? this.props.SimilarBeats.map((val, index) =>
                                            <li className="list-group-item" key={index}>
                                                <div className="d-flex align-items-center">
                                                    <div>
                                                        <div className="text-red">
                                                            {/*<i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>*/}
                                                            {/*<i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "latest_beats")}}/>*/}
                                                            <i className="icon-play s-28 text-danger"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-10 text-center">
                                                        <figure className="avatar-md float-left  mr-3 mt-1">
                                                            <img className="r-3" src={val.photo || PhotoD} alt=""/>
                                                        </figure>
                                                        <h6>{val.title}</h6>
                                                        <small>{val.artist}</small>
                                                    </div>
                                                    <div className="ml-auto text-red">
                                                        <i className="icon-opencart"/>
                                                    </div>
                                                </div>
                                            </li>
                                        ) : <h4 className="text-center">Not Beat similar</h4>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            );
        }
    }
}

export default OneBeat;
