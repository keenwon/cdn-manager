'use strict';

const path = require('path');

module.exports = {

  // -------------- app configuration --------------

  // 端口号
  'app.port': 3334,

  // -------------- log configuration --------------

  // 启用日志
  'log.enable': true,

  // 启用全局日志
  'log.global.enable': true,

  // 日志文件夹路径
  'log.path': path.join(__dirname, 'logs'),

  // 单个日志文件大小
  'log.maxsize': 1024 * 1024 * 100
};