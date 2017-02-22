/**
 * Message Module
 */

/**
 * types
 */
export const MESSAGE_SUCCESS = 'MESSAGE_SUCCESS';
export const MESSAGE_FAIL = 'MESSAGE_FAIL';
export const MESSAGE_HIDE = 'MESSAGE_HIDE';

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
  [MESSAGE_SUCCESS](state, { message }) {
    state.active = true;
    state.className = 'green';
    state.text = message;
  },

  [MESSAGE_FAIL](state, { message }) {
    state.active = true;
    state.className = 'red';
    state.text = message;
  },

  [MESSAGE_HIDE](state) {
    state.active = false;
  }
};

/**
 * action
 */
let timer;

export const actions = {
  showSuccessMessage (context, message) {
    context.commit({
      type: MESSAGE_SUCCESS,
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
      type: MESSAGE_FAIL,
      message
    });
  },

  hideMessage (context) {
    context.commit({
      type: MESSAGE_HIDE
    });
  }
};

export default {
  state,
  mutations,
  actions
}