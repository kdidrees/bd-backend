const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "Default Name",
    },
    email: {
      type: String,
      required: true,
      default: "user@example.com",
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    gender: {
      type: String,
      required: true,
      default: "gender",
    },
    address: {
      type: String,
      required: true,
      default: "Default Address",
    },
    state: {
      type: String,
      required: true,
      default: "Default State",
    },
    location: {
      type: String,
      required: true,
      default: "Default Location",
    },
    password: {
      type: String,
      required: true,
      default: "defaultPassword",
    },
    otp: {
      type: String,
      required: false,
    },
    otpExpire: {
      type: Number,
      required: false,
    },
    bloodGroup: {
      type: String,
      required: true,
      default: "defaultBloodGroup",
    },
    longitude: {
      type: String,
      required: true,
      default: "longitude",
    },
    latitude: {
      type: String,
      required: true,
      default: "latitude",
    },
  },
  {
    timestamps: true,
  }
);
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;