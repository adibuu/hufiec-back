const mongoose = require("mongoose");
const validator = require("validator");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    trim: true,
    required: [true, "Treść jest wymagana"],
    minLength: [12, "Treść musi mieć zakres od 5 do 300 znaków"],
    maxLength: [350, "Treść musi mieć zakres od 5 do 300 znaków"],
  },
  preview: {
    type: String,
    trim: true,
    required: [true, "Krótki opis jest wymagany"],
    minLength: [
      12,
      "Treść krótkiego opisu musi mieć zakres od 5 do 200 znaków",
    ],
    maxLength: [
      250,
      "Treść krótkiego opisu musi mieć zakres od 5 do 200 znaków",
    ],
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
  filesURL: [
    {
      type: String,
      trim: true,
      required: false,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Błędny adres URL");
        }
      },
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1y" },
  },
});

module.exports = mongoose.model("Post", postSchema);
