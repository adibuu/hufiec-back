const Document = require("../models/document");
const createError = require("../utils/createError");

exports.getDocument = async (req, res, next) => {
  try {
    const document = await Document.find({});
    if (!document) {
      createError("Could not find documents data!", 404);
    }
    return res.status(200).send(document);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
