const express = require("express");
const { getTeams, getTeam } = require("../controllers/team");

const router = express.Router();

router.get("/teams", getTeams);

router.get("/teams/:id", getTeam);

module.exports = router;
