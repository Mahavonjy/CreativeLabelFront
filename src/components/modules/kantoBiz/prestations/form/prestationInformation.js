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
} from "../../../../functionTools/functionProps";
import MultiSelectTools from "../../../../functionTools/multiSelectTools";
import {changeFields, funcToSpecifyValueForSpecialInput} from "../../../../functionTools/tools";

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
    /* eslint-disable-next-line no-unused-vars */
    const [countryOption, setCountryOption] = useState([]);
    const [city, setCity] = useState(PropsCityReference);
    const [listOfCity, setListOfCity] = useState([]);
    const [tmpListOfCity, setTmpListOfCity] = useState([]);
    const [description, setDescription] = useState(Description);
    const [files, setFiles] = useState(PropsFiles);

    const onDragOver = (e) => e.preventDefault();

    const clickAddPhoto = () => document.getElementsByClassName("input-file service")[0].click();

    const changeCountry = async (e) => {
        let value = e.target.value;
        let tmpList = [];
        try {
            tmpList = country_allowed[country_allowed.findIndex(tmp => tmp.name === value)]["value"];
            await setCity("");
            await setCountry(value);
            new Promise(resolve => {
                resolve(setListOfCity(tmpList));
                resolve(setTmpListOfCity(tmpList));
                resolve(dispatch(addReferenceOfCity("")));
                resolve(dispatch(addServiceCountry(value)));
                resolve(dispatch(addOthersCityOfService([])));
            })
        } catch (e) {
            setCountry("")
        }
    };

    const changeCity = async (e) => {
        let value = e.target.value;
        let tmp = [];
        if (tmpListOfCity.length)
            await Promise.all(tmpListOfCity.map(element => {
                if (element !== value) tmp.push(element);
                return true
            })).then(async () => {
                await setListOfCity(tmp);
                await setCity(value);
                await dispatch(addReferenceOfCity(value));
            });
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

        funcToSpecifyValueForSpecialInput(country_allowed, setCountryOption);

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [city, listOfCity]);

    return (
        <div className="Base">
            <ReactTooltip/>
            <div className="card-header text-center transparent b-b">
                <strong className="text-red">Informations générales sur votre prestation</strong>
            </div>
            <div className="row rounded border pt-5 bg-grey justify-content-center overflow-auto scrollbar-isl"
                 style={{height: 270}}>
                <div className="col-lg-8">
                    <div className="row">
                        <div className="col-md-6 form-material">
                            {/* Input */}
                            <div className="body">

                                <div className="form-group d-flex flex-wrap required">
                                    <label className="col-sm-4 control-label bolder">Titre</label>
                                    <div className="col-sm-8 center">
                                        <input type="text"
                                               id="title"
                                               className="form-control text-center" value={title || ''}
                                               placeholder="Le titre de votre prestation"
                                               onChange={
                                                   (e) =>
                                                       changeFields(
                                                           setTitle,
                                                           e,
                                                           addTitleOfService,
                                                           dispatch
                                                       )
                                               }/>
                                    </div>
                                </div>
                                <div className="form-group d-flex flex-wrap">
                                    <label className="col-sm-4 control-label bolder">Description</label>
                                    <div className="col-sm-8 center">
                                        <textarea defaultValue={description}
                                                  id="desc"
                                                  name="desc"
                                                  style={{height: 152}}
                                                  className="form-control"
                                                  placeholder="Decrire votre prestation en quelque mots"
                                                  onChange={
                                                      (e) =>
                                                          changeFields(
                                                              setDescription,
                                                              e,
                                                              addDescriptionOfService,
                                                              dispatch
                                                          )
                                                  }/>
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
                                        <input id="country"
                                               name="country"
                                               className="form-control"
                                               autoComplete="off"
                                               placeholder="......"
                                               value={country}
                                               list="country-type"
                                               onChange={
                                                   (e) => changeCountry(e)
                                               }
                                        />
                                        <datalist id="country-type">
                                            {country_allowed.map((val, index) =>
                                                <option key={index} value={val.name}>{val.name}</option>)}
                                        </datalist>
                                    </div>
                                </div>
                                <div className="form-group d-flex flex-wrap required">
                                    <label className="col-sm-4 control-label bolder">Ville</label>
                                    <div className="col-sm-8 center">
                                        <input id="city"
                                               name="city"
                                               className="form-control"
                                               autoComplete="off"
                                               list="city-type"
                                               placeholder={city || "....."} value={city}
                                               onChange={(e) => changeCity(e)}
                                        />
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
                <div className="col-lg-4 text-center">
                    <span className="font-weight-lighter pb-2">Faire un glisser/déposer des images</span>
                    <div className="m-2 text-center">
                        <button className="btn btn-outline-danger pl-5 pr-5 mb-2"
                                onClick={() => clickAddPhoto()}>
                            Telecharger Image
                        </button>
                        <div className="dragBox m-auto rounded d-none d-sm-block"
                             onClick={() => clickAddPhoto()}
                             style={{border: "dashed 1px white", width: "300px", height: "100px"}}
                             onDragOver={onDragOver}
                             onDrop={onDrop}>
                            Déposer l'image ici
                            <div className="row justify-content-center">
                                <i className="icon-cloud-upload s-36 text-red"/>
                            </div>
                            <input type="file"
                                   className="input-file service"
                                   accept="image/png, image/jpeg"
                                   onChange={onDrop}
                                   multiple
                            />
                        </div>
                    </div>
                    {files.length > 0 ?
                        <ul className="text-center mt-5">
                            <div>
                                <small>Voici la liste de vos images</small>
                            </div>
                            <div className="row justify-content-center">
                                {files.map((file, index) =>
                                    <div className="bg-dark rounded m-1" key={index}>
                                        <img width={50}
                                             height={50}
                                             className="rounded m-1"
                                             alt={"service_image" + index}
                                             src={file.url ? file.url : file}
                                        />
                                        <i className="icon m-1 icon-trash-o text-red s-24"
                                           key={index}
                                           onClick={() => removeFile(index)}/>
                                    </div>
                                )}
                            </div>
                        </ul> : <div className="mt-5"><small>Vous n'avez importé aucune image</small></div>}
                </div>
            </div>
        </div>
    );
}

export default PrestationInformation;
