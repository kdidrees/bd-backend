const express = require("express");
const router = express.Router();
const bloodRequestController = require("../controllers/bloodRequestController");

router.post("/add", bloodRequestController.addBloodRequest);

module.exports = router;
