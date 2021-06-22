const mongoose = require("mongoose");

const infoModalSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    default: true,
  },
  expireAt: {
    type: Date,
    expires: "7d",
    default: Date.now() + 1 * 24 * 60 * 60000,
  },
});

module.exports = mongoose.model("InfoModal", infoModalSchema);
