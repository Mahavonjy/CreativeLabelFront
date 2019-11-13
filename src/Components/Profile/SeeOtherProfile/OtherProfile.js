import React, { Component } from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';
import Conf from "../../../Config/tsconfig";
import PhotoD from '../../../images/socials/profile.png';
import { ToastContainer, toast } from 'react-toastify';
import IslPlayer from "../../Players/Players";
import {FacebookProvider, Feed} from "react-facebook";

const cookies = new Cookies();
let _this;
let token;

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false, NotFound: false,
            index: null, tmp: null, followed: 0
        };
        _this = this;
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

    componentDidMount() {
        this.setState({ isMounted: true });
        try {
            let cookies = new Cookies();
            token = cookies.get("Isl_Creative_pass")["Isl_Token"];
        } catch (e) {
            token = Conf.configs.TokenVisitor;
        }
    }

    componentWillUnmount() {this.setState({ isMounted: false });}

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

    LikeOrFollow = (LikeOrFollow, arg) => {
        if (token === Conf.configs.TokenVisitor) {
            document.getElementById("LoginRequire").click();
        } else if (LikeOrFollow === "like") {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            axios.post(Conf.configs.ServerApi + "api/medias/admire/" + arg, {},{headers: new_headers}).then(resp =>{
                toast.success("liked")
            }).catch(err => {
                toast.warn("already liked")
            });
        } else if (LikeOrFollow === "follow") {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };
            axios.post(Conf.configs.ServerApi + "api/admiration/admire_user/" + arg, {},{headers: new_headers}).then(resp => {
                this.setState({followed: 1});
                toast.success("followed")
            }).catch(err => {
                toast.warn("already followed")
            });
        }
    };

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "profile");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "profile");
                })
            } else {
                this.setState({tmp: null}, () => {
                    IslPlayer.pauseOrPlayPlayer();
                })
            }
        }
    };

    render() {
        return (
            <div className="Base">
                <ToastContainer/>
                <button type="button" id="LoginRequire" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" hidden={true}/>
                <div aria-disabled={"false"} className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">You are not logged</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">x</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Already have an account? Login or SignUp
                            </div>
                            <div className="modal-footer">
                                <a href="/login"><button type="button" className="btn btn-secondary"> Login </button></a>
                                <a href="/register"><button type="button" className="btn btn-success"> Register </button></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                    <div className="card no-b shadow no-r">
                        <div className="row no-gutters">
                            <div className="col-md-4 b-r">
                                <div className="text-center p-5 mt-2">
                                    <figure className="avatar avatar-xl">
                                        <img
                                            src={this.props.ProfileChecked.photo || PhotoD}
                                            alt="profile"/>
                                    </figure>
                                    <div>
                                        <h4 className="p-t-10">{this.props.ProfileChecked.name || "Name"}</h4>
                                        <button className="btn btn-outline-primary btn-sm  mt-3 pl-4 pr-4"
                                        onClick={() => this.LikeOrFollow("follow", )}>
                                            Follow {this.props.UserData.followers}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="p5 b-b">
                                    <div className="pl-8 mt-4">
                                        <h3>Official Information</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Age</h5>
                                                <span>{this.props.ProfileChecked.age || "Age"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Gender</h5>
                                                <span>{this.props.ProfileChecked.gender || "Gender"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Birth day</h5>
                                                <span>{this.props.ProfileChecked.birth || "0000-00-00"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Biography</h5>
                                                <span>{this.props.ProfileChecked.description || "no biography"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Artist Name</h5>
                                                <span>{this.props.ProfileChecked.artist_name || "no artist name"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Country</h5>
                                                <span>{"Country"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                    <div className="row row-eq-height">
                        <div className="col-lg-12">
                            <div className="card no-b mb-md-3 p-2">
                                <div className="card-header no-bg transparent">
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <div className="d-flex">
                                                <i className="icon-music s-36 mr-3  mt-2"/>
                                                <div>
                                                    <h4>Album & Song & Beat</h4>
                                                    <p>all albums, singles and beats added</p>
                                                    <div className="mt-3">
                                                        <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1"
                                                            role="tablist">
                                                            <li className="nav-item">
                                                                <a className="nav-link active show"
                                                                   id="w3--tab2" data-toggle="tab"
                                                                   href="#w2-tab3" role="tab"
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
                                        <div className="tab-pane fade  show active" id="w2-tab3" role="tabpanel"
                                             aria-labelledby="w2-tab3">
                                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 300}}>
                                                    {this.props.UserBeats.map((val, index) =>
                                                    <div className="m-1 my-4" key={index}>
                                                        <div className="d-flex align-items-center">
                                                            <div className="col-1">
                                                                <div>
                                                                        {/*<i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>*/}
                                                                        {/*<i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "beats")}}/>*/}
                                                                    <i className="icon-play s-28 text-danger"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-4">
                                                                <h5>{val.title}</h5>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <small className="ml-auto">{val.time}</small>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <small className="ml-auto">{val.bpm}/bpm</small>
                                                            </div>
                                                            <FacebookProvider appId="423325871770542">
                                                                <Feed link="https://www.tests.com/">
                                                                    {({ handleClick }) => (
                                                                        <div className="ml-auto transparent border-0">
                                                                            <i className="icon-share-1 text-red" onClick={handleClick}/>
                                                                        </div>
                                                                    )}
                                                                </Feed>
                                                            </FacebookProvider>
                                                            <div className="col-sm-2">
                                                                <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal">
                                                                    <i className="icon-opencart"/>
                                                                </button>
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
                </div>
            </div>
        );
    }
}

export default OtherProfile;
