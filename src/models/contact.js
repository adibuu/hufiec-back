const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    postCode: {
      type: String,
      required: true,
    },
  },
  facebookURL: {
    type: String,
    required: true,
  },
  instagramURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
