const initState = {
    PlayList: [],
    PlaListInfo : ''
};

const playerReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PLAYLIST":
            return {
                PlayList: action.data
            };
        case "ADD_PLAYLIST_INFO":
            return {
                PlaListInfo: action.data
            };
        default:
            return state;
    }
};

export default playerReducer;
