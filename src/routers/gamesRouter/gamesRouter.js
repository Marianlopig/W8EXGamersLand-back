const express = require("express");
const { getGames } = require("../../controllers/gameControllers");
const auth = require("../../server/middlewares/auth/auth");

const gamesRouter = express.Router();

gamesRouter.get("/", auth, getGames);
module.exports = gamesRouter;
