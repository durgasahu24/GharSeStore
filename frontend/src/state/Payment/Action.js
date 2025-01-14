import {
    CREATE_PAYMENT_REQUEST,
    CREATE_PAYMENT_SUCCESS,
    CREATE_PAYMENT_FAILURE,
    UPDATE_PAYMENT_REQUEST,
    UPDATE_PAYMENT_SUCCESS,
    UPDATE_PAYMENT_FAILURE

} from "./ActionType";
import api from "../../config/apiConfig.js";


export const createPayment = (orderId) => async (dispatch) => {

    dispatch({ type: CREATE_PAYMENT_REQUEST })

    console.log("orderid in createPayment : ",orderId);

    try {

        const { data } = await api.post(`/api/payments/${orderId}`, {})

        if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
        }

    } catch (error) {
        console.log('error in action payment : ',error);
        dispatch({ type: CREATE_PAYMENT_FAILURE, payload: error.message })
    }
}


export const updatePayment = (reqData) => async (dispatch) => {



    dispatch({ type: UPDATE_PAYMENT_REQUEST })

    console.log("reqdata payment id : ",reqData.paymentId);
    console.log("reqdata orderid : ",reqData.orderId);

    try {

        const { data } = await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`)

        // console.log("data in updatePayment : ",data);

        return dispatch({ type: UPDATE_PAYMENT_SUCCESS, payload: data })

    } catch (error) {
        dispatch({ type: UPDATE_PAYMENT_FAILURE, payload: error.message })
    }

}