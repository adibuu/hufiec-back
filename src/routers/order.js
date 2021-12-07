const express = require("express");
const { postOrder } = require("../controllers/order");

const router = express.Router();

router.post("/order", postOrder);

module.exports = router;
