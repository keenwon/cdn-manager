'use strict';

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

function getPath(jsPath) {
  return path.join(__dirname, jsPath);
}

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
const filename = IS_DEVELOPMENT ? '[name].js' : '[name].[chunkhash:6].js';

const config = {
  entry: {
    'app': getPath('client/src/main.js'),
    'vendor': [
      'vue'
    ]
  },
  output: {
    path: getPath('client/scripts/'),
    filename: filename,
    chunkFilename: filename
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
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    })
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
  config.devtool = 'cheap-module-eval-source-map';
} else {
  let assetsPluginInstance = new AssetsPlugin({
      path: 'client',
      filename: '.assets.json'
    }),
    uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    });

  config.plugins = config.plugins.concat([
    assetsPluginInstance,
    uglifyJsPlugin
  ]);
}

module.exports = config;