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
                        <Route exact path="/" component={PreviewScreen} />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/preference" component={Preference} />
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default Container;
