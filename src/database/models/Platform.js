const { Schema, model } = require("mongoose");

const PlatformSchema = new Schema({
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
});

const Platform = model("Platform", PlatformSchema, "platforms");

module.exports = Platform;
