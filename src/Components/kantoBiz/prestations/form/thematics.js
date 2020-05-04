import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactTooltip from 'react-tooltip';
import { addOptionSelected } from "../../../functionTools/functionProps";

function Thematics(props) {

    const dispatch = useDispatch();
    const artist_types = useSelector(state => state.Others.artist_types);
    const tmpArtistTypeSelected = useSelector(state => state.Others.tmpArtistTypeSelected);
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
            const artistType = props.var.artistType !== "professional_auditor" ? props.var.artistType : tmpArtistTypeSelected;
            let options_state = artist_types[artist_types.findIndex(tmp => tmp.name === artistType)]['description'];
            setOptions(options_state.filter(option => !props_thematics_options_selected.some(selected => selected === option)));
        } catch (e) {
            //
        }

        return () => {
            isMounted.current = true
        };
        /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, []);

    return (
        <div className="Base card mb-3">
            <div className="card-header transparent b-b">
                <strong className="text-red">Quelques sous-catégories pour ma thématique</strong>
            </div>
            <ReactTooltip/>
            <div className="row overflow-auto scrollbar-isl" style={{height: 300}}>
                <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 250}}>
                    <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Choisir parmi les options&nbsp;<i className="icon icon-info text-red" data-tip="Sélectionner vos spécialités en accord avec la thématique"/></h4>
                    <div className="overflow-auto row justify-content-center" style={{maxHeight: 200}} data-tip="Veuillez cliquer pour l'ajouter">
                        {options.map((val, index) =>
                            <span key={index} className="bg-brown m-1 text-center"
                                  style={{borderRadius: 10, width: 142, maxHeight: 21, cursor: "copy"}}
                                  onClick={() => addOption(val, index)}>{val}
                            </span>
                        )}
                    </div>
                </div>
                <i className="icon icon-more-2 s-36 text-red ml-2 mr-2 d-none d-sm-block" style={{paddingTop: 120}}/>
                <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 250}}>
                    <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Mes choix&nbsp;<i className="icon icon-info text-red" data-tip="La liste des spécialités que vous avez choisi en accord avec la thématique"/></h4>
                    <div className="overflow-auto row justify-content-center" style={{maxHeight: 200, cursor: "not-allowed"}} data-tip="Veuillez cliquer pour le supprimer">
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
    );
}

export default Thematics;
