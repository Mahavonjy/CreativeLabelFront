import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg1 from "../../assets/img/demo/b1.jpg";
import TestImg from "../../assets/img/demo/a2.jpg";

class Beats extends Component {
    ToPlay;
    IfToken;
    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            loading: false,
            showPopup: false,
            genre:'Rap',
            licenses: '',
            genre_info: [],
            beats: [],
        };
    }

    togglePopup = () => {this.setState({showPopup: !this.state.showPopup});};

    changeGenre = (e) => {this.setState({genre: e.target.value});};

    getBeats = () =>{
        let cookies = new Cookies();
        let data = cookies.get("Isl_Creative_pass");
        if (data) {
            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
            };
            axios.get(Conf.configs.ServerApi + "api/medias/genre/beats/" + this.state.genre, {headers: new_headers}).then(resp =>{
                const info = resp.data['songs'];
                this.setState({beats: []}, () => {for(let row in info) {
                    this.setState(prevState => ({beats: [...prevState.beats, info[row]]}))
                }});
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    getGenre = () => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: new_headers}).then(resp =>{
            const info = resp.data;
            for(let row in info){
                this.setState(prevState => ({genre_info: [...prevState.genre_info, info[row].genre]}))
            }
        }).catch(err => {
            console.log(err.response)
        })
    };


    setLicences = () => {
        let cookies = new Cookies();
        this.setState({licenses: cookies.get("Isl_Creative_licenses")['licenses']});
    };

    handleSubmit = (e) => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.post(Conf.configs.ServerApi + "api/carts/addToCart/" + e.target.id + "/" +  cookies.get("Isl_Creative_licenses")["licenses"],{},  {headers: new_headers}).then(resp =>{
            console.log(resp.data);
        }).catch(err => {
            console.log(err.response)
        })
    };

    componentDidMount() {
        this.getGenre();
        this.getBeats();
        this.togglePopup();
        this.setLicences();
    }
    render() {
        return (
            <div>
                <section>
                    <div className="text-white">
                        <div className="xv-slide" data-bg-possition="top" style={{backgroundImage: 'url('+TestImg1+')'}}>
                            <div className="has-bottom-gradient">
                                <div className="home-menu p-md-5">
                                    <div className="row">
                                        <div className="col-12 col-lg-10 animated">
                                            <div className="xv-slider-content clearfix color-white">
                                                <h1 className="s-64 mt-5 font-weight-lighter">Creative Beats</h1>
                                                <p className="s-24 font-weight-lighter">Listen to any kind of African music <br /> you like with our platform. </p>
                                                <p className="s-24 font-weight-lighter">Buy any kind of African-style beats <br /> you like with our platform. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <div className="Base">
                {/*PlayList & Events*/}
                <section className="section mt-4">
                    <div className="row row-eq-height">
                        <div className="col-lg-8">
                            <div className="card no-b mb-md-3 p-2">
                                <div className="card-header no-bg transparent">
                                    <div className="d-flex justify-content-between">
                                        <div className="align-self-center">
                                            <div className="d-flex">
                                                <i className="icon-heartbeat s-36 mr-3  mt-2"/>
                                                <div>
                                                    <h4>All Beats</h4>
                                                    <p>Choose your type of beats, listen and buy</p>
                                                    <div className="mt-4">
                                                        <div className="form-inline ml-auto">
                                                            <div className="md-form my-0">
                                                                <input className="form-control" type="text"
                                                                       placeholder="Search" aria-label="Search"
                                                                       value={this.state.genre} onChange={this.changeGenre}
                                                                       list="music-genre"
                                                                />
                                                                <datalist id="music-genre">{this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                            </div>
                                                            &nbsp;&nbsp;&nbsp;
                                                            <i className="icon-search-1" onClick={this.getBeats}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body no-p">
                                    <div className="tab-content" id="v-pills-tabContent1">
                                        <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">
                                            <div className="playlist pl-lg-3 pr-lg-3">
                                                {this.state.beats.map((val, index) =>
                                                <div className="m-1 my-4" key={index}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="col-1">
                                                            <a className="no-ajaxy media-url" href="assets/media/track1.mp3" data-wave="assets/media/track1.json">
                                                                <i className="icon-play s-28" />
                                                            </a>
                                                        </div>
                                                        <div className="col-md-3">
                                                            <figure className="avatar-md float-left  mr-3 mt-1">
                                                                <img className="r-3" src={val.photo} alt="" />
                                                            </figure>
                                                            <h6>{val.title}</h6>{val.artist}
                                                        </div>
                                                        <div className="col-md-3">
                                                            <span className="ml-auto">{val.price}$</span>
                                                        </div>
                                                        <div className="col-md-5 d-none d-lg-block">
                                                            <div className="d-flex">
                                                                <a href="#" className="ml-auto"><i className="icon-like" /></a>
                                                                <div className="ml-auto">
                                                                    <a href="#" className="btn btn-outline-primary btn-sm">Add To Cart</a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ml-auto d-lg-none">
                                                            <a href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className="icon-more-1" /></a>
                                                            <div className="dropdown-menu dropdown-menu-right">
                                                                <a className="dropdown-item" href="#"><i className="icon-like mr-3" /> Like</a>
                                                                <a className="dropdown-item" href="#"><i className="icon-shopping-bag mr-3" />Add To Cart</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>)}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                                <div className="mb-3 card p-3">
                                    <div>
                                        <div className="mr-3 float-left text-center">
                                            <div className="s-36"><i className="icon-music-player-3"/></div>
                                        </div>
                                        <div>
                                            <div>
                                                <h4 className="text-primary">Top BeatMaker</h4>
                                            </div>
                                            <small> Best beatmaker on the ISL platform </small>
                                        </div>
                                    </div>
                                    <ul className="playlist list-group list-group-flush">
                                        <li className="list-group-item">
                                            <div className="d-flex align-items-center">
                                                <div className="col-10">
                                                    <figure className="avatar avatar-md float-left  mr-3 mt-1">
                                                        <img src={TestImg} alt="" />
                                                    </figure>
                                                    <h6>Zoe Foe</h6>
                                                    <small>5 Beats</small>
                                                </div>
                                                <a href="#" className="ml-auto"><i className="icon-user-plus" /></a>
                                                <a href="#" className="ml-auto"><i className="icon-user-circle" /></a>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
            </div>
        );
    }
}

export default Beats;
