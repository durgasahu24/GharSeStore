import React from "react";
import { useNavigate } from "react-router-dom";

export const HomeProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product?._id}`);
    };

    return (
        <div
            onClick={handleNavigate}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 hover:scale-[1.02] transition-transform duration-300 cursor-pointer max-w-[280px] mx-auto"
        >
            {/* Product Image */}
            <img
                className="w-full h-[200px] object-cover"
                src={product.imageUrl || "https://via.placeholder.com/280"}
                alt={product.title}
            />

            {/* Product Details */}
            <div className="p-4">
                <h2 className="font-bold text-base text-gray-800 truncate">{product.title}</h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
                <p className="text-gray-600 text-sm mt-1">Color: <span className="font-medium">{product.color}</span></p>
                <div className="flex justify-between items-center mt-3">
                    <div>
                        <span className="font-bold text-lg text-blue-600">₹{product.price}</span>
                        {product.originalPrice && (
                            <>
                                <span className="line-through text-gray-500 ml-2">
                                    ₹{product.originalPrice}
                                </span>
                                <span className="text-green-600 ml-2">
                                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
