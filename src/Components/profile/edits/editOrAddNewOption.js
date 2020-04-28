import React, { useEffect, useRef, useState } from "react";
import {addDescriptionOfService} from "../../functionTools/functionProps";
import { changeFields } from "../../functionTools/tools";

function EditOrAddNewOptions(props) {

    const isMounted = useRef(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [artist_tagged, setTag] = useState("");
    const [description, setDescription] = useState("");

    let data = {name, artist_tagged, price, description};

    useEffect(() => {
        try {
            setName(props.data.name);
            setTag(props.data.artist_tagged);
            setPrice(props.data.price);
            setDescription(props.data.description);
        } catch (e) {
            //
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="text-center">
            <h4 className="text-red pt-3">{props.edit ? "Modification": "Nouvelle Option"}</h4>
            <div className="row justify-content-center mt-3">
                <div className="col-md-4">
                    <div className="form-group form-float">
                        <label className="text-red">prix</label>
                        <div className="form-line">
                            <input type="number" id="price" className="form-control" placeholder="Prix" name="price"
                                   value={price || ''} onChange={(e) => changeFields(setPrice, e)} />
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <label className="text-red">nom de l'option</label>
                        <div className="form-line">
                            <input type="text" id="name" className="form-control" placeholder="Nom" name="name"
                                   value={name || ''} onChange={(e) => changeFields(setName, e)} />
                        </div>
                    </div>
                    <div className="form-group form-float">
                        <label className="text-red">Tag</label>
                        <div className="form-line">
                            <input type="text" id="name" className="form-control" placeholder="Tag" name="name"
                                   value={artist_tagged || ''} onChange={(e) => changeFields(setTag, e)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group form-float">
                        <label className="text-red">Description</label>
                        <div className="form-group form-float">
                            <div className="form-line">
                                        <textarea defaultValue={description} id="desc" name="desc"
                                                  className="form-control" style={{height: 164}} value={description}
                                                  placeholder="Décrire l'option en quelques mots"
                                                  onChange={(e) => changeFields(setDescription, e)}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <button className="btn btn-outline-danger mt-3 mb-3 pl-5 pr-5" onClick={() => props.func(data)}>{props.edit ? "Appliquer les changements": "Crée"}</button>
        </div>
    );
}

export default EditOrAddNewOptions;
