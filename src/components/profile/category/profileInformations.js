import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import PhotoTest from "../../../assets/images/backgrounds/adult-banking-business-2254122.jpg";
import {profileInitialisationInfo} from "../../functionTools/functionProps";
import Preference from "../../preference/preference";
import {checkErrorMessage} from "../../validators/validatiors";
import EditProfile from "../edits/editProfile";

function ProfileInformation(props) {

    const dispatch = useDispatch();
    const notes = useSelector(state => state.profile.notes);
    const _profile_info = useSelector(state => state.profile.profile_info);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    const isMounted = useRef(false);
    const [edit, setEdit] = useState(false);
    const [profile_info, setProfileInfo] = useState(_profile_info);
    const [loadingPhoto, setLoadingPhoto] = useState(false);
    const [preference, setPreference] = useState(false);
    const cover_style = {
        background: "url(" + (
            profile_info["cover_photo"] &&
            profile_info["cover_photo"] !== "null"
                ? profile_info["cover_photo"]
                : PhotoTest) + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "100%",
        height: "150px"
    };

    const togglePopupEditProfile = async (success) => {
        setEdit(false);
        if (success) toast.success("profile mis a jour");
    };

    const updateProfilePhoto = (photo, cover_area, message) => {
        setLoadingPhoto(true);
        const bodyFormData = new FormData();
        bodyFormData.append('city', profile_info.city);
        bodyFormData.append('name', profile_info.name);
        bodyFormData.append('email', profile_info.email);
        bodyFormData.append('gender', profile_info.gender);
        bodyFormData.append('address', profile_info.address);
        bodyFormData.append('country', profile_info.country);
        bodyFormData.append('description', profile_info.description);
        bodyFormData.append('phone', profile_info.phone ? profile_info.phone : 0);
        bodyFormData.append('birth', profile_info.birth ? profile_info.birth : "1998-03-12");
        bodyFormData.append('cover_photo', cover_area ? cover_area : profile_info.cover_photo);
        bodyFormData.append('photo', photo ? photo : profile_info.photo);
        axios.put("api/profiles/updateProfile", bodyFormData, {headers: props.headers}).then(resp => {
            dispatch(profileInitialisationInfo(resp.data));
            setProfileInfo(resp.data)
            toast.success("photo " + message + " mis a jour");
            setLoadingPhoto(false);
        }).catch(error => {
            toast.error(checkErrorMessage(error).message);
            setLoadingPhoto(false);
        });
    };

    useEffect(() => {

        props.profileToRead && setProfileInfo(props.profileToRead)

        return () => {
            isMounted.current = true
        };
    }, [_profile_info]);

    return (
        <div className="container-fluid relative animatedParent animateOnce p-lg-3">
            {edit && <EditProfile headers={props.headers} closePopup={(e) => togglePopupEditProfile(e)}/>}

            {preference &&
            <Modal visible={true} width="70%" animationType='slide'>
                <div className="form-material bg-dark" style={{height: "100%", borderRadius: "5px"}}>
                    <button className="ModalClose" onClick={() => setPreference(false)}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    <div className="col text-center">
                        <div className="body">
                            <Preference headers={props.headers} setPreference={setPreference}/>
                        </div>
                    </div>
                </div>
            </Modal>}

            <div className="card no-b shadow no-r">
                <div className="row no-gutters">
                    <div className={lightModeOn ? "col-md-4" : "col-md-4"}>
                        {!loadingPhoto ?
                            <div className="text-center border border-light border-1" style={cover_style}>
                                <div className="cursor-pointer absolute ml-5">
                                    <input id="cover_area_file"
                                           type="file"
                                           accept="image/png, image/jpeg"
                                           className="input-file"
                                           onChange={(e) => {
                                               updateProfilePhoto(
                                                   null,
                                                   e.target.files[0],
                                                   "de couverture"
                                               )
                                           }}
                                    />
                                </div>
                                <i className="icon icon-camera-retro text-red s-36 relative float-right mr-3 mt-3"
                                   onClick={() => document.getElementById("cover_area_file").click()}
                                   data-tip="modifier la photo de couverture"/>
                                <figure className="avatar avatar-xxl border border-light border-1 mt-5 ml-5">
                                    <div className="hovereffect" style={{borderRadius: "100%"}}>
                                        <img alt="profile"
                                             src={profile_info.photo || "https://zupimages.net/up/19/18/3ltf.png"}
                                        />
                                        <div className="overlay zIndex99">
                                            <i className="icon icon-camera cursor-pointer s-36 text-red m-auto"
                                               onClick={() => document.getElementById("picture").click()}
                                               data-tip="modifier la photo de profile"/>
                                            <input id="picture"
                                                   accept="image/png, image/jpeg"
                                                   className="input-file"
                                                   type="file"
                                                   onChange={(e) => {
                                                       updateProfilePhoto(
                                                           e.target.files[0],
                                                           null,
                                                           "de profile"
                                                       );
                                                   }}
                                            />
                                        </div>
                                    </div>
                                </figure>
                            </div> :
                            <div className='text-center rounded-top text-danger'>
                                <div className='spinner-grow text-danger m-5 p-4' role='status'>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            </div>}

                        <div className="text-center mt-4">
                            <div className="pt-2">
                                <h4 className={lightModeOn
                                    ? "text-dark bg-transparent font-weight-bolder center pt-1"
                                    : "text-light bg-transparent font-weight-bolder center pt-1"}
                                    style={{
                                        width: "100%",
                                        fontFamily: "Arial"
                                    }}>
                                    {profile_info.name}
                                </h4>
                                <p className={lightModeOn
                                    ? "text-dark text-justify bg-transparent text-center pt-3"
                                    : "text-light text-justify bg-transparent text-center pt-3"}
                                >
                                    {!profile_info.description || (profile_info.description === "null")
                                        ? "Description ou Biographie vide"
                                        : profile_info.description}
                                </p>
                            </div>
                        </div>

                        {props.user_role !== "professional_auditor" ?
                            <div className="text-center mb-3">
                                    <span className="text-red">
                                        Note:&nbsp;{notes}&nbsp;
                                        <i className="icon-star-1"/>
                                    </span>
                            </div> : null}
                    </div>
                    <div className="col-md-8">
                        {!props.profileToRead &&
                        <div className="text-center">
                            <button type="button"
                                    className="btn btn-outline-danger dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                Plus d'outils
                            </button>
                            <div className="dropdown-menu">
                                <ul>
                                    <li className="dropdown-item" onClick={() => setEdit(true)}>
                                        <span className={lightModeOn ? "text-black" : ""}>
                                            Modifier le profile
                                        </span>
                                    </li>
                                    <li className="dropdown-item"
                                        onClick={() => props.setChoiceArtistTypeToChange(true)}>
                                        <span className={lightModeOn ? "text-black" : ""}>
                                            Voulez vous devenir artiste sur ISL ?
                                        </span>
                                    </li>
                                    <li className="dropdown-item">
                                        <span className={lightModeOn ? "text-black" : ""}>
                                            Changer de mot de passe
                                        </span>

                                    </li>
                                </ul>
                            </div>
                        </div>}

                        <div className="text-center">
                            <div className="mt-3">
                                <h3 className="text-red">Informations personnelles </h3>
                            </div>
                            <div className="row justify-content-center">
                                {[
                                    ['age', 'Age'],
                                    ['gender', 'Genre'],
                                    ['birth', 'Anniversaire'],
                                    ['country', 'Pays'],
                                    ['artist_name', "nom d'artist"],
                                    // props.profileToRead && ['created_at', 'Compte crée le'],
                                    !props.profileToRead && ['address', 'Adresse'],
                                    !props.profileToRead && ['city', 'Ville'],
                                    !props.profileToRead && ['phone', 'Téléphone'],
                                    !props.profileToRead && ['email', 'Email'],
                                ].map((val, index) =>
                                    (val[0] && val[1]) ?
                                        <div className="col-md-4" key={index}>
                                            <div className="p-4">
                                                <h5 className="text-red">{val[1]}</h5>
                                                {val[0] === "gender" ?
                                                    <span>
                                                        {profile_info[val[0]] ?
                                                            (parseInt(profile_info[val[0]])
                                                                ? "Homme" : "Femme")
                                                            : "Votre " + val[1]}
                                                    </span> :
                                                    <span>
                                                        {profile_info[val[0]] ?
                                                            profile_info[val[0]]
                                                            : "Votre " + val[1]}
                                                    </span>}
                                            </div>
                                        </div> : null)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInformation;
