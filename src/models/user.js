const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "restricted"],
    default: "restricted",
    required: true,
  },
  permissions: {
    full: {
      type: Boolean,
      default: false,
    },
    needToAccept: {
      type: Boolean,
      default: true,
    },
  },
  scoutTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
