import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderItems({ items }) {  // Ensure `items` is an array passed to the component
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate(`/order-details/${productId}/RateAndReview`);  // Navigate to the full path
  };

  return (
    <div>
      {items?.map((item, index) => (
        <div key={item._id || index} className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center justify-between">
          {/* Left Section: Product Image */}
          <div className="w-24 h-24 mr-6">
            <img
              className="w-full h-full object-cover rounded"
              src={item.product?.images[0] || 'placeholder-image-url'}  // Replace with actual item image URL
              alt={item.product?.name || 'Product Image'}
            />
          </div>

          {/* Middle Section: Product Details */}
          <div className="flex-1">
            <p className="font-medium text-gray-800">Size: {item.size}</p>
            <p className="text-gray-600">
              Original Price: <span className="line-through">{item.price}</span>
            </p>
            <p className="text-gray-500">Discounted Price: {item.discountedPrice}</p>
            <p className="text-gray-500">Discount: {item?.product?.discountPersent}% off</p>
          </div>

          {/* Right Section: Buttons */}
          <div className="flex flex-col items-end ml-6">
            <button
              className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-yellow-600"
              onClick={() => handleNavigate(item?.product?._id)}
            >
              Rate & Review
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrderItems;
