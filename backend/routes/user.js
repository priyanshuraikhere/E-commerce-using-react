const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const verifyToken = require("../middleware/auth");
const auth = require("../middleware/authenticated")
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  updateUserPassword,
  updateUserProfileImage,
  deleteprofileImage,
  // updateUserStatus
} = require("../controllers/userController");

router.get("/users" , auth("admin") , getAllUsers)
router.get("/:id", verifyToken, getUserProfile);
router.put("/:id", verifyToken, updateUserProfile);
router.delete("/:id/profile-image", verifyToken, deleteprofileImage);
router.put("/:id/password", verifyToken, updateUserPassword);
router.put("/:id/profile-image", verifyToken, upload.single("profileImage"), updateUserProfileImage);
// router.put("/:id/status", verifyToken, updateUserStatus);

module.exports = router;
