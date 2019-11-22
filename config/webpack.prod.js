const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common");

const configuration = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../prod"),
    filename: "[name].server.js"
  }
});

module.exports = configuration;
