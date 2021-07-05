const express = require("express");

const router = express.Router();

router.get("/posts");

router.get("/posts/:id");

module.exports = router;
