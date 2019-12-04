import React from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from "axios";
import Cookies from "universal-cookie";
import { Redirect } from 'react-router-dom';
import Conf from "../../Config/tsconfig";

class LoginFacebook extends React.Component{

    constructor (props, context) {
        super(props, context);
        this.state = {
            loading: false,
            redirect: false,
            to_route: '/',
            isMounted: false
        };
    }

    redirect = () => {
        const cookies = new Cookies();
        let new_headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*",
            'Isl-Token': cookies.get("Isl_Creative_pass")["Isl_Token"]
        };
        axios.get(Conf.configs.ServerApi + "api/users/if_choice_user_status", {headers: new_headers}).then(resp =>{
            this.setState({redirect: true});
        }).catch( err =>{
            this.setState({to_route: '/preference'});
            this.setState({loading: false});
            this.setState({redirect: true});
        })
    };

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
            const cookies = new Cookies();
            cookies.set("Isl_Creative_pass", {
                "name": response.data.name,
                "email": response.data.email,
                "Isl_Token": response.data.token
            });
            this.redirect()
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
        const redirectToReferrer = this.state.redirect;
        if (redirectToReferrer === true) {
            return <Redirect to={this.state.to_route} />
        } else {
            return (
                <FacebookLogin socialId="423325871770542"
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

}

export default LoginFacebook;
