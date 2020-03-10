import axios from "axios";
import React from "react";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {addKantoBizSearchResults, addSearchLoading, changeInitialized} from "../FunctionTools/FunctionProps";
import {generatePagination} from "../FunctionTools/Tools";

export const EventAndThematics = (headers, dispatch, setStateResult, displayOne) => {

    const SearchEvent = async (event) => {
        await dispatch(addSearchLoading(true));
        axios.get("api/service_search/moment/events/" + event, {headers: headers}).then(async (resp) => {
            await dispatch(changeInitialized(false));
            await setStateResult(generatePagination(resp.data, displayOne));
            await dispatch(addKantoBizSearchResults(resp.data));
            await dispatch(addSearchLoading(false));
            if (resp.data.length === 0) toast.warn("pas de prestations")
        })
    };

    const SearchThematic = async (thematic) => {
        await dispatch(addSearchLoading(true));
        axios.get("api/service_search/moment/thematics/" + thematic, {headers: headers}).then(async (resp) => {
            await dispatch(changeInitialized(false));
            await setStateResult(generatePagination(resp.data, displayOne));
            await dispatch(addKantoBizSearchResults(resp.data));
            await dispatch(addSearchLoading(false));
            if (resp.data.length === 0) toast.warn("pas de prestations")
        })
    };

    const generatorEventCard = (position_name, key, title, desc, image) => {
        return (
            <div className={position_name}>
                <div className="card-image">
                    <img alt={title} src={image} />
                </div>
                <div className="card-text text-center">
                    <h3 className="text-red pb-2">{title}</h3>
                    <small className="bolder">{desc}</small>
                    <button className="btn btn-outline-info mt-2"
                            onClick={() => SearchEvent(key)}
                            data-tip="Cliquer moi pour voir les prestations de cette évenement">Les prestations</button>
                </div>
            </div>
        );
    };

    const generatorThematicCard = (name, key, image, desc) => {
        return (
            <div className="thematics-card col-md-4">
                <h3 className="pt-3 text-white">{name}</h3>
                <small>{desc}</small>
                <div className="bar">
                    <div className="emptybar" />
                    <div className="filledbar" />
                </div>
                <div className="circle center p-t-40 pb-2">
                    <img alt={name} src={image} style={{width: "100%"}}/>
                </div>
                <button className="btn btn-outline-info relative align-middle"
                        onClick={() => SearchThematic(key)}
                        data-tip="Cliquer moi pour voir les prestation de cette univer">Les prestations</button>
            </div>
        )
    };

    return (
        <div className="p-b-100">
            <ReactTooltip/>
            {/* Type of Events */}
            <div className="pt-5">
                <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                    <h1 className="mb-2 text-primary">Nos Evenements</h1>
                    <p>Voici tout les differentes enevements dans KantoBiz</p>
                </div>
                <div className="card-container">
                    {generatorEventCard("card-left","Mariage", "Mariage", "Un show pour vous rien que pour vous", "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-top","Fête traditionnelle", "Fête traditionnelle", "Un évènement particulier, des artistes particuliers", "https://images.pexels.com/photos/1011334/pexels-photo-1011334.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-right", "Anniversaire", "Anniversaire", "Allumez le feu lors de votre anniversaire", "https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-right", "Show-case","Show-case", "Pour une animation réussie", "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-right", "Festival et défilé", "Festival & défilé", "L'expérience musicale qui vous transcende", "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-bottom", "Événement sportif", "Événement sportif", "Sport & Musique comme Roméo & Juliette", "https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&h=750&w=126")}
                    {generatorEventCard("card-top", "Montage vidéo","Montage vidéo", "Pour un service personnalisé en montage vidéo", "https://images.pexels.com/photos/279376/pexels-photo-279376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-right", "Évènement d’entreprise","Évènement d’entreprise", "Animer un salon, un congrès, une exposition, un gala, un évènement de lancement, une réception, un team building, etc...", "https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-top", "Évènement associative","Évènement associative", "Pour un évènement associatif réussi", "https://images.pexels.com/photos/585581/pexels-photo-585581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {generatorEventCard("card-right", "Création d’instrumentale","Création d’instrumentale", "Des beatmakers à votre disposition pour créer des instrus personnalisés ", "https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                    {/*{generatorEventCard("card-left", "Autres évènements", "Voir d'autres évènements ", "https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}*/}

                </div>
            </div>
            {/* End type of Events */}
            {/* All thematics */}
            <div className="thematics pt-5">
                <div className="relative mb-5 p-t-10 p-b-10 ml-5 ">
                    <h1 className="mb-2 text-primary">Nos Thematiques/Univers</h1>
                    <p>Voici tout les differentes univers dans KantoBiz</p>
                </div>
                <div className="row ml-5 mr-5 justify-content-center">
                    {generatorThematicCard("Cirque/Arts de la rue", "street_artists","https://zupimages.net/up/19/18/3ltf.png", "acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur ...")}
                    {generatorThematicCard("Comédiens", "comedian","https://zupimages.net/up/19/18/3ltf.png", "Burlesque, Comédie, Conteur, Humoriste, expérimental ...")}
                    {generatorThematicCard("DJ", "dj","https://zupimages.net/up/19/18/3ltf.png", "Animateur, Mix, Live set, DJ Set")}
                    {generatorThematicCard("Danseurs", "dancers","https://zupimages.net/up/19/18/3ltf.png", "Tango, kilalaky, batrelaky, Ndombolo, Kizomba ...")}
                    {generatorThematicCard("Magiciens", "magician","https://zupimages.net/up/19/18/3ltf.png", "Close-ups, Mentalistes, Prestidigitateurs ...")}
                    {generatorThematicCard("Chanteur/Musicien", "artist_musician","https://zupimages.net/up/19/18/3ltf.png", "Acapella, Afrobeat, Batrelaky, Reggae-muffin, Reggaeton ...")}
                    {generatorThematicCard("Beatmaking", "beatmaker","https://zupimages.net/up/19/18/3ltf.png", "Jazz, Pop, Rnb, Rap, Coupé-Décalé ...")}
                    {generatorThematicCard("Spécialiste de l’audiovisuel", "audiovisual_specialist","https://zupimages.net/up/19/18/3ltf.png", "Monteur vidéoclip, Cameraman, Photographes, Réalisateur clip vidéo ...")}
                    {/*{generatorThematicCard("Spectacles enfants", "https://zupimages.net/up/19/18/3ltf.png", "Clown")}*/}
                </div>
            </div>
            {/* End thematics */}
        </div>
    )
};
