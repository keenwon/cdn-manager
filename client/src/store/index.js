import Vue from 'vue';
import Vuex from 'vuex';

import editor from '../modules/editor';
import workspace from '../modules/workspace';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    editor,
    workspace
  }
});

if (module.hot) {
  module.hot.accept([
    '../modules/editor',
    '../modules/workspace'
  ], () => {
    const newEditor = require('../modules/editor').default;
    const newWorkspace = require('../modules/workspace').default;

    store.hotUpdate({
      modules: {
        editor: newEditor,
        workspace: newWorkspace
      }
    })
  })
}

export default store;