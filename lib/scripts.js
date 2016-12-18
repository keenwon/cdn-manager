'use strict';

const webpack = require('webpack');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

const noopGeneratorFn = function* (next) {
  return yield next;
};

module.exports = function (isDevelopment) {

  if (!isDevelopment) {
    return noopGeneratorFn;
  }

  return webpackMiddleware(
    webpack(webpackConfig), 
    {
      publicPath: '/scripts/',
      stats: {
        colors: true
      }
    }
  );
};