import React, { Component } from "react";
import './offers.css'

class Offers extends Component {
    state = {
        isMounted: false,
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="card-group">
                {/* Free Tier */}

                <div className="col-lg-12">
                    <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h1 className="card-title text-muted text-uppercase text-center">Standard</h1>
                            <h6 className="card-price text-center"><span className="period">MP3</span></h6>
                            <hr />
                            <ul className="fa-ul text-center">
                                <li><span className="fa-li"><i className="fas fa-check" /></span>MP3 (sans voicetag)</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation non-commerciale & promotionnelle uniquement</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Mise en ligne sur Soundcloud  autorisée</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation non-commerciale pour Album + Shows</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Streams limités & non-monétisés</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>100% libre de droits</li>
                                <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>Credits : Prod. par [Nom du producteur] / ISL Creative</li>
                            </ul>
                            <button onClick={() => {document.getElementsByClassName("closeOffers")[0].click()}} className="btn btn-block btn-primary text-uppercase">Go back to store</button>
                        </div>
                    </div>
                </div>

                {/* Plus Tier */}
                <div className="col-lg-12 pt-4">
                    <div className="card mb-5 mb-lg-0">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Silver</h5>
                            <h6 className="card-price text-center"><span className="period">MP3 + WAVE</span></h6>
                            <hr />
                            <ul className="fa-ul text-center">
                                <li><span className="fa-li"><i className="fas fa-check" /></span><strong>MP3 + WAV (sans voicetag)</strong></li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation commerciale- jusqu'à 10 000 copies</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Mise en ligne sur Soundcloud, Apple Music, iTunes,Spotify,etc...</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation commerciale pour album, shows + clip vidéo</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Streams limités </li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Diffusions TV & Radio limitée</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>100% libre de droits</li>
                                <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>Credits : Prod. par [Nom du producteur] / ISL Creative</li>
                            </ul>
                            <button onClick={() => {document.getElementsByClassName("closeOffers")[0].click()}} className="btn btn-block btn-primary text-uppercase">Go back to store</button>
                        </div>
                    </div>
                </div>
                {/* Pro Tier */}
                <div className="col-lg-12 pt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Gold</h5>
                            <h6 className="card-price text-center"><span className="period">MP3 + WAVE + STEMS</span></h6>
                            <hr />
                            <ul className="fa-ul text-center">
                                <li><span className="fa-li"><i className="fas fa-check" /></span><strong>MP3 + WAV+ Stems (sans voicetag)</strong></li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Possibilité de mixer et réarranger avec les stems (trackouts)</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Inclut les caractéristiques de la licence Silver</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>steams limités</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Diffusion TV & Radio illimitée</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>100% libre de droits</li>
                                <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>Credits : Prod. par [Nom du producteur] / ISL Creative</li>
                            </ul>
                            <button onClick={() => {document.getElementsByClassName("closeOffers")[0].click()}} className="btn btn-block btn-primary text-uppercase">Go back to store</button>
                        </div>
                    </div>
                </div>

                <div className="col-lg-12 pt-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-muted text-uppercase text-center">Platinum</h5>
                            <h6 className="card-price text-center"><span className="period">Unlimited</span></h6>
                            <hr />
                            <ul className="fa-ul text-center">
                                <li><span className="fa-li"><i className="fas fa-check" /></span><strong>MP3 + WAV+ Stems (sans voicetag)</strong></li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Possibilité de mixer et réarranger avec les stems (trackouts)</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation commerciale illimitée: ventes + streams (iTunes, Spotify  etc.)</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Utilisation commerciale pour Album+ Shows+ Clip vidéo</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>Diffusion TV & Radio illimitée</li>
                                <li><span className="fa-li"><i className="fas fa-check" /></span>100% libre de droits</li>
                                <li className="text-muted"><span className="fa-li"><i className="fas fa-times" /></span>Credits : Prod. par [Nom du producteur] / ISL Creative</li>
                            </ul>
                            <button onClick={() => {document.getElementsByClassName("closeOffers")[0].click()}} className="btn btn-block btn-primary text-uppercase">Go back to store</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Offers;
