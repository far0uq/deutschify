const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUsername,
  updateUserPassword,
  updateProficiency,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/update-username", updateUsername);
router.post("/update-password", updateUserPassword);
router.post("/update-proficiency-level", updateProficiency);

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);

module.exports = router;
