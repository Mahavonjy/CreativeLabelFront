import axios from 'axios';
import {MDBCol, MDBRow} from "mdbreact";
import React, {useEffect, useRef, useState} from "react";
import Modal from 'react-awesome-modal';
import {useDispatch, useSelector} from 'react-redux';
import {toast, ToastContainer} from 'react-toastify';
import {CreateInput, smallSpinner} from "../../functionTools/createFields";
import {profileInitialisationInfo} from "../../functionTools/functionProps";
import {changeFields} from "../../functionTools/tools";
import {checkErrorMessage} from "../../validators/validatiors";

function EditProfile(props) {

    const dispatch = useDispatch();
    const profile_info = useSelector(state => state.profile.profile_info);

    const isMounted = useRef(false);
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState(false);
    const [name, setName] = useState(profile_info.name);
    const [email, setEmail] = useState(profile_info.email);
    const [gender, setGender] = useState(profile_info.gender);
    const [birth, setBirth] = useState(profile_info.birth);
    const [address, setAddress] = useState(profile_info.address);
    const [phone, setPhone] = useState(profile_info.phone);
    const [country, setCountry] = useState(profile_info.country);
    const [city, setCity] = useState(profile_info.city);
    const [description, setDescription] = useState(profile_info.description);

    const updateProfile = () => {

        setLoading(true);
        setDisable(true);
        const bodyFormData = new FormData();
        bodyFormData.append('city', city);
        bodyFormData.append('name', name);
        bodyFormData.append('email', email);
        bodyFormData.append('gender', gender);
        bodyFormData.append('address', address);
        bodyFormData.append('country', country);
        bodyFormData.append('description', description);
        bodyFormData.append('phone', phone ? phone : 0);
        bodyFormData.append('birth', birth ? birth : "1998-03-12");
        bodyFormData.append('cover_photo', profile_info.cover_photo);
        bodyFormData.append('photo', profile_info.photo);
        axios.put("api/profiles/updateProfile", bodyFormData, {headers: props.headers}).then(resp => {
            let data = resp.data;
            dispatch(profileInitialisationInfo(data));
            setLoading(false);
            props.closePopup(1);
        }).catch(error => {
            setLoading(false);
            setDisable(false);
            toast.error(checkErrorMessage(error).message);
        });
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <Modal visible={true} width="650" height="auto" effect="fadeInUp">
            <ToastContainer/>
            {loading && smallSpinner("absolute", "0")}
            <div className="bg-dark" style={{height: "100%", borderRadius: "5px", opacity: 0.7}}>
                <button className="ModalClose" onClick={(e) => props.closePopup(0)}>
                    <i className="icon-close s-24" style={{color: "orange"}}/>
                </button>
                <div className="col text-center">
                    <h4 className="text-green text-monospace">Modifier mon profil</h4>
                    <div className="body overflow-auto scrollbar-isl" style={{height: 350}}>
                        <div className="form-material d-flex flex-wrap required">
                            <label className="col-sm-3 mt-2 control-label">Nom</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'name',
                                    name !== "null" ? name : "",
                                    (e) => changeFields(setName, e),
                                    "Votre nom",
                                    "text",
                                    true
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Date de naissance</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'birth',
                                    birth !== "null" ? birth : "",
                                    (e) => changeFields(setBirth, e),
                                    "Date de naissance",
                                    "date",
                                    false
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Télephone</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'phone',
                                    phone !== "null" ? phone : "",
                                    (e) => changeFields(setPhone, e),
                                    "votre telephone",
                                    "number",
                                    false
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Adresse</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'address',
                                    address !== "null" ? address : "",
                                    (e) => changeFields(setAddress, e),
                                    "Votre adresse",
                                    "text",
                                    false
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Pays</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'country',
                                    country !== "null" ? country : "",
                                    (e) => changeFields(setCountry, e),
                                    "Votre Pays",
                                    "text",
                                    false
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Ville</label>
                            <div className="col-sm-9">
                                {CreateInput(
                                    'city',
                                    city !== "null" ? city : "",
                                    (e) => changeFields(setCity, e),
                                    "Votre ville", "text",
                                    false
                                )}
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Sexe</label>
                            <div className="col-sm-9">
                                <MDBRow>
                                    <MDBCol className='mb-3'>
                                        <select className="selectpicker form-control"
                                                id="gender"
                                                name="gender"
                                                value={gender}
                                                onChange={
                                                    (e) => changeFields(setGender, e)
                                                }>
                                            <option value="0">Femelle</option>
                                            <option value="1">male</option>
                                        </select>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </div>
                        <div className="form-material d-flex flex-wrap">
                            <label className="col-sm-3 mt-2 control-label">Description</label>
                            <div className="col-sm-9">
                                <MDBRow>
                                    <MDBCol className='mb-3'>
                                 <textarea defaultValue={description !== "null" ? description : ""}
                                           id="desc"
                                           name="desc"
                                           className="form-control"
                                           placeholder="Decrivez vous en quelque mots"
                                           onChange={
                                               (e) => changeFields(setDescription, e)
                                           }/>
                                    </MDBCol>
                                </MDBRow>
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-outline-success btn-sm pl-4 pr-4 mb-3"
                            onClick={() => updateProfile()}
                            disabled={disable}>{loading ? "Veuiller attendre ..." : "Mettre à Jour"}</button>
                </div>
            </div>
        </Modal>
    )
}

export default EditProfile;
