import axios from "axios";
import React, {memo, useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import {CreateInput} from "../../functionTools/createFields";
import {setValueOfToastGlobal} from "../../functionTools/functionProps";
import {changeFields} from "../../functionTools/tools";
import {checkErrorMessage} from "../../validators/validatiors";

function UpdatePassWord(props) {

    const email = useSelector(state => state.profile.profile_info.email);

    const isMounted = useRef(false);
    const [update, setUpdate] = useState(true);
    const [headers, setHeaders] = useState(null);
    const [password, setPassword] = useState("");
    const [currentPass, setCurrentPass] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePassWord = (e) => {
        e.preventDefault();

        if (password === confirmPassword) {
            let data = {email: email, password: password};
            axios.put("api/users/reset_password", data, {headers: headers}).then(() => {
                props.setUpdatePass(false);
                toast.success("Password updated");
            }).catch(error => {
                if (data["password"].length < 8) {
                    toast.warn("password too short");
                } else toast.error(checkErrorMessage(error).message)
            })
        } else {
            toast.warn("Passwords Do Not Match");
        }
    };

    const checkCurrentPassword = () => {
        axios.post('api/users/check_password', {'password': currentPass},
            {headers: headers}).then((resp) => {
            setUpdate(false)
        }).catch((error) => {
            let errorMessage = checkErrorMessage(error);
            toast.error(errorMessage.message)
        })
    }

    useEffect(() => {

        let _h = props.headers
        _h['Content-Type'] = "application/json"
        setHeaders(_h)

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="col text-center">
            <div className="header">
                <h3>Changement de mot de passe</h3>
            </div>
            <div className="body">
                <div className="center p-10">
                    {update ?
                        <div>
                            <div className="form-line">
                                <div className="header pb-2">
                                    <h5>Verification</h5>
                                </div>
                                {CreateInput(
                                    'current_password',
                                    currentPass,
                                    (e) => changeFields(setCurrentPass, e),
                                    "Mot de pass actuel",
                                    "password",
                                    true
                                )}
                                <div className="form-line">
                                    <button
                                        onClick={() => currentPass && checkCurrentPassword()}
                                        className="btn btn-outline-success rounded btn-sm pl-4 pr-4">
                                        Continuer
                                    </button>
                                </div>
                            </div>
                        </div> :
                        <div>
                            <div className="form-line">
                                {CreateInput(
                                    'password',
                                    password,
                                    (e) => changeFields(setPassword, e),
                                    "nouveau mot de passe",
                                    "password",
                                    true
                                )}
                            </div>
                            <div className="form-line">
                                {CreateInput(
                                    'confirm_password',
                                    confirmPassword,
                                    (e) => changeFields(setConfirmPassword, e),
                                    "Confirmation",
                                    "password",
                                    true
                                )}
                            </div>
                            <div className="form-line">
                                <button
                                    onClick={(e) => updatePassWord(e)}
                                    className="btn btn-outline-success rounded btn-sm pl-4 pr-4">
                                    Changer
                                </button>
                            </div>
                        </div>}
                </div>
            </div>
        </div>
    )
}

export default memo(UpdatePassWord);
