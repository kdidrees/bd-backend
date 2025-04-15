const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    location: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  { timestamps: true }
);


const UserProfileModel = mongoose.model("UserProfile", userProfileSchema);
module.exports = UserProfileModel;