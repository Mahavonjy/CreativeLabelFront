import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import {
    addDescriptionOfService,
    addOthersCityOfService,
    addPicturesOfService,
    addReferenceOfCity,
    addServiceCountry,
    addTitleOfService,
} from "../../../FunctionTools/FunctionProps";
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import {changeFields} from "../../../FunctionTools/Tools";

function PrestationInformation(props) {

    const dispatch = useDispatch();
    const PropsFiles = useSelector(state => state.KantoBizForm.files);
    const PropsTitle = useSelector(state => state.KantoBizForm.title);
    const PropsCountry = useSelector(state => state.KantoBizForm.country);
    const country_allowed = useSelector(state => state.Others.country_allowed);
    const PropsCityReference = useSelector(state => state.KantoBizForm.city_reference);
    const PropsOthersCity = useSelector(state => state.KantoBizForm.others_city);
    const Description = useSelector(state => state.KantoBizForm.description);

    const isMounted = useRef(false);
    const [title, setTitle] = useState(PropsTitle);
    const [country, setCountry] = useState(PropsCountry);
    const [countryOption, setCountryOption] = useState([]);
    const [city, setCity] = useState(PropsCityReference);
    const [listOfCity, setListOfCity] = useState([]);
    const [tmpListOfCity, setTmpListOfCity] = useState([]);
    const [description, setDescription] = useState(Description);
    const [files, setFiles] = useState(PropsFiles);

    const onDragOver = (e) => e.preventDefault();

    const clickAddPhoto = () => document.getElementsByClassName("input-file")[0].click();

    const changeCountry = async (e) => {
        let value = e.target.value;
        await setCountry(value);
        await setCity("");
        let tmpList = [];
        try {
            tmpList = country_allowed[country_allowed.findIndex(tmp => tmp.name === value)]["value"]
        } catch (e) { /**/ }
        new Promise(resolve => {
            resolve(setListOfCity(tmpList));
            resolve(setTmpListOfCity(tmpList));
            resolve(dispatch(addReferenceOfCity("")));
            resolve(dispatch(addServiceCountry(value)));
            resolve(dispatch(addOthersCityOfService([])));
        })
    };

    const changeCity = async (e) => {
        let value = e.target.value;
        await setCity(value);
        await dispatch(addReferenceOfCity(value));
        let tmp = [];
        await Promise.all(tmpListOfCity.map(element => {
            if (element !== value) tmp.push(element)
        })).then(() => setListOfCity(tmp));
    };

    const onDrop = async (e) => {
        e.preventDefault();

        let files_;
        let tmp_file_state = [...files];
        let uploadedFiles = e.target.files || e.dataTransfer.files;
        if (uploadedFiles) {
            await Array.prototype.map.call(uploadedFiles, async (file) => {
                let {name, size, type} = file;
                let url = URL.createObjectURL(file);
                files_ = {name, size, type, url, file};
                if (files_.type.split("/")[0] === "image")
                    tmp_file_state.push(files_);
                else toast.warn("Fichier non supporté trouver")
            });
            setFiles(tmp_file_state);
            dispatch(addPicturesOfService(tmp_file_state));
        }
    };

    const removeFile = (index) => {
        console.log("here", index)
        let array = [...files];
        array.splice(index, 1);
        setFiles(array)
    };

    PrestationInformation.validation = () => {
        if (!PropsTitle)
            return {"error": true, "message": "veuillez choisir un titre "};
        if (!PropsCityReference)
            return {"error": true, "message": "veuillez choisir une ville de reference "};
        if (PropsFiles.length <= 0)
            return {"error": true, "message": "veuillez choisir au moins une photo "};
        return {"error": false};
    };

    useEffect(() => {

        let tmp = [];
        for (let row in country_allowed) {
            let cityTmp = [];
            for (let index in country_allowed[row]["value"]) {
                let tmpName = country_allowed[row]["value"][index];
                cityTmp.push({value: tmpName, label: tmpName, index: index})
            }
            tmp.push({value: country_allowed[row]["name"], label: country_allowed[row]["name"], city: cityTmp});
        }
        setCountryOption(tmp);

        return () => {
            isMounted.current = true
        };
    }, [city, listOfCity]);

    return (
        <div className="Base">
            <ReactTooltip/>
            <div className="card-header text-center transparent b-b">
                <strong className="text-red">Les informations générales sur votre prestation</strong>
            </div>
            <div className="row rounded border pt-5 bg-grey justify-content-center overflow-auto scrollbar-isl" style={{height: 300}}>
                <div className="col-md-7">
                    <div className="row">
                        <div className="col-md-6 form-material">
                            {/* Input */}
                            <div className="body">

                                <div className="form-group d-flex flex-wrap required">
                                    <label className="col-sm-4 control-label bolder">Titre</label>
                                    <div className="col-sm-8 center">
                                        <input type="text" id="title" className="form-control text-center" value={title || ''}
                                               placeholder="Le titre de votre prestation"
                                               onChange={(e) => changeFields(setTitle, e, addTitleOfService, dispatch)}/>
                                    </div>
                                </div>
                                <div className="form-group d-flex flex-wrap">
                                    <label className="col-sm-4 control-label bolder">Description</label>
                                    <div className="col-sm-8 center">
                                        <textarea defaultValue={description} id="desc" name="desc" style={{height: 152}}
                                                  className="form-control" placeholder="Decrire votre prestation en quelque mots"
                                                  onChange={(e) => changeFields(setDescription, e, addDescriptionOfService, dispatch)}/>
                                    </div>
                                </div>
                            </div>
                            {/* #END# Input */}
                        </div>
                        <div className="col-md-6 form-material">
                            <div className="body">
                                <div className="form-group d-flex flex-wrap required">
                                    <label className="col-sm-4 control-label bolder">Pays</label>
                                    <div className="col-sm-8 center">
                                        <input id="country" name="country" className="form-control" autoComplete="off"
                                               placeholder="......"
                                               value={country} onChange={(e) => changeCountry(e)} list="country-type"/>
                                        <datalist id="country-type">
                                            {country_allowed.map((val, index) =>
                                                <option key={index} value={val.name}>{val.name}</option>)}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="form-group d-flex flex-wrap required">
                                    <label className="col-sm-4 control-label bolder">Ville</label>
                                    <div className="col-sm-8 center">
                                        <input id="city" name="city" className="form-control" autoComplete="off"
                                               placeholder={city || "....."} value={city}
                                               onChange={(e) => changeCity(e)} list="city-type"/>
                                        <datalist id="city-type">
                                            {listOfCity.length !== 0 ? listOfCity.map((val, index) =>
                                                    <option key={index} value={val}>{val}</option>) :
                                                <option value={null} selected>Veuillez choisir un pays</option>}
                                        </datalist>
                                    </div>
                                </div>
                                {city &&
                                <div className="form-group d-flex flex-wrap">
                                    <label className="col-sm-4 control-label bolder">Autres villes</label>
                                    <div className="col-sm-8 center">
                                        <MultiSelectTools tags={PropsOthersCity} list={listOfCity}
                                                          funcToFillInProps={addOthersCityOfService} sort/>
                                    </div>
                                </div>}

                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 text-center">
                    <span className="font-weight-lighter pb-2">Faire un glisser/déposer des images</span>
                    <div className="m-2 text-center">
                        <button className="btn btn-outline-danger pl-5 pr-5 mb-2" onClick={() => clickAddPhoto()}>Telecharger Image</button>
                        <div className="dragBox m-auto rounded d-none d-sm-block" onClick={() => clickAddPhoto()}
                             style={{border: "dashed 1px white", width: "300px", height: "100px"}} onDragOver={onDragOver} onDrop={onDrop}>
                            Déposer l'image ici
                            <div className="row justify-content-center">
                                <i className="icon-cloud-upload s-36 text-red"/>
                            </div>
                            <input type="file" className="input-file" accept="image/png, image/jpeg" onChange={onDrop} multiple/>
                        </div>
                    </div>
                    {files.length > 0 ?
                        <ul className="text-center mt-5">
                            <div>
                                <small>Voici la liste de vos images</small>
                            </div>
                            {files.map((file, index) =>
                                <li className="bg-light m-1 text-black" key={index}
                                    style={{borderRadius: 5}}>
                                        <span className="ml-1 font-italic" key={index}>{file.name} &nbsp;
                                            <i className="text-red icon icon-window-close-o" key={index}
                                               onClick={() => removeFile(index)}/>
                                        </span>
                                </li>
                            )}
                        </ul> : <div className="mt-5"><small>Vous n'avez importé aucune image</small></div>}
                </div>
            </div>
        </div>
    );
}

export default PrestationInformation;
