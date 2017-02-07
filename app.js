'use strict';

const semver = require('semver');
const Koa = require('koa');
const app = new Koa();
const Pug = require('koa-pug');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');

const config = require('./config');
const error = require('./lib/error');
const logger = require('./lib/logger');
const router = require('./router');
const serve = require('./lib/static');
const scripts = require('./lib/scripts');
const assets = require('./client/.assets.json');

if(!semver.satisfies(process.version, '>= 7')) {
  throw new Error(`node version must >= 7, current version is ${process.version}`);
}

// env
const IS_DEVELOPMENT = app.env === 'development';

// logger
logger.register(app);
app.use(logger.useGlobalLogger());

// exception handler
app.use(error);

// view engine
new Pug({
  viewPath: './site/views',
  basedir: './site/views',
  noCache: IS_DEVELOPMENT,
  debug: IS_DEVELOPMENT,
  app: app,
  locals: IS_DEVELOPMENT
    ? {
      manifest: { js: 'manifest.js'},
      vendor: { js: 'vendor.js' },
      app: { js: 'app.js' }
    }
    : assets
});

// favicon
app.use(favicon('./favicon.ico'));

// javascript
app.use(scripts(IS_DEVELOPMENT));

// static
app.use(serve);

// bodyParser
app.use(bodyParser());

// router
app.use(router);

app.listen(config['app.port'] || 3000);