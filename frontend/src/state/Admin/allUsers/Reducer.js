
import { GET_ALL_USER_REQUEST } from './ActionType.js';
import { GET_ALL_USER_SUCCESS } from './ActionType.js';
import { GET_ALL_USER_FAILURE } from './ActionType.js';
import { DELETE_USER_REQUEST } from './ActionType.js';
import { DELETE_USER_SUCCESS } from './ActionType.js';
import { DELETE_USER_FAILURE } from './ActionType.js';


const initialState = {
    users: [],
    loading: false,
    error: null,
};


const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USER_REQUEST:
        case DELETE_USER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case GET_ALL_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: null,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false, // Stop loading on success
                users: state.users.filter((user) => user._id !== action.payload),
                error: null,
            };

            case GET_ALL_USER_FAILURE:
                case DELETE_USER_FAILURE: // Add failure case for DELETE
                return {
                    ...state,
                loading: false,
                error: action.payload,
            };

            default:
                return state;
            }
        };
        
        export default usersReducer;