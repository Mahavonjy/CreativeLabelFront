const initState = {
    message: "Merci pour votre commande",
};

const CommandSuccess = (state = initState, action) => {
    switch (action.type) {
        case "ADD_SUCCESS_MESSAGE":
            return {
                ...state,
                message: action.data
            };
        default:
            return state;
    }
};

export default CommandSuccess;
