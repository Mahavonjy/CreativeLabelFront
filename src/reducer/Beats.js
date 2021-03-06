const initState = {
    beats: [], top_beatmaker: [],
    top_beats: [], latest_beats: [],
    discovery_beats: [], new_beatMaker: [],
    isl_playlist: [], ready: false,
    ready_top_beats: false, ready_latest_beats: false,
    ready_discovery_beats: false, ready_isl_playlist: false,
    beat_maker_beats: [], other_beat_maker_beats: [], beats_similar: []
};

const beatsReducer = (state = initState, action) => {
    switch (action.type) {
        case "TOP_BEATS_READY":
            return {
                ...state,
                ready_top_beats: true
            };
        case "LATEST_BEATS_READY":
            return {
                ...state,
                ready_latest_beats: true
            };
        case "DISCOVERY_BEATS_READY":
            return {
                ...state,
                ready_discovery_beats: true
            };
        case "ISL_BEATS_READY":
            return {
                ...state,
                ready_isl_playlist: true
            };
        case "BEATS_READY":
            return {
                ...state,
                ready: true
            };
        case "ADD_BEATS":
            return {
                ...state,
                beats: action.data
            };
        case "ADD_LATEST_BEATS":
            return {
                ...state,
                latest_beats: action.data
            };
        case "ADD_BEAT_MAKER_BEATS":
            return {
                ...state,
                beat_maker_beats: action.data
            };
        case "ADD_OTHER_BEAT_MAKER_BEATS":
            return {
                ...state,
                other_beat_maker_beats: action.data
            };
        case "ADD_TOP_BEATMAKER":
            return {
                ...state,
                top_beatmaker: action.data
            };
        case "ADD_NEW_BEATMAKER":
            return {
                ...state,
                new_beatMaker: action.data
            };
        case "ADD_TOP_BEATS":
            return {
                ...state,
                top_beats: action.data
            };
        case "ADD_BEATS_SIMILAR":
            return {
                ...state,
                beats_similar: action.data
            };
        case "UPDATE_SIMILAR_BEATS":
            for (let row in state.beats_similar) {
                if (parseInt(row) === parseInt(action.data.index)) state.beats_similar[row]['link'] = action.data.link
            }
            return {
                ...state,
                beats_similar: [...state.beats_similar]
            };
        case "UPDATE_OTHER_BEAT_MAKER_BEATS":
            for (let row in state.other_beat_maker_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.other_beat_maker_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                other_beat_maker_beats: [...state.other_beat_maker_beats]
            };
        case "UPDATE_BEATS_LIST":
            for (let row in state.beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                beats: [...state.beats]
            };
        case "UPDATE_LATEST_BEATS_LIST":
            for (let row in state.latest_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.latest_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                latest_beats: [...state.latest_beats]
            };
        case "UPDATE_BEAT_MAKER_BEATS":
            for (let row in state.beat_maker_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.beat_maker_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                beat_maker_beats: [...state.beat_maker_beats]
            };
        case "UPDATE_TOP_BEATS_LIST":
            for (let row in state.top_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.top_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                top_beats: [...state.top_beats]
            };
        case "ADD_DISCOVERY_BEATS":
            return {
                ...state,
                discovery_beats: action.data
            };
        case "UPDATE_DISCOVERY_BEATS_LIST":
            for (let row in state.discovery_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.discovery_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                discovery_beats: [...state.discovery_beats]
            };
        case "ADD_ISL_PLAYLIST":
            return {
                ...state,
                isl_playlist: action.data
            };
        case "UPDATE_ISL_PLAYLIST_LIST":
            for (let row in state.isl_playlist) {
                if (parseInt(row) === parseInt(action.data.index)) state.isl_playlist[row]['link'] = action.data.link
            }
            return {
                ...state,
                isl_playlist: [...state.isl_playlist]
            };

        default:
            return state;
    }
};

export default beatsReducer;
