import React, { useState, useEffect } from "react";
import { Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import RecentReviewRating from "./RecentReviewRating";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { findProductsById } from "../../../state/Product/Action";
import { addItemToCart } from "../../../state/cart/Action";
import HomeSectionCard from "../HomeSectionCard/HomeSectionCard";
import RelatedProduct from "./RelatedProduct";
import { getUser } from "../../../state/Auth/Action";
import { toast } from "react-toastify";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const jwt = localStorage.getItem("jwt");
  const { products, auth } = useSelector((store) => store);

  const [mainImage, setMainImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");


  console.log("Product sizes:", products?.product?.category);


  useEffect(() => {
    dispatch(findProductsById(params.productId));
  }, [params.productId, dispatch]);


  useEffect(() => {
    if (products?.product?.images?.length > 0) {
      setMainImage(products.product.images[0]);
      dispatch(getUser(jwt))

    }
  }, [products, jwt]);

  const handleSizeClick = (size) => {
    console.log("handleSizeClick: ", size);
    setSelectedSize(size);
  };

  const handleAddToCart = ({ selectedSize = "S" }) => {
    if (!auth?.user) {
      toast.success("Please register or login first")
      navigate("/register")
      return
    }

    const data = { productId: products?.product?._id, size: selectedSize };
    console.log("Added to cart data: ", data);
    dispatch(addItemToCart(data));

    navigate("/Cart");
  };

  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-screen lg:mt-[68px]">
        <div className="flex flex-col-reverse lg:flex-row items-start gap-4">
          <div className="flex flex-row lg:flex-col gap-4 w-full lg:w-auto">
            {products?.product?.images?.map((img, index) => (
              <div
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 border rounded-lg overflow-hidden cursor-pointer ${mainImage === img ? "border-blue-500" : "border-gray-300"
                  }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="w-full h-96 md:h-100 lg:h-[640px] border rounded-lg overflow-hidden">
            <img
              src={mainImage || "https://via.placeholder.com/640"} // Fallback if mainImage is null
              alt="Main product"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="flex-col justify-center items-center min-h-screen pt-8">
          <h1 className="text-3xl font-bold mb-4">{products?.product?.title || "Product Title"}</h1>

          <div className="flex items-baseline mb-4">
            <p className="text-2xl font-semibold text-blue-600">
              ₹ {products?.product?.discountedPrice || "0"}
            </p>
            {products?.product?.discountedPrice && (
              <>
                <p className="text-sm text-gray-500 line-through ml-3">
                  ₹ {products?.product?.price}
                </p>
                <p className="text-sm text-green-600 ml-3">
                  {products?.product?.discountPersent || "0"}% off
                </p>
              </>
            )}
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Select Size:</h3>
            <Stack direction="row" spacing={2} className="flex-wrap">
              {products?.product?.sizes?.map((size, index) => (
                <Button
                  key={index}
                  variant={selectedSize === size.name ? "contained" : "outlined"}
                  color={selectedSize === size.name ? "primary" : "inherit"}
                  onClick={() => handleSizeClick(size.name)}
                  className={`size-button ${selectedSize === size.name ? "selected-size" : ""
                    }`}
                >
                  {size.name}
                </Button>
              ))}
            </Stack>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{products?.product?.description || "No description available."}</p>

          {/* Add to Cart and Buy Now Buttons */}

              <div className="flex gap-6">

                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                >
                  Add to Cart
                </button>
              </div>


          {/* Recent Review Rating */}
          <RecentReviewRating Id={params?.productId} />
        </div>

      </div>
      <RelatedProduct categoryId={products?.product?.category} />
    </div>
  );
};

export default ProductDetailPage;
