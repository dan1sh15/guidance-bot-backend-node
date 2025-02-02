const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Registers a new user.
 * 
 * @async
 * @function signup
 * @param {Object} req - Express request object containing user details in `req.body`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status, message, and user data if successful
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "Please fill all the required fields properly",
      });
    }

    // Validate password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password didn't match, please try again",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const userData = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload = { email: userData.email, id: userData._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: userData,
      token,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again",
    });
  }
};

/**
 * Logs in an existing user.
 * 
 * @async
 * @function login
 * @param {Object} req - Express request object containing login credentials in `req.body`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with success status, message, user details, and JWT token if successful
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required, please try again",
      });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered, please signup first",
      });
    }

    // Validate password and generate JWT token
    if (await bcrypt.compare(password, user.password)) {
      const payload = { email: user.email, id: user._id };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

      return res.status(200).json({
        success: true,
        message: "Logged in successfully",
        user,
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error, please try again",
    });
  }
};

/**
 * Fetches the details of the authenticated user.
 * 
 * @async
 * @function getUserDetails
 * @param {Object} req - Express request object containing user ID in `req.user`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with user details
 */
exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;

    // Fetch user details and populate associated prompts
    const userDetails = await User.findById(id).populate("prompts").exec();

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User details can't be fetched",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Edits the details of the authenticated user.
 * 
 * @async
 * @function editUserDetails
 * @param {Object} req - Express request object containing updated user details in `req.body`
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with updated user details
 */
exports.editUserDetails = async (req, res) => {
  try {
    const { name } = req.body;
    const id = req.user.id;

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Update the user details
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { name } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Unable to update changes",
      });
    }

    req.user = user;

    return res.status(200).json({
      success: true,
      message: "User details updated successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
