import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getOrderHistory } from "../../../state/Order/Action.js"

const OrderPage = () => {
    const navigate = useNavigate();


    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const { order } = useSelector(store => store);

    console.log("all orders : ", order);

    useEffect(() => {
        dispatch(getOrderHistory());
    }, [jwt]);




    const handleOrderClick = (orderId) => {
        // navigate(`Account/OrderDetails/${orderId}`);
        navigate(`/Account/OrderDetails/${orderId}`);

    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 lg:mt-[64px]">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Order History</h1>

                <div className="space-y-6">
                    {order?.orders?.map((order) => (
                        <div
                            key={order._id}
                            className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                            onClick={() => handleOrderClick(order._id)}
                        >
                            {/* Left: Product Images */}
                            <div className="flex flex-wrap md:w-1/3 bg-gray-100 p-4 items-center justify-center">
                                {order?.orderItems?.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item?.product?.images[0] || "https://via.placeholder.com/100"}
                                        alt={item?.product?.name || "Product"}
                                        className="h-20 w-20 object-cover rounded-md m-2"
                                    />
                                ))}
                            </div>

                            {/* Right: Delivery Date */}
                            <div className="flex flex-col justify-between p-4 w-full md:w-2/3">
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-700">
                                        Total Item: {order?.totalItem}</h2>
                                    <p className="text-gray-500 text-sm mt-2">
                                        <strong>Order Date:</strong>{" "}
                                        {new Date(order?.orderDate).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-sm mt-2">
                                        <strong>Delivery Date:</strong> 22/02/25
                                    </p>
                                    <p className="text-gray-500 text-sm mt-2">
                                        <strong>Total Price:</strong> ₹{order?.totalDiscountedPrice}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
