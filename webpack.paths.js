'use strict'
const path = require('path')

const clientPath  = 'client'
const serverPath  = 'server'

var paths = {
  client: {
    entry: `${clientPath}/index.js`,
    template: `${clientPath}/index.html`,
    assets: `${clientPath}/assets/**/*`,
    images: `${clientPath}/assets/images/**/*`,
    scripts: [
      `${clientPath}/components/*.js`
    ],
    styles: [`${clientPath}/app/**/*.scss`],
    mainStyle: `${clientPath}/app/app.scss`,
    views: `${clientPath}/app/**/*.html`,
    mainView: `${clientPath}/index.html`
  },
  server: {
    entry: `${serverPath}/index.js`,
    scripts: [`${serverPath}/**/*.js`],
    json: [`${serverPath}/**/*.json`],
  },
  dist: `dist`,
  distClient: `dist/${clientPath}`,
  distServer: `dist/${serverPath}`,
  tmp: 'tmp'
}

function traverse(path_obj, func) {
  if (typeof(path_obj) != 'object')
    return func(path_obj)


  for (var i in path_obj) {
    path_obj[i] = traverse(path_obj[i], func)
  }
  return path_obj
}

paths = traverse(paths, path.resolve)


module.exports = paths
