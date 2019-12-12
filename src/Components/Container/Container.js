import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../StatusPage/NotFound/NotFound";
import PreviewScreen from "../PreviewScreen/PreviewScreen";
import ConnexionError from "../StatusPage/ConnexionError/ConnexionError";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
        };
    }

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <PreviewScreen/>
                        </Route>
                        <Route path="/beats">
                            <Home/>
                        </Route>
                        <Route path="/Profile">
                            <Home/>
                        </Route>
                        <Route path="/beats/CheckThisBeat/:id(\d+)">
                            <Home/>
                        </Route>
                        <Route path="/Profile/isl_artist_profile/:id(\d+)">
                            <Home/>
                        </Route>
                        <Route path="/Cart">
                            <Home/>
                        </Route>
                        <Route path="/register">
                            <Home/>
                        </Route>
                        <Route path="/preference">
                            <Home/>
                        </Route>
                        <Route path="/badConnexion">
                            <ConnexionError/>
                        </Route>
                        <Route path="/CommandSuccess">
                            <Home/>
                        </Route>
                        <Route path="/CommandError">
                            <Home/>
                        </Route>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default Container;
