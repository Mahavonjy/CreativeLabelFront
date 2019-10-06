import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import CreatePlaylist from "./CreatePlaylist";
import { ToastContainer, toast } from 'react-toastify';
import EditPlaylist from "./EditPlaylist";

class Playlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            userPlaylist : [],
            PopupCreatePlaylist : false,
            PopupEditPlaylist : false
        };
    }

    getPlayList = () => {
        let cookies = new Cookies();
        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };

        axios.get(Conf.configs.ServerApi + "api/playlists/userPlaylist", {headers:headers}).then(resp =>{
            this.setState({userPlaylist: []}, () => {
                for (let row in resp.data.users_playlist) {
                    this.setState(prevState => ({
                        userPlaylist: [...prevState.userPlaylist, resp.data.users_playlist[row]]
                    }))
                }
            });
        }).catch(error => {
            toast.error(error.response.data)
        })
    };

    deletePlaylist = (e) => {
        let cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'multipart/form-data',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.delete(Conf.configs.ServerApi + "api/playlists/delete/" + e.target.id, {headers: new_headers}).then(resp =>{
            this.getPlayList();
            toast.success("Deleted");
        }).catch(err => {
            toast.error(err.response.data);
        })
    };

    componentDidMount() {
        this.getPlayList();
    }
    render() {
        return (
            <div className="Base">
                {this.state.PopupCreatePlaylist ? <CreatePlaylist closePopup={() => this.setState({PopupCreatePlaylist: false})
                } closePopupSuccess={() => this.setState({PopupCreatePlaylist: false}, () => {
                        this.getPlayList();
                        toast.success("Playlist Created")
                    })} /> : <ToastContainer/>}

                {this.state.PopupEditPlaylist ? <EditPlaylist closePopup={() => this.setState({PopupEditPlaylist: false})
                } closePopupSuccess={() => this.setState({PopupEditPlaylist: false}, () => {
                    this.getPlayList();
                    toast.success("Playlist updated")
                })} data={this.state.data}/> : <ToastContainer/>}
                <div className="row">
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-header transparent b-b">
                                <strong>Playlist</strong>
                            </div>

                            <i className="icon icon-plus-circle s-24" onClick={() => this.setState({PopupCreatePlaylist: true})} style={{position: "absolute", right: 50, top: 10}}/>
                            <div className="card-body has-items-overlay playlist p-5">
                                {this.state.userPlaylist.length !== 0 ?
                                <div className="row">
                                    {this.state.userPlaylist.map((val, index) =>
                                    <div className="col-md-3 mb-3" key={index}>
                                        <figure className="mb-2">
                                            <div className="img-wrapper r-10">
                                                <img className=" r-10" src={val.photo} alt="/" />
                                                <div className="img-overlay text-white p-5">
                                                    <div className="center-center">
                                                        <div className="no-ajaxy media-url">
                                                            <i className="icon-play s-48" />
                                                            <i className="icon-edit s-48" onClick={() =>  this.setState({data: val}, () => {
                                                                this.setState({PopupEditPlaylist: true})})} />
                                                            <i className="icon-times-circle s-48" id={val.id} onClick={(e) => this.deletePlaylist(e)}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </figure>
                                        <div className="figure-title">
                                            <h6>{val['name']}</h6>
                                            <small>{val['genre']}</small>
                                        </div>
                                    </div>
                                    )}
                                </div> :<i className="icon icon-add s-64" onClick={() => this.setState({PopupCreatePlaylist: true})}/>}
                            </div>
                        </div>
                    </div>
                    <aside className="col-md-4">
                        <div className="card mb-3">
                            <div className="card-header transparent b-b">
                                <strong>Latest Songs</strong>
                            </div>
                            <ul className="playlist list-group list-group-flush">
                                <li className="list-group-item">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <a className="no-ajaxy media-url" href="assets/media/track2.mp3" data-wave="assets/media/track2.json">
                                                <i className="icon-play s-28" />
                                            </a>
                                        </div>
                                        <div className="col-10">
                                            <figure className="avatar-md float-left  mr-3 mt-1">
                                                <img className="r-3" src="assets/img/demo/a4.jpg" alt="" />
                                            </figure>
                                            <h6>Dance with me tonight</h6>
                                            <small>Atif Aslam</small>
                                        </div>
                                        <small className="ml-auto"> 5:03</small>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        );
    }
}

export default Playlist;
