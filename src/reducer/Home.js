const initState = {
    PlayList: [],
    PlaListInfo : null,
    playMusic: false,
    redirect: false,
    loading: false
};

const PlaylistHomeReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST_INFO":
            return {
                ...state,
                PlaListInfo: action.data
            };
        case "ADD_PLAYLIST":
            return {
                ...state,
                PlayList: action.data
            };
        case "ACTIVE_OR_NO_PLAYER":
            return {
                ...state,
                playMusic: !state.playMusic
            };
        case "ACTIVE_OR_NO_REDIRECT":
            return {
                ...state,
                redirect: !state.redirect
            };
        case "ACTIVE_OR_NO_LOADING":
            return {
                ...state,
                loading: !state.loading
            };
        default:
            return state;
    }
};

export default PlaylistHomeReducer;
