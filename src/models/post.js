const mongoose = require("mongoose");
const { convert } = require("html-to-text");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Tytuł jest wymagany"],
  },
  content: {
    type: String,
    trim: true,
    required: [true, "Treść jest wymagana"],
  },
  preview: {
    type: String,
    trim: true,
    required: [true, "Krótki opis jest wymagany"],
    validate: {
      validator: function (value) {
        const text = convert(value, { wordwrap: false });
        return text.length >= 5 && text.length <= 200;
      },
      message: "Treść krótkiego opisu musi mieć zakres od 5 do 200 znaków",
    },
  },
  imageURL: {
    type: String,
    trim: true,
    required: false,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Błędny adres URL");
      }
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  show: {
    type: Boolean,
    default: false,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1y" },
  },
});

module.exports = mongoose.model("Post", postSchema);
