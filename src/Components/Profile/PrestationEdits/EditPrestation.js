import React, { useEffect, useRef, useState } from "react";
import Thematics from "../../KantoBiz/Prestations/Form/Thematics";
import { useSelector } from "react-redux";
import PrestationInformation from "../../KantoBiz/Prestations/Form/PrestationInformation";
import { ImageClick, changeFields } from "../../FunctionTools/Tools";
import PrestationDetails from "../../KantoBiz/Prestations/Form/PrestationDetails";
import RefundPolicy from "../Section/RefundPolicy";
import ReactTooltip from "react-tooltip";
import Calendar from "../../KantoBiz/Calendar/Calendar";
import Materials from "./Materials";
import Options from "./Options";

function EditPrestation(props) {

    const role = useSelector(state => state.profile.role);

    const isMounted = useRef(false);
    const [global_price, setGlobalPrice] = useState(300);

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="card no-b">
            <ReactTooltip place="left" className="special-color-dark" id='global_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Frais de déplacement génerale</h5><br/>

                <small>• Ce prix sera le frais de déplacement globale de chaque nouvelle préstation </small><br/>
                <small>• Au début ce prix sera synchroniser avec votre première préstation</small><br/>
                <small>• Vous pouvez personnaliser pour chaque prestation le frais de déplacement ou bien en fonction de la date aussi</small><br/><br/>
            </ReactTooltip>
            <h3 className="text-red text-center">Modifier cette prestation</h3>
            <div className="card-body">
                <div className="row justify-content-center">
                    <div className="col-lg-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" data-toggle="pill" href="#v-pills-prestation" role="tab" aria-controls="v-pills-prestation" aria-selected="true">
                                Préstation
                            </a>
                            <a className="nav-link" id="v-pills-price-condition-tab" data-toggle="pill" href="#v-pills-price-condition" role="tab" aria-controls="v-pills-price-condition" aria-selected="false">
                                Prix & conditions
                            </a>
                            <a className="nav-link" id="v-pills-materials-tab" data-toggle="pill" href="#v-pills-materials" role="tab" aria-controls="v-pills-materials" aria-selected="false">
                                Matériels nécessaires
                            </a>
                            <a className="nav-link" id="v-pills-options-gestion-tab" data-toggle="pill" href="#v-pills-options-gestion" role="tab" aria-controls="v-pills-options-gestion" aria-selected="false">
                                Gestion des options
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-9 scrollbar-isl overflow-auto" style={{maxHeight: 700}}>
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane text-center fade active show" id="v-pills-prestation" role="tabpanel" aria-labelledby="v-pills-prestation-tab">
                                <div className="form-group pt-5">
                                    <div className="custom-file" data-tip="Fiche technique en pdf">
                                        <input type="file" accept="application/pdf" className="custom-file-input" />
                                        <label className="custom-file-label text-black" htmlFor="inputGroupFile01">Importer ici la fiche technique de cette prestation</label>
                                    </div>
                                </div>
                                <Thematics var={{artistType: role.charAt(0).toUpperCase() + role.slice(1)}}/>
                                <PrestationInformation aartistType={role.charAt(0).toUpperCase() + role.slice(1)}/>
                                <div className="pt-5 mb-2">
                                    <div className="cube-container">
                                        <div className="cube initial-position">
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-1" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=300&h=300&fit=crop" alt=""/>
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-2" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=300&h=300&fit=crop" alt=""/>
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-3" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=300&h=300&fit=crop" alt=""/>
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-4" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=300&h=300&fit=crop" alt=""/>
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-5" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=300&h=300&fit=crop" alt=""/>
                                            <img data-tip="Cliquez moi pour me supprimer" className="cube-face-image image-6" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=300&h=300&fit=crop" alt=""/>
                                        </div>
                                    </div>
                                    <div className="image-buttons">
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-1" src="https://images.unsplash.com/photo-1445810694374-0a94739e4a03?w=100&h=100&fit=crop" alt=""/>
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-2" src="https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=100&h=100&fit=crop" alt=""/>
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-3" src="https://images.unsplash.com/photo-1506045412240-22980140a405?w=100&h=100&fit=crop" alt=""/>
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-4" src="https://images.unsplash.com/photo-1514041181368-bca62cceffcd?w=100&h=100&fit=crop" alt=""/>
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-5" src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=100&h=100&fit=crop" alt=""/>
                                        <input onClick={(e) => ImageClick(e)} type="image" className="show-image-6" src="https://images.unsplash.com/photo-1486334803289-1623f249dd1e?w=100&h=100&fit=crop" alt=""/>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="v-pills-price-condition" role="tabpanel" aria-labelledby="v-pills-price-condition-tab">
                                {/* cette balise sera enlever pour les beatmakers et les monteurs vidéoclips au vue du caractère spécifique de leurs prestations*/}
                                <div className="text-center">
                                    <h4 className="text-light text-center bolder pt-3 pb-2">Votre frais de déplacement générale est de:</h4>
                                    <div className="col text-center pt-2 pb-3">
                                        <h2 className="text-red">{global_price} $&nbsp;
                                            <i className="icon icon-info text-red" data-tip data-for="global_price" /></h2>
                                        <div className="custom-float">
                                            <div className="input-group-prepend d-inline-block center">
                                                <div className="input-group-text text-dark"><i className="icon-money"/>&nbsp;Modifier le prix ici *</div>
                                                <input className="form-control" type="number" id="global_price" name="global_price"
                                                       onChange={(e) => changeFields(setGlobalPrice, e)}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* End */}
                                <RefundPolicy/>
                                <PrestationDetails />
                                <h2 className="text-center text-primary pb-3">Calendrier&nbsp;<i className="icon icon-info" data-tip="Ceci est un aperçu de votre planing"/></h2>
                                <Calendar noEdit/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-materials" role="tabpanel" aria-labelledby="v-pills-materials-tab">
                                <Materials/>
                            </div>
                            <div className="tab-pane fade" id="v-pills-options-gestion" role="tabpanel" aria-labelledby="v-pills-options-gestion-tab">
                                <Options/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPrestation;
