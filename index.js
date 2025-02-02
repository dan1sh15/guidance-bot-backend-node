const express = require('express');
const app = express();
const { dbConnect } = require("./config/database");
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());
require("dotenv").config();

app.use(
    cors({
        origin: "*",
    })
);

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Server is up and running...",
    });
});

dbConnect();

app.use('/api/v1/auth', userRoutes);

app.listen(PORT, () => {
    console.log(`App is running successfully at port: ${PORT}`);
});