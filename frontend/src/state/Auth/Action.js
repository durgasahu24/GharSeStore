// import { API_BASE_URL } from "../../config/apiConfig.js";\
import { API_BASE_URL } from "../../Config/apiConfig";
import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_FAILURE, LOGOUT } from "./ActionType";
import axios from "axios";




// Register action creators
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = error => ({ type: REGISTER_FAILURE, payload: error })



export const register = (userdata) => async (dispatch) => {

  // console.log("hello from register")

  dispatch(registerRequest())


  try {

    console.log("userData", userdata);
    console.log("ap base url ", API_BASE_URL);
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userdata);

    console.log("response ======  : ", response);

    const user = response.data;



    if (user.jwt) localStorage.setItem("jwt", user.jwt)



    // console.log("dispatch(registerSuccess(user))", dispatch(registerSuccess(user)))

  } catch (error) {
    // console.log("error mesg : ", error.message)
    dispatch(registerFailure(error.message));
  }
}



const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = error => ({ type: LOGIN_FAILURE, payload: error })



export const login = (userData) => async (dispatch) => {

  // console.log("userdata : ",userData);

  dispatch(loginRequest())

  console.log("auth base url : ", API_BASE_URL);

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    const user = response.data;
    // console.log("user in login  :", user)
    if (user.jwt) localStorage.setItem("jwt", user.jwt)
    dispatch(loginSuccess(user));
  } catch (error) {

    dispatch(loginFailure(error.message));
  }
}


const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = error => ({ type: GET_USER_FAILURE, payload: error })



export const getUser = (token) => {
  return async (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const user = response.data;
      // console.log("user : ",user);
      dispatch({ type: GET_USER_SUCCESS, payload: user });

    } catch (error) {
      const errorMessage = error.message;
      // console.log("errorMessage: ", errorMessage)
      dispatch({ type: GET_USER_FAILURE, payload: errorMessage });
    }
  };
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null })
}









