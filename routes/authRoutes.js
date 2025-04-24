const express = require("express");
const router = express.Router();
const {
  verifyOTP,
  registerUser,
  onboardUser,
  resendOTP
} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/verify-otp", verifyOTP);
router.post("/onboard-user", onboardUser)
router.post("/resend-otp", resendOTP);

module.exports = router;