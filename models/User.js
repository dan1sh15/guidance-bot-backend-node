const mongoose = require("mongoose");

/**
 * Mongoose schema for User collection
 * @typedef {Object} User
 * @property {string} name - Full name of the user (required)
 * @property {string} email - Email address of the user (required, unique)
 * @property {string} password - Hashed password of the user (required)
 * @property {string[]} prompts - Array of stored prompts (optional)
 * @property {Date} resetPasswordExpires - Expiration date for password reset token (optional)
 * @property {string} token - JWT token for authentication (optional)
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // Removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures email is unique in the database
      lowercase: true, // Converts email to lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensures password has a minimum length
    },
    prompts: [
      {
        type: String,
      },
    ],
    resetPasswordExpires: {
      type: Date,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt`
  }
);

module.exports = mongoose.model("User", userSchema);
