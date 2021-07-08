const express = require("express");
const { getGallery } = require("../controllers/gallery");

const router = express.Router();

router.get("/gallery", getGallery);

module.exports = router;
