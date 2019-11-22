const webpackNodeExternals = require("webpack-node-externals");

const configuration = {
  target: "node",
  entry: {
    index: "./src/index.ts"
  },
  node: {
    __dirname: false,
    __filename: false
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: /src/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: [webpackNodeExternals()]
};

module.exports = configuration;
