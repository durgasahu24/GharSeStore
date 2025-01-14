import { deleteProduct } from "./Action";
import {
    FIND_PRODUCTS_REQUEST,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    CREATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE
} from "./ActionType"



const initiailState = {
    products: [],
    product: null,
    loading: false,
    error: null,
    deletedProduct: null,
}

export const customerProductReducer = (state = initiailState, action) => {

    // console.log("action type in customerProduct : ", action.type);

    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case CREATE_PRODUCT_REQUEST:
        case DELETE_PRODUCT_REQUEST:
            return { ...state, loading: true, error: null }



        case FIND_PRODUCTS_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return { ...state, loading: false, error: null, product: action.payload }
        case CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload],
              };
              
        case DELETE_PRODUCT_SUCCESS:
            return { ...state, loading: false, error: null, deletedProduct: action.payload }



        case FIND_PRODUCTS_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
        case CREATE_PRODUCT_FAILURE:
        case DELETE_PRODUCT_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }
}



