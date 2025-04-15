const express = require("express");
const router = express.Router();
const {sendSMS} = require("../controllers/authController");


router.post("/send-sms", sendSMS);



module.exports = router;