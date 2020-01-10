import React from "react";
import ReactTooltip from "react-tooltip";

export const EventAndThematics = () => {

    function generatorEventCard(position_name, title, desc, image) {
        return (
            <div className={position_name}>
                <div className="card-image">
                    <img alt={title} src={image} />
                </div>
                <div className="card-text text-center">
                    <h3 className="text-red pb-2">{title}</h3>
                    <small className="bolder">{desc}</small>
                    <button className="btn btn-outline-info mt-2" data-tip="Cliquer moi pour voir les prestations de cette évenement">Les prestations</button>
                </div>
            </div>
        );
    }

    function generatorThematicCard(name, image, desc) {
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
                <button className="btn btn-outline-info relative align-middle" data-tip="Cliquer moi pour voir les prestation de cette univer">Les prestations</button>
            </div>
        )
    }

    return () => {
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
                        {generatorEventCard("card-left", "Mariage", "L'artiste fait un show dans un mariage", "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-top", "Fête traditionnelle", "Show dans une fête tratditionnelle comme les fetes de famille. Ex: Circoncision ou autres", "https://images.pexels.com/photos/1011334/pexels-photo-1011334.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-right", "Anniversaire", "Animer votre anniversaire", "https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-right", "Show-case", "Show case dans votre entreprise, boîte ou autres", "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-right", "Festival & défilé", "Animer un festival de votre ville ou national", "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-bottom", "Événement sportif", "Animer votre evenement de type sportif", "https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&h=750&w=126")}
                        {generatorEventCard("card-top", "Montage vidéo", "Reserver pour une reslisation de clip ou montage video", "https://images.pexels.com/photos/279376/pexels-photo-279376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-bottom", "Évènement d’entreprise", "Animer votre salons, Congrès, expositions, gala, lancement, réception, team building ou autres", "https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-top", "Évènement associative", "Animer un evenement dans votre association", "https://images.pexels.com/photos/585581/pexels-photo-585581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-bottom", "Création d’instrumentale", "Permettra de commander un instrumental specialement pour vous", "https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-left", "Information", "D'autres sont en train d'etre créer, ne vous inquieter pas si vous ne trouvez pas tout", "https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                        {generatorEventCard("card-right", "Proposition", "Vous pouvez nous proposer des evenement si cela vous semble utile en cliquant sur cette carte", "https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
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
                        {generatorThematicCard("Cirque/Arts de la rue", "https://zupimages.net/up/19/18/3ltf.png", "acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur ...")}
                        {generatorThematicCard("Comédiens", "https://zupimages.net/up/19/18/3ltf.png", "Burlesque, Comédie, Conteur, Humoriste, expérimental ...")}
                        {generatorThematicCard("DJ", "https://zupimages.net/up/19/18/3ltf.png", "Animateur, Mix, Live set, DJ Set")}
                        {generatorThematicCard("Danseurs", "https://zupimages.net/up/19/18/3ltf.png", "Tango, kilalaky, batrelaky, Ndombolo, Kizomba ...")}
                        {generatorThematicCard("Magiciens", "https://zupimages.net/up/19/18/3ltf.png", "Close-ups, Mentalistes, Prestidigitateurs ...")}
                        {generatorThematicCard("Chanteur/Musicien", "https://zupimages.net/up/19/18/3ltf.png", "Acapella, Afrobeat, Batrelaky, Reggae-muffin, Reggaeton ...")}
                        {generatorThematicCard("Beatmaking", "https://zupimages.net/up/19/18/3ltf.png", "Jazz, Pop, Rnb, Rap, Coupé-Décalé ...")}
                        {generatorThematicCard("Spécialiste de l’audiovisuel", "https://zupimages.net/up/19/18/3ltf.png", "Monteur vidéoclip, Cameraman, Photographes, Réalisateur clip vidéo ...")}
                        {generatorThematicCard("Spectacles enfants", "https://zupimages.net/up/19/18/3ltf.png", "Clown")}
                    </div>
                </div>
                {/* End thematics */}
            </div>
        )
    }
};
