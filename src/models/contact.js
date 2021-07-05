const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "Email jest wymagany"],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Błędny email");
      }
    },
  },
  phone: {
    type: String,
    trim: true,
    required: [true, "Telefon jest wymagany"],
    validate(value) {
      if (!validator.isMobilePhone(value)) {
        throw new Error("Błędny numer telefonu");
      }
    },
  },
  address: {
    city: {
      type: String,
      trim: true,
      required: [true, "Miasto jest wymagane"],
    },
    street: {
      type: String,
      trim: true,
      required: [true, "Ulica jest wymagana"],
    },
    postCode: {
      type: String,
      trim: true,
      required: [true, "Kod pocztowy jest wymagany"],
      validate(value) {
        if (!validator.isPostalCode(value, "PL")) {
          throw new Error("Błędny kod pocztowy");
        }
      },
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
});

module.exports = mongoose.model("Contact", contactSchema);
