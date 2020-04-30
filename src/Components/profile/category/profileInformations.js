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
    const profile_info = useSelector(state => state.profile.profile_info);

    const isMounted = useRef(false);
    const [edit, setEdit] = useState(false);
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
        backgroundSize: "80%",
        opacity: 0.7
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
            toast.success("photo " + message + " mis a jour");
            setLoadingPhoto(false);
        }).catch(error => {
            toast.error(checkErrorMessage(error).message);
            setLoadingPhoto(false);
        });
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [profile_info]);

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
                    <div className="col-md-4 b-r">
                        <div className="dropdown" style={{position: "absolute", paddingTop: "10px"}}>
                            <button className="btn btn-outline-danger btn-sm pt-3 pb-3 zIndex99" type="button"
                                    data-tip="Plus d'options"
                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                    aria-expanded="false">
                                <i className="icon-more-1 s-12"/>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {props.user_role === "professional_auditor" &&
                                <div>
                                    <p className="dropdown-item text-red"
                                       onClick={() => props.setChoiceArtistTypeToChange(true)}>
                                        <i className="icon-user-plus mr-3"/>Voulez vous devenir artiste sur ISL ?</p>
                                </div>}
                                <div>
                                    <p className="dropdown-item text-red"
                                       onClick={() => setPreference(true)}>
                                        <i className="icon-music-genre mr-3"/>Selectionner vos genres de musique</p>
                                </div>
                            </div>
                        </div>
                        {!loadingPhoto ?
                            <div className="text-center rounded-top p-5 mt-5" style={cover_style}>
                                <div className="cursor-pointer absolute ml-5">
                                    <i className="icon-edit1 text-center bg-grey rounded-lg s-36 bolder text-red"
                                       onClick={() => document.getElementById("cover_area_file").click()}
                                       data-tip="modifier la photo de couverture"/>
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
                                <figure className="avatar avatar-xl">
                                    <div className="hovereffect">
                                        <img alt="profile"
                                             src={profile_info.photo || "https://zupimages.net/up/19/18/3ltf.png"}
                                        />
                                        <div className="overlay zIndex99">
                                            <i className="icon icon-edit cursor-pointer s-36 bolder text-red"
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
                                <div className="pt-2" style={{opacity: 0.8}}>
                                    <h4 className="text-light bg-dark center pt-2"
                                        style={{
                                            width: "80%",
                                            borderTopLeftRadius: "10px",
                                            borderTopRightRadius: "10px"
                                        }}>
                                        {profile_info.name}
                                    </h4>
                                    <h4 className="text-light bg-dark center pt-2 pb-2" style={{
                                        width: "80%",
                                        borderBottomLeftRadius: "10px",
                                        borderBottomRightRadius: "10px"
                                    }}>
                                        {profile_info.email}
                                    </h4>
                                </div>
                            </div> :
                            <div className='text-center rounded-top p-5 m-5 text-danger'>
                                <div className='spinner-grow text-danger m-5 p-4' role='status'>
                                    <span className='sr-only'>Loading...</span>
                                </div>
                            </div>}

                        <div className="text-center">
                            <button className="btn btn-outline-primary btn-sm mt-3 pl-4 pr-4"
                                    onClick={() => setEdit(true)}>Modifier mon profile
                            </button>
                        </div>
                        {props.user_role !== "professional_auditor" ?
                            <div className="text-center mt-2 mb-2">
                                    <span className="text-red">Note:&nbsp;{notes}&nbsp;<i
                                        className="icon-star-1"/></span>
                            </div> : null}
                    </div>
                    <div className="col-md-8">
                        <div className="p5 b-b text-center">
                            <div className="pl-8 mt-4">
                                <h3 className="text-red">Informations personnelles </h3>
                            </div>
                            <div className="row justify-content-center">
                                {[
                                    ['age', 'Age'],
                                    ['gender', 'Genre'],
                                    ['birth', 'Anniversaire'],
                                    ['country', 'Pays'],
                                    ['address', 'Adresse'],
                                    ['phone', 'Téléphone'],
                                    ['city', 'Ville']
                                ].map((val, index) =>
                                    <div className="col-md-4" key={index}>
                                        <div className="p-4">
                                            <h5 className="text-red">{val[1]}</h5>
                                            {
                                                val[0] === "gender" ?
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
                                                    </span>
                                            }
                                        </div>
                                    </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInformation;
