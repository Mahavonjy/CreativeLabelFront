import React, {useEffect, useRef, useState} from "react";

function Materials(props) {

    const isMounted = useRef(false);
    const [tags, setTags] = useState(['Materiel1', 'Materiel2']);

    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    };

    const inputKeyDown = (e) => {
        const val = e.target.value;
        if (e.key === 'Enter' && val) {
            if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) return;
            setTags(tags => [...tags, val]);
            document.getElementsByClassName("input-add-tag")[0].value = null;
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="card no-b">
            <div className="tag-editor">
                <span className="tag-editor-inner">
                    <div className="tag-editor-title text-center">
                        <h1 className="text-light">Materiels a disposition&nbsp;<i className="icon icon-info s-18"/></h1>
                    </div>
                    <div className="tag-editor-tags">
                        <div className="input-tag">
                            <div className="input-tag__tags__input pb-3">
                                <input className="input-add-tag" placeholder="Ajouter un materiel" type="text" onKeyDown={inputKeyDown}/>
                            </div>
                            <ul className="input-tag__tags text-center">
                                {tags.map((tag, i) => (
                                    <li key={tag}>{tag}
                                        <button type="button" className="ml-2" onClick={() => removeTag(i) }><i className="icon-close1 text-red ml-1 mr-1"/></button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </span>
            </div>
            <div className="tag-editor">
                <span className="tag-editor-inner">
                    <div className="tag-editor-title text-center">
                        <h1 className="text-light">Quelques exemples de materiels&nbsp;<i className="icon icon-info s-18"/></h1>
                    </div>
                    <div className="tag-editor-tags">
                        <div className="input-tag">
                            <ul className="input-tag__tags text-center">
                                <li>
                                    <button type="button" className="pl-1 pr-1" onClick={() => console.log("Donc") }>Micro</button>
                                </li>
                                <li>
                                    <button type="button" className="pl-1 pr-1" onClick={() => console.log("Donc") }>Piano</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </span>
            </div>
        </div>
    );
}

export default Materials;
