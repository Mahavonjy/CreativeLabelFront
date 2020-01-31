const initState = {
    profile_info: '',
    albums: [],
    single: [],
    user_beats: [],
    contract: '',
    role: '',
    follower: '',
    following: '',
    pricing_beats: '',
    ready_beats: false,
    week_days_and_week_end : {
        "Monday": true, "Tuesday": true, "Wednesday": true, "Thursday": true, "Friday": true, "Saturday": true, "Sunday": false
    }
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER_DAY_OF_AVAILABILITY":
            return {
                ...state,
                week_days_and_week_end: action.data
            };
        case "ADD_PROFILE_INFO":
            return {
                ...state,
                profile_info: action.data
            };
        case "SET_READY_BEATS_TO_TRUE":
            return {
                ...state,
                ready_beats: true
            };
        case "ADD_PROFILE_ALBUMS":
            return {
                ...state,
                albums: action.data
            };
        case "ADD_PROFILE_SINGLE":
            return {
                ...state,
                single: action.data
            };
        case "ADD_PROFILE_BEATS":
            return {
                ...state,
                user_beats: action.data
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
        case "UPDATE_PROFILE_BEATS":
            for (let row in state.user_beats) {
                if (parseInt(row) === parseInt(action.data.index)) state.user_beats[row]['link'] = action.data.link
            }
            return {
                ...state,
                user_beats: [...state.user_beats]
            };
        default:
            return state;
    }
};

export default profileReducer;
