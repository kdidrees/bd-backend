const express = require("express");
const router = express.Router();
const {verifyOTP, registerUser} = require("../controllers/authController");


router.post("/register",registerUser);
router.post("/verify-otp", verifyOTP);


module.exports = router;