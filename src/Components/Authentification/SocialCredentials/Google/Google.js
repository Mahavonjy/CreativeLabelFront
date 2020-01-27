import React, {useEffect, useRef} from 'react';
import { GoogleLogin } from 'react-google-login-component';
import axios from 'axios';
import Conf from "../../../../Config/tsconfig";

function LoginGoogle(props) {

    const isMounted = useRef(false);

    const responseGoogle = (googleUser) => {
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

        axios.post( "api/users/gCallback", data, {headers: headers}).then((response) => {
            localStorage.setItem("Isl_Credentials", JSON.stringify(response.data));
            window.location.replace('/beats')
        }).catch((error) => console.log(error));
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <GoogleLogin socialId={Conf.configs.GoogleId}
                     scope="profile"
                     className="mt-3 border-0 danger-color loginBtn loginBtn--google text-center"
                     fetchBasicProfile={false}
                     responseHandler={responseGoogle}>
            <small>{props.Label}</small>
        </GoogleLogin>
    );
}



export default LoginGoogle;
