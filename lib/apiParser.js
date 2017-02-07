'use strict';

const logger = require('./logger');

const defaultResponse = {
  code: 200,
  message: ''
};

const apiSuccess = (data = {}) => Object.assign({}, defaultResponse, {
  data: data
});

const apiError = (message = 'error') => Object.assign({}, defaultResponse, {
  code: 500,
  message: message
});

module.exports = async (ctx, next) => {
  try {
    await next();
    ctx.body = apiSuccess(ctx.body);
  } catch (error) {
    logger.error(error);

    ctx.status = 200;
    ctx.body = apiError(error.message);
  }
};