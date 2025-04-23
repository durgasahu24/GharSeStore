import React, { useState } from "react";
import { createProduct } from "../state/Product/Action";
import { useDispatch } from "react-redux";

const initialSizes = [{ name: "S", quantity: "" }, { name: "M", quantity: "" }, { name: "L", quantity: "" }];
const categoryOptions = {
  topLevel: ["Men", "Women"],
  secondLevel: ["Clothing", "Accessories", "Brands"],
  thirdLevel: ["Top", "Women Dresses", "T-Shirts", "Dresses", "Shirt", "Men_Jeans"],
};

const CreateProductForm = () => {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState({
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPercent: "",
    size: initialSizes,
    quantity: "",
    topLevelCategory: "",
    secondLevelCategory: "",
    thirdLevelCategory: "",
    description: "",
    images: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("name , value : ", name, value);
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name] = value;
    setProductData((prevState) => ({
      ...prevState,
      size: sizes,
    }));
  };

  const handleAddSize = () => {
    setProductData((prevState) => ({
      ...prevState,
      size: [...prevState.size, { name: "", quantity: "" }],
    }));
  };




  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setProductData((prevState) => {
      const updatedImages = [...prevState.images]; // Clone the existing images array

      if (name === "mainImage" && files[0]) {
        updatedImages[0] = files[0]; // Save the main image in the first index
      } else if (name === "subImages" && files.length > 0) {
        const subImages = Array.from(files); // Convert FileList to array
        updatedImages.splice(1, updatedImages.length - 1, ...subImages); // Append sub images
      }

      return {
        ...prevState,
        images: updatedImages, // Update the images array
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
      if (key === "images") {
        // Append images as an array
        productData.images.forEach((image) => {
          if (image) {
            formData.append("images", image); // Append each image to "images"
          }
        });
      } else if (key === "size") {
        productData.size.forEach((size, idx) => {
          formData.append(`sizes[${idx}].name`, size.name);
          formData.append(`sizes[${idx}].quantity`, size.quantity);
        });
      } else {
        formData.append(key, productData[key]);
      }
    });

    // Log the formData to see what's being sent
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]); // This helps to debug the formData
    }

    dispatch(createProduct(formData));
  };


  return (
    <form className="max-w-full bg-white p-6 md:p-8 lg:p-10 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-700 font-medium">Brand Name</label>
          <input
            type="text"
            name="brand"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter brand name"
            value={productData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Title"
            value={productData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Color</label>
          <input
            type="text"
            name="color"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Color"
            value={productData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Price</label>
          <input
            type="number"
            name="price"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Price"
            value={productData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Discounted Price</label>
          <input
            type="number"
            name="discountedPrice"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Discounted Price"
            value={productData.discountedPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Discount Percent</label>
          <input
            type="number"
            name="discountPercent"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Discount Percent"
            value={productData.discountPercent}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Description</label>
          <input
            type="text"
            name="description"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Description of product"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium">Quantity</label>
          <input
            type="number"
            name="quantity"
            className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
            placeholder="Enter Quantity"
            value={productData.quantity}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      {/* Category Selects */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Top Category</label>
        <select
          name="topLevelCategory"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          value={productData.topLevelCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {categoryOptions.topLevel.map((category) => (
            <option key={category} value={category.toLowerCase()}>{category}</option>
          ))}
        </select>
      </div>

      {/* Second Category */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Second Category</label>
        <select
          name="secondLevelCategory"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          value={productData.secondLevelCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {categoryOptions.secondLevel.map((category) => (
            <option key={category} value={category.toLowerCase()}>{category}</option>
          ))}
        </select>
      </div>

      {/* Third Category */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Third Category</label>
        <select
          name="thirdLevelCategory"
          className="w-full mt-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
          value={productData.thirdLevelCategory}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {categoryOptions.thirdLevel.map((category) => (
            <option key={category} value={category.toLowerCase()}>{category}</option>
          ))}
        </select>
        
      </div>

      {/* Size and Quantity */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Size and Quantity</label>
        <div className="space-y-4">
          {productData.size.map((size, index) => (
            <div key={index} className="flex text-sm flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                type="text"
                name="name"
                placeholder="Size"
                className="w-20 p-3 border rounded-lg focus:outline-none"
                value={size.name}
                onChange={(e) => handleSizeChange(e, index)}
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="w-full p-3 border rounded-lg focus:outline-none"
                value={size.quantity}
                onChange={(e) => handleSizeChange(e, index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Image */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Main Image</label>
        <input
          type="file"
          name="mainImage"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm mt-1 p-3 border rounded-lg focus:outline-none"
          required
        />
      </div>

      {/* Sub Images */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium">Sub Images</label>
        <input
          type="file"
          name="subImages"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full text-sm mt-1 p-3 border rounded-lg focus:outline-none"
        />
      </div>

      <div className="mt-6 text-center">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
          Submit Product
        </button>
      </div>
    </form>
  );
};

export default CreateProductForm;
