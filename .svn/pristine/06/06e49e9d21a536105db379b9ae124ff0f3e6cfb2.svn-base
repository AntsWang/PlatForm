const webpack = require('webpack');
const uglify = require('uglifyjs-webpack-plugin');
const config = require('./webpack.common.config');
config.output = {
    filename: "bundle.js",
    path: __dirname + "/dist/gameSharePlatForm",
    publicPath: '/',
},
    config.plugins = config.plugins.concat([new uglify(
        {
            uglifyOptions: {
                compress: {
                    warnings: false,
                    // drop_debugger: true,
                    // drop_console: true
                }
            }
        }
    )]);
module.exports = config;