const initState = {
    profile_info: '', albums: [], single: [], beats: [], contract: '',
    role: '', follower: '', following: '', pricing_beats: ''
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
        case "ADD_CONTRACT":
            return {
                ...state,
                contract: action.data
            };
        case "ADD_ROLE":
            return {
                ...state,
                role: action.data
            };
        case "ADD_FOLLOWER":
            return {
                ...state,
                follower: action.data
            };
        case "ADD_FOLLOWING":
            return {
                ...state,
                following: action.data
            };
        case "ADD_PRICING":
            return {
                ...state,
                pricing_beats: action.data
            };
        default:
            return state;
    }
};

export default profileReducer;
