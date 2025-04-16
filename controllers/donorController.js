const donorModel = require("../models/donorModel");

exports.addDonor = async (req, res) => {
  try {
    const { name, phoneNumber, bloodGroup, location } = req.body;

    if (!name || !phoneNumber || !bloodGroup || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newDonor = new donorModel({
      name,
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
