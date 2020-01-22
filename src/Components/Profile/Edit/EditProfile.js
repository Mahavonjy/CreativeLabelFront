import React, { useEffect, useRef, useState } from "react";
import Modal from 'react-awesome-modal';
import {useDispatch, useSelector} from 'react-redux';
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../images/Logo/ISL_logo.png";
import * as Tools from "../../FunctionTools/Tools";
import { profileInitialisationInfo } from "../../FunctionTools/FunctionProps";
import { smallSpinner, generateInput } from "../../FunctionTools/CreateFields";

function EditProfile (props) {

    const dispatch = useDispatch();
    const profile_info = useSelector(state => state.profile.profile_info);
    const user_credentials = useSelector(state => state.Home.user_credentials);

    const isMounted = useRef(false);
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(profile_info.name);
    const [email, setEmail] = useState(profile_info.email);
    const [gender, setGender] = useState(profile_info.gender);
    const [birth, setBirth] = useState(profile_info.birth);
    const [address, setAddress] = useState(profile_info.address);
    const [phone, setPhone] = useState(profile_info.phone);
    const [country, setCountry] = useState(profile_info.country);
    const [region, setRegion] = useState(profile_info.region);
    const [city, setCity] = useState(profile_info.city);
    const [description, setDescription] = useState(profile_info.description);

    const handleSubmitUpdateProfile = (e) => {
        let id = e.target.id;
        document.getElementById(id).setAttribute("disabled", "disabled");
        setLoading(true);
        const bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('email', email);
        bodyFormData.append('gender', gender);
        bodyFormData.append('address', address);
        bodyFormData.append('country', country);
        bodyFormData.append('region', region);
        bodyFormData.append('city', city);
        bodyFormData.append('description', description);
        bodyFormData.append('photo', photo);
        bodyFormData.append('phone', phone ? phone: 0);
        bodyFormData.append('birth', birth ? birth: '01/01/1998');

        let headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': user_credentials.token
        };

        axios.put(Conf.configs.ServerApi + "api/profiles/updateProfile", bodyFormData, {headers: headers}).then(resp => {
            let data = resp.data;
            dispatch(profileInitialisationInfo(data));
            props.updateProfile(data);
            setLoading(false);
            props.closePopup(1);
        }).catch(err => {
            setLoading(false);
            try {
                toast.error(err.response.data);
            } catch (e) {
                console.log(err)
            }
            document.getElementById(id).removeAttribute("disabled");
        });
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <Modal visible={true} width="650" height="650" effect="fadeInUp">
            <ToastContainer/>
            {loading && smallSpinner("absolute", "0")}
            <img alt={"logo"} src={logo} className="center" style={{position: "absolute",width: 650, height: 550, opacity:0.4}}/>
            <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                <button className="ModalClose" onClick={(e) => props.closePopup(0)}>
                    <i className="icon-close s-24" style={{color:"orange"}} />
                </button>
                <div className="col text-center">
                    <h4 className="text-green text-monospace">Modifier votre profile</h4>
                    <div className="body">
                        <div className="custom-float">
                            {generateInput("nom", name, setName, "name", "text", "icon-user")}
                            {generateInput("email", email, setEmail, "email", "text", "icon-envelope")}
                        </div>
                        <div className="custom-float">
                            {generateInput("région", region, setRegion, "region", "text", "icon-location-arrow")}
                            {generateInput("Date de naissance", birth, setBirth, "birth", "date", "icon-birthday-cake")}
                        </div>
                        <div className="custom-float">
                            {generateInput("adresse", address, setAddress, "address", "text", "icon-address-book")}
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text black-text bolder"><i className="icon-map-location"/>&nbsp;Pays</div>
                                <select className="selectpicker form-control" id="country" name="country" value={country} onChange={(e) => Tools.changeFields(setCountry, e)}>
                                    <option value="Madagascar">Madagascar</option>
                                </select>
                            </div>
                        </div>
                        <div className="custom-float">
                            {generateInput("Télephone", phone, setPhone, "phone", "number", "icon-smartphone-1")}
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text black-text bolder"><i className="icon-street-view"/>&nbsp;Ville</div>
                                <select className="selectpicker form-control" id="city" name="city" value={city} onChange={(e) => Tools.changeFields(setCity, e)}>
                                    <option value="">Veuillez choisir</option>
                                    <option value="Manakara">Manakara</option>
                                    <option value="Tamatave">Tamatave</option>
                                    <option value="Toliara">Toliara</option>
                                </select>
                            </div>
                        </div>
                        <div className="custom-float">
                            {generateInput("Description", description, setDescription, "description", "text", "icon-info-circle")}
                            <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                <div className="input-group-text black-text bolder"><i className="icon-venus-double"/>&nbsp;Sexe</div>
                                <select className="selectpicker form-control" id="gender" name="gender" value={gender} onChange={(e) => Tools.changeFields(setGender, e)}>
                                    <option value="0">Femelle</option>
                                    <option value="1">male</option>
                                </select>
                            </div>
                        </div>
                        <div className="custom-float">
                            <div className="input-group-prepend center" style={{width: "90%"}}>
                                <div className="input-group-text black-text bolder"><i className="icon-picture-o"/>&nbsp;Photo de profile</div>
                                <input onChange={(e) => Tools.changeFileFields(setPhoto, e)} id="picture" accept="image/png, image/jpeg" name="picture" className="form-control" type="file" />
                            </div>
                        </div>
                        <button id="update-profile" className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e) => {handleSubmitUpdateProfile(e)}}>{loading ? "Veuiller attendre ...": "Mettre à Jour"}</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default EditProfile;
