var webpack = require('webpack')
  , WebpackDevServer = require('webpack-dev-server')
  , gutil = require('gutil')
  , configClient = require('./webpack.config')[0]
  , configServer = require('./webpack.config')[1]


// run webpack on client
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
  console.log('use nodemon, restart api server.')
})
