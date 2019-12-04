import React, {Component} from "react";
import Cookies from "universal-cookie";
import axios from 'axios';
import Conf from "../../../Config/tsconfig";
import {toast, ToastContainer} from "react-toastify";
import Modal from 'react-awesome-modal';
import {connect} from "react-redux";

class EditAlbum extends Component {
    constructor (props) {
        super(props);
        this.state = {
            file: null, album_name: this.props.Album['album_name'], artist: this.props.Album['artist'], loading: false,
            genre: this.props.Album['genre'], genre_musical: this.props.Album['genre_musical'],
            description: this.props.Album['description'], photo: null, price: '', beats: false
        };
    }

    changeAlbumName = (e) => {this.setState({album_name : e.target.value});};

    changeArtist = (e) => {this.setState({artist : e.target.value});};

    changeGenre = (e) => {this.setState({genre : e.target.value});};

    changeGenreMusical = (e) => {
        this.setState({genre_musical : e.target.value});
        if (e.target.value === 'beats') {
            this.setState({beats: true});
        } else {
            this.setState({beats: false});
        }
    };

    changeDescription = (e) => {this.setState({description : e.target.value});};

    uploadFile = (e) =>{
        let file = e.target.files[0];
        this.setState({file : file});
    };

    uploadPic = (e) =>{
        let picture = e.target.files[0];
        this.setState({photo : picture});
    };

    changePrice = (e) => {this.setState({price : e.target.value});};

    disabledBtn = (e) => {
        this.setState({loading: false});
        document.getElementById(e.target.id).removeAttribute("disabled");
    };

    handleSubmit = (e) => {
        document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        let cookies = new Cookies();
        if (!this.state.album_name) {
            toast.error("album name is required");
            this.disabledBtn(e)
        } else if (!this.state.artist) {
            toast.error("artist is required");
            this.disabledBtn(e)
        } else if (!this.state.genre) {
            toast.error("genre is required");
            this.disabledBtn(e)
        } else {
            const bodyFormData = new FormData();
            bodyFormData.append('file', this.state.file);
            bodyFormData.append('album_name', this.state.album_name);
            bodyFormData.append('artist', this.state.artist);
            bodyFormData.append('genre', this.state.genre);
            bodyFormData.append('genre_musical', this.state.genre_musical);
            bodyFormData.append('description', this.state.description);
            bodyFormData.append('price', this.state.price);
            bodyFormData.append('photo', this.state.photo);

            let new_headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.put(Conf.configs.ServerApi + "api/albums/update/"+e.target.id, bodyFormData, {headers: new_headers}).then(resp => {
                this.setState({loading: false});
                this.props.Success();
            }).catch(err => {
                toast.error(err.response.data)
            })
        }
    };


    render() {
        return (
            <Modal visible={true} width="700" height="600" animationType='slide'>
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
                    <button className="ModalClose" onClick={() => this.props.CloseEdit()}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Edit album</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-albums"/>album_name</div>
                                    <input value={this.state.album_name} onChange={this.changeAlbumName}
                                           id="album_name" name="album_name" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-user-plus"/>artist</div>
                                    <input value={this.state.artist} onChange={this.changeArtist} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-genderless"/>genre</div>
                                    <input id="genre" name="genre" className="form-control" value={this.state.genre}
                                           onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.props.AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-tabs"/>type</div>
                                    <input id="type" name="type" className="form-control"
                                           value={this.state.genre_musical} onChange={this.changeGenreMusical} list="music-type" required/>
                                    <datalist id="music-type">
                                        <option value="music">music</option><option value="beats">beats</option>
                                    </datalist>
                                </div>
                            </div>
                            {this.state.beats ?
                                <div className="custom-float">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="icon-genderless"/>price</div>
                                        <input value={this.state.price} onChange={this.changePrice}
                                               id="price" name="price" className="form-control" type="number"/>
                                    </div>
                                </div>: null}
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-deaf"/>description</div>
                                    <input value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" type="text"/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-picture-o"/>album file</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-picture-o"/>album photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <button id={this.props.Album['id']} className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e)=> this.handleSubmit(e)}>Add</button>
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

export default connect(mapStateToProps, null)(EditAlbum);
