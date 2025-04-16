const express = require("express");
const router = express.Router();
const { addDonor, getDonors } = require("../controllers/donorController");


// Route to add a new donor
router.post("/add-donor", addDonor);
router.get("/get-donors", getDonors);

module.exports = router;