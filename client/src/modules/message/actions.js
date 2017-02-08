import * as types from './types';

export default {
  showSuccessMessage (context, message) {
    context.commit({
      type: types.MESSAGE_SUCCESS,
      message
    });
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