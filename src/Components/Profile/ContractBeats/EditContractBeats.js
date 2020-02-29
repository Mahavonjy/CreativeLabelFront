import React, { useEffect, useRef, useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import * as Tools from "../../FunctionTools/Tools";
import { changeFields } from "../../FunctionTools/Tools";
import { profileInitialisationContract, beatsInitialisationPricing } from "../../FunctionTools/FunctionProps"

function EditContractBeats(props) {

    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const contract = useSelector(state => state.profile.contract);

    // basic contract
    const [basic_enable, setBasicEnable] = useState(Boolean(contract['basic_lease']['enabled']));
    const [basic, setBasic] = useState(contract['basic_lease']['price']);
    const [basic_number_audio_stream, setBasicNumberAudioStream] = useState(contract['basic_lease']['number_audio_stream']);
    const [basic_number_radio_station, setBasicNumberRadioStation] = useState(contract['basic_lease']['number_radio_station']);
    const [basic_number_of_distribution_copies, setBasicNumberOfDistributionCopies] = useState(contract['basic_lease']['number_of_distribution_copies']);
    // silver contract
    const [silver_enable, setSilverEnable] = useState(Boolean(contract['silver_lease']['enabled']));
    const [silver, setSilver] = useState(contract['silver_lease']['price']);
    const [silver_number_audio_stream, setSilverNumberAudioStream] = useState(contract['silver_lease']['number_audio_stream']);
    const [silver_number_radio_station, setSilverNumberRadioStation] = useState(contract['silver_lease']['number_radio_station']);
    const [silver_number_of_distribution_copies, setSilverNumberOfDistributionCopies] = useState(contract['silver_lease']['number_of_distribution_copies']);
    // silver contract
    const [gold_enable, setGoldEnable] = useState(Boolean(contract['gold_lease']['enabled']));
    const [gold, setGold] = useState(contract['gold_lease']['price']);
    const [gold_number_audio_stream, setGoldNumberAudioStream] = useState(contract['gold_lease']['number_audio_stream']);
    const [gold_number_radio_station, setGoldNumberRadioStation] = useState(contract['gold_lease']['number_radio_station']);
    const [gold_number_of_distribution_copies, setGoldNumberOfDistributionCopies] = useState(contract['gold_lease']['number_of_distribution_copies']);
    // platinum contract
    const [platinum_enable, setPlatinumEnable] = useState(Boolean(contract['platinum_lease']['enabled']));
    const [platinum, setPlatinum] = useState(contract['platinum_lease']['price']);
    // const [platinum_unlimited, setPlatinumUnlimited] = useState(contract['platinum_lease']['unlimited']);
    const [platinum_number_audio_stream, setPlatinumNumberAudioStream] = useState(contract['platinum_lease']['number_audio_stream']);
    const [platinum_number_radio_station, setPlatinumNumberRadioStation] = useState(contract['platinum_lease']['number_radio_station']);
    const [platinum_number_of_distribution_copies, setPlatinumNumberOfDistributionCopies] = useState(contract['platinum_lease']['number_of_distribution_copies']);

    const generateContractTab = (state_name, state_array, active, tab_id, setPrice, setNumberRadioStation, setNumberOfDist, setNumberAudionStream, setEnable) => {
        return (
            <div className={"tab-pane fade text-center p-5 " + active} id={tab_id} role="tabpanel" aria-labelledby={tab_id}>
                <div className="row">
                    <div className="col-md-8">
                        <div className="input-group-prepend d-inline-block center" style={{width: "100%", padding: "2px"}}>
                            <div className="input-group-text text-dark" data-tip={"Le prix de votre instrumental pour un contrat en " + state_name}>
                                <i className="icon-text-width"/>&nbsp;prix du beat *
                            </div>
                            <input value={state_array[0]} onChange={(e) => changeFields(setPrice, e)} id={state_name} name={state_name}
                                   className="form-control" type="number"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de diffusion Radio & TV de votre instrumental pour un contrat en " + state_name}><i className="icon-text-width"/>&nbsp;nb de diffusion Radio & TV *</small>
                            <input value={state_array[1]} id={state_name + "_number_radio_station"}
                                   onChange={(e) => changeFields(setNumberRadioStation, e)} name={state_name + "_number_radio_station"} className="form-control" type="number"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de copie distribuée de votre instrumental pour un contrat en " + state_name}><i className="icon-text-width"/>&nbsp;nb de copie distribuée *</small>
                            <input value={state_array[2]} onChange={(e) => changeFields(setNumberOfDist, e)}
                                   id={state_name + "_number_of_distribution_copies"} name={state_name + "_number_of_distribution_copies"} className="form-control" type="number"/>
                        </div>
                        <div className="input-group-prepend d-inline-block " style={{width: "100%", padding: "2px"}}>
                            <small className="input-group-text text-dark" data-tip={"Le nombre de stream de votre instrumental pour un contrat en " + state_name}><i className="icon-user"/>&nbsp;nb de stream *</small>
                            <input value={state_array[3]} onChange={(e) => changeFields(setNumberAudionStream, e)}
                                   id={state_name + "_number_audio_stream"} name={state_name + "_number_audio_stream"} className="form-control" type="number"/>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-header transparent">
                                <strong>{"Paramètres " + state_name}</strong>
                            </div>
                            <div className="card-body p-0">
                                <ul className="list-group no-b">
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="icon icon-check-circle text-red" />{"Activer l'offre " + state_name}
                                        </div>
                                        <div className="material-switch">
                                            <input value={state_array[4]} name={state_name + "_enable"} type="checkbox"
                                                   onChange={(e) => Tools.changeBoolFields(setEnable, e)} checked={state_array[4]}/>
                                            <label htmlFor="sw1" className="bg-primary" />
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <i className="icon icon-eyeglasses text-blue" />Activer l'offre unlimited
                                        </div>
                                        <div className="material-switch">
                                            <input id="unlimited" name="unlimited" type="checkbox" disabled={true}/>
                                            <label htmlFor="sw2" className="bg-secondary" />
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    const generateData = (contract_name, price, nas, nrs, nodc, enable) => {
        let data;
        let url = 'update_' + contract_name;
        data = contract[contract_name + '_lease'];
        data['enabled'] = enable;
        data['price'] = price;
        data['number_audio_stream'] = nas;
        data['number_radio_station'] = nrs;
        data['number_of_distribution_copies'] = nodc;
        return {'data': data, 'url': url}
    };

    const handleSubmitContractUpdate = async() => {
        let contract_array = [
            ["basic", basic, basic_number_audio_stream, basic_number_radio_station, basic_number_of_distribution_copies, basic_enable],
            ["silver", silver, silver_number_audio_stream, silver_number_radio_station, silver_number_of_distribution_copies, silver_enable],
            ["gold", gold, gold_number_audio_stream, gold_number_radio_station, gold_number_of_distribution_copies, gold_enable],
            ["platinum", platinum, platinum_number_audio_stream, platinum_number_radio_station, platinum_number_of_distribution_copies, platinum_enable],
        ];
        let tmp_call = [];
        for (let x = 0; x < contract_array.length; x++) {
            let tmp = contract_array[x];
            let response = generateData(tmp[0], tmp[1], tmp[2], tmp[3], tmp[4], tmp[5]);
            delete response.data['id'];
            delete response.data['user_id'];
            delete response.data['created_at'];
            delete response.data['modified_at'];
            await tmp.push(
                axios.put( "api/beats/contract/" + response.url, response.data, {headers: props.headers}).then(() => {
                    let tmp = contract;
                    tmp[response.data['contract_name']] = response.data;
                    dispatch(profileInitialisationContract(tmp));
                }).catch(err => {
                    console.log(err.response)
                })
            )
        }

        Promise.all(tmp_call).then(() => {
            axios.get( "api/beats/pricing", {headers: props.headers}).then(resp => {
                dispatch(beatsInitialisationPricing(resp.data));
                toast.success("Enregistrement avec success")
            }).catch(err => {
                console.log(err)
            })
        }).catch((error) => toast.error("Veuillez re enregistrer"))
    };

    useEffect(() => {
        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="container-fluid relative animatedParent animateOnce p-lg-3">
            <div className="card no-b">
                <div className="card-header pb-0">
                    <div className="d-flex justify-content-between">
                        <div className="align-self-center">
                            <h3 className="text-red">Personnalisation de contrats</h3>
                        </div>
                        <div className="align-self-center">
                            <ul className="nav nav-pills mb-3" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active show" data-toggle="tab" href="#basic_tab" role="tab" aria-controls="tab1" aria-expanded="true" aria-selected="true">Basic</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#silver_tab" role="tab" aria-controls="tab2" aria-selected="false">Silver</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#gold_tab" role="tab" aria-controls="tab3" aria-selected="false">Gold</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" data-toggle="tab" href="#platinum_tab" role="tab" aria-controls="tab4" aria-selected="false">Platinum</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="card-body no-p">
                    <div className="tab-content">
                        {generateContractTab("basic",[basic, basic_number_radio_station, basic_number_of_distribution_copies, basic_number_audio_stream, basic_enable]
                            , "show active", "basic_tab", setBasic, setBasicNumberRadioStation, setBasicNumberOfDistributionCopies, setBasicNumberAudioStream, setBasicEnable)}
                        {generateContractTab("silver", [silver, silver_number_radio_station, silver_number_of_distribution_copies, silver_number_audio_stream, silver_enable]
                            , "", "silver_tab", setSilver, setSilverNumberRadioStation, setSilverNumberOfDistributionCopies, setSilverNumberAudioStream, setSilverEnable)}
                        {generateContractTab("gold", [gold, gold_number_radio_station, gold_number_of_distribution_copies, gold_number_audio_stream, gold_enable]
                            , "", "gold_tab", setGold, setGoldNumberRadioStation, setGoldNumberOfDistributionCopies, setGoldNumberAudioStream, setGoldEnable)}
                        {generateContractTab("platinum", [platinum, platinum_number_radio_station, platinum_number_of_distribution_copies, platinum_number_audio_stream, platinum_enable]
                            ,  "", "platinum_tab", setPlatinum, setPlatinumNumberRadioStation, setPlatinumNumberOfDistributionCopies, setPlatinumNumberAudioStream, setPlatinumEnable)}
                        <div className="text-center mb-5">
                            <button className="btn btn-outline-danger btn-sm pl-5 pr-5 font-weight-bold" id="all_contract" onClick={handleSubmitContractUpdate} >Enregister le contrat</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditContractBeats;
