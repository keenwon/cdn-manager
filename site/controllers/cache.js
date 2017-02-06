'use strict';

module.exports = {

  /**
   * 缓存清理
   */
  purge: function *() {
    this.body = yield new Promise(function (resolve) {
      setTimeout(function () {
        resolve({});
      }, 1000);
    });
  }

};