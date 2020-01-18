// All profile redux function

export function profileUpdateBeats(data) {
    return async dispatch => {
        dispatch({
            type: "UPDATE_PROFILE_BEATS",
            payload: data
        });
    };
}

export function addProfileInfo(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_INFO",
            payload: data
        });
    };
}

export function profileReadyBeats(data) {
    return async dispatch => {
        dispatch({
            type: "SET_READY_BEATS_TO_TRUE",
            payload: data
        });
    };
}

export function profileAddBeats(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PROFILE_BEATS",
            payload: data
        });
    };
}

export function profileAddNewPlayerList(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_NEW_PLAYER_PLAYLIST",
            payload: data
        });
    };
}

export function profileInitialisationContract(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_CONTRACT",
            payload: data
        });
    };
}

export function beatsInitialisationPricing(data) {
    return async dispatch => {
        dispatch({
            type: "ADD_PRICING",
            payload: data
        });
    };
}
