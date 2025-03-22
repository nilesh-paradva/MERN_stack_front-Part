const initialState = {
    products: [],
    product : {},
    isSuccess: false,
    isLoading: false
};

export default function ProductReducer(state = initialState, action) {
    switch (action.type) {
        case "ADD_PRODUCT":
            return {...state, isSuccess: true, isLoading: false};

        case "GET_PRODUCT":
            return {...state, products: action.payload, isSuccess: false, isLoading: false};

        case "GET_SINGLE_PRODUCT":
            return {...state, product: action.payload, isSuccess: false};

        case "UPDATE_PRODUCT":
            return {...state, product: action.payload, isSuccess: true, isLoading: false};

        case "DELETE_PRODUCT":
            return {...state, isSuccess: false, isLoading: false};

        case "LODING":
            return {...state, isLoading: true};

        default:
            return state;
    }
}