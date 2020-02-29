import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addFileTechnicalSheet, addMaterialsOfService} from "../../FunctionTools/FunctionProps";

function Materials(props) {

    const dispatch = useDispatch();
    const materials = useSelector(state => state.KantoBizForm.materials);

    const isMounted = useRef(false);
    const [tags, setTags] = useState([...materials['list_of_materials']]);
    const [technicalSheet, setTechnicalSheet] = useState();

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
        let origin_of_materials = {...materials};
        origin_of_materials['list_of_materials'] = newTags;
        dispatch(addMaterialsOfService(origin_of_materials));
    };

    const addTechnicalSheet = (e) => {
        let file = e.target.files[0];
        setTechnicalSheet(file);
        dispatch(addFileTechnicalSheet(file))
    };

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
                let origin_of_materials = {...materials};
                tmp_tags.push(val);
                setTags(tmp_tags);
                origin_of_materials['list_of_materials'] = tmp_tags;
                dispatch(addMaterialsOfService(origin_of_materials));
                document.getElementsByClassName("input-add-tag")[0].value = null;
            } else if (key === 'Backspace' && !val) {
                removeTag(tags.length - 1);
            }
        }
    };

    useEffect(() => {

        if (props.value) {
            dispatch(addMaterialsOfService(props.value));
            setTags(props.value);
        }

        return () => {
            isMounted.current = true
        };
    }, [tags]);

    return (
        <div className={!props.noExemple && "card no-b"}>
            <div className="custom-file mt-3 mb-3" data-tip="Fiche technique en pdf">
                <input type="file" accept="application/pdf" className="custom-file-input"
                       onChange={(e) => addTechnicalSheet(e)}/>
                <label className="custom-file-label text-black" htmlFor="inputGroupFile01">Importer ici la fiche
                    technique de cette prestation</label>
            </div>
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
                                <li>
                                    <button type="button" className="pl-1 pr-1"
                                            onClick={() => inputKeyDown(null, "Micro")}>Micro</button>
                                </li>
                                <li>
                                    <button type="button" className="pl-1 pr-1"
                                            onClick={() => inputKeyDown(null, "Piano")}>Piano</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </span>
            </div>}
        </div>
    );
}

export default Materials;
