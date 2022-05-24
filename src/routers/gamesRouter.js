const express = require("express");
const { getGames } = require("../controllers/gameControllers");

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);

module.exports = gamesRouter;
