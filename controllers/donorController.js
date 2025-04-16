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
