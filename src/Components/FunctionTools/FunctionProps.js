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

export function profileInitialisationCondition(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_GLOBAL_CONDITION",
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

export function profileInitialisationBanking(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_BANKING_OWNER_INFO",
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

export function addServiceToShow(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_TO_SHOW",
            data: data
        });
    };
}

export function profileShowBankingDetails(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SHOW_BANKING_DETAILS",
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

export function addAllArtistTypes(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ALL_ARTIST_TYPE",
            data: data
        });
    };
}

export function addAllCountryAllowed(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ALL_COUNTRY_ALLOWED",
            data: data
        });
    };
}

export function addServiceCountry(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_COUNTRY",
            data: data
        });
    };
}

export function addTmpArtistSelected(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_TMP_ARTIST_SELECTED",
            data: data
        });
    };
}

export function displayBecomeArtistForm(data) {
    return async dispatch => {
        dispatch({
            type: "DISPLAY_BECOME_ARTIST_FORM",
            data: data
        });
    };
}

export function addServiceSpecialDate(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SPECIAL_DATES",
            data: data
        });
    };
}

export function addTravelExpenses(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_TRAVEL_EXPENSES",
            data: data
        });
    };
}

export function addServiceRefundPolicy(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICE_REFUND_POLICY",
            data: data
        });
    };
}

export function addUserId(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_USER_ID",
            data: data
        });
    };
}

export function addFileTechnicalSheet(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_TECHNICAL_SHEET",
            data: data
        });
    };
}

export function addMaterialsCopy(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_MATERIALS_COPY",
            data: data
        });
    };
}

export function addServicesCopy(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_SERVICES_COPY",
            data: data
        });
    };
}

export function addOptionCopy(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_OPTIONS_COPY",
            data: data
        });
    };
}

export function addCurrentDateKey(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_CURRENT_DATE_KEY",
            data: data
        });
    };
}

export function changeUserGenreSelected() {
    return async dispatch => {
        dispatch({
            type: "IF_USER_GENRE_SELECTED",
        });
    };
}


export function changeDateToSearch(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_DATE_TO_SEARCH",
            data: data
        });
    };
}

export function changeCountryToSearch(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_COUNTRY_TO_SEARCH",
            data: data
        });
    };
}

export function changeCityToSearch(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_CITY_TO_SEARCH",
            data: data
        });
    };
}

export function changeThematicsToSearch(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_THEMATICS_TO_SEARCH",
            data: data
        });
    };
}

export function changeEnventsToSearch(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_EVENTS_TO_SEARCH",
            data: data
        });
    };
}

export function addAllEventsTypes(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_ALL_EVENTS_TYPES",
            data: data
        });
    };
}

export function addKantoBizSearchResults(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_KANTOBIZ_RESULTS",
            data: data
        });
    };
}
