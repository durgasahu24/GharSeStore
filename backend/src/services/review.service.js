

const Review = require("../models/review.model.js")
const productService = require("../services/product.service.js")




async function createReview(reqData, user) {
  try {
    console.log("Product ID:", reqData.productId);
    const product = await productService.findProductById(reqData.productId);

    if (!product) {
      throw new Error("Product not found with ID " + reqData.productId);
    }

  
    // Create new review
    const review = new Review({
      product: product._id,
      user: user._id,
      review: reqData.review, // Assuming `review` field contains the text
      createdAt: new Date(),
    });

    console.log("New Review:", review);

    // Save the review and update the product
    await review.save();
    product.reviews.push(review._id); // Assuming the `Product` model has a `reviews` array
    await product.save();

    console.log("Updated Product Reviews:", product.reviews);

    return product; // Optional: Return if required
  } catch (error) {
    console.error("Error in createReview:", error.message);
    throw error; // Rethrow the error for higher-level handling
  }
}







async function getAllReview(productId) {


  //for getting user detail 
  const product = await productService.findProductById(productId);

  if (!product) {
    throw new Error("Product not found with id " + productId); // Improved error handling
  }

  const reviews = await Review.find({ product: productId }).populate("user");
  if (reviews.length === 0) {
    return []; // Or you can return an empty array [] if you prefer
  }
  return reviews;



}

module.exports = {
  createReview,
  getAllReview
};
