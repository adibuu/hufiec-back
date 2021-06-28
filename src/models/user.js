const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["admin", "restricted"],
    default: "restricted",
    required: true,
  },
  permissions: {
    type: String,
    enum: ["full", "needToAccept"],
    default: "needToAccept",
    required: true,
  },
  scoutTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
