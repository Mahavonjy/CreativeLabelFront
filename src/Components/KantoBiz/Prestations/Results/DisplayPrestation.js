import React, { Component } from "react";
import DatePicker from "react-datepicker"
import StarRatings from 'react-star-ratings';
import Calendar from "../../Calendar/Calendar";

import "./Results.css"

class DisplayPrestation extends Component {
    state = {
        isMounted: false,
        event_date: new Date(),
        rating: 1
    };

    changeRating = ( newRating ) => {
        this.setState({
            rating: newRating
        });
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    ImageClick = (e) => {
        const cube = document.querySelector(".cube");
        let cubeImageClass = cube.classList[1];

        const targetNode = e.target.nodeName;
        const targetClass = e.target.className;

        if (targetNode === "INPUT" && targetClass !== cubeImageClass) cube.classList.replace(cubeImageClass, targetClass);
    };

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="Base pt-5 p-b-100">
                <div className="profile-page">
                    <div className="page-header header-filter" data-parallax="true" style={{backgroundImage: 'url("http://wallpapere.org/wp-content/uploads/2012/02/black-and-white-city-night.png")'}} />
                    <div className="main bg-dark main-raised ml-3 mr-3">
                        <div className="profile-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto">
                                        <div className="profile">
                                            <div className="avatar-plain">
                                                <img src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTU0NjQzOTk4OTQ4OTkyMzQy/ansel-elgort-poses-for-a-portrait-during-the-baby-driver-premiere-2017-sxsw-conference-and-festivals-on-march-11-2017-in-austin-texas-photo-by-matt-winkelmeyer_getty-imagesfor-sxsw-square.jpg" alt="Circle" className="img-raised rounded-circle img-fluid" />
                                            </div>
                                            <div className="name pt-5">
                                                <h3 className="title text-red text-center">Thematic Title</h3>
                                                <h6>Kilalaky, Rap, Batrelaky, Afro-Trap</h6>
                                                <button className="btn btn-link btn-outline-info icon-instagram"/>
                                                <button className="btn btn-link btn-outline-info icon-facebook"/>
                                                <button className="btn btn-link btn-outline-info icon-twitter"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="description text-center">
                                    <p>An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p>
                                    <StarRatings rating={this.state.rating}
                                                 starRatedColor="#ED1C24"
                                                 changeRating={this.changeRating}
                                                 numberOfStars={5}
                                                 starDimension="20px"
                                                 starSpacing="10px"
                                                 name='rating'/>
                                </div>
                                <div className="row text-center pt-5">
                                    <div className="col-md-4">
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">400$ &nbsp;<i className="icon icon-info"/></h2>
                                                <h4 className="col text-primary">Durée de la préparation : 1j</h4>
                                                <h4 className="col text-primary">Durée de la prestation : 1j</h4>
                                                <div className="col">
                                                    <div className="s-24">09</div>
                                                    <span>March 2019</span>
                                                </div>
                                                <div className="col">
                                                    <small><i className="icon-clock-o mr-1"/> 7:00 PM - 11:00 PM</small>
                                                </div>
                                                <div className="col pt-5 pb-5">
                                                    <div className="custom-float">
                                                        <div className="input-group-prepend d-inline-block center">
                                                            <div className="input-group-text text-dark">
                                                                <i className="icon-clock-1"/>&nbsp;Editer la date ici *</div>
                                                            <DatePicker selected={this.state.event_date}
                                                                        onChange={date => this.setState({event_date: date})}
                                                                        showTimeSelect
                                                                        timeFormat="HH:mm"
                                                                        timeIntervals={15}
                                                                        timeCaption="time"
                                                                        className="form-control datePick"
                                                                        dateFormat="MMMM d, yyyy h:mm aa"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <small><i className="icon-map-marker"/>&nbsp;33 Cliveden Close, Melbourne VIC 3000, Australia</small>
                                                <div className="col pt-5 pb-5">
                                                    <div className="custom-float">
                                                        <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                                            <div className="input-group-text text-dark">
                                                                <i className="icon-map-marker"/>&nbsp;Ajouter une adresse ici *</div>
                                                            <input type="text" id="Description" name="Description" className="form-control" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-success">Reserver</button>
                                        </div>
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">Plus de détails</h2>
                                                <h4 className="col"><strong>Politique d’annulation  :</strong> flexible&nbsp;<i className="icon icon-info"/></h4>
                                                <h4 className="col"><strong>Catégorie :</strong> rien</h4>
                                                <h4 className="col"><strong>Type d’évènement(s) :</strong> Mariage, Anniversaire</h4>
                                                <h4 className="col"><strong>Nombre d'artiste(s) :</strong> 1</h4>
                                                <h4 className="col"><strong>Lieu de base :</strong> Manakara</h4>
                                                <h4 className="col"><strong>Lieu d’intérêt(s) :</strong> Toliara, Tamatave</h4>
                                            </div>
                                        </div>
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">Matériels nécessaires&nbsp;<i className="icon icon-info"/></h2>
                                                <div className="col">
                                                    <ul>
                                                        <li><i className="icon icon-success text-green"/>Sonorisation</li>
                                                        <li><i className="icon icon-success text-green"/>Accessoires de scène</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Options&nbsp;<i className="icon icon-info"/></h2>

                                            <table className="responstable">
                                                <tbody>
                                                <tr>
                                                    <th>Ajouter</th>
                                                    <th>Name</th>
                                                    <th>Tag</th>
                                                    <th>Price</th>
                                                    <th>Description&nbsp;<i className="icon icon-info"/></th>
                                                </tr>
                                                <tr>
                                                    <td data-th="Ajouter"><i className="icon icon-plus s-24" /></td>
                                                    <td data-th="Name">Shooting</td>
                                                    <td data-th="Tag">Photographe</td>
                                                    <td data-th="Price">800 $</td>
                                                    <td data-th="Description">New Description</td>
                                                </tr>
                                                <tr>
                                                    <td data-th="Ajouter"><i className="icon icon-plus s-24" /></td>
                                                    <td data-th="Name">Grillade</td>
                                                    <td data-th="Tag">Cuisinier</td>
                                                    <td data-th="Price">200 $</td>
                                                    <td data-th="Description">New Description</td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Galeries&nbsp;<i className="icon icon-info"/></h2>
                                            <div>
                                                <div className="cube-container">
                                                    <div className="cube initial-position">
                                                        <img className="cube-face-image image-1" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=300&h=300&fit=crop" alt=""/>
                                                        <img className="cube-face-image image-2" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=300&h=300&fit=crop" alt=""/>
                                                        <img className="cube-face-image image-3" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=300&h=300&fit=crop" alt=""/>
                                                        <img className="cube-face-image image-4" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=300&h=300&fit=crop" alt=""/>
                                                        <img className="cube-face-image image-5" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=300&h=300&fit=crop" alt=""/>
                                                        <img className="cube-face-image image-6" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=300&h=300&fit=crop" alt=""/>
                                                    </div>
                                                </div>
                                                <div className="image-buttons">
                                                    <input onClick={this.ImageClick} type="image" className="show-image-1" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=100&h=100&fit=crop" alt=""/>
                                                    <input onClick={this.ImageClick} type="image" className="show-image-2" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=100&h=100&fit=crop" alt=""/>
                                                    <input onClick={this.ImageClick} type="image" className="show-image-3" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=100&h=100&fit=crop" alt=""/>
                                                    <input onClick={this.ImageClick} type="image" className="show-image-4" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=100&h=100&fit=crop" alt=""/>
                                                    <input onClick={this.ImageClick} type="image" className="show-image-5" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=100&h=100&fit=crop" alt=""/>
                                                    <input onClick={this.ImageClick} type="image" className="show-image-6" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=100&h=100&fit=crop" alt=""/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Calendrier&nbsp;<i className="icon icon-info"/></h2>
                                            <Calendar noEdit/>
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

export default DisplayPrestation;
