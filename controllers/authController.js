const UserModel = require("../models/userModel");
const UserProfileModel = require("../models/userProfileModel");
const { generateOTP } = require("../utils/otpUtils");
const sendOTPViaSMS = require("../utils/smsUtils");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const existingUser = await UserModel.findOne({ phoneNumber });

    // if (existingUser) {
    //   return res.status(400).json({ message: "User already exists" });
    // }

    if (existingUser) {
      const isOTPExpired =
        !existingUser.otpExpire || existingUser.otpExpire < Date.now();

      if (!isOTPExpired) {
        return res
          .status(400)
          .json({ message: "User already exists and OTP is still valid" });
      }

      const otp = generateOTP();
      const otpExpiry = Date.now() + 60 * 60 * 1000;

      // OTP is expired, send a new one
      const response = await sendOTPViaSMS(phoneNumber, otp);

      if (response.data.type === "SUCCESS") {
        await UserModel.findOneAndUpdate(
          { phoneNumber },
          { otp, otpExpire: otpExpiry },
          { new: true }
        );
        return res.status(200).json({
          status: "success",
          message: "OTP expired earlier. New OTP sent successfully",
        });
      } else {
        return res.status(500).json({
          status: "failed",
          message: "Failed to send OTP",
          error: response.data,
        });
      }
    }

    // New user - send OTP and create re

    const otp = generateOTP();
    const otpExpiry = Date.now() + 60 * 60 * 1000;

    const response = await sendOTPViaSMS(phoneNumber, otp);

    if (response.data.type === "SUCCESS") {
      await UserModel.findOneAndUpdate(
        { phoneNumber },
        { otp, otpExpire: otpExpiry },
        { upsert: true, new: true }
      );
      return res.status(201).json({
        status: "success",
        message: "user registered and OTP sent successfully",
      });
    } else {
      return res.status(500).json({
        status: "failed",
        message: "Failed to send OTP",
        error: response.data,
      });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required" });
    }

    const user = await UserModel.findOne({ phoneNumber: phone });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.otp = null;
    user.otpExpire = null;
    user.isVerified = true;

    await user.save();

    // generate a jwt token
    const token = jwt.sign(
      {
        userId: user._id,
        phoneNumber: user.phoneNumber,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRY || "7d" }
    );

    return res.status(200).json({
      status: "success",
      message: "OTP verified successfully",
      token,
      user: {
        _id: user._id,
        phoneNumber: user.phoneNumber,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.onboardUser = async (req, res) => {
  try {
    const {
      phone,
      name,
      email,
      age,
      gender,
      address,
      state,
      location,
      bloodGroup,
      longitude,
      latitude,
    } = req.body;

    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const user = await UserModel.findOne({ phoneNumber: phone });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const userProfile = new UserProfileModel({
      userId: user._id,
      name,
      email,
      age,
      gender,
      address,
      state,
      location,
      bloodGroup,
      latitude,
      longitude,
    });

    await userProfile.save();

    await UserModel.findByIdAndUpdate(user._id, { onboardingCompleted: true });

    return res.status(201).json({
      status: "success",
      message: "Onboarding completed successfully",
      userProfile,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
