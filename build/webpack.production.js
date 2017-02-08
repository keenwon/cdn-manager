'use strict';

const webpack = require('webpack');
const merge = require('webpack-merge');
const AssetsPlugin = require('assets-webpack-plugin');
const baseWebpackConfig = require('./webpack.base');

const assetsPluginInstance = new AssetsPlugin({
  path: 'client',
  filename: '.assets.json'
});

const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false
  }
});

module.exports = merge(baseWebpackConfig, {
  output: {
    filename: '[name].[chunkhash:6].js',
    chunkFilename: '[name].[chunkhash:6].js'
  },
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
    assetsPluginInstance,
    uglifyJsPlugin
  ]
});