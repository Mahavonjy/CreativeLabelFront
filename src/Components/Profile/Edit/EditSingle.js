import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import Cookies from "universal-cookie";
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../images/Logo/ISL_logo.png";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../FunctionTools/CreateFields";

let cookies = new Cookies();
class EditSingle extends Component {
    state = {
        file: null, title: this.props.Song.title, artist: this.props.Song.artist,
        genre: this.props.Song.genre, genre_musical: this.props.Song.genre_musical,
        description: this.props.Song.description, photo: null, artist_tag: this.props.Song.artist_tag,
        beats_wave: '', stems: '', bpm: 0, beats: false,
    };

    changeArtistTag = (e) => {this.setState({artist_tag : e.target.value});};

    changeBpm = (e) => {this.setState({bpm : e.target.value});};

    changeTitle = (e) => {this.setState({title : e.target.value});};

    changeArtist = (e) => {this.setState({artist : e.target.value});};

    changeGenre = (e) => {this.setState({genre : e.target.value});};

    uploadWaveFile = (e) => {this.setState({beats_wave : e.target.files[0]})};

    uploadStemsFile = (e) => {this.setState({stems : e.target.files[0]})};

    changeGenreMusical = (e) => {
        this.setState({genre_musical : e.target.value});
        if (e.target.value === "beats"){
            this.setState({beats: true});
        } else {
            this.setState({beats: false});
        }
    };

    changeDescription = (e) => {this.setState({description : e.target.value});};

    uploadFile = (e) => {
        let file = e.target.files[0];
        this.setState({file : file});
    };

    uploadPic = (e) =>{
        let picture = e.target.files[0];
        this.setState({
            photo : picture
        });
    };

    disabledBtn = (id) => {
        this.setState({loading: false}, () => {
            document.getElementById(id).removeAttribute("disabled");
        });
    };

    handleSubmitEditSingle = (e, id_) => {
        let id = e.target.id;
        document.getElementById(id).setAttribute("disabled", "disabled");
        this.setState({loading: true}, () => {
            const bodyFormData = new FormData();
            if (!this.state.title) {
                toast.error("title is required");
                this.disabledBtn(id)
            } else if (!this.state.artist) {
                toast.error("artist is required");
                this.disabledBtn(id)
            } else if (!this.state.genre) {
                toast.error("genre is required");
                this.disabledBtn(id)
            } else {
                let link = "";
                if (this.state.genre_musical === "beats") {
                    bodyFormData.append('beats_wave', this.state.beats_wave);
                    bodyFormData.append('stems', this.state.stems);
                    link = "api/beats/update/"
                } else {
                    link = "api/medias/updateMedia/"
                }
                bodyFormData.append('title', this.state.title);
                bodyFormData.append('artist', this.state.artist);
                bodyFormData.append('genre', this.state.genre);
                bodyFormData.append('genre_musical', this.state.genre_musical);
                bodyFormData.append('description', this.state.description);
                bodyFormData.append('file', this.state.file);
                bodyFormData.append('photo', this.state.photo);

                let new_headers = {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': "*",
                    'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
                };
                axios.put(Conf.configs.ServerApi + link + id_, bodyFormData, {headers: new_headers}).then(() => {
                    this.setState({loading: false}, () => {
                        this.props.Success();
                    });
                }).catch(err => {
                    this.setState({loading: false}, () => {
                        toast.error(err.response.data);
                    });
                });
            }
        });
    };

    render() {
        return (
            <Modal visible={true} width="650" height="550" animationType='slide'>
                <ToastContainer position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover/>
                {this.state.loading ? this.props.smallSpinner("absolute", "0") : null}
                <img alt={"logo"} src={logo} style={{position: "absolute", height: 550, width: 650, opacity:0.4}}/>
                <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                    <button className="ModalClose" onClick={this.props.CloseEdit}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Add single</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-text-width"/>title</div>
                                    <input value={this.state.title} onChange={this.changeTitle} id="title" name="title"
                                           className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-user"/>artist</div>
                                    <input value={this.state.artist} onChange={this.changeArtist} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-user"/>artist tag</div>
                                    <input value={this.state.artist_tag} onChange={this.changeArtistTag} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-text-width"/>genre</div>
                                    <input id="genre" name="genre" className="form-control"
                                           value={this.state.genre} onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.props.AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-text-width"/>type</div>
                                    <input id="type" name="type" className="form-control"
                                           value={this.state.genre_musical} onChange={this.changeGenreMusical}
                                           list="music-type" required disabled/>
                                    <datalist id="music-type">
                                        <option value="music">music</option><option value="beats">beats</option>
                                    </datalist>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text"><i className="icon-crosshairs"/>description</div>
                                    <input value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" type="text"/>
                                </div>
                            </div>
                            {this.props.Type === "beats" ?
                                <div className="custom-float">
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text"><i className="icon-stack-exchange"/>bpm</div>
                                        <input value={this.state.bpm} onChange={this.changeBpm}
                                               id="bpm" name="bpm" className="form-control" type="number"/>
                                    </div>
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text"><i className="icon-music"/>single</div>
                                        <input onChange={this.uploadFile} id="picture" name="picture"
                                               className="form-control" type="file"  required/>
                                    </div>
                                </div>
                                : <div className="custom-float">
                                    <div className="input-group-prepend center" style={{width: "90%"}}>
                                        <div className="input-group-text"><i className="icon-music"/>single</div>
                                        <input onChange={this.uploadFile} id="picture" name="picture"
                                               className="form-control" type="file"  required/>
                                    </div>
                                </div>}
                            {this.props.Type === "beats" ?
                                <div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                            <div className="input-group-text"><i className="icon-music"/>wave</div>
                                            <input onChange={this.uploadWaveFile} id="wave" name="wave"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                            <div className="input-group-text"><i className="icon-music"/>stems</div>
                                            <input onChange={this.uploadStemsFile} id="stems" name="stems"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                </div>
                                :null}
                            <div className="custom-float">
                                <div className="input-group-prepend center" style={{width: "90%"}}>
                                    <div className="input-group-text"><i className="icon-picture-o"/>photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <button id={this.props.Song.id} className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e)=> this.handleSubmitEditSingle(e, this.props.Song.id)}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        AllMediaGenre: state.Home.AllMediaGenre,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        smallSpinner: bindActionCreators(CreateFields.smallSpinner, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSingle);
