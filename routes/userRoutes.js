const express = require("express");
const { auth } = require("../middlewares/Auth"); 
const userController = require("../controller/Auth");

const router = express.Router();

/**
 * @route POST /api/user/signup
 * @desc Register a new user
 * @access Public
 */
router.post("/signup", userController.signup);

/**
 * @route POST /api/user/login
 * @desc Authenticate user and return JWT token
 * @access Public
 */
router.post("/login", userController.login);

/**
 * @route GET /api/user/getUserDetails
 * @desc Get authenticated user details
 * @access Private (requires authentication)
 */
router.get("/getUserDetails", auth, userController.getUserDetails);

/**
 * @route POST /api/user/editUser
 * @desc Edit authenticated user's details
 * @access Private (requires authentication)
 */
router.post("/editUser", auth, userController.editUserDetails);

module.exports = router;
