import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-awesome-modal';
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../images/Logo/ISL_logo.png";
import { useSelector } from "react-redux";
import { smallSpinner } from "../../FunctionTools/CreateFields";
import * as Tools from "../../FunctionTools/Tools";

function EditSingle(props) {

    const user_credentials = useSelector(state => state.Home.user_credentials);
    const AllMediaGenre = useSelector(state => state.Home.AllMediaGenre);

    const isMounted = useRef(false);
    const [beats_wave, setBeatsWave] = useState('');
    const [stems, setStems] = useState("");
    const [bpm, setBpm] = useState(0);
    const [loading, setLoading] = useState(false);
    const [beats] = useState(true);
    const [file, setFile] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [title, setTitle] = useState(props.Song.title);
    const [artist, setArtist] = useState(props.Song.artist);
    const [genre, setGenre] = useState(props.Song.genre);
    const [genre_musical, setGenreMusical] = useState(props.Song.genre_musical);
    const [description, setDescription] = useState(props.Song.description);
    const [artist_tag, setArtistTag] = useState(props.Song.artist_tag);

    const disabledBtn = (id) => {
        setLoading(false);
        document.getElementById(id).removeAttribute("disabled");
    };

    const handleSubmitEditSingle = (id) => {
        document.getElementById(id).setAttribute("disabled", "disabled");
        setLoading(true);
        const bodyFormData = new FormData();
        if (title) {
            toast.error("title is required");
            disabledBtn(id)
        } else if (artist) {
            toast.error("artist is required");
            disabledBtn(id)
        } else if (!genre) {
            toast.error("genre is required");
            disabledBtn(id)
        } else {
            let link = "";
            if (genre_musical === "beats") {
                bodyFormData.append('beats_wave', beats_wave);
                bodyFormData.append('stems', stems);
                link = "api/beats/update/"
            } else {
                link = "api/medias/updateMedia/"
            }
            bodyFormData.append('title', title);
            bodyFormData.append('artist', artist);
            bodyFormData.append('genre', genre);
            bodyFormData.append('artist_tag', artist_tag);
            bodyFormData.append('genre_musical', genre_musical);
            bodyFormData.append('description', description);
            bodyFormData.append('file', file);
            bodyFormData.append('photo', photo);

            let headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': user_credentials.token
            };
            axios.put(Conf.configs.ServerApi + link + id, bodyFormData, {headers: headers}).then(resp => {
                setLoading(false);
                props.Success(resp.data);
            }).catch(err => {
                setLoading(false);
                toast.error(err.response.data);
            });
        }

    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <Modal visible={true} width="650" height="550" effect="fadeInUp" onClickAway={() => props.CloseEdit}>
            <ToastContainer position="bottom-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnVisibilityChange draggable pauseOnHover/>
            {loading && smallSpinner("absolute", "0")}
            <img alt={"logo"} src={logo} style={{position: "absolute", height: 550, width: 650, opacity:0.4}}/>
            <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                <button className="ModalClose" onClick={props.CloseEdit}>
                    <i className="icon-close s-24" style={{color:"orange"}} />
                </button>
                <div className="col text-center">
                    <h4 className="text-green text-monospace">Modifier</h4>
                    <div className="body">
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-text-width"/>&nbsp;Titre</div>
                                <input value={title} onChange={(e) => Tools.changeFields(setTitle, e)}
                                       id="title" name="title" className="form-control" type="text"/>
                            </div>
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-user"/>&nbsp;artists</div>
                                <input value={artist} onChange={(e) => Tools.changeFields(setArtist, e)}
                                       id="artist" name="artist" className="form-control" type="text" required/>
                            </div>
                        </div>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-user"/>&nbsp;artist tag</div>
                                <input value={artist_tag} onChange={(e) => Tools.changeFields(setArtistTag, e)}
                                       id="artist_tag" name="artist_tag" className="form-control" type="text" required/>
                            </div>
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-text-width"/>&nbsp;genre *</div>
                                <input id="genre" name="genre" className="form-control"
                                       value={genre} onChange={(e) => Tools.changeFields(setGenre, e)} list="music-genre"/>
                                <datalist id="music-genre">
                                    {AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}
                                </datalist>
                            </div>
                        </div>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-text-width"/>&nbsp;type</div>
                                <input id="type" name="type" className="form-control" value={genre_musical} list="music-type" disabled/>
                                <datalist id="music-type">
                                    <option value="beats">beats</option>
                                </datalist>
                            </div>
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text text-dark"><i className="icon-crosshairs"/>&nbsp;description</div>
                                <input value={description} onChange={(e) => Tools.changeFields(setDescription, e)}
                                       id="description" name="description" className="form-control" type="text"/>
                            </div>
                        </div>
                        {props.Type === "beats" ?
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark"><i className="icon-stack-exchange"/>&nbsp;bpm</div>
                                    <input value={bpm} onChange={(e) => Tools.changeFields(setBpm, e)}
                                           id="bpm" name="bpm" className="form-control" type="number"/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark"><i className="icon-music"/>&nbsp;Mp3 ou mpeg</div>
                                    <input onChange={(e) => Tools.changeFileFields(setFile, e)} id="file" name="file"
                                           className="form-control" type="file" accept="audio/mpeg, .mp3"/>
                                </div>
                            </div>
                            : <div className="custom-float">
                                <div className="input-group-prepend center" style={{width: "90%"}}>
                                    <div className="input-group-text text-dark"><i className="icon-music"/>&nbsp;Mp3 ou mpeg</div>
                                    <input onChange={(e) => Tools.changeFileFields(setFile, e)} id="file" name="file"
                                           className="form-control" type="file" accept="audio/mpeg, .mp3"/>
                                </div>
                            </div>}
                        {this.props.Type === "beats" ?
                            <div>
                                <div className="custom-float">
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text text-dark"><i className="icon-music"/>&nbsp;Wav *</div>
                                        <input onChange={(e) => Tools.changeFileFields(setBeatsWave, e)}
                                               id="beats_wave" name="beats_wave" className="form-control" accept=".wav, .wave" type="file"/>
                                    </div>
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text text-dark"><i className="icon-music"/>&nbsp;stems</div>
                                        <input onChange={(e) => Tools.changeFileFields(setStems, e)} id="stems" name="stems"
                                               className="form-control" type="file" accept=".zip"/>
                                    </div>
                                </div>
                            </div>
                            :null}
                        <div className="custom-float">
                            <div className="input-group-prepend center" style={{width: "90%"}}>
                                <div className="input-group-text text-dark"><i className="icon-picture-o"/>&nbsp;photo</div>
                                <input onChange={(e) => Tools.changeFileFields(setPhoto, e)} id="photo" name="photo"
                                       className="form-control" type="file" accept="image/png, image/jpeg"/>
                            </div>
                        </div>
                        <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={() => handleSubmitEditSingle(props.Song.id)}>{loading ? "Veuiller attendre ...": "Mettre à Jour"}</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditSingle;
