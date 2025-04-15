const UserModel = require("../models/userModel");
const generateOTP = require("../utils/otpUtils");
const sendOTPViaSMS = require("../utils/smsUtils");

exports.sendSMS = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) {
      return res.status(400).json({ message: "Phone number is required" });
    }

    const otp = generateOTP();
    const otpExpiry = Date.now() + 60 * 1000;

    let findUser = await UserModel.findOne({ phoneNumber: phone });
    if (!findUser) {
      await UserModel.create({ phoneNumber: phone, otp, otpExpire: otpExpiry });
    }

    const response = await sendOTPViaSMS(phone, otp);

    if (response.data.type === "SUCCESS") {
      await UserModel.findOneAndUpdate(
        { phoneNumber: phone },
        { otp, otpExpire: otpExpiry },
        { upsert: true, new: true }
      );
      return res.status(200).json({ message: "OTP sent successfully" });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to send OTP", error: response.data });
    }
  } catch (error) {
    console.error("SMS sending error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
      return res
        .status(400)
        .json({ message: "Phone number and OTP are required" });
    }
    const user = await UserModel.findOne({ phoneNumber: phone });
    const token = jsonwebtoken.sign(
      {
        id: user._id,
      },
      "ierutioewhriot"
    );
    if (!user) {
      return res.status(400).json({ message: "Invalid phone number" });
    }
    if (String(user.otp).trim() !== String(otp).trim()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (Date.now() > user.otpExpire) {
      return res.status(400).json({ message: "OTP expired" });
    }
    await UserModel.updateOne(
      { phoneNumber: phone },
      { $unset: { otp: 1, otpExpire: 1 } }
    );
    return res
      .status(200)
      .json({ message: "OTP verified successfully", verified: true, token });
  } catch (error) {
    console.error("OTP verification error:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
