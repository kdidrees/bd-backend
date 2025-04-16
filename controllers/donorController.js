const donorModel = require("../models/donorModel");

exports.addDonor = async (req, res) => {
  try {
    const { user, phoneNumber, bloodGroup, location } = req.body;

    if (!user || !phoneNumber || !bloodGroup || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDonor = new donorModel({
      user,
      phoneNumber,
      bloodGroup,
      location,
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
    const donors = await donorModel.find().populate("user", "phoneNumber");
    if (!donors) {
      return res
        .status(404)
        .json({ status: "failed", message: "No donors found" });
    }
    res
      .status(200)
      .json({
        status: "success",
        message: "Donors fetched successfully",
        donors,
      });
  } catch (error) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal server error" });
  }
};
