import React, { Component } from "react";
import {toast, ToastContainer} from "react-toastify";
import Cookies from "universal-cookie";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import Modal from "react-awesome-modal";

class EditPlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            genre: this.props.data.genre,
            description: this.props.data.description,
            photo: '',
            genre_info: [],
            loading: false
        };
    }

    changeName = (e) => {this.setState({name : e.target.value});};

    changeGenre = (e) => {this.setState({genre : e.target.value});};

    changeDescription = (e) => {this.setState({description : e.target.value});};

    uploadPic = (e) =>{this.setState({photo :  e.target.files[0]});};

    handleSubmit = (e) => {
        document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        if (!this.state.name) {
            toast.error("i need playlist name");
            this.disabledBtn(e)
        } else {
            const cookies = new Cookies();
            const bodyFormData = new FormData();
            bodyFormData.append('name', this.state.name);
            bodyFormData.append('genre', this.state.genre);
            bodyFormData.append('description', this.state.description);
            bodyFormData.append('photo', this.state.photo);

            let new_headers = {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.put(Conf.configs.ServerApi + "api/playlists/update/" + e.target.id, bodyFormData, {headers: new_headers}).then(resp =>{
                this.setState({loading: false});
                this.props.closePopupSuccess();
            }).catch(err => {
                toast.error(err.response.data)
            })
        }
    };

    disabledBtn = (e) => {
        this.setState({loading: false});
        document.getElementById(e.target.id).removeAttribute("disabled");
    };

    getAllMediaGenre = () => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: new_headers}).then(resp => {
            for (let row in resp.data) {
                this.setState(prevState => ({
                    genre_info: [...prevState.genre_info, resp.data[row].genre]
                }))
            }
        }).catch(err => {
            toast.error(err.response.data)
        })
    };

    componentDidMount() {
        this.getAllMediaGenre();
    }

    render() {
        return (
            <Modal visible={true} width="500" height="350" animationType='slide'>
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
                    <button className="ModalClose" onClick={() => this.props.closePopup()}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Create Playlist</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-user"/>name</div>
                                    <input value={this.state.name} onChange={this.changeName}
                                           id="name" name="name" className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-genderless"/>genre</div>
                                    <input id="genre" name="genre" className="form-control" value={this.state.genre}
                                           onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-file-text"/>description</div>
                                    <input value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-picture-o"/>photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            <button id={this.props.data.id} className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e) => this.handleSubmit(e)}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default EditPlaylist;
