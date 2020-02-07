import React, { useEffect, useRef, useState } from "react";

function RefundPolicy () {

    const isMounted = useRef(false);
    const [flexible, setFlexible] = useState(true);
    const [strict, setStrict] = useState(false);

    const Flexible = () => {
        setFlexible(true);
        setStrict(false);
    };

    const Strict = () => {
        setFlexible(false);
        setStrict(true);
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="text-center" style={{minHeight: 320}}>
            <section className="section section--aava">
                <h4 className="text-center pt-4 pb-4">Veuillez choisir la politique qui vous convflexibleient</h4>
                <div className="toggle-button toggle-button--aava">
                    <input id="toggleButton" type="checkbox" checked={flexible}/>
                    <label className="flexible" htmlFor="toggleButton" data-on-text="Flexible" data-off-text="Flexible" onClick={() => Flexible()}/>
                    <div className="toggle-button__icon" />
                </div>
                <div className="toggle-button toggle-button--aava">
                    <input id="toggleButton2" type="checkbox" checked={strict}/>
                    <label className="strict" htmlFor="toggleButton2" data-on-text="Stricte" data-off-text="Stricte" onClick={() => Strict()}/>
                    <div className="toggle-button__icon" />
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h3 className="text-red">Si Flexible</h3>
                    <ol className="list-group-item text-center flexible">
                        <li className="bolder list-group-item">Si l’utilisateur annule jusqu à 7 jours avant le début de la représentation il est remboursé à 100%.</li>
                        <li className="bolder list-group-item">S’il annule moins de 7 jours avant la représentation il est remboursé à 50%</li>
                    </ol>
                </div>
                <div className="col-lg-6">
                    <h3 className="text-red">Si Stricte</h3>
                    <ol className="list-group-item text-center strict">
                        <li className="bolder list-group-item">Si l’utilisateur annule jusqu’à 7 jours avant le début de la représentation, il est remboursé à 50%.</li>
                        <li className="bolder list-group-item">Si l’utilisateur annule moins de 7 jours avant la représentation, il n’y a pas de remboursement.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy;
