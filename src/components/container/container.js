import React, { useEffect, useRef } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomeRoot from "../home/homeRoot";
import NotFound from "../statusPage/notFound/notFound";
import ConnexionError from "../statusPage/connexionError/connexionError";

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
                {/*<Route exact path="/">*/}
                {/*    <PreviewScreen/>*/}
                {/*</Route>*/}

                {/* PROFILE ROUTING */}
                <Route path="/profile">
                    <HomeRoot/>
                </Route>
                <Route path="/profile/isl_artist_profile/:id(\d+)">
                    <HomeRoot/>
                </Route>

                {/* BEATS ROUTING */}
                {/*<Route path="/beats">*/}
                {/*    <HomeRoot/>*/}
                {/*</Route>*/}
                {/*<Route path="/beats/CheckThisBeat/:id(\d+)">*/}
                {/*    <HomeRoot/>*/}
                {/*</Route>*/}

                {/* KANTOBIZ ROUTING */}
                <Route path="/(|kantobiz)">
                    <HomeRoot/>
                </Route>
                <Route path="/show-service/:id">
                    <HomeRoot/>
                </Route>
                <Route path="/show-service-read">
                    <HomeRoot/>
                </Route>

                {/* CART ROUTING */}
                {/*<Route path="/Cart">*/}
                {/*    <HomeRoot/>*/}
                {/*</Route>*/}

                {/* REGISTER ROUTING */}
                <Route path="/register">
                    <HomeRoot/>
                </Route>

                {/* PREFERENCE ROUTING */}
                {/*<Route path="/preference">*/}
                {/*    <HomeRoot/>*/}
                {/*</Route>*/}

                {/* BAD CONNEXION */}
                <Route path="/badConnexion">
                    <ConnexionError/>
                </Route>

                {/* COMMAND RESPONSE ROUTING */}
                <Route path="/CommandSuccess">
                    <HomeRoot/>
                </Route>
                <Route path="/CommandError">
                    <HomeRoot/>
                </Route>

                <Route path="/about">
                    <HomeRoot/>
                </Route>

                {/* NOT FOUND */}
                <Route component={NotFound}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Container;
