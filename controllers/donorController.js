const donorModel = require("../models/donorModel");

exports.addDonor = async (req, res) => {
  try {
    const { user, phoneNumber, bloodGroup, location, quantity } = req.body;

    if (!user || !phoneNumber || !bloodGroup || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDonor = new donorModel({
      user,
      phoneNumber,
      bloodGroup,
      location,
      bloodQuantity: quantity,
    });

    await newDonor.save();
    res
      .status(201)
      .json({ message: "Donor added successfully", donor: newDonor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getDonors = async (req, res) => {
  try {
    const { bloodGroup, location } = req.query;

    if (!bloodGroup || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const donors = await donorModel
      .find({ bloodGroup, location })
      .populate("user");

    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    res.status(200).json({ message: "Donors fetched successfully", donors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.requestDonor = async (req, res) => {
  try {
    const { userId, bloodGroup, location } = req.body;

    if (!userId || !bloodGroup || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const donors = await donorModel
      .find({
        bloodGroup,
        location,
        user: { $ne: userId }, // Exclude the requester from the results
      })
      .populate("user");

    if (donors.length === 0) {
      return res.status(404).json({ message: "No donors found" });
    }

    res.status(200).json({ message: "Donors fetched successfully", donors });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getAllrequests = async (req, res) => {
  try {
    const requests = await donorModel.find({}).populate("user");

    if (requests.length === 0) {
      return res.status(404).json({ message: "No requests found" });
    }

    res
      .status(200)
      .json({ message: "Requests fetched successfully", requests });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
