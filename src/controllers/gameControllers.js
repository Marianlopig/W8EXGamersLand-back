require("dotenv").config();
const debug = require("debug")("gamersland:controllers:gamesControllers");
const chalk = require("chalk");
const Game = require("../database/models/Game");
const customError = require("../utils/customError");

const getGames = async (req, res, next) => {
  debug(chalk.yellowBright("New game list request received"));
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch {
    const error = customError(404, "Games not found");
    next(error);
  }
};

module.exports = { getGames };
