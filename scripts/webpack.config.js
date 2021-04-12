const webpack = require("webpack");
const path = require("path");
const RemovePlugin = require("remove-files-webpack-plugin");

const buildPath = path.join(__dirname, "../", "dist");

const server = {
  entry: "./server/server.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: [path.resolve(buildPath, "server")],
        allowRootAndOutside: true,
      },
      watch: {
        include: [path.resolve(buildPath, "server")],
        allowRootAndOutside: true,
      },
    }),
    // Ignore cardinal as its optional
    new webpack.IgnorePlugin(/^cardinal$/, /./),
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[contenthash].server.js",
    path: path.resolve(buildPath, "server"),
  },
  target: "node",
};

const client = {
  entry: "./client/client.ts",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new RemovePlugin({
      before: {
        include: [path.resolve(buildPath, "client")],
        allowRootAndOutside: true,
      },
      watch: {
        include: [path.resolve(buildPath, "client")],
        allowRootAndOutside: true,
      },
    }),
  ],
  optimization: {
    minimize: true,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[contenthash].client.js",
    path: path.resolve(buildPath, "client"),
  },
};

module.exports = [server, client];
