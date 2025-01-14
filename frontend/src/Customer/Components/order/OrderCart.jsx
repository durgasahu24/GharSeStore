function OrderCart({ product }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex items-center">
      <div className="w-24 h-24 mr-6">
        <img className="w-full h-full object-cover rounded" src={product?.product?.images[0]} alt="img" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-800">Size : {product?.size}</p>
        <p className="text-gray-600">Original Price : <span className="line-through">{product?.price}</span></p>
        <p className="text-gray-500">Discounted Price : {product?.discountedPrice}</p>
        <p className="text-gray-500">Discount: {product?.product?.discountPersent}% off</p>
      </div>
    </div>
  );
}

export default OrderCart;
