


const reviewService = require("../services/review.service.js");

const createReview = async (req, res) => {
  const user = req.user;
  try {
    const review = await reviewService.createReview(req.body, user);
    return res.status(201).send(review);
  } catch (error) {
    return res.status(500).send({ error: error.message }); // Corrected typo here
  }
};


const getAllReview = async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  try {
    const reviews = await reviewService.getAllReview(productId);
    return res.status(200).send(reviews); // Changed status to 200 OK for successful retrieval
  } catch (error) {
    console.log("reviews in get all reviews : ", error.message)
    return res.status(500).send({ error: error.message }); // Corrected typo here
  }
};


module.exports = {
  createReview,
  getAllReview
};
