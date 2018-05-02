const webpack = require('webpack');
const config = require('./webpack.common.config');
config.output = {
  filename: "bundle.js",
  path: __dirname + "/dist",
  publicPath: 'dist/',
},
  config.devServer = {
    hot: true,
    historyApiFallback: {
      index: './index.html'
    },
    open: true
  }
config.plugins.push(new webpack.HotModuleReplacementPlugin());
module.exports = config;