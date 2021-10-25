const webpack = require("webpack");
const path = require("path");

const config = {
  mode: "production",
  entry: "./game/index.js",
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "main-game.js",
  },
};

module.exports = config;
