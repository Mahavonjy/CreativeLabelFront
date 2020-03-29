import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useSelector} from "react-redux";

function Recaputilatif(props) {

    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const tmpArtistTypeSelected = useSelector(state => state.Others.tmpArtistTypeSelected);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
    const PropsOthersCity = useSelector(state => state.KantoBizForm.others_city);
    const PropsDescription = useSelector(state => state.KantoBizForm.description);
    const props_events_selected = useSelector(state => state.KantoBizForm.events_selected);
    const props_price_of_service = useSelector(state => state.KantoBizForm.price_of_service);
    const props_preparation_time = useSelector(state => state.KantoBizForm.preparation_time);
    const props_number_of_artist = useSelector(state => state.KantoBizForm.number_of_artist);
    const props_unit_time_of_preparation = useSelector(state => state.KantoBizForm.unit_time_of_preparation);
    const props_unit_time_of_service = useSelector(state => state.KantoBizForm.unit_time_of_service);
    const props_service_time = useSelector(state => state.KantoBizForm.service_time);
    const props_thematics_options_selected = useSelector(state => state.KantoBizForm.thematics_options_selected);

    const isMounted = useRef(false);
    const [imageToDisplay, setImageToDisplay] = useState('');
    const [openLightBox, setOpenLightBox] = useState(false);
    const [allCity, setAllCity] = useState(PropsOthersCity);
    const [unit_time_of_preparation, setUnitTimeOfPreparation] = useState('');
    const [unit_time_of_service, setUnitTimeOfService] = useState('');

    Recaputilatif.validation = () => {
        return {"error": false};
    };

    const createBigForm = (Title, values, icon) => {
        return (
            <div className="custom-float">
                <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                    <div className="input-group-text text-dark">
                        <i className={icon}/>&nbsp; {Title}</div>
                    <input value={values} id={Title} name={Title} className="form-control" type="text" disabled/>
                </div>
            </div>
        );
    };

    useEffect(() => {
        try {
            for (let row in props_unit_time_of_preparation)
                if (props_unit_time_of_preparation[row]) setUnitTimeOfPreparation(row);
            for (let row in props_unit_time_of_service)
                if (props_unit_time_of_service[row]) setUnitTimeOfService(row);
            try {
                let tmp = [...allCity];
                tmp.push(PropsCityReference);
                setAllCity(tmp.join(', '));
            } catch (e) {
            }
        } catch (e) {
            //
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <Modal visible={openLightBox} width="400" height="auto" animationType='slide'>
                <i className="icon icon-error s-36 absolute m-2 text-red" onClick={() => setOpenLightBox(false)}/>
                <img alt="show" src={imageToDisplay} width="auto" height="auto" style={{borderRadius: 4}}/>
            </Modal>
            <div className="relative">
                <h3 className="mb-2 text-primary">Le récapitulatif de votre prestation</h3>
            </div>
            <div className="row rounded border bg-grey justify-content-center overflow-auto scrollbar-isl"
                 style={{height: 300}}>
                <div className="col-md-6">
                    <div className="col">
                        <div className="form-group d-flex flex-wrap">
                            <div className="col-sm-6">
                                {createBigForm("Type d'artiste", props.var.artistType !== "professional_auditor" ? props.var.artistType : tmpArtistTypeSelected, "icon-user")}
                            </div>
                            <div className="col-sm-6">
                                {createBigForm("Thématique", props_thematics_options_selected.join(', '), "icon-neuter")}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group d-flex flex-wrap">
                            <div className="col-sm-6">
                                {createBigForm("Titre de votre prestation", PropsTitle, "icon-text-width")}
                            </div>
                            <div className="col-sm-6">
                                {createBigForm("Prix", props_price_of_service + "euros", "icon-money")}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group d-flex flex-wrap">
                            <div className="col-sm-6">
                                {createBigForm("Nombre d'artiste", props_number_of_artist, "icon-view")}
                            </div>
                            <div className="col-sm-6">
                                {createBigForm("Type(s) d'evenement(s) sélectionné(s)", props_events_selected.join(', '), "icon-bitbucket-square")}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group d-flex flex-wrap">
                            <div className="col-sm-6">
                                {createBigForm("Temps de préparation", props_preparation_time + ' ' + unit_time_of_preparation, "icon-alarm-clock-1")}
                            </div>
                            <div className="col-sm-6">
                                {createBigForm("Durée de la prestation", props_service_time + ' ' + unit_time_of_service, "icon-clock")}
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="form-group d-flex flex-wrap">
                            <div className="col-sm-6">
                                {createBigForm("Les villes annexes pour votre prestation", allCity, "icon-map-marker")}
                            </div>
                            <div className="col-sm-6">
                                <div className="custom-float">
                                    <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                                        <div className="input-group-text text-dark">
                                            <i className="icon-text-width"/>&nbsp; Description
                                        </div>
                                        <textarea value={PropsDescription} id="Description de votre prestation"
                                                  name="Description de votre prestation" className="form-control" disabled/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <p className="text-red text-center">Les images de votre prestation</p>
                    <div id="islCreativeCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" style={{height: 250, width: "100%", borderRadius: 5}}>
                            {PropsFiles.map((photo, index) =>
                                <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                                    <img className="d-block w-100" src={photo.url} onClick={async () => {
                                        await setImageToDisplay(photo.url);
                                        await setOpenLightBox(true);
                                    }} alt={photo.name}/>
                                </div>
                            )}
                        </div>
                        <a className="carousel-control-prev bg-dark" href="#islCreativeCarousel" role="button"
                           data-slide="prev">précédent</a>
                        <a className="carousel-control-next bg-dark" href="#islCreativeCarousel" role="button"
                           data-slide="next">Suivant</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Recaputilatif;
