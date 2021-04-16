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
        { from: "./src/invitation.html", to: "invitation.html" },
        { from: "./src/poster.html", to: "poster.html" },
        { from: "./src/poster1.html", to: "poster1.html" },
        { from: "./src/poster2.html", to: "poster2.html" },
        { from: "./src/poster3.html", to: "poster3.html" },
        { from: "./src/poster4.html", to: "poster4.html" },
        { from: "./src/poster5.html", to: "poster5.html" },
        { from: "./src/poster6.html", to: "poster6.html" },
        { from: "./src/poster7.html", to: "poster7.html" }
    ]),
  ],
  devServer: { contentBase: path.join(__dirname, "dist"), compress: true },
};
