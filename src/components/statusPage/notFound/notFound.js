import React, { useEffect, useRef } from "react";

function NotFound () {

    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="col-xl-12 mx-lg-auto" style={{height: "100vh"}}>
            <div className="pt-5 p-t-100 text-center">
                <h1 className="text-primary">oops!</h1>
                <p className="section-subtitle text-red">
                    La page que vous recherchez n'existe pas ou bien vous n'êtes pas connecté
                </p>
                <p className="s-256">404</p>
            </div>
        </div>
    );
}

export default NotFound;
