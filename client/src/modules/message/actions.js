import * as types from './types';

let timer;

export default {
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