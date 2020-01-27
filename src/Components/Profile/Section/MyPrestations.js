import React, { useEffect, useRef, useState } from "react";
import ReactTooltip from "react-tooltip";
import { changeFields } from "../../FunctionTools/Tools";
import EditPrestation from "../PrestationEdits/EditPrestation";
import Modal from "react-awesome-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function MyPrestations(props) {

    const props_prestation = useSelector(state => state.profilePrestations.prestations);

    const isMounted = useRef(false);
    const [state_index, setStateIndex] = useState(null);
    const [global_price, setGlobalPrice] = useState(300);
    const [editPrestation, setEditPrestation] = useState(false);
    const [allPrestation, setAllPrestation] = useState(props_prestation);

    const checkUnit = (val) => {
        if (val === "min")
            return "m";
        else if (val === "day")
            return "j";
        else return "h"
    };

    const toEditPrestation = async (index) => {
        await setStateIndex(index);
        await setEditPrestation(true)
    };

    const onChangeHidden = (index) => {
        let tmp_prestations = [...allPrestation];
        tmp_prestations[index].hidden = !allPrestation[index].hidden;
        setAllPrestation(tmp_prestations);
    };

    const deletePrestations = (indexOfOption) => {
        if (allPrestation.length > 1)
            setAllPrestation(allPrestation.filter((option, index) => index !== indexOfOption));
        else toast.error("Vous ne pouvez pas supprimer toute les prestations")
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="text-center" style={{minHeight: 320}}>
            <ReactTooltip/>
            <ReactTooltip place="right" className="special-color-dark" id='global_price' aria-haspopup='true'>
                <h5 className="text-center text-green"> Frais de déplacement génerale</h5><br/>

                <small>• Ce prix sera le frais de déplacement globale de chaque nouvelle préstation </small><br/>
                <small>• Au début ce prix sera synchroniser avec votre première préstation</small><br/>
                <small>• Vous pouvez personnaliser pour chaque prestation le frais de déplacement ou bien en fonction de la date aussi</small><br/><br/>
            </ReactTooltip>
            <ReactTooltip place="left" className="special-color-dark" id='copy_edit' aria-haspopup='true'>
                <h5 className="text-center text-green">Dupliquer et Modifier</h5><br/>

                <small>• Une autre façon de le dire: cloner en vue d’une modification </small><br/>
                <small>• L’artiste ne peut pas publier une prestation dupliqué qui a le même prix, le même type d’évènement, même ville en même temps</small><br/>
                <small>• Exemple: Soît c'est le même prix, pas le même type d’évènement, même ville</small><br/><br/>
            </ReactTooltip>
            {/* if user choice edit one prestation */}
            <Modal visible={editPrestation} width="80%" height="80%" effect="fadeInUp">
                <div className="bg-dark" style={{height:"100%"}}>
                    <button className="ModalClose float-left" onClick={() => setEditPrestation(false)}>
                        <i className="icon-close s-24 text-warning"/>
                    </button>
                    <EditPrestation data={allPrestation} index={state_index} setAllPrestation={setAllPrestation}/>
                </div>
            </Modal>
            {/* end form become an artist */}
            <div className="row justify-content-center">
                {!props.read &&
                <div className="col-lg-2">
                    <h4 className="text-light text-center bolder pt-3 pb-2">Votre frais de déplacement générale est de:</h4>
                    <div className="col text-center pt-2 pb-3">
                        <h2 className="text-red">{global_price} $&nbsp;
                            <i className="icon icon-info text-red" data-tip data-for="global_price" /></h2>
                        <div className="custom-float">
                            <div className="input-group-prepend d-inline-block center">
                                <div className="input-group-text text-dark">
                                    <i className="icon-money"/>&nbsp;Modifier le prix ici *
                                </div>
                                <input className="form-control" type="number" id="global_price" name="global_price" onChange={(e) => changeFields(setGlobalPrice, e)}/>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className={props.read ? "col-lg-12" : "col-lg-10"}>
                    <div className="row justify-content-center scrollbar-isl">
                        {allPrestation.map((val, index) =>
                            <div className={!props.profile ? "card_kanto" : "card_kantoProfile"} key={index}>
                                <div className={!props.profile ? "additional": "additionalProfile"}>
                                    <div className={props.profile ? "user-card_kanto" : "user-card_kanto d-none d-sm-block"} data-tip="Cliquer Moi">
                                        <div className="level center-result">
                                            {val.title}
                                        </div>
                                        {props.read ?
                                        <div className="points center-result">
                                            5&nbsp;<i className="icon icon-star"/>
                                        </div>:
                                            <div className="points center-result">
                                                <i className="icon-edit text-red s-24 ml-1 mr-1" data-tip="Modifier cette prestation" onClick={() => toEditPrestation(index)}/>
                                                <i className="icon-trash text-red s-24 ml-1 mr-1" onClick={() => deletePrestations(index)} data-tip="supprimer cette prestation"/>
                                            </div>
                                        }
                                        <div className="text-center" style={{paddingTop: 70}}>
                                            <img width={110} height={100} src={val.photo[0]} alt=''/>
                                        </div>
                                    </div>

                                    {!props.profile &&
                                    <div className="more-info">
                                        <h1 className="pt-2">Artist Name</h1>
                                        <div className="row justify-content-center text-center" data-tip="Cliquer Moi">
                                            <div className="col text-light d-none d-sm-block">
                                                <h4 className="text-light bolder">Genre</h4>
                                                <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                    {val.thematics_options_selected.map((v, i) => <li key={i}>{v}</li>)}
                                                </ul>
                                            </div>
                                            <div className="col text-light d-none d-sm-block">
                                                <h4 className="text-light bolder">Ville</h4>
                                                <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                    <li>{val.city_of_reference}</li>
                                                    {val.others_city.map((v, i) => <li key={i}>{v}</li>)}
                                                </ul>
                                            </div>
                                            <div className="col ml-auto d-sm-none">
                                                <h4 className="text-red">Evenements</h4>
                                                <p className="events scrollbar-isl">
                                                    {val.events_type.map((v) => v + " ,")}
                                                </p>

                                                <div className="row ml-2 mr-3">
                                                    <div className="col">
                                                        <small className="text-red">Ville</small>
                                                        <ul className="small-kanto-list">
                                                            <ul className="bg-transparent scrollbar-isl kanto-list m-1">
                                                                <li>{val.city_of_reference}</li>
                                                                {val.others_city.map((v, i) => <li key={i}>{v}</li>)}
                                                            </ul>
                                                        </ul>
                                                    </div>
                                                    <div className="col">
                                                        <div className="text-center" style={{marginTop: 10, marginLeft: 10}}>
                                                            <img src='https://zupimages.net/up/19/18/3ltf.png' alt=''/>
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <small className="text-red">Genre</small>
                                                        <ul className="small-kanto-list scrollbar-isl">
                                                            {val.thematics_options_selected.map((v, i) => <li key={i}>{v}</li>)}
                                                        </ul>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="stats">
                                            <div data-tip="Le nombre d'artiste dans le groupe">
                                                {/*<small className="title">Artist</small>*/}
                                                <i className="icon icon-adjust" />
                                                <div className="value">{val.number_of_artist}</div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                {/*<small className="title">Preparation</small>*/}
                                                <i className="icon icon-clock-1" />
                                                <div className="value">{val.service_time.time}{checkUnit(val.service_time.unit)}</div>
                                            </div>
                                            <div data-tip="La durée de la preparation">
                                                {/*<small className="title">Durée</small>*/}
                                                <i className="icon icon-clock-o" />
                                                <div className="value">{val.preparation_time.time}{checkUnit(val.service_time.unit)}</div>
                                            </div>
                                            <div data-tip="Le prix de la prestation">
                                                {/*<small className="title">Prix</small>*/}
                                                <i className="icon icon-money" />
                                                <div className="value">{val.price}$</div>
                                            </div>
                                        </div>
                                    </div>}
                                </div>
                                <div className={!props.profile ? "general d-none d-sm-block": "generalProfile"}>
                                    {props.profile &&
                                        <div>
                                            {val.hidden ?
                                            <i className="float-right text-red icon-hide s-36 mt-1" onClick={() => onChangeHidden(index)}
                                               data-tip="Cette prestation est caché, c'est a dire n'est pas visible a la recherche des autieurs pro"/> :
                                            <i className="float-right text-red icon-eye s-36 mt-1" onClick={() => onChangeHidden(index)}
                                               data-tip="Cette prestation est afficher, c'est a dire visible a la recherche des autieurs pro"/>}
                                        </div>}
                                    {!props.profile && <img alt="" src={val.photo[0]} width="100%" height="100%"/>}
                                    {!props.profile && <h1 className="pt-2 ml-2 bolder text-red">Artist Name</h1>}
                                    {!props.profile && <p className="text-dark ml-2 font-weight-bold">{val.description}</p>}
                                    <h1 className={!props.profile ? "more text-black bolder" : "more text-black bolder pb-5"}>{val.price}$</h1>
                                    {!props.profile ?
                                        <small className="more-genre scrollbar-isl pl-2 text-black">{val.thematics_options_selected.map((v) => v)}</small> :
                                        <div className="more-icon text-red mt-4" data-tip data-for="copy_edit">
                                            <i className="icon-copy s-24"/>&nbsp;&&nbsp;<i className="icon-edit s-24"/>
                                        </div>}
                                    {props.profile && <i className="icon-smartphone-11 text-red more-icon-phone s-36"/>}
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
