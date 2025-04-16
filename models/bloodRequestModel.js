const mongoose = require("mongoose");

const BloodRequestSchema = new mongoose.Schema({
  user: { type: String, required: true, ref: "User" },
  donorId: { type: String, required: true, ref: "User" },
  bloodGroup: { type: String, required: true },
  location: { type: String, required: true },
  quantity: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const BloodRequestModel = mongoose.model("BloodRequest", BloodRequestSchema);
module.exports = BloodRequestModel;
