'use strict';

module.exports = {

  /**
   * 缓存清理
   */
  purge: async ctx => {
    ctx.body = await new Promise(function (resolve) {
      setTimeout(function () {
        resolve({});
      }, 1000);
    });
  }

};