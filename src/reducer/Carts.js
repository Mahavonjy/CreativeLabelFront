const initState = {
    carts: [], total_price: 0
};

const cartsReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_CART":
            return {
                ...state,
                carts: action.data
            };
        case "ADD_TOTAL_PRICE":
            return {
                ...state,
                total_price: action.data
            };
        default:
            return state;
    }
};

export default cartsReducer;
