import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import Modal from "react-awesome-modal";
import GoogleLogin from 'react-google-login';
import Register from "../../Register/Register";
import {sessionService} from "redux-react-session";
import Conf from "../../../../Config/tsconfig";

function LoginGoogle(props) {

    const isMounted = useRef(false);
    const [becomeArtist, setBecomeArtist] = useState(false);

    const requestToApi = async (data) => {
        if (!data.error) {
            let headers = {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"
            };

            let resp = await axios.post("api/users/gCallback", data["tokenObj"], {headers: headers}).then( async (response) => {
                const {token} = response.data;
                await sessionService.saveSession({token});
                await sessionService.saveUser(response.data);
                return true
            }).catch(() => {return false});
            if (props.register && resp) setBecomeArtist(true);
            data.disconnect();
        }
    };

    const responseGoogle = (googleUser) => {
        try {
            if (!googleUser)
                googleUser.disconnect();
            else requestToApi(googleUser).then(r => null)
        } catch (e) {requestToApi(googleUser).then(r => null)}
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, [isMounted, becomeArtist]);

    return (
        <div>
            <GoogleLogin clientId={Conf.configs.GoogleId}
                         disabled
                         isSignedIn={true}
                         cookiePolicy={'single_host_origin'}
                         className="mt-3 border-0 danger-color loginBtn loginBtn--google text-center"
                         onSuccess={responseGoogle}
                         onFailure={responseGoogle}>
                <h5 className="text-light">{props.Label}</h5>
            </GoogleLogin>
            {becomeArtist &&
            <Modal visible={true} className="zIndex99" width="300" height="auto" animationType='slide'>
                <div className="pb-3" style={{height: "100%", borderRadius: 5, background: "#58585a"}}>
                    <h5 className="text-light text-monospace text-center p-2">Quelle genre de compte voulez vous ?</h5>
                    {Register.registerButton(true)}
                </div>
            </Modal>}

        </div>
    );
}

export default LoginGoogle;
