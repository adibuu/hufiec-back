const Gallery = require("../models/gallery");
const createError = require("../utils/createError");

exports.getGallery = async (req, res, next) => {
  try {
    const gallery = await Gallery.find({});

    if (gallery.length === 0) {
      createError("Could not find gallery data!", 404);
    }

    return res.status(200).send(gallery);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
