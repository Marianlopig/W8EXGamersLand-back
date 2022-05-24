const { Schema, model } = require("mongoose");

const GameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  type: {
    type: String,
  },
  platforms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Platform",
    },
  ],
  year: {
    type: Number,
  },
  description: {
    type: String,
  },
  rate: {
    type: Number,
    max: 5,
    min: 0,
  },
  played: {
    type: Boolean,
  },
});

const Game = model("Game", GameSchema, "games");

module.exports = Game;
