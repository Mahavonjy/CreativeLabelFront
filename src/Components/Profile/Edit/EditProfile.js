import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import Conf from "../../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import logo from "../../../images/Logo/ISL_logo.png";
import FunctionTools from "../../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../FunctionTools/CreateFields";

class EditProfile extends Component {
    state = {
        photo: '', loading: false,
        name: this.props.profile_info.name,
        email: this.props.profile_info.email,
        gender: this.props.profile_info.gender,
        birth: this.props.profile_info.birth,
        address: this.props.profile_info.address,
        phone: this.props.profile_info.phone,
        country: this.props.profile_info.country,
        region: this.props.profile_info.region,
        city: this.props.profile_info.city,
        description: this.props.profile_info.description,
    };

    uploadFile = (e) =>{this.setState({photo : e.target.files[0]})};

    handleSubmitUpdateProfile = (e) => {
        let id = e.target.id;
        document.getElementById(id).setAttribute("disabled", "disabled");
        this.setState({loading: true});
        const bodyFormData = new FormData();
        bodyFormData.append('name', this.state.name);
        bodyFormData.append('email', this.state.email);
        bodyFormData.append('gender', this.state.gender);
        bodyFormData.append('address', this.state.address);
        bodyFormData.append('country', this.state.country);
        bodyFormData.append('region', this.state.region);
        bodyFormData.append('city', this.state.city);
        bodyFormData.append('description', this.state.description);
        bodyFormData.append('photo', this.state.photo);
        bodyFormData.append('phone', this.state.phone ? this.state.phone: 0);
        bodyFormData.append('birth', this.state.birth ? this.state.birth: '01/01/1998');

        let headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': this.props.user_credentials.token
        };

        axios.put(Conf.configs.ServerApi + "api/profiles/updateProfile", bodyFormData, {headers: headers}).then(resp => {
            this.props.profile_initialisation(resp.data);
            this.setState({loading: false}, () => {
                this.props.closePopup(1);
            });
        }).catch(err => {
            this.setState({loading: false}, () => {
                try {
                    toast.error(err.response.data);
                } catch (e) {
                    console.log(err)
                }
                document.getElementById(id).removeAttribute("disabled");
            });
        });
    };

    render() {
        return (
            <Modal visible={true} width="650" height="550" animationType='slide'>
                <ToastContainer/>
                {this.state.loading ? this.props.smallSpinner("absolute", "0") : null}
                <img alt={"logo"} src={logo} className="center" style={{position: "absolute",width: 650, height: 550, opacity:0.4}}/>
                <div className="form-material" style={{background:"black", height:"100%", borderRadius:"5px", opacity: 0.7}}>
                    <button className="ModalClose" onClick={(e) => this.props.closePopup(0)}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <h4 className="text-green text-monospace">Modifier votre profile</h4>
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-user"/>&nbsp;nom</div>
                                    <input value={this.state.name} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="name" name="name" placeholder="name"
                                           className="form-control" type="text" required/>
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-envelope"/>&nbsp;email</div>
                                    <input value={this.state.email} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="email" name="email" placeholder="Email"
                                           className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-location-arrow"/>&nbsp;région</div>
                                    <input value={this.state.region} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="region" name="region" className="form-control"  type="text" />
                                </div>

                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-birthday-cake"/>&nbsp;Date de naissance</div>
                                    <input  value={this.state.birth} onChange={(e) => FunctionTools.changeFields(this, e)}
                                            id="birth" name="birth" className="form-control" type="date" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-address-book"/>&nbsp;adresse</div>
                                    <input value={this.state.address} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="address" name="address" className="form-control" type="text" />
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-map-location"/>&nbsp;Pays</div>
                                    <select className="selectpicker form-control" id="country" name="country" value={this.state.country} onChange={(e) => FunctionTools.changeFields(this, e)}>
                                        <option value="Madagascar">Madagascar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-smartphone-1"/>&nbsp;Télephone</div>
                                    <input value={this.state.phone} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="phone" name="phone" className="form-control" type="number" />
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-street-view"/>&nbsp;Ville</div>
                                    <select className="selectpicker form-control" id="city" name="city" value={this.state.city} onChange={(e) => FunctionTools.changeFields(this, e)}>
                                        <option value="">Veuillez choisir</option>
                                        <option value="Manakara">Manakara</option>
                                        <option value="Tamatave">Tamatave</option>
                                        <option value="Toliara">Toliara</option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-info-circle"/>&nbsp;Description</div>
                                    <input value={this.state.description} onChange={(e) => FunctionTools.changeFields(this, e)}
                                           id="description" name="description" className="form-control" type="text" />
                                </div>
                                <div className="input-group-prepend d-inline-block center" style={{width: "40%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-venus-double"/>&nbsp;Sexe</div>
                                    <select className="selectpicker form-control" id="gender" name="gender" value={this.state.gender} onChange={(e) => FunctionTools.changeFields(this, e)}>
                                        <option value="0">Femelle</option>
                                        <option value="1">male</option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend center" style={{width: "90%"}}>
                                    <div className="input-group-text black-text bolder"><i className="icon-picture-o"/>&nbsp;Photo de profile</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture" className="form-control" type="file" />
                                </div>
                            </div>
                            <button id="update-profile" className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={(e) => this.handleSubmitUpdateProfile(e)}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile.profile_info,
        user_credentials: state.Home.user_credentials,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_initialisation: (data) => {
            dispatch({type: "ADD_PROFILE_INFO", data: data})
        },
        smallSpinner: bindActionCreators(CreateFields.smallSpinner, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
