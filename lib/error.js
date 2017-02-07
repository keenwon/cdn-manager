'use strict';

const logger = require('./logger');

module.exports = async (ctx, next) => {
  try {
    await next();

    if (404 === ctx.response.status && !ctx.response.body) {
      ctx.throw(404);
    }

  } catch (error) {
    ctx.status = error.status || 500;

    ctx.app.emit('error', error, ctx);

    logger.error(error);

    ctx.render('error', {
      status: error.status
    });
  }
};