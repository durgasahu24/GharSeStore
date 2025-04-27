import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts, findProductsById } from "../../../state/Product/Action.js";
import { createReview } from "../../../state/review/Action.js";
import { createRating } from "../../../state/review/Action.js";




export function RateAndReview() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { productId } = useParams();
  const navigate = useNavigate();
  console.log("item id in rate :", productId);
  const dispatch = useDispatch();
  // const itemId = param.itemId;

  const { products } = useSelector(store => store)

  console.log("products in rating and review  : ", products);

  console.log("welcome to Rate and Review ")





  // console.log("parm :",param.itemId);

  useEffect(() => {
    console.log("this is called by rate and review :")
    dispatch(findProductsById(productId));
  }, [productId, dispatch])




  const handleSubmit = () => {
    console.log(`Rating: ${rating}\nReview: ${review}`);
    dispatch(createRating({ productId, rating }));
    dispatch(createReview({ productId, review }));
    navigate(`/product/${productId}`);
    setRating(0);
    setReview("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-4 sm:p-6 lg:mt-[64px]">
      {/* Animated Title */}
      <div className="relative mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 animate-pulse">
          Rate & Review
        </h1>
        <div className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-gray-400 to-gray-800 rounded-full animate-ping"></div>
      </div>

      {/* Content Section */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-4 sm:p-6 gap-6">
        {/* Left: Product Details */}
        <div className="md:w-1/3 w-full bg-gray-100 p-4 rounded-lg flex flex-col items-center">
          <img
            className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
            src={products?.product?.images[0]}
            alt="Product"
          />
          <div className="mt-4 text-center">
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              {products?.product?.brand}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              {products?.product?.title}
            </p>
            <p className="text-gray-800 font-bold mt-2 text-sm sm:text-base">
              <span className="text-blue-600" >₹{products?.product?.discountedPrice}</span>  <span className="text-gray-500 line-through" >₹{products?.product?.discountedPrice}</span>    <span className="text-green-600">{products?.product?.discountPersent}%off</span>
            </p>
          </div>
        </div>

        {/* Right: Rating and Review Form */}
        <div className="md:w-2/3 w-full p-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
            Share Your Feedback
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {/* Rating Section */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Rate this Product
              </label>
              <Rating
                name="product-rating"
                value={rating}
                onChange={(event, newValue) => setRating(newValue)}
                size="large"
              />
            </div>

            {/* Review Input */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">
                Write a Review
              </label>
              <textarea
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none resize-none"
                rows="4"
                placeholder="Share your experience..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-500 to-gray-500 text-white py-3 rounded-lg hover:opacity-90 focus:ring focus:ring-blue-300 focus:outline-none font-medium"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RateAndReview;
