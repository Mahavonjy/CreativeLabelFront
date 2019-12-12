import React, { Component } from "react";
import axios from "axios";
import './music_genres.css';
import Conf from "../../Config/tsconfig";
import { ToastContainer, toast } from 'react-toastify';

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

class Preference extends Component {
    constructor(props) {
        super(props);
        this.state = {
            button: false, isNotMatch : false, first_array:[], second_array: [], isMounted: false
        };
    }

    componentDidMount() {
        this.setState({isMounted: true}, () => {
            toast.warn("Veuillez choisir au moins 5 genres");
            this.addAllMediaGenreToArray()
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

    addAllMediaGenreToArray = () => {

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

    sendUserGenreToApi = () => {

        let user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
        headers['Isl-Token'] = user_credentials.token;
        let user_genre_tmp = [];
        for (let row in this.state.first_array) {
            if (this.state.first_array[row][1]) user_genre_tmp.push(this.state.first_array[row][2].genre)
        }
        if (user_genre_tmp.length < 5) {
            toast.warn("Veuillez choisir au moins 5 genres");
        } else {
            let data = {"user_genre_list": user_genre_tmp};
            axios.post(Conf.configs.ServerApi + "api/medias/add_users_genre", data,{headers:headers}).then(response =>{
                window.location.replace("/beats")
            }).catch(error => {
                toast.error(error.response.data);
            })
        }
    };

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="MusicChoiceTitle">
                <ToastContainer/>
                <h1>Quelle genre de musique aimiez vous ?</h1>
                <button className="send-genre" onClick={this.sendUserGenreToApi}>Valider</button>
                <div className="row-genre pb-lg-5">
                    {this.state.first_array.map((all_music_genres, index) =>
                        <div className="music-genre" key={index} style={{background: `${all_music_genres[0]}`}}>
                            <div className="top" onClick={() => {this.BooleanToChange(index)}}
                                 style={{backgroundImage: `url(${all_music_genres[2].image})`}}>
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

export default Preference;
