const express = require("express");
const { auth } = require("../middlewares/Auth"); 
const userRoutes = require("../controller/Auth");
const router = express.Router();

router.post("/signup", userRoutes.signup);
router.post("/login", userRoutes.login);
router.get("/getUserDetails", auth, userRoutes.getUserDetails);
router.post("/editUser", auth, userRoutes.editUserDetails );

module.exports = router;