import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
    addDescriptionOfService,
    addEventSelected,
    addMaterialsOfService,
    addNumberOfArtist,
    addOptionSelected,
    addOthersCityOfService,
    addPicturesOfService,
    addPreparationTime,
    addPriceOfService,
    addReferenceOfCity,
    addServiceId,
    addServiceTime,
    addTitleOfService,
    addUnitTimeOfPreparation,
    addUnitTimeOfService,
    changeMovingPrice,
    changeStatusOfService
} from "../../FunctionTools/FunctionProps";
import {changeFields, objectToFormData, serviceToFormData} from "../../FunctionTools/Tools";
import DisplayPrestation from "../../KantoBiz/Prestations/Results/DisplayPrestation";
import EditPrestation from "../PrestationEdits/EditPrestation";

function MyPrestations(props) {

    const dispatch = useDispatch();
    const prestations = useSelector(state => state.profilePrestations.prestations);

    const isMounted = useRef(false);
    const [global_price, setGlobalPrice] = useState(300);
    const [state_index, setStateIndex] = useState(null);
    const [copyEdit, setCopyEdit] = useState(false);
    const [showOne, setShowOne] = useState(false);
    const [editPrestation, setEditPrestation] = useState(false);
    const [allPrestation, setAllPrestation] = useState(prestations);

    const checkUnit = (val, opt) => {
        if (val === "min")
            if (opt)
                return {"day": false, "hours": false, "min": true, "sec": false};
            else return "m";
        else if (val === "day")
            if (opt)
                return {"day": true, "hours": false, "min": false, "sec": false};
            else return "j";
        else if (val === "sec")
            if (opt)
                return {"day": false, "hours": false, "min": false, "sec": true};
            else return "s";
        if (opt)
            return {"day": false, "hours": true, "min": false, "sec": false};
        return "h";
    };

    const clearProps = async () => {
        await dispatch(addServiceId(null));
        await dispatch(addUnitTimeOfService({"day": false, "hours": false, "min": false, "sec": false}));
        await dispatch(addOptionSelected([]));
        await dispatch(addPicturesOfService([]));
        await dispatch(addTitleOfService(""));
        await dispatch(addReferenceOfCity(""));
        await dispatch(addOthersCityOfService([]));
        await dispatch(addDescriptionOfService(""));
        await dispatch(addEventSelected([]));
        await dispatch(addServiceTime(""));
        await dispatch(addPriceOfService(null));
        await dispatch(addPreparationTime(null));
        await dispatch(addNumberOfArtist(1));
        await dispatch(addUnitTimeOfPreparation({"day": false, "hours": false, "min": false, "sec": false}));
        await dispatch(changeStatusOfService(null));
        await dispatch(changeMovingPrice(null));
        await dispatch(addMaterialsOfService([]));
    };

    const updated = async (opt) => {
        await props.setToast(true);
        await setEditPrestation(false);
        if (!opt)
            toast.success("success");
    };

    const addToPropsToEdit = async (index, copy_) => {
        props.setToast(false);
        if (copy_)
            await setCopyEdit(true);
        setStateIndex(index);
        let tmp_prestation = allPrestation[index];
        await dispatch(addServiceId(tmp_prestation.id));
        await dispatch(addUnitTimeOfService(checkUnit(tmp_prestation.service_time.unit, true)));
        await dispatch(addOptionSelected(tmp_prestation.thematics_options_selected));
        await dispatch(addPicturesOfService(tmp_prestation.photo));
        await dispatch(addTitleOfService(tmp_prestation.title));
        await dispatch(addReferenceOfCity(tmp_prestation.city_of_reference));
        await dispatch(addOthersCityOfService(tmp_prestation.others_city));
        await dispatch(addDescriptionOfService(tmp_prestation.description));
        await dispatch(addEventSelected(tmp_prestation.events_type));
        await dispatch(addServiceTime(tmp_prestation.service_time.time));
        await dispatch(addPriceOfService(tmp_prestation.price));
        await dispatch(addPreparationTime(tmp_prestation.preparation_time.time));
        await dispatch(addNumberOfArtist(tmp_prestation.number_of_artists));
        await dispatch(addUnitTimeOfPreparation(checkUnit(tmp_prestation.preparation_time.unit, true)));
        await dispatch(changeStatusOfService(tmp_prestation.hidden));
        await dispatch(changeMovingPrice(tmp_prestation.moving_price));
        await dispatch(addMaterialsOfService(tmp_prestation.materials));
        await setEditPrestation(true)
    };

    const onChangeHidden = (index) => {
        let tmp_prestations = [...allPrestation];
        tmp_prestations[index].hidden = !allPrestation[index].hidden;
        update(tmp_prestations, index)
    };

    const deletePrestations = (indexOfOption) => {
        if (allPrestation.length > 1) {
            props.setAllPrestation(allPrestation.filter((option, index) => index !== indexOfOption));
            toast.success("Supprimer avec succès")
        } else toast.error("Vous ne pouvez pas supprimer toute les prestations")
    };

    const update = (allServices, index) => {
        let tmpData = {...allServices[index]};
        delete tmpData['id'];
        delete tmpData['created_at'];
        delete tmpData['modified_at'];
        let headers = props.headers;
        headers['Content-Type'] = 'multipart/form-data';
        axios.put("api/artist_services/update/" + allServices[index]['id'], serviceToFormData(tmpData), {headers: headers}).then((resp) => {
            props.setAllPrestation(allServices);
            console.log(resp.data);
        }).catch((error) => {
            console.log(error.response.data)
        });
    };

    useEffect(() => {
        if (props.allPrestation)
            setAllPrestation(allPrestation);

        return () => {
            isMounted.current = true
        };
    }, []);

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
            </ReactTooltip>
            <ReactTooltip place="left" className="special-color-dark" id='copy_edit' aria-haspopup='true'>
                <h5 className="text-center text-green">Dupliquer et Modifier</h5><br/>

                <small>• Une autre façon de le dire: cloner en vue d’une modification </small><br/>
                <small>• L’artiste ne peut pas publier une prestation dupliqué qui a le même prix, le même type
                    d’évènement, même ville en même temps</small><br/>
                <small>• Exemple: Soît c'est le même prix, pas le même type d’évènement, même ville</small><br/><br/>
            </ReactTooltip>
            {/* if user choice edit one prestation */}
            <Modal visible={editPrestation} width="80%" height="80%" effect="fadeInUp">
                <div className="bg-dark" style={{height: "100%"}}>
                    <button className="ModalClose float-left" onClick={() => {
                        setEditPrestation(false);
                        props.setToast(true);
                        clearProps().then(r => null);
                        setCopyEdit(false)
                    }}>
                        <i className="icon-close s-24 text-warning"/>
                    </button>
                    {editPrestation &&
                    <EditPrestation updated={updated} copyEdit={copyEdit} setEditPrestation={setEditPrestation}
                                    close={props.close} setActiveToast={props.setActiveToast}
                                    setAllPrestation={props.setAllPrestation}
                                    setAddNewPrestation={props.setAddNewPrestation} index={state_index}/>}
                </div>
            </Modal>
            {/* end form become an artist */}
            {/* if user choice become an artist*/}
            <Modal visible={showOne} width="80%" height="80%" effect="fadeInUp" onClickAway={() => setShowOne(false)}>
                <div className="bg-dark overflow-auto scrollbar-isl" style={{height: "100%"}}>
                    <button className="ModalClose" style={{position: "fixed", left: 0, top: 0}}
                            onClick={() => setShowOne(false)}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    {showOne && <DisplayPrestation read/>}
                </div>
            </Modal>
            {/* end form become an artist*/}
            <div className="row justify-content-center">
                {!props.read &&
                <div className="col-lg-2">
                    <h4 className="text-light text-center bolder pt-3 pb-2">Mon frais de transport est de:</h4>
                    <div className="col text-center pt-2 pb-3">
                        <h2 className="text-red">{global_price} $&nbsp;
                            <i className="icon icon-info text-red" data-tip data-for="global_price"/></h2>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center">
                                <div className="input-group-text text-dark">
                                    <i className="icon-money"/>&nbsp;Modifier le prix *
                                </div>
                                <input className="form-control" type="number" id="global_price" name="global_price"
                                       onChange={(e) => changeFields(setGlobalPrice, e)}/>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className={props.read ? "col-lg-12" : "col-lg-10"}>
                    <div className="row justify-content-center scrollbar-isl">
                        {allPrestation.map((val, index) =>
                            <div className={!props.profile ? "card_kanto" : "card_kantoProfile"} key={index}>
                                <div className={!props.profile ? "additional" : "additionalProfile"}>
                                    <div
                                        className={props.profile ? "user-card_kanto" : "user-card_kanto d-none d-sm-block"}
                                        data-tip="Cliquer Moi">
                                        <div className="level center-result">
                                            {val.title}
                                        </div>
                                        {props.read ?
                                            <div className="points center-result">
                                                5&nbsp;<i className="icon icon-star"/>
                                            </div> :
                                            <div className="points center-result">
                                                <i className="icon-edit text-red s-24 ml-1 mr-1"
                                                   data-tip="Modifier cette prestation"
                                                   onClick={() => addToPropsToEdit(index)}/>
                                                <i className="icon-trash text-red s-24 ml-1 mr-1"
                                                   onClick={() => deletePrestations(index)}
                                                   data-tip="supprimer cette prestation"/>
                                            </div>
                                        }
                                        <div className="text-center" style={{paddingTop: 70}}>
                                            <img width={110} height={100} src={val.galleries[0]} alt=''
                                                 className="border1"/>
                                        </div>
                                    </div>

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
                                                                {val.others_city.map((v, i) => <li key={i}>{v}</li>)}
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
                                                {/*<small className="title">Artist</small>*/}
                                                <i className="icon icon-adjust"/>
                                                <div className="value">{val.number_of_artists}</div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                {/*<small className="title">Preparation</small>*/}
                                                <i className="icon icon-clock-1"/>
                                                <div
                                                    className="value">{val.duration_of_the_service}{val.unit_duration_of_the_service}</div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                {/*<small className="title">Durée</small>*/}
                                                <i className="icon icon-clock-o"/>
                                                <div
                                                    className="value">{val.preparation_time}{val.unit_of_the_preparation_time}</div>
                                            </div>
                                            <div data-tip="Le prix de la prestation">
                                                {/*<small className="title">Prix</small>*/}
                                                <i className="icon icon-money"/>
                                                <div className="value">{val.price}$</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className={!props.profile ? "general d-none d-sm-block" : "generalProfile"}>
                                    {props.profile &&
                                    <div>
                                        {val.hidden ?
                                            <i className="float-right text-red icon-hide s-36 mt-1"
                                               onClick={() => onChangeHidden(index)}
                                               data-tip="Cette prestation est caché, c'est a dire n'est pas visible a la recherche des autieurs pro"/> :
                                            <i className="float-right text-red icon-eye s-36 mt-1"
                                               onClick={() => onChangeHidden(index)}
                                               data-tip="Cette prestation est afficher, c'est a dire visible a la recherche des autieurs pro"/>}
                                    </div>}
                                    {!props.profile && <img alt="" src={val.galleries[0]} width="100%" height="100%"/>}
                                    {!props.profile && <h1 className="pt-2 ml-2 bolder text-red">Artist Name</h1>}
                                    {!props.profile &&
                                    <p className="text-dark ml-2 font-weight-bold">{val.description}</p>}
                                    <h1 className={!props.profile ? "more text-black bolder" : "more text-black bolder pb-5"}>{val.price}$</h1>
                                    {!props.profile ?
                                        <small
                                            className="more-genre scrollbar-isl pl-2 text-black">{val.thematics.map((v) => v)}</small> :
                                        <div className="more-icon text-red mt-4"
                                             onClick={() => addToPropsToEdit(index, true)} data-tip
                                             data-for="copy_edit">
                                            <i className="icon-copy s-24"/>&nbsp;&&nbsp;<i className="icon-edit s-24"/>
                                        </div>}
                                    {props.profile && <i className="icon-smartphone-11 text-red more-icon-phone s-36"
                                                         onClick={() => setShowOne(true)}/>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyPrestations;
