import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    LOGOUT
} from "./ActionType.js"




const initialState = {
    user: null,
    error: null,
    jwt:null,
    isLoggedIn: false,
}



const authReducer = (state = initialState, action) => {
    console.log("action in auth reducer : ",action.type);

    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
            return { ...state, isLoading: true, error: null };

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return { ...state, isLoggedIn: true, isLoading: false, error: null, jwt: action.payload };

        case GET_USER_SUCCESS:
            // console.log("state ",state);
            // console.log("state user ",state.user);
            // console.log("state action ",action);
            // console.log("state action  payload",action.payload);    
            // console.log("state action  payload id ",action.payload._id);    
            return { ...state, isLoading: false, error: null, user: action.payload };

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
            return { ...state, isLoading: false, error: action.payload };

        case LOGOUT:
            return { ...initialState, isLoggedIn: false, }

        default:
            return state;
    }
}

// console.log("auth reducer int reducer file : ",authReducer);

export default authReducer;