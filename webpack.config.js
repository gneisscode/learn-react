const currentTask= process.env.npm_lifecycle_event
const path = require('path');
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
const HtmlWebpackPlugin= require('html-webpack-plugin')
const {CleanWebpackPlugin}=require('clean-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');


const config = {
  entry: "./src/index.js",
  output: {
    filename: "emBundle.[fullhash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[name][ext]",
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
  devtool: "eval-cheap-source-map",
  //devserver from installed package web-dev-server
  devServer: {
    port: 8080,
    static: path.join(__dirname, "dist"),
    //hot module replacement
    hot: true,
  },
  mode: "development",

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },

      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        use: [
          {
            loader: "file-loader",
          },
        ],
      },

      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};
if (currentTask=='build'){
    config.mode="production"
    config.module.rules[0].use[0]= MiniCssExtractPlugin.loader
    config.module.rules[1].use[0] = MiniCssExtractPlugin.loader
    config.plugins.push(new MiniCssExtractPlugin({filename: 'main.[fullhash].css'}), new CleanWebpackPlugin(), new WebpackManifestPlugin())
}

module.exports = config