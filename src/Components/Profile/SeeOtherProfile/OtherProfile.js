import React, { Component } from "react";
import PhotoD from '../../../images/socials/profile.png';
import * as Tools from "../../FunctionTools/Tools";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../FunctionTools/CreateFields";
import * as PopupFields from "../../FunctionTools/PopupFields";

let _this;

class OtherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false, NotFound: false,
            index: null, tmp: null, followed: 0, link_all_other_artist_beats : []
        };
        _this = this;
    }

    static UpdateStateFollowed () {
        _this.setState({followed: 1})
    }

    componentDidMount() {
        this.setState({ isMounted: true }, () => {
            Tools.AddForPlay(this, "link_all_other_artist_beats", this.props.other_beat_maker_beats, this.props.updateOtherBeatMakerBeats).then(() => console.log(''))
        });
    }

    componentWillUnmount() {this.setState({ isMounted: false });}

    render() {
        return (
            <div className="Base">
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
                                        onClick={() => {
                                            Tools.LikeOrFollow("follow", this.props.UserData.user_id);
                                        }}>
                                            Followers {this.props.UserData.followers + this.state.followed}
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
                                                    <h4 className="text-red">Album & Song & Beat</h4>
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
                                            {this.props.other_beat_maker_beats.length !== 0 ?
                                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                    {this.props.CreateBeatsPlaylist(this, "userBeats", this.props.other_beat_maker_beats, this.state.link_all_other_artist_beats, "longBeats")}
                                                </div>
                                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                    <p className="text-center">Vide</p>
                                                </div>}
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

const mapStateToProps = state => {
    return {
        other_beat_maker_beats: state.beats.other_beat_maker_beats,
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
        addNewPlayerList: (data) => {
            dispatch({type: "ADD_NEW_PLAYER_PLAYLIST", data: data})
        },
        updateOtherBeatMakerBeats: (data) => {
            dispatch({type: "UPDATE_OTHER_BEAT_MAKER_BEATS", data: data})
        },
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
        DisplayArtist: bindActionCreators(CreateFields.DisplayArtist, dispatch),
        ForAddToCard: bindActionCreators(PopupFields.ForAddToCard, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtherProfile);
