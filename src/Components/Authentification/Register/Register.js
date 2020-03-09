import React, {useEffect, useRef, useState} from "react";
import LoadingOverlay from 'react-loading-overlay';
import {useDispatch, useSelector} from "react-redux";
import {addTmpArtistSelected, displayBecomeArtistForm} from "../../FunctionTools/FunctionProps";
import {DifferentArtist} from "../../FunctionTools/PopupFields";
import Form from "../../KantoBiz/Prestations/Form/Form";
import RegisterForm from "./RegisterForm";

const style_ = "radial-gradient(circle, #58585a, #4b4b4e, #3f3e41, #333236, #28262a, #232125, #1f1c20, #1a171b, #1a171b, #1a171b, #1a171b, #1a171b)";

function Register() {

    const dispatch = useDispatch();
    const artist_types = useSelector(state => state.Others.artist_types);
    const tmpArtistTypeSelected = useSelector(state => state.Others.tmpArtistTypeSelected);
    const becomeArtistForm = useSelector(state => state.Others.becomeArtistForm);

    const isMounted = useRef(false);
    const [choiceArtistType, setChoiceArtistType] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const close = () => {
        dispatch(addTmpArtistSelected(""));
        dispatch(displayBecomeArtistForm(false));
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, [isMounted, tmpArtistTypeSelected]);

    return (
        <main style={{backgroundImage: style_}}>
            <LoadingOverlay active={isActive}
                            spinner text="Nous sommes en train de vous envoyer un email de confirmation ..."
                            styles={{
                                spinner: (base) => ({
                                    ...base,
                                    width: '25px',
                                    margin_bottom: '10px',
                                    '& svg circle': {
                                        stroke: '#A4B129'
                                    }
                                })
                            }}
            />

            {choiceArtistType && DifferentArtist(dispatch, setChoiceArtistType, artist_types)}

            <div id="primary" className="p-t-b-100 height-full">
                <div className="container">
                    <div className="text-center s-14 l-s-2 my-5">
                        <a className="my-5" href="/">
                            <h2 className="text-red">ISL CREATIVE</h2>
                        </a>
                    </div>
                    {/* if user choice become an artist*/}
                    {becomeArtistForm && <Form setIsActive={setIsActive} tmpArtistTypeSelected={tmpArtistTypeSelected}
                                               artistType={tmpArtistTypeSelected} close={() => close()} register/>}
                    {/* end form become an artist*/}
                    <div className="row">
                        <div className="col-md-10 mx-md-auto">
                            <div className="mt-5">
                                {!becomeArtistForm &&
                                <RegisterForm setIsActive={setIsActive} tmpArtistTypeSelected={tmpArtistTypeSelected}
                                              setChoiceArtistType={setChoiceArtistType} noArtist/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Register;
