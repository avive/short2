const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: "./src/index.html", to: "index.html" },
        { from: "./src/token.html", to: "token.html" },
        { from: "./src/artregistry.html", to: "artregistry.html" },
        { from: "./src/teamhuman.html", to: "teamhuman.html" },
        { from: "./src/intro.html", to: "intro.html" },
        { from: "./src/poster.html", to: "poster.html" },
        { from: "./src/poster1.html", to: "poster1.html" }
    ]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
