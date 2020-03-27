const initState = {
    results: [],
    service_to_show: {},
    loading: false,
    ResultsPage: false,
    filter_price: {"min": 0, "max": 0},
    filter_events_selected: [],
    EventAndThematics: true
};

const KantoBizSearchResults = (state = initState, action) => {
    switch (action.type) {
        case "ADD_KANTOBIZ_RESULTS":
            return {
                ...state,
                results: action.data
            };
        case "ADD_LOADING_SEARCH":
            return {
                ...state,
                loading: action.data
            };
        case "ADD_FILTER_PRICING":
            return {
                ...state,
                filter_price: action.data
            };
        case "ADD_SERVICE_TO_SHOW":
            return {
                ...state,
                service_to_show: action.data
            };
        case "ADD_FILTER_EVENTS_SELECTED":
            return {
                ...state,
                filter_events_selected: action.data
            };
        case "ACTIVE_RESULTS_PAGE":
            return {
                ...state,
                ResultsPage: true,
                EventAndThematics: false,
            };
        case "ACTIVE_EVENT_AND_THEMATICS_PAGE":
            return {
                ...state,
                ResultsPage: false,
                EventAndThematics: true
            };

        default:
            return state;
    }
};

export default KantoBizSearchResults;
