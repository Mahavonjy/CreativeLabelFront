const initState = {
    beats: [],
    top_beatmaker: [],
    top_beats: [],
    latest_beats: [],
    discovery_beats: [],
    new_beatMaker: [],
    isl_playlist: [],
    ready: false,
    ready_top_beats: false,
    ready_latest_beats: false,
    ready_discovery_beats: false,
    ready_isl_playlist: false
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
        case "UPDATE_BEATS_LIST":
            for (let row in state.beats) {
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.beats[row]['link'] = action.data.link
                }
            }
            return {
                ...state,
                beats: [...state.beats]
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
        case "UPDATE_TOP_BEATS_LIST":
            for (let row in state.top_beats) {
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.top_beats[row]['link'] = action.data.link
                }
            }
            return {
                ...state,
                top_beats: [...state.top_beats]
            };
        case "ADD_LATEST_BEATS":
            return {
                ...state,
                latest_beats: action.data
            };
        case "UPDATE_LATEST_BEATS_LIST":
            for (let row in state.latest_beats) {
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.latest_beats[row]['link'] = action.data.link
                }
            }
            return {
                ...state,
                latest_beats: [...state.latest_beats]
            };
        case "ADD_DISCOVERY_BEATS":
            return {
                ...state,
                discovery_beats: action.data
            };
        case "UPDATE_DISCOVERY_BEATS_LIST":
            for (let row in state.discovery_beats) {
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.discovery_beats[row]['link'] = action.data.link
                }
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
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.isl_playlist[row]['link'] = action.data.link
                }
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
