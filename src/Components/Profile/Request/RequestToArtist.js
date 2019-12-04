import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import Cookies from "universal-cookie";
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
const cookies = new Cookies();

class RequestToArtist extends Component {
    constructor (props) {
        super(props);
        this.state = {
            photo: '',
            loading: false,
            name: this.props.ProfileName,
            artist_name: '',
            year_of_experience: '',
            first_song_extract: '',
            second_song_extract: '',
            third_song_extract: '',
            facebook_network: '',
            instagram_network: '',
            twitter_network: '',
        };
    }

    changeArtistName = (e) => {this.setState({artist_name : e.target.value});};

    changeYearOfExperience = (e) => {this.setState({year_of_experience : e.target.value});};

    changeFacebook = (e) => {this.setState({facebook_network : e.target.value});};

    changeInstagram = (e) => {this.setState({instagram_network : e.target.value});};

    changeTwitter = (e) => {this.setState({twitter_network : e.target.value});};

    uploadFirstSong = (e) =>{this.setState({first_song_extract : e.target.files[0]});};

    uploadSecondSong = (e) =>{this.setState({second_song_extract : e.target.files[0]});};

    uploadThirdSong = (e) =>{this.setState({third_song_extract : e.target.files[0]});};

    disabledBtn = (e) => {
        this.setState({loading: false});
        document.getElementById(e.target.id).removeAttribute("disabled");
    };

    handleSubmit = (e) => {
        // document.getElementById(e.target.id).setAttribute("disabled", "disabled");
        // this.setState({loading: true});
        // if (!this.state.artist_name) {
        //     toast.error("Artist name is required");
        //     this.disabledBtn(e)
        // } else if (!this.state.year_of_experience) {
        //     toast.error("Year of experience is required");
        //     this.disabledBtn(e)
        // } else if (!this.state.first_song_extract && !this.state.second_song_extract && !this.state.third_song_extract) {
        //     toast.error("we need at least one sample");
        //     this.disabledBtn(e)
        // } else if (!this.state.facebook_network && !this.state.instagram_network && !this.state.twitter_network) {
        //     toast.error("we need at least one social network");
        //     this.disabledBtn(e)
        // } else {
        //     const bodyFormData = new FormData();
        //     bodyFormData.append('name', this.state.name);
        //     bodyFormData.append('artist_name', this.state.artist_name);
        //     bodyFormData.append('year_of_experience', this.state.year_of_experience);
        //     bodyFormData.append('first_song_extract', this.state.first_song_extract);
        //     bodyFormData.append('second_song_extract', this.state.second_song_extract);
        //     bodyFormData.append('third_song_extract', this.state.third_song_extract);
        //     bodyFormData.append('facebook_network', this.state.facebook_network);
        //     bodyFormData.append('instagram_network', this.state.instagram_network);
        //     bodyFormData.append('twitter_network', this.state.twitter_network);
        //
        //     let new_headers = {
        //         'Content-Type': 'multipart/form-data',
        //         'Access-Control-Allow-Origin': "*",
        //         'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        //     };
        //     axios.post(Conf.configs.ServerApi + "api/requests/RequestToBeArtist", bodyFormData, {headers: new_headers}).then(resp => {
        //         this.setState({loading: false});
        //         this.props.Success();
        //     }).catch(err => {
        //         toast.error(err.response.data)
        //     })
        // }
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.put(Conf.configs.ServerApi + "api/users/update_user_to/beatmaker", {}, {headers: new_headers}).then(resp => {
            this.setState({loading: false});
            this.props.Success();
        }).catch(err => {
            toast.error(err.response.data)
        })
    };

    render() {
        return (
            <Modal visible={true} width="300" height="100" animationType='slide'>
                <ToastContainer/>
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
                    <button className="ModalClose" onClick={() => this.props.CloseRequest()}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Become a BeatMaker ? </h4>
                        <div className="body">
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-user"/>name</div>*/}
                            {/*        <input value={this.state.name} id="name" name="name" placeholder="name"*/}
                            {/*               className="form-control" type="text" disabled/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-user"/>artist_name</div>*/}
                            {/*        <input value={this.state.artist_name} onChange={this.changeArtistName}*/}
                            {/*               id="artist_name" name="artist_name" className="form-control" type="text"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-facebook"/>facebook</div>*/}
                            {/*        <input value={this.state.facebook_network} onChange={this.changeFacebook}*/}
                            {/*               id="facebook" name="facebook" className="form-control" type="text"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-user"/>twitter</div>*/}
                            {/*        <input value={this.state.twitter_network} onChange={this.changeTwitter}*/}
                            {/*               id="twitter" name="twitter" className="form-control" type="text"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-user"/>instagram</div>*/}
                            {/*        <input value={this.state.instagram_network} onChange={this.changeInstagram}*/}
                            {/*               id="instagram" name="instagram" className="form-control" type="text"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-joomla"/>year_of_experience</div>*/}
                            {/*        <input value={this.state.year_of_experience} onChange={this.changeYearOfExperience}*/}
                            {/*               id="year_of_experience" name="year_of_experience" className="form-control" type="number"/>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-music"/>first_song_samples</div>*/}
                            {/*        <input onChange={this.uploadFirstSong} id="first_song_samples" name="first_song_samples" className="form-control" type="file" />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-music"/>second_song_samples</div>*/}
                            {/*        <input onChange={this.uploadSecondSong} id="second_song_samples" name="second_song_samples" className="form-control" type="file" />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*<div className="custom-float">*/}
                            {/*    <div className="input-group-prepend">*/}
                            {/*        <div className="input-group-text"><i className="icon-music"/>third_song_samples</div>*/}
                            {/*        <input onChange={this.uploadThirdSong} id="third_song_samples" name="third_song_samples" className="form-control" type="file" />*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <button id="become-to-artist"
                                    className="btn btn-outline-danger btn-sm pl-4 pr-4"
                                    style={{fontSize: 15}}
                                    onClick={() => this.props.CloseRequest()}>
                                    No
                            </button>
                            <button id="become-to-artist"
                                    className="btn btn-outline-success btn-sm pl-4 pr-4"
                                    style={{fontSize: 15}}
                                    onClick={(e) => this.handleSubmit(e)}>
                                    Yes
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

export default RequestToArtist;
