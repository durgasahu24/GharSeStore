import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  getOrders,
  shipOrder,
  deliveredOrder,
} from "../state/Admin/order/Action.js";

function OrdersTable() {
  const [menuState, setMenuState] = React.useState({ isOpen: false, orderId: null });
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch,orders]);

  const handleMenuOpen = (orderId) => {
    setMenuState({ isOpen: true, orderId });
  };

  const handleMenuClose = () => {
    setMenuState({ isOpen: false, orderId: null });
  };

  const handleShippedOrder = () => {
    dispatch(shipOrder(menuState.orderId));
    handleMenuClose();
  };

  const handleConfirmedOrder = () => {
    dispatch(confirmOrder(menuState.orderId));
    handleMenuClose();
  };

  const handleDeliveredOrder = () => {
    dispatch(deliveredOrder(menuState.orderId));
    handleMenuClose();
  };

  const handleDeleteOrder = (orderId) => {
    console.log("orderId for delete : ", orderId);
    dispatch(deleteOrder(orderId));
  };

  return (
    <div className="bg-gray-100 ">
      <div className="bg-white p-4 shadow-lg rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Update</th>
                <th className="p-4 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">
                  {/* Product Images */}
                  <td className="p-4">
                    <div className="flex -space-x-2">
                      {item.orderItems.map((orderItem) => (
                        <img
                          // key={orderItem.product._id}
                          src={orderItem?.product?.images[0]}
                          // alt={orderItem.product.title}
                          className="w-12 h-12 rounded-full border"
                        />
                      ))}
                    </div>
                  </td>

                  {/* Total Price */}
                  <td className="p-4">{item.totalPrice}</td>

                  {/* Order Status */}
                  <td className="p-4">
                    <span
                      className={`px-4 py-2 rounded-full text-white ${item.orderStatus === "CONFIRMED"
                          ? "bg-green-500"
                          : item.orderStatus === "SHIPPED"
                            ? "bg-blue-500"
                            : item.orderStatus === "PLACED"
                              ? "bg-yellow-500"
                              : item.orderStatus === "PENDING"
                                ? "bg-gray-500"
                                : "bg-teal-600"
                        }`}
                    >
                      {item.orderStatus}
                    </span>
                  </td>

                  {/* Update Status Button */}
                  <td className="p-4">
                    <button
                      onClick={() => handleMenuOpen(item._id)}
                      className="text-blue-500 hover:text-blue-700 rounded-lg p-2"
                    >
                      Status
                    </button>
                  </td>

                  {/* Delete Order Button */}
                  <td className="p-4">
                    <button
                      onClick={() => handleDeleteOrder(item._id)}
                      className="text-red-500 hover:text-red-700 rounded-lg p-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Dropdown Menu for Updating Order Status */}
        {menuState.isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
            <div className="bg-white p-4 shadow-lg rounded-lg w-64">
              <h3 className="text-lg font-semibold mb-4">Update Order Status</h3>
              <ul>
                <li
                  onClick={handleConfirmedOrder}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  Confirmed Order
                </li>
                <li
                  onClick={handleShippedOrder}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  Shipped Order
                </li>
                <li
                  onClick={handleDeliveredOrder}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded-lg"
                >
                  Delivered Order
                </li>
              </ul>
              <button
                onClick={handleMenuClose}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersTable;
