/**
 * Message Module
 */

import { EDITOR_UPDATE, EDITOR_CLEAN } from '../store/actionTypes';

/**
 * initial state
 */
const state = {
  // editor内容
  list: [],

  // 是否校验通过
  isValid: false
};

/**
 * mutations
 */
const _EDITOR_CLEAN_ = '_EDITOR_CLEAN_';
const _EDITOR_UPDATE_ = '_EDITOR_UPDATE_';

const mutations = {
  [_EDITOR_CLEAN_](state) {
    state.list = [];
    state.isValid = false;
  },

  [_EDITOR_UPDATE_](state, { payload }) {
    state.list = payload.list;
    state.isValid = payload.isValid;
  }
};

/**
 * actions
 */
const actions = {
  [EDITOR_CLEAN]({ commit }) {
    commit({
      type: _EDITOR_CLEAN_
    });
  },

  [EDITOR_UPDATE]({ commit }, payload) {
    commit({
      type: _EDITOR_UPDATE_,
      payload
    });
  }
};

export default {
  state,
  mutations,
  actions
}