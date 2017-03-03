/**
 * Workspace Module
 */

import * as apis from '../api/workspace';
import * as storage from '../api/storage';

import {
  WORKSPACE_PURGE,
  WORKSPACE_TAGSWITCH,
  WORKSPACE_HISTORY_REMOVE,
  WORKSPACE_HISTORY_PURGE
} from '../store/actionTypes';

/**
 * State
 */
let historyList = storage.getHistory();

const state = {
  formLoading: false,
  historyLoadingId: '', // loading状态的那一条history
  activeTab: 'history',
  historyList: Array.isArray(historyList) ? historyList.reverse() : [],
  collectionList: []
};

/**
 * Mutation
 */
const _WORKSPACE_LOADING_START_ = '_WORKSPACE_LOADING_START_';
const _WORKSPACE_LOADING_END_ = '_WORKSPACE_LOADING_END_';
const _WORKSPACE_TAB_SWITCH_ = '_WORKSPACE_TAB_SWITCH_';
const _WORKSPACE_HISTORY_UPDATE_ = '_WORKSPACE_HISTORY_UPDATE_';
const _WORKSPACE_HISTORY_LOADING_START_ = '_WORKSPACE_HISTORY_LOADING_START_';
const _WORKSPACE_HISTORY_LOADING_END_ = '_WORKSPACE_HISTORY_LOADING_END_';

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
  },

  [_WORKSPACE_HISTORY_LOADING_START_](state, { id }) {
    state.historyLoadingId = id;
  },

  [_WORKSPACE_HISTORY_LOADING_END_](state) {
    state.historyLoadingId = '';
  }
};

/**
 * Actions
 */
const actions = {
  // 缓存清理
  [WORKSPACE_PURGE]({ commit, rootState }) {
    return new Promise((resolve, reject) => {
      let { isValid, list } = rootState.editor;

      if (!isValid) {
        return reject('输入的内容有误，请修改后重试！');
      }

      if (!list.length) {
        return reject('请输入待清理的URL');
      }

      if (list.length > 20) {
        return reject('单次清理最多20条');
      }

      commit(_WORKSPACE_LOADING_START_);

      apis.purge(list)
        .then(() => {
          let newList = storage.pushHistory(list).reverse();

          commit(_WORKSPACE_HISTORY_UPDATE_, {
            urls: newList
          });

          resolve('清理成功');
        })
        .catch(error => {
          reject(error.text || '请求失败，请稍后再试！');
        })
        .then(() => {
          commit(_WORKSPACE_LOADING_END_);
        });
    });
  },

  // 再次清理某次历史记录
  [WORKSPACE_HISTORY_PURGE]({ commit }, payload) {
    commit({
      type: _WORKSPACE_HISTORY_LOADING_START_,
      id: payload.id
    });

    let list = [payload.url];

    return new Promise((resolve, reject) => {
      apis.purge(list)
        .then(() => {
          let newList = storage.pushHistory(list).reverse();

          commit(_WORKSPACE_HISTORY_UPDATE_, {
            urls: newList
          });

          resolve('清理成功');
        })
        .catch(error => {
          reject(error.text || '请求失败，请稍后再试！');
        })
        .then(() => {
          commit(_WORKSPACE_HISTORY_LOADING_END_);
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