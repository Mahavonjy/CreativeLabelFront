import React, { Component } from "react";
import Modal from "react-awesome-modal";
import {connect} from "react-redux";

class Recaputilatif extends Component {
    state = {
        isMounted: false,
        imageToDisplay: '',
        openLightBox: false,
        allCity: this.props.others_city,
        unit_time_of_preparation: '',
        unit_time_of_service: '',
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            for (let row in this.props.unit_time_of_preparation) {
                if (this.props.unit_time_of_preparation[row]) this.setState({"unit_time_of_preparation": row})}
            for (let row in this.props.unit_time_of_service) {
                if (this.props.unit_time_of_service[row]) this.setState({"unit_time_of_service": row})}
            try {
                let tmp = [...this.state.allCity];
                tmp.push(this.props.city_reference);
                this.setState({allCity: tmp.join(', ')})
            } catch (e) {}
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    createSmallForm = (Title, values, width, icon) => {
        return (
            <div className="custom-float m-1">
                <div className="input-group-prepend d-inline-block center" style={{width: width}}>
                    <div className="input-group-text text-dark font-weight-bold">
                        <i className={icon}/>&nbsp;{Title}</div>
                    <div className="input-group-text text-light success-color" id={Title}>
                        <p className="center" id={Title}>{values}</p>
                    </div>
                </div>
            </div>
        );
    };

    createBigForm = (Title, values, icon) => {
        return (
            <div className="custom-float">
                <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                    <div className="input-group-text text-dark">
                        <i className={icon}/>&nbsp;	{Title}</div>
                    <input value={values} id={Title} name={Title} className="form-control" type="text" disabled/>
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="Base">
                <Modal visible={this.state.openLightBox} width="400" height="400" animationType='slide'>
                    <i className="icon icon-error s-36 absolute m-2 text-red" onClick={() => this.setState({openLightBox: false})}/>
                    <img alt="show" src={this.state.imageToDisplay} width={400} height={400} style={{borderRadius: 4}}/>
                </Modal>

                <div className="relative mb-5">
                    <h3 className="mb-2 text-primary">Voici un resumer de votre premiere prestation</h3>
                    <p>Vous pouvez revenir au precedent en cas d'envie de changer</p>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        {this.createBigForm("Devenir", this.props.artistType, "icon-user")}
                        {this.createBigForm( "Artiste de genre", this.props.thematics_options_selected.join(', '),  "icon-neuter")}
                        {this.createBigForm("Titre", this.props.title, "icon-text-width")}
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                <div className="input-group-text text-dark">
                                    <i className="icon-text-width"/>&nbsp;	Description</div>
                                <textarea value={this.props.description} id="Description" name="Description" className="form-control"  disabled/>
                            </div>
                        </div>
                        {this.createBigForm("Ensemble de ville choisi pour cette prestation", this.state.allCity, "icon-map-marker\n")}
                    </div>
                    <div className="col-md-6">
                        <div className="justify-content-center" style={{display: "flex"}}>
                            {this.createSmallForm("Prix", this.props.price_of_service + "euros", "88px", "icon-money")}
                            {this.createSmallForm("Nombre d'artiste", this.props.number_of_artist, "auto", "icon-view")}
                        </div>
                        <div className="justify-content-center" style={{display: "flex"}}>
                            {this.createSmallForm("Preparation", this.props.preparation_time + ' ' + this.state.unit_time_of_preparation, "auto", "icon-alarm-clock-1")}
                            {this.createSmallForm("Durée", this.props.service_time + ' ' + this.state.unit_time_of_service, "115px", "icon-clock")}
                        </div>
                        <div className="justify-content-center" style={{display: "flex"}}>
                            <div className="custom-float m-1">
                                <div className="input-group-prepend d-inline-block center" style={{width: "222px"}}>
                                    <div className="input-group-text text-dark font-weight-bold">
                                        <i className="icon-bitbucket-square"/>&nbsp;Type d'evenement</div>
                                    <div className="input-group-text text-light success-color" id="events">
                                        <input value={this.props.events_selected.join(', ')} className="center text-center border-0 bg-transparent" style={{width: "200px"}} id="events"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-red text-center">Le photos de votre prestation</p>
                        <div id="islCreativeCarousel" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner" style={{height: 110, width: "100%", borderRadius: 5}}>
                                {this.props.files.map((photo, index) =>
                                    <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                        <img className="d-block w-100" src={photo.url} onClick={() => {this.setState({imageToDisplay: photo.url, openLightBox: true})}} alt={photo.name}/>
                                    </div>
                                )}
                            </div>
                            <a className="carousel-control-prev bg-dark" href="#islCreativeCarousel" role="button" data-slide="prev">prev</a>
                            <a className="carousel-control-next bg-dark" href="#islCreativeCarousel" role="button" data-slide="next">next</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        files: state.KantoBizForm.files,
        title: state.KantoBizForm.title,
        city_reference: state.KantoBizForm.city_reference,
        others_city: state.KantoBizForm.others_city,
        description: state.KantoBizForm.description,
        events_selected: state.KantoBizForm.events_selected,
        price_of_service: state.KantoBizForm.price_of_service,
        preparation_time: state.KantoBizForm.preparation_time,
        number_of_artist: state.KantoBizForm.number_of_artist,
        unit_time_of_preparation: state.KantoBizForm.unit_time_of_preparation,
        unit_time_of_service: state.KantoBizForm.unit_time_of_service,
        service_time: state.KantoBizForm.service_time,
        thematics_options_selected: state.KantoBizForm.thematics_options_selected,
    };
};

export default connect(mapStateToProps, null)(Recaputilatif);
