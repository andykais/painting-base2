/*
 * webpack build config
 * builds both client/ and server/
 * places both in dist/ folder for use
 * chooses values based on development or production version
 */

const webpack = require('webpack')
  , conf = require('./webpack.paths.js')
  , HtmlWebpackPlugin = require('html-webpack-plugin')
  , CleanWebpackPlugin = require('clean-webpack-plugin')
  , ExtractTextPlugin = require('extract-text-webpack-plugin')
  , LiveReloadPlugin = require('webpack-livereload-plugin')
  , isProd = (process.env.NODE_ENV == 'production') // tells functions which plugins to choose based on production or development
  , publicPath = isProd ? conf.client.publicPath : '/'

// babel converts es6 javascript into es2015
var commonLoaders = [
  { test: /\.jsx?$/, loader: 'babel' },
]


function getPlugins() {
  var plugins = []

  if (isProd) {
    // various optimizations only used in production
    // convenient for both front and backend
    plugins = [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
      new CleanWebpackPlugin([conf.distClient]),
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
  // plugins specific to client
  // HtmlWebpackPlugin creates index.html page from template
  var plugins = getPlugins()
  plugins = [
    new HtmlWebpackPlugin({
      template: conf.client.template,
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.ENV': {
        publicPath: JSON.stringify(publicPath)
      }
    }),
  ].concat(plugins)

  if (isProd) {
    // puts hashes in filenames so browers only cache current version
    plugins = [
      new ExtractTextPlugin('app.[chunkhash].css'),
      new LiveReloadPlugin(),
      new CleanWebpackPlugin([conf.distClient]),
    ].concat(plugins)
  } else {
    //process.ENV['publicPath'] = '/'
    plugins = [
      new ExtractTextPlugin('app.css'),
      new webpack.HotModuleReplacementPlugin()
    ].concat(plugins)
  }
  return plugins
}

function getServerPlugins() {
  var plugins = getPlugins()
  if (isProd) {
    plugins = [
      new CleanWebpackPlugin([conf.distServer]),
    ].concat(plugins)
  } else {
    // sourcemaps to map concatted javascript back into original source files (development)
    plugins = [
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false })
    ].concat(plugins)
  }
  return plugins
}


// paths for outputting
function getOutput(setPath) {
  var output = {
    path: setPath,
    filename: 'app.js',
  }
  if (isProd && setPath.includes('client')) {
    output.filename = 'app.[chunkhash].js'
    output.publicPath = '/painting-base2/'
  }
  return output
}

module.exports = [
  {
    // client side compile
    name: 'browser',
    devtool: !isProd ? 'source-map' : null,
    entry: [
      conf.client.entry
    ],
    output: getOutput(conf.distClient),
    module: {
      loaders: [{
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }].concat(commonLoaders)
    },
    plugins: getClientPlugins()
  }
  // server side compile
  , {
    name: 'server side compile',
    devtool: !isProd ? 'source-map' : null,
    entry: conf.server.entry,
    output: getOutput(conf.distServer),
    target: 'node',
    module: {
      loaders: commonLoaders
    },
    plugins: getServerPlugins()

  }
]
