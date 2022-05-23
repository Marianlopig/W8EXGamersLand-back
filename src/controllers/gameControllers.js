const Game = require("../database/models/Game");

const games = [
  { id: 1, title: "Mario" },
  { id: 2, title: "Hide and Seek" },
];

const getGames = async (req, res) => {
  const games = await Game.find();
  res.status(200).json({ games });
};

module.exports = { getGames };
