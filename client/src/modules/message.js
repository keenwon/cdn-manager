/**
 * Message Module
 */

/**
 * types
 */
const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
const MESSAGE_FAIL = 'MESSAGE_FAIL';
const MESSAGE_HIDE = 'MESSAGE_HIDE';

const types = {
  [MESSAGE_SUCCESS]: MESSAGE_SUCCESS,
  [MESSAGE_FAIL]: MESSAGE_FAIL,
  [MESSAGE_HIDE]: MESSAGE_HIDE
};

/**
 * initial state
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
 * mutations
 */
const mutations = {
  [types.MESSAGE_SUCCESS](state, { message }) {
    state.active = true;
    state.className = 'green';
    state.text = message;
  },

  [types.MESSAGE_FAIL](state, { message }) {
    state.active = true;
    state.className = 'red';
    state.text = message;
  },

  [types.MESSAGE_HIDE](state) {
    state.active = false;
  }
};

/**
 * action
 */
let timer;

const actions = {
  showSuccessMessage (context, message) {
    context.commit({
      type: types.MESSAGE_SUCCESS,
      message
    });

    // auto hide
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      if (context.state.className !== 'green') {
        return;
      }

      context.dispatch('hideMessage');
    }, 3000);
  },

  showFailMessage (context, message) {
    context.commit({
      type: types.MESSAGE_FAIL,
      message
    });
  },

  hideMessage (context) {
    context.commit({
      type: types.MESSAGE_HIDE
    });
  }
};

export default {
  types,
  state,
  mutations,
  actions
}