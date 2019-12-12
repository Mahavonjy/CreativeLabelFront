import React, { Component } from "react";
import axios from 'axios';
import './Home.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Cart from "../Cart/Cart";
import IslPlayer from "../Players/Players";
import Conf from "../../Config/tsconfig";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import FunctionTools from "../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../FunctionTools/CreateFields";
import * as PopupFields from "../FunctionTools/PopupFields";

let key = Math.floor(Math.random() * Math.floor(999999999));
let ifStopPlayer = {};
let user_credentials;
let _that;
let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': "*"
};

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false, loading: false,
            href: window.location.href.split("/"),
            single_beat: '', all_artist_beats: [], beats_similar: [],
            profile_checked: '', user_data: '', user_beats: [], cart: 0,
            logout_class: "icon icon-exit-2 s-24", log_name: "logout", ret: false, connexion_reloaded: 0
        };
        _that = this
    }

    static IncrementCart = (number_) => {
        if (number_) {
            _that.setState({cart: number_})
        } else _that.setState({cart: _that.state.cart + 1})
    };

    static Decrement = () => {
        _that.setState({cart: _that.state.cart - 1})
    };

    addToPlaylist = (index, type_, component) => {
        ifStopPlayer[key] = false;
        if (!ifStopPlayer[key]) {
            key = Math.floor(Math.random() * Math.floor(999999999));
            ifStopPlayer[key] = true;
        }
        IslPlayer.startPlayerComponent(index, type_, component);
    };

    ifConnectionError = (err) => {
        this.setState({connexion_reloaded: this.state.connexion_reloaded + 1}, () => {
            try {
                if (err.response.data === "Connection error") {
                    if (this.state.connexion_reloaded > 3) {
                        window.location.replace('/badConnexion')
                    } else {
                        setTimeout(() => {
                            this.componentDidMount();
                        }, 5000);
                    }
                } else if (err.response.data === "token invalid") {
                    this.logout();
                } else {
                    this.logout();
                }
            } catch (e) {
                console.log(err)
                // this.logout();
            }
        })
    };

    NotOnline = (headers_) => {
        axios.get(Conf.configs.ServerApi + "api/beats/AllSuggestion", {headers: headers_}).then(resp => {
            this.props.addBeats(resp.data["random"]);
            this.props.newBeatMaker(resp.data["new_beatMaker"]);
            this.props.topBeatMaker(resp.data["top_beatmaker"]);
            this.props.latestBeats(resp.data["latest_beats"]);
            this.props.discoveryBeats(resp.data["discovery_beats"]);
            this.props.islBeats(resp.data["isl_playlist"]);
            axios.get(Conf.configs.ServerApi + "api/medias/allMediaGenre", {headers: headers_}).then(resp =>{
                let tmp_arr = [];
                for (let row in resp.data) {tmp_arr.push(resp.data[row].genre)}
                this.props.addAllMediaGenre(tmp_arr);
                if (this.state.href[this.state.href.length - 2] === "CheckThisBeat") {
                    axios.get(Conf.configs.ServerApi + "api/beats/OneBeat/" + this.state.href[this.state.href.length -1], {headers: headers_}).then(resp => {
                        this.setState({
                            single_beat: resp.data['single_beat'],
                            all_artist_beats: resp.data['all_artist_beats'],
                            beats_similar: resp.data['similar_beats']
                        }, () => {this.setState({loading: false})})
                    }).catch(() => {window.location.replace('/NotFound')})
                } else if (this.state.href[this.state.href.length - 2] === "isl_artist_profile") {
                    axios.get(Conf.configs.ServerApi + "api/profiles/check_other_profile/" + this.state.href[this.state.href.length -1], {headers: headers_}).then(resp =>{
                        this.setState({
                            profile_checked: resp.data['profile_checked'],
                            user_data: resp.data['user_data'],
                            user_beats: resp.data['user_beats']
                        }, () => {this.setState({loading: false})})
                    }).catch(() => {toast.error("Connection Error")})
                } else if (this.state.href[this.state.href.length - 1] === 'Cart') {
                    if (!this.state.cart) window.location.replace('/beats');
                    else this.setState({loading: false});
                } else {
                    this.setState({loading: false}, () => {
                        if (this.state.href[this.state.href.length - 1] === "beats#LoginRequire")
                            document.getElementsByClassName("LoginRequire")[0].click();
                    })
                }
            }).catch(err => {
                console.log(err.response)
            });
        }).catch(err => {
            console.log(err)
        });
    };

    Online = () => {
        this.setState({loading: true}, () => {
            try {
                this.setState({cart: JSON.parse(localStorage.getItem("MyCarts")).length})
            } catch (e) {
                console.log('')
            } finally {
                try {
                    headers['Isl-Token'] = user_credentials.token;
                    if (this.state.href[this.state.href.length - 1] === 'register') {
                        window.location.replace('/beats')
                    } else if (this.state.href[this.state.href.length - 1] !== 'preference') {
                        axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: headers}).then(() => {
                            this.fetchUserData()
                        }).catch(err => {
                            try {
                                if (err.response.data === "no choice music genre") {
                                    window.location.replace('/preference');
                                } else if (err.response.data === "token invalid") {
                                    this.logout()
                                } else this.NotOnline(headers)
                            } catch(e) {
                                window.location.replace('/badConnexion')
                            }
                        });
                    } else {
                        axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: headers}).then(() => {
                            this.fetchUserData()
                        }).catch(() => {
                            this.setState({loading: false});
                        });
                    }
                } catch (e) {
                    this.setState({logout_class: "icon icon-login s-24", log_name: "login"}, () => {
                        headers['Isl-Token'] = Conf.configs.TokenVisitor;
                        this.NotOnline(headers)
                    });
                }
            }
        });
    };

    fetchUserData = () => {
        axios.get(Conf.configs.ServerApi + "api/beats/pricing", {headers: headers}).then(resp => {
            this.props.beats_initialisation_pricing(resp.data);
            axios.get(Conf.configs.ServerApi + "api/profiles/my_profile", {headers: headers}).then(resp => {
                this.props.profile_initialisation_info(resp.data['my_profile']);
                this.props.profile_initialisation_role(resp.data['role']);
                this.props.profile_initialisation_follower(resp.data['my_followers']);
                this.props.profile_initialisation_following(resp.data['my_followings']);
                FunctionTools.AddPropsCart(headers, this.props).then(() => console.log());
                if (resp.data['role'] === "Artist") {
                    axios.get(Conf.configs.ServerApi + "api/medias/all_user_songs_and_albums", {headers: headers}).then(resp => {
                        this.props.profile_add_beats(resp.data['beats']);
                        this.props.profile_add_single(resp.data['music']);
                        this.props.profile_add_albums(resp.data['albums']);
                        axios.get(Conf.configs.ServerApi + "api/beats/contract/user_artist_contact", {headers: headers}).then(resp => {
                            this.props.profile_initialisation_contract(resp.data);
                            this.NotOnline(headers)
                        }).catch(err => {
                            this.ifConnectionError(err);
                        })
                    }).catch(err => {
                        console.log(err.response)
                    })
                } else {
                    this.NotOnline(headers)
                }
            }).catch(err => {
                this.ifConnectionError(err);
            });
        }).catch(err => {
            this.ifConnectionError(err);
        });
    };

    componentDidMount() {
        this.setState({isMounted: true }, () => {
            user_credentials = JSON.parse(localStorage.getItem("Isl_Credentials"));
            if (this.props.beats.length === 0) {
                this.Online();
            } else {
                console.log("")
            }
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    logout = () => {
        try {
            if (headers['Isl-Token'] === Conf.configs.TokenVisitor) {
                document.getElementById("LoginRequire").click();
            } else {
                axios.delete(Conf.configs.ServerApi + "api/users/logout", {headers: headers}).then(() => {
                    localStorage.removeItem('Isl_Credentials');
                    window.location.replace('/beats');
                }).catch(() => {
                    localStorage.removeItem('Isl_Credentials');
                    window.location.replace('/beats');
                })
            }
        } catch (e) {
            window.location.reload()
        }
    };

    render() {
        if (this.state.loading) {
            // Here is Loading page
            return (this.props.LoadingHome());
        } else {
            return (
                <div>
                    {/* Popup Login */}
                    {this.props.Login()}
                    {/* End of Popup */}
                    <Router>
                        <Route render={({ location, history }) => (
                            <React.Fragment>
                                <aside className="main-sidebar fixed offcanvas shadow" data-toggle="offcanvas">
                                    {/* SideBars with ICON */}
                                    {this.props.SideBars(this, location, history, headers)}
                                    {/* End SideBars */}
                                </aside>
                                <main>
                                    {/* Main of SideBars */}
                                    {this.props.SideBarsMain(this)}
                                    {/* End main of SideBars */}
                                </main>
                            </React.Fragment>)}
                        />
                    </Router>
                    <IslPlayer/>
                </div>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        AllMediaGenre: state.Home.AllMediaGenre,
        contract: state.profile.contract,
        beats_: state.profile.beats,
        beats: state.beats.beats,
        cart: state.Carts.carts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addBeats: (data) => {
            dispatch({type: "ADD_BEATS", data: data})
        },
        newBeatMaker: (data) => {
            dispatch({type: "ADD_NEW_BEATMAKER", data: data})
        },
        topBeatMaker: (data) => {
            dispatch({type: "ADD_TOP_BEATMAKER", data: data})
        },
        latestBeats: (data) => {
            dispatch({type: "ADD_LATEST_BEATS", data: data})
        },
        discoveryBeats: (data) => {
            dispatch({type: "ADD_DISCOVERY_BEATS", data: data})
        },
        islBeats: (data) => {
            dispatch({type: "ADD_ISL_PLAYLIST", data: data})
        },
        addAllMediaGenre: (data) => {
            dispatch({type: "ADD_ALL_MEDIA_GENRE", data: data})
        },
        addCarts: (data) => {
            dispatch({type: "ADD_CART", data: data})
        },
        addTotalPrice: (data) => {
            dispatch({type: "ADD_TOTAL_PRICE", data: data})
        },
        profile_add_albums: (data) => {
            dispatch({type: "ADD_PROFILE_ALBUMS", data: data})
        },
        profile_add_single: (data) => {
            dispatch({type: "ADD_PROFILE_SINGLE", data: data})
        },
        profile_add_beats: (data) => {
            dispatch({type: "ADD_PROFILE_BEATS", data: data})
        },
        beats_initialisation_pricing: (data) => {
            dispatch({type: "ADD_PRICING", data: data})
        },
        profile_initialisation_info: (data) => {
            dispatch({type: "ADD_PROFILE_INFO", data: data})
        },
        profile_initialisation_role: (data) => {
            dispatch({type: "ADD_ROLE", data: data})
        },
        profile_initialisation_follower: (data) => {
            dispatch({type: "ADD_FOLLOWER", data: data})
        },
        profile_initialisation_following: (data) => {
            dispatch({type: "ADD_FOLLOWING", data: data})
        },
        profile_initialisation_contract: (data) => {
            dispatch({type: "ADD_CONTRACT", data: data})
        },
        SideBars: bindActionCreators(CreateFields.SideBars, dispatch),
        SideBarsMain: bindActionCreators(CreateFields.SideBarsMain, dispatch),
        Login: bindActionCreators(PopupFields.Login, dispatch),
        LoadingHome: bindActionCreators(PopupFields.LoadingHome, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
