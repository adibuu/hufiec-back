const mongoose = require("mongoose");
const validator = require("validator");
const { convert } = require("html-to-text");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Nazwa drużyny jest wymagana"],
  },
  description: {
    type: String,
    trim: true,
    required: [true, "Opis drużyny jest wymagany"],
    validate: {
      validator: function (value) {
        const text = convert(value, { wordwrap: false });
        return text.length >= 5;
      },
      message: "Opis drużyny musi mieć minimum 5 znaków",
    },
  },
  contact: {
    email: {
      type: String,
      trim: true,
      required: false,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Błędny email");
        }
      },
    },
    phone: {
      type: String,
      trim: true,
      required: false,
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error("Błędny numer telefonu");
        }
      },
    },
    facebookURL: {
      type: String,
      trim: true,
      required: false,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Błędny adres URL");
        }
      },
    },
    instagramURL: {
      type: String,
      trim: true,
      required: false,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Błędny adres URL");
        }
      },
    },
  },
  photoURL: {
    type: String,
    required: false,
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Błędny adres URL");
      }
    },
  },
});

module.exports = mongoose.model("Team", teamSchema);
