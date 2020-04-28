import React, {Component, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

function MultiSelectList(props) {
    const {handleListItemClick, list} = props;

    return (
        <ul className="multiselect__list">
            {list.map((val, index) =>
                <li className="multiselect__list-item" key={index} id={index} value={val}
                    onClick={() => handleListItemClick(val)}>{val}</li>
            )}
        </ul>
    )
}

function MultiSelectTag(props) {
    const {handleTagClick, children, id} = props;
    return (
        <div className="multiselect-tag">
            <div className="multiselect-tag__text">{children}</div>
            <div className="multiselect-tag__remove-btn" onClick={() => handleTagClick(id, children)}>
                <div className="multiselect-tag__remove-icon"/>
            </div>
        </div>
    )
}

function MultiSelectSearch(props) {
    const {handleArrowClick, handleChange, handleMouseDown, placeholder, inputRef, isOpen, value} = props;

    return (
        <div className="multiselect__search">
            <input type="text" ref={inputRef} placeholder={placeholder} className="multiselect__search-input"
                   onMouseDown={handleMouseDown} onChange={handleChange} autoComplete="off" value={value}/>
            {isOpen &&
            <div className="multiselect__open-btn" onClick={handleArrowClick}>
                <i className="multiselect__open-icon"/>
            </div>
            }
        </div>
    )
}

function MultiSelect(props) {
    const {onListItemClick, onTagClick, placeholder, inputRef, onChange, onMouseDown, onBlur, isOpen, value, list, tags} = props;

    return (
        <div className="multiselect" onMouseDown={onMouseDown} onBlur={onBlur}>
            <div className="multiselect__tags">
                {tags.map((val, index) => <MultiSelectTag key={index} id={index} handleTagClick={onTagClick}>{val}</MultiSelectTag>)}
            </div>
            <MultiSelectSearch inputRef={inputRef} handleChange={onChange} handleMouseDown={onMouseDown} value={value} placeholder={placeholder} isOpen={isOpen}/>
            {isOpen ? <MultiSelectList handleListItemClick={onListItemClick} list={list} tags={tags}/> : null}
        </div>
    )
}

function MultiSelectTools(props) {

    const dispatch = useDispatch();

    const isMounted = useRef(false);
    const [value, setValue] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState(props.list.filter(list => !props.tags.some(tag => tag === list)));
    const [tags, setTags] = useState(props.tags);
    const [tmp_list, setTmpList] = useState([]);

    const inputRef = React.createRef();

    const handleBlur = (e) => {
        e.target.closest('.multiselect').classList.remove('multiselect-focus');
        setIsOpen(false);
    };

    const handleMouseDown = (e) => {
        inputRef.current.focus();
        e.target.closest('.multiselect').classList.add('multiselect-focus');
        setIsOpen(true);
        e.preventDefault();
    };

    const handleChange = async (e) => {
        const search = e.target.value;
        if (search) {
            await setTmpList(props.list.filter(list => !props.tags.some(tag => tag === list)));
            const filtered = await list.filter(str => str.toLowerCase().indexOf(search.toLowerCase()) !== -1);
            setValue(search);
            setList(filtered.length ? filtered : ["Non trouvable"])
        } else {
            setList(props.list.filter(list => !props.tags.some(tag => tag === list)));
            setValue('')
        }
    };

    const handleTagClick = async (index, val) => {
        await tags.splice(index, 1);
        await setList(list => [...list, val]);
        if (props.funcToFillInProps) await dispatch(props.funcToFillInProps(tags));
    };

    const handleListItemClick = async (val) => {
        if (value) await setList(tmp_list);
        await list.splice(list.indexOf(val), 1);
        let tmp_tag = [...tags];
        await tmp_tag.push(val);
        await setTags(tmp_tag);
        await setValue('');
        if (props.funcToFillInProps) await dispatch(props.funcToFillInProps(tmp_tag))
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, [list, tags]);

    return (
        <MultiSelect onListItemClick={handleListItemClick}
                     isOpen={isOpen}
                     placeholder={props.placeholder}
                     inputRef={inputRef}
                     value={value}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     onTagClick={handleTagClick}
                     list={isOpen ? list : list.sort()}
                     onMouseDown={handleMouseDown}
                     tags={tags}
        />
    )
}

export default MultiSelectTools;
