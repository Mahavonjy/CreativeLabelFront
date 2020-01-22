import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import * as FunctionProps from "../../../FunctionTools/FunctionProps";
import { getMediaLink } from "../../../FunctionTools/Tools";

function Suggestion(props) {

    const dispatch = useDispatch();
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
    const latest_beats = useSelector(state => state.beats.latest_beats);
    const discovery_beats = useSelector(state => state.beats.discovery_beats);
    const new_beatMaker = useSelector(state => state.beats.new_beatMaker);
    const isl_playlist = useSelector(state => state.beats.isl_playlist);
    const ready_latest_beats = useSelector(state => state.beats.ready_latest_beats);
    const ready_discovery_beats = useSelector(state => state.beats.ready_discovery_beats);
    const ready_isl_playlist = useSelector(state => state.beats.ready_isl_playlist);

    const isMounted = useRef(false);
    const [index, setIndex] = useState(null);
    const [tmp, setTmp] = useState(null);
    const [link_latest_beats, setLinkLatestBeats] = useState([]);
    const [state_latest_beats] = useState(latest_beats);
    const [state_discovery_beats] = useState(discovery_beats);
    const [link_discovery_beats, setLinkDiscoveryBeats] = useState([]);
    const [state_isl_playlist] = useState(isl_playlist);
    const [link_isl_playlist, setLinkIslPlaylist] = useState([]);

    const generate_states = (link, beats) => {
        return {
            link: link,
            beats: beats,
            user_credentials: props.user_credentials,
            addNewPlayerList: FunctionProps.addNewPlayerList,
            addTotalPrice: FunctionProps.addTotalPrice,
            addCarts: FunctionProps.addCarts,
            index: index,
            setIndex: setIndex,
            carts: carts,
            totalPrice: totalPrice,
            tmp: tmp,
            setTmp: setTmp,
        }
    };

    const get_link_latest_beats = () => {
        if (!ready_latest_beats && state_latest_beats.length !== 0) {
            getMediaLink(setLinkLatestBeats, link_latest_beats, state_latest_beats, FunctionProps.updateLatestBeats, dispatch).then(() => null);
            FunctionProps.readyLatestBeats()
        }
    };

    const get_link_discovery_beats = () => {
        if (!ready_discovery_beats && state_discovery_beats !== 0) {
            getMediaLink(setLinkDiscoveryBeats, link_discovery_beats, state_discovery_beats, FunctionProps.updateDiscoveryBeats, dispatch).then(() => null);
            FunctionProps.readyDiscoveryBeats();
        }
    };

    const get_link_isl_playlist_beats = () => {
        if (!ready_isl_playlist && state_isl_playlist.length !== 0) {
            getMediaLink(setLinkIslPlaylist, link_isl_playlist, state_isl_playlist, FunctionProps.updateIslBeats, dispatch).then(() => null);
            FunctionProps.readyIslBeats();
        }
    };

    useEffect(() => {
        Promise.all([get_link_discovery_beats(), get_link_isl_playlist_beats(), get_link_latest_beats()]).catch(() => window.location.reload());

        return () => {
            isMounted.current = true
        };
    }, []);

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
                        {isl_playlist.length !== 0 ?
                            <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                {CreateFields.CreateBeatsPlaylist("long_beats", "link_isl_playlist", props, generate_states(link_isl_playlist, state_isl_playlist), "long_beats")}
                            </div>
                            : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                <p className="text-center text-red pt-5"> Pas de playlist pour le moment </p>
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
                        {discovery_beats.length !== 0 ?
                            <div className="playlist pl-lg-3 pr-lg-3" style={{height: 328}}>
                                {CreateFields.CreateBeatsPlaylist("short_beats", "link_discovery_beats", props, generate_states(link_discovery_beats, state_discovery_beats), "short_beats")}
                            </div>
                            : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 328}}>
                                <p className="text-center text-red pt-5"> Pas de découverte</p>
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
                        {latest_beats.length !== 0 ?
                            <div className="playlist pl-lg-3 pr-lg-3" style={{height: 434}}>
                                {CreateFields.CreateBeatsPlaylist("long_beats", "latest_beats", props, generate_states(link_latest_beats, state_latest_beats), "long_beats")}
                            </div>
                            : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 434}}>
                                <p className="text-center text-red pt-5"> Pas de nouveau Instru</p>
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
                        {CreateFields.DisplayArtist(new_beatMaker)}
                        {/* end of top beatmakers */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Suggestion;
