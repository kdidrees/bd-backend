const BloodRequestModel = require("../models/bloodRequestModel");
const userModel = require("../models/userModel");

exports.addBloodRequest = async (req, res) => {
  try {
    const { userId, donorId, bloodGroup, location, quantity } = req.body;

    if (!userId || !donorId || !bloodGroup || !location || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = new BloodRequestModel({
      user: userId,
      donorId,
      bloodGroup,
      location,
      quantity,
    });

    await newRequest.save();
    res.status(201).json({
      message: "Blood request added successfully",
      request: newRequest,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBloodRequests = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const requests = await BloodRequestModel.find({ user: userId }).populate(
      "user donorId"
    );
    if (requests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res.status(200).json({
      status: "success",
      message: "Requests fetched successfully",
      requests,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
