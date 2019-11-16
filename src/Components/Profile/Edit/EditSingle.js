import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import Cookies from "universal-cookie";
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class EditSingle extends Component {
    Song;
    Success;
    constructor (props) {
        super(props);
        this.state = {
            file: null,
            title: this.props.Song.title,
            artist: this.props.Song.artist,
            genre: this.props.Song.genre,
            genre_musical: this.props.Song.genre_musical,
            description: this.props.Song.description,
            photo: null,
            artist_tag: this.props.Song.artist_tag,
            beats_wave: '',
            stems: '',
            bpm: 0,
            beats: false,
            genre_info: [],
        };
    }

    componentDidMount() {
        this.getIfToken();
    }

    getIfToken = () => {
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass");
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

    disabledBtn = (e) => {
        this.setState({loading: false});
        document.getElementById(e.target.id).removeAttribute("disabled");
    };

    handleSubmit = (e) => {
        document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        let cookies = new Cookies();
        const bodyFormData = new FormData();
        if (!this.state.title) {
            toast.error("title is required");
            this.disabledBtn(e)
        } else if (!this.state.artist) {
            toast.error("artist is required");
            this.disabledBtn(e)
        } else if (!this.state.genre) {
            toast.error("genre is required");
            this.disabledBtn(e)
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
            axios.put(Conf.configs.ServerApi + link + e.target.id, bodyFormData, {headers: new_headers}).then(resp => {
                this.setState({loading: false});
                this.props.Success();
                this.setState({modalActive: false})
            }).catch(err => {
                // toast.error(err.response.data)
                console.log(err.response)
            });
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
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <button className="ModalClose" onClick={this.props.CloseEdit}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Add single</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-text-width"/>title</div>
                                    <input value={this.state.title} onChange={this.changeTitle} id="title" name="title"
                                           className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-user"/>artist</div>
                                    <input value={this.state.artist} onChange={this.changeArtist} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-user"/>artist tag</div>
                                    <input value={this.state.artist_tag} onChange={this.changeArtistTag} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-text-width"/>genre</div>
                                    <input id="genre" name="genre" className="form-control"
                                           value={this.state.genre} onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-text-width"/>type</div>
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
                                    <div className="input-group-text"><i className="icon-crosshairs"/>description</div>
                                    <input value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" type="text"/>
                                </div>
                            </div>
                            {this.props.Type === "beats" ?
                                <div className="custom-float">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="icon-stack-exchange"/>bpm</div>
                                        <input value={this.state.bpm} onChange={this.changeBpm}
                                               id="bpm" name="bpm" className="form-control" type="number"/>
                                    </div>
                                </div>
                                :null}
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-music"/>single</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture"
                                           className="form-control" type="file"  required/>
                                </div>
                            </div>
                            {this.props.Type === "beats" ?
                                <div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="icon-music"/>wave</div>
                                            <input onChange={this.uploadWaveFile} id="wave" name="wave"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"><i className="icon-music"/>stems</div>
                                            <input onChange={this.uploadStemsFile} id="stems" name="stems"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                </div>
                                :null}
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-picture-o"/>photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <button id={this.props.Song.id} className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e)=> this.handleSubmit(e)}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default EditSingle;
