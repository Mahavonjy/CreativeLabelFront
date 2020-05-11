const initState = {
    PlayList: [],
    user_credentials: {},
    AllMediaGenre: [],
    PrefAllMediaGenre: [],
    PlaListInfo : null,
    playMusic: false,
    redirect: false,
    loading: false,
    toastGlobal: true,
    auth: false,
    lightModeOn : false
};

const PlaylistHomeReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER_CREDENTIALS":
            return {
                ...state,
                user_credentials: action.data
            };
        case "ADD_ALL_MEDIA_GENRE":
            return {
                ...state,
                AllMediaGenre: action.data
            };
        case "ADD_ALL_MEDIA_GENRE_PREF":
            return {
                ...state,
                PrefAllMediaGenre: action.data
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
        case "SET_TOAST_GLOBAL":
            return {
                ...state,
                toastGlobal: action.data
            };
        case "ACTIVE_THEME_LIGHT":
            return {
                ...state,
                lightModeOn: !state.lightModeOn
            }
        default:
            return state;
    }
};

export default PlaylistHomeReducer;
