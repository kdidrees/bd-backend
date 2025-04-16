const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const donorModel = mongoose.model("Donor", DonorSchema);
module.exports = donorModel;
