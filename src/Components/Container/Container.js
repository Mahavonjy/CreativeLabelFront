import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Preference from "../Preference/SongGenre";
import PreviewScreen from "../PreviewScreen/PreviewScreen";

class Container extends Component {
    render() {
        return (
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/">
                            <PreviewScreen/>
                        </Route>
                        <Route path="/home">
                            <Home Page="/home"/>
                        </Route>
                        <Route path="/login">
                            <Login/>
                        </Route>
                        <Route path="/register">
                            <Register/>
                        </Route>
                        <Route path="/preference">
                            <Preference/>
                        </Route>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default Container;
