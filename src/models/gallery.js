const mongoose = require("mongoose");
const validator = require("validator");

const gallerySchema = new mongoose.Schema({
  galleryURL: {
    type: String,
    trim: true,
    required: [true, "Adres URL Galerii zdjęć jest wymagany"],
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Błędny adres URL");
      }
    },
  },
});

module.exports = mongoose.model("Gallery", gallerySchema);
