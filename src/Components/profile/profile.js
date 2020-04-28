import React, {memo, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {profileReadyBeats, profileUpdateBeats} from "../functionTools/functionProps";
import {DifferentArtist,} from "../functionTools/popupFields";
import {getMediaLink} from "../functionTools/tools";
import ProfileInformation from "./category/profileInformations";
import ProfileContent from "./category/profileContent";

const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*",
};

function Profile(props) {

    const dispatch = useDispatch();
    const artist_types = useSelector(state => state.Others.artist_types);
    const user_credentials = useSelector(state => state.Home.user_credentials);
    const ready_beats = useSelector(state => state.profile.ready_beats);
    const user_beats = useSelector(state => state.profile.user_beats);
    const user_role = useSelector(state => state.profile.role);

    const isMounted = useRef(false);
    const [user_beats_link, setUserBeatsLink] = useState([]);
    const [state_user_beats, setStateUserBeats] = useState(user_beats);
    const [choiceArtistType, setChoiceArtistType] = useState(false);
    const [addNewPrestation, setAddNewPrestation] = useState(false);
    const [choiceArtistTypeToChange, setChoiceArtistTypeToChange] = useState(false);
    const [addNewPrestationForNewArtist, setAddNewPrestationForNewArtist] = useState(false);

    useEffect(() => {

        headers['Isl-Token'] = user_credentials.token;
        headers['Content-Type'] = 'multipart/form-data';

        if (!ready_beats && user_beats.length !== 0) {
            getMediaLink(setUserBeatsLink, user_beats_link, user_beats, profileUpdateBeats, dispatch).then(() => null);
            dispatch(profileReadyBeats())
        } else if (user_beats.length !== 0) {
            for (let row_ in user_beats) setUserBeatsLink(user_beats_link => [...user_beats_link, {row: true}])
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base p-b-100">

            {choiceArtistType &&
            DifferentArtist(
                dispatch,
                setChoiceArtistType,
                artist_types,
                setAddNewPrestation
            )}

            {choiceArtistTypeToChange &&
            DifferentArtist(
                dispatch,
                setChoiceArtistTypeToChange,
                artist_types,
                setAddNewPrestationForNewArtist
            )}

            <ProfileInformation
                headers={headers}
                user_role={user_role}
                setChoiceArtistTypeToChange={setChoiceArtistTypeToChange}
            />

            <ProfileContent
                headers={headers}
                user_role={user_role}
                ToPlay={props.ToPlay}
                user_beats={user_beats}
                user_beats_link={user_beats_link}
                state_user_beats={state_user_beats}
                addNewPrestation={addNewPrestation}
                setUserBeatsLink={setUserBeatsLink}
                setStateUserBeats={setStateUserBeats}
                setAddNewPrestation={setAddNewPrestation}
                addNewPrestationForNewArtist={addNewPrestationForNewArtist}
                setAddNewPrestationForNewArtist={setAddNewPrestationForNewArtist}
            />
        </div>
    )
}

export default memo(Profile);
