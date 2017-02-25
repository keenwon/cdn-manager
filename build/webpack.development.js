'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');

Object.keys(baseWebpackConfig.entry).forEach(name => {
  baseWebpackConfig.entry[name] = baseWebpackConfig.entry[name].concat([
    'webpack-hot-middleware/client'
  ]);
});

module.exports = merge(baseWebpackConfig, {
  devtool: 'eval-source-map',
  output: {
    publicPath: '/scripts/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});