import React, { Component } from "react";
import axios from 'axios';
import Conf from "../../../Config/tsconfig";
import Modal from 'react-awesome-modal';
import {ToastContainer, toast} from "react-toastify";
import LoadingOverlay from 'react-loading-overlay';
import LoginGoogle from "../SocialCredentials/Google/Google";
import LoginFacebook from "../SocialCredentials/Facebook/Facebook";
import {bindActionCreators} from "redux";
import * as Validators from "../../Validators/Validatiors"
import * as CreateFields from "../../FunctionTools/CreateFields"
import {connect} from "react-redux";
import ReactTooltip from 'react-tooltip';
import FunctionTools from "../../FunctionTools/FunctionTools";
import FirstForm from "../../KantoBiz/Prestations/FirstForm";

let user_credentials;
class Register extends Component {
    state = {
        keys: '',
        name: '',
        email: '',
        password: '',
        isActive: false,
        visible: false,
        isMounted: false,
        confirm_password: '',
        usingAdBlock: false,
        choiceArtistType: false,
        becomeArtistForm: false,
        artist_type: ""
    };

    verifyKeysSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            keys: this.state.keys,
        };
        axios.post(Conf.configs.ServerApi + "api/users/get_if_keys_validate", data).then(() =>{
            localStorage.setItem("Isl_Credentials", JSON.stringify(user_credentials));
            window.location.replace('/preference');
        }).catch(error =>{
            let errorMessage = this.props.errorMessage(error);
            toast.error(errorMessage.message)
        })
    };

    sendUserInfoToSingUp = (e) => {
        e.preventDefault();

        document.getElementById("register").setAttribute("disabled", "disabled");
        const validator = this.props.registerValidation(this.state);

        if (validator.error) {
            toast.error(validator.message);
            document.getElementById("register").removeAttribute("disabled");
        } else {
            let headers = {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*"};
            let data = {name: this.state.name, email: this.state.email, password: this.state.password,};
            this.setState({isActive: true});
            axios.post(Conf.configs.ServerApi + "api/users/register", data, {headers: headers}).then(response => {
                toast.success("Un email vous a eté envoyé");
                this.setState({isActive: false, visible: true}, () => {user_credentials = response.data});
            }).catch(error => {
                this.setState({isActive: false}, () => {
                    let errorMessage = this.props.errorMessage(error);
                    toast.error(errorMessage.message)
                });
            })
        }
    };

    componentDidMount() {
        this.setState({ usingAdBlock: this.fakeAdBanner.offsetHeight === 0 , isMounted: true}, () => {
            if (this.state.usingAdBlock)
                toast.error("facebook, google sont bloquer par adblock", {"autoClose": false});
        });
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <main>
                <div ref={r => (this.fakeAdBanner = r)}
                     style={{ height: '1px', width: '1px', visiblity: 'none', pointerEvents: 'none' }}
                     className="adBanner"/>
                {!this.state.visible ? <ToastContainer/>: null}

                <LoadingOverlay active={this.state.isActive}
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

                <Modal visible={this.state.visible} width="400" height="150" animationType='slide'>
                    <ToastContainer position="top-center"
                                    autoClose={5000}
                                    hideProgressBar={false}
                                    newestOnTop
                                    closeOnClick
                                    rtl={false}
                                    pauseOnVisibilityChange
                                    draggable
                                    pauseOnHover/>
                    <form onSubmit={this.verifyKeysSubmit} className="form-material" style={{background:"lightslategray", height:"100%", borderRadius:"5px"}}>
                        <div className="col text-center">
                            <div className="body">
                                <label className="form-label" htmlFor="password" style={{paddingTop: "10px", color:"black"}}>Veuiller confirmer votre email</label>

                                <div className="center p-10">
                                    <div className="form-line">
                                        {this.props.InputCreate('keys', this.state.keys, (e) => {FunctionTools.changeFields(this, e)}, "Inserer votre clé ici", "number", true)}
                                    </div>
                                </div>

                            </div>
                            <button className="btn btn-outline-success btn-sm pl-4 pr-4">Verifier</button>
                        </div>
                    </form>
                </Modal>

                <Modal visible={this.state.choiceArtistType} width="400" height="230" animationType='slide'>
                    <ReactTooltip/>
                    <div className="col text-center pt-4 pb-5" style={{height: 230, borderRadius: 5, background: "#58585a"}}>
                        <h4 className="text-green text-monospace">Quelle genre d'artiste êtes vous</h4>
                        <div className="body row justify-content-center pt-2">

                            <button className="col-md-6 m-2 text-light" onClick={() => this.setState({artist_type: "Spécialiste de l’audiovisuel", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Monteur vidéoclip, Cameraman, Photographes, Réalisateur clip vidéo, autres"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Spécialiste de l’audiovisuel</button>

                            <button className="col-md-3 m-2 text-light" onClick={() => this.setState({artist_type: "Beatmaker", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Acapella, Afrobeat, Blues, Breakbeat, Classique, Dancehall, Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, Soul, Rap, Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo, Basesa, Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap, Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Beatmaker</button>

                            <button className="col-md-5 m-2 text-light" onClick={() => this.setState({artist_type: "Chanteur/Musicien", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Acapella, Afrobeat, Blues, Breakbeat, Classique, Dancehall, Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, Soul, Rap, Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo, Basesa, Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap, Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Chanteur/Musicien</button>

                            <button className="col-md-6 m-2 text-light" onClick={() => this.setState({artist_type: "Cirque/Artistes de la Rue", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur, marionnettiste, mime, autre"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Cirque/Artistes de la Rue</button>

                            <button className="col-md-3 m-2 text-light" onClick={() => this.setState({artist_type: "Comédiens", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Burlesque, Comédie, Conteur, Drame, expérimental, Humoriste, imitateur, Stand up, autre"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Comédiens</button>

                            <button className="col-md-3 m-2 text-light" onClick={() => this.setState({artist_type: "Danseurs", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Bachata, cabaret, capoeira, chachacha, classique, contemporain, ethnique, expérimental, hip hop, Improvisation, Jazz, Kizomba, Moderne, Oriental, Salsa, Samba, Tango, kilalaky, batrelaky, salegy, Ndombolo, Vakondrazana,zouk, Kawitri,Maloya, Kompas, autre"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Danseurs</button>

                            <button className="col-md-3 m-2 text-light" onClick={() => this.setState({artist_type: "Magiciens", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Close-ups, Mentalistes, Prestidigitateurs, autre"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Magiciens</button>

                            <button className="col-md-2 m-2 text-light" onClick={() => this.setState({artist_type: "Dj", becomeArtistForm: true, choiceArtistType: false})}
                                    data-tip="Animateur, Mix, Live set, DJ Set"
                                    style={{borderRadius: 5, backgroundImage: "linear-gradient(to left top, #ed1c24, #b2102d, #77132a, #3d121d, #000000)"}}>Dj</button>
                        </div>
                        <div className="footer pt-3">
                            <button className="btn btn-outline-danger btn-sm pl-4 pr-4" onClick={() => this.setState({choiceArtistType: false})}>Annuler&nbsp;<i className="icon icon-remove align-middle"/></button>
                        </div>
                    </div>
                </Modal>

                <div id="primary" className="p-t-b-100 height-full">
                    <div className="container">
                        <div className="text-center s-14 l-s-2 my-5">
                            <a className="my-5" href="/">
                                <span>ISL CREATIVE</span>
                            </a>
                        </div>
                        {/* if user choice become an artist*/}
                        {this.state.becomeArtistForm ? <FirstForm ArtistType={this.state.artist_type}/>: null}
                        {/* end form become an artist*/}
                        <div className="row">
                            <div className="col-md-10 mx-md-auto">
                                <div className="mt-5">
                                    <div className="row grid">
                                        <div className="col-md-7 card p-5">
                                            <form className="form-material" onSubmit={this.sendUserInfoToSingUp}>
                                                {/* Input */}
                                                <div className="body">
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            {this.props.InputCreate('name', this.state.name, (e) => {FunctionTools.changeFields(this, e)}, "Votre nom", "text", true)}
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            {this.props.InputCreate('email', this.state.email, (e) => {FunctionTools.changeFields(this, e)}, "E-mail", "email", true)}
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            {this.props.InputCreate('password', this.state.password, (e) => {FunctionTools.changeFields(this, e)}, "Au moins 8 caractères", "password", true)}
                                                        </div>
                                                    </div>
                                                    <div className="form-group form-float">
                                                        <div className="form-line">
                                                            {this.props.InputCreate('confirm_password', this.state.confirm_password, (e) => {FunctionTools.changeFields(this, e)}, "Entrez le mot de passe à nouveau", "password", true)}
                                                        </div>
                                                    </div>

                                                    <div className="row ml-1">
                                                        <button type="submit" id="register" className="btn btn-outline-primary btn-fab-md pl-4 pr-4">Créer votre compte ISL Creative</button>
                                                        <LoginFacebook/>
                                                        <LoginGoogle/>
                                                    </div>
                                                </div>
                                                {/* #END# Input */}
                                            </form>
                                        </div>
                                        <div className="col-md-5 text-center p-5">
                                            <h2 className="mt-3 font-weight-lighter">Vous possédez déjà un compte?</h2>
                                            <button className="btn btn-outline-primary m-t-50 btn-xl pl-4 pr-4"
                                                    onClick={() => window.location.replace('/beats#LoginRequire')}>
                                                Identifiez-vous
                                            </button>
                                            <button className="btn btn-outline-primary m-t-50 btn-xl pl-4 pr-4"
                                                    onClick={() => {this.setState({choiceArtistType: true})}}>
                                                Devenir Artiste
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        registerValidation: bindActionCreators(Validators.RegisterValidation, dispatch),
        errorMessage: bindActionCreators(Validators.checkErrorMessage, dispatch),
        InputCreate: bindActionCreators(CreateFields.CreateInput, dispatch),
    };
};

export default connect(null, mapDispatch)(Register);
