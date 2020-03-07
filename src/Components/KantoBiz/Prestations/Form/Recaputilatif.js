import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useSelector} from "react-redux";

function Recaputilatif(props) {

    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
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

    const createSmallForm = (Title, values, width, icon) => {
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

    Recaputilatif.validation = () => {
        return {"error": false};
    };

    const createBigForm = (Title, values, icon) => {
        return (
            <div className="custom-float">
                <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                    <div className="input-group-text text-dark">
                        <i className={icon}/>&nbsp;    {Title}</div>
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

            <div className="relative mb-5">
                <h3 className="mb-2 text-primary">Le récapitulatif de votre prestation</h3>

            </div>
            <div className="row">
                <div className="col-md-6">
                    {createBigForm("Type d'artiste", props.var.artistType, "icon-user")}
                    {createBigForm("Thématique", props_thematics_options_selected.join(', '), "icon-neuter")}
                    {createBigForm("Titre de votre prestation", PropsTitle, "icon-text-width")}
                    <div className="custom-float">
                        <div className="input-group-prepend d-inline-block center" style={{width: "100%"}}>
                            <div className="input-group-text text-dark">
                                <i className="icon-text-width"/>&nbsp; Description
                            </div>
                            <textarea value={PropsDescription} id="Description de votre prestation"
                                      name="Description de votre prestation" className="form-control" disabled/>
                        </div>
                    </div>
                    {createBigForm("Les villes annexes pour votre prestation", allCity, "icon-map-marker\n")}
                </div>
                <div className="col-md-6">
                    <div className="justify-content-center" style={{display: "flex"}}>
                        {createSmallForm("Prix", props_price_of_service + "euros", "88px", "icon-money")}
                        {createSmallForm("Nombre d'artiste", props_number_of_artist, "auto", "icon-view")}
                    </div>
                    <div className="justify-content-center" style={{display: "flex"}}>
                        {createSmallForm("Temps de préparation", props_preparation_time + ' ' + unit_time_of_preparation, "auto", "icon-alarm-clock-1")}
                        {createSmallForm("Durée de la prestation", props_service_time + ' ' + unit_time_of_service, "115px", "icon-clock")}
                    </div>
                    <div className="justify-content-center" style={{display: "flex"}}>
                        <div className="custom-float m-1">
                            <div className="input-group-prepend d-inline-block center" style={{width: "222px"}}>
                                <div className="input-group-text text-dark font-weight-bold">
                                    <i className="icon-bitbucket-square"/>&nbsp;Type(s) d'evenement(s) sélectionné(s)
                                </div>
                                <div className="input-group-text text-light success-color" id="events">
                                    <input value={props_events_selected.join(', ')}
                                           className="center text-center border-0 bg-transparent"
                                           style={{width: "200px"}} id="events"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-red text-center">Les images de votre prestation</p>
                    <div id="islCreativeCarousel" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner" style={{height: 110, width: "100%", borderRadius: 5}}>
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
