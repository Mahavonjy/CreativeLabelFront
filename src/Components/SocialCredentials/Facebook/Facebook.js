import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import Conf from "../../../Config/tsconfig";

class LoginFacebook extends React.Component{

    constructor (props, context) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    responseFacebook = (response) => {
        let data_facebook = response;

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        };

        let data = {
            accessToken: data_facebook["accessToken"],
            token_type: 'bearer',
        };

        this.setState({loading: true});
        axios.post(Conf.configs.ServerApi + "api/users/login/authorized", data, {headers: headers}).then(response =>{
            localStorage.setItem("Isl_Credentials", JSON.stringify(response.data));
            window.location.replace('/beats')
        }).catch(error =>{
            console.log(error.response);
        })
    };

    componentDidMount() {
        this.setState({isMounted: true});
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render () {
        return (
            <FacebookLogin socialId={Conf.configs.FacebookId}
                           language="en_US"
                           scope="public_profile, email"
                           responseHandler={this.responseFacebook}
                           xfbml={true}
                           version="v2.5"
                           className="p-10 special-color ml-2 r-10">
                <i className="icon-facebook-f text-blue s-18"/>
            </FacebookLogin>
        );
    }

}

export default LoginFacebook;
