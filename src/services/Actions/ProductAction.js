import axios from 'axios';
const ApiUrl = "https://mern-stack-frist-project.onrender.com";

export const GetProductAction = (product) => {
    return {
        type: "GET_PRODUCT", 
        payload: product,
    };
}
export const AddProductAction = () => {
    return {
        type: "ADD_PRODUCT", 
    };
}

export const SingleProductAction = (product) => {
    return {
        type: "GET_SINGLE_PRODUCT", 
        payload: product,
    };
}

export const UpdateProductAction = (data) => {
    return {
        type: "UPDATE_PRODUCT", 
        payload: data,
    };
}

const DeleteProductAction = () => {
    return {
        type: "DELETE_PRODUCT", 
    };
}

const Lodding = () => {
    return {
        type: "LODING"
    }
}

// Thunk Action

//get product
export const GetProductThunk = () => {
    return async (dispatch) => {
        try {
            dispatch(Lodding());
            const response = await axios.get(`${ApiUrl}/api/products`);
            if (response.status === 200) {
                dispatch(GetProductAction(response.data));
            }
        } catch (error) {
            console.error('Error getting products:', error);
        }
    };
}

//add product
export const AddProductThunk = (productData) => {

    console.log("productData", productData);

    return async (dispatch) => {
        try {
            dispatch(Lodding());
            const response = await axios.post(`${ApiUrl}/api/products`, productData);
            if (response.status === 201) {
                dispatch(AddProductAction());
            }
        } catch (error) {
            console.error('Error adding product:', error);
            if (error.response) {
                console.error('Response error data:', error.response.data);
            }
        }
    };
};


// Single product
export const GetSingleProductThunk = (productId) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(`${ApiUrl}/api/products/${productId}`);
            if (response.status === 200) {
                dispatch(SingleProductAction(response.data));
            }
        } catch (error) {
            console.error('Error getting single product:', error);
        }
    };
};

// update product
export const UpdateProductThunk = (productId, productData) => {
    
    return async (dispatch) => {
        try {
            dispatch(Lodding());
            const response = await axios.put(`${ApiUrl}/api/products/${productId}`, productData);
            if (response.status === 200) {
                dispatch(UpdateProductAction(response.data));
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };
};

// delete product
export const DeleteProductThunk = (productId) => {
    return async (dispatch) => {
        try {
            dispatch(Lodding());
            const response = await axios.delete(`${ApiUrl}/api/products/${productId}`);
            if (response.status === 200) {
                dispatch(DeleteProductAction());
                dispatch(GetProductThunk());
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };
};

