import React from "react";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product?._id}`);
    };

    return (
        <div
            onClick={handleNavigate}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 duration-300 cursor-pointer w-full"
        >

            <img
                className="w-full 
                    h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px] xl:h-[350px] 
                    object-cover 
                    hover:scale-110 
                    transition 
                    ease-in-out"
                src={product.images[0] || "https://via.placeholder.com/280"}
                alt={product.title}
            />

            {/* Product Details */}
            <div className="p-4 sm:p-1 md:p-3">
                {/* Product Description */}
                <p className="text-gray-600 text-sm sm:text-base mt-1 line-clamp-2">
                    {product.title || "No description available."}
                </p>



                <div className="flex flex-col sm:flex-row justify-between items-start ml-4 md:ml-10">
                    <div>
                        <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-blue-600">
                            ₹{product.discountedPrice}
                        </span>

                        <span className="line-through text-gray-500 ml-2 text-xs sm:text-sm md:text-base lg:text-lg">
                            ₹{product.price}
                        </span>


                        {/* Discount percentage */}
                        <span className="text-green-600 ml-2 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-0 hidden md:block">
                            {product?.discountPersent} %off
                        </span>

                    </div>
                    <div className="text-green-600 ml-2 text-xs sm:text-sm md:text-base lg:text-lg mt-1 sm:mt-0  sm:hidden">
                        22 % off
                    </div>
                </div>

            </div>
        </div>
    );
};
