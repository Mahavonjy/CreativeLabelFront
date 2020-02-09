import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-awesome-modal';
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import logo from "../../../images/Logo/ISL_logo.png"
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import { useSelector } from "react-redux";
import {generateInput, smallSpinner} from "../../FunctionTools/CreateFields";
import * as Tools from "../../FunctionTools/Tools";

function AddSingle (props) {

    const pricing = useSelector(state => state.profile.pricing_beats);
    const AllMediaGenre = useSelector(state => state.Home.AllMediaGenre);
    const user_credentials = useSelector(state => state.Home.user_credentials);
    const contract = useSelector(state => state.profile.contract);

    const isMounted = useRef(false);
    const [file, setFile] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState("");
    const [loading, setLoading] = useState(false);
    const [genre_musical, setGenreMusical] = useState("beats");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState("");
    const [artist_tag, setArtistTag] = useState("");
    const [beats_wave, setBeatsWave] = useState("");
    const [stems, setStems] = useState("");
    const [beats] = useState(true);
    const [bpm, setBpm] = useState(0);
    const [platinum_price, setPlatinumPrice] = useState(0);
    const [artist, setArtist] = useState(user_credentials.name);
    const [basic_price] = useState(pricing['basic']);
    const [silver_price] = useState(pricing['silver']);
    const [gold_price] = useState(pricing['gold']);

    const disabledBtn = (id) => {
        setLoading(false);
        document.getElementById(id).removeAttribute("disabled");
    };

    const generateSmallInput = (data_for, name, color, index) => {
        return (
            <div className="custom-float center" style={{width: "100%"}} key={index}>
                <div className="input-group-prepend d-inline-block center">
                    <div className="input-group-text text-dark text-capitalize font-weight-bold" data-tip data-for={data_for}><i className="icon-money"/>{name}<small className="text-danger">*</small></div>
                    <div className={"input-group-text text-light " + color} id={name}>
                        <p className="center" id={name} onClick={name === "platinum" && ChangePlatinumStyle}>
                            {pricing[name]} $
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    const handleSubmit = (e) => {
        let id = e.target.id;
        document.getElementById(id).setAttribute("disabled", "disabled");
        setLoading(true);
        const bodyFormData = new FormData();
        if (genre_musical === "beats" && !beats_wave) {
            toast.error("i need beats wave file");
            disabledBtn(id)
        } else if (genre_musical === "beats" && !stems) {
            toast.error("i need beats stems file");
            disabledBtn(id)
        } else if (!file) {
            toast.error("i need music file");
            disabledBtn(id)
        } else if (!title) {
            toast.error("title is required");
            disabledBtn(id)
        } else if (!artist) {
            toast.error("artist is required");
            disabledBtn(id)
        } else if (!genre) {
            toast.error("genre is required");
            disabledBtn(id)
        } else if (!photo) {
            toast.error("photo is required");
            disabledBtn(id)
        } else {
            let link = "";
            if (genre_musical === "beats") {
                bodyFormData.append('beats_wave', beats_wave);
                bodyFormData.append('stems', stems);
                bodyFormData.append('basic_price', basic_price);
                bodyFormData.append('silver_price', silver_price);
                bodyFormData.append('gold_price', gold_price);
                bodyFormData.append('platinum_price', platinum_price);
                link = "api/beats/uploadBeat"
            } else {
                link = "api/medias/uploadMedia"
            }
            bodyFormData.append('file', file);
            bodyFormData.append('title', title);
            bodyFormData.append('bpm', bpm);
            bodyFormData.append('artist', artist);
            bodyFormData.append('artist_tag', artist_tag);
            bodyFormData.append('genre', genre);
            bodyFormData.append('genre_musical', genre_musical);
            bodyFormData.append('description', description);
            bodyFormData.append('photo', photo);

            let headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': user_credentials.token
            };
            axios.post( link, bodyFormData, {headers: headers}).then(resp => {
                setLoading(false);
                props.closePopup(1, resp.data);
            }).catch(err => {
                try {
                    toast.error(err.response.data);
                } catch (e) {
                    console.log(err)
                }
            });
        }
    };

    const ChangePlatinumStyle = () => {
        if (document.getElementById("platinum").classList.replace('unique-color-dark', 'success-color')) {
            setPlatinumPrice(pricing['platinum']);
        } else {
            setPlatinumPrice(0);
            document.getElementById("platinum").classList.replace('success-color', 'unique-color-dark')
        }
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <Modal visible={true} width="700" height="auto" effect="fadeInUp">
            <ReactTooltip/>
            <ReactTooltip className="special-color-dark" id='basic_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Basic Lease (MP3) {contract['basic_lease']['price']}$ </h5>
                <small>• Receive untagged MP3 file</small><br/>
                <small>• Non-profit & promotional use only</small><br/>
                <small>• Upload to Soundcloud</small><br/>
                <small>• Use for non-profit Album + Performances</small><br/>
                <small>• Limited to {contract['basic_lease']['number_audio_stream']} non-profitable streams</small><br/>
                <small>• Instant delivery</small><br/>
                <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
            </ReactTooltip>
            <ReactTooltip className="special-color-dark" id='silver_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Silver Lease (MP3 + WAVE) {contract['silver_lease']['price']}$ </h5>

                <small>• Receive untagged MP3 + WAV files</small><br/>
                <small>• Profitable – Sell up to 10,000 unit sales</small><br/>
                <small>• Upload to Soundcloud, Apple Music, iTunes , Spotify</small><br/>
                <small>• Use for profit Album + Performances + Music Video</small><br/>
                <small>• Limited to {contract['silver_lease']['number_audio_stream']} streams</small><br/>
                <small>• Radio & TV airplays on 3 stations</small><br/>
                <small>• Instant delivery</small><br/>
                <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
            </ReactTooltip>
            <ReactTooltip className="special-color-dark" id='gold_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Gold Lease (MP3 + WAVE + STEMS) {contract['gold_lease']['price']}$</h5>

                <small>• Receive untagged MP3 + WAV files+ Tracked-Out files/Stems</small><br/>
                <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                <small>• Includes the Silver Lease  features</small><br/>
                <small>• Limited to {contract['gold_lease']['number_audio_stream']} streams</small><br/>
                <small>• Unlimited Radio & TV airplays</small><br/>
                <small>• Instant Delivery</small><br/>
                <small>• Must credits : Prod.by [Name of Producer] / ISL Creative</small>
            </ReactTooltip>
            <ReactTooltip className="special-color-dark" id='platinum_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Platinum Lease (Unlimited + Exclusive) {contract['silver_lease']['price']}$ </h5>

                <small>• Receive untagged MP3 + WAV files + Tracked-Out files/Stems</small><br/>
                <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                <small>• Unlimited profitable sales + streams (iTunes, Spotify  etc.)</small><br/>
                <small>• Use for unlimited profit Album + Performances + Music Video</small><br/>
                <small>• Unlimited TV broadcast + Radio airplay</small><br/>
                <small>• Credits : Prod. by [Name of Producer] / Beats Avenue</small>
            </ReactTooltip>

            <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>

            {loading && smallSpinner("absolute", "0")}

            <img alt={"logo"} src={logo} style={{position: "absolute", marginTop: "5%", opacity:0.4}}/>
            <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                <button className="ModalClose" onClick={() => props.closePopup(0)}>
                    <i className="icon-close s-24" style={{color:"orange"}} />
                </button>
                <div className="col text-center">
                    <h4 className="text-green text-monospace"> Charger vos beats</h4>
                    <div className="body">
                        <div className="custom-float">
                            {generateInput("Titre *", title, setTitle, "titre du beat", "text", "icon-text-width", "Le titre de votre beat")}
                            {generateInput("Artiste *", artist, setArtist, "artist", "text", "icon-text-width", "Le titre de votre beat", true)}
                        </div>
                        <div className="custom-float">
                            {generateInput("Tags", artist_tag, setArtistTag, "Tags", "text", "icon-user", "Pour tagger d'autres artistes")}
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark" data-tip="Définir le(s) genre(s) du beat"><i className="icon-text-width"/>&nbsp;	Genre *</div>
                                <input id="genre" name="genre" className="form-control" placeholder="Sélectionner le(s) genre(s)"
                                       value={genre} onChange={(e) => {Tools.changeFields(setGenre, e)}} list="music-genre" required/>
                                <datalist id="music-genre">
                                    {AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}
                                </datalist>
                            </div>
                        </div>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark" data-tip="sélectionner le type de son"><i className="icon-text-width"/>&nbsp;	Type de son</div>
                                <input id="genre_musical" name="genre_musical" className="form-control"
                                       value={genre_musical} onChange={(e) => {Tools.changeFields(setGenreMusical, e)}}
                                       list="music-type" required disabled/>
                                <datalist id="music-type">
                                    <option value="music">music</option>
                                    <option value="beats">beats</option>
                                </datalist>
                            </div>
                            {beats && generateInput("BPM", bpm, setBpm, "bpm", "Bpm", "icon-stack-exchange", "Définir le BPM du son")}
                        </div>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark" data-tip="Upload here your beats_name.mp3"><i className="icon-music"/>&nbsp;Mp3 ou mpeg</div>
                                <input onChange={(e) => Tools.changeFileFields(setFile, e)} id="file" name="file" accept="audio/mpeg, .mp3" className="form-control" type="file" />
                            </div>
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark" data-tip="Upload here your beats photo"><i className="icon-picture-o"/>&nbsp;Photo</div>
                                <input onChange={(e) => Tools.changeFileFields(setPhoto, e)} id="photo" name="photo" className="form-control" accept="image/png, image/jpeg" type="file" required/>
                            </div>
                        </div>
                        {beats &&
                            <div>
                                <div className="custom-float">
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text text-dark" data-tip="Upload here your beats_name.wave"><i className="icon-music"/>&nbsp;Fichier wav *</div>
                                        <input onChange={(e) => Tools.changeFileFields(setBeatsWave, e)} id="beats_wave" name="beats_wave" className="form-control" type="file" accept=".wav, .wave"/>
                                    </div>
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text text-dark" data-tip="Upload here your beats stems"><i className="icon-music"/>&nbsp;Dossier stems (fichier zip)</div>
                                        <input onChange={(e) => Tools.changeFileFields(setStems, e)} id="stems" name="stems" className="form-control" type="file" accept=".zip"/>
                                    </div>
                                </div>
                            </div>}
                        {beats &&
                            <div style={{display: "flex"}}>
                                {[['basic_price', 'basic', 'success-color'], ['silver_price', 'silver', 'success-color'],
                                ['gold_price', 'gold', 'success-color'], ['platinum_price', 'platinum', 'unique-color-dark']].map((val, index) =>
                                    generateSmallInput(val[0], val[1], val[2], index)
                                )}
                            </div>}
                        <div className="custom-float">
                            <div className="input-group-prepend center" style={{width: "90%"}}>
                                <div className="input-group-text text-dark" data-tip="Ajouter quelque description si vous voulez"><i className="icon-crosshairs"/>&nbsp;	Description</div>
                                <textarea value={description} onChange={(e) => Tools.changeFields(setDescription, e)}
                                          id="description" name="description" className="form-control" placeholder={"Ajouter une description"}/>
                            </div>
                        </div>
                        <button id="add-music" className="btn btn-outline-success btn-sm pl-4 pr-4 mb-3" onClick={(e)=> handleSubmit(e)}>{loading ? "Veuiller attendre ...": "Enregister"}</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default AddSingle;
