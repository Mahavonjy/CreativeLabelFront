import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import axios from 'axios';
import Conf from "../../../../Config/tsconfig";

class LoginGoogle extends React.Component{

    constructor (props, context) {
        super(props, context);
        this.state = {
            isMounted: false
        };
    }

    responseGoogle = (googleUser) => {
        let data = {
            id_token: googleUser.Zi.id_token,
            access_token: googleUser.Zi.access_token,
            expires_in: googleUser.Zi.expires_in,
            scope: googleUser.Zi.access_token,
            token_type: googleUser.Zi.token_type,
            expires_at:googleUser.Zi.expires_at
        };

        let headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        };
        axios.post(Conf.configs.ServerApi + "api/users/gCallback", data, {headers: headers}).then((response) => {
            localStorage.setItem("Isl_Credentials", JSON.stringify(response.data));
            window.location.replace('/beats')
        }).catch((error) => {
            console.log(error);
        });
    };

    componentDidMount() {
        this.setState({isMounted: true});
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render () {
        return (
            <GoogleLogin socialId={Conf.configs.GoogleId}
                         className="p-10 special-color ml-2 r-10"
                         scope="profile"
                         fetchBasicProfile={false}
                         responseHandler={this.responseGoogle}>
                <i className="icon-google-plus-square text-red s-18"/>
            </GoogleLogin>
        );
    }
}

export default LoginGoogle;
