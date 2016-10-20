const webpack = require('webpack')
  , conf = require('./webpack.paths.js')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , LiveReloadPlugin = require('webpack-livereload-plugin')
  , isProd = (process.env.NODE_ENV == 'production')

var commonLoaders = [
  { test: /\.jsx?$/, loader: 'babel' }
]

function getDevTool() {
  return !isProd ? 'source-map' : null
}

function getPlugins() {
  var plugins = []

  if (isProd) {
    plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new CleanWebpackPlugin([conf.dist]),
      //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
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

function getClientPlugins() {
  var plugins = getPlugins()
  plugins = [
    new HtmlWebpackPlugin({
      template: conf.client.template,
      filename: 'index.html',
      inject: 'body'
    })
  ].concat(plugins)

  if (isProd) {
    plugins = [
      //new CleanWebpackPlugin([conf.distClient]),
      new LiveReloadPlugin()
    ].concat(plugins)
  } else {
    plugins = [
      new webpack.HotModuleReplacementPlugin()
    ].concat(plugins)
  }
  return plugins
}

function getServerPlugins() {
  var plugins = getPlugins()
  if (isProd) {
    plugins = [
      //new CleanWebpackPlugin([conf.distServer]),
    ].concat(plugins)
  } else {
    plugins = [
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false })
    ].concat(plugins)
  }
  return plugins
}


function getOutput(setPath) {
  var output = {
    path: setPath,
    filename: 'app.js',
  }
  if (isProd && setPath.includes('client')) {
    output.filename = 'app.[chunkhash].js'
    output.publicPath = '/'
  }
  return output
}

module.exports = [
  {
    name: 'browser',
    devtool: getDevTool(),
    entry: [
      conf.client.entry
    ],
    output: getOutput(conf.distClient),
    module: {
      loaders: commonLoaders
    },
    plugins: getClientPlugins()
  }, {
    name: 'server side compile',
    devtool: getDevTool(),
    entry: conf.server.entry,
    output: getOutput(conf.distServer),
    target: 'node',
    module: {
      loaders: commonLoaders
    },
    plugins: getServerPlugins()

  }
]
