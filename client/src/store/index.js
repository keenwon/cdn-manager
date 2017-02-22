import Vue from 'vue';
import Vuex from 'vuex';

import message from '../modules/message';
import editor from '../modules/editor';
import workspace from '../modules/workspace';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    message,
    editor,
    workspace
  }
});