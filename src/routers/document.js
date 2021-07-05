const express = require("express");
const { getDocument } = require("../controllers/document");

const router = express.Router();

router.get("/document", getDocument);

module.exports = router;
