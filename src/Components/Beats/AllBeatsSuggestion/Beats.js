import React, { Component } from "react";
import axios from "axios";
import Conf from "../../../Config/tsconfig";
import {toast} from "react-toastify";
import {connect} from "react-redux";
import ReactTooltip from 'react-tooltip';
import Suggestion from "./Suggestion";
import FunctionTools from "../../FunctionTools/FunctionTools";
import Offers from "../Offers/Offers";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../FunctionTools/CreateFields";
import * as PopupFields from "../../FunctionTools/PopupFields";

let set_of_beats_name = "AllBeat";
let token = "";
let _this;

class Beats extends Component {
    ToPlay;
    constructor(props) {
        super(props);
        this.state = {
            genre:'', beats: [], song_id: '', price: 0, licenses_name: '', samples: false,
            placeHolder: "Search", visibleOffers: true,
            link_beats : [], index: null, tmp: null, isMounted: false, usingAdBlock: false, song_id_shared: null,
        };
        _this = this
    }

    changeGenre = (e) => {this.setState({genre: e.target.value}, () => {this.getBeats("genre")})};

    getBeats = (type_) => {
        if (token) {
            let url_ = "";
            let key = "";

            if (type_ === "genre") {
                this.setState({placeHolder: this.state.genre});
                url_ = "api/medias/genre/beats/" + this.state.genre;
                key = "songs"
            } else if (type_ === "random") {
                url_ = "api/beats/random";
                key = "random"
            }

            let new_headers = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': "*",
                'Isl-Token': token
            };

            axios.get(Conf.configs.ServerApi + url_, {headers: new_headers}).then(resp =>{
                const info = resp.data[key];
                this.setState({genre: ""}, () => {
                    for (let row in info) {info[row]['link'] = ""}
                    this.props.addBeats(info, {"key": true});
                    for (let row_ in this.props.beats) {FunctionTools.AddForPlay(row_, null, this, this.props.beats[row_]['id'])}
                });
            }).catch(err => {
                console.log(err.response)
            })
        }
    };

    componentDidMount() {
        this.setState({ isMounted: true, usingAdBlock: this.fakeAdBanner.offsetHeight === 0 }, () => {
            if (this.state.usingAdBlock)
                toast.error("disables your adblocker please");
            try {
                let user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
                token = user_credentials.token
            } catch (e) {
                token = Conf.configs.TokenVisitor;
            } finally {
                if (!this.props.ready) {
                    for (let row_ in this.props.beats) {FunctionTools.AddForPlay(row_, "link_beats", this, this.props.beats[row_]['id'])}
                    this.props.readyBeats()
                } else {
                    for (let row_ in this.props.beats) {
                        this.setState(prevState => ({link_beats: {...prevState.link_beats, [row_]: true}}));
                    }
                }
            }
        });

    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div>
                <div ref={r => (this.fakeAdBanner = r)}
                     style={{ height: '1px', width: '1px', visiblity: 'none', pointerEvents: 'none' }}
                     className="adBanner"/>
                <ReactTooltip/>
                {/* Headers */}
                {this.props.CreativeHeaders()}
                {/* End Headers */}
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
                                                    <h4 className="text-primary">Les instrus afro-tropicales</h4>
                                                    <p>Toutes les créactions</p>
                                                    <div className="mt-8 d-flex">
                                                        <button type="button" id="Offers" className="btn btn-outline-info btn-fab-md pl-md-6 pr-md-6 Offers" data-toggle="modal" data-target="#exampleModalOffers">Offers</button>
                                                        <div aria-disabled={"false"} className="modal fade p-t-b-50 Offers" id="exampleModalOffers" role="dialog" aria-labelledby="exampleModalLabelOffers">
                                                            <div className="modal-dialog" role="document" style={{width: "100%"}}>
                                                                <div className="modal-content transparent border-0">
                                                                    <div className="modal-header">
                                                                        <h1 className="pt-2">Creative Beats Offers</h1>
                                                                        <button type="button" className="closeOffers transparent border-0" data-dismiss="modal" aria-label="Close">
                                                                            <i className="icon-close s-36 text-red"/>
                                                                        </button>
                                                                    </div>
                                                                    <div className="modal-body">
                                                                        <Offers/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="dropdown">
                                                            <button className="btn btn-outline-secondary btn-fab-md pl-md-4 pr-md-4" type="button"
                                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                                    aria-expanded="false"><i className="icon-filter"/>Filtres</button>
                                                            <div className="dropdown-menu text-center" aria-labelledby="dropdownMenuButton">
                                                                <button className="btn btn-outline-warning btn-fab-md" onClick={() => this.getBeats("random")}>
                                                                    <i className="icon-warning mr-2"/>Reset</button>
                                                                <div className="md-form my-0">
                                                                    <div className="input-group-text bg-mdb-color">Genre&nbsp;
                                                                        <input className="form-control" type="text"
                                                                               placeholder={this.state.placeHolder}
                                                                               value={this.state.genre} onChange={this.changeGenre}
                                                                               list="music-genre"/>
                                                                    </div>
                                                                    <datalist id="music-genre">{this.props.AllMediaGenre.map((val, index) => <option key={index} value={val}/>)}</datalist>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Here is all beats, random */}
                                <div className="card-body no-p" style={{height: 400}}>
                                    <div className="tab-content" id="v-pills-tabContent1">
                                        <div className="tab-pane fade show active" id="w2-tab1" role="tabpanel" aria-labelledby="w2-tab1">
                                            {this.props.beats.length !== 0 ?
                                                <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                    {this.props.CreateBeatsPlaylist(this, set_of_beats_name, this.props.beats, "oneBeats")}
                                                </div>
                                                : <div className="playlist pl-lg-3 pr-lg-3" style={{height: 350}}>
                                                    <p className="text-center">Vide</p>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                                {/* end off all beats, random */}

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
                                            <h4 className="text-primary">Top Beatmakers</h4>
                                        </div>
                                        <small> Classement ISL Creative des Beatmakers </small>
                                    </div>
                                </div>
                                {/* Here is top beatmakers */}
                                {this.props.DisplayArtist(this.props.top_beatmaker)}
                                {/* end of top beatmakers */}
                            </div>
                        </div>
                    </div>
                    <FunctionTools/>
                    <Suggestion ToPlay={this.props.ToPlay}/>
                </section>
                </div>
            </div>
        );
    }

    static changeIndex(index) {
        _this.setState({index: index});
    }
}

const mapStateToProps = state => {
    return {
        beats: state.beats.beats,
        top_beatmaker: state.beats.top_beatmaker,
        ready: state.beats.ready,
        AllMediaGenre: state.Home.AllMediaGenre,
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
        readyBeats: () => {
            dispatch({type: "BEATS_READY"})
        },
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addNewPlayerList: (data) => {
            dispatch({type: "ADD_NEW_PLAYER_PLAYLIST", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        },
        CreateBeatsPlaylist: bindActionCreators(CreateFields.CreateBeatsPlaylist, dispatch),
        ForAddToCard: bindActionCreators(PopupFields.ForAddToCard, dispatch),
        CreativeHeaders: bindActionCreators(CreateFields.CreativeHeaders, dispatch),
        DisplayArtist: bindActionCreators(CreateFields.DisplayArtist, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Beats);
