var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

var SRC = path.resolve(__dirname, "src/main/js");
var DEST = path.resolve(__dirname, "src/main/resources/static/app");

const extractPlugin = new ExtractTextPlugin({
  filename: "bundle.css",
  disable: false,
  allChunks: true,
});

let fontCssRule = config.module.rules.find(
  (rule) =>
    rule.test.toString() ===
    /\.(svg|ico|jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|cur|ani)(\?.*)?$/.toString()
);

var config = {
  cache: true,
  entry: SRC,
  target: "web",
  resolve: {
    extensions: [".js", ".jsx"],
  },
  output: {
    path: DEST,
    filename: "bundle.js",
    publicPath: "/tms-ui/app/",
    library: "TMS",
  },
  module: {
    rules: [
      {
        test: /\.woff(\?.*$|$)/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
      },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "eslint-loader",
            options: {
              emitWarning: true,
            },
          },
        ],
        include: SRC,
        enforce: "pre",
      },
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: SRC,
      },
      {
        test: /(\.css|\.scss)$/,
        include: SRC,
        use: extractPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: "postcss-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
                importLoaders: 1,
              },
            },
          ],
          fallback: "style-loader",
        }),
      },
      {
        test: /\.(jpe?g|png|gif|mp3)$/i,
        include: SRC,
        loaders: ["file-loader"],
      },
      {
        test: /\.ico$/,
        include: SRC,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: SRC,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
              mimetype: "application/font-woff",
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|gif|png)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: SRC,
        loader: "file-loader",
      },
    ],
  },
  plugins: [
    extractPlugin,
    new webpack.LoaderOptionsPlugin({
      options: {
        context: __dirname,
        debug: true,
      },
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
    }),
  ],
};
module.exports = config;
