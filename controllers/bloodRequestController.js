const BloodRequestModel = require("../models/bloodRequestModel");

exports.addBloodRequest = async (req, res) => {
  try {
    const userId = "67fe31052961146ef9c3f3e8";
    const { donorId, bloodGroup, location, quantity } = req.body;

    if (!userId || !donorId || !bloodGroup || !location || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingRequests = await BloodRequestModel.findOne({
      user: userId,
      status: "pending",
    }).countDocuments();

    const duplicatedonor = await BloodRequestModel.aggregate([
      {
        $match: {
          user: userId,
          donorId: donorId,
          status: "pending",
        },
      },
      {
        $group: {
          _id: "$donorId",
          count: { $sum: 1 },
        },
      },
    ]);

    console.log("duplicatedonor", duplicatedonor);

    if (duplicatedonor.length > 0) {
      return res.status(400).json({
        status: "failed",
        message: "You have already requested blood from this donor",
      });
    }

    console.log("existingRequests", existingRequests);

    if (existingRequests > 3) {
      return res
        .status(400)
        .json({ status: "failed", message: "You have already exceed limit " });
    }

    const newRequest = new BloodRequestModel({
      user: userId,
      donorId,
      bloodGroup,
      location,
      quantity,
      status: "pending",
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
    const userId = req.userId;

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

exports.updateBloodRequestStatus = async (req, res) => {
  try {
    const { requestId, status } = req.body;

    if (!requestId || !status) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }
    const request = await BloodRequestModel.findById(requestId);
    if (!request) {
      return res
        .status(404)
        .json({ status: "failed", message: "Request not found" });
    }

    request.status = status;
    await request.save();

    res.status(200).json({
      status: "success",
      message: "Request status updated successfully",
      request,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getBloodRequests = async (req, res) => {
  try {
    const requests = await BloodRequestModel.find();
    if (requests.length === 0) {
      return res
        .status(404)
        .json({ status: "failed", message: "No requests found" });
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
