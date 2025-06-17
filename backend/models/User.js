const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  gender: String,
  age: String,
  phone: String,
  addressLine1: String,
  addressLine2: String,
  state: String,
  district: String,
  pincode: String,
  profileImage: String,

});

module.exports = mongoose.model("User", userSchema);
