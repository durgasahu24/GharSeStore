import axios from "axios";
import {
    CREATE_ORDER_FAILURE,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    GET_ORDER_BY_ID_FAILURE,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_HISTORY_REQUEST,
    GET_ORDER_HISTORY_SUCCESS,
    GET_ORDER_HISTORY_FAILURE
} from "./Actiontype.js";
import {toast} from 'react-toastify'



import api from "../../Config/apiConfig.js";



export const createOrder = (reqData) => async (dispatch) => {

    // console.log("req data formdata ", reqData.formData);

    dispatch({ type: CREATE_ORDER_REQUEST });

    try {

        const { data } = await api.post(`/api/orders/`, reqData.formData);


        console.log("data after order created : ", data);

        if (data._id) {
            reqData.navigate(`/OrderSummary?order_id=${data._id}`);

        }
        // console.log("created order - ", data);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        console.log("catch error : ", error);
        toast.error("product creation failed ")
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};


export const getOrderById = (orderId) => async (dispatch) => {

    // console.log("get order req order id ", orderId);
    dispatch({ type: GET_ORDER_BY_ID_REQUEST });

    try {

        // const { data } = await api.get(`/api/orders/${orderId}`,);
        const { data } = await api.get(`/api/orders/${orderId}`)

        console.log("order by id ", data);

        dispatch({ type: GET_ORDER_BY_ID_SUCCESS, payload: data });

    } catch (error) {
        // console.log("catch ", error)
        dispatch({ type: GET_ORDER_BY_ID_FAILURE, payload: error.message });
    }

};



export const getOrderHistory = () => async (dispatch) => {
    try {

        dispatch({ type: GET_ORDER_HISTORY_REQUEST });

        // const config = {
        //     headers: {
        //         Authorization: `Bearer ${reqData.jwt}`,
        //     },
        // };

        // const { data } = await api.get(`/api/orders/user`);
        const { data } = await api.get(`/api/orders/OrderHis`)
        console.log("order history -------- ", data);
        dispatch({
            type: GET_ORDER_HISTORY_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: GET_ORDER_HISTORY_FAILURE,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

