const express = require("express");

const router = express.Router();

router.get("/teams");

router.get("/teams/:id");

module.exports = router;
