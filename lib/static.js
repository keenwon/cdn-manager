'use strict';

const path = require('path');
const send = require('koa-send');

const options = {
  root: path.resolve(__dirname, '../client'),
  maxage: 5 * 60 * 1000
};

module.exports = async (ctx, next) => {
  if (ctx.body || ctx.status !== 404) {
    return await next();
  }

  if (!ctx.path.startsWith('/css') && !ctx.path.startsWith('/scripts')) {
    return await next();
  }

  return await send(ctx, ctx.path, options);
};