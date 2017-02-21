import * as types from './types';

export default {
  [types.EDITOR_CLEAN](state) {
    state.list = [];
    state.isValid = false;
  },

  [types.EDITOR_UPDATE](state, { payload }) {
    state.list = payload.list;
    state.isValid = payload.isValid;
  }
}