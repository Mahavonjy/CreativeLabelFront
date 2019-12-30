const initState = {
    events_selected: [],
    service_time: 0,
    price_of_service: 0,
    preparation_time: 0,
    number_of_artist: 1,
    unit_time_of_preparation: {"day": false, "hours": false, "min": false, "sec": false},
    unit_time_of_service: {"day": false, "hours": false, "min": false, "sec": false}
};

const kantoBizForm = (state = initState, action) => {
    switch (action.type) {
        case "ADD_EVENTS_SELECTED":
            return {
                ...state,
                events_selected: action.data
            };
        case "ADD_SERVICE_TIME":
            return {
                ...state,
                service_time: action.data
            };
        case "ADD_PRICE_OF_SERVICE":
            return {
                ...state,
                price_of_service: action.data
            };
        case "ADD_PREPARATION_TIME":
            return {
                ...state,
                preparation_time: action.data
            };
        case "ADD_NUMBER_OF_ARTIST":
            return {
                ...state,
                number_of_artist: action.data
            };
        case "ADD_UNIT_TIME_OF_PREPARATION":
            return {
                ...state,
                unit_time_of_preparation: action.data
            };
        case "ADD_UNIT_TIME_OF_SERVICE":
            return {
                ...state,
                unit_time_of_service: action.data
            };
        default:
            return state;
    }
};

export default kantoBizForm;
