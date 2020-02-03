import { exOptions, exService } from "./Exemples"

const initState = {
    options: exOptions, // option of user logged
    prestations: exService, // service of user logged
    other_user_options: exOptions, // option of user not logged
    other_user_prestations: exService, // service of user not logged
};

const profilePrestations = (state = initState, action) => {
    switch (action.type) {
        case "ADD_OTHER_USER_OPTIONS":
            return {
                ...state,
                other_user_options: action.data
            };
        case "ADD_OTHER_USER_PRESTATIONS":
            return {
                ...state,
                other_user_prestations: action.data
            };
        case "ADD_USER_OPTIONS":
            return {
                ...state,
                options: action.data
            };
        case "ADD_USER_PRESTATIONS":
            return {
                ...state,
                prestations: action.data
            };
        default:
            return state;
    }
};

export default profilePrestations;
