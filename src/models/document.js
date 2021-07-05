const mongoose = require("mongoose");
const validator = require("validator");

const documentSchema = new mongoose.Schema({
  documentsURL: {
    type: String,
    trim: true,
    required: [true, "Adres URL Dokumentów jest wymagany"],
    validate(value) {
      if (!validator.isURL(value)) {
        throw new Error("Błędny adres URL");
      }
    },
  },
});

module.exports = mongoose.model("Document", documentSchema);
