import React from "react";
import { Button } from "@mui/material";
import { removeCartItem, updateCartItem } from "../../../state/cart/Action";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch } from "react-redux";

const CartItem = ({item}) => {

  const dispatch = useDispatch();


  const handleUpdateCartItem = (num) => {
    const data = { data: { quantity: item.quantity + num }, cartItemId: item?._id }
    // console.log("update data ", data)
    dispatch(updateCartItem(data))
  }


  const handleRemoveItemFromCart = () => {
    // const data = { cartItemId: item?._id};
    dispatch(removeCartItem(item._id));
  };



  return (
    <tr className="border-b py-4">
      {/* Product Image */}
      <td className="py-2">
        <img src={item?.product?.images[0]} alt={item.name} className="w-20 h-20 object-cover" />
      </td>

      {/* Quantity Control */}
      <td className="py-2 flex items-center gap-4">
        <Button
          // variant="outlined"
          // onClick={() => handleDecreaseQuantity(item.id)}
          disabled={item.quantity <= 1} 
          onClick={() => handleUpdateCartItem(-1)}
          size="small"
        >
          <RemoveCircleOutlineIcon />
        </Button>
        <span>{item?.quantity}</span>
        <Button
          // variant="outlined"
          // onClick={() => handleIncreaseQuantity(item.id)}
          // disabled={item.quantity <= item?.product?.quantity} 
          onClick={() => handleUpdateCartItem(+1)}
          size="small"
        >
          <AddCircleOutlineIcon />

        </Button>
      </td>

      {/* Discounted Price */}
      <td className="py-2">
        {/* ₹{(item.price - item.discount).toFixed(2)} */}
        ₹{item?.discountedPrice}
      </td>

      {/* Original Price */}
      <td className="py-2">
        {/* ₹{item.price.toFixed(2)} */}
        ₹{item?.price}
      </td>

      {/* Off Percentage */}
      <td className="py-2 text-green-600">
        {/* {Math.round(((item.discount / item.price) * 100))}% OFF */}
        {item?.product?.discountPersent}% OFF
      </td>

      {/* Remove Button */}
      <td className="py-2 text-red-500 cursor-pointer">
        <Button
          variant="text"
          // onClick={() => handleRemoveItem(item.id)}
          onClick={handleRemoveItemFromCart}
          className="text-sm"
        >
          Remove
        </Button>
      </td>
    </tr>
  );
};

export default CartItem;
