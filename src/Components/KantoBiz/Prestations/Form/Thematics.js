import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from 'react-tooltip';
import { addOptionSelected } from "../../../FunctionTools/FunctionProps";

const audioVisualOptions = [
        'Monteur vidéoclip', 'Cameraman', 'Photographes', 'Réalisateur clip vidéo', 'autres'
    ];

const beatMakerOptions = [
        'Acapella', 'Afrobeat', 'Blues', 'Breakbeat', 'Classique', 'Dancehall', 'Electronica', 'Folk', 'Metal', 'Funk',
        'Gospel', 'House', 'Jazz', 'Pop', 'Slam', 'Swing', 'Soul', 'Rap', 'Reggae', 'Rock', 'Rumba', 'Samba',
        'Vakondrazana', 'Rumba', 'Kilalaky', 'Rnb', 'Ndombolo', 'Basesa', 'Hira gasy', 'Batrelaky', 'Reggae-muffin',
        'Reggaeton', 'Remix', 'Goma', 'Kuduro', 'Afro-trap', 'Kawitri', 'Malesa', 'Tsapiky', 'Zafindraona', 'Slow', 'Coupé-Décalé'
    ];

const ChantMusicOptions = [
        'Acapella', 'Afrobeat', 'Blues', 'Breakbeat', 'Classique', 'Dancehall', 'Electronica', 'Folk', 'Metal', 'Funk',
        'Gospel', 'House', 'Jazz', 'Pop', 'Slam', 'Swing', 'Soul', 'Rap', 'Reggae', 'Rock', 'Rumba', 'Samba',
        'Vakondrazana', 'Rumba', 'Kilalaky', 'Rnb', 'Ndombolo', 'Basesa', 'Hira gasy', 'Batrelaky', 'Reggae-muffin',
        'Reggaeton', 'Remix', 'Goma', 'Kuduro', 'Afro-trap', 'Kawitri', 'Malesa', 'Tsapiky', 'Zafindraona', 'Slow', 'Coupé-Décalé'
    ];

const cirqueOrChildOptions = [
        'acrobate', 'clown', 'cracheur de feu', 'dompteur Equilibriste', 'jongleur', 'marionnettiste', 'mime', 'autre'
    ];

const comedyOptions = [
        'Burlesque', 'Comédie', 'Conteur', 'Drame', 'expérimental', 'Humoriste', 'imitateur', 'Stand up', 'autre'
    ];

const djOptions = [
        'Animateur', 'Mix', 'Live set',' DJ Set'
    ];

const DanceOptions = [
        'Bachata', 'cabaret', 'capoeira', 'chachacha', 'classique', 'contemporain', 'ethnique', 'expérimental', 'hip hop',
        'Improvisation', 'Jazz', 'Kizomba', 'Moderne', 'Oriental', 'Salsa', 'Samba', 'Tango', 'kilalaky', 'batrelaky',
        'salegy', 'Ndombolo', 'Vakondrazana', 'zouk', 'Kawitri', 'Maloya', 'Kompas', 'autre'
    ];

const magicianOptions = [
        'Close-ups', 'Mentalistes', 'Prestidigitateurs', 'autre'
    ];

function Thematics(props) {

    const dispatch = useDispatch();
    const props_thematics_options_selected = useSelector(state => state.KantoBizForm.thematics_options_selected);

    const isMounted = useRef(false);
    const [options, setOptions] = useState([]);
    const [thematics_options_selected, setThematicsOptionsSelected] = useState(props_thematics_options_selected);

    const addOption = (val, index) => {
        options.splice(index, 1);
        setThematicsOptionsSelected(thematics_options_selected => [...thematics_options_selected, val]);
        let tmp_props_thematics_options_selected = props_thematics_options_selected;
        tmp_props_thematics_options_selected.push(val);
        dispatch(addOptionSelected(tmp_props_thematics_options_selected))
    };

    const removeOption = async (val, index) => {
        await thematics_options_selected.splice(index, 1);
        setOptions(options => [...options, val]);
        dispatch(addOptionSelected(thematics_options_selected))
    };

    Thematics.validation = () => {
        if (thematics_options_selected.length !== 0)
            return {"error": false};
        return {"error": true, "message": "veuillez choisir au moins un genre "}
    };

    useEffect(() => {
        try {
            const artistType = props.var.artistType;
            let options_state = [...options];
            if (artistType === "Dj") options_state = djOptions;
            else if (artistType === "Magiciens") options_state = magicianOptions;
            else if (artistType === "Danseurs") options_state = DanceOptions;
            else if (artistType === "Comédiens") options_state = comedyOptions;
            else if (artistType === "Cirque/Artistes de la Rue") options_state = cirqueOrChildOptions;
            else if (artistType === "Chanteur/Musicien") options_state = ChantMusicOptions;
            else if (artistType === "Beatmaker") options_state = beatMakerOptions;
            else if (artistType === "Spécialiste de l’audiovisuel")  options_state = audioVisualOptions;
            options_state.filter(option => !props_thematics_options_selected.some(selected => selected === option));
            setOptions(options_state);
        } catch (e) {
            //
        }

        return () => {
            isMounted.current = true
        };
    }, []);

    return (
        <div className="Base">
            <div className="card mb-3" style={{height: 438}}>
                <div className="card-header transparent b-b">
                    <strong className="text-red">Précisez nous votre style</strong>
                </div>
                <ReactTooltip/>
                <div className="row">
                    <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 400}}>
                        <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Options&nbsp;<i className="icon icon-info text-red" data-tip="Les options sont les genres de prestations que vous pouvez realiser"/></h4>
                        <div className="overflow-auto row justify-content-center" style={{maxHeight: 350}} data-tip="Veuillez cliquer pour l'ajouter">
                            {options.map((val, index) =>
                                <span key={index} className="bg-brown m-1 text-center"
                                      style={{borderRadius: 10, width: 142, maxHeight: 21, cursor: "copy"}}
                                      onClick={() => addOption(val, index)}>{val}
                                    </span>
                            )}
                        </div>
                    </div>
                    <i className="icon icon-more-2 s-36 text-red ml-2 mr-2 d-none d-sm-block" style={{paddingTop: 180}}/>
                    <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 400}}>
                        <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Choisis&nbsp;<i className="icon icon-info text-red" data-tip="Les options placés sont ce que vous avez choisi, ce que vous voulez faire pour cette prestation"/></h4>
                        <div className="overflow-auto row justify-content-center" style={{maxHeight: 350, cursor: "not-allowed"}} data-tip="Veuillez cliquer pour le supprimer">
                            {thematics_options_selected.map((val, index) =>
                                <span key={index} className="bg-brown m-1 text-center"
                                      style={{borderRadius: 10, width: 142, maxHeight: 21}}
                                      onClick={() => removeOption(val, index)}>{val}
                                    <i className="icon icon-remove text-red align-middle ml-3"/>
                                    </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Thematics;
