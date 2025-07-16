const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Profile update failed" });
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.params.id;

    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: "Incorrect password" });

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(userId, { password: hashedPassword });

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Password update failed" });
  }
};

exports.updateUserProfileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const profileImage = req.file?.filename;
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
    res.status(500).json({ error: "Image update failed" });
  }
};

exports.deleteprofileImage = async (req, res) => {
  try {
    const userId = req.params.id;
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profileImage: "" },
      { new: true }
    ).select("-password");

    res.json({ message: "Image deleted", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: "Image deletion failed" });
  }
};


// exports.updateUserStatus = async (req, res) => {
//   try {
//     const userId = req.params.id;
//     const { isActive } = req.body;
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { isActive },
//       { new: true }
//     ).select("-password");

//     res.json({ message: "User status updated", user: updatedUser });
//   } catch (err) {
//     res.status(500).json({ error: "Status update failed" });
//   }
// };
