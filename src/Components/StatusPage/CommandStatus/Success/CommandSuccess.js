import React, {useEffect, useRef} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

function CommandSuccess() {

    const history = useHistory();
    const message = useSelector(state => state.CommandSuccess.message);

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
                    <p className="section-subtitle">{message}</p>
                    <p className="s-256"><i className="icon-success text-success s-256"/></p>
                    <button onClick={() => history.push("/kantobiz")}
                            className="btn btn-outline-success pl-5 pr-5 text-light font-weight-bold">Retour
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommandSuccess;
