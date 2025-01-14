import api from "../../../config/apiConfig.js";
import { DELETE_USER_FAILURE, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, GET_ALL_USER_REQUEST } from "./ActionType";
import { GET_ALL_USER_SUCCESS } from "./ActionType";
import { GET_ALL_USER_FAILURE } from "./ActionType";


export const fetchAllUsers = () => async (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });

    try {
        const response = await api.get('/api/users'); // Use the correct endpoint URL
        const users = response.data;

        // console.log("users in fetchAllUsers : ", users)

        // Dispatch success action with payload as the users list
        dispatch({
            type: GET_ALL_USER_SUCCESS,
            payload: users,
        });
    } catch (error) {
        // Dispatch failure action with error message
        dispatch({
            type: GET_ALL_USER_FAILURE,
            payload: error.message,
        });
    }
};



// Action code...
export const deleteUser = (userId) => async (dispatch) => {
    dispatch({ type: DELETE_USER_REQUEST });

    try {
        await api.delete(`/api/users/${userId}`); // Use the `api` instance consistently
        dispatch({ type: DELETE_USER_SUCCESS, payload: userId });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.message,
        });
    }
};



