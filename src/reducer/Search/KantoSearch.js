const initState = {
    date_to_search: new Date(),
    city_to_search: "",
    country_to_search: "",
    thematics_to_search: [],
    events_to_search: "",
};

const KantoBizSearch = (state = initState, action) => {
    switch (action.type) {
        case "ADD_DATE_TO_SEARCH":
            return {
                ...state,
                date_to_search: action.data
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
