import React, { useEffect, useRef, useState } from "react";
import TestImg from "../../../../assets/images/demo/a2.jpg";
import IslPlayer from "../../../players/players";
import { useDispatch, useSelector } from "react-redux";
import { getMediaLink } from "../../../functionTools/tools";
import * as FunctionProps from "../../../functionTools/functionProps";
import * as CreateFields from "../../../functionTools/createFields";
import BackGround from "../../../../assets/images/demo/a5.jpg"
import { ForAddToCard } from "../../../functionTools/popupFields";

function OneBeat(props) {

    const user_credentials = useSelector(state => state.Home.user_credentials);
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
    const beat_maker_beats = useSelector(state => state.beats.beat_maker_beats);
    const beats_similar = useSelector(state => state.beats.beats_similar);

    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [playing, setPlaying] = useState(false);
    const [index, setIndex] = useState(null);
    const [tmp, setTmp] = useState(null);
    const [songId, setSongId] = useState(null);
    const [link_all_artist_beats, setLinkAllArtistBeats] = useState([]);
    const [link_all_beats_similar, setLinkAllBeatsSimilar] = useState([]);

    const PlaySingle = async (index, type_) => {
        if (!playing && songId === null) {
            dispatch(FunctionProps.addNewPlayerList([props.SingleBeat]));
            setPlaying(true);
            setSongId(index);
            props.ToPlay(index, type_, false, "single")
        } else {
            setPlaying(!playing);
            IslPlayer.pauseOrPlayPlayer(true);
        }
    };

    OneBeat.PauseOrPlaySingle = (index) => {
        console.log("hello");
        setPlaying(!playing);
        setSongId(index)
    };

    const generate_states = (link, beats) => {
        return {
            link: link,
            beats: beats,
            user_credentials: user_credentials,
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

    useEffect(() => {
        Promise.all([
            getMediaLink(setLinkAllArtistBeats, link_all_artist_beats, beat_maker_beats, FunctionProps.updateBeatMakerBeats, dispatch).then(() => null),
            getMediaLink(setLinkAllBeatsSimilar, link_all_beats_similar, beats_similar, FunctionProps.updateSimilarBeats, dispatch).then(() => null)
            ]).then(() => null);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <section className="pl-lg-3 bg-dark" style={{backgroundImage: 'url(' + BackGround + ')', backgroundSize: "cover"}}>
                <div className="row pt-5 ml-lg-5 mr-lg-5">
                    <div className="col-md-10 mr-4 ml-4">
                        <div className="row my-5 pt-5">
                            <div className="col-md-3">
                                <img src={props.SingleBeat.photo || TestImg} height={280} width="100%" style={{borderRadius: "10px"}} alt="/"/>
                            </div>
                            <div className="col-md-9">
                                <div className="d-md-flex align-items-center justify-content-between">
                                    <h1 className="my-3 text-white ">{props.SingleBeat.artist} - {props.SingleBeat.title}</h1>
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
                                <div className="my-2 mt-4 mb-4">
                                    <h3 className="text-light">Basic&nbsp;-&nbsp;<span className="text-red">{props.SingleBeat.basic_price} $</span>&nbsp;</h3>
                                    <h3 className="text-light">Silver&nbsp;-&nbsp;<span className="text-red">{props.SingleBeat.silver_price} $</span>&nbsp;</h3>
                                    <h3 className="text-light">Gold&nbsp;-&nbsp;<span className="text-red">{props.SingleBeat.gold_price} $</span>&nbsp;</h3>
                                </div>
                                <div className="row pt-3">
                                    {playing ?
                                        <i className="icon-pause-1 s-36 text-red ml-3 mr-2" onClick={() => {PlaySingle(0, "OneBeats").then(() => null)}} />:
                                        <i className="icon-play-button-1 s-36 text-red ml-3 mr-2" onClick={() => {PlaySingle(0, "OneBeats").then(() => null)}} />}
                                    <button className="btn btn-primary btn-lg" data-toggle="modal"
                                            data-target={"#SingleBeats" + props.SingleBeat.id}>Acheter maintenant
                                    </button>
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
                                                <h4 className="text-red">Toutes les créations de {props.SingleBeat.artist}</h4>
                                                <p>Sur Creative BeatMaking</p>
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
                                        {beat_maker_beats.length !== 0 ?
                                            <div className="playlist pl-lg-3 pr-lg-3 scrollbar-isl" style={{height: 320}}>
                                                {CreateFields.CreateBeatsPlaylist("long_beats", "beat_maker_beats", props, generate_states(link_all_artist_beats, beat_maker_beats), "long_beats")}
                                            </div>
                                            : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 320}}>
                                                <p className="text-center">L'artiste n'a pas d'autres beats</p>
                                            </div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card mb-3">
                            <div className="card-header transparent b-b">
                                <strong className="text-red">Beats similaires</strong>
                            </div>
                            {beats_similar.length !== 0 ?
                                <div className="playlist pl-lg-3 pr-lg-3 scrollbar-isl" style={{height: 400}}>
                                    {CreateFields.CreateBeatsPlaylist("short_beats", "SimilarBeats", props, generate_states(link_all_beats_similar, beats_similar), "short_beats")}
                                </div>
                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 400}}>
                                    <p className="text-center">Pas de beats similaires</p>
                                </div>}
                        </div>
                    </div>
                </div>
            </section>
            {ForAddToCard(props.SingleBeat, "SingleBeats", generate_states(null, props.SingleBeat), dispatch)}
        </div>
    );
}

export default OneBeat;
