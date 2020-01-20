import React, { useEffect, useRef, useState } from "react";
import PhotoD from '../../../images/socials/profile.png';
import * as Tools from "../../FunctionTools/Tools";
import { useSelector } from "react-redux";
import * as CreateFields from "../../FunctionTools/CreateFields";
import { getMediaLink } from "../../FunctionTools/Tools";
import * as BeatsProps from "../../FunctionTools/FunctionProps";
import { ToastContainer } from "react-toastify";

function OtherProfile(props) {

    const user_credentials = useSelector(state => state.Home.user_credentials);
    const other_beat_maker_beats = useSelector(state => state.beats.other_beat_maker_beats);

    const isMounted = useRef(false);
    const [index, setIndex] = useState(null);
    const [tmp, setTmp] = useState(null);
    const [followed, setFollowed] = useState(0);
    const [link_all_other_artist_beats, setLinkAllOtherArtistBeats] = useState([]);

    OtherProfile.UpdateStateFollowed = () => {
        setFollowed(1)
    };

    let states = {
        link: link_all_other_artist_beats,
        beats: other_beat_maker_beats,
        user_credentials: user_credentials,
        addNewPlayerList: BeatsProps.addNewPlayerList,
        addTotalPrice: BeatsProps.addTotalPrice,
        addCarts: BeatsProps.addCarts,
        index: index,
        setIndex: setIndex,
        tmp: tmp,
        setTmp: setTmp,
    };

    useEffect(() => {
        getMediaLink(setLinkAllOtherArtistBeats, link_all_other_artist_beats, other_beat_maker_beats, BeatsProps.updateOtherBeatMakerBeats).then(() => null);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <ToastContainer/>
            <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                <div className="card no-b shadow no-r">
                    <div className="row no-gutters">
                        <div className="col-md-4 b-r">
                            <div className="text-center p-5 mt-2">
                                <figure className="avatar avatar-xl">
                                    <img
                                        src={props.ProfileChecked.photo || PhotoD}
                                        alt="profile"/>
                                </figure>
                                <div>
                                    <h4 className="p-t-10">{props.ProfileChecked.name || "Name"}</h4>
                                    <button className="btn btn-outline-primary btn-sm  mt-3 pl-4 pr-4"
                                            onClick={() => {
                                                Tools.LikeOrFollow("follow", props.UserData.user_id);
                                            }}>
                                        Followers {props.UserData.followers + followed}
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
                                            <span>{props.ProfileChecked.age || "Age"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Gender</h5>
                                            <span>{props.ProfileChecked.gender || "Gender"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Birth day</h5>
                                            <span>{props.ProfileChecked.birth || "0000-00-00"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Biography</h5>
                                            <span>{props.ProfileChecked.description || "no biography"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Artist Name</h5>
                                            <span>{props.ProfileChecked.artist_name || "no artist name"}</span>
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
                                                <h4 className="text-red">Prestattion & Beats & Others</h4>
                                                <p>Tout les services proposer par cette artiste</p>
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
                                        {other_beat_maker_beats.length !== 0 ?
                                            <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                {CreateFields.CreateBeatsPlaylist("longBeats", "userBeats", props, states, "longBeats")}
                                            </div>
                                            : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                <p className="text-center"> Cette artist n'a pas d'instrumental</p>
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

export default OtherProfile;
