const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email jest wymagany"],
  },
  encryptedPassword: {
    type: String,
    trim: true,
    required: [true, "Hasło jest wymagane"],
  },
  role: {
    type: String,
    enum: ["admin", "restricted"],
    default: "restricted",
    required: true,
  },
  editingPermissions: {
    postsMustBeApprovedByAdmin: {
      type: Boolean,
      default: true,
    },
    team: {
      type: Boolean,
      default: false,
    },
    contact: {
      type: Boolean,
      default: false,
    },
    document: {
      type: Boolean,
      default: false,
    },
    gallery: {
      type: Boolean,
      default: false,
    },
    infoModal: {
      type: Boolean,
      default: false,
    },
  },
  scoutTeam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
