const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware to authenticate a user using JWT token.
 * 
 * @async
 * @function auth
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {Object} JSON response if authentication fails, otherwise calls `next()`
 */
exports.auth = async (req, res, next) => {
  try {
    // Retrieve token from request body or header
    const token = req.body.token || req.header("auth-token");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    try {
      // Verify the JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user data to the request object
      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }
  } catch (error) {
    console.error("Authentication Middleware Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error while validating token.",
    });
  }
};
