const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

// @desc    Register User
// route    POST /api/user/register
// @access  Public
// const registerUser = asyncHandler(async (req, res) => {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: "Invalid credentials." });
//   }

//   Check if username exists
//   const usernameExists = await User.findOne({ username });
//   if (usernameExists) {
//     return res.status(400).json({ error: "User already exists." });
//   }

//   Check if email exists
//   const emailExists = await User.findOne({ email });
//   if (emailExists) {
//     return res.status(400).json({ error: "Email already exists." });
//   }

//   Hash password
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(password, salt);

//   Create user
//   const user = await User.create({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   if (user) {
//     return res.status(200).json({
//       _id: user.id,
//       username: user.username,
//       email: user.email,
//     });
//   } else {
//     return res.status(400).json({ error: "Invalid user data." });
//   }
// });

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  console.log("Received registration request:", { username, email });

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Check if username exists
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    console.log("Username already exists");
    return res.status(400).json({ error: "Username already exists." });
  }

  // Check if email exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    console.log("Email already exists");
    return res.status(400).json({ error: "Email already exists." });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let user;
  try {
    user = await User.create({
      username,
      email,
      password: hashedPassword,
      proficiency_level: 0,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ error: "Failed to create user." });
  }

  if (user) {
    console.log("User created successfully:", user);
    return res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      proficiency_level: user.proficiency_level,
    });
  } else {
    console.log("Failed to create user.");
    return res.status(400).json({ error: "Failed to create user." });
  }
});

// @desc    Authenticate User
// route    POST /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user email
    const user = await User.findOne({ email });
    console.log("🚀 ~ file: userController.js:61 ~ loginUser ~ user:", user);

    if (user && (await bcrypt.compare(password, user.password))) {
      generateToken(res, user._id);
      res.status(201).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        proficiency_level: user.proficiency_level,
      });
    } else {
      return res.status(400).json({ error: "Invalid credentials." });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Server error. Please try again later." });
  }
});

// @desc    Logout User
// route    POST /api/user/logout
// @access  Public
const logoutUser = (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

// @desc    Get user data
// @route   Get /api/user/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "get user profile" });
});

// Update username
const updateUsername = asyncHandler(async (req, res) => {
  const { newUsername, email } = req.body; // Extract email from request body

  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await User.findOneAndUpdate(
      { email }, // Use email for finding the user
      { username: newUsername }
    );
    res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update password
const updateUserPassword = asyncHandler(async (req, res) => {
  const { newPassword, email } = req.body; // Extract email from request body

  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate(
      { email }, // Use email for finding the user
      { password: hashedPassword }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update proficiency level
const updateProficiency = asyncHandler(async (req, res) => {
  const { proficiencyPoints, email } = req.body;

  if (!email) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await User.findOneAndUpdate(
      { email }, // Use email for finding the user
      { proficiency_level: proficiencyPoints }
    );
    res.status(200).json({ message: "Proficiency level updated successfully" });
  } catch (error) {
    console.error("Error updating proficiency level:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser,
  updateUsername,
  updateUserPassword,
  updateProficiency,
};
