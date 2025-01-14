import api from '../../Config/apiConfig.js'
import {
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_FAILURE,
  CREATE_RATING_SUCCESS,
  CREATE_RATING_FAILURE,
  GET_ALL_RATINGS_SUCCESS,
  GET_ALL_RATINGS_FAILURE,
  GET_ALL_REVIEWS_SUCCESS,
  GET_ALL_REVIEWS_FAILURE
} from './ActionType.js';


export const createReview = (resData) => async (dispatch) => {
  console.log("create review req ", resData)

  try {
    const response = await api.post('/api/reviews/create',
      resData);

    dispatch({
      type: CREATE_REVIEW_SUCCESS,
      payload: response.data
    });
    console.log("create review ", response.data)
  } catch (error) {
    dispatch({
      type: CREATE_REVIEW_FAILURE,
      payload: error.message
    });
  }
};

export const getAllReviews = (productId) => async (dispatch) => {

  try {
    const response = await api.get(`/api/reviews/product/${productId}`);

    dispatch({
      type: GET_ALL_REVIEWS_SUCCESS,
      payload: response.data
    });
    console.log("all review ", response.data)
  } catch (error) {
    dispatch({
      type: GET_ALL_REVIEWS_FAILURE,
      payload: error.message
    });
  }
};




export const createRating = (resData) => async (dispatch) => {

  try {
    const response = await api.post('/api/ratings/create',
      resData);

    dispatch({
      type: CREATE_RATING_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: CREATE_RATING_FAILURE,
      payload: error.message
    });
  }
};


export const getAllRatings = (productId) => async (dispatch) => {
  // console.log("product id review ",productId)
  try {
    const response = await api.get(`/api/ratings/product/${productId}`, {

    });

    dispatch({
      type: GET_ALL_RATINGS_SUCCESS,
      payload: response.data
    });
    console.log("all rating ", response.data)
  } catch (error) {
    dispatch({
      type: GET_ALL_RATINGS_FAILURE,
      payload: error.message
    });
  }
};
