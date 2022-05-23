const { Schema, model } = require("mongoose");

const GameSchema = new Schema({
  title: {
    type: String,
  },
});
const Game = model("Game", GameSchema, "games");

module.exports = Game;
