import Vue from 'vue';
import ConfirmComponent from './Confirm';

const ConfirmConstructor = Vue.extend(ConfirmComponent);

let _instance;

const getInstance = () => {
  if (!_instance) {
    _instance = new ConfirmConstructor({
      el: document.createElement('div')
    });

    document.body.append(_instance.$el);
  }

  return _instance;
};

export default function (options) {
  let instance = getInstance();
  let defaultOptions = {
    confirm: () => {
    },
    cancel: () => {
    }
  };

  Object.assign(instance, defaultOptions, options);

  instance.open();

  return instance;
}