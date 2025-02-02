const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    prompts: [
        {
            type: String,
        }
    ],
    resetPasswordExpires: {
        type: Date,
    },
    token: {
        type: String,
    }
});

module.exports = mongoose.model("User", userSchema);