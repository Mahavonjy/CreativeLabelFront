import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import Cookies from "universal-cookie";
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import logo from "../../../images/Logo/ISL_logo.png"
import { ToastContainer, toast } from 'react-toastify';

let cookies = new Cookies();
class AddSingle extends Component {
    constructor (props) {
        super(props);
        this.state = {
            file: '',
            title: '',
            artist: cookies.get("Isl_Creative_pass")["name"],
            genre: '',
            genre_musical: 'beats',
            description: '',
            photo: '',
            artist_tag: '',
            beats_wave: '',
            stems: '',
            beats: true,
            genre_info: [],
            bpm : 0
        };
    }

    componentDidMount() {
        this.getIfToken();
    }

    getIfToken = () => {
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass")
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: new_headers}).then(resp =>{
                    const info = resp.data;
                    for(let row in info){
                        this.setState(prevState => ({
                            genre_info: [...prevState.genre_info, info[row].genre]
                        }))
                    }
                    console.log(this.state.genre_info);

                }).catch(err => {
                    console.log(err.response)
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    changeTitle = (e) => {this.setState({title : e.target.value});};

    changeBpm = (e) => {this.setState({bpm : e.target.value});};

    changeArtist = (e) => {this.setState({artist : e.target.value});};

    changeArtistTag = (e) => {this.setState({artist_tag : e.target.value});};

    changeGenre = (e) => {this.setState({genre : e.target.value});};

    changeGenreMusical = (e) => {
        this.setState({genre_musical : e.target.value});
        if (e.target.value === "beats"){
            this.setState({beats: true});
        } else {
            this.setState({beats: false});
        }
    };

    changeDescription = (e) => {this.setState({description : e.target.value});};

    uploadFile = (e) => {this.setState({file : e.target.files[0]})};

    uploadWaveFile = (e) => {this.setState({beats_wave : e.target.files[0]})};

    uploadStemsFile = (e) => {this.setState({stems : e.target.files[0]})};

    uploadPic = (e) =>{
        let picture = e.target.files[0];
        this.setState({
            photo : picture
        });
    };

    disabledBtn = (e) => {
        this.setState({loading: false});
        document.getElementById(e.target.id).removeAttribute("disabled");
    };

    handleSubmit = (e) => {
        document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        const bodyFormData = new FormData();
        if (this.state.genre_musical === "beats" && !this.state.beats_wave) {
            toast.error("i need beats wave file");
            this.disabledBtn(e)
        } else if (this.state.genre_musical === "beats" && !this.state.stems) {
            toast.error("i need beats stems file");
            this.disabledBtn(e)
        } else if (!this.state.file) {
            toast.error("i need music file");
            this.disabledBtn(e)
        } else if (!this.state.title) {
            toast.error("title is required");
            this.disabledBtn(e)
        } else if (!this.state.artist) {
            toast.error("artist is required");
            this.disabledBtn(e)
        } else if (!this.state.genre) {
            toast.error("genre is required");
            this.disabledBtn(e)
        } else if (!this.state.photo) {
            toast.error("photo is required");
            this.disabledBtn(e)
        } else {
            let link = "";
            if (this.state.genre_musical === "beats") {
                bodyFormData.append('beats_wave', this.state.beats_wave);
                bodyFormData.append('stems', this.state.stems);
                link = "api/beats/uploadBeat"
            } else {
                link = "api/medias/uploadMedia"
            }
            bodyFormData.append('file', this.state.file);
            bodyFormData.append('title', this.state.title);
            bodyFormData.append('bpm', this.state.bpm);
            bodyFormData.append('artist', this.state.artist);
            bodyFormData.append('artist_tag', this.state.artist_tag);
            bodyFormData.append('genre', this.state.genre);
            bodyFormData.append('genre_musical', this.state.genre_musical);
            bodyFormData.append('description', this.state.description);
            bodyFormData.append('photo', this.state.photo);

            let new_headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.post(Conf.configs.ServerApi + link, bodyFormData, {headers: new_headers}).then(resp => {
                    this.setState({loading: false});
                    this.props.closePopup(1);
                }).catch(err => {
                    toast.error(err.response.data);
                });
            }).catch(err => {
                toast.error(err.response.data)
            })
        }
    };

    render() {
        return (
            <Modal visible={true} width="700" height="850" animationType='slide'>
                <ToastContainer position="bottom-center"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnVisibilityChange
                                draggable
                                pauseOnHover/>
                {this.state.loading ?
                    <div className="preloader-wrapper small active" style={{position: "absolute", right: 0}}>
                        <div className="spinner-layer spinner-yellow-only">
                            <div className="circle-clipper left">
                                <div className="circle"/>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"/>
                            </div>
                        </div>
                    </div>: null}
                <img alt={"logo"} src={logo} style={{position: "absolute", marginTop: "15%", opacity:0.4}}/>
                <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                    <button className="ModalClose" onClick={() => this.props.closePopup(0)}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">upload your beat</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-text-width"/>title *</div>
                                    <input value={this.state.title} onChange={this.changeTitle} id="title" name="title"
                                           className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-user"/>artist *</div>
                                    <input value={this.state.artist} onChange={this.changeArtist} id="artist"
                                           name="artist" className="form-control" type="text" required disabled={true}/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-user"/>artist tag</div>
                                    <input value={this.state.artist_tag} onChange={this.changeArtistTag} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-text-width"/>genre *</div>
                                    <input id="genre" name="genre" className="form-control"
                                           value={this.state.genre} onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-text-width"/>type</div>
                                    <input id="type" name="type" className="form-control"
                                           value={this.state.genre_musical} onChange={this.changeGenreMusical}
                                           list="music-type" required disabled/>
                                    <datalist id="music-type">
                                        <option value="music">music</option><option value="beats">beats</option>
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-crosshairs"/>description</div>
                                    <textarea value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" placeholder={"Add text"}/>
                                </div>
                            </div>
                            {this.state.beats ?
                                <div className="custom-float">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text text-dark"><i className="icon-stack-exchange"/>bpm</div>
                                        <input value={this.state.bpm} onChange={this.changeBpm}
                                               id="bpm" name="bpm" className="form-control" type="number"/>
                                    </div>
                                </div>
                                :null}
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-picture-o"/>photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text text-dark"><i className="icon-music"/>mp3 *</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture"
                                           className="form-control" type="file"  required/>
                                </div>
                            </div>
                            {this.state.beats ?
                                <div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text text-dark"><i className="icon-music"/>wave_file *</div>
                                            <input onChange={this.uploadWaveFile} id="wave" name="wave"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text text-dark"><i className="icon-music"/>stems_folder</div>
                                            <input onChange={this.uploadStemsFile} id="stems" name="stems"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                </div>
                                :null}
                            <button id="add-music" className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e)=> this.handleSubmit(e)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default AddSingle;
