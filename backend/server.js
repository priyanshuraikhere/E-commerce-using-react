const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/auth");
// const jwt = require("jsonwebtoken");
const Stripe = require("stripe");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const verifyToken = require("./middleware/auth");

dotenv.config();


const app = express();
const stripe =  new Stripe(process.env.STRIPE_SECRET_KEY);

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const upload = require("./middleware/upload");
app.use("/uploads", express.static("uploads"));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB error:", err));



app.get("/api/users/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); 
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});







app.put("/api/users/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { firstName , lastName, username, email, gender, age , phone, addressLine1,addressLine2, state, district,
    pincode, } = req.body;

    
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "You can only update your own profile" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if email is being changed and if it's already taken
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    
    const updateData = {};
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (username) updateData.username = username;
    if (email) updateData.email = email;
    if (gender) updateData.gender = gender;
    if (age) updateData.age = age;
    if (phone) updateData.phone = phone;
    if (addressLine1) updateData.addressLine1 = addressLine1;
    if (addressLine2) updateData.addressLine2 = addressLine2;
    if (state) updateData.state = state;
    if (district) updateData.district = district;
    if (pincode) updateData.pincode = pincode;

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updateData, 
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ 
      message: "Profile updated successfully", 
      user: updatedUser 
    });
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Profile update failed" });
  }
});



app.put("/api/users/:id/password", verifyToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required" });
    }

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "You can only update your own password" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(400).json({ error: "Current password is incorrect" });
    }

    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.findByIdAndUpdate(userId, { password: hashedNewPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Password update failed" });
  }
});



app.put("/api/users/:id/profile-image", verifyToken, upload.single("profileImage"), async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const profileImage = req.file ? req.file.filename : null;

    if (!profileImage) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    ).select("-password");

    res.json({ message: "Image updated", user: updatedUser });
  } catch (err) {
    console.error("Image update error:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});



app.post("/create-checkout-session", async (req, res) => {
  const { cartItems } = req.body;
  // console.log(" Cart Items Received:", cartItems);

  const line_items = cartItems.map((item) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: item.title,
        images: [item.image],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "http://localhost:5173/success",
      
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error("Stripe Session Error:", err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

































