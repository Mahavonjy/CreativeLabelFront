// beats props

export function readyLatestBeats(data) {
    return async dispatch => {
        dispatch({
            type: "LATEST_BEATS_READY",
            data: data
        });
    };
}

export function updateOtherBeatMakerBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_OTHER_BEAT_MAKER_BEATS",
            data: data
        });
    };
}

export function readyDiscoveryBeats(data) {
    return async dispatch => {
        dispatch({
            type: "DISCOVERY_BEATS_READY",
            data: data
        });
    };
}

export function readyIslBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ISL_BEATS_READY",
            data: data
        });
    };
}

export function updateLatestBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_LATEST_BEATS_LIST",
            data: data
        });
    };
}

export function updateIslBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_ISL_PLAYLIST_LIST",
            data: data
        });
    };
}

export function updateDiscoveryBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_DISCOVERY_BEATS_LIST",
            data: data
        });
    };
}

export function addBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_BEATS",
            data: data
        });
    };
}

export function updateBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_BEATS_LIST",
            data: data
        });
    };
}

export function readyBeats() {
    return async dispatch => {
        dispatch({
            type: "BEATS_READY"
        });
    };
}

export function addCarts(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_CART",
            data: data
        });
    };
}

export function updateSimilarBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_SIMILAR_BEATS",
            data: data
        });
    };
}

export function updateBeatMakerBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_BEAT_MAKER_BEATS",
            data: data
        });
    };
}

export function addNewPlayerList(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_NEW_PLAYER_PLAYLIST",
            data: data
        });
    };
}

export function addTotalPrice(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_TOTAL_PRICE",
            data: data
        });
    };
}

// All home redux function

export function addUserCredentials(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_USER_CREDENTIALS",
            data: data
        });
    };
}

export function addBeatMakerBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_BEAT_MAKER_BEATS",
            data: data
        });
    };
}

export function addSimilarBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_BEATS_SIMILAR",
            data: data
        });
    };
}

export function addOtherBeatMakerBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_OTHER_BEAT_MAKER_BEATS",
            data: data
        });
    };
}

export function newBeatMaker(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_NEW_BEATMAKER",
            data: data
        });
    };
}

export function topBeatMaker(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_TOP_BEATMAKER",
            data: data
        });
    };
}

export function latestBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_LATEST_BEATS",
            data: data
        });
    };
}

export function discoveryBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_DISCOVERY_BEATS",
            data: data
        });
    };
}

export function islBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ISL_PLAYLIST",
            data: data
        });
    };
}

export function addAllMediaGenre(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ALL_MEDIA_GENRE",
            data: data
        });
    };
}

export function addPrefAllMediaGenre(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ALL_MEDIA_GENRE_PREF",
            data: data
        });
    };
}

// All profile redux function

export function beatsInitialisationPricing(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PRICING",
            data: data
        });
    };
}

export function profileAddBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_BEATS",
            data: data
        });
    };
}

export function profileInitialisationInfo(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_INFO",
            data: data
        });
    };
}

export function profileInitialisationRole(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ROLE",
            data: data
        });
    };
}

export function profileInitialisationFollower(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_FOLLOWER",
            data: data
        });
    };
}

export function profileInitialisationFollowing(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_FOLLOWING",
            data: data
        });
    };
}

export function profileInitialisationContract(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_CONTRACT",
            data: data
        });
    };
}

export function profileUpdateBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_PROFILE_BEATS",
            data: data
        });
    };
}

export function profileReadyBeats(data) {
    return async dispatch => {
        dispatch({
            type: "SET_READY_BEATS_TO_TRUE",
            data: data
        });
    };
}

// All Thematics Form function and Kantobiz

export function addStepsIndex(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_STEPS_INDEX",
            data: data
        });
    };
}

export function addOptionSelected(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_THEMATICS_GENRE_SELECTED",
            data: data
        });
    };
}

export function addTitleOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_TITLE",
            data: data
        });
    };
}

export function addReferenceOfCity(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_REFERENCE_CITY_OF_SERVICE",
            data: data
        });
    };
}

export function addOthersCityOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_OTHERS_CITY_OF_SERVICE",
            data: data
        });
    };
}

export function addDescriptionOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_DESCRIPTION_OF_SERVICE",
            data: data
        });
    };
}

export function addPicturesOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PICTURES_OF_SERVICE",
            data: data
        });
    };
}

export function addEventSelected(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_EVENTS_SELECTED",
            data: data
        });
    };
}

export function addServiceTime(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_TIME",
            data: data
        });
    };
}

export function addPriceOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PRICE_OF_SERVICE",
            data: data
        });
    };
}

export function addPreparationTime(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PREPARATION_TIME",
            data: data
        });
    };
}

export function addNumberOfArtist(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_NUMBER_OF_ARTIST",
            data: data
        });
    };
}

export function addUnitTimeOfPreparation(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_UNIT_TIME_OF_PREPARATION",
            data: data
        });
    };
}

export function addMaterialsOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_MATERIALS_OF_SERVICE",
            data: data
        });
    };
}

export function changeMovingPrice(data) {
    return async dispatch => {
        dispatch({
            type: "CHANGE_MOVING_PRICE",
            data: data
        });
    };
}

export function addServiceId(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_ID",
            data: data
        });
    };
}

export function addAllUserOptions(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_USER_OPTIONS",
            data: data
        });
    };
}

export function addAllUserPrestation(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_USER_PRESTATIONS",
            data: data
        });
    };
}

export function changeStatusOfService(data) {
    return async dispatch => {
        dispatch({
            type: "CHANGE_STATUS_OF_SERVICE",
            data: data
        });
    };
}

export function addUnitTimeOfService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_UNIT_TIME_OF_SERVICE",
            data: data
        });
    };
}

export function addOtherUserOptions(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_OTHER_USER_OPTIONS",
            data: data
        });
    };
}

export function addOtherUserService(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_OTHER_USER_PRESTATIONS",
            data: data
        });
    };
}

export function activeResultPage(data) {
    return async dispatch => {
        dispatch({
            type: "ACTIVE_RESULTS_PAGE",
            data: data
        });
    };
}

export function addDayOfAvailability(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_USER_DAY_OF_AVAILABILITY",
            data: data
        });
    };
}

export function activeEventAndThematicsPage(data) {
    return async dispatch => {
        dispatch({
            type: "ACTIVE_EVENT_AND_THEMATICS_PAGE",
            data: data
        });
    };
}

export function activeDisplayServicePage(data) {
    return async dispatch => {
        dispatch({
            type: "ACTIVE_DISPLAY_SERVICE_PAGE",
            data: data
        });
    };
}

export function addFilterEventSelected(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_FILTER_EVENTS_SELECTED",
            data: data
        });
    };
}