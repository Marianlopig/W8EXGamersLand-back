require("dotenv").config();
const debug = require("debug")("gamersland:controllers:gamesControllers");
const chalk = require("chalk");
const Game = require("../database/models/Game");
const customError = require("../utils/customError");

const getGames = async (req, res, next) => {
  debug(chalk.yellowBright("New game list request received"));

  const games = await Game.find();

  if (games.length === 0) {
    const error = customError(404, "Games not found");
    next(error);
    return;
  }
  res.status(200).json(games);
};

const getGame = async (req, res, next) => {
  const { id } = req.params;

  const game = await Game.findById(id);
  debug(chalk.yellowBright(`New game request, id requested:${id}`));

  if (!game) {
    const error = customError(404, "Game not found");
    next(error);
    return;
  }
  res.status(200).json(game);
};

module.exports = { getGames, getGame };
