import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// import logo from '../../images/Logo/ISL_logo.png'

class PreviewScreen extends Component {
    render() {
        return(
            <div>
                <ul className="slideshow">
                    <li>
                        <span/>
                    </li>
                    <li>
                        <span/>
                    </li>
                    <li>
                        <span/>
                    </li>
                    <li>
                        <span/>
                    </li>
                    <li>
                        <span/>
                    </li>
                    <li>
                        <span/>
                    </li>
                </ul>
                <div className="slideshow-container">
                    <header>
                        <div>
                            <h1 className="text-light" style={{textShadow: "2px 2px #195998"}}>Plateforme exclusive d'achat & vente d'instrus Afro-Tropicale</h1>
                            <p className="text-light">Hip Hop, Afro beats, Reggae, Dancehall, Riddim, Couper Décaler, Ndombolo, Salegy, Maloya, Kawitry, Rumba, Benga, et bien plus...</p>
                            <br/>
                            <br/>
                            <NavLink to="/beats">
                                <button id="beats" className="btn btn-outline-success pl-lg-5 pr-lg-5">C'est parti!&nbsp;&nbsp;<i className="icon-arrow-circle-o-right"/></button>
                            </NavLink>
                        </div>
                    </header>
                </div>
            </div>
        );
    }
}
export default PreviewScreen;
