import React, { useEffect, useRef, useState } from "react";
import InputRange from "react-input-range";
import "../../../../assets/css/style/KantoBiz.css"
import "../../../../assets/css/style/Results.css"
import MultiSelectTools from "../../../FunctionTools/MultiSelectTools";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../Pagination/Pagination";
import ReactTooltip from 'react-tooltip';
import {addFilterEventSelected} from "../../../FunctionTools/FunctionProps";

function Results(props) {

    const dispatch = useDispatch();
    const filter_events_selected = useSelector(state => state.KantobizSearch.filter_events_selected);

    const isMounted = useRef(false);
    const [events_type, setEventsType] = useState(["Mariage", "Anniversaire", "ForaZaza", "Famadihana", "ForaOlombe"]);
    const [price, setPrice] = useState({min: 100, max: 400});
    const [duration, setDuration] = useState({min: 100, max: 500});
    const [starts, setStarts] = useState({min: 0, max: 5});
    const [pageOfItems, setPageOfItems] = useState([]);
    const exampleItems = [...Array(150).keys()].map(i => ({ id: (i + 1), name:
            <div>
                <ReactTooltip/>
                <div className="card_kanto">
                    <div className="additional">
                        <div className="user-card_kanto d-none d-sm-block" data-tip="Cliquer Moi">
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
                            <div className="row justify-content-center text-center" data-tip="Cliquer Moi">
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
                                <div data-tip="Le nombre d'artiste dans le groupe">
                                    {/*<small className="title">Artist</small>*/}
                                    <i className="icon icon-adjust" />
                                    <div className="value">2</div>
                                </div>
                                <div data-tip="La durée de la preparation">
                                    {/*<small className="title">Preparation</small>*/}
                                    <i className="icon icon-clock-1" />
                                    <div className="value">1j</div>
                                </div>
                                <div data-tip="La durée de la preparation">
                                    {/*<small className="title">Durée</small>*/}
                                    <i className="icon icon-clock-o" />
                                    <div className="value">2j</div>
                                </div>
                                <div data-tip="Le prix de la prestation">
                                    {/*<small className="title">Prix</small>*/}
                                    <i className="icon icon-money" />
                                    <div className="value">85$</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="general d-none d-sm-block">
                        <img alt="" src="https://zupimages.net/up/19/42/zyu8.bmp" width="100%" height="100%"/>
                        <h1 className="pt-2 ml-2 bolder text-red">Artist Name</h1>
                        <p className="text-dark ml-2 font-weight-bold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce a volutpat mauris, at molestie lacus. Nam vestibulum sodales odio ut pulvinar.</p>
                        <h1 className="more text-black bolder">85$</h1>
                        <small className="more-genre pl-2 text-black">kilalaky, rumba, afindrafindrao, batrelaky, tsapiky, reggae, Kitoto</small>
                    </div>
                </div>
            </div>
    }));

    const onChangePage = (pageOfItems) => {
        // update state with new page of items
        setPageOfItems(pageOfItems);
    };

    useEffect(() => {

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="row row-eq-height p-b-100">
            <div className="col-lg-3 pt-5">
                <h4 className="text-red text-center">Filtrer le résultat</h4>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Évènement</label>
                    <MultiSelectTools funcToFillInProps={addFilterEventSelected} tags={filter_events_selected} list={events_type} placeholder="Ajouter un evenement"/>
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Prix de la prestation</label>
                    <InputRange draggableTrack maxValue={1000} minValue={0} formatLabel={value => `${value} $`}
                                onChange={value => setPrice(value)}
                                onChangeComplete={value => setPrice(value)}
                                value={price} />
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Durée de la prestation</label>
                    <InputRange draggableTrack maxValue={1000} minValue={0} formatLabel={value => `${value} min`}
                                onChange={value => setDuration(value)}
                                onChangeComplete={value => setDuration(value)}
                                value={duration} />
                </div>
                <div className="text-center ml-5 mr-5">
                    <label className="pb-3 pt-4">Notation (nombre d'étoile)</label>
                    <InputRange draggableTrack maxValue={5} minValue={0} formatLabel={value => `${value}✰`}
                                onChange={value => setStarts(value)}
                                onChangeComplete={value => setStarts(value)}
                                value={starts} />
                </div>
            </div>
            <div className="col-lg-9 pt-5">
                <h4 className="text-red text-center">Résultat(s) de votre recherche</h4>
                <div className="row justify-content-center">
                    {pageOfItems.map(item =><div key={item.id}>{item.name}</div>)}
                </div>
                <div className="text-center">
                    <Pagination items={exampleItems} onChangePage={onChangePage} initialPage={1} />
                </div>
            </div>
        </div>
    );
}

export default Results;
