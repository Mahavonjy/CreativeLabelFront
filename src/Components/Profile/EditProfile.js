import React, { Component } from "react";
import Modal from 'react-awesome-modal';
import { connect } from 'react-redux';
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

class EditProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            photo: '',
            loading: false,
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
    }
    changeName = (e) => {this.setState({name : e.target.value});};

    changeEmail = (e) => {this.setState({email : e.target.value});};

    changeGender = (e) => {this.setState({gender : e.target.value});};

    changeBirth = (e) => {this.setState({birth : e.target.value});};

    changeAddress = (e) => {this.setState({address : e.target.value});};

    changePhone = (e) => {this.setState({phone : e.target.value});};

    changeCountry = (e) => {this.setState({country : e.target.value});};

    changeRegion = (e) => {this.setState({region : e.target.value});};

    changeCity = (e) => {this.setState({city : e.target.value});};

    changeDescription = (e) => {this.setState({description : e.target.value});};

    changeAge = (e) => {this.setState({age : e.target.value});};

    uploadFile = (e) =>{
        let file = e.target.files[0];
        console.log(file);
        this.setState({photo : file});
    };

    handleSubmit = () => {
        let cookies = new Cookies();

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

        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };

        axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
            this.setState({loading: true});
            axios.put(Conf.configs.ServerApi + "api/profiles/updateProfile", bodyFormData, {headers: new_headers}).then(resp => {
                this.setState({loading: false});
                this.props.profile_initialisation(resp.data);
                this.props.closePopup();
            }).catch(err => {
                this.setState({loading: false});
                toast.error(err.response.data)
            })
        }).catch(err => {
            console.log(err.response);
        })
    };

    render() {
        return (
            <Modal visible={true} width="700" height="800" animationType='slide'>
                <ToastContainer/>
                {this.state.loading ?
                    <div className="preloader-wrapper small active" style={{position: "absolute", right: 0}}>
                        <div className="spinner-layer spinner-yellow-only">
                            <div className="circle-clipper left">
                                <div className="circle"/>
                            </div>
                            <div className="circle-clipper right">
                                <div className="circle"/>
                            </div>
                        </div>
                    </div>: null}
                <div className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                    <button className="ModalClose" onClick={(e) => this.props.closePopup()}>
                        <i className="icon-close s-24" style={{color:"orange"}} />
                    </button>
                    <div className="col text-center">
                        <div className="body">
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-user"/>name</div>
                                    <input value={this.state.name} onChange={this.changeName}
                                           id="name" name="name" placeholder="name"
                                           className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-envelope"/>email</div>
                                    <input value={this.state.email} onChange={this.changeEmail}
                                           id="email" name="email" placeholder="Email"
                                           className="form-control" type="text" required/>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-location-arrow"/>region</div>
                                    <input value={this.state.region} onChange={this.changeRegion}
                                           id="region" name="region" className="form-control"  type="text" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-birthday-cake"/>birth</div>
                                    <input  value={this.state.birth} onChange={this.changeBirth}
                                            id="birth" name="birth" className="form-control" type="date" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-address-book"/>address</div>
                                    <input value={this.state.address} onChange={this.changeAddress}
                                           id="address" name="address" className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-smartphone-1"/>phone</div>
                                    <input value={this.state.phone} onChange={this.changePhone}
                                           id="phoneNumber" name="phoneNumber" className="form-control" type="number" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-street-view"/>city</div>
                                    <input value={this.state.city} onChange={this.changeCity}
                                           id="city" name="city" className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-info-circle"/>description</div>
                                    <input value={this.state.description} onChange={this.changeDescription}
                                           id="description" name="description" className="form-control" type="text" />
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-venus-double"/>gender</div>
                                    <select className="selectpicker form-control" value={this.state.gender} onChange={this.changeGender}>
                                        <option value="0">Female</option>
                                        <option value="1">male</option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-map-location"/>country</div>
                                    <select className="selectpicker form-control" value={this.state.country} onChange={this.changeCountry}>
                                        <option value="Madagascar">Madagascar</option>
                                        <option value="Senegal">Senegal</option>
                                    </select>
                                </div>
                            </div>
                            <div className="custom-float">
                                <div className="input-group-prepend">
                                    <div className="input-group-text"><i className="icon-picture-o"/>profile picture</div>
                                    <input onChange={this.uploadFile} id="picture" name="picture" className="form-control" type="file" />
                                </div>
                            </div>
                            <button className="btn btn-outline-success btn-sm pl-4 pr-4" onClick={this.handleSubmit}>Update</button>
                        </div>
                    </div>
                </div>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        profile_info: state.profile_info
    };
};

const mapDispatchToProps = dispatch => {
    return {
        profile_initialisation: (data) => {
            dispatch({type: "ADD_PROFILE_INFO", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
