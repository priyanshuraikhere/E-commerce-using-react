const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  text: String,
  image: String,
});

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  image1: String,
  image2: String,
  image3: String,
  rating: {
    rate: Number,
    count: Number,
  },
  reviews: [reviewSchema], 
});

module.exports = mongoose.model("Product", productSchema);