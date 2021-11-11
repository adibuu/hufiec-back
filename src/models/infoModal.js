const mongoose = require("mongoose");
const { convert } = require("html-to-text");

const infoModalSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: [true, "Treść jest wymagana"],
    validate: {
      validator: function (value) {
        const text = convert(value, { wordwrap: false });
        return text.length >= 5 && text.length <= 200;
      },
      message: "Treść musi mieć zakres od 5 do 200 znaków",
    },
  },
  show: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("InfoModal", infoModalSchema);
