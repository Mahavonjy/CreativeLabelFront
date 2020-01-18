import React, { Component } from "react";
import ReactTooltip from "react-tooltip";
import FunctionTools from "../../FunctionTools/FunctionTools";

class MyPrestations extends Component {
    state = {
        isMounted: false,
        global_price: 300,
        editPrestation: true
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            const $circle = document.querySelector('.card__circle');
            const $smallCircle = document.querySelector('.card__smallCircle');
            const $year = document.querySelector('.card__name');
            const $card = document.querySelector('.card-prestation');
            const $cardOrangeShine = document.querySelector('.card__orangeShine');
            const $cardComet = document.querySelector('.card__cometOuter');

            const generateTranslate = (el, e, value) => {
                el.style.transform = `translate(${e.clientX*value}px, ${e.clientY*value}px)`;
            }

            const cumulativeOffset = (element) => {
                let top = 0, left = 0;
                do {
                    top += element.offsetTop  || 0;
                    left += element.offsetLeft || 0;
                    element = element.offsetParent;
                } while(element);

                return {
                    top: top,
                    left: left
                };
            };
            document.onmousemove = (event) => {
                const e = event || window.event;
                const x = (e.pageX - cumulativeOffset($card).left - (350 / 2)) * -1 / 100;
                const y = (e.pageY - cumulativeOffset($card).top - (350 / 2)) * -1 / 100;

                const matrix = [
                    [1, 0, 0, -x * 0.00005],
                    [0, 1, 0, -y * 0.00005],
                    [0, 0, 1, 1],
                    [0, 0, 0, 1]
                ];

                generateTranslate($smallCircle, e, 0.03);
                generateTranslate($cardOrangeShine, e, 0.09);
                generateTranslate($circle, e, 0.05);
                generateTranslate($year, e, 0.03);
                generateTranslate($cardComet, e, 0.05);

                $card.style.transform = `matrix3d(${matrix.toString()})`;
            }
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="text-center" style={{minHeight: 320}}>
                <ReactTooltip/>
                <ReactTooltip place="right" className="special-color-dark" id='global_price' aria-haspopup='true'>
                    <h5 className="text-center text-green"> Frais de déplacement génerale</h5><br/>

                    <small>• Ce prix sera le frais de déplacement globale de chaque nouvelle préstation </small><br/>
                    <small>• Au début ce prix sera synchroniser avec votre première préstation</small><br/>
                    <small>• Vous pouvez personnaliser pour chaque prestation le frais de déplacement ou bien en fonction de la date aussi</small><br/><br/>
                </ReactTooltip>
                <ReactTooltip place="left" className="special-color-dark" id='copy_edit' aria-haspopup='true'>
                    <h5 className="text-center text-green">Explication</h5><br/>

                    <small>• Une autre façon de le dire: cloner en vue d’une modification </small><br/>
                    <small>• L’artiste ne peut pas publier une prestation dupliqué qui a le même prix, le même type d’évènement, même ville en même temps</small><br/>
                    <small>• Exemple: Soît c'est le même prix, pas le même type d’évènement, même ville</small><br/><br/>
                </ReactTooltip>
                {/* if user choice become an artist*/}
                {/*<Modal visible={this.state.editPrestation} width="80%" height="80%" effect="fadeInUp" onClickAway={() => this.setState({editPrestation: false})}>*/}
                {/*    <div className="bg-dark" style={{height:"100%"}}>*/}
                {/*        <button className="ModalClose" onClick={() => this.setState({editPrestation: false})}>*/}
                {/*            <i className="icon-close s-24 text-warning"/>*/}
                {/*        </button>*/}


                {/*    </div>*/}
                {/*</Modal>*/}
                {/* end form become an artist*/}
                <div className="row justify-content-center">
                    <div className="col-lg-2">
                        <h4 className="text-light text-center bolder pt-3 pb-2">Votre frais de déplacement générale est de:</h4>
                        <div className="col text-center pt-2 pb-3">
                            <h2 className="text-red">{this.state.global_price} $&nbsp;
                                <i className="icon icon-info text-red" data-tip data-for="global_price" /></h2>
                            <div className="custom-float">
                                <div className="input-group-prepend d-inline-block center">
                                    <div className="input-group-text text-dark">
                                        <i className="icon-money"/>&nbsp;Modifier le prix ici *
                                    </div>
                                    <input className="form-control" type="number" id="global_price" name="global_price" onChange={(e) => FunctionTools.changeFields(this, e)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-10">
                        <div className="row justify-content-center">
                            <div className="col-md-4 card-prestation m-2">
                                <div className="card__name bg-dark center-center">
                                    <h3 className="bolder">Prestation Name</h3>
                                </div>
                                <div className="card__cometOuter">
                                    <div className="card__comet" />
                                    <div className="card__comet card__comet--second">
                                    </div>
                                </div>
                                <div className="card__circle" />
                                <div className="card__smallCircle" />
                                <div className="card__orangeShine" />
                                <div className="card__greenShine" />
                                <div className="card__outer-btn">
                                    <button className="btn btn-outline-info" data-tip="Modifier cette prestation"><i className="icon-edit-1 s-24"/></button>
                                    <button className="btn btn-outline-info" data-tip data-for="copy_edit">dupliquer & modifier</button>
                                    <button className="btn btn-outline-info" data-tip="Visualiser cette prestation en mode auditeur pro">Afficher</button>
                                    <button className="btn btn-outline-danger" data-tip="supprimer cette prestation"><i className="icon-trash s-24"/></button>
                                    <button className="btn btn-outline-warning" data-tip="Cette prestation est caché, c'est a dire n'est pas visible a la recherche des autieurs pro"><i className="icon-eye-slash s-24"/></button>
                                </div>
                            </div>
                            <div className="col-md-4 card-prestation m-2">
                                <div className="card__name bg-dark center-center">
                                    <h3 className="bolder">Prestation Name</h3>
                                </div>
                                <div className="card__cometOuter">
                                    <div className="card__comet" />
                                    <div className="card__comet card__comet--second">
                                    </div>
                                </div>
                                <div className="card__circle" />
                                <div className="card__smallCircle" />
                                <div className="card__orangeShine" />
                                <div className="card__greenShine" />
                                <div className="card__outer-btn">
                                    <button className="btn btn-outline-info" data-tip="Modifier cette prestation"><i className="icon-edit-1 s-24"/></button>
                                    <button className="btn btn-outline-info" data-tip data-for="copy_edit">dupliquer & modifier</button>
                                    <button className="btn btn-outline-info" data-tip="Visualiser cette prestation en mode auditeur pro">Afficher</button>
                                    <button className="btn btn-outline-danger" data-tip="supprimer cette prestation"><i className="icon-trash s-24"/></button>
                                    <button className="btn btn-outline-warning" data-tip="Cette prestation est visible, les auditeurs pro peuvent le voir a partir de la recherche"><i className="icon-eye s-24"/></button>
                                </div>
                            </div>
                            <div className="col-md-4 card-prestation m-2">
                                <div className="card__name bg-dark center-center">
                                    <h3 className="bolder">Prestation Name</h3>
                                </div>
                                <div className="card__cometOuter">
                                    <div className="card__comet" />
                                    <div className="card__comet card__comet--second">
                                    </div>
                                </div>
                                <div className="card__circle" />
                                <div className="card__smallCircle" />
                                <div className="card__orangeShine" />
                                <div className="card__greenShine" />
                                <div className="card__outer-btn">
                                    <button className="btn btn-outline-info" data-tip="Modifier cette prestation"><i className="icon-edit-1 s-24"/></button>
                                    <button className="btn btn-outline-info" data-tip data-for="copy_edit">dupliquer & modifier</button>
                                    <button className="btn btn-outline-info" data-tip="Visualiser cette prestation en mode auditeur pro">Afficher</button>
                                    <button className="btn btn-outline-danger" data-tip="supprimer cette prestation"><i className="icon-trash s-24"/></button>
                                    <button className="btn btn-outline-warning" data-tip="Cette prestation est visible, les auditeurs pro peuvent le voir a partir de la recherche"><i className="icon-eye s-24"/></button>
                                </div>
                            </div>
                            <div className="col-md-4 card-prestation m-2">
                                <div className="card__name bg-dark center-center">
                                    <h3 className="bolder">Prestation Name</h3>
                                </div>
                                <div className="card__cometOuter">
                                    <div className="card__comet" />
                                    <div className="card__comet card__comet--second">
                                    </div>
                                </div>
                                <div className="card__circle" />
                                <div className="card__smallCircle" />
                                <div className="card__orangeShine" />
                                <div className="card__greenShine" />
                                <div className="card__outer-btn">
                                    <button className="btn btn-outline-info" data-tip="Modifier cette prestation"><i className="icon-edit-1 s-24"/></button>
                                    <button className="btn btn-outline-info" data-tip data-for="copy_edit">dupliquer & modifier</button>
                                    <button className="btn btn-outline-info" data-tip="Visualiser cette prestation en mode auditeur pro">Afficher</button>
                                    <button className="btn btn-outline-danger" data-tip="supprimer cette prestation"><i className="icon-trash s-24"/></button>
                                    <button className="btn btn-outline-warning" data-tip="Cette prestation est visible, les auditeurs pro peuvent le voir a partir de la recherche"><i className="icon-eye s-24"/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyPrestations;
