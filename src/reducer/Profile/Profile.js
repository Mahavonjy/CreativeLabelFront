const initState = {
    profile_info: '',
    albums: [],
    single: [],
    payment_accepted: [],
    payment_refunded: [],
    payment_history: [],
    reservations_list: [],
    reservations_booking_list: [],
    user_beats: [],
    conditions: {},
    contract: '',
    banking: {},
    role: '',
    notes: '',
    follower: '',
    following: '',
    pricing_beats: '',
    ready_beats: false,
    show_banking_details: false,
};

const profileReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_PROFILE_GLOBAL_CONDITION":
            return {
                ...state,
                conditions: action.data
            };
        case "ADD_USER_NOTES":
            return {
                ...state,
                notes: action.data
            };
        case "ADD_PAYMENT_HISTORY":
            return {
                ...state,
                payment_history: action.data
            };
        case "ADD_PAYMENT_ACCEPTED":
            return {
                ...state,
                payment_accepted: action.data
            };
        case "ADD_PAYMENT_REFUNDED":
            return {
                ...state,
                payment_refunded: action.data
            };
        case "ADD_ALL_USER_RESERVATION":
            return {
                ...state,
                reservations_list: action.data
            };
        case "ADD_ALL_USER_BOOKING_RESERVATION":
            return {
                ...state,
                reservations_booking_list: action.data
            };
        case "ADD_SHOW_BANKING_DETAILS":
            return {
                ...state,
                show_banking_details: action.data
            };
        case "ADD_PROFILE_BANKING_OWNER_INFO":
            return {
                ...state,
                banking: action.data
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
