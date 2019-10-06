import React, { Component } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import Conf from "../../Config/tsconfig";
import TestImg1 from "../../assets/img/demo/b1.jpg";
import TestImg from "../../assets/img/demo/a2.jpg";
import {ToastContainer, toast} from "react-toastify";
import {connect} from "react-redux";
import logo from "../../images/Logo/ISL_logo.png"
import IslPlayer from '../Players/Players'

let token = "";
let _this;

class Beats extends Component {
    ToPlay;
    abortController = new AbortController();
    constructor(props) {
        super(props);
        this.state = {
            genre:'', genre_info: [], beats: [], song_id: '', price: 0, licenses: '', samples: false,
            placeHolder: "Search", sort_by: ["Latest", "Oldest"], sort_placeHolder: "Sort", sort: '',
            link_beats : [], index: null, tmp: null
        };
        _this = this
    }

    changeGenre = (e) => {this.setState({genre: e.target.value}, () => {this.getBeats("genre")})};

    changeSort = (e) => {this.setState({sort: e.target.value}, () => {this.getBeats("sort")})};

    AddForPlay = (index) => {
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        axios.get(Conf.configs.ServerApi + "api/medias/Streaming/" + this.props.beats[index]['id'], {headers:new_headers}).then(response => {
            let temp = {"index": index, "link": response.data};
            this.props.updateBeats(temp);
            this.setState(prevState => ({link_beats: {...prevState.link_beats, [index]: true}}));
        }).catch(error => {
            console.log(error.response);
        })
    };

    Play = (index, type_) => {
        if (this.state.index !== index && this.state.tmp === null) {
            this.setState({index: index, tmp: index}, () => {
                this.props.ToPlay(index, type_, "beats");
            })
        } else {
            if (index !== this.state.index) {
                this.setState({index: index, tmp: index}, () => {
                    this.props.ToPlay(index, type_, "beats");
                })
            } else {
                this.setState({tmp: null}, () => {
                    IslPlayer.pauseOrPlayPlayer();
                })
            }
        }
    };

    pausePlayer = (run) => {
        if (this.state.index !== null) {
            this.setState({tmp: this.state.index}, () => {
                this.setState({index: null}, () => {
                    if (run) {
                        IslPlayer.pauseOrPlayPlayer();
                    }
                })
            });
        }
    };

    getBeats = (type_) => {
        this.props.resetBeats({"key": true});
        if (token) {
            let url_ = "";
            let key = "";

            if (type_ === "genre") {
                this.setState({placeHolder: this.state.genre});
                url_ = "api/medias/genre/beats/" + this.state.genre;
                key = "songs"
            }
            if (type_ === "random") {
                url_ = "api/beats/random";
                key = "random"
            }
            if (type_ === "sort" && this.state.sort === "Latest") {
                url_ = "api/beats/increasing";
                key = "increasing"
            }
            if (type_ === "sort" && this.state.sort === "Oldest") {
                url_ = "api/beats/descending";
                key = "descending"
            }

            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };

            this.props.resetBeats();
            axios.get(Conf.configs.ServerApi + url_, {headers: new_headers}).then(resp =>{
                const info = resp.data[key];
                this.props.resetBeats();
                this.setState({genre: "", sort: ""});
                for(let row in info) {info[row]['link'] = ""}
                this.props.addBeats(info, {"key": true});
                for (let row_ in this.props.beats) {this.AddForPlay(row_)}
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    getGenre = () => {
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
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

    handleSubmit = (e) => {
        let data = {
            "song_id": this.state.song_id,
            "price": this.state.price,
            "licenses": this.state.licenses,
            "samples": this.state.samples
        };
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': token
        };
        axios.post(Conf.configs.ServerApi + "api/carts/addToCart", data,  {headers: new_headers}).then(resp =>{
            toast.success(resp.data);
        }).catch(err => {
            toast.error(err.response.data);
        })
    };

    componentDidMount() {
        let signal = this.abortController.signal;
        if (signal) {
            try {
                let cookies = new Cookies();
                token = cookies.get("Isl_Creative_pass")["Isl_Token"];
                this.getGenre();
                this.getBeats("random");
            } catch (e) {
                this.props.Redirect();
            }
        }

    }

    componentWillUnmount() {
        this.abortController.abort()
    }

    render() {
        return (
            <div>
                <ToastContainer/>
                <section>
                    <div className="text-white">
                        <div className="xv-slide" data-bg-possition="top" style={{backgroundImage: 'url('+TestImg1+')'}}>
                            <div className="has-bottom-gradient">
                                <div className="home-menu p-md-5">
                                    <div className="row">
                                        <div className="col-12 col-lg-10 animated">
                                            <div className="xv-slider-content clearfix color-white">
                                                <h1 className="s-64 mt-5 font-weight-lighter">Creative Beats</h1>
                                                <p className="s-24 font-weight-lighter">The exclusive buy & sell plateform for african beats <br /> For music professionals (Artists, Beatmakers, labels...)  </p>
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
                                                    <div className="mt-8 d-flex">
                                                        <div className="dropdown">
                                                            <button className="btn btn-outline-info btn-fab-md pl-md-6 pr-md-6" type="button"
                                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                <i className="icon-hand-peace-o"/>Offers
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <div className="row" style={{marginLeft: 0}}>
                                                                    <div className="text-light text-center special-color" style={{marginLeft: 0, width: 266}}>
                                                                        <h6>Silver</h6>
                                                                        <small>Non Exclusive</small>
                                                                        <br/>
                                                                        <h1>54.99$</h1>
                                                                    </div>
                                                                    <div className="text-center text-dark warning-color" style={{width: 266, height: 86}}>
                                                                        <h6 className="text-dark">Gold</h6>
                                                                        <small>Exclusive</small>
                                                                        <br/>
                                                                        <h1>74.99$</h1>
                                                                    </div>
                                                                </div>
                                                                <small className="dropdown-item text-center unique-color">All offers include:</small>
                                                                <small className="dropdown-item "><i className="icon-music-player-1 mr-3"/>Online publishing(Spotify, Apple music, itunes...)</small>
                                                                <small className="dropdown-item "><i className="icon-hand-rock-o mr-3"/>100% royalty free</small>
                                                                <small className="dropdown-item "><i className="icon-child mr-3"/>credits: prod. by [name of producer]/ISL Creative</small>
                                                                <small className="dropdown-item "><i className="icon-hand-rock-o mr-3"/>100% royalty free</small>
                                                                <small className="dropdown-item "><i className="icon-slideshare mr-3"/>unlimited business use (use for profit album,performances,music video, etc...)</small>
                                                                <small className="dropdown-item "><i className="icon-infinity mr-3"/>unlimited streaming</small>
                                                                <h6 className="text-center unique-color">add Stems 29.99$</h6>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button className="btn btn-outline-secondary btn-fab-md pl-md-4 pr-md-4" type="button"
                                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false">
                                                                <i className="icon-filter"/>Filters
                                                            </button>
                                                            <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                                                <button className="btn btn-outline-warning btn-fab-md" onClick={() => this.getBeats("random")}>
                                                                    <i className="icon-warning mr-2"/>Reset
                                                                </button>
                                                                <div className="md-form my-0">
                                                                    <div className="input-group-text bg-mdb-color">Genre&nbsp;
                                                                    <input className="form-control" type="text"
                                                                           placeholder={this.state.placeHolder}
                                                                           value={this.state.genre} onChange={this.changeGenre}
                                                                           list="music-genre"
                                                                    /></div>
                                                                    <datalist id="music-genre">{this.state.genre_info.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                                </div>
                                                                <div className="md-form my-0">
                                                                    <div className="input-group-text bg-mdb-color">Sort by&nbsp;
                                                                        <input className="form-control" type="text"
                                                                               placeholder={this.state.sort_placeHolder}
                                                                               value={this.state.sort} onChange={this.changeSort}
                                                                               list="music-sort"
                                                                        /></div>
                                                                    <datalist id="music-sort">{this.state.sort_by.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                                </div>
                                                            </div>
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
                                                {this.props.beats.map((val, index) =>
                                                <div className="m-1 my-4" key={index}>
                                                    <div className="d-flex align-items-center">
                                                        <div className="col-1">
                                                            {this.state.link_beats[index] ?
                                                                <div>
                                                                    {this.state.index === index ?
                                                                        <i className="icon-pause s-28 text-danger" onClick={() => this.pausePlayer(true)}/>:
                                                                        <i className="icon-play s-28 text-danger" onClick={() => {this.Play(index, "beats")}}/>}
                                                                </div>
                                                                :
                                                                <div className="preloader-wrapper small active">
                                                                    <div className="spinner-layer spinner-red-only">
                                                                        <div className="circle-clipper left">
                                                                            <div className="circle"/>
                                                                        </div>
                                                                        <div className="gap-patch">
                                                                            <div className="circle"/>
                                                                        </div>
                                                                        <div className="circle-clipper right">
                                                                            <div className="circle"/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className="col-md-3">
                                                            <figure className="avatar-md float-left  mr-2">
                                                                <img className="r-3" src={val.photo} alt="" />
                                                            </figure>
                                                            <h6>{val.title}</h6><small>{val.artist}</small>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <small className="ml-auto">{val.price}$</small>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <small className="ml-auto">{val.time}</small>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <small className="ml-auto">{val.bpm}/bpm</small>
                                                        </div>
                                                        <div className="col-sm-2 d-none d-lg-block">
                                                            <div className="d-flex">
                                                                <div className="ml-auto">
                                                                    <button className="btn btn-outline-primary btn-sm" type="button" data-toggle="modal"
                                                                            data-target={"#trackModal" + val.id}><i className="icon-opencart"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-1 ml-auto d-lg-none">
                                                            <a href="#" data-toggle="dropdown"
                                                               aria-haspopup="true"
                                                               aria-expanded="false">
                                                                <i className="icon-more-1"/></a>
                                                            <div
                                                                className="dropdown-menu dropdown-menu-right">
                                                                <button className="dropdown-item"
                                                                        type="button" data-toggle="modal"
                                                                        data-target={"#trackModal" + val.id}><i
                                                                    className="icon-shopping-bag mr-3"/>Add To Cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="modal custom show" id={"trackModal"+val.id} tabIndex="-1" role="dialog"
                                                             aria-labelledby="trackModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content" style={{height: "100%"}}>

                                                                    <div className="modal-header">
                                                                        <h3 className="getlaid text-dark" id="trackModalLabel">Add To Cart</h3>
                                                                        <button id={"closeOne" + val.id} type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>

                                                                    <div className="modal-body" style={{overflow:"auto"}}>
                                                                        <section className="relative" style={{margin:"0 auto"}}>
                                                                            <div className="has-bottom-gradient">
                                                                                <div className="row">
                                                                                    <div className="col-md-10 offset-sm-1">
                                                                                        <div className="row" style={{width:"300px", margin: "0 auto"}}>
                                                                                            <img src={val.photo} alt="/" style={{width:"300px", margin:"0 auto"}}/>
                                                                                            <h1 className="my-3 text-white" style={{margin: "0 auto"}}>{val.title}</h1>
                                                                                            <div className="col-md-9">
                                                                                                <div className="d-md-flex align-items-center justify-content-between">
                                                                                                    <div className="ml-auto mb-2">
                                                                                                        <a href="#" className="snackbar" data-text="Bookmark clicked" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-bookmark s-24" /></a>
                                                                                                        <a href="#" className="snackbar ml-3" data-text="You like this song" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-heart s-24" /></a>
                                                                                                        <a href="#" className="snackbar ml-3" data-text="Thanks for sharing" data-pos="top-right" data-showaction="true" data-actiontext="ok" data-actiontextcolor="#fff" data-backgroundcolor="#0c101b"><i className="icon-share-1 s-24" /></a>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="bottom-gradient " />
                                                                        </section>
                                                                        <div className="p-lg-5" style={{background:"black", height:"400px"}}>
                                                                            <div className="mb-3 card no-b p-3">
                                                                                <div className="row" style={{margin:"0 auto"}}>
                                                                                    <div style={{margin: "0 auto", paddingRight:"10px", paddingLeft:"10px"}}>
                                                                                        <button className="pricingTable orange" type="button" data-toggle="modal"
                                                                                                data-target={"#trackModal1" + val.id} onClick={() => {this.setState({song_id: val.id, price: 15, licenses: 1})}}>
                                                                                            <div className="pricingTable-header">
                                                                                                <small className="price-value">$15<small className="month">Silver</small></small>
                                                                                            </div>
                                                                                            <div className="pricingTable-sign-up">
                                                                                                <small>Non exclusive</small>
                                                                                                <a href="#" className="btn btn-block">mp3 + wave</a>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>

                                                                                    <div style={{margin: "0 auto", paddingRight:"10px", paddingLeft:"10px"}}>
                                                                                        <button className="pricingTable blue" type="button" data-toggle="modal"
                                                                                                data-target={"#trackModal1"+val.id} onClick={() => {this.setState({song_id: val.id, price: 20, licenses: 2})}}>
                                                                                            <div className="pricingTable-header">
                                                                                                <span className="price-value">$20<span className="month">Premium</span></span>
                                                                                            </div>
                                                                                            <div className="pricingTable-sign-up">
                                                                                                <small>exclusive</small>
                                                                                                <a href="#" className="btn btn-block">mp3 + wave</a>
                                                                                            </div>
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="modal custom show" id={"trackModal1" + val.id} tabIndex="-1" role="dialog"
                                                             aria-labelledby="trackModalLabel" aria-hidden="true">
                                                            <div className="modal-dialog">
                                                                <div className="modal-content" style={{height: "100%", backgroundImage: "url(" + logo + ")", backgroundColor: "black"}}>

                                                                    <div className="modal-header">
                                                                        <h3 className="getlaid text-light" id="trackModalLabel">Add To Cart</h3>
                                                                        <button id={"closeTwo" + val.id} type="button" className="close danger-color-dark" data-dismiss="modal" aria-label="Close" style={{borderRadius: "10px"}}>
                                                                            <span aria-hidden="true">&times;</span>
                                                                        </button>
                                                                    </div>

                                                                    <div className="modal-body" style={{overflow:"auto"}}>
                                                                        <div className="card text-center" id="card-beats">
                                                                            <div className="card-header text-center border-bottom-0 bg-transparent text-success pt-4">
                                                                                <h5 className="text-light">Add stems</h5>
                                                                            </div>
                                                                            <div className="card-body">
                                                                                <h1 className="text-light">24,99 euros</h1>
                                                                            </div>

                                                                            <div className="card-body list-group-flush">
                                                                                <h4 className="fas fa-male text-green mx-2">for more work flexibility on the beats</h4>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row" style={{margin:"0 auto", paddingTop:"50px"}}>
                                                                            <button className="btn btn-outline-danger btn-sm pl-5 pr-5" style={{margin:"0 auto"}} onClick={(e) => this.handleSubmit(e)}>cancel</button>
                                                                            <button className="btn btn-outline-success btn-sm pl-5 pr-5" style={{margin:"0 auto"}} onClick={(e) => {this.setState({price: this.state.price + 29.99, samples: true}, () => {
                                                                                this.handleSubmit(e);
                                                                            })}}>Accept</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                <div>
                </div>
            </div>
            </div>
        );
    }
    static pausePlayer() {
        _this.pausePlayer(false);
    }

    static playPlayer(index, type_) {
        _this.Play(index, type_);
    }

    static changeIndex(index) {
        _this.setState({index: index});
    }
}

const mapStateToProps = state => {
    return {
        beats: state.beats.beats
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBeats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        updateBeats: (data) => {
            dispatch({type: "UPDATE_BEATS_LIST", data: data})
        },
        resetBeats: (data) => {
            dispatch({type: "RESET_BEATS", data: data})
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Beats);
