import React, { useEffect, useRef } from "react";

function NotFound () {

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
                    <p className="section-subtitle">Something went wrong. The page you are looking for is gone or you are not logged</p>
                    <p className="s-256">404</p>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
