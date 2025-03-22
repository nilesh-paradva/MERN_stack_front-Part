const initialState = {
    products: [],
    product : {},
    isSuccess: false,
};

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {...state, isSuccess: true};

        case "GET_PRODUCT":
            return {...state, products: action.payload, isSuccess: false};

        case "GET_SINGLE_PRODUCT":
            return {...state, product: action.payload, isSuccess: false};

        case "UPDATE_PRODUCT":
            return {...state, product: action.payload, isSuccess: true};

        default:
            return state;
    }
}