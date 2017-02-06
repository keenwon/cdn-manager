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
    'app': getPath('client/src/main.js')
  },
  output: {
    path: getPath('client/scripts/'),
    filename: filename,
    chunkFilename: filename
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
    new webpack.HashedModuleIdsPlugin(),
    assetsPluginInstance,
    uglifyJsPlugin
  ]);
}

module.exports = config;