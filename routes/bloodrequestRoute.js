const express = require("express");
const router = express.Router();
const bloodRequestController = require("../controllers/bloodRequestController");

router.post("/add", bloodRequestController.addBloodRequest);
router.get("/get", bloodRequestController.getBloodRequests);
router.put("/update", bloodRequestController.updateBloodRequestStatus);

module.exports = router;
