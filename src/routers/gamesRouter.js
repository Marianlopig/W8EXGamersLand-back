const express = require("express");
const { getGames, getGame } = require("../controllers/gameControllers");

const gamesRouter = express.Router();

gamesRouter.get("/", getGames);
gamesRouter.get("/:id", getGame);

module.exports = gamesRouter;
