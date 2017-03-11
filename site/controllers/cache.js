'use strict';

module.exports = {

  /**
   * 缓存清理
   */
  purge: async ctx => {
    /**
     * mock
     * 正式使用时需要对接CDN厂商提供的接口
     */
    ctx.body = await new Promise(function (resolve) {
      setTimeout(function () {
        resolve({});
      }, 1000);
    });
  }

};