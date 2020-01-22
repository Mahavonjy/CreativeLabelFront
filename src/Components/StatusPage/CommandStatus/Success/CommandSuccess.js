import React, { useEffect, useRef } from "react";

function CommandSuccess() {

    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="container">
            <div className="col-xl-12 mx-lg-auto">
                <div className="pt-5 p-t-100 text-center">
                    <h1 className="text-success">Felicitation</h1>
                    <p className="section-subtitle">Merci pour votre commande d'Instrumental chez nous. votre commande vous sera envoyer sur votre boite email d'ici quelques instant.</p>
                    <p className="s-256"><i className="icon-success text-success s-256"/></p>
                    <a href="/#" className="text-light font-weight-bold">Visualiser Votre Commande</a>
                </div>
            </div>
        </div>
    );
}

export default CommandSuccess;
