const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const upload = require("../middleware/upload");

const router = express.Router();



router.post("/signup", upload.single("profileImage"), async (req, res) => {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    gender,
    age,
    phone,
    addressLine1,
    addressLine2,
    state,
    district,
    pincode,
  } = req.body;

  const profileImage = req.file ? req.file.filename : "";

  try {
    const existingUser = await User.findOne({ $or: [ { username }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      gender,
      age,
      phone,
      addressLine1,
      addressLine2,
      state,
      district,
      pincode,
      profileImage,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        profileImage: newUser.profileImage,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Signup failed", error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("Login request received:", username, password);

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password matched:", isMatch);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res
      .status(500)
      .json({ message: "Login failed", error: err.message });
  }
});


module.exports = router;


