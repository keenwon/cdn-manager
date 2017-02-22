/**
 * Message Module
 */

import {
  MESSAGE_FAIL,
  MESSAGE_HIDE,
  MESSAGE_SUCCESS
} from '../store/actionTypes';

/**
 * State
 */
const state = {
  // message容器的class名
  className: '',

  // 是否显示message
  active: false,

  // message内容
  text: ''
};

/**
 * Mutations
 */
const _MESSAGE_SUCCESS_ = '_MESSAGE_SUCCESS_';
const _MESSAGE_FAIL_ = '_MESSAGE_FAIL_';
const _MESSAGE_HIDE_ = '_MESSAGE_HIDE_';

const mutations = {
  [_MESSAGE_SUCCESS_](state, { message }) {
    state.active = true;
    state.className = 'green';
    state.text = message;
  },

  [_MESSAGE_FAIL_](state, { message }) {
    state.active = true;
    state.className = 'red';
    state.text = message;
  },

  [_MESSAGE_HIDE_](state) {
    state.active = false;
  }
};

/**
 * Action
 */
let timer;

export const actions = {
  [MESSAGE_SUCCESS] ({ commit, state }, message) {
    commit({
      type: _MESSAGE_SUCCESS_,
      message
    });

    // auto hide
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (state.className !== 'green') {
        return;
      }

      commit(_MESSAGE_HIDE_);
    }, 3000);
  },

  [MESSAGE_FAIL] ({ commit }, message) {
    commit({
      type: _MESSAGE_FAIL_,
      message
    });
  },

  [MESSAGE_HIDE] ({ commit }) {
    commit({
      type: _MESSAGE_HIDE_
    });
  }
};

export default {
  state,
  mutations,
  actions
}