'use strict';

const router = require('koa-router')({
  prefix: '/api'
});

const cacheController = require('../controllers/cache');

// api
router.post('/purge', cacheController.purge);

module.exports = router;