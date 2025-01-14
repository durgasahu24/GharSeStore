function PriceDetails({ totalPrice, discountApplied}) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h4 className="text-xl font-semibold mb-4">Price Details</h4>
        <p className="text-gray-700">Subtotal (Products): ₹ {totalPrice}</p>
        <p className="text-gray-700">Discount Applied: ₹ {discountApplied}</p>
        <p className="text-gray-700">Delivery Charge: ₹  Free</p>
        <hr className="my-4" />
        <p className="font-semibold text-lg">Total Price:₹ {discountApplied}</p>
        {/* <button className="w-full mt-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">
          Proceed to Payment
        </button> */}
      </div>
    );
  }
  
  export default PriceDetails;
  