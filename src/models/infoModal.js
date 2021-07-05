const mongoose = require("mongoose");

const infoModalSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: [true, "Treść jest wymagana"],
    minLength: [12, "Treść musi mieć zakres od 5 do 200 znaków"],
    maxLength: [250, "Treść musi mieć zakres od 5 do 200 znaków"],
  },
  show: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    expires: "7d",
    default: Date.now() + 1 * 24 * 60 * 60000,
  },
});

module.exports = mongoose.model("InfoModal", infoModalSchema);
