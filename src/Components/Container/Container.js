import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import PreviewScreen from "../PreviewScreen/PreviewScreen";
import axios from "axios";
import Conf from "../../Config/tsconfig";
import Cookies from "universal-cookie/cjs";
import {toast, ToastContainer} from "react-toastify";

class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            href: window.location.href.split("/"), ret: false, isMounted: false,
        };
    }

    IfConnected = () => {
        try {
           let cookies = new Cookies();
           let headers = {
               'Content-Type': 'application/json',
               'Access-Control-Allow-Origin': "*",
               'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
           };
           axios.get(Conf.configs.ServerApi + "api/users/if_token_valide", {headers: headers}).then(resp => {
               this.setState({ret: true});
           }).catch(err => {
               console.log()
           })
       } catch (e) {
            console.log()
       }
       return this.state.ret
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
                <BrowserRouter>
                    <ToastContainer/>
                    <Switch>
                        <Route exact path="/">
                            <PreviewScreen/>
                        </Route>
                        <Route path="/home">
                            <Home/>
                        </Route>
                        {this.IfConnected() && this.state.href[this.state.href.length - 1] === "Profile" ?
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
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
            );
    }
}

export default Container;
