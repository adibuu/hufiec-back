const Team = require("../models/team");
const createError = require("../utils/createError");

exports.getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find({});

    if (teams.length === 0) {
      createError("Could not find teams", 404);
    }
    return res.status(200).send(teams);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.getTeam = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      createError("Could not find team", 404);
    }
    return res.status(200).send(team);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
