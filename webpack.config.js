'use strict';

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');

function getPath(jsPath) {
  return path.join(__dirname, jsPath);
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const filename = IS_DEVELOPMENT ? 'app.js' : 'app.[hash].js';
const vendorname = IS_DEVELOPMENT ? 'vendor.js' : 'vendor.[hash].js';

var config = {
  entry: {
    'app': getPath('client/src/main.js'),
    'vendor': [
      'vue'
    ]
  },
  output: {
    path: getPath('client/scripts/'),
    filename: filename
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    root: path.resolve('./node_modules')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', vendorname)
  ],
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel'
      }
    ]
  }
};

if (IS_DEVELOPMENT) {
  config.devtool = 'eval-cheap-module-source-map';
} else {
  let assetsPluginInstance = new AssetsPlugin({
      path: 'client',
      filename: '.assets.json'
    }),
    md5HashInstance = new WebpackMd5Hash(),
    uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

  config.plugins = config.plugins.concat([
    md5HashInstance,
    assetsPluginInstance,
    uglifyJsPlugin
  ]);
}

module.exports = config;