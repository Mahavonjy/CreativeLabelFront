import React, { Component, useState } from "react";
import axios from 'axios';
import EditProfile from './EditProfile';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import Conf from "../../Config/tsconfig";
import PhotoD from '../../images/socials/profile.png';
import Carousel from 'react-bootstrap/Carousel';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PopupEditProfile: false,
            role: '',
            albums: [],
            single: [],
            follower: '',
            following: '',

        };
    }

    togglePopupEditProfile = () => {this.setState({PopupEditProfile: !this.state.PopupEditProfile})};

    setStyle = () => {
        let div1 = document.getElementsByClassName('carousel carousel-slider')[0];
        div1.style.width = '50%';
        let div2 = div1.parentElement;
        div2.style.marginLeft = '38%';
        div2.style.marginTop = '5%';

        let div3 = document.getElementsByClassName('carousel carousel-slider')[1];
        div3.style.width = '50%';
        let div4 = div3.parentElement;
        div4.style.marginLeft = '38%';
        div4.style.marginTop = '5%';



    }

    componentDidMount() {
        this.getIfToken();
        this.getMedia();
    }

    getIfToken = () => {
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass");
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/profiles/my_profile", {headers: new_headers}).then(resp =>{
                    this.props.profile_initialisation(resp.data['my_profile']);
                    this.setState({role : resp.data.role});
                    this.setState({follower : resp.data.my_followers});
                    this.setState({following : resp.data.my_followings});
                    console.log(this.state.role)
                }).catch(err => {
                    console.log(err.response)
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    getMedia = () => {
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass")
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: new_headers}).then(resp => {
                axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: new_headers}).then(resp =>{
                    const info = resp.data;
                    for(let row in info['albums']){
                        this.setState(prevState => ({
                            albums: [...prevState.albums, info['albums'][row]]
                        }));
                    }
                    for(let roww in info['music']){
                        this.setState(prevState => ({
                            single: [...prevState.single, info['music'][roww]]
                        }));
                    }
                    this.setStyle();
                }).catch(err => {
                    console.log(err.response)
                })
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    deleteAlbum = (e) => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/albums/delete/" + e.target.id, {headers: new_headers}).then(resp =>{
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response)
        })
    };

    deleteSingle = (e) => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/medias/delete/" + e.target.id, {headers: new_headers}).then(resp =>{
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response)
        })
    };

    ControlledCarousel = (e) => {
        const [index, setIndex] = useState(0);
        const [direction, setDirection] = useState(null);

        const handleSelect = (selectedIndex, e) => {
            setIndex(selectedIndex);
            setDirection(e.direction);
        };
    };

    render() {
        return (
            <div className="Base">
                {this.state.PopupEditProfile ? <EditProfile closePopup={this.togglePopupEditProfile}/> : null}
                <div className="container-fluid relative animatedParent animateOnce p-lg-5">
                    <div className="card no-b shadow no-r">
                        <div className="row no-gutters">
                            <div className="col-md-4 b-r">
                                {this.state.role === 'Artist'?
                                <div className="text-center" style={{paddingTop: "10px"}}>
                                    <button className="btn btn-outline-info btn-sm pl-4 pr-4" >Add Album</button>
                                    <button className="btn btn-outline-success btn-sm pl-4 pr-4" >Add Single</button>
                                </div>:null}
                                <div className="text-center p-5 mt-5">
                                    <figure className="avatar avatar-xl">
                                        <img src={this.props.profile_info.photo ? this.props.profile_info.photo: PhotoD} alt="profile" />
                                    </figure>
                                    <div>
                                        <h4 className="p-t-10">{this.props.profile_info.name ? this.props.profile_info.name: "Name"}</h4>
                                        {this.props.profile_info.email ? this.props.profile_info.email: "Email"}
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm  mt-3 pl-4 pr-4" onClick={this.togglePopupEditProfile}>Edit</button>
                                    <div className="mt-5">
                                        <ul className="social social list-inline">
                                            <li className="list-inline-item"><a href="#" className="grey-text"><i className="icon-facebook" /></a>
                                            </li>
                                            <li className="list-inline-item"><a href="#" className="grey-text"><i className="icon-youtube" /></a>
                                            </li>
                                            <li className="list-inline-item"><a href="#" className="grey-text"><i className="icon-twitter" /></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="p5 b-b">
                                    <div className="pl-8 mt-4">
                                        <h3>Official Information</h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Email</h5>
                                                <span>{this.props.profile_info.email ? this.props.profile_info.email: "Email"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Age</h5>
                                                <span>{this.props.profile_info.age ? this.props.profile_info.age: "Age"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Gender</h5>
                                                <span>{this.props.profile_info.gender ? this.props.profile_info.gender: "Gender"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Birth day</h5>
                                                <span>{this.props.profile_info.birth ? this.props.profile_info.birth: "0000-00-00"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Address</h5>
                                                <span>{this.props.profile_info.address ? this.props.profile_info.address: "Address"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Phone</h5>
                                                <span>{this.props.profile_info.phone ? this.props.profile_info.phone: "Phone"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Country</h5>
                                                <span>{this.props.profile_info.country ? this.props.profile_info.country: "Country"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>Region</h5>
                                                <span>{this.props.profile_info.region ? this.props.profile_info.region: "Region"}</span>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="p-4">
                                                <h5>City</h5>
                                                <span>{this.props.profile_info.city ? this.props.profile_info.city: "City"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
