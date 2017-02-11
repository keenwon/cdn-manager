import * as types from './types';

export default {
  [types.MESSAGE_SUCCESS](state, {message}) {
    state.active = true;
    state.className = 'green';
    state.text = message;
  },

  [types.MESSAGE_FAIL](state, {message}) {
    state.active = true;
    state.className = 'red';
    state.text = message;
  },

  [types.MESSAGE_HIDE](state) {
    state.active = false;
  }
}