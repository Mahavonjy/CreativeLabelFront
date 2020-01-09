import React, { Component } from "react";
import InputRange from "react-input-range";
import "../../style/KantoBiz.css"
import "../../style/Results.css"
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import {connect} from "react-redux";
import Pagination from "./Pagination";

let exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name:
        <div className="card_kanto">
            <div className="additional">
                <div className="user-card_kanto d-none d-sm-block">
                    <div className="level center-result">
                        Thematic Title
                    </div>
                    <div className="points center-result">
                        5&nbsp;<i className="icon icon-star"/>
                    </div>
                    <div className="text-center" style={{paddingTop: 70}}>
                        <img width={110} height={100} src='https://zupimages.net/up/19/18/3ltf.png' alt=''/>
                    </div>
                </div>
                <div className="more-info">
                    <h1 className="pt-2">Artist Name</h1>
                    <div className="row justify-content-center text-center">
                        <div className="col text-light d-none d-sm-block">
                            <h4 className="text-light bolder">Genre</h4>
                            <ul className="bg-transparent kanto-list m-1">
                                <li>kilalaky</li>
                                <li>rumba</li>
                                <li>afindrafindrao</li>
                                <li>batrelaky</li>
                            </ul>
                        </div>
                        <div className="col text-light d-none d-sm-block">
                            <h4 className="text-light bolder">Ville</h4>
                            <ul className="bg-transparent kanto-list m-1">
                                <li>Manakara</li>
                                <li>Tolagnaro</li>
                                <li>Vangaindrano</li>
                                <li>Tananarive</li>
                            </ul>
                        </div>
                        <div className="col ml-auto d-sm-none">
                            <h4 className="text-red">Evenements</h4>
                            <p className="events">Anniversaire, Mariage, ForaZaza, Fombandrazagny, Dikavohitra, Anniversaire, Mariage, ForaZaza, Fombandrazagny, Dikavohitra</p>

                            <div className="row ml-2 mr-3">
                                <div className="col">
                                    <small className="text-red">Ville</small>
                                    <ul className="small-kanto-list">
                                        <li>Manakara</li>
                                        <li>Toamasina</li>
                                        <li>Tananarive</li>
                                    </ul>
                                </div>
                                <div className="col">
                                    <div className="text-center" style={{marginTop: 10, marginLeft: 10}}>
                                        <img src='https://zupimages.net/up/19/18/3ltf.png' alt=''/>
                                    </div>
                                </div>
                                <div className="col">
                                    <small className="text-red">Genre</small>
                                    <ul className="small-kanto-list">
                                        <li>kilalaky</li>
                                        <li>rumba</li>
                                        <li>afindrafindrao</li>
                                        <li>batrelaky</li>
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="stats">
                        <div>
                            <div className="title">Artist</div>
                            <i className="icon icon-adjust" />
                            <div className="value">2</div>
                        </div>
                        <div>
                            <div className="title">Preparation</div>
                            <i className="icon icon-clock-1" />
                            <div className="value">1j</div>
                        </div>
                        <div>
                            <div className="title">Durée</div>
                            <i className="icon icon-clock-o" />
                            <div className="value">2j</div>
                        </div>
                        <div>
                            <div className="title">Prix</div>
                            <i className="icon icon-money" />
                            <div className="value">85$</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="general d-none d-sm-block">
                <img alt="" src="https://zupimages.net/up/19/42/zyu8.bmp"/>
                <h1 className="pt-2 ml-2 bolder text-red">Artist Name</h1>
                <p className="text-dark ml-2 font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
                <h1 className="more text-black bolder">85$</h1>
                <small className="more-genre pl-2 text-black">kilalaky, rumba, afindrafindrao, batrelaky, tsapiky, reggae, Kitoto</small>
            </div>
        </div>
}));

class Results extends Component {
    state = {
        isMounted: false,
        events_type: ["Mariage", "Anniversaire", "ForaZaza", "Famadihana", "ForaOlombe"],
        price: {min: 100, max: 400},
        duration: {min: 100, max: 500},
        starts: {min: 0, max: 5},
        exampleItems: exampleItems,
        pageOfItems: []
    };

    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {

        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="row row-eq-height p-b-100">
                <div className="col-lg-3 pt-5">
                    <h4 className="text-red text-center">Trier La recherche</h4>
                    <div className="text-center ml-5 mr-5">
                        <label className="pb-3 pt-4">Evenement</label>
                        <MultiSelectTools funcToFillInProps={this.props.addFilterEventSelected} tags={this.props.filter_events_selected} list={this.state.events_type} placeholder="Ajouter un evenement"/>
                    </div>
                    <div className="text-center ml-5 mr-5">
                        <label className="pb-3 pt-4">Prix</label>
                        <InputRange draggableTrack maxValue={1000} minValue={0} formatLabel={value => `${value} $`}
                                    onChange={value => this.setState({ price: value })}
                                    onChangeComplete={value => this.setState({price: value})}
                                    value={this.state.price} />
                    </div>
                    <div className="text-center ml-5 mr-5">
                        <label className="pb-3 pt-4">Durée</label>
                        <InputRange draggableTrack maxValue={1000} minValue={0} formatLabel={value => `${value} min`}
                                    onChange={value => this.setState({ duration: value })}
                                    onChangeComplete={value => this.setState({duration: value})}
                                    value={this.state.duration} />
                    </div>
                    <div className="text-center ml-5 mr-5">
                        <label className="pb-3 pt-4">Recommendation</label>
                        <InputRange draggableTrack maxValue={5} minValue={0} formatLabel={value => `${value}✰`}
                                    onChange={value => this.setState({ starts: value })}
                                    onChangeComplete={value => this.setState({starts: value})}
                                    value={this.state.starts} />
                    </div>
                </div>
                <div className="col-lg-9 pt-5">
                    <h4 className="text-red text-center">Resultat de votre recherche</h4>
                    <div className="row justify-content-center">
                        {this.state.pageOfItems.map(item =><div key={item.id}>{item.name}</div>)}
                    </div>
                    <div className="text-center">
                        <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} initialPage={1} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filter_events_selected: state.KantobizSearch.filter_events_selected,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addFilterEventSelected: (data) => {
            dispatch({type: "ADD_FILTER_EVENTS_SELECTED", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
