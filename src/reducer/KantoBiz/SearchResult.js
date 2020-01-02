const initState = {
    result: []
};

const KantoBizSearchResults = (state = initState, action) => {
    switch (action.type) {
        case "ADD_KANTOBIZ_RESULTS":
            return {
                ...state,
                result: action.data
            };
        default:
            return state;
    }
};

export default KantoBizSearchResults;
