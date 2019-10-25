const initState = {
    beats: [],
};

const beatsReducer = (state = initState, action) => {
    switch (action.type) {
        case "UPDATE_BEATS_LIST":
            for (let row in state.beats) {
                if (parseInt(row) === parseInt(action.data.index)) {
                    state.beats[row]['link'] = action.data.link
                }
            }
            return {
                ...state,
                beats: [...state.beats]
            };
        case "ADD_BEATS":
            return {
                beats: action.data
            };
        case "RESET_BEATS":
            return {
                beats: []
            };
        default:
            return state;
    }
};

export default beatsReducer;
