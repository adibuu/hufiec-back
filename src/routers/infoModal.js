const express = require("express");
const { getInfoModal } = require("../controllers/infoModal");

const router = express.Router();

router.get("/infoModal", getInfoModal);

module.exports = router;
