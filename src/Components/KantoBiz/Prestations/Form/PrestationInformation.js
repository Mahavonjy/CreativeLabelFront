import React, { Component } from "react";
import * as Tools from "../../../FunctionTools/Tools";
import {bindActionCreators} from "redux";
import * as CreateFields from "../../../FunctionTools/CreateFields";
import {connect} from "react-redux";
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import {toast} from "react-toastify";
import ReactTooltip from 'react-tooltip';
let that;

class PrestationInformation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            title: this.props.title,
            city: this.props.city_reference,
            description: this.props.description,
            dropActive: false,
            files: this.props.files
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
            let url = URL.createObjectURL(file);
            files = { name, size, type, url, file }
        } else {
            files = Array.prototype.map.call(e.dataTransfer.files, (file) => {
                let { name, size, type } = file;
                let url = URL.createObjectURL(file);
                return { name, size, type, url, file };
            }).filter(file => file.type)[0];
        }

        let tmp_file = files.type.split("/");
        if (tmp_file[0] !== "image") toast.error("veuillez mettre une image");
        else {
            tmp_file_state.push(files);
            this.setState({files: tmp_file_state}, () => {this.props.addPicturesOfService(this.state.files)})
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
        if (that.state.files.length <= 0)
            return {"error": true, "message": "veuillez choisir au moins une photo "};
        return {"error": false};
    };

    render() {
        return (
            <div className="Base">
                <ReactTooltip/>
                <div className="card-header transparent b-b">
                    <strong className="text-red">Donnez les informations generale de votre prestation</strong>
                </div>
                <div className="row" style={{height: 450}}>
                    <div className="col-md-7 card p-5">
                        <div className="form-material">
                            {/* Input */}
                            <div className="body">
                                <div className="form-group form-float">
                                    <div className="form-line" data-tip={!this.state.title ? "Veuillez donnée un titre a votre prestation, ex: AnnivShow, ForaParty ..." : null}>
                                        {this.props.InputCreate('title', this.state.title, (e) => {Tools.changeFields(this, e, this.props.addTitleOfService)}, "Titre de votre Prestation", "text", true)}
                                    </div>
                                </div>
                                <div className="form-group form-float" data-tip={!this.state.description ? "Veuillez nous décrire cette prestation en quelques mots" : null}>
                                    <div className="form-line">
                                        <textarea defaultValue={this.state.description} id={this.state.description}
                                                  name={this.state.description} className="form-control" style={{height: 100}}
                                                  placeholder="Quelques ligne de description de votre prestaion"
                                                  onChange={(e) => Tools.changeFields(this, e, this.props.addDescriptionOfService)}/>
                                    </div>
                                </div>
                                <div className="form-group form-float" data-tip={!this.state.city ? "Veuillez donnée une ville reference pour votre prestation" : null}>
                                    <div className="form-line">
                                        <input id="city" name="city" className="form-control"
                                               placeholder={this.state.city || "Veuillez choisir votre ville de reference"}
                                               value={this.state.city} onChange={(e) => {Tools.changeFields(this, e, this.props.addReferenceOfCity)}}
                                               list="city-type" required/>
                                        <datalist id="city-type">
                                            <option value="Manakara">Manakara</option>
                                            <option value="Tolagnaro">Tolagnaro</option>
                                            <option value="Tamatave">Tamatave</option>
                                            <option value="Toliara">Toliara</option>
                                        </datalist>
                                    </div>
                                </div>
                                <div className="form-group form-float" data-tip={!this.state.others_city ? "Veuillez donnez quelques ville ou vous pouvez executé cette même prestation" : null}>
                                    <div className="form-line">
                                        <MultiSelectTools tags={this.props.others_city} list={['Manakara', 'Toliara', 'Toamasina', 'Mahajanga']}
                                                          funcToFillInProps={this.props.addOthersCityOfService}
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
                            <div className="custom-file" data-tip="C'est ici que vous cherchez vos images dans votre appareil">
                                <input onChange={(e) => this.onDrop(e, true)} type="file" accept="image/*" className="custom-file-input" />
                                <label className="custom-file-label" htmlFor="inputGroupFile01">Choisir une image</label>
                            </div>
                        </div>
                        <div className="file has-name is-boxed d-none d-sm-block" data-tip="C'est ici que vous déplacerai vos images">
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
                        </div>
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
        );
    }
}

const mapStateToProps = state => {
    return {
        files: state.KantoBizForm.files,
        title: state.KantoBizForm.title,
        city_reference: state.KantoBizForm.city_reference,
        others_city: state.KantoBizForm.others_city,
        description: state.KantoBizForm.description,
    };
};

const mapDispatch = (dispatch) => {
    return {
        addTitleOfService: (data) => {
            dispatch({type: "ADD_SERVICE_TITLE", data: data})
        },
        addReferenceOfCity: (data) => {
            dispatch({type: "ADD_REFERENCE_CITY_OF_SERVICE", data: data})
        },
        addOthersCityOfService: (data) => {
            dispatch({type: "ADD_OTHERS_CITY_OF_SERVICE", data: data})
        },
        addDescriptionOfService: (data) => {
            dispatch({type: "ADD_DESCRIPTION_OF_SERVICE", data: data})
        },
        addPicturesOfService: (data) => {
            dispatch({type: "ADD_PICTURES_OF_SERVICE", data: data})
        },
        addEventSelected: (data) => {
            dispatch({type: "ADD_EVENTS_SELECTED", data: data})
        },
        InputCreate: bindActionCreators(CreateFields.CreateInput, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatch)(PrestationInformation);
