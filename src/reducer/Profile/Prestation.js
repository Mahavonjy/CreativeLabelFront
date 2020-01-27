import { exOptions, exService } from "./Exemples"

const initState = {
    options: exOptions,
    prestations: exService
};

const profilePrestations = (state = initState, action) => {
    switch (action.type) {
        case "ADD_USER_OPTIONS":
            return {
                ...state,
                options: action.data
            };
        case "ADD_USER_PRESTATIONS":
            return {
                ...state,
                prestations: true
            };
        default:
            return state;
    }
};

export default profilePrestations;
