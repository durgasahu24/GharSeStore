import React, { useEffect, useState } from "react";
import OrderItems from "./OrderItems.jsx";
import { getOrderById } from "../../../state/Order/Action.js";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../../../state/Admin/order/Action.js";

const stages = [

  { id: 1, name: "Order Placed", key: "ORDER_PLACED", description: "Your order has been placed successfully." },
  { id: 2, name: "Order Confirmed", key: "CONFIRMED", description: "Your order has been confirmed and is being prepared." },
  { id: 3, name: "Shipped", key: "SHIPPED", description: "Your order has been shipped and is on its way to the delivery address." },
  { id: 4, name: "Out For Delivery", key: "OUT_FOR_DELIVERY", description: "Your order is out for delivery and will reach you soon." },
  { id: 5, name: "Delivered", key: "DELIVERED", description: "Your order has been delivered successfully." },

];

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();

  const { order } = useSelector((store) => store);

  console.log("order in dtailw Page ; ",order);

  // State for tracking the current stage
  const [currentStage, setCurrentStage] = useState(1);
  const [isCancelled, setIsCancelled] = useState(false);


  // Fetch order details on component mount or when orderId changes
  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [orderId]);



  // Update current stage based on order status
  useEffect(() => {
    if (order?.order?.orderStatus) {
      const matchedStage = stages.findIndex(
        (stage) => stage.key === order.order.orderStatus
      );
      if (matchedStage !== -1) {
        setCurrentStage(matchedStage + 1); // +1 because stages are 1-based
      }
    }
  }, [order]);

  // Cancel order handler
  const handleCancel = () => {
    dispatch(cancelOrder(orderId));
    setIsCancelled(true);
  };

  if (isCancelled) {
    return (
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg text-center min-h-screen">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pt-4">Order Cancelled</h2>
        <p className="text-gray-600">Your order has been successfully cancelled.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Details</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Tracker */}
        <div className="flex flex-col items-center md:items-start">
          <div className="relative flex flex-col items-center">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center w-full">
                <div className="relative flex flex-col items-center">
                  {/* Circle */}
                  <div
                    className={`w-10 h-10 z-0 rounded-full border-4 flex items-center justify-center font-semibold ${index + 1 <= currentStage
                      ? "bg-gray-700 border-gray-700 text-white"
                      : "bg-white border-gray-300 text-gray-500"
                      }`}
                  >
                    {index + 1}
                  </div>

                  {/* Line */}
                  {index < stages.length - 1 && (
                    <div
                      className={`z-0 w-1 h-12 bg-gray-300 ${index + 1 < currentStage && "bg-blue-500"
                        }`}
                    ></div>
                  )}
                </div>

                {/* Stage Info */}
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{stage.name}</h3>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* User Address */}
        <div className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Address</h3>
          <p className="text-gray-700">
            {order?.order?.shippingAddress?.firstName}{" "}
            {order?.order?.shippingAddress?.lastName}
          </p>
          <p className="text-gray-700">{order?.order?.shippingAddress?.mobile}</p>
          <p className="text-gray-700">
            {order?.order?.shippingAddress?.streetAddress}{" "}
            {order?.order?.shippingAddress?.city}{" "}
            {order?.order?.shippingAddress?.state}
          </p>
          <p className="text-gray-700">{order?.order?.shippingAddress?.zipCode}</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-6">
        <div className="mb-4 text-right">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Cancel Order
          </button>
        </div>
        <OrderItems items={order?.order?.orderItems} />
      </div>
    </div>
  );
};

export default OrderDetails;
