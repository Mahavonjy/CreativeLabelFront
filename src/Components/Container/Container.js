import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../StatusPage/NotFound/NotFound";
import PreviewScreen from "../PreviewScreen/PreviewScreen";
import ConnexionError from "../StatusPage/ConnexionError/ConnexionError";

function Container() {

    const isMounted = useRef(false);

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <BrowserRouter>
            <Switch>
                {/* HOME ROUTING */}
                <Route exact path="/">
                    <PreviewScreen/>
                </Route>
                {/* PROFILE ROUTING */}
                <Route path="/Profile">
                    <Home/>
                </Route>
                <Route path="/Profile/isl_artist_profile/:id(\d+)">
                    <Home/>
                </Route>
                {/* BEATS ROUTING */}
                <Route path="/beats">
                    <Home/>
                </Route>
                <Route path="/beats/CheckThisBeat/:id(\d+)">
                    <Home/>
                </Route>
                {/* KANTOBIZ ROUTING */}
                <Route path="/kantobiz">
                    <Home/>
                </Route>
                {/* CART ROUTING */}
                <Route path="/Cart">
                    <Home/>
                </Route>
                {/* REGISTER ROUTING */}
                <Route path="/register">
                    <Home/>
                </Route>
                {/* PREFERENCE ROUTING */}
                <Route path="/preference">
                    <Home/>
                </Route>
                {/* BAD CONNEXION */}
                <Route path="/badConnexion">
                    <ConnexionError/>
                </Route>
                {/* COMMAND RESPONSE ROUTING */}
                <Route path="/CommandSuccess">
                    <Home/>
                </Route>
                <Route path="/CommandError">
                    <Home/>
                </Route>
                {/* NOT FOUND */}
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Container;
