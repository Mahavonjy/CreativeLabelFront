import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast, ToastContainer} from 'react-toastify';
import {changeUserGenreSelected, setValueOfToastGlobal} from "../functionTools/functionProps";
import '../../assets/css/music_genres.css';

function Preference(props) {

    const dispatch = useDispatch();
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

    const sendUserGenreToApi = async () => {
        dispatch(setValueOfToastGlobal(false));
        let user_genre_tmp = [];
        for (let row in first_array) if (first_array[row][1]) user_genre_tmp.push(first_array[row][2].genre);
        if (user_genre_tmp.length === 0) {
            toast.warn("Veuillez choisir au moins une");
        } else {
            let data = {"user_genre_list": user_genre_tmp};
            axios.post("api/medias/add_users_genre", data, {headers: props.headers}).then(() => {
                toast.success("Votre choix a été prise en compte");
                setTimeout(() => {
                    dispatch(changeUserGenreSelected());
                    dispatch(setValueOfToastGlobal(true));
                    props.setPreference(false)
                }, 2000);
            }).catch(error => {
                toast.error(error.response.data);
            })
        }
    };

    useEffect(() => {

        for (let row in AllMediaGenre) {
            setFirstArray(first_array => [...first_array, ["#9DA6B1", false, {
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
            <h2 className="p-2 bolder">Quelle genre de musique aimiez vous ?</h2>
            <button className="send-genre btn btn-outline-light pl-5 pr-5" onClick={() => sendUserGenreToApi()}>
                Valider
            </button>
            <div className="row lo justify-content-center">
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
