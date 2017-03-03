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

  Object.assign(instance, options);

  instance.open();

  return instance;
}