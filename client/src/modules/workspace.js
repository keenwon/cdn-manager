/**
 * Workspace Module
 */

import * as apis from '../api/workspace';

/**
 * Types
 */
const WORKSPACE_LOADING_START = 'WORKSPACE_LOADING_START';
const WORKSPACE_LOADING_END = 'WORKSPACE_LOADING_END';

/**
 * State
 */
const state = {
  isLoading: false
};

/**
 * Mutation
 */
const mutations = {
  [WORKSPACE_LOADING_START](state) {
    state.isLoading = true;
  },

  [WORKSPACE_LOADING_END](state) {
    state.isLoading = false;
  }
};

/**
 * Actions
 */
const actions = {
  purge({ commit, dispatch, rootState }) {
    let { isValid, list } = rootState.editor;

    if (!isValid) {
      return dispatch('showFailMessage', '输入的内容有误，请修改后重试！');
    }

    if (!list.length) {
      return dispatch('showFailMessage', '请输入待清理的URL');
    }

    commit(WORKSPACE_LOADING_START);

    apis.purge(list)
      .then(() => {
        dispatch('showSuccessMessage', '清理成功');
      })
      .catch(error => {
        dispatch('showFailMessage', error.text || '请求失败，请稍后再试！');
      })
      .then(() => {
        commit(WORKSPACE_LOADING_END);
      });
  }
};

export default {
  state,
  actions,
  mutations
};