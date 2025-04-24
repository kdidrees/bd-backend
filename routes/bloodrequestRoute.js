const express = require("express");
const router = express.Router();
const bloodRequestController = require("../controllers/bloodRequestController");

router.post("/", bloodRequestController.addBloodRequest);
router.get("/", bloodRequestController.getBloodRequests);
router.put("/", bloodRequestController.updateBloodRequestStatus);

module.exports = router;
