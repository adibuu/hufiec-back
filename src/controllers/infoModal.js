const InfoModal = require("../models/infoModal");
const createError = require("../utils/createError");

exports.getInfoModal = async (req, res, next) => {
  try {
    const infoModal = await InfoModal.find({});
    if (!infoModal) {
      createError("Could not find InfoModal data!", 404);
    }
    return res.status(200).send(infoModal);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
