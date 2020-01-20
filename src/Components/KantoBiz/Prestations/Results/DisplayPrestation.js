import React, { Component } from "react";
import DatePicker from "react-datepicker"
import StarRatings from 'react-star-ratings';
import Calendar from "../../Calendar/Calendar";
import * as Tools from "../../../FunctionTools/Tools";
import {toast} from "react-toastify";
import "../../style/Results.css"
import ReactTooltip from "react-tooltip";
import PurchaseInformation from "../../../Cart/PurchaseInformation";

class DisplayPrestation extends Component {
    state = {
        isMounted: false,
        event_date: new Date(), // synchroniser avec la recherche après
        reservation: false,
        address: "",
        price: 400,
        rating: 1
    };

    Reserve = () => {
        let new_date = Tools.formatDate(this.state.event_date);
        let now = Tools.formatDate(new Date());
        if (!this.state.address) toast.error("Veuiller nous renseigner l'adresse de votre evenenment");
        else if (parseInt(new_date) - parseInt(now) <= 0) toast.error("Veuillez mettre une autre date");
        else this.setState({reservation: true})
    };

    changeRating = ( newRating ) => {
        this.setState({
            rating: newRating
        });
    };

    ImageClick = (e) => {
        const cube = document.querySelector(".cube");
        let cubeImageClass = cube.classList[1];

        const targetNode = e.target.nodeName;
        const targetClass = e.target.className;

        if (targetNode === "INPUT" && targetClass !== cubeImageClass) cube.classList.replace(cubeImageClass, targetClass);
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="Base pt-5 p-b-100">
                <ReactTooltip/>
                <ReactTooltip className="special-color-dark" id='refund' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Details des rembouresement </h5><br/>
                    <h6 className="text-center text-info"> Rembouresement flexible</h6>
                    <small>• Si l’utilisateur annule jusqu à 7 jours avant le début de la représentation il est remboursé à 100%. </small><br/>
                    <small>• Si l’utilisateur annule moins de 7 jours avant la représentation il est remboursé à 50% </small><br/><br/>
                    <h6 className="text-center text-info"> Rembouresement stricte</h6>
                    <small>• Si l’utilisateur annule jusqu’à 7 jours avant le début de la représentation, il est remboursé à 50%</small><br/>
                    <small>• Si l’utilisateur annule moins de 7 jours avant la représentation, il n’y a pas de remboursement.</small><br/><br/>
                </ReactTooltip>
                <ReactTooltip className="special-color-dark" id='option' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Explication des options </h5><br/>
                    <small>• Quelque option en plus de la prestation d'origine que l'artist propose pour amelioré le show </small><br/>
                    <small>• Voici quelques exemple d'option : Featuring avec un artiste, shooting ... </small><br/><br/>
                </ReactTooltip>
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
                                                <h3 className="title text-red text-center" data-tip="Titre de la Prestation">Thematic Title</h3>
                                                <h6 className="pb-2" data-tip="Different genre produit par l'artiste">Kilalaky, Rap, Batrelaky, Afro-Trap</h6>
                                                <button className="btn btn-link btn-outline-info icon-instagram" data-tip="Partager Cette Prestation sur Instagram"/>
                                                <button className="btn btn-link btn-outline-info icon-facebook" data-tip="Partager Cette Prestation sur Facebook"/>
                                                <button className="btn btn-link btn-outline-info icon-twitter" data-tip="Partager Cette Prestation sur Twitter"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="description text-center">
                                    <p data-tip="Description">An artist of considerable range, Chet Faker — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. </p>
                                    <div className="flex-column justify-content-center" data-tip="Noter Moi">
                                        <StarRatings rating={this.state.rating}
                                                     starRatedColor="red"
                                                     changeRating={this.changeRating}
                                                     numberOfStars={5}
                                                     starDimension="20px"
                                                     starSpacing="10px"
                                                     className="col"
                                                     name='rating'/>
                                        <span className="col pt-2">5&nbsp;✰</span>
                                    </div>

                                </div>
                                <div className="row text-center pt-5">
                                    <div className="col-md-4">
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">{this.state.price}$&nbsp;<i className="icon icon-info" data-tip="Ceci est le prix HT de la prestation"/></h2>
                                                <h4 className="col text-primary">Durée de la préparation : 1j&nbsp;<i className="icon icon-info" data-tip="Ceci est le temps de preparation de l'artiste"/></h4>
                                                <h4 className="col text-primary">Durée de la prestation : 1j&nbsp;<i className="icon icon-info" data-tip="Ceci est le durée de l'evenement"/></h4>
                                                <div className="col">
                                                    <div className="s-24">09</div>
                                                    <span>March 2019</span>
                                                </div>
                                                <div className="col">
                                                    <small><i className="icon-clock-o mr-1"/> 7:00 PM - 11:00 PM</small>
                                                </div>
                                                <div className="col pt-2 pb-2">
                                                    <div className="custom-float">
                                                        <div className="input-group-prepend d-inline-block center">
                                                            <div className="input-group-text text-dark">
                                                                <i className="icon-clock-1"/>&nbsp;Editer la date ici *&nbsp;<i className="icon icon-info" data-tip="La date et l'heure exact du déroulement de votre evenement"/></div>
                                                            <DatePicker selected={this.state.event_date}
                                                                        onChange={date => this.setState({event_date: date})}
                                                                        showTimeSelect
                                                                        timeFormat="HH:mm"
                                                                        timeIntervals={15}
                                                                        timeCaption="time"
                                                                        className="form-control"
                                                                        style={{zIndex: 99}}
                                                                        dateFormat="MMMM d, yyyy h:mm aa"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                <small><i className="icon-map-marker"/>&nbsp;{this.state.address ? this.state.address : "Veuiller nous renseigner en bas l'adresse de votre evenenment"}</small>
                                                <div className="col pt-2 pb-2">
                                                    <div className="custom-float">
                                                        <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                                            <div className="input-group-text text-dark">
                                                                <i className="icon-map-marker"/>&nbsp;Ajouter une adresse ici *</div>
                                                            <input type="text" value={this.state.address} id="address"
                                                                   placeholder="Ecrire ici l'adresse de votre evenement"
                                                                   name="address" className="form-control"
                                                                   onChange={(e) => Tools.changeFields(this, e)} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="btn btn-outline-success" onClick={this.Reserve}>Reserver</button>
                                        </div>
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">Plus de détails</h2>
                                                <h4 className="col"><strong>Politique d’annulation  :</strong> flexible&nbsp;<i className="icon icon-info" data-tip data-for='refund'/></h4>
                                                <h4 className="col"><strong>Catégorie :</strong> rien</h4>
                                                <h4 className="col"><strong>Type d’évènement(s) :</strong> Mariage, Anniversaire</h4>
                                                <h4 className="col"><strong>Nombre d'artiste(s) :</strong> 1</h4>
                                                <h4 className="col"><strong>Lieu de base :</strong> Manakara</h4>
                                                <h4 className="col"><strong>Lieu d’intérêt(s) :</strong> Toliara, Tamatave</h4>
                                            </div>
                                        </div>
                                        <div className="mb-4 card">
                                            <div className="flex-grow-0 text-center pb-3">
                                                <h2 className="col text-primary pb-3">Matériels nécessaires&nbsp;<i className="icon icon-info" data-tip="Les outils dont il a besoin pour mener à bien sa représentation artistique"/></h2>
                                                <div className="col">
                                                    <ul>
                                                        <li><i className="icon icon-success text-green"/>Sonorisation</li>
                                                        <li><i className="icon icon-success text-green"/>Accessoires de scène</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {this.state.reservation ?
                                        <div className="col-md-8">
                                            <PurchaseInformation eventDate={this.state.event_date}
                                                                 address={this.state.address}
                                                                 TotalPrice={this.state.price} kantoBiz/>
                                        </div> :
                                        <div className="col-md-8">
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Options&nbsp;<i className="icon icon-info" data-tip data-for="option"/></h2>

                                            <table className="responsive-table border-0">
                                                <thead>
                                                <tr>
                                                    <th scope="col">Name&nbsp;<i className="icon icon-info" data-tip="Nom donner par l'artiste cette option"/></th>
                                                    <th scope="col">Tag&nbsp;<i className="icon icon-info" data-tip="Le nom des autres artiste proposé avec"/></th>
                                                    <th scope="col">Prix&nbsp;<i className="icon icon-info" data-tip="Le prix de cette option en plus de la prestation"/></th>
                                                    <th scope="col">Description&nbsp;<i className="icon icon-info" data-tip="quelque description qui explique l'option"/></th>
                                                    <th scope="col-lg-4">Ajouter&nbsp;<i className="icon icon-info" data-tip="Ajouter cette l'option en plus de la prestation"/></th>
                                                </tr>
                                                </thead>

                                                <tbody>
                                                    <tr>
                                                        <th className="text-center small bolder border-left-0 border-bottom-0" scope="row">Shooting</th>
                                                        <td className="small" data-title="Tag">Photographe</td>
                                                        <td className="small" data-title="Prix">800$</td>
                                                        <td className="small" data-title="Description">New Description</td>
                                                        <td className="small border-bottom-0 border-right-0" data-title="Ajouter"><i className="icon icon-plus s-24" data-tip="Ajoute moi"/></td>
                                                    </tr>
                                                    <tr>
                                                        <th className="text-center small bolder border-left-0 border-bottom-0" scope="row">Featuring</th>
                                                        <td className="small" data-title="Tag">Jazz mmc</td>
                                                        <td className="small" data-title="Prix">800$</td>
                                                        <td className="small" data-title="Description">New Description</td>
                                                        <td className="small border-bottom-0 border-right-0" data-title="Ajouter"><i className="icon icon-plus s-24" data-tip="Ajoute moi"/></td>
                                                    </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                        <div className="flex-grow-0 text-center pb-3">
                                            <h2 className="col text-primary pb-3">Galeries&nbsp;<i className="icon icon-info" data-tip="Quelques photo de l'artiste sur cette prestation"/></h2>
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
                                            <h2 className="col text-primary pb-3">Calendrier&nbsp;<i className="icon icon-info" data-tip="Le planing de d'artiste sur cette prestation"/></h2>
                                            <Calendar noEdit/>
                                        </div>
                                    </div>}
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
