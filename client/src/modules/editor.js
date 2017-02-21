/**
 * Message Module
 */

/**
 * types
 */
const EDITOR_CLEAN = 'EDITOR_CLEAN';
const EDITOR_UPDATE = 'EDITOR_UPDATE';

const types = {
  [EDITOR_CLEAN]: EDITOR_CLEAN,
  [EDITOR_UPDATE]: EDITOR_UPDATE
};

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
const mutations = {
  [types.EDITOR_CLEAN](state) {
    state.list = [];
    state.isValid = false;
  },

  [types.EDITOR_UPDATE](state, { payload }) {
    state.list = payload.list;
    state.isValid = payload.isValid;
  }
};

/**
 * actions
 */
const actions = {
  cleanEditor (context) {
    context.commit({
      type: types.EDITOR_CLEAN
    });
  },

  updateEditor(context, payload) {
    context.commit({
      type: types.EDITOR_UPDATE,
      payload
    });
  }
};

export default {
  types,
  state,
  mutations,
  actions
}