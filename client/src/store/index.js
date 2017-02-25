import Vue from 'vue';
import Vuex from 'vuex';

import message from '../modules/message';
import editor from '../modules/editor';
import workspace from '../modules/workspace';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    message,
    editor,
    workspace
  }
});

if (module.hot) {
  module.hot.accept([
    '../modules/message',
    '../modules/editor',
    '../modules/workspace'
  ], () => {
    const newMessage = require('../modules/message').default;
    const newEditor = require('../modules/editor').default;
    const newWorkspace = require('../modules/workspace').default;

    store.hotUpdate({
      modules: {
        message: newMessage,
        editor: newEditor,
        workspace: newWorkspace
      }
    })
  })
}

export default store;