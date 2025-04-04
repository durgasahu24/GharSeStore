// productModel.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    // required: true,
  },
  price: {
    type: Number,
    // required: true,
  },
  discountedPrice: {
    type: Number,
  },
  discountPersent: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true
  },
  color: {
    type: String,
  },
  sizes: [{
    name: { type: String },
    quantity: { type: Number },
    _id: false,
  }],
  images: {  // Updated to an array of image URLs
    type: [String],  // Array of strings (URLs of images)
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ratings',
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reviews',
    },
  ],
  numRatings: {
    type: Number,
    default: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('products', productSchema);

module.exports = Product;
