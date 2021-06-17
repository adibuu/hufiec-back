const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  filesURL: [
    {
      type: String,
      required: false,
    },
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dateOfPublication: { type: Date, default: Date.now },
  dateOfExpiration: { type: Date, default: Date.now() + 365 * 24 * 60 * 60000 },
});

module.exports = mongoose.model("Post", postSchema);
