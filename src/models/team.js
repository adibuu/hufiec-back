const mongoose = require("mongoose");
const validator = require("validator");

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
    minLength: [12, "Opis drużyny musi mieć zakres od 5 do 300 znaków"],
    maxLength: [350, "Opis drużyny musi mieć zakres od 5 do 300 znaków"],
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
  photosURL: [
    {
      type: String,
      required: false,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Błędny adres URL");
        }
      },
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);
