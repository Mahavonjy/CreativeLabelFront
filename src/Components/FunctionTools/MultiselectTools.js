import React, {Component} from "react";

function MultiselectList(props) {
    const {handleListItemClick, isSorted, list} = props;
    if (isSorted) list.sort((a, b) => (a.value > b.value) ? 1 : -1);

    return (
        <ul className="multiselect__list">{
            list.map(({id, value}) => {
                return (
                    <li className="multiselect__list-item" key={id} id={id} onClick={(e) => handleListItemClick(id, e)}>{value}</li>
                )
            })
        }
        </ul>
    )
}

function MultiselectTag(props) {
    const {handleTagClick, children, isOpen, id} = props;
    return (
        <div className="multiselect-tag">
            <div className="multiselect-tag__text">{children}</div>
            <div className="multiselect-tag__remove-btn" onClick={(e) => handleTagClick(id, e)}>
                <div className="multiselect-tag__remove-icon"></div>
            </div>
        </div>
    )
}

function MultiselectSearch(props) {
    const {handleArrowClick, handleKeyDown, handleChange, handleMouseDown, handleFocus, handleBlur, placeholder, inputRef, isOpen, value} = props;

    return (
        <div className="multiselect__search">
            <input type="text" ref={inputRef} placeholder={placeholder} className="multiselect__search-input"
                   onMouseDown={handleMouseDown} onChange={handleChange} onKeyDown={handleKeyDown} value={value}/>
            {isOpen &&
            <div className="multiselect__open-btn" onClick={handleArrowClick}>
                <i className="multiselect__open-icon"/>
            </div>
            }
        </div>
    )
}

function Multiselect(props) {
    const {onArrowClick, onListItemClick, onTagClick, placeholder, onKeyDown, inputRef, onChange, onMouseDown, onFocus, onBlur, isOpen, value, isSorted, list, tags} = props;

    return (
        <div className="multiselect" onMouseDown={onMouseDown} onBlur={onBlur}>
            <div className="multiselect__tags">
                {tags.map(({id, value}) => <MultiselectTag key={id} id={id}
                                                           handleTagClick={onTagClick}>{value}</MultiselectTag>)}
            </div>
            <MultiselectSearch inputRef={inputRef} handleKeyDown={onKeyDown} handleChange={onChange}
                               handleArrowClick={onArrowClick} handleMouseDown={onMouseDown} value={value}
                               placeholder={placeholder} isOpen={isOpen}/>
            {isOpen &&
            <MultiselectList handleListItemClick={onListItemClick} list={list} tags={tags} isSorted={isSorted}/>}
        </div>
    )
}

class MultiselectTools extends Component {
    state = {
        isMounted: false,
        value: '',
        nextId: this.props.tags.length,
        isOpen: false,
        isCustom: this.props.custom || false,
        isSorted: this.props.sort || false,
        list: this.props.list,
        tags: this.props.tags,
        filteredList: this.props.list.filter(item => !this.props.tags.some(tag => item.value === tag.value))
    };

    inputRef = React.createRef();

    handleBlur = (e) => {
        e.target.closest('.multiselect').classList.remove('multiselect-focus');
        this.setState({isOpen: false});
    };

    handleArrowClick = () => {
        this.setState({isOpen: false});
    };

    handleMouseDown = (e) => {
        this.inputRef.current.focus();
        e.target.closest('.multiselect').classList.add('multiselect-focus');
        this.setState(prevState => ({isOpen: true}));
        e.preventDefault();
    };

    handleChange = (e) => {
        const [...matchingItems] = this.state.filteredList.filter(item => !item.value.toLowerCase().indexOf(e.target.value.toLowerCase()));
        this.setState({
            value: e.target.value,
            filteredList: (matchingItems.length) ? matchingItems : [{value: 'No matching items in the filter'}]
        });
    };

    handleKeyDown = (e) => {
        switch (e.key) {
            case 'Enter':
                if (this.state.value.length) {
                    if (this.state.isCustom) {
                        this.addTag();
                        break;
                    } else if (this.state.filteredList[0]['id']) {
                        this.setState(prevState => ({value: prevState.filteredList[0].value}), () => {this.addTag()});
                        break;
                    }
                }

            case 'Escape':
                this.clearInput();
                this.setState(prevState => ({
                    filteredList: prevState.list.filter(item => !prevState.tags.some(tag => item.value === tag.value))
                }));
                break;

            case 'Backspace':
                this.setState(prevState => ({
                    filteredList: prevState.list.filter(item => !prevState.tags.some(tag => item.value === tag.value))
                }));
                break;
        }
    };

    handleTagClick = (id, e) => {
        this.removeTag(id);
        this.setState(prevState => ({
            filteredList: prevState.list.filter(item => !this.state.tags.some(tag => item.value === tag.value))
        }));
        this.inputRef.current.focus();
    };

    handleListItemClick = (id, e) => {
        this.setState({value: e.target.innerText}, () => {this.addTag();});
    };

    addTag = () => {
        this.setState(prevState => ({tags: [...prevState.tags, {
            id: prevState.nextId, value: prevState.value}], nextId: prevState.nextId + 1
        }), () => {
            this.setState(prevState => ({
                filteredList: prevState.filteredList.filter(item => !prevState.tags.some(tag => item.value === tag.value))
            }), () => {
                this.clearInput();
            });
        });
    };

    clearInput = () => {
        this.setState(prevState => ({value: ''}));
    };

    removeTag = (id) => {
        this.setState(prevState => (
            {tags: prevState.tags.filter(item => item.id !== id)}
        ));
    };

    componentDidMount() {
        this.setState({isMounted: true})
    }

    componentWillUnmount() {
        this.setState({isMounted: false});
    }

    render() {
        return (
            <Multiselect onListItemClick={this.handleListItemClick}
                         onArrowClick={this.handleArrowClick}
                         placeholder={this.props.placeholder}
                         onMouseDown={this.handleMouseDown}
                         onKeyDown={this.handleKeyDown}
                         onTagClick={this.handleTagClick}
                         list={this.state.filteredList}
                         tags={this.state.tags}
                         onChange={this.handleChange}
                         isOpen={this.state.isOpen}
                         inputRef={this.inputRef}
                         value={this.state.value}
                         onBlur={this.handleBlur}
                         isSorted={this.state.isSorted}
            />
        )
    }
}

export default MultiselectTools;
