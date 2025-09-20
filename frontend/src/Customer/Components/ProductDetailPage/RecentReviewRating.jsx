import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import { getAllRatings } from '../../../state/Review/Action';
import { getAllReviews } from '../../../state/Review/Action';
import { useSelector,useDispatch } from 'react-redux';


const RecentReviewRating = ({ Id }) => {

  
  const [showAllReviews, setShowAllReviews] = useState(false);

  const dispatch = useDispatch();
  const {reviewRating } = useSelector(store=>store);
  const {ratings,reviews} = reviewRating;
  console.log(reviews)


  useEffect(() => {
    dispatch(getAllRatings(Id))
    dispatch(getAllReviews(Id));
  },[Id,dispatch]);


  return (
    <div className="mb-6 mt-6">
      {/* Rating Section */}
      <div className="flex items-center mb-2 mt-2">
        <Rating
          name="read-only"
          value={3} // Dynamic value for rating
          precision={0.5} // Set precision for half-star ratin4
          readOnly
          size="large"
          />
          </div>
        <span className="ml-2 text-gray-600 text-base">
          23423 reviews
        </span>

      {/* Recent Reviews */}
      <div className="mt-4">
        <div className="space-y-4">
          {/* Display one or all reviews based on toggle */}
          {(showAllReviews ? reviews : reviews.slice(0, 1)).map((item) => (
            <div key={item._id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
             <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Recent Reviews:
        </h3>
              <div className="flex items-center mb-2">
                <Rating
                  name="read-only"
                  value={ratings[0]?.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
                <span className="ml-2 text-gray-600 text-sm">{ratings[0]?.rating} stars</span>
              </div>
              <p className="text-gray-700">{`"${item?.review}"`}</p>
              <p className="text-gray-500 text-xs mt-2">Reviewed by {item?.user?.firstName} {item?.user?.lastName}</p>
            </div>
          ))}

          {/* "See More" or "See Less" Button */}
          {reviews.length > 1 && (
            <button
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="text-blue-500 hover:underline mt-4"
            >
              {showAllReviews ? "See Less...." : "See More..."}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentReviewRating;
