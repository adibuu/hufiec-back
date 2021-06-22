const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  documentsURL: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Document", documentSchema);
