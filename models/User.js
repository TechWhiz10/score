// File Name: models/User.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  trialEndTime: {
    type: Date,
    default: () => new Date(Date.now() + 48 * 60 * 60 * 1000), // 48 hours from creation
  },
  isSubscriptionActivated: {
    type: Boolean,
    default: false,
  },
  subscriptionEndTime: {
    type: Date,
    default: null,
  },
  userStatus: {
    type: String,
    enum: ["trialist", "basic", "premium"],
    default: "trialist",
  },
  referralCode: {
    type: String,
    unique: true,
  },
  referredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  referralCredits: {
    type: Number,
    default: 0,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); // password gets hashed here
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.referralCode) {
    this.referralCode = `${this._id}`;
  }
  next();
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
