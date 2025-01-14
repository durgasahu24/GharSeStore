import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './Auth/Reducer.js';
import { customerProductReducer } from './Product/Reducer.js';
import { cartReducer } from './cart/Reducer.js';
import { orderReducer } from './Order/Reducer.js';
import adminOrderReducer from './Admin/order/Reducer.js';
import usersReducer from './Admin/allUsers/Reducer.js';
// import reviewReducer from './RatingAndReview/Reducer.js';
import reviewReducer from './Review/Reducer.js'

// Combine your reducers into a root reducer
const rootReducers = combineReducers({
  auth: authReducer,
  products: customerProductReducer,
  cart: cartReducer,
  order: orderReducer,
  adminOrder: adminOrderReducer,
  users: usersReducer,
  reviewRating: reviewReducer
});


const store = legacy_createStore(rootReducers, applyMiddleware(thunk));


export default store;
