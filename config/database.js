const mongoose = require("mongoose");
require("dotenv").config();

/**
 * Establishes a connection to the MongoDB database using Mongoose.
 * 
 * @function dbConnect
 * @returns {void}
 * @throws {Error} Logs an error message and exits the process if the connection fails.
 */
exports.dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch(error => {
        console.error("Some error occurred while connecting to the database");
        console.error(error);
        
        // Exit the process with failure code (1) if the connection fails
        process.exit(1);
    });
};
