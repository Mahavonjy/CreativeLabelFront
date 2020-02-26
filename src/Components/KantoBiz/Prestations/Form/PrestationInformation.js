import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
import {CreateInput} from "../../../FunctionTools/CreateFields";
import {
    addDescriptionOfService,
    addOthersCityOfService,
    addPicturesOfService,
    addReferenceOfCity,
    addServiceCountry,
    addTitleOfService,
    arrayRemove
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
    const [city, setCity] = useState(PropsCityReference);
    const [listOfCity, setListOfCity] = useState([]);
    const [tmpListOfCity, setTmpListOfCity] = useState([]);
    const [description, setDescription] = useState(Description);
    const [files, setFiles] = useState(PropsFiles);

    const onDragOver = (e) => {
        e.preventDefault();
    };

    const changeCountry = (e) => {
        let value = e.target.value;
        setCountry(value);
        setCity("");
        dispatch(addReferenceOfCity(""));
        dispatch(addServiceCountry(value));
        let tmpList;
        try {
            tmpList = country_allowed[country_allowed.findIndex(tmp => tmp.name === value)]["value"]
        } catch (e) {
            tmpList = []
        }
        setListOfCity(tmpList);
        setTmpListOfCity(tmpList);
    };

    const changeCity = (e) => {
        let value = e.target.value;
        setCity(value);
        dispatch(addReferenceOfCity(value));
        setListOfCity(arrayRemove(tmpListOfCity, value));
    };

    const onDrop = (e, file) => {
        e.preventDefault();

        let files_;
        let tmp_file_state = [...files];

        if (file) {
            let file = e.target.files[0];
            let {name, size, type} = file;
            let url = URL.createObjectURL(file);
            files_ = {name, size, type, url, file}
        } else {
            files_ = Array.prototype.map.call(e.dataTransfer.files, (file) => {
                let {name, size, type} = file;
                let url = URL.createObjectURL(file);
                return {name, size, type, url, file};
            }).filter(file => file.type)[0];
        }

        if (files_.type.split("/")[0] !== "image")
            toast.error("veuillez mettre une image");
        else {
            tmp_file_state.push(files_);
            setFiles(tmp_file_state);
            dispatch(addPicturesOfService(tmp_file_state));
        }
    };

    const removeFile = (index) => {
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
        return () => {
            isMounted.current = true
        };
    }, [listOfCity]);

    return (
        <div className="Base">
            <ReactTooltip/>
            <div className="card-header transparent b-b">
                <strong className="text-red">Les informations générales sur votre prestation</strong>
            </div>
            <div className="row" style={{height: 450}}>
                <div className="col-md-7 card p-5">
                    <div className="form-material">
                        {/* Input */}
                        <div className="body">
                            <div className="form-group form-float">
                                <div className="form-line"
                                     data-tip={!title && "Veuillez donner un titre à votre prestation..."}>
                                    {CreateInput('title', title, (e) => changeFields(setTitle, e, addTitleOfService, dispatch), "Titre de votre Prestation", "text", true)}
                                </div>
                            </div>
                            <div className="form-group form-float"
                                 data-tip={!description ? "Décrire la prestation en quelques mots" : null}>
                                <div className="form-line">
                                        <textarea defaultValue={description} id="desc" name="desc"
                                                  className="form-control" style={{height: 100}}
                                                  placeholder="Description de la prestation"
                                                  onChange={(e) => changeFields(setDescription, e, addDescriptionOfService, dispatch)}/>
                                </div>
                            </div>
                            <div className="form-group form-float"
                                 data-tip="Le pays dans laquelle vous proposez la prestation">
                                <div className="form-line">
                                    <input id="country" name="country" className="form-control"
                                           placeholder="Veuillez choisir un pays de référence pour votre prestation"
                                           value={country} onChange={(e) => changeCountry(e)} list="country-type"/>
                                    <datalist id="country-type">
                                        {country_allowed.map((val, index) => <option key={index}
                                                                                     value={val.name}>{val.name}</option>)}
                                    </datalist>
                                </div>
                            </div>
                            <div className="form-group form-float"
                                 data-tip={!city && "La ville de référence est la ville dans laquelle vous proposez la prestation"}>
                                <div className="form-line">
                                    <input id="city" name="city" className="form-control"
                                           placeholder={city || "Veuillez choisir une ville de référence pour votre prestation"}
                                           value={city} onChange={(e) => changeCity(e)} list="city-type"/>
                                    <datalist id="city-type">
                                        {listOfCity.length !== 0 ? listOfCity.map((val, index) => <option key={index}
                                                                                                          value={val}>{val}</option>) :
                                            <option value={null} selected>Veuillez choisir un pays</option>}
                                    </datalist>
                                </div>
                            </div>
                            {city &&
                            <div className="form-group form-float"
                                 data-tip={"Veuillez ajouter une ou plusieurs villes annexes dans lesquelles vous pouvez réaliser votre prestation "}>
                                <div className="form-line">
                                    <MultiSelectTools tags={PropsOthersCity} list={listOfCity}
                                                      funcToFillInProps={addOthersCityOfService}
                                                      placeholder="Ajouter d'autres villes" sort/>
                                </div>
                            </div>}
                        </div>
                        {/* #END# Input */}
                    </div>
                </div>
                <div className="col-md-5 text-center p-5">
                    <span className="font-weight-lighter">Faire un glisser/déposer des images</span>
                    <div className="form-group pt-5">
                        <div className="custom-file"
                             data-tip="C'est ici que vous cherchez vos images dans votre appareil">
                            <input onChange={(e) => onDrop(e, true)} type="file" accept="image/*"
                                   className="custom-file-input"/>
                            <label className="custom-file-label" htmlFor="inputGroupFile01">Télécharger des
                                fichiers</label>
                        </div>
                    </div>
                    <div className="file has-name is-boxed d-none d-sm-block"
                         data-tip="C'est ici que vous déplacerai vos images">
                            <span className="file-label" onDragOver={onDragOver} onDrop={onDrop}>
                                <div className="buttonStyle">
                                      <span className="line-1"/>
                                      <span className="line-2"/>
                                      <span className="line-3"/>
                                      <span className="line-4"/>
                                      <span className="line-5"/>
                                      <span className="line-6"/><br/>
                                      <i className="icon icon-plus align-middle text-light"/><br/>
                                      <i className="icon icon-file-image-o align-middle s-64 text-light"/>
                                </div>
                            </span>
                    </div>
                    {files.length > 0 ?
                        <ul className="pt-5">
                            {files.map((file, index) =>
                                <li className="bg-light m-1 text-black float-left" key={index}
                                    style={{borderRadius: 5}}>
                                        <span className="ml-1 font-italic" key={index}>{file.name} &nbsp;
                                            <i className="text-red icon icon-window-close-o" key={index}
                                               onClick={() => removeFile(index)}/>
                                        </span>
                                </li>
                            )}
                        </ul> : <small>Vous n'avez importé aucune image</small>}
                </div>
            </div>
        </div>
    );
}

export default PrestationInformation;
