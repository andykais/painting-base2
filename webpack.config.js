'use strict'

const webpack = require('webpack'),
  conf = require('./webpack.paths.js'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  isProd = (process.env.NODE_ENV == 'production')


function getDevTool() {
  return !isProd ? 'source-map' : null
}

function getPlugins() {
  var plugins = [
    new HtmlWebpackPlugin({
      template: conf.client.template,
      filename: 'index.html',
      inject: 'body',
      livereload: !isProd ? '<script src="http://localhost:35729/livereload.js"></script>' : null
    })
  ]
  if (isProd) {
    plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new CleanWebpackPlugin([conf.dist]),
      new webpack.optimize.CommonsChunkPlugin('vendor.js'),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: { warnings: false },
        minimize: true,
        mangle: true,
        sourcemap: false,
        beautify: false,
        dead_code: true
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ].concat(plugins)
  }
  return plugins
}
function getOutput() {
  var output = {
    path: conf.dist,
    filename: 'app.js',
  }
  if (isProd) {
    output.filename = 'app.[chunkhash].js'
  }
  return output
}
//function getOutput

module.exports = {
  devtool: getDevTool(),
  entry: conf.client.entry,
  output: getOutput(),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel']
      }
    ]
  },
  plugins: getPlugins()
}