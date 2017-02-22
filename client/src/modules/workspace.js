/**
 * Workspace Module
 */

import * as apis from '../api/workspace';
import {
  WORKSPACE_PURGE,
  MESSAGE_SUCCESS,
  MESSAGE_FAIL
} from '../store/actionTypes';

/**
 * State
 */
const state = {
  isLoading: false
};

/**
 * Mutation
 */
const _WORKSPACE_LOADING_START_ = '_WORKSPACE_LOADING_START_';
const _WORKSPACE_LOADING_END_ = '_WORKSPACE_LOADING_END_';

const mutations = {
  [_WORKSPACE_LOADING_START_](state) {
    state.isLoading = true;
  },

  [_WORKSPACE_LOADING_END_](state) {
    state.isLoading = false;
  }
};

/**
 * Actions
 */
const actions = {
  [WORKSPACE_PURGE]({ commit, dispatch, rootState }) {
    let { isValid, list } = rootState.editor;

    if (!isValid) {
      return dispatch(MESSAGE_FAIL, '输入的内容有误，请修改后重试！');
    }

    if (!list.length) {
      return dispatch(MESSAGE_FAIL, '请输入待清理的URL');
    }

    if (list.length > 20) {
      return dispatch(MESSAGE_FAIL, '单次清理最多20条');
    }

    commit(_WORKSPACE_LOADING_START_);

    apis.purge(list)
      .then(() => {
        dispatch(MESSAGE_SUCCESS, '清理成功');
      })
      .catch(error => {
        dispatch(MESSAGE_FAIL, error.text || '请求失败，请稍后再试！');
      })
      .then(() => {
        commit(_WORKSPACE_LOADING_END_);
      });
  }
};

export default {
  state,
  actions,
  mutations
};