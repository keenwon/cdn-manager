'use strict';

const apiParser = require('../../lib/apiParser');
const router = require('koa-router')({
  prefix: '/api'
});

const cacheController = require('../controllers/cache');

// parser
router.use('*', apiParser);

// api
router.post('/purge', cacheController.purge);

module.exports = router;