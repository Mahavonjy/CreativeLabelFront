import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
    addAllUserPrestation,
    addDescriptionOfService,
    addEventSelected,
    addFileTechnicalSheet,
    addMaterialsOfService,
    addNumberOfArtist,
    addOptionSelected,
    addOthersCityOfService,
    addPicturesOfService,
    addPreparationTime,
    addPriceOfService,
    addReferenceOfCity,
    addServiceCountry,
    addServiceId,
    addServiceRefundPolicy,
    addServiceSpecialDate,
    addServiceTime,
    addServiceToShow,
    addTitleOfService,
    addTravelExpenses,
    addUnitTimeOfPreparation,
    addUnitTimeOfService,
    addUserId,
    changeStatusOfService,
    profileInitialisationCondition
} from "../../../functionTools/functionProps";
import {checkUnitKey, deleteInObject, objectToFormData, resetPropsForm} from "../../../functionTools/tools";
import EditPrestation from "../../edits/editPrestation";

function MyPrestations(props) {

    const history = useHistory();
    const dispatch = useDispatch();
    const conditions = useSelector(state => state.profile.conditions);
    const prestations = useSelector(state => state.profilePrestations.prestations);
    const props_options = useSelector(state => state.profilePrestations.options);
    const lightModeOn = useSelector(state => state.Home.lightModeOn);

    const isMounted = useRef(false);
    const [global_price, setGlobalPrice] = useState(conditions['travel_expenses']);
    const [state_index, setStateIndex] = useState(null);
    const [copyEdit, setCopyEdit] = useState(false);
    const [editPrestation, setEditPrestation] = useState(false);
    const [allPrestation, setAllPrestation] = useState(prestations);

    const changeGlobalPrice = (e) => {
        let value = e.target.value;
        setGlobalPrice(value);
        let tmp = {...conditions};
        tmp['travel_expenses'] = value;
        dispatch(profileInitialisationCondition(tmp));
        tmp = deleteInObject(tmp);
        axios.put('api/artist_conditions/update', tmp, {headers: props.headers}
        ).then((err) => null)
    };

    const displayService = async (index) => {
        let tmp = {...allPrestation[index]};
        tmp['options'] = props_options;
        await dispatch(addServiceToShow(tmp));
        history.push("/show-service-read")
    };

    const updated = async (opt) => {
        await setEditPrestation(false);
        if (!opt)
            toast.success("success");
    };

    const addToPropsToEdit = async (index, copy_) => {
        if (copy_)
            await setCopyEdit(true);
        setStateIndex(index);
        let tmp_prestation = allPrestation[index];
        await dispatch(addServiceId(tmp_prestation.id));
        await dispatch(addUserId(tmp_prestation.user_id));
        await dispatch(addPriceOfService(tmp_prestation.price));
        await dispatch(addTitleOfService(tmp_prestation.title));
        await dispatch(addTitleOfService(tmp_prestation.title));
        await dispatch(addEventSelected(tmp_prestation.events));
        await dispatch(addServiceCountry(tmp_prestation.country));
        await dispatch(addOptionSelected(tmp_prestation.thematics));
        await dispatch(changeStatusOfService(tmp_prestation.hidden));
        await dispatch(addPicturesOfService(tmp_prestation.galleries));
        await dispatch(addMaterialsOfService(tmp_prestation.materials));
        await dispatch(addTravelExpenses(tmp_prestation.travel_expenses));
        await dispatch(addReferenceOfCity(tmp_prestation.reference_city));
        await dispatch(addOthersCityOfService(tmp_prestation.others_city));
        await dispatch(addDescriptionOfService(tmp_prestation.description));
        await dispatch(addServiceSpecialDate(tmp_prestation.special_dates));
        await dispatch(addPreparationTime(tmp_prestation.preparation_time));
        await dispatch(addNumberOfArtist(tmp_prestation.number_of_artists));
        await dispatch(addServiceRefundPolicy(tmp_prestation.refund_policy));
        await dispatch(addServiceTime(tmp_prestation.duration_of_the_service));
        await dispatch(addFileTechnicalSheet(tmp_prestation.materials.technical_sheet));
        await dispatch(addUnitTimeOfService(checkUnitKey(tmp_prestation.unit_duration_of_the_service, true)));
        await dispatch(addUnitTimeOfPreparation(checkUnitKey(tmp_prestation.unit_of_the_preparation_time, true)));
        await setEditPrestation(true)
    };

    const onChangeHidden = (index) => {
        let tmp_prestations = [...allPrestation];
        tmp_prestations[index].hidden = !allPrestation[index].hidden;
        update(tmp_prestations, index)
    };

    const deletePrestations = (indexOfService) => {
        if (allPrestation.length > 1) {
            axios.delete('api/artist_services/delete/' + allPrestation[indexOfService]['id'],
                {headers: props.headers}).then(async () => {
                toast.success("Supprimer avec succès");
                let tmp = allPrestation.filter((service, index) => index !== indexOfService);
                setAllPrestation(tmp);
                props.setAllPrestation(tmp);
                await dispatch(addAllUserPrestation(tmp));
            });
        } else toast.error("Vous ne pouvez pas supprimer toute les prestations")
    };

    const update = (allServices, index) => {
        let tmpData = {...allServices[index]};
        delete tmpData['id'];
        delete tmpData['created_at'];
        delete tmpData['modified_at'];
        let headers = props.headers;
        headers['Content-Type'] = 'multipart/form-data';
        axios.put("api/artist_services/update/" + allServices[index]['id'], objectToFormData(tmpData),
            {headers: headers}).then((resp) => {
            props.setAllPrestation(allServices);
        }).catch((error) => {
            console.log(error.response.data)
        });
    };

    useEffect(() => {
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
        let props_allPrestation = props.allPrestation;
        if (props_allPrestation) {
            setAllPrestation(allPrestation);
        }

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [allPrestation]);

    return (
        <div className="text-center" style={{minHeight: 320}}>
            <ReactTooltip/>
            <ReactTooltip place="right" className="special-color-dark" id='global_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Ce montant correspond aux frais de transport général</h5><br/>
                <small>• Il s'agit de vos frais de transport par défaut applicable à toutes vos
                    prestations </small><br/>
                <small>• Le frais de transport général par défaut est de 0 et est personnalisable en fonction de vos
                    estimations</small><br/>
                <small>• Vous pouvez également indiquer un frais de transport spécifique par prestation et par date de
                    prestation</small><br/><br/>
                <small>• Celui ci est enregistrer automatiquement a chaque changement </small><br/>
            </ReactTooltip>
            <ReactTooltip place="left" className="special-color-dark" id='copy_edit' aria-haspopup='true'>
                <h5 className="text-center text-green">Dupliquer et Modifier</h5><br/>
                <small>• Une autre façon de le dire: cloner en vue d’une modification </small><br/>
                <small>• L’artiste ne peut pas publier une prestation dupliqué qui a le même prix, le même type
                    d’évènement, même ville en même temps</small><br/>
                <small>• Exemple: Soît c'est le même prix, pas le même type d’évènement, même ville</small><br/><br/>
            </ReactTooltip>

            {/* if user choice edit one prestation */}
            <Modal visible={editPrestation}
                   width="80%"
                   height="60%"
                   effect="fadeInUp">
                <div className="bg-dark" style={{height: "100%"}}>
                    <button className="ModalClose float-left" onClick={() => {
                        setEditPrestation(false);
                        resetPropsForm(dispatch);
                        setCopyEdit(false)
                    }}>
                        <i className="icon-close s-24 text-warning"/>
                    </button>
                    {editPrestation &&
                    <EditPrestation
                        updated={updated}
                        copyEdit={copyEdit}
                        close={props.close}
                        index={state_index}
                        headers={props.headers}
                        allPrestation={allPrestation}
                        setAllPrestation={setAllPrestation}
                        setEditPrestation={setEditPrestation}
                        setAddNewPrestation={props.setAddNewPrestation}
                    />}
                </div>
            </Modal>
            <div className="row justify-content-center">
                {!props.read &&
                <div className="col-lg-3">
                    <h4 className="text-light text-center bolder pt-3 pb-2">Mon frais de transport est de:</h4>
                    <div className="col text-center pt-2 pb-3">
                        <h2 className="text-red">{global_price} $&nbsp;
                            <i className="icon icon-info text-red" data-tip data-for="global_price"/></h2>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center">
                                <div className="input-group-text text-dark">
                                    <i className="icon-money"/>&nbsp;Modifier le prix *
                                </div>
                                <input className="form-control" value={global_price} type="number" id="global_price"
                                       name="global_price"
                                       onChange={(e) => changeGlobalPrice(e)}/>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className={props.read ? "col-lg-12" : "col-lg-9"}>
                    <div className="row justify-content-center scrollbar-isl">
                        {allPrestation.map((val, index) =>
                            <div className={!props.profile && "card_kanto"} key={index}>
                                <div className={!props.profile && "additional"}>
                                    {!props.profile &&
                                    <div className="more-info">
                                        <h1 className="pt-2">Artist Name</h1>
                                        <div className="row justify-content-center text-center" data-tip="Cliquer Moi">
                                            <div className="col text-light d-none d-sm-block">
                                                <h4 className="text-light bolder">Genre</h4>
                                                <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                    {val.thematics.map((v, i) => <li key={i}>{v}</li>)}
                                                </ul>
                                            </div>
                                            <div className="col text-light d-none d-sm-block">
                                                <h4 className="text-light bolder">Ville</h4>
                                                <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                    <li>{val.reference_city}</li>
                                                    {val.others_city.map((v, i) => <li key={i}>{v}</li>)}
                                                </ul>
                                            </div>
                                            <div className="col ml-auto d-sm-none">
                                                <h4 className="text-red">Evenements</h4>
                                                <p className="events scrollbar-isl">
                                                    {val.events.map((v) => v + " ,")}
                                                </p>
                                                <div className="row ml-2 mr-3">
                                                    <div className="col">
                                                        <small className="text-red">Ville</small>
                                                        <ul className="small-kanto-list">
                                                            <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                                <li>{val.reference_city}</li>
                                                                {val.others_city.map(
                                                                    (v, i) => <li key={i}>{v}</li>
                                                                )}
                                                            </ul>
                                                        </ul>
                                                    </div>
                                                    <div className="col">
                                                        <div className="text-center"
                                                             style={{marginTop: 10, marginLeft: 10}}>
                                                            <img src='https://zupimages.net/up/19/18/3ltf.png' alt=''/>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <small className="text-red">Genre</small>
                                                        <ul className="small-kanto-list scrollbar-isl">
                                                            {val.thematics.map((v, i) => <li key={i}>{v}</li>)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="stats">
                                            <div data-tip="Le nombre d'artiste dans le groupe">
                                                <i className="icon icon-adjust"/>
                                                <div className="value">{val.number_of_artists}</div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                <i className="icon icon-clock-1"/>
                                                <div className="value">
                                                    {val.duration_of_the_service}{val.unit_duration_of_the_service}
                                                </div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                <i className="icon icon-clock-o"/>
                                                <div className="value">
                                                    {val.preparation_time}{val.unit_of_the_preparation_time}
                                                </div>
                                            </div>
                                            <div data-tip="Le prix de la prestation">
                                                <i className="icon icon-money"/>
                                                <div className="value">{val.price}$</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className={!props.profile && "general d-none d-sm-block"}>
                                    {!props.profile && <img alt="" src={val.galleries[0]} width="100%" height="100%"/>}
                                    {!props.profile && <h1 className="pt-2 ml-2 bolder text-red">Artist Name</h1>}
                                    {!props.profile &&
                                    <p className="text-dark ml-2 font-weight-bold">{val.description}</p>}
                                    {!props.profile &&
                                        <small className="more-genre scrollbar-isl pl-2 text-black">
                                            {val.thematics.map((v) => v)}</small>}
                                </div>
                            </div>
                        )}
                        {allPrestation.map((val, index) =>
                        <div className="col-md-4 mt-4">
                            {props.profile && <div className={lightModeOn ? "card shadow1 profile-card-5" : "card shadow2 profile-card-5"}>
                                    <div
                                        className={lightModeOn ? "card-img-block theme-light" : "card-img-block theme-dark"}>
                                        <img className="card-img-top"
                                             src={val.galleries[0]}
                                             alt="Card image cap"/>
                                    </div>
                                    <div className="card-body pt-0">
                                        <h5 className="card-title">{val.title}</h5>
                                        <p>{val.price}$</p>
                                    </div>
                                    <ul className="follow-list">
                                        <li className="first-list"><a><i className="fa fa-edit"
                                            data-tip="Modifier cette prestation"
                                            onClick={() => addToPropsToEdit(index)}/></a></li>
                                        <li><a><i className="fa fa-trash-o"
                                            onClick={() => deletePrestations(index)}
                                            data-tip="supprimer cette prestation"/></a>
                                        </li>
                                        <li><a><i className="fa fa-clone"
                                            onClick={() => addToPropsToEdit(index, true)}
                                            data-tip data-for="copy_edit"/></a></li>
                                        <li><a><i className="fa fa-info-circle" onClick={() => displayService(index)}/>
                                        </a></li>
                                        {val.hidden ?
                                            <li className="last-list">
                                                <a>
                                                    <i className="fa fa-eye-slash"
                                                       onClick={() => onChangeHidden(index)}
                                                      data-tip="Cette prestation est caché,
                                               c'est a dire n'est pas visible a la recherche des autieurs pro">
                                                    </i>
                                                </a>
                                            </li> :
                                            <li className="last-list">
                                                <a>
                                                    <i className="fa fa-eye"
                                                       onClick={() => onChangeHidden(index)}
                                                       data-tip="Cette prestation est afficher,
                                               c'est a dire visible a la recherche des autieurs pro">
                                                    </i>
                                                </a>
                                            </li>}
                                    </ul>
                                </div>}
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MyPrestations;
