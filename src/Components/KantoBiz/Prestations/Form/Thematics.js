import React, { Component } from "react";
import {connect} from "react-redux";
const audioVisualOptions =
    [
        'Monteur vidéoclip', 'Cameraman', 'Photographes', 'Réalisateur clip vidéo', 'autres'
    ];
const beatMakerOptions =
    [
        'Acapella', 'Afrobeat', 'Blues', 'Breakbeat', 'Classique', 'Dancehall', 'Electronica', 'Folk', 'Metal', 'Funk',
        'Gospel', 'House', 'Jazz', 'Pop', 'Slam', 'Swing', 'Soul', 'Rap', 'Reggae', 'Rock', 'Rumba', 'Samba',
        'Vakondrazana', 'Rumba', 'Kilalaky', 'Rnb', 'Ndombolo', 'Basesa', 'Hira gasy', 'Batrelaky', 'Reggae-muffin',
        'Reggaeton', 'Remix', 'Goma', 'Kuduro', 'Afro-trap', 'Kawitri', 'Malesa', 'Tsapiky', 'Zafindraona', 'Slow', 'Coupé-Décalé'
    ];
const ChantMusicOptions =
    [
        'Acapella', 'Afrobeat', 'Blues', 'Breakbeat', 'Classique', 'Dancehall', 'Electronica', 'Folk', 'Metal', 'Funk',
        'Gospel', 'House', 'Jazz', 'Pop', 'Slam', 'Swing', 'Soul', 'Rap', 'Reggae', 'Rock', 'Rumba', 'Samba',
        'Vakondrazana', 'Rumba', 'Kilalaky', 'Rnb', 'Ndombolo', 'Basesa', 'Hira gasy', 'Batrelaky', 'Reggae-muffin',
        'Reggaeton', 'Remix', 'Goma', 'Kuduro', 'Afro-trap', 'Kawitri', 'Malesa', 'Tsapiky', 'Zafindraona', 'Slow', 'Coupé-Décalé'
    ];
const cirqueOrChildOptions =
    [
        'acrobate', 'clown', 'cracheur de feu', 'dompteur Equilibriste', 'jongleur', 'marionnettiste', 'mime', 'autre'
    ];
const comedyOptions =
    [
        'Burlesque', 'Comédie', 'Conteur', 'Drame', 'expérimental', 'Humoriste', 'imitateur', 'Stand up', 'autre'
    ];
const djOptions =
    [
        'Animateur', 'Mix', 'Live set',' DJ Set'
    ];
const DanceOptions =
    [
        'Bachata', 'cabaret', 'capoeira', 'chachacha', 'classique', 'contemporain', 'ethnique', 'expérimental', 'hip hop',
        'Improvisation', 'Jazz', 'Kizomba', 'Moderne', 'Oriental', 'Salsa', 'Samba', 'Tango', 'kilalaky', 'batrelaky',
        'salegy', 'Ndombolo', 'Vakondrazana', 'zouk', 'Kawitri', 'Maloya', 'Kompas', 'autre'
    ];
const magicianOptions =
    [
        'Close-ups', 'Mentalistes', 'Prestidigitateurs', 'autre'
    ];
let that;

class Thematics extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMounted: false,
            options: [],
            thematics_options_selected: this.props.thematics_options_selected
        };
        that = this
    }

    addOption = (val, index) => {
        this.state.options.splice(index, 1);
        this.setState(prevState => ({thematics_options_selected: [...prevState.thematics_options_selected, val]}), () => {
            this.props.addOptionSelected(this.state.thematics_options_selected)
        })
    };

    removeOption = (val, index) => {
        this.state.thematics_options_selected.splice(index, 1);
        this.setState(prevState => ({options: [...prevState.options, val]}), () => {
            this.props.addOptionSelected(this.state.thematics_options_selected)
        })
    };

    static validation () {
        if (that.state.thematics_options_selected.length !== 0)
            return {"error": false};
        return {"error": true, "message": "veuillez choisir au moins un genre "}
    };

    componentDidMount() {
        this.setState({ isMounted: true}, () => {
            const artistType = this.props.artistType;
            let options_state = {...this.state.options};
            if (artistType === "Dj") options_state = djOptions;
            else if (artistType === "Magiciens") options_state = magicianOptions;
            else if (artistType === "Danseurs") options_state = DanceOptions;
            else if (artistType === "Comédiens") options_state = comedyOptions;
            else if (artistType === "Cirque/Artistes de la Rue") options_state = cirqueOrChildOptions;
            else if (artistType === "Chanteur/Musicien") options_state = ChantMusicOptions;
            else if (artistType === "Beatmaker") options_state = beatMakerOptions;
            else if (artistType === "Spécialiste de l’audiovisuel")  options_state = audioVisualOptions;
            options_state.filter(option => !this.props.thematics_options_selected.some(selected => selected === option));
            this.setState({options: options_state});
        })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    render() {
        return (
            <div className="Base">
                <div className="card mb-3" style={{height: 438}}>
                    <div className="card-header transparent b-b">
                        <strong className="text-red">Précisez nous votre style</strong>
                    </div>
                    <div className="row">
                        <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 400}}>
                            <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Options</h4>
                            <div className="overflow-auto row justify-content-center" style={{maxHeight: 350}}>
                                {this.state.options.map((val, index) =>
                                    <span key={index} className="bg-brown m-1 text-center"
                                          style={{borderRadius: 10, width: 142, maxHeight: 21, cursor: "copy"}}
                                          onClick={() => this.addOption(val, index)}>{val}
                                    </span>
                                )}
                            </div>
                        </div>
                        <i className="icon icon-more-2 s-36 text-red ml-2 mr-2 d-none d-sm-block" style={{paddingTop: 180}}/>
                        <div className="col border" style={{borderRadius: 10, background: "#58585a", height: 400}}>
                            <h4 className="text-red pt-3" style={{borderBottom: "2px solid black"}}>Choisis</h4>
                            <div className="overflow-auto row justify-content-center" style={{maxHeight: 350, cursor: "not-allowed"}}>
                                {this.state.thematics_options_selected.map((val, index) =>
                                    <span key={index} className="bg-brown m-1 text-center"
                                          style={{borderRadius: 10, width: 142, maxHeight: 21}}
                                          onClick={() => this.removeOption(val, index)}>{val}
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
}

const mapStateToProps = state => {
    return {
        thematics_options_selected: state.KantoBizForm.thematics_options_selected,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addOptionSelected: (data) => {
            dispatch({type: "ADD_THEMATICS_GENRE_SELECTED", data: data})
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Thematics);
