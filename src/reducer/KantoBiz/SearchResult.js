const initState = {
    results: [],
    ResultsPage: false,
    DisplayService: false,
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
        case "ADD_FILTER_EVENTS_SELECTED":
            return {
                ...state,
                filter_events_selected: action.data
            };
        case "ACTIVE_RESULTS_PAGE":
            return {
                ...state,
                ResultsPage: true,
                DisplayService: false,
                EventAndThematics: false,
            };
        case "ACTIVE_EVENT_AND_THEMATICS_PAGE":
            return {
                ...state,
                ResultsPage: false,
                DisplayService: false,
                EventAndThematics: true
            };
        case "ACTIVE_DISPLAY_SERVICE_PAGE":
            return {
                ...state,
                ResultsPage: false,
                DisplayService: true,
                EventAndThematics: false
            };

        default:
            return state;
    }
};

export default KantoBizSearchResults;
