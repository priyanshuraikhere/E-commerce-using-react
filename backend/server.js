require("dotenv").config();
require("./cron/updateUserStatus"); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const paymentRoutes = require("./routes/payment");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/Cart");
const adminRoutes = require("./routes/admin");

const app = express();

app.use(cors());
app.use(express.json());


mongoose
  .connect(process.env.MONGODB_URI)
  // .then(() => console.log("MongoDB connected"))
  // .catch((err) => console.error("MongoDB error:", err));

app.use("/uploads", express.static("uploads"));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api", productRoutes);
app.use("/api/cart", cartRoutes);


app.use("/admin" , adminRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

