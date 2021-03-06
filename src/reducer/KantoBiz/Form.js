
const initState = {
    // Thematics genre
    thematics_options_selected: [],
    steps_index: 0,
    service_id: null,
    user_id: null,
    // End Thematics genre
    // Service Information
    title: '',
    country: '',
    city_reference: '',
    others_city: [],
    description: '',
    files: [],
    hidden: null,
    travel_expenses: null,
    // End Service Information
    // Service Details
    events_selected: [],
    service_time: null,
    materials: {},
    special_dates: {},
    technical_sheet: null,
    refund_policy: null,
    price_of_service: null,
    preparation_time: null,
    number_of_artist: 1,
    unit_time_of_preparation: {"day": false, "hours": false, "min": false, "sec": false},
    unit_time_of_service: {"day": false, "hours": false, "min": false, "sec": false},
    // End Service Details
    //Personal information
    postal_code: '',
    name: '',
    last_name: '',
    email: '',
    address: '',
    city: '',
    phone: '',
    // page reservation
    val: 0,
    activeStep: 0,
    completed: new Set(),
    reservation: false,
    tva: 0,
    ht_price: 0,
    total_amount: 0,
    isl_amount: 0
};

const kantoBizForm = (state = initState, action) => {
    switch (action.type) {
        case "ADD_STEPS_INDEX":
            return {
                ...state,
                steps_index: action.data
            };
        case "ADD_SERVICE_REFUND_POLICY":
            return {
                ...state,
                refund_policy: action.data
            };
        case "ADD_TECHNICAL_SHEET":
            return {
                ...state,
                technical_sheet: action.data
            };
        case "ADD_USER_ID":
            return {
                ...state,
                user_id: action.data
            };
        case "ADD_SPECIAL_DATES":
            return {
                ...state,
                special_dates: action.data
            };
        case "ADD_TRAVEL_EXPENSES":
            return {
                ...state,
                travel_expenses: action.data
            };
        case "ADD_MATERIALS_OF_SERVICE":
            return {
                ...state,
                materials: action.data
            };
        case "ADD_SERVICE_ID":
            return {
                ...state,
                service_id: action.data
            };
        case "CHANGE_STATUS_OF_SERVICE":
            return {
                ...state,
                hidden: action.data
            };
        case "ADD_SERVICE_TITLE":
            return {
                ...state,
                title: action.data
            };
        case "ADD_SERVICE_COUNTRY":
            return {
                ...state,
                country: action.data
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
        case "ADD_POSTAL_CODE" :
            return {
                ...state,
                postal_code: action.data
            };
        case "ADD_NAME" :
            return {
                ...state,
                name: action.data
            };
        case "ADD_LAST_NAME" :
            return {
                ...state,
                last_name: action.data
            };
        case "ADD_EMAIL" :
            return {
                ...state,
                email: action.data
            };
        case "ADD_ADDRESS" :
            return {
                ...state,
                address: action.data
            };
        case "ADD_CITY" :
            return {
                ...state,
                city: action.data
            };
        case "ADD_PHONE" :
            return {
                ...state,
                phone: action.data
            };
        case "ACTIVE_STEP":
            return {
                ...state,
                activeStep: action.data
            };
        case "COMPLETED_STEP":
            return {
                ...state,
                completed: action.data
            };
        case "CHANGE_VALUE":
            return {
                ...state,
                val: action.data
            };
        case "ADD_TOTAL_AMOUNT":
            return {
                ...state,
                total_amount: action.data
            };
        case "ADD_ISL_AMOUNT":
            return {
                ...state,
                isl_amount: action.data
            };
        case "ADD_HT_PRICE":
            return {
                ...state,
                ht_price: action.data
            };
        case "ADD_TVA":
            return {
                ...state,
                tva: action.data
            };
        case "ADD_RESERVATION":
            return {
                ...state,
                reservation: action.data
            };
        default:
            return state;
    }
};

export default kantoBizForm;
