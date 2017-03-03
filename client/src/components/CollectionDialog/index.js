import Vue from 'vue';
import DialogComponent from './CollectionDialog';

const DialogConstructor = Vue.extend(DialogComponent);

let _instance;

const getInstance = () => {
  if (!_instance) {
    _instance = new DialogConstructor({
      el: document.createElement('div')
    });

    document.body.append(_instance.$el);
  }

  return _instance;
};

export default function (options) {
  let instance = getInstance();

  Object.assign(instance, options);

  return instance;
}