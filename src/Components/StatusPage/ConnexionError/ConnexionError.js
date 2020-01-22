import React, { useEffect, useRef } from "react";

function ConnexionError() {
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
                    <h1 className="text-primary">oops!</h1>
                    <p className="section-subtitle">Bad Gateway</p>
                    <p className="s-256">502</p>
                    <a href="/beats">refresh</a>
                </div>
            </div>
        </div>
    );
}

export default ConnexionError;
