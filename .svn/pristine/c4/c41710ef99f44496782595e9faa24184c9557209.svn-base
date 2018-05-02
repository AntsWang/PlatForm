const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const config = require('./webpack.common.config');
config.output = {
    filename: "bundle.js",
    path: __dirname + "/dist/gameSharePlatForm",
    publicPath: '/',
},
    config.plugins = config.plugins.concat([new uglify()]);
module.exports = config;