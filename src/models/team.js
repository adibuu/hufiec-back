const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  description: {
    type: String,
    required: true,
  },
  contact: {
    email: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    skype: {
      type: String,
      required: false,
    },
  },
  photosURL: [{ type: String, required: false }],
});

module.exports = mongoose.model("Team", teamSchema);
