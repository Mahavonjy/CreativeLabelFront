import React, { Component } from "react";
import axios from "axios";
import './music_genres.css';
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class SongGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: false, button: false,
            isNotMatch : false, loading: false,
            errorMessage: 'Choice maximum',
            first_array:[], second_array: [],
            redirect_to: '/'
        };
    }

    componentDidMount() {
        this.setState({loading : true});
        this.addToArray();
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
                axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: new_headers}).then(resp =>{
                    this.setState({redirect: true});
                }).catch(err =>{
                    toast.warn("chosen at least 5 types");
                })
            }).catch(err => {
                toast.warn("chosen at least 5 types");
            })
        } else {
            this.setState({redirect_to: "/login"}, () => {this.setState({redirect: true})})
        }
    };

    BooleanToChange = (index) => {
        if (this.state.first_array[index][0] === "#9DA6B1") {
            this.state.first_array[index][0] = "darkolivegreen";
            this.state.first_array[index][1] = true;
        } else if (this.state.first_array[index][0] === "darkolivegreen") {
            this.state.first_array[index][0] = "#9DA6B1";
            this.state.first_array[index][1] = false;
        }
        let new_array = this.state.first_array;
        this.setState({array: new_array});
    };

    addToArray = () => {

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        };

        axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers:headers}).then(response =>{
            for (let row in response.data) {
                this.setState(prevState => ({
                    first_array: [...prevState.first_array, ["#9DA6B1", false,  {
                        "genre": response.data[row]["genre"],
                        "image": response.data[row]["image"],
                    }]]
                }))
            }
            this.setState({loading : false});
        }).catch(error =>{
            toast.error(error.response.data);
        })
    };

    sendToApi = () => {
        const cookies = new Cookies();
        let token = cookies.get("Isl_Creative_pass")["Isl_Token"];
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        let ex = [];
        for (let row in this.state.first_array) {
            if (this.state.first_array[row][1]) {
                ex[ex.length] = this.state.first_array[row][2].genre
            }
        }
        if (ex.length < 5) {
            toast.warn("Veuillez choisir au moins 5 genres");
        } else {
            let data = {"user_genre_list": ex};
            if (token) {
                axios.post(Conf.configs.ServerApi + "api/medias/add_users_genre", data,{headers:headers}).then(response =>{
                    this.setState({redirect: true});
                }).catch(error =>{
                    toast.error(error.response.data);
                })
            } else {
                toast.error("not token");
            }
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <div id="loader" className="loader">
                    <div className="loader-container">
                        <div className="preloader-wrapper big active">
                            <div className="spinner-layer spinner-blue">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-red">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-yellow">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>

                            <div className="spinner-layer spinner-green">
                                <div className="circle-clipper left">
                                    <div className="circle"/>
                                </div>
                                <div className="gap-patch">
                                    <div className="circle"/>
                                </div>
                                <div className="circle-clipper right">
                                    <div className="circle"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        if (this.state.redirect === true) {
            return <Redirect to={this.state.redirect_to} />
        } else {
            return (
                <div className="MusicChoiceTitle">
                    <ToastContainer/>
                    <h1>What kind of music love you?</h1>
                    <button className="send-genre" onClick={this.sendToApi}>Send</button>
                    <div className="row-genre">
                        {this.state.first_array.map((all_music_genres, index) =>
                            <div className="music-genre" key={index} style={{background: `${all_music_genres[0]}`}}>
                                <div className="top"
                                     onClick={() => {this.BooleanToChange(index)}}
                                     style={{backgroundImage: `url(${all_music_genres[2].image})`}}
                                >
                                    <div className="music-wrapper">
                                        <p className="heading">{all_music_genres[2].genre}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            );
        }
    }
}

export default SongGenre;
