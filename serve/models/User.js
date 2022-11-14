const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const env = require("dotenv");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  resetPasswordToken: String,
  resetPassordExpire: Date,
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPassordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};
module.exports = mongoose.model("User", UserSchema);
