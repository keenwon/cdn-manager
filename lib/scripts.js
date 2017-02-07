'use strict';

const webpack = require('webpack');
const convert = require('koa-convert');
const webpackMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require("koa-webpack-hot-middleware");
const webpackConfig = require('../webpack.config');

const noopGeneratorFn = async(ctx, next) => {
  return await next();
};

module.exports = function (app, isDevelopment) {

  if (!isDevelopment) {
    return noopGeneratorFn;
  }

  const compiler = webpack(webpackConfig);

  app.use(convert(webpackMiddleware(
    compiler,
    {
      publicPath: '/scripts/',
      stats: {
        colors: true
      }
    }
  )));

  isDevelopment && app.use(convert(webpackHotMiddleware(
    compiler
  )));

};