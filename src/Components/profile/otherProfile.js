import React, { useEffect, useRef, useState } from "react";
import * as Tools from "../functionTools/tools";
import {useDispatch, useSelector} from "react-redux";
import * as CreateFields from "../functionTools/createFields";
import { getMediaLink } from "../functionTools/tools";
import * as BeatsProps from "../functionTools/functionProps";
import MyPrestations from "./category/section/myPrestations";

function OtherProfile(props) {

    const dispatch = useDispatch();
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
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
        carts: carts,
        totalPrice: totalPrice,
        setTmp: setTmp,
    };

    useEffect(() => {
        if (other_beat_maker_beats.length !== 0)
            getMediaLink(setLinkAllOtherArtistBeats, link_all_other_artist_beats, other_beat_maker_beats, BeatsProps.updateOtherBeatMakerBeats, dispatch).then(() => null);

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="Base">
            <div className="container-fluid relative animatedParent animateOnce p-lg-3">
                <div className="card no-b shadow no-r">
                    <div className="row no-gutters">
                        <div className="col-md-4 b-r">
                            <div className="text-center p-5 mt-2">
                                <figure className="avatar avatar-xl">
                                    <img
                                        src={props.ProfileChecked.photo || "https://zupimages.net/up/19/18/3ltf.png"}
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
                                    <h3>Informations officielles </h3>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Âge</h5>
                                            <span>{props.ProfileChecked.age || "Age"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Genre</h5>
                                            <span>{props.ProfileChecked.gender || "Gender"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Anniversaire</h5>
                                            <span>{props.ProfileChecked.birth || "0000-00-00"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Biographie</h5>
                                            <span>{props.ProfileChecked.description || "no biography"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Nom de l'artiste</h5>
                                            <span>{props.ProfileChecked.artist_name || "no artist name"}</span>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="p-4">
                                            <h5>Pays</h5>
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
                                                <h4 className="text-red">Toutes les créations et prestations</h4>
                                                <p>L'ensemble des prestations et/ou créations proposées par {props.ProfileChecked.name}</p>
                                                <div className="mt-3">
                                                    <ul className="nav nav-tabs card-header-tabs nav-material responsive-tab mb-1" role="tablist">
                                                        {props.UserData.role === "beatmaker" &&
                                                        <li className="nav-item">
                                                            <a className="nav-link active show" id="w3--tab2" data-toggle="tab" href="#artist-beats" role="tab" aria-selected="true">Beats</a>
                                                        </li>}

                                                        <li className="nav-item">
                                                            <a className={props.UserData.role !== "beatmaker" ? "nav-link active show": "nav-link"} id="w3--tab2" data-toggle="tab" href="#artist-prestations" role="tab" aria-selected="true">Prestations</a>
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

                                    {props.UserData.role === "beatmaker" &&
                                    <div className="tab-pane fade show active" id="artist-beats" role="tabpanel" aria-labelledby="w2-tab3">
                                        {other_beat_maker_beats.length !== 0 ?
                                            <div className="playlist pl-lg-3 pr-lg-3 scrollbar-isl" style={{height: 350}}>
                                                {CreateFields.CreateBeatsPlaylist("longBeats", "userBeats", props, states, "longBeats")}
                                            </div>
                                            : <div className="playlist pl-lg-3 pr-lg-3 scrollbar-isl" style={{height: 350}}>
                                                <p className="text-center">Cette artist n'a pas d'instrumental</p>
                                            </div>}
                                    </div>}

                                    <div className={props.UserData.role !== "beatmaker" ? "tab-pane fade show active" : "tab-pane fadee"} id="artist-prestations" role="tabpanel" aria-labelledby="w2-tab3">
                                        <MyPrestations read/>
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
