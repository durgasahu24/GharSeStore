import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getOrderById } from "../../../state/Order/Action";
import { updatePayment } from "../../../state/Payment/Action";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"

export const PaymentSuccess = () => {
    const navigate = useNavigate();

    // Dummy order data (replace this with your actual data source)
   


    const [paymentId, setPaymentId] = useState("");
    const [referenceId, setReferenceId] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("");
    const { orderId } = useParams();



    const jwt = localStorage.getItem("jwt");
    const dispatch = useDispatch();
    const { order } = useSelector((store) => store);

    console.log("order in payment success : ", order)


    useEffect(() => {
        console.log("orderId", orderId)
        const urlParams = new URLSearchParams(window.location.search);
        setPaymentId(urlParams.get("razorpay_payment_id"));
        setReferenceId(urlParams.get("razorpay_payment_link_reference_id"));
        setPaymentStatus(urlParams.get("razorpay_payment_link_status"));
    }, []);


    useEffect(() => {
        if (paymentId && paymentStatus === "paid") {
            const data = { orderId, paymentId, jwt };
            dispatch(updatePayment(data));
            dispatch(getOrderById(orderId));
        }
    }, [orderId, paymentId]);


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 lg:mt-[64px] ">
            {/* Success Message */}
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mb-10">
                {/* Success Icon */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full mb-4">
                    <svg
                        className="w-8 h-8 text-green-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zm5.707-2.707a1 1 0 00-1.414 1.414l3.292 3.293-7.379 7.378-3.793-3.793a1 1 0 00-1.414 1.415l4.5 4.5a1 1 0 001.414 0l8.086-8.086 3.292-3.293a1 1 0 00-1.414-1.414L12.707 9.707l-4.5-4.5a1 1 0 00-1.414 0l-3.793 3.793a1 1 0 001.415 1.414L12 12l8.086-8.086z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                    Payment Successful!
                </h2>
                <p className="text-gray-600 mb-6">
                    Your payment was completed successfully. Thank you for your purchase!
                </p>

                {/* Buttons */}
                <button
                    onClick={() => navigate("/orders")}
                    className="w-full bg-gray-600 text-white py-3 rounded-lg font-medium hover:bg-gray-700"
                >
                    View My Orders
                </button>
                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-4 bg-gray-200 text-gray-800 py-3 rounded-lg font-medium hover:bg-gray-300"
                >
                    Go to Home
                </button>
            </div>

            {/* Order Cards Section */}
            <div className="max-w-4xl w-full">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Orders</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {order?.order?.orderItems?.map((order) => (
                        <div
                            key={order.id}
                            className="bg-white p-4 shadow-md rounded-lg flex items-center"
                        >
                            <img
                                src={order?.product?.images[0]}
                                alt={order.name}
                                className="w-20 h-20 object-cover rounded-md mr-4"
                            />
                            <div>
                                <h4 className="text-gray-800 font-medium">{order.name}</h4>
                                <p className="text-gray-600 text-sm">
                                    Quantity: {order.quantity}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    Price: ₹{order.price}
                                </p>
                                <p className="text-gray-600 text-sm">
                                    DisCounted price: ₹{order.discountedPrice}
                                </p>
                                {/* <p className="text-gray-600 text-sm">
                                    Price: ${order.price.toFixed(2)}
                                </p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;
