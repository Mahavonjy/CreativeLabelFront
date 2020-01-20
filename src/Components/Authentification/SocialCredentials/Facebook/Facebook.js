import React, {useEffect, useRef} from 'react';
import { FacebookLogin } from 'react-facebook-login-component';
import axios from "axios";
import Conf from "../../../../Config/tsconfig";

function LoginFacebook() {

    const isMounted = useRef(false);

    const responseFacebook = (response) => {
        let data_facebook = response;

        let headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': "*"
        };

        let data = {
            accessToken: data_facebook["accessToken"],
            token_type: 'bearer',
        };

        axios.post(Conf.configs.ServerApi + "api/users/login/authorized", data, {headers: headers}).then(response =>{
            localStorage.setItem("Isl_Credentials", JSON.stringify(response.data));
            window.location.replace('/beats')
        }).catch(error => console.log(error.response))
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <FacebookLogin socialId={Conf.configs.FacebookId}
                       language="en_US"
                       scope="public_profile, email"
                       responseHandler={responseFacebook}
                       xfbml={true}
                       version="v2.5"
                       className="p-10 special-color ml-2 r-10">
            <i className="icon-facebook-f text-blue s-18"/>
        </FacebookLogin>
    );
}

export default LoginFacebook;
