const { Schema } = require("mongoose");
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
});

const Game = model("Game", GameSchema, "games");
module.exports = Game;
