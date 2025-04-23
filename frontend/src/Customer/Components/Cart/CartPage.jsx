import React, { useState, useEffect } from "react";
import { Button, Stack } from "@mui/material";
import CartItem from "./CartItem"; // Import the CartItem component
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../state/cart/Action";
import { removeCartItem } from "../../../state/cart/Action";




const CartPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { cart } = useSelector(store => store);



  useEffect(() => {
    dispatch(getCart());
  }, [cart.updateCartItem, cart.deleteCartItem]);



  const handleUpdateCartItem = (num) => {
    const data = { data: { quantity: item.quantity + num }, cartItemId: item?._id }
    // console.log("update data ", data)
    dispatch(updateCartItem(data))
  }


  const handleRemoveItemFromCart = (id) => {
    dispatch(removeCartItem(id));
  };


  const handleCheckout = () => {
    navigate("/Checkout")
  }

  return (
    <div className="min-h-screen flex flex-col lg:mt-[69px]">
      {/* Cart Table Section */}
      <div className="flex-1 overflow-y-auto p-4">
        <table className="w-full hidden md:table">
          <thead>
            <tr className="text-left">
              <th>Image</th>
              <th>Quantity</th>
              <th>Price (Discounted)</th>
              <th>Original Price</th>
              <th>Off</th>
              <th>Remove</th> {/* Added Remove column */}
            </tr>
          </thead>
          <tbody>
            {cart?.cart?.cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
              />
            ))}
          </tbody>
        </table>


        {/* Mobile/Table Layout for Cart Items */}
        <div className="md:hidden">
          {cart?.cart?.cartItems?.map((item) => (
            <div key={item._id} className="flex flex-col md:flex-row justify-between mb-4 border-b pb-4">
              {/* Left side: Product Image and Remove Button */}
              <div className="flex items-center mb-4 md:mb-0 md:w-1/4 justify-between w-full">
                <img src={item?.product?.images[0]} alt={item.name} className="w-16 h-16 object-cover" />
                
                <Button
                  onClick={() => handleRemoveItemFromCart(item._id)}
                  color="error"
                  variant="outlined"
                  size="small"
                  className="ml-4" // Adds gap between the image and remove button
                >
                  Remove
                </Button>
              </div>

              {/* Right side: Product Details and Quantity Control */}
              <div className="flex flex-col justify-between items-start md:w-3/4 md:pl-4">
                <div className="mb-2">
                  <p className="font-semibold">{item?.product?.title}</p>
                  <p className="text-sm text-gray-600">{item?.proudct?.brand}</p>
                </div>

                {/* Quantity Control */}
                <div className="flex items-center mb-2">
                  <Button disabled={item.quantity <= 1} onClick={() => handleUpdateCartItem(-1)}>-</Button>
                  <span className="mx-2">{item?.quantity}</span>
                  <Button onClick={() => handleUpdateCartItem(+1)}>+</Button>
                </div>

                {/* Product Price Details */}
                <div className="mb-2 flex gap-2">
                  <div className="text-sm text-blue-600">
                    {/* ₹{(item.price - item.discount) * item.quantity} */}
                    ₹{item?.discountedPrice}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {/* ₹{item.price * item.quantity} */}
                    ₹{item?.price}
                  </div>
                  <div className="text-sm text-green-600">
                    {/* - ₹{item.discount * item.quantity} (Discount) */}
                    {item?.product?.discountPersent}% OFF
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Cart Summary Section - Fixed to the bottom */}
      <div className="bg-white p-4 shadow-lg w-full lg:w-64 self-end md:sticky bottom-0">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Total Price</span>
          <span>₹{cart?.cart?.totalPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Discount</span>
          <span>- ₹{cart.cart?.discounte}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Delivery Charges</span>
          {/* <span>{deliveryCharges === 0 ? "Free" : `₹${deliveryCharges}`}</span> */}
          <span>Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Total Amount</span>
          <span>₹{cart?.cart?.totalDiscountedPrice}</span>
        </div>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          className="py-2"
          onClick={handleCheckout}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
