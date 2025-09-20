import React, { useEffect } from "react";
import UserDetailsCard from "./UserDetailsPage";
import OrderCart from "./OrderCart";
import PriceDetails from "./PriceDetails";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getOrderById } from "../../../state/Order/Action";
import { createPayment } from "../../../state/Payment/Action";

function OrderSummary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Extract `orderId` from the URL query parameters
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");

  console.log("orderid : ", orderId)

  // Select the `order` slice from the Redux store
  const { order } = useSelector((state) => state);
  console.log("order : ", order);

  // Fetch order details when `orderId` changes
  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [orderId, dispatch]);


  // Payment handler
  const handleCreatePayment = () => {
    // console.log("orderid : ",orderId);
    dispatch(createPayment(orderId));
  };

  return (
    <div className="container mx-auto p-8 min-h-screen mt-[75px]">
      {/* User Details and Price Cart next to each other (responsive) */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4 lg:mb-0">
        {/* User Details */}
        <div className="w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-4">
          <UserDetailsCard address={order?.order?.shippingAddress} />
        </div>

        {/* Product Price Cart */}
        <div className="w-full lg:w-1/3">
          <PriceDetails
            totalPrice={order?.order?.totalPrice}
            discountApplied={order?.order?.totalDiscountedPrice}
          />
        </div>
      </div>

      {/* Order Items below one by one */}
      <div>
        {order?.order?.orderItems?.map((product) => (
          <OrderCart key={product.id} product={product} />
        ))}
      </div>

      {/* Payment Button */}
      <div className="mt-8">
        <button
          onClick={handleCreatePayment}
          className="px-6 py-3 bg-gray-500 text-white rounded shadow hover:bg-gray-600"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
