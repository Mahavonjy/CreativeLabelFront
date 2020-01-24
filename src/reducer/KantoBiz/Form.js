
const initState = {
    // Thematics genre
    thematics_options_selected: [],
    steps_index: 0,
    // End Thematics genre
    // Service Information
    title: '',
    city_reference: '',
    others_city: [],
    description: '',
    files: [],
    // End Service Information
    // Service Details
    events_selected: [],
    service_time: null,
    price_of_service: null,
    preparation_time: null,
    number_of_artist: 1,
    unit_time_of_preparation: {"day": false, "hours": false, "min": false, "sec": false},
    unit_time_of_service: {"day": false, "hours": false, "min": false, "sec": false}
    // End Service Details
};

const kantoBizForm = (state = initState, action) => {
    switch (action.type) {
        case "ADD_STEPS_INDEX":
            return {
                ...state,
                steps_index: action.data
            };
        case "ADD_SERVICE_TITLE":
            return {
                ...state,
                title: action.data
            };
        case "ADD_REFERENCE_CITY_OF_SERVICE":
            return {
                ...state,
                city_reference: action.data
            };
        case "ADD_OTHERS_CITY_OF_SERVICE":
            return {
                ...state,
                others_city: action.data
            };
        case "ADD_DESCRIPTION_OF_SERVICE":
            return {
                ...state,
                description: action.data
            };
        case "ADD_PICTURES_OF_SERVICE":
            return {
                ...state,
                files: action.data
            };
        case "ADD_THEMATICS_GENRE_SELECTED":
            return {
                ...state,
                thematics_options_selected: action.data
            };
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
