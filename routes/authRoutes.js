const express = require("express");
const router = express.Router();
const {sendSMS, registerUser} = require("../controllers/authController");


router.post("/send-sms", sendSMS);
router.post("/register",registerUser);



module.exports = router;