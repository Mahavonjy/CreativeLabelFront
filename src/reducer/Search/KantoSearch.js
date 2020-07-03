const initState = {
    date_to_search: new Date(),
    city_to_search: "",
    reservation_code_postal: "",
    reservation_rue: "",
    reservation_ville: "",
    country_to_search: "",
    thematics_to_search: [],
    events_to_search: "",
    list_of_options_added: [],
    // initialized: false,
};

const KantoBizSearch = (state = initState, action) => {
    switch (action.type) {
        case "ADD_LIST_OF_OPTIONS_ADDED":
            return {
                ...state,
                list_of_options_added: action.data
            };
        case "ADD_DATE_TO_SEARCH":
            return {
                ...state,
                date_to_search: action.data
            };
        // case "CHANGE_INITIALIZED":
        //     return {
        //         ...state,
        //         initialized: action.data
        //     };
        case "RESERVATION_CODE_POSTAL":
            return {
                ...state,
                reservation_code_postal: action.data
            };
        case "RESERVATION_RUE":
            return {
                ...state,
                reservation_rue: action.data
            };
        case "RESERVATION_VILLE":
            return {
                ...state,
                reservation_ville: action.data
            };
        case "ADD_CITY_TO_SEARCH":
            return {
                ...state,
                city_to_search: action.data
            };
        case "ADD_COUNTRY_TO_SEARCH":
            return {
                ...state,
                country_to_search: action.data
            };
        case "ADD_THEMATICS_TO_SEARCH":
            return {
                ...state,
                thematics_to_search: action.data
            };
        case "ADD_EVENTS_TO_SEARCH":
            return {
                ...state,
                events_to_search: action.data
            };
        default:
            return state;
    }
};

export default KantoBizSearch;
