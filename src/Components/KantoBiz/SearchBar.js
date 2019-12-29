import React, { Component } from "react";
import DatePicker from "react-datepicker";
import ReactTooltip from 'react-tooltip';
import FunctionTools from "../FunctionTools/FunctionTools";
import * as Validators from "../Validators/Validatiors"
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {toast, ToastContainer} from "react-toastify";

class SearchBar extends Component {
    state = {
        city: "",
        events: "",
        thematics: "",
        isMounted: false,
        startDate: new Date(),
        country: "Madagascar"
    };

    ChangeDate = (date) => {
        let new_date = FunctionTools.formatDate(date);
        let now = FunctionTools.formatDate(new Date());
        if (parseInt(new_date) - parseInt(now) >= 0) this.setState({startDate: date});
    };

    Search = () => {
        let if_errors = this.props.validatorSearch(this.state);
        if (if_errors['error']) {
            toast.error(if_errors['message'])
        } else {
            console.log("tout est ok")
        }
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="Base search-bar relative p-b-40 p-t-10">
                <ReactTooltip/>
                <ToastContainer/>
                <ReactTooltip className="special-color-dark" id='thematics' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Details des thematiques </h5><br/>
                    <small>• Cirque/Arts de la rue (acrobate, clown, cracheur de feu, <br/>dompteur Equilibriste, jongleur, marionnettiste, mime, autre)</small><br/><br/>
                    <small>• Comédiens (Burlesque, Comédie, Conteur, Drame, expérimental,<br/> Humoriste, imitateur, Stand up, autre)</small><br/><br/>
                    <small>• DJ (Animateur, Mix, Live set, DJ Set)</small><br/><br/>
                    <small>• Danseurs (Bachata, cabaret, capoeira, chachacha, classique,<br/>
                        contemporain, ethnique, expérimental, hip hop, Improvisation, Jazz, Kizomba, Moderne,<br/>
                        Oriental, Salsa, Samba, Tango, kilalaky, batrelaky, salegy, Ndombolo, Vakondrazana,zouk, Kawitri,Maloya, Kompas, autre)</small><br/><br/>
                    <small>• Magiciens (Close-ups, Mentalistes, Prestidigitateurs, autre)</small><br/><br/>
                    <small>• Chanteur/Musicien (Acapella, Afrobeat, Blues, Breakbeat, Classique, <br/>
                    Dancehall, Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, <br/>
                    Soul, Rap, Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo,<br/>
                    Basesa, Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap,<br/>
                    Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé)</small><br/><br/>
                    <small>• Beatmaking (Acapella, Afrobeat, Blues, Breakbeat, Classique, Dancehall,<br/>
                    Electronica, Folk, Metal, Funk, Gospel, House, Jazz, Pop, Slam, Swing, Soul, Rap,<br/>
                    Reggae, Rock, Rumba, Samba, Vakondrazana, Rumba, Kilalaky, Rnb, Ndombolo, Basesa,<br/>
                    Hira gasy, Batrelaky, Reggae-muffin, Reggaeton, Remix, Goma, Kuduro, Afro-trap,<br/>
                    Kawitri, Malesa, Tsapiky, Zafindraona, Slow, Coupé-Décalé) </small><br/><br/>
                    <small>• Spécialiste de l’audiovisuel (Monteur vidéoclip, Cameraman, Photographes, <br/>
                    Réalisateur clip vidéo, autre)</small><br/><br/>
                    <small>• Spectacles enfants</small>
                </ReactTooltip>
                {/* Input Search */}
                <h3 className="text-center text-red">Trouvez la meilleur prestation pour votre evenement</h3><br/>
                <div className="search-row row justify-content-center">
                    <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px", width: "94%"}}>
                        <input className="bg-transparent text-center text-white border-0" type="text" id="country" name="country" placeholder="Madagascar" value={this.state.country} disabled={true}/>
                        <label className="input-group-addon bg-transparent"><i className="icon-map-location text-center text-red"/>
                            <span className="ml-2 text-white" data-tip="Pour le moments, Madagascar est le seule pays">?</span></label>
                    </div>

                    <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px", width: "94%"}}>
                        <div className="btn-group bootstrap-select listing-categories">
                            <button className="btn btn-outline-dark border-0 dropdown-toggle text-white" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{this.state.city || "Choisir la ville"}
                            </button>
                            <div className="dropdown-menu overflow-auto text-red" style={{height: 210, borderRadius: 5}}>
                                <option className="dropdown-item" id="city" name="city" defaultValue="Manakara" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Manakara</option>
                                <option className="dropdown-item" id="city" name="city" defaultValue="Tamatave" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Tamatave</option>
                                <option className="dropdown-item" id="city" name="city" defaultValue="Fianarantsoa" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Fianarantsoa</option>
                                <option className="dropdown-item" id="city" name="city" defaultValue="Manakara" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Majunga</option>
                            </div>
                        </div>
                        <label className="input-group-addon bg-transparent"><i className="icon-location-arrow text-red"/><span className="ml-2 text-white" data-tip="Veuillez choisir la ville ou votre evenement aura lieu">?</span></label>
                    </div>

                    <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px", width: "94%"}}>
                        <div className="btn-group bootstrap-select listing-categories">
                            <button className="btn btn-outline-dark border-0 dropdown-toggle text-left text-white" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" id="city" aria-expanded="false">{this.state.thematics || "Thematiques"}
                            </button>
                            <div className="dropdown-menu overflow-auto text-red" style={{height: 210, borderRadius: 5}}>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Cirque/Arts de la rue " onClick={(e) => {FunctionTools.changeFields(this, e)}}>Cirque/Arts de la rue</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Comédiens " onClick={(e) => {FunctionTools.changeFields(this, e)}}>Comédiens</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Danseurs" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Danseurs</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Magiciens" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Magiciens</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Chanteur/Musicien" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Chanteur/Musicien</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Spectacles enfants" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Spectacles enfants</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Beatmaking" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Beatmaking</option>
                                <option className="dropdown-item" id="thematics" name="thematics" defaultValue="Spécialiste de l’audiovisuel" onClick={(e) => {FunctionTools.changeFields(this, e)}}>Spécialiste de l’audiovisuel</option>
                            </div>
                        </div>
                        <label className="input-group-addon bg-transparent"><i className="icon-tasks text-center text-red" />
                            <span className="ml-2 text-white " data-tip data-for='thematics'>?</span></label>
                    </div>

                    <div className=" col-sm-2 d-inline-block border border-primary text-center" style={{borderRadius: "5px", width: "94%"}}>
                        <div className="btn-group bootstrap-select listing-categories">
                            <button className="btn btn-outline-dark border-0 dropdown-toggle text-white" type="button"
                                    data-toggle="dropdown" aria-haspopup="true" id="Evenement"
                                    aria-expanded="false">	&nbsp; {this.state.events || "Evenements"}
                            </button>
                            <div className="dropdown-menu overflow-auto text-red" style={{height: 210, borderRadius: 5}}>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                                <option className="dropdown-item" id="events" name="events" defaultValue="DJ" onClick={(e) => {FunctionTools.changeFields(this, e)}}>DJ</option>
                            </div>
                        </div>
                        <label className="input-group-addon bg-transparent"><i className="icon-network text-center text-red"/><span className="ml-2 text-white">?</span></label>
                    </div>

                    <div className=" col-sm-2 d-inline-block border border-primary text-center " style={{borderRadius: "5px", width: "94%"}}>
                        <DatePicker className="bg-transparent text-center text-white border-0" selected={this.state.startDate} onChange={this.ChangeDate}/>
                        <label className="input-group-addon bg-transparent"><i className="icon-calendar text-center text-red"/><span className="ml-2 text-white">?</span></label>
                    </div>

                    <div className="col-md-10" style={{width: "90%"}}>
                        <button type="submit" onClick={this.Search} className="btn btn-outline-primary btn-lg p-3 m-2 col">Recherche&nbsp;<i className="icon-search-1 text-white"/></button>
                    </div>
                </div>
                {/* End Search */}
            </div>
        );
    }
}

const mapDispatch = (dispatch) => {
    return {
        validatorSearch: bindActionCreators(Validators.validatorSearch, dispatch),
    };
};

export default connect(null, mapDispatch)(SearchBar);
