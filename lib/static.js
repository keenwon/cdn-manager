'use strict';

const path = require('path');
const send = require('koa-send');

const options = {
  root: path.resolve(__dirname, '../client'),
  maxage: 5 * 60 * 1000
};

module.exports = function () {
  return function *(next) {
    if (this.body || this.status !== 404) {
      return yield next;
    }

    if (!this.path.startsWith('/css') && !this.path.startsWith('/scripts')) {
      return yield next;
    }

    return yield send(this, this.path, options);
  };
};