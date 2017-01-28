'use strict';

const compose = require('koa-compose');
const pageRouter = require('./site/routers/page');
const apiRouter = require('./site/routers/api');

module.exports = compose([
  pageRouter.routes(),
  apiRouter.routes()
]);