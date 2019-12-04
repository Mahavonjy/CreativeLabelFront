import React, { Component } from "react";
import axios from "axios";
import './music_genres.css';
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import { ToastContainer, toast } from 'react-toastify';
const cookies = new Cookies();

class SongGenre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: false, isNotMatch : false, first_array:[], second_array: [], isMounted: false
        };
    }

    componentDidMount() {
        this.setState({isMounted: true}, () => {
            toast.warn("Veuillez choisir au moins 5 genres");
            this.addToArray();
        });
    }

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
        }).catch(error =>{
            toast.error(error.response.data);
        })
    };

    sendToApi = () => {
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
                    window.location.replace('/home');
                }).catch(error =>{
                    toast.error(error.response.data);
                })
            } else {
                toast.error("not token");
            }
        }
    };

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="MusicChoiceTitle">
                <ToastContainer/>
                <h1>What kind of music love you ?</h1>
                <button className="send-genre" onClick={this.sendToApi}>Valider</button>
                <div className="row-genre pb-lg-5">
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

export default SongGenre;
