'use strict';

const parse = require('co-body');

module.exports = async (ctx, next) => {
  ctx.request.body = await parse(this).catch(() => ({}));

  await next();
};