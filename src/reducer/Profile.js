const initState = {
    profile_info: '',
    albums: [],
    single: [],
    beats: []
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PROFILE_INFO":
            return {
                ...state,
                profile_info: action.data
            };
        case "ADD_ALBUMS":
            return {
                ...state,
                albums: action.data
            };
        case "ADD_SINGLE":
            return {
                ...state,
                single: action.data
            };
        case "ADD_BEATS":
            return {
                ...state,
                beats: action.data
            };
        default:
            return state;
    }
};

export default profileReducer;
