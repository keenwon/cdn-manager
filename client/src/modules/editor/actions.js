import * as types from './types';

export default {
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