'use strict';

const path = require('path');

function getPath(jsPath) {
  return path.join(__dirname, jsPath);
}

module.exports = {
  entry: {
    'app': getPath('client/src/main.js')
  },
  output: {
    path: getPath('client/scripts/'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015'
          ]
        }
      }
    ]
  }
};