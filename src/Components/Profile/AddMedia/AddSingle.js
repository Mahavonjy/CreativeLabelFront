import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import Cookies from "universal-cookie";
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import logo from "../../../images/Logo/ISL_logo.png"
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import {connect} from "react-redux";

let cookies = new Cookies();
let new_headers;
class AddSingle extends Component {
    Type;
    constructor (props) {
        super(props);
        this.state = {
            file: '', title: '', artist: cookies.get("Isl_Creative_pass")["name"], genre: '',
            genre_musical: 'beats', description: '', photo: '', artist_tag: '', beats_wave: '', stems: '',
            beats: true, genre_info: [], bpm: 0, basic_price: this.props.pricing['basic']['south'],
            silver_price: this.props.pricing['silver']['south'], gold_price: this.props.pricing['gold']['south'],
            platinum_price: 0
        };
    }

    componentDidMount() {
        this.getIfToken();
    }

    getIfToken = () => {
        if (cookies.get("Isl_Creative_pass")) {
            new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: new_headers}).then(resp =>{
                    const info = resp.data;
                    for (let row in info) {
                        this.setState(prevState => ({
                            genre_info: [...prevState.genre_info, info[row].genre]
                        }))
                    }
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

    uploadPic = (e) =>{this.setState({photo : e.target.files[0]});};

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
                bodyFormData.append('basic_price', this.state.basic_price);
                bodyFormData.append('silver_price', this.state.silver_price);
                bodyFormData.append('gold_price', this.state.gold_price);
                bodyFormData.append('platinum_price', this.state.platinum_price);
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

    ChangeStyle = (e) => {
        const id = e.target.id;
        if (id  === "basic_north" || id  === "north_basic") {
            this.setState({basic_price: this.props.pricing['basic']['north']}, () => {
                document.getElementById("basic_north").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("basic_south").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "basic_south" || id === "south_basic") {
            this.setState({basic_price: this.props.pricing['basic']['south']}, () => {
                document.getElementById("basic_south").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("basic_north").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "silver_north" || id === "north_silver") {
            this.setState({silver_price: this.props.pricing['silver']['north']}, () => {
                document.getElementById("silver_north").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("silver_south").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "silver_south" || id === "south_silver") {
            this.setState({silver_price: this.props.pricing['silver']['south']}, () => {
                document.getElementById("silver_south").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("silver_north").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "gold_north" || id === "north_gold") {
            this.setState({gold_price: this.props.pricing['gold']['north']}, () => {
                document.getElementById("gold_north").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("gold_south").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "gold_south" || id === "south_gold") {
            this.setState({gold_price: this.props.pricing['gold']['south']}, () => {
                document.getElementById("gold_south").classList.replace('unique-color-dark', 'success-color');
                document.getElementById("gold_north").classList.replace('success-color', 'unique-color-dark');
            });
        } else if (id  === "platinum_north" || id === "north_platinum") {
            if (document.getElementById("platinum_north").classList.replace('unique-color-dark', 'success-color')) {
                this.setState({platinum_price: this.props.pricing['platinum']['north']}, () => {
                    document.getElementById("platinum_south").classList.replace('success-color', 'unique-color-dark')
                });
            } else {
                this.setState({platinum_price: 0}, () => {
                    document.getElementById("platinum_north").classList.replace('success-color', 'unique-color-dark')
                });
            }
        } else if (id  === "platinum_south" || id === "south_platinum") {
            if (document.getElementById("platinum_south").classList.replace('unique-color-dark', 'success-color')) {
                this.setState({platinum_price: this.props.pricing['platinum']['south']}, () => {
                    document.getElementById("platinum_north").classList.replace('success-color', 'unique-color-dark')
                });
            } else {
                this.setState({platinum_price: 0}, () => {
                    document.getElementById("platinum_south").classList.replace('success-color', 'unique-color-dark')
                });
            }
        }
    };

    render() {
        return (
            <Modal visible={true} width="700" height="850" animationType='slide'>
                <ReactTooltip/>
                <ReactTooltip className="special-color-dark" id='basic_price' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Basic Lease (MP3) </h5>
                    <small>• Receive untagged MP3 file</small><br/>
                    <small>• Non-profit & promotional use only</small><br/>
                    <small>• Upload to Soundcloud</small><br/>
                    <small>• Use for non-profit Album + Performances</small><br/>
                    <small>• Limited to 10,000 non-profitable streams</small><br/>
                    <small>• Instant delivery</small><br/>
                    <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
                </ReactTooltip>
                <ReactTooltip className="special-color-dark" id='silver_price' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Silver Lease (MP3 + WAVE) </h5>

                    <small>• Receive untagged MP3 + WAV files</small><br/>
                    <small>• Profitable – Sell up to 10,000 unit sales</small><br/>
                    <small>• Upload to Soundcloud, Apple Music, iTunes , Spotify</small><br/>
                    <small>• Use for profit Album + Performances + Music Video</small><br/>
                    <small>• Limited to 100,000 streams</small><br/>
                    <small>• Radio & TV airplays on 3 stations</small><br/>
                    <small>• Instant delivery</small><br/>
                    <small>• Must credits : Prod. by [Name of Producer] / ISL Creative</small>
                </ReactTooltip>
                <ReactTooltip className="special-color-dark" id='gold_price' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Gold Lease (MP3 + WAVE + STEMS) </h5>

                    <small>• Receive untagged MP3 + WAV files+ Tracked-Out files/Stems</small><br/>
                    <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                    <small>• Includes the Silver Lease  features</small><br/>
                    <small>• Limited to 200,000 streams</small><br/>
                    <small>• Unlimited Radio & TV airplays</small><br/>
                    <small>• Instant Delivery</small><br/>
                    <small>• Must credits : Prod.by [Name of Producer] / ISL Creative</small>
                </ReactTooltip>
                <ReactTooltip className="special-color-dark" id='platinum_price' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Platinum Lease (Unlimited + Exclusive) </h5>

                    <small>• Receive untagged MP3 + WAV files + Tracked-Out files/Stems</small><br/>
                    <small>• Possibility to mix and re-arrange with stems (trackouts)</small><br/>
                    <small>• Unlimited profitable sales + streams (iTunes, Spotify  etc.)</small><br/>
                    <small>• Use for unlimited profit Album + Performances + Music Video</small><br/>
                    <small>• Unlimited TV broadcast + Radio airplay</small><br/>
                    <small>• Credits : Prod. by [Name of Producer] / Beats Avenue</small>
                </ReactTooltip>
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
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="Your beats title"><i className="icon-text-width"/>&nbsp;	title *</div>
                                    <input value={this.state.title} onChange={this.changeTitle} id="title" name="title"
                                           className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="Your artist name"><i className="icon-user"/>&nbsp;	artist *</div>
                                    <input value={this.state.artist} onChange={this.changeArtist} id="artist"
                                           name="artist" className="form-control" type="text" required disabled={true}/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text center text-dark" data-tip="if you want tag an artist"><i className="icon-user"/>&nbsp;	artist tag</div>
                                    <input value={this.state.artist_tag} onChange={this.changeArtistTag} id="artist"
                                           name="artist" className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="Your beats genre"><i className="icon-text-width"/>&nbsp;	genre *</div>
                                    <input id="genre" name="genre" className="form-control"
                                           value={this.state.genre} onChange={this.changeGenre} list="music-genre" required/>
                                    <datalist id="music-genre">
                                        {this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="For now, it's only beats type"><i className="icon-text-width"/>&nbsp;	type</div>
                                    <input id="type" name="type" className="form-control"
                                           value={this.state.genre_musical} onChange={this.changeGenreMusical}
                                           list="music-type" required disabled/>
                                    <datalist id="music-type">
                                        <option value="music">music</option>
                                        <option value="beats">beats</option>
                                    </datalist>
                                </div>
                                {this.state.beats ?
                                    <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                        <div className="input-group-text text-dark" data-tip="Your beats bpm"><i className="icon-stack-exchange"/>&nbsp;	bpm</div>
                                        <input value={this.state.bpm} onChange={this.changeBpm}
                                               id="bpm" name="bpm" className="form-control" type="number"/>
                                    </div>
                                    :null}
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="Upload here your beats_name.mp3"><i className="icon-music"/>&nbsp;	mp3 *</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture"
                                           className="form-control" type="file"  required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text text-dark" data-tip="Upload here your beats photo"><i className="icon-picture-o"/>&nbsp; photo</div>
                                    <input onChange={this.uploadPic} id="picture" name="picture"
                                           className="form-control" type="file" required/>
                                </div>
                            </div>
                            {this.state.beats ?
                                <div>
                                    <div className="custom-float">
                                        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                            <div className="input-group-text text-dark" data-tip="Upload here your beats_name.wave"><i className="icon-music"/>&nbsp;	wave_file *</div>
                                            <input onChange={this.uploadWaveFile} id="wave" name="wave"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                        <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                            <div className="input-group-text text-dark" data-tip="Upload here your beats stems"><i className="icon-music"/>&nbsp;	stems_folder</div>
                                            <input onChange={this.uploadStemsFile} id="stems" name="stems"
                                                   className="form-control" type="file"  required/>
                                        </div>
                                    </div>
                                </div>
                                :null}
                            {this.state.beats ?
                                <div style={{display: "flex"}}>
                                    <div className="custom-float center" style={{width: "100%"}}>
                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark font-weight-bold" data-tip data-for='basic_price'><i className="icon-money"/>basic<small className="text-danger">*</small></div>
                                            <div className="input-group-text text-light unique-color-dark" id="basic_north">
                                                <p className="center" id="north_basic" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['basic']['north']} $
                                                </p>
                                            </div>
                                            <div className="input-group-text text-light success-color" id="basic_south">
                                                <p className="center" id="south_basic" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['basic']['south']} $
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-float center" style={{width: "100%"}}>
                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark font-weight-bold" data-tip data-for='silver_price'><i className="icon-money"/>silver<small className="text-danger">*</small></div>
                                            <div className="input-group-text text-light unique-color-dark" id="silver_north">
                                                <p className="center" id="north_silver" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['silver']['north']} $
                                                </p>
                                            </div>
                                            <div className="input-group-text text-light success-color" id="silver_south">
                                                <p className="center" id="south_silver" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['silver']['south']} $
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-float center" style={{width: "100%"}}>
                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark font-weight-bold" data-tip data-for='gold_price'><i className="icon-money"/>gold<small className="text-danger">*</small></div>
                                            <div className="input-group-text text-light unique-color-dark" id="gold_north">
                                                <p className="center" id="north_gold" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['gold']['north']} $
                                                </p>
                                            </div>
                                            <div className="input-group-text text-light success-color" id="gold_south">
                                                <p className="center" id="south_gold" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['gold']['south']} $
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="custom-float center" style={{width: "100%"}}>
                                        <div className="input-group-prepend d-inline-block center">
                                            <div className="input-group-text text-dark font-weight-bold" data-tip data-for='platinum_price'>platinum</div>
                                            <div className="input-group-text text-light unique-color-dark" id="platinum_north">
                                                <p className="center" id="north_platinum" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['platinum']['north']} $
                                                </p>
                                            </div>
                                            <div className="input-group-text text-light unique-color-dark" id="platinum_south">
                                                <p className="center" id="south_platinum" onClick={(e) => this.ChangeStyle(e)}>
                                                    {this.props.pricing['platinum']['south']} $
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                :null}
                            <div className="custom-float">
                                <div className="input-group-prepend center" style={{width: "90%"}}>
                                    <div className="input-group-text text-dark" data-tip="If you want to add an description for you beats"><i className="icon-crosshairs"/>&nbsp;	description</div>
                                    <textarea value={this.state.description} onChange={this.changeDescription}
                                              id="description" name="description" className="form-control" placeholder={"Add text"}/>
                                </div>
                            </div>
                            <button id="add-music" className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e)=> this.handleSubmit(e)}>Add</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        pricing: state.profile.pricing_beats,
    };
};

export default connect(mapStateToProps, null)(AddSingle);
