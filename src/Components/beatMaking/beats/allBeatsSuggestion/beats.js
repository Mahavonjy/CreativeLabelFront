import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import ReactTooltip from 'react-tooltip';
import Suggestion from "./suggestion";
import { getMediaLink } from "../../../functionTools/tools";
import Offers from "../offers/offers";
import * as CreateFields from "../../../functionTools/createFields";
import * as BeatsProps from "../../../functionTools/functionProps";

function Beats(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const carts = useSelector(state => state.Carts.carts);
    const totalPrice = useSelector(state => state.Carts.total_price);
    const auth = useSelector(state => state.session.authenticated);
    const user_credentials = useSelector(state => state.Home.user_credentials);
    const beats = useSelector(state => state.beats.beats);
    const top_beatBaker = useSelector(state => state.beats.top_beatmaker);
    const ready = useSelector(state => state.beats.ready);
    const AllMediaGenre = useSelector(state => state.Home.AllMediaGenre);

    const isMounted = useRef(false);
    const [placeHolder, setPlaceHolder] = useState("Rechercher");
    const [genre] = useState('');
    const [state_beats, setStateBeats] = useState(beats);
    const [link_beats, setLinkBeats] = useState([]);
    const [index, setIndex] = useState(null);
    const [tmp, setTmp] = useState(null);

    const getBeats = (e, type_) => {
        setLinkBeats([]);
        let val = e.target.value;
        let url_;
        let key;

        if (type_ === "genre") {
            setPlaceHolder(genre);
            url_ = "api/medias/genre/beats/" + val;
            key = "songs"
        } else {
            url_ = "api/beats/random";
            key = "random"
        }

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };

        axios.get( url_, {headers: headers}).then(resp => {
            const data = resp.data[key];
            dispatch(BeatsProps.addBeats(data));
            setStateBeats(data);
            if (key === "random") {
                for (let beats in data)
                    getMediaLink(setLinkBeats, link_beats, beats, BeatsProps.updateBeats).then(() => null)
            } else for (let row_ in data) setLinkBeats(link_beats => [...link_beats, {row: true}]);
        }).catch(err => {
            console.log(err.response)
        })
    };

    let states = {
        link: link_beats,
        beats: beats,
        carts: carts,
        totalPrice: totalPrice,
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
        if (!ready && state_beats.length !== 0) {
            getMediaLink(setLinkBeats, link_beats, state_beats, BeatsProps.updateBeats, dispatch).then(() => null);
            dispatch(BeatsProps.readyBeats());
        } else if (state_beats.length !== 0)
            for (let row_ in beats) setLinkBeats(link_beats => [...link_beats, {row: true}]);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div>
            <ReactTooltip/>
            {/* Headers */}
            {CreateFields.CreativeHeaders("Creative beatMaking", 'Des créations orginales qui font la différence Pour les professionnels de la musique (artistes,producteurs, labels...)', null, null, null, null, auth, history)}
            {/* End Headers */}
            <div className="Base">
                {/*PlayList & Events*/}
                <section className="section mt-4">
                    <div className="row row-eq-height">
                        <div className="col-lg-8">
                            <div className="card no-b mb-md-3 p-2">
                                <div className="card-header no-bg transparent">
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <div className="d-flex">
                                                <i className="icon-heartbeat s-36 mr-3  mt-2"/>
                                                <div>
                                                    <h4 className="text-primary">Les instrus afro-tropicales</h4>
                                                    <p>Toutes les créactions</p>
                                                    <div className="mt-8 d-flex">
                                                        <button type="button" id="Offers"
                                                                className="btn btn-outline-info btn-fab-md pl-md-6 pr-md-6 Offers"
                                                                data-toggle="modal" data-target="#exampleModalOffers">Offers
                                                        </button>
                                                        <div aria-disabled={"false"}
                                                             className="modal fade p-t-b-50 Offers"
                                                             id="exampleModalOffers" role="dialog"
                                                             aria-labelledby="exampleModalLabelOffers">
                                                            <div className="modal-dialog" role="document" style={{width: "100%"}}>
                                                                <div className="modal-content transparent border-0">
                                                                    <div className="modal-header">
                                                                        <h1 className="pt-2">Creative Beats Offers</h1>
                                                                        <button type="button"
                                                                                className="closeOffers transparent border-0"
                                                                                data-dismiss="modal"
                                                                                aria-label="Close">
                                                                            <i className="icon-close s-36 text-red"/>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <Offers/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-outline-secondary btn-fab-md pl-md-4 pr-md-4"
                                                                type="button"
                                                                id="dropdownMenuButton" data-toggle="dropdown"
                                                                aria-haspopup="true"
                                                                aria-expanded="false"><i className="icon-filter"/>Filtres
                                                            </button>
                                                            <div className="dropdown-menu text-center"
                                                                 aria-labelledby="dropdownMenuButton">
                                                                <button
                                                                    className="btn btn-outline-warning btn-fab-md"
                                                                    onClick={(e) => getBeats(e, "random")}>
                                                                    <i className="icon-warning mr-2"/>réinitialiser
                                                                </button>
                                                                <div className="md-form my-0">
                                                                    <div
                                                                        className="input-group-text bg-mdb-color">Genre&nbsp;
                                                                        <input className="form-control" type="text"
                                                                               placeholder={placeHolder} value={genre}
                                                                               onChange={(e) => getBeats(e, "genre")}
                                                                               list="music-genre"/>
                                                                    </div>
                                                                    <datalist id="music-genre">{AllMediaGenre.map((val, index) =>
                                                                        <option key={index} value={val}/>)}
                                                                    </datalist>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Here is all beats, random */}
                                <div className="card-body no-p" style={{height: 400}}>
                                    <div className="tab-content" id="v-pills-tabContent1">
                                        <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">

                                            {beats.length !== 0 ?
                                                <div className="playlist bg-dark pl-lg-3 pr-lg-3 scrollbar-isl" style={{height: 350}}>
                                                    {CreateFields.CreateBeatsPlaylist("oneBeats", "AllBeat", props, states, "oneBeats")}
                                                </div>
                                                : <div className="playlist bg-dark pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                    <p className="text-center">Vide</p>
                                                </div>}

                                        </div>
                                    </div>
                                </div>
                                {/* end off all beats, random */}

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
                                            <h4 className="text-primary">Top Beatmakers</h4>
                                        </div>
                                        <small> Classement ISL Creative des Beatmakers </small>
                                    </div>
                                </div>
                                {/* Here is top beatmakers */}
                                {CreateFields.DisplayArtist(top_beatBaker, user_credentials)}
                                {/* end of top beatmakers */}
                            </div>
                        </div>
                    </div>
                    <Suggestion ToPlay={props.ToPlay} user_credentials={user_credentials}/>
                </section>
            </div>
        </div>
    );
}

export default Beats;
