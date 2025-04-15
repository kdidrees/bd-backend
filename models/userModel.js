const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
