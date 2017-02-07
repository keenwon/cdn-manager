'use strict';

const router = require('koa-router')();

const indexController = require('../controllers/index');

// pages
router.get('/', indexController.index);

// pages
router.get('*', async ctx => {
  ctx.status = 301;
  ctx.redirect('/');
});

module.exports = router;