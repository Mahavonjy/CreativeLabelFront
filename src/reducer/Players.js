const initState = {
    list: [], listInfo: ""
};

const playersReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_NEW_PLAYER_PLAYLIST":
            return {
                ...state,
                list: action.data
            };
        case "ADD_NEW_PLAYER_PLAYLIST_INFO":
            return {
                ...state,
                listInfo: action.data
            };
        default:
            return state;
    }
};

export default playersReducer;
