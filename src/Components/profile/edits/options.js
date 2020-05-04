import axios from "axios";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-awesome-modal";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addAllUserOptions} from "../../functionTools/functionProps";
import {checkIfHidden} from "../../functionTools/tools";
import {checkErrorMessage} from "../../validators/validatiors";
import EditOrAddNewOptions from "./editOrAddNewOption";

function Options(props) {

    const dispatch = useDispatch();
    const props_options = useSelector(state => state.profilePrestations.options);
    const service_id = useSelector(state => state.KantoBizForm.service_id);

    const isMounted = useRef(false);
    const [edit, setEdit] = useState(false);
    const [addNewOption, setAddNewOption] = useState(false);
    const [index, setIndex] = useState(null);
    const [data, setData] = useState(null);
    const [options, setOptions] = useState(props_options);
    const [headers, setHeaders] = useState({});

    const changeOptionsStatus = (index, opt) => {
        let tmp = [...options];
        if (opt) tmp[index]['services_id_list'] = props_options[index]['services_id_list'].filter(id => !service_id === id);
        else {
            let option_tmp = props_options[index]['services_id_list'];
            option_tmp.push(service_id);
            tmp[index]['services_id_list'] = option_tmp;
        }
        setOptions(tmp);
        dispatch(addAllUserOptions(tmp));
    };

    const deleteOptions = (indexOfOption) => {
        axios.delete('api/options/delete/' + options[indexOfOption]['id'], {headers: headers}).then((resp) => {
            let tmp = options.filter((option, index) => index !== indexOfOption);
            setOptions(tmp);
            dispatch(addAllUserOptions(tmp));
            toast.success("supprimer avec succès");
        }).catch((error) => toast.error(checkErrorMessage(error).message))
    };

    const editOption = (data) => {
        if (validation(data)) {
            let tmp_options = [...options];
            let option_id = tmp_options[index]['id'];
            data["services_id_list"] = tmp_options[index]['services_id_list'];
            axios.put('api/options/update/' + option_id, data, {headers: headers}).then((resp) => {
                tmp_options[index] = resp.data;
                setOptions(tmp_options);
                dispatch(addAllUserOptions(tmp_options));
                setEdit(false);
                setAddNewOption(false);
                toast.success("modification enregister");
            }).catch((error) => toast.error(checkErrorMessage(error).message))
        }
    };

    const createOption = (data) => {
        if (validation(data)) {
            data['special_dates'] = {};
            data['services_id_list'] = [service_id];
            axios.post('api/options/create', data, {headers: headers}).then((resp) => {
                let tmp = [...props_options];
                tmp.push(resp.data);
                setOptions(tmp);
                dispatch(addAllUserOptions(tmp));
                setEdit(false);
                setAddNewOption(false);
                toast.success("crée avec succès");
            }).catch((error) => toast.error(checkErrorMessage(error).message))
        }
    };

    const validation = (data) => {
        if (!data.name) {
            toast.error("Veuillez precisez le nom");
            return false;
        } else if (!data.price) {
            toast.error("Veuillez precisez le prix");
            return false;
        } else if (!data.artist_tagged) {
            toast.error("Veuillez precisez le tag");
            return false;
        }
        return true;
    };

    useEffect(() => {
        let _headers = props.headers;
        _headers['Content-Type'] = 'application/json';
        setHeaders(_headers);

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="card no-b pt-4">
            <ReactTooltip/>
            {/* if artist want to edit or add option*/}
            {edit &&
            <Modal visible={true} width="500" height="auto" effect="fadeInUp">
                <div className="bg-grey" style={{height: "100%"}}>
                    <button className="ModalClose float-left"
                            onClick={() => edit ? setEdit(false) : setAddNewOption(false)}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    <EditOrAddNewOptions edit={addNewOption ? false : edit}
                                         func={addNewOption ? createOption : editOption} data={data}/>
                </div>
            </Modal>}
            {/* END */}
            <table className="responsive-table border-0">
                <thead>
                <tr>
                    <th scope="col">Cacher/Afficher&nbsp;<i className="icon icon-info"
                                                            data-tip="Choisir, soit de cahcer ou afficher cette opion pour cette prestation"/>
                    </th>
                    <th scope="col">Nom&nbsp;<i className="icon icon-info"
                                                data-tip="Nom donner par l'artiste cette option"/></th>
                    <th scope="col">Tag&nbsp;<i className="icon icon-info"
                                                data-tip="Le nom des autres artiste proposé avec"/></th>
                    <th scope="col">Prix&nbsp;<i className="icon icon-info"
                                                 data-tip="Le prix de cette option en plus de la prestation"/></th>
                    <th scope="col">Description&nbsp;<i className="icon icon-info"
                                                        data-tip="quelque description qui explique l'option"/></th>
                    <th scope="col-lg-4">Ajouter&nbsp;<i className="icon icon-plus text-red ml-1 mr-1 bolder"
                                                         data-tip="Crée un nouvelle option" onClick={async () => {
                        await setData(null);
                        await setEdit(true);
                        await setAddNewOption(true);
                    }}/>&nbsp;
                        <i className="icon icon-info" data-tip="Ajouter cette l'option en plus de la prestation"/></th>
                </tr>
                </thead>
                <tbody>
                {options.map((val, index) =>
                    <tr key={index}>
                        <th className="text-center small bolder border-left-0 border-bottom-0" scope="row">
                            {checkIfHidden(val.services_id_list, service_id) ?
                                <i className="icon icon-eye s-24 text-red"
                                   data-tip="Cette Otpion est activer pour cette prestation"
                                   onClick={() => changeOptionsStatus(index, true)}/> :
                                <i className="icon icon-eye-slash s-24 text-red"
                                   data-tip="Cette Otpion n'est pas activer pour cette prestation"
                                   onClick={() => changeOptionsStatus(index, false)}/>}
                        </th>
                        <th className="text-center small bolder border-left-0 border-bottom-0"
                            scope="row">{val.name}</th>
                        <td className="small" data-title="Tag">{val.artist_tagged}</td>
                        <td className="small" data-title="Prix">{val.price}$</td>
                        <td className="small" data-title="Description">{val.description || "Pas de description"}</td>
                        <td className="small border-bottom-0 border-right-0" data-title="Ajouter">
                            <i className="icon icon-edit text-red s-24 ml-1 mr-1" onClick={async () => {
                                await setData(val);
                                await setIndex(index);
                                await setEdit(true);
                            }} data-tip={"Modifier la prestation " + val.name}/>
                            <i className="icon icon-trash text-red s-24 ml-1 mr-1" onClick={() => deleteOptions(index)}
                               data-tip="Supprimer pour tout"/>
                        </td>
                    </tr>)}
                </tbody>
            </table>
            {options.length === 0 && <h4 className="text-center text-red pt-3">Vous n'avez pas d'option</h4>}
        </div>
    );
}

export default Options;
