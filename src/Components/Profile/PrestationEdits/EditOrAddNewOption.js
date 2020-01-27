import React, { useEffect, useRef, useState } from "react";
import { changeFields } from "../../FunctionTools/Tools";

function EditOrAddNewOptions(props) {

    const isMounted = useRef(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(null);
    const [tag, setTag] = useState("");
    const [description, setDescription] = useState("");

    let data = {
        name: name,
        tag: tag,
        price: price,
        description: description
    };

    useEffect(() => {
        try {
            setName(props.data.name);
            setTag(props.data.tag);
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
                                   value={tag || ''} onChange={(e) => changeFields(setTag, e)} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group form-float">
                        <label className="text-red">Description</label>
                        <div className="form-line">
                                    <textarea name="message" rows="10" id="input-message" value={description}
                                              onChange={(e) => changeFields(setDescription, e)}
                                              placeholder="Description concernant cette option"/>
                        </div>
                    </div>
                </div>

            </div>
            <button className="btn btn-outline-danger mt-3 mb-3 pl-5 pr-5" onClick={props.edit ? () => props.func(data) : () => props.func(data)}>{props.edit ? "Appliquer": "Crée"}</button>
        </div>
    );
}

export default EditOrAddNewOptions;
