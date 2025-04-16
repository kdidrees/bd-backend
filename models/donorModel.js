const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, ref: "User" },
    PhoneNumber: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    location: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const donorModel = mongoose.model("Donor", DonorSchema);
module.exports = donorModel;
