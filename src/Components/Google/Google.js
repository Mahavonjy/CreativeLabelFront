import React from 'react';
import { GoogleLogin } from 'react-google-login-component';
import axios from 'axios';
import Cookies from "universal-cookie";
import { Redirect } from 'react-router-dom';
import Conf from "../../Config/tsconfig";

class LoginGoogle extends React.Component{

    constructor (props, context) {
        super(props, context);
        this.state = {
            to_route: '/',
            loading: false,
            redirect: false
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
        this.setState({loading: true});
        console.log(data);
        // axios.post(Conf.configs.ServerApi + "api/users/gCallback", data, {headers: headers}).then((response) => {
        //     const cookies = new Cookies();
        //     cookies.set("Isl_Creative_pass", {"name":response.data.name, "email":response.data.email, "Isl_Token":response.data.token});
        //     let new_headers = {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': "*",
        //         'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        //     };
        //     axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: new_headers}).then(resp =>{
        //         console.log(resp.data, data);
        //         this.setState({redirect: true});
        //     }).catch(err =>{
        //         if (err.response.data === "no chosen") {
        //             this.setState({to_route: '/preference'});
        //             this.setState({loading: false});
        //             this.setState({redirect: true});
        //         } else {
        //             this.setState({to_route: '/genre_preference'});
        //             this.setState({loading: false});
        //             this.setState({redirect: true});
        //         }
        //     })
        // }).catch((error) => {
        //     console.log(error);
        // });
    };

    render () {
        const redirectToReferrer = this.state.redirect;
        if (redirectToReferrer === true) {
            return <Redirect to={this.state.to_route} />
        } else {
            return (
                <GoogleLogin socialId="354503433014-dt8bat8cgaosk5ci76qquc13vgv2ofb9.apps.googleusercontent.com"
                             className="p-10 special-color ml-2 r-10"
                             scope="profile"
                             fetchBasicProfile={false}
                             responseHandler={this.responseGoogle}>
                        <i className="icon-google-plus-square text-red s-18"/>
                </GoogleLogin>
            );
        }
    }
}

export default LoginGoogle;
