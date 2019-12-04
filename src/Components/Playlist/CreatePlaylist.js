import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import {toast, ToastContainer} from "react-toastify";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import axios from "axios";
import {connect} from "react-redux";

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            genre: '',
            description: '',
            photo: '',
            loading: false,
            isMounted: false
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
        } else if (!this.state.photo) {
            toast.error("photo is required");
            this.disabledBtn(e)
        } else {
            let cookies = new Cookies();
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
            axios.post(Conf.configs.ServerApi + "api/playlists/create", bodyFormData, {headers: new_headers}).then(resp =>{
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

    componentDidMount() {
        this.setState({isMounted: true});
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
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
                                        {this.props.AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}
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
                            <button id="add-album" className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e) => this.handleSubmit(e)}>Add</button>
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

export default connect(mapStateToProps, null)(CreatePlaylist);
