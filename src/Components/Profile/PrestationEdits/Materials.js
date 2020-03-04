import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    addFileTechnicalSheet,
    addMaterialsOfService,
    addMaterialsCopy,
    addServicesCopy
} from "../../FunctionTools/FunctionProps";

function Materials(props) {

    const dispatch = useDispatch();
    const dateKey = useSelector(state => state.Others.dateKey);
    const prestationCopy = useSelector(state => state.Others.prestationCopy);
    const materialsCopy = useSelector(state => state.Others.materialsCopy);
    const materials = useSelector(state => state.KantoBizForm.materials);

    const isMounted = useRef(false);
    const [tags, setTags] = useState(props.index || props.index === 0 && props.edit ? [...materialsCopy['list_of_materials']] : [...materials['list_of_materials']]);
    const [technicalSheet, setTechnicalSheet] = useState();
    const [tagsSuggestion, setTagSuggestion] = useState(["Micro", "Piano"]);

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
        let origin_of_materials;
        if (props.index || props.index === 0 && props.edit) origin_of_materials = {...materialsCopy};
        else origin_of_materials = {...materials};
        origin_of_materials['list_of_materials'] = newTags;
        if (props.index || props.index === 0 && props.edit) updateServiceCopy(origin_of_materials);
        else dispatch(addMaterialsOfService(origin_of_materials));
    };

    const addTechnicalSheet = (e) => {
        let file = e.target.files[0];
        setTechnicalSheet(file);
        dispatch(addFileTechnicalSheet(file))
    };

    const updateServiceCopy = (origin_of_materials) => {
        let prestationCopy_ = [...prestationCopy];
        prestationCopy_[props.index]["special_dates"][dateKey]["materials"]["list_of_materials"] = origin_of_materials.list_of_materials;
        dispatch(addServicesCopy(prestationCopy_));
    }
;
    const inputKeyDown = (e, attr_val) => {

        let key, val;
        try {
            key = e.key;
            val = e.target.value;
        } catch (e) {
            key = '';
            val = attr_val;
        } finally {
            if (key === 'Enter' && val || attr_val) {
                if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) return;
                let tmp_tags = [...tags];
                let origin_of_materials;
                if (props.index || props.index === 0 && props.edit) origin_of_materials = {...materialsCopy};
                else origin_of_materials = {...materials};
                tmp_tags.push(val);
                setTags(tmp_tags);
                origin_of_materials['list_of_materials'] = tmp_tags;
                if (props.index || props.index === 0 && props.edit) updateServiceCopy(origin_of_materials);
                else dispatch(addMaterialsOfService(origin_of_materials));
                document.getElementsByClassName("input-add-tag")[0].value = null;
            } else if (key === 'Backspace' && !val) {
                removeTag(tags.length - 1);
            }
        }
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [tags, prestationCopy]);

    return (
        <div className={!props.noExemple && "card no-b"}>
            {!props.noExemple &&
            <div className="custom-file mt-3 mb-3" data-tip="Fiche technique en pdf">
                <input type="file" accept="application/pdf" className="custom-file-input"
                       onChange={(e) => addTechnicalSheet(e)}/>
                <label className="custom-file-label text-black" htmlFor="inputGroupFile01">Importer ici la fiche
                    technique de cette prestation</label>
            </div>}
            <div className="tag-editor">
                <span className="tag-editor-inner">
                    <div className="tag-editor-title text-center">
                        <h1 className="text-light">Matériels nécessaires&nbsp;<i className="icon icon-info s-18"/></h1>
                    </div>
                    <div className="tag-editor-tags">
                        <div className="input-tag">
                            <div className="input-tag__tags__input pb-3">
                                <input className="input-add-tag" placeholder="Ajouter un materiel" type="text"
                                       onKeyDown={inputKeyDown}/>
                            </div>
                            <ul className="input-tag__tags text-center">
                                {tags.map((tag, i) => (
                                    <li key={tag}>{tag}
                                        <button type="button" className="ml-2" onClick={() => removeTag(i)}><i
                                            className="icon-close1 text-red ml-1 mr-1"/></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </span>
            </div>
            {!props.noExemple &&
            <div className="tag-editor">
                <span className="tag-editor-inner">
                    <div className="tag-editor-title text-center">
                        <h1 className="text-light">Quelques exemples de materiels&nbsp;<i
                            className="icon icon-info s-18"/></h1>
                    </div>
                    <div className="tag-editor-tags">
                        <div className="input-tag">
                            <ul className="input-tag__tags text-center">
                                {tagsSuggestion.map((val, index) =>
                                    <li key={index}>
                                        <button type="button" className="pl-1 pr-1"
                                                onClick={() => inputKeyDown(null, val)}>{val}</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </span>
            </div>}
        </div>
    );
}

export default Materials;
