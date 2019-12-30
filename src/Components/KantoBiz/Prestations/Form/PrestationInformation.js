import React, { Component, useCallback } from "react";
import FunctionTools from "../../../FunctionTools/FunctionTools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import {connect} from "react-redux";
import MultiselectTools from "../../../FunctionTools/MultiselectTools";
import {toast} from "react-toastify";
let that;

class PrestationInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            title: "",
            city: "",
            description: "",
            dropActive: false,
            files: []
        };
        that = this
    }

    onDragEnter = (e) => {
        e.preventDefault();
        this.setState({ dropActive: true });
    };

    onDragOver = (e) => {
        e.preventDefault();
    };

    onDragLeave = (e) => {
        e.preventDefault();
        this.setState({ dropActive: false });
    };

    onDrop = (e, file) => {
        e.preventDefault();
        let files = [];
        let tmp_file_state = [...this.state.files];

        if (file) {
            let file = e.target.files[0];
            let { name, size, type } = file;
            files = { name, size, type, file }
        } else {
            files = Array.prototype.map.call(e.dataTransfer.files, (file) => {
                let { name, size, type } = file;
                return { name, size, type, file };
            }).filter(file => file.type)[0];
        }

        let tmp_file = files.type.split("/");
        if (tmp_file[0] !== "image") toast.error("veuillez mettre une image");
        else {
            tmp_file_state.push(files);
            this.setState({files: tmp_file_state})
        }
    };

    removeFile = (index) => {
        let array = [...this.state.files];
        array.splice(index, 1);
        this.setState({files: array});
    };

    componentDidMount() {
        this.setState({ isMounted: true})
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    static validation () {
        if (!that.state.title)
            return {"error": true, "message": "veuillez choisir un titre "};
        if (!that.state.city)
            return {"error": true, "message": "veuillez choisir une ville de reference "};
        if (!that.state.files)
            return {"error": true, "message": "veuillez choisir au moins une photo "};
        return {"error": false};
    };

    render() {
        return (
            <div className="Base">
                <div className="card-header transparent b-b">
                    <strong className="text-red">Donnez les informations generale de votre prestation</strong>
                </div>
                <div className="row" style={{height: 450}}>
                    <div className="col-md-7 card p-5">
                        <div className="form-material">
                            {/* Input */}
                            <div className="body">
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        {this.props.InputCreate('title', this.state.title, (e) => {FunctionTools.changeFields(this, e)}, "Titre de votre Prestation", "text", true)}
                                    </div>
                                </div>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <textarea defaultValue={this.state.description} id={this.state.description}
                                                  name={this.state.description} className="form-control" style={{height: 100}}
                                                  placeholder="Quelques ligne de description de votre prestaion"
                                                  onChange={(e) => FunctionTools.changeFields(this, e)}/>
                                    </div>
                                </div>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <input id="city" name="city" className="form-control"
                                               placeholder={this.state.city || "Veuillez choisir votre ville de reference"}
                                               value={this.state.city} onChange={(e) => {FunctionTools.changeFields(this, e)}}
                                               list="city-type" required/>
                                        <datalist id="city-type">
                                            <option value="Manakara">Manakara</option>
                                            <option value="Tolagnaro">Tolagnaro</option>
                                            <option value="Tamatave">Tamatave</option>
                                            <option value="Toliara">Toliara</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="form-group form-float">
                                    <div className="form-line">
                                        <MultiselectTools tags={[]} list={[{id: 0, value: 'Manakara'}, {id: 1, value: 'Toliara'}, {id: 2, value: 'Tamatave'}]}
                                                          placeholder="Ajouter d'autres villes" sort />
                                    </div>
                                </div>
                            </div>
                            {/* #END# Input */}
                        </div>
                    </div>
                    <div className="col-md-5 text-center p-5">
                        <span className="font-weight-lighter">Faites glisser votre image ou naviguez</span>
                        <div className="form-group pt-5">
                            <div className="custom-file">
                                <input onChange={(e) => this.onDrop(e, true)} type="file" accept="image/*" className="custom-file-input" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choisir une image</label>
                            </div>
                        </div>
                        <div className="file has-name is-boxed">
                            <span className="file-label" onDragEnter={this.onDragEnter} onDragOver={this.onDragOver} onDragLeave={this.onDragLeave} onDrop={this.onDrop}>
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
                            {this.state.files.length > 0 ?
                                <ul className="pt-5">
                                    {this.state.files.map((file, index) =>
                                        <li className="bg-light m-1 text-black float-left" key={index} style={{borderRadius: 5}}>
                                            <span className="ml-1 font-italic" key={index}>{file.name} &nbsp;
                                                <i className="text-red icon icon-window-close-o" key={index} onClick={() => this.removeFile(index)}/>
                                            </span>
                                        </li>
                                    )}
                                </ul> : <small>Vous n'avez importez aucune images</small>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapDispatch = (dispatch) => {
    return {
        InputCreate: bindActionCreators(CreateFields.CreateInput, dispatch),
    };
};

export default connect(null, mapDispatch)(PrestationInformation);
