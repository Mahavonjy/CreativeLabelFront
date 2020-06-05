import axios from "axios";
import React from "react";
// import Modal from "react-awesome-modal";
import Modal from '@material-ui/core/Modal'
import Select from "react-select";
import {toast} from "react-toastify";
import ReactTooltip from "react-tooltip";
import {
    addFilterPricing,
    addKantoBizSearchResults,
    addSearchLoading,
    changeEventsToSearch,
} from "../functionTools/functionProps";
import {generatePagination, onChangeListWithValueLabel, shuffleArray} from "../functionTools/tools";
import Results from "./prestations/results/results";
import KantoTabs from './tabs';
import { InputLabel, FormControl, NativeSelect } from '@material-ui/core'
import red from "@material-ui/core/colors/red";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const defaultMaterialTheme = createMuiTheme({
    overrides: {
        MuiNativeSelect: {
            select: {
                color: 'white',
                textDecoration: 'black',
            },
            root: {
                borderBottom: '2px solid red',
                '&.focus': {
                    borderButtom: '2px solid white'
                },
                textDecoration:'white'
            },
            input: {
                color: 'white',


            },
            icon: {
                color: 'white',
            }
        },
        MuiInputLabel:{
            root:{
                color:"white"
            }
        }
    },
    palette:{
        primary:red
    }

});



export const EventAndThematics = (
    headers,
    dispatch,
    setStateResult,
    displayOne,
    setShow,
    show,
    listOfEvents,
    setEvents,
    events,
    thematics,
    setThematics,
    lightModeOn
) => {

    const searchService = async (key, value) => {
        await dispatch(addSearchLoading(true));
        if (key === "events")
            dispatch(changeEventsToSearch(value));
        axios.get("api/service_search/moment/" + key + "/" + value, {headers: headers}).then(
            async (resp) => {
                let data = resp.data;
                if (data.length >= 2) {
                    await dispatch(addFilterPricing({
                        "min": resp.data[0]["price"],
                        "max": resp.data[resp.data.length - 1]["price"]
                    }));
                    data = shuffleArray(data);
                }
                // await dispatch(changeInitialized(false));
                await setStateResult(generatePagination(data, displayOne));
                await dispatch(addKantoBizSearchResults(data));
                await dispatch(addSearchLoading(false));
                if (data.length === 0) toast.warn("Pas de prestations trouvées");
                else await Results.onScrollViewSearch();
            })
    };

    const generatorCard = (position_name, key, title, desc, image, params) => {
        return (
            <div className={
                lightModeOn
                    ? (position_name + " theme-light")
                    : (position_name + " theme-dark")
            } style={{margin: "20px"}}>
                <div className="card-image">
                    <img alt={title} src={image}/>
                </div>
                <div className="card-text text-center">
                    <h4 className="text-red">{title}</h4>
                    <small className={lightModeOn ? "text-black" : "text-white"}>{desc}</small>
                    {params ?
                        <button className="btn btn-outline-info mt-1" onClick={() => {
                            setThematics(key);
                            setShow(true)
                        }} data-tip="Cliquer moi pour voir les prestations de cette univer">
                            Les prestations
                        </button> :
                        <button className="btn btn-outline-info mt-1" onClick={() => searchService("events", key)}
                                data-tip="Cliquer moi pour voir les prestations de cette évenement">
                            Les prestations
                        </button>}
                </div>
            </div>
        );
    };

    return (
        <div className="p-b-100">
            <ReactTooltip/>
            <Modal visible={show} width="400" height="auto" animationType='slide'>
                <div className="form-material"
                     style={{border: "2px solid red", borderRadius: "5px", marginTop: "-130px"}}>
                    <button className="ModalClose" onClick={(e) => setShow(false)} style={{margin: "2px"}}>
                        <i className="icon-close s-24" style={{color: "orange"}}/>
                    </button>
                    <div className="col text-center">
                        <div className="body">
                            <h3 className="text-light pt-5 mb-3">Vous le voulez pour quelle genre d'evenements ?</h3>
                            {/* <Select options={listOfEvents} placeholder="Choisir l'évenements"
                                onChange={obj => {
                                    onChangeListWithValueLabel(setEvents, obj, dispatch, changeEventsToSearch)
                                }} /> */}
                            <ThemeProvider theme={defaultMaterialTheme}  >
                                <FormControl style={{margin:'10px'}}>
                                    <InputLabel id="demo-dialog-select-label" >Choisir l'évenements</InputLabel>
                                    <NativeSelect
                                        value={listOfEvents.value}
                                        placeholder="Choisir un pays"
                                        onChange={obj => {
                                            onChangeListWithValueLabel(setEvents, obj, dispatch, changeEventsToSearch)
                                        }}
                                        // className={classes.select}
                                        // classes={{ icon: classes.icon }}
                                        inputProps={{
                                            name: 'events',
                                            id: 'age-native-helper',
                                        }}

                                    >
                                        <option value="" />
                                        {
                                            listOfEvents.map((data) => ([
                                                <option key={data.value} value={data.value}
                                                    style={{ color: 'black' }}>{data.label}</option>
                                            ]))
                                        }

                                    </NativeSelect>
                                </FormControl>
                            </ThemeProvider>
                            <button className="btn btn-outline-success btn-sm pl-5 pr-5 mt-4" style={{ marginBottom: '5px' }}
                                onClick={() => {
                                    if (events) {
                                        setShow(false);
                                        searchService("thematics", thematics).then(r => null);
                                    } else toast.error("Veuillez selectionner l'evenement")
                                }}>Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
            {/* Type of Events */}
            <div className="pt-5">
                <KantoTabs
                    headerColor={lightModeOn ? 'white' : 'black'}
                    tabs={[
                        {
                            tabName: (
                                < div>
                                    <h1 className="mb-2 text-primary">Nos Evenements</h1>
                                    <p className={lightModeOn ? "text-black" : "text-white"}>
                                        Voici tout les differentes evenements dans KantoBiz
                                    </p>
                                </div>
                            ),
                            tabContent: (
                                <div className="card-container">
                                    {generatorCard(
                                        "card-left",
                                        "Mariage",
                                        "Mariage",
                                        "Un show pour vous rien que pour vous",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-top",
                                        "Fête traditionnelle",
                                        "Fête traditionnelle",
                                        "Un évènement particulier, des artistes particuliers",
                                        "https://images.pexels.com/photos/1011334/pexels-photo-1011334.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-right",
                                        "Anniversaire",
                                        "Anniversaire",
                                        "Allumez le feu lors de votre anniversaire",
                                        "https://images.pexels.com/photos/701855/pexels-photo-701855.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-right",
                                        "Show-case",
                                        "Show-case",
                                        "Pour une animation réussie",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-right",
                                        "Festival et défilé",
                                        "Festival & défilé",
                                        "L'expérience musicale qui vous transcende",
                                        "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-bottom",
                                        "Événement sportif",
                                        "Événement sportif",
                                        "Sport & Musique comme Roméo & Juliette",
                                        "https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&h=750&w=126")}
                                    {generatorCard(
                                        "card-top",
                                        "Montage vidéo",
                                        "Montage vidéo",
                                        "Pour un service personnalisé en montage vidéo",
                                        "https://images.pexels.com/photos/279376/pexels-photo-279376.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-right",
                                        "Évènement d’entreprise",
                                        "Évènement d’entreprise",
                                        "Animer un salon, un congrès, une exposition, un gala, un évènement de lancement, une réception, un team building, etc...",
                                        "https://images.pexels.com/photos/997725/pexels-photo-997725.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-top",
                                        "Évènement associative",
                                        "Évènement associative",
                                        "Pour un évènement associatif réussi",
                                        "https://images.pexels.com/photos/585581/pexels-photo-585581.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                    {generatorCard(
                                        "card-right",
                                        "Création d’instrumentale",
                                        "Création d’instrumentale",
                                        "Des beatmakers à votre disposition pour créer des instrus personnalisés ",
                                        "https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260")}
                                </div>
                            )
                        }, {
                            tabName: (
                                <div>
                                    <h1 className="mb-2 text-primary">Nos Thematiques/Univers</h1>
                                    <p className={lightModeOn ? "text-black" : "text-white"}>
                                        Voici tout les differentes univers dans KantoBiz
                                    </p>
                                </div>
                            ),
                            tabContent: (
                                <div className="card-container">
                                    {generatorCard(
                                        "card-left",
                                        "street_artists",
                                        "Cirque/Arts de la rue" ,
                                        "acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-top",
                                        "street_artists",
                                        "Cirque/Arts de la rue",
                                        "acrobate, clown, cracheur de feu, dompteur Equilibriste, jongleur ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true
                                        )}
                                    {generatorCard(
                                        "card-right",
                                        "comedian",
                                        "Comédiens" ,
                                        "Burlesque, Comédie, Conteur, Humoriste, expérimental ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}

                                    {generatorCard(
                                        "card-right",
                                        "dj",
                                        "DJ",
                                        "Animateur, Mix, Live set, DJ Set",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-right",
                                        "dancers",
                                        "Danseurs",
                                        "Tango, kilalaky, batrelaky, Ndombolo, Kizomba ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-bottom",
                                        "magician",
                                        "Magiciens",
                                        "Close-ups, Mentalistes, Prestidigitateurs ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-top",
                                        "artist_musician",
                                        "Chanteur/Musicien",
                                        "Acapella, Afrobeat, Batrelaky, Reggae-muffin, Reggaeton ...",
                                        "https://images.pexels.com/photos/668295/pexels-photo-668295.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-right",
                                        "beatmaker",
                                        "Beatmaking",
                                        "Jazz, Pop, Rnb, Rap, Coupé-Décalé ...",
                                        "https://images.pexels.com/photos/220072/pexels-photo-220072.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                    {generatorCard(
                                        "card-top",
                                        "audiovisual_specialist",
                                        "Spécialiste de l’audiovisuel",
                                        "Monteur vidéoclip, Cameraman, Photographes, Réalisateur clip vidéo ...",
                                        "https://images.pexels.com/photos/532561/pexels-photo-532561.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
                                        true)}
                                </div>
                            )
                        }
                    ]
                    }
                />
            </div>
        </div>
    )
};
