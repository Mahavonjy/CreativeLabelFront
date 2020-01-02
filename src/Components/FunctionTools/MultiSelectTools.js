import React, {Component} from "react";

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
                   onMouseDown={handleMouseDown} onChange={handleChange} value={value}/>
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

class MultiSelectTools extends Component {
    state = {
        isMounted: false,
        value: '',
        isOpen: false,
        list: this.props.list.filter(list => !this.props.tags.some(tag => tag === list)),
        tags: this.props.tags,
        tmp_list: []
    };

    inputRef = React.createRef();

    handleBlur = (e) => {
        e.target.closest('.multiselect').classList.remove('multiselect-focus');
        this.setState({isOpen: false});
    };

    handleMouseDown = (e) => {
        this.inputRef.current.focus();
        e.target.closest('.multiselect').classList.add('multiselect-focus');
        this.setState(prevState => ({isOpen: true}));
        e.preventDefault();
    };

    handleChange = (e) => {
        const search = e.target.value;
        if (search) {
            this.setState({tmp_list: this.props.list.filter(list => !this.props.tags.some(tag => tag === list))}, () => {
                const filtered = this.state.list.filter(str => str.toLowerCase().indexOf(search.toLowerCase()) !== -1);
                this.setState({value: search, list: filtered.length ? filtered : ["Non trouvable"]});
            });
        } else this.setState({list: this.props.list.filter(list => !this.props.tags.some(tag => tag === list)), value: ''})
    };

    handleTagClick = (index, val) => {
        this.state.tags.splice(index, 1);
        this.setState(prevState => ({list: [...prevState.list, val]}), () => {
            if (this.props.funcToFillInProps) this.props.funcToFillInProps(this.state.tags)
        });
    };

    handleListItemClick = (val) => {
        if (this.state.value) {
            this.setState({list: this.state.tmp_list}, () => {
                this.state.list.splice(this.state.list.indexOf(val), 1);
                this.setState(prevState => ({tags: [...prevState.tags, val], value: ''}), () => {
                    if (this.props.funcToFillInProps) this.props.funcToFillInProps(this.state.tags)
                });
            })
        } else {
            this.state.list.splice(this.state.list.indexOf(val), 1);
            this.setState(prevState => ({tags: [...prevState.tags, val], value: ''}), () => {
                if (this.props.funcToFillInProps) this.props.funcToFillInProps(this.state.tags)
            });
        }
    };

    componentDidMount() {
        this.setState({isMounted: true})
    }

    componentWillUnmount() {
        this.setState({isMounted: false});
    }

    render() {
        return (
            <MultiSelect onListItemClick={this.handleListItemClick}
                         isOpen={this.state.isOpen}
                         placeholder={this.props.placeholder}
                         inputRef={this.inputRef}
                         value={this.state.value}
                         onChange={this.handleChange}
                         onBlur={this.handleBlur}
                         onTagClick={this.handleTagClick}
                         list={this.state.isOpen ? this.state.list : this.state.list.sort()}
                         onMouseDown={this.handleMouseDown}
                         tags={this.state.tags}
            />
        )
    }
}

export default MultiSelectTools;
