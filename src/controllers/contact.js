const Contact = require("../models/contact");
const createError = require("../utils/createError");

exports.getContact = async (req, res, next) => {
  try {
    const contact = await Contact.find({});

    if (contact.length === 0) {
      createError("Could not find contact data!", 404);
    }

    return res.status(200).send(contact);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
