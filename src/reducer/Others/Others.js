const initState = {
    tmpArtistTypeSelected: "", becomeArtistForm: false,
    artist_types: [], country_allowed: []
};

const Others = (state = initState, action) => {
    switch (action.type) {
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
