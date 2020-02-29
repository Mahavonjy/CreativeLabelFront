import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileInitialisationCondition} from "../../FunctionTools/FunctionProps";
import {deleteInObject} from "../../FunctionTools/Tools";

function RefundPolicy (props) {

    const dispatch = useDispatch();

    const isMounted = useRef(false);
    const conditions = useSelector(state => state.profile.conditions);
    const [flexible, setFlexible] = useState(false);
    const [strict, setStrict] = useState(false);

    const Flexible = () => {
        setFlexible(true);
        setStrict(false);
        updateCondition("flexible");
    };

    const Strict = () => {
        setFlexible(false);
        setStrict(true);
        updateCondition("strict");
    };

    const updateCondition = (refund_policy) => {
        let tmp = {...conditions};
        tmp['refund_policy'] = refund_policy;
        dispatch(profileInitialisationCondition(tmp));
        tmp = deleteInObject(tmp);
        axios.put('api/artist_conditions/update', tmp, {headers: props.headers}).then((err) => null)
    };

    useEffect(() => {

        if (conditions['refund_policy'] === "flexible") setFlexible(true);
        else setStrict(true);

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="text-center" style={{minHeight: 320}}>
            <section className="section section--aava">
                <h4 className="text-center pt-4 pb-4">Veuillez choisir votre politique de remboursement</h4>
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
                    <ol className="list-group-item text-center flexible row justify-content-center">
                        <li className="bolder list-group-item m-1">Si l’utilisateur annule jusqu à 7 jours avant le début de la représentation il est remboursé à 100%.</li>
                        <li className="bolder list-group-item m-1">S’il annule moins de 7 jours avant la représentation il est remboursé à 50%</li>
                    </ol>
                </div>
                <div className="col-lg-6">
                    <h3 className="text-red">Si Stricte</h3>
                    <ol className="list-group-item text-center strict row justify-content-center">
                        <li className="bolder list-group-item m-1">Si l’utilisateur annule jusqu’à 7 jours avant le début de la représentation, il est remboursé à 50%.</li>
                        <li className="bolder list-group-item m-1">Si l’utilisateur annule moins de 7 jours avant la représentation, il n’y a pas de remboursement.</li>
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default RefundPolicy;
