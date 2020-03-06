const initState = {
    dateKey: "",
    tmpArtistTypeSelected: "",
    becomeArtistForm: false,
    artist_types: [],
    country_allowed: [],
    events_allowed: [],
    prestationCopy: [],
    optionsCopy: [],
    materialsCopy: [],
    ifUserGenreSelected: false,
};

const Others = (state = initState, action) => {
    switch (action.type) {
        case "IF_USER_GENRE_SELECTED":
            return {
                ...state,
                ifUserGenreSelected: true
            };
        case "ADD_ALL_EVENTS_TYPES":
            return {
                ...state,
                events_allowed: action.data
            };
        case "ADD_CURRENT_DATE_KEY":
            return {
                ...state,
                dateKey: action.data
            };
        case "ADD_MATERIALS_COPY":
            return {
                ...state,
                materialsCopy: action.data
            };
        case "ADD_SERVICES_COPY":
            return {
                ...state,
                prestationCopy: action.data
            };
        case "ADD_OPTIONS_COPY":
            return {
                ...state,
                optionsCopy: action.data
            };
        case "ADD_ALL_ARTIST_TYPE":
            return {
                ...state,
                artist_types: action.data
            };
        case "ADD_ALL_COUNTRY_ALLOWED":
            return {
                ...state,
                country_allowed: action.data
            };
        case "ADD_TMP_ARTIST_SELECTED":
            return {
                ...state,
                tmpArtistTypeSelected: action.data
            };
        case "DISPLAY_BECOME_ARTIST_FORM":
            return {
                ...state,
                becomeArtistForm: action.data
            };
        default:
            return state;
    }
};

export default Others;
