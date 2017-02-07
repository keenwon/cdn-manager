'use strict';

const webpack = require('webpack');
const convert = require('koa-convert');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpackConfig = require('../webpack.config');

const noopGeneratorFn = async(ctx, next) => {
  return await next();
};

module.exports = function (isDevelopment) {

  if (!isDevelopment) {
    return noopGeneratorFn;
  }

  return convert(webpackMiddleware(
    webpack(webpackConfig),
    {
      publicPath: '/scripts/',
      stats: {
        colors: true
      }
    }
  ));
};