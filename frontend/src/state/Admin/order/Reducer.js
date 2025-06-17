

import {
    CANCELED_ORDER_FAILURE,
    CANCELED_ORDER_REQUEST,
    CANCELED_ORDER_SUCCESS,
    CONFIRMED_ORDER_FAILURE,
    CONFIRMED_ORDER_REQUEST,
    CONFIRMED_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELIVERED_ORDER_FAILURE,
    DELIVERED_ORDER_REQUEST,
    DELIVERED_ORDER_SUCCESS,
    GET_ORDERS_FAILURE,
    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    PLACED_ORDER_FAILURE,
    PLACED_ORDER_REQUEST,
    PLACED_ORDER_SUCCESS,
    SHIP_ORDER_FAILURE,
    SHIP_ORDER_REQUEST,
    SHIP_ORDER_SUCCESS,
} from "./ActionType";

const initialState = {
    loading: false,
    orders: [],
    error: "",
};

const adminOrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
                error: "",
            };
        case GET_ORDERS_FAILURE:
            return {
                loading: false,
                orders: [],
                error: action.payload,
            };

        // Handle Order Status Updates (CONFIRMED, SHIPPED, DELIVERED)
        case CONFIRMED_ORDER_REQUEST:
        case PLACED_ORDER_REQUEST:
        case DELIVERED_ORDER_REQUEST:
        case CANCELED_ORDER_REQUEST:
        case SHIP_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case CONFIRMED_ORDER_SUCCESS:
            console.log("action payload in cofirmed order status : ", action.payload._id);
            // state.orders.map(order => console.log("order : ",order._id));
            return {
                ...state,
                orders: state.orders.map(order =>

                    order._id === action.payload._id ? { ...order, orderStatus: 'CONFIRMED' } : order
                ),
                loading: false,
            };
        case PLACED_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'PLACED' } : order
                ),
                loading: false,
            };
        case DELIVERED_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'DELIVERED' } : order
                ),
                loading: false,
            };
        case CANCELED_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'CANCELED' } : order
                ),
                loading: false,
            };

        case SHIP_ORDER_SUCCESS:
            return {
                ...state,
                orders: state.orders.map(order =>
                    order._id === action.payload._id ? { ...order, orderStatus: 'SHIPPED' } : order
                ),
                loading: false,
            };

        // Failure Cases (Error Handling)
        case CONFIRMED_ORDER_FAILURE:
        case PLACED_ORDER_FAILURE:
        case DELIVERED_ORDER_FAILURE:
        case CANCELED_ORDER_FAILURE:
        case SHIP_ORDER_FAILURE:
            return {
                ...state,
                error: action.payload,
                loading: false,
            };

        // Deleting Order
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.filter(order => order._id !== action.payload),
            };
        case DELETE_ORDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export default adminOrderReducer;
