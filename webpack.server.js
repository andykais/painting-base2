/*
 * development server that triggers webpack compile on file changes
 * first entry point of the application
 * a.k.a. `node webpack.server.js`
 */

var webpack = require('webpack')
  , WebpackDevServer = require('webpack-dev-server')
  , nodemon = require('nodemon')
  , path = require('path')
  , gutil = require('gutil')
  , postcss = require('postcss-scss')
  , configClient = require('./webpack.config')[0]
  , configServer = require('./webpack.config')[1]


// run webpack-dev-server on client
configClient.entry.unshift(
  'react-hot-loader/patch',
  'webpack-dev-server/client?http://localhost:8080/',
  'webpack/hot/dev-server'
)
var compiler = webpack(configClient)
var server = new WebpackDevServer(compiler, {
  inline: true,
  hot: true,
  historyApiFallback: true,
  stats: {
    version: false,
    chunks: false,
    hash: false,
    colors: true
  }
})
server.listen(8080, function (err) {
  if (err) throw new console.log('[webpack:build:client]', err)
  console.log('webpack dev server listening on http://localhost:8080\n')
})

var nodemonStarted = false
// run webpack on server
webpack(configServer).watch({
  stats: {chunks: true}
}, function (err, stats) {

  gutil.log('[webpack:build:server]', stats.toString({
    chunks: false, // Makes the build much quieter
    hash: false,
    version: false,
    colors: true
  }))
  if (!nodemonStarted) {
    console.log('nodemon api server started.')
    nodemon({
      script: path.join(configServer.output.path, configServer.output.filename),
      watch: configServer.output.path
    })
    nodemonStarted = true
  }
})

