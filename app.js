'use strict';

const koa = require('koa');
const app = koa();
const Pug = require('koa-pug');

const config = require('./config');
const error = require('./lib/error');
const bodyParser = require('./lib/bodyParser');
const logger = require('./lib/logger');
const router = require('./router');
const serve = require('./lib/static');
const scripts = require('./lib/scripts');
const favicon = require('koa-favicon');

// env
const IS_DEVELOPMENT = app.env === 'development';

// logger
logger.register(app);
app.use(logger.useGlobalLogger());

// exception handler
app.use(error);

// view engine
const pug = new Pug({
  viewPath: './site/views',
  basedir: './site/views',
  noCache: IS_DEVELOPMENT,
  debug: IS_DEVELOPMENT,
  app: app
});

// favicon
app.use(favicon('./favicon.ico'));

// javascript
app.use(scripts(IS_DEVELOPMENT));

// static
app.use(serve());

// bodyParser
app.use(bodyParser);

// router
app.use(router);

app.listen(config['app.port'] || 3000);