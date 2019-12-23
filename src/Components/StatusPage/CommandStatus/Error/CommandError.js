import React, { Component } from "react";

class CommandError extends Component {
    render() {
        return (
            <div className="container">
                <div className="col-xl-12 mx-lg-auto">
                    <div className="pt-5 p-t-100 text-center">
                        <h1 className="text-danger">Probleme de payement</h1>
                        <p className="section-subtitle">Nous avons rencotrer un problem sur votre commande d'Instrumental chez nous. veuiller ressayer.</p>
                        <p className="s-256"><i className="icon-error text-danger s-256"/></p>
                        <a href="/#" className="text-light font-weight-bold">Visualiser l'Erreur</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default CommandError;
