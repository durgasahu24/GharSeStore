// import api, { API_BASE_URL } from "../../config/apiConfig";
// import api,{API_BASE_URL} from "../../Config/apiConfig";
import api, { API_BASE_URL } from "../../config/apiConfig";
// import { API_BASE_URL } from "../../config/apiConfig";
import {
    CREATE_PRODUCT_FAILURE,
    CREATE_PRODUCT_REQUEST,
    CREATE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAILURE,
    FIND_PRODUCT_BY_ID_REQUEST,
    FIND_PRODUCT_BY_ID_SUCCESS,
    FIND_PRODUCT_BY_ID_FAILURE,
    FIND_PRODUCTS_FAILURE,
    FIND_PRODUCTS_SUCCESS,
    FIND_PRODUCTS_REQUEST,
} from "./ActionType";




export const findProducts = (reqData) => async (dispatch) => {

    // console.log("called by home ",reqData)


    dispatch({ type: FIND_PRODUCTS_REQUEST })

    console.log("reqdat in findProducts : ", reqData);

    const { colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize } = reqData;
    console.log(colors, sizes, minPrice, maxPrice, minDiscount, category, stock, sort, pageNumber, pageSize);



    try {


        console.log("this is reqest data in findproducts in try blog 1 : ", reqData);
        console.log("this is reqest data in findproducts in try blog 1 : ", reqData.sizes);
        console.log("this is reqest data in findproducts in try blog 1 : ", reqData.minPrice);

        const { data } = await api.get(`/api/products?color=${colors}&sizes=${sizes}&minPrice=${minPrice}&maxPrice=${maxPrice}&minDiscount=${minDiscount}&category=${category}&stock=${stock}&sort=${sort}&pageNumber=${pageNumber}&pageSize=${pageSize}`)

        console.log("data in findproducts : ", data);

        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data })



    } catch (error) {
        console.log("this is catch error in try catch")
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message })
        console.log("error.message ", error.message)
    }
}



export const findProductsById = (reqData) => async (dispatch) => {

    console.log("reqdata in findproduct by id : action in products : ", reqData);

    dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST })


    try {


        console.log('this is try blog in find product by id : ')
        const { data } = await api.get(`/api/products/id/${reqData}`)
        console.log("this is data in find product by id : ", data);


        // dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data })
        dispatch({
            type: FIND_PRODUCT_BY_ID_SUCCESS,
            payload: data,
        });



    } catch (error) {
        dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message })
    }
}



export const createProduct = (productData) => async (dispatch) => {
    console.log("product data in create product : ", productData);
    try {

        dispatch({ type: CREATE_PRODUCT_REQUEST });



        // Send the POST request to create the new product
        const { data } = await api.post(`/api/admin/products/create`, productData);

        console.log("Created product: ", data);

        // Dispatch success action
        dispatch({
            type: CREATE_PRODUCT_SUCCESS,
            payload: data,
        });



    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAILURE, payload: error.message });
    }
};




export const deleteProduct = (productId) => async (dispatch) => {
    console.log("products id ", productId)
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST })
        const { data } = await api.delete(`${API_BASE_URL}/api/admin/products/${productId}`)
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: productId,
        })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message })
    }
}











