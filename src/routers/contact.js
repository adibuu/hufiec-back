const express = require("express");
const { getContact } = require("../controllers/contact");

const router = express.Router();

router.get("/contact", getContact);

module.exports = router;
