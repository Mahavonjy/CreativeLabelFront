import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import PreviewScreen from "../PreviewScreen/PreviewScreen";
import ConnexionError from "../ConnexionError/ConnexionError";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), isMounted: false,
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
                        <Route path="/home">
                            <Home/>
                        </Route>
                        {this.state.href[this.state.href.length - 1] === "Profile" ?
                            <Route path="/Profile">
                                <Home Page="/home"/>
                            </Route> :  null}
                        <Route path="/CheckThisBeat/:id(\d+)">
                            <Home Page="/home"/>
                        </Route>
                        <Route path="/isl_artist_profile/:id(\d+)">
                            <Home Page="/home"/>
                        </Route>
                        <Route path="/Cart">
                            <Home/>
                        </Route>
                        <Route path="/login">
                            <Redirect to="/home"/>
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
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default Container;
