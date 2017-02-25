/**
 * Workspace Module
 */

import * as apis from '../api/workspace';
import * as storage from '../api/storage';

import {
  MESSAGE_SUCCESS,
  MESSAGE_FAIL,
  WORKSPACE_PURGE,
  WORKSPACE_TAGSWITCH,
  WORKSPACE_HISTORY_REMOVE
} from '../store/actionTypes';

/**
 * State
 */
const state = {
  formLoading: false,
  activeTab: 'history',
  historyList: storage.getHistory().reverse(),
  collectionList: []
};

/**
 * Mutation
 */
const _WORKSPACE_LOADING_START_ = '_WORKSPACE_LOADING_START_';
const _WORKSPACE_LOADING_END_ = '_WORKSPACE_LOADING_END_';
const _WORKSPACE_TAB_SWITCH_ = '_WORKSPACE_TAB_SWITCH_';
const _WORKSPACE_HISTORY_UPDATE_ = '_WORKSPACE_HISTORY_UPDATE_';

const mutations = {
  [_WORKSPACE_LOADING_START_](state) {
    state.formLoading = true;
  },

  [_WORKSPACE_LOADING_END_](state) {
    state.formLoading = false;
  },

  [_WORKSPACE_TAB_SWITCH_](state, { tabName }) {
    state.activeTab = tabName;
  },

  [_WORKSPACE_HISTORY_UPDATE_](state, { urls }) {
    state.historyList = urls;
  }
};

/**
 * Actions
 */
const actions = {
  // 缓存清理
  [WORKSPACE_PURGE]({ commit, dispatch, rootState }) {
    return new Promise((resolve, reject) => {
      let { isValid, list } = rootState.editor;

      if (!isValid) {
        dispatch(MESSAGE_FAIL, '输入的内容有误，请修改后重试！');
        return reject();
      }

      if (!list.length) {
        dispatch(MESSAGE_FAIL, '请输入待清理的URL');
        return reject();
      }

      if (list.length > 20) {
        dispatch(MESSAGE_FAIL, '单次清理最多20条');
        return reject();
      }

      commit(_WORKSPACE_LOADING_START_);

      apis.purge(list)
        .then(() => {
          dispatch(MESSAGE_SUCCESS, '清理成功');

          let newList = storage.pushHistory(list).reverse();

          commit(_WORKSPACE_HISTORY_UPDATE_, {
            urls: newList
          });

          resolve();
        })
        .catch(error => {
          dispatch(MESSAGE_FAIL, error.text || '请求失败，请稍后再试！');
          reject();
        })
        .then(() => {
          commit(_WORKSPACE_LOADING_END_);
        });
    });
  },

  // 删除history
  [WORKSPACE_HISTORY_REMOVE]({ commit }, id) {
    let newList = storage.removeHistory(id).reverse();

    commit(_WORKSPACE_HISTORY_UPDATE_, {
      urls: newList
    });
  },

  // tab切换
  [WORKSPACE_TAGSWITCH]({ commit }, tabName) {
    commit({
      type: _WORKSPACE_TAB_SWITCH_,
      tabName
    });
  }
};

export default {
  state,
  actions,
  mutations
};