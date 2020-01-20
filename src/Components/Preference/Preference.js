import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import './music_genres.css';
import Conf from "../../Config/tsconfig";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";

let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

function Preference() {

    const AllMediaGenre = useSelector(state => state.Home.PrefAllMediaGenre);

    const isMounted = useRef(false);
    const [first_array, setFirstArray] = useState([]);

    const BooleanToChange = (index) => {
        let tmp_state = [...first_array];
        if (first_array[index][0] === "#9DA6B1") {
            tmp_state[index][0] = "darkolivegreen";
            tmp_state[index][1] = true;
        } else if (first_array[index][0] === "darkolivegreen") {
            tmp_state[index][0] = "#9DA6B1";
            tmp_state[index][1] = false;
        }
        setFirstArray(tmp_state);
    };

    const sendUserGenreToApi = () => {
        let user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
        headers['Isl-Token'] = user_credentials.token;
        let user_genre_tmp = [];
        for (let row in first_array) if (first_array[row][1]) user_genre_tmp.push(first_array[row][2].genre);
        if (user_genre_tmp.length < 5) {
            toast.warn("Veuillez choisir au moins 5 genres");
        } else {
            let data = {"user_genre_list": user_genre_tmp};
            axios.post(Conf.configs.ServerApi + "api/medias/add_users_genre", data,{headers:headers}).then(() =>{
                window.location.replace("/beats")
            }).catch(error => {
                toast.error(error.response.data);
            })
        }
    };

    useEffect(() => {
        toast.warn("Veuillez choisir au moins 5 genres");
        for (let row in AllMediaGenre) {
            setFirstArray(first_array => [...first_array, ["#9DA6B1", false,  {
                "genre": AllMediaGenre[row]["genre"],
                "image": AllMediaGenre[row]["image"],
            }]]);
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="MusicChoiceTitle">
            <ToastContainer/>
            <h1>Quelle genre de musique aimiez vous ?</h1>
            <button className="send-genre" onClick={() => sendUserGenreToApi}>Valider</button>
            <div className="row-genre pb-lg-5">
                {first_array.map((all_music_genres, index) =>
                    <div className="music-genre" key={index} style={{background: `${all_music_genres[0]}`}}>
                        <div className="top" onClick={() => BooleanToChange(index)}
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

export default Preference;
