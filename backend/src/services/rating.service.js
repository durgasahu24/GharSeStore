const Rating = require("../models/ratings.model.js")
const productService = require("../services/product.service.js")


async function createRating(reqData, user) {
  try {
    console.log("Product ID:", reqData.productId);
    const product = await productService.findProductById(reqData.productId);

    if (!product) {
      throw new Error("Product not found with ID " + reqData.productId);
    }

    // Check if user already rated the product
    // const existingRating = await Rating.findOne({ product: product._id, user: user._id });
    // if (existingRating) {
    //   throw new Error("User has already rated this product.");
    // }

    // Create new rating
    const rating = new Rating({
      product: product._id,
      user: user._id,
      rating: reqData.rating,
      createdAt: new Date(), // Consider using a library for timezone consistency
    });

    console.log("New Rating:", rating);

    // Save the rating and update the product
    await rating.save();
    product.ratings.push(rating._id);
    await product.save();

    console.log("Updated Product Ratings:", product.ratings);

    return product; // Optional: Return if required
  } catch (error) {
    console.error("Error in createRating:", error.message);
    throw error; // Rethrow the error for higher-level handling
  }
}




async function getProductsRating(productId) {  

  const product = await productService.findProductById(productId);

  if (!product) {
    throw new Error("Product not found with id " + productId); // Improved error handling
  }

  const ratings = await Rating.find({ product: productId }).populate("user");
  return ratings;

  if (ratings.length === 0) {
    return []; // Or you can return an empty array [] if you prefer
  }


  // return await Rating.find({ product: productId });
}



module.exports = {
  createRating,
  getProductsRating
}