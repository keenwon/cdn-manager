'use strict';

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

function getPath(jsPath) {
  return path.join(__dirname, '..', jsPath);
}

const config = {
  entry: {
    'app': [
      getPath('client/src/main.js')
    ]
  },
  output: {
    path: getPath('client/scripts/'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    })
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
};

module.exports = config;