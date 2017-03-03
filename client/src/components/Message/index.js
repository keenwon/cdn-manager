import Vue from 'vue';
import MessageComponent from './Message';

const MessageConstructor = Vue.extend(MessageComponent);

let _instance;

const getInstance = () => {
  if (!_instance) {
    _instance = new MessageConstructor({
      el: document.createElement('div')
    });

    document.body.append(_instance.$el);
  }

  return _instance;
};

const Message = options => {
  let instance = getInstance();

  instance.timer && clearTimeout(instance.timer);
  instance.active = true;
  instance.text = options.text;
  instance.className = options.type === 'error' ? 'red' : 'green';

  if (options.type === 'success') {
    instance.timer = setTimeout(() => {
      instance.active && instance.close();
    }, 3000);
  }

  return instance;
};

export default {
  success: (text = '操作成功') => Message({
    text,
    type: 'success'
  }),

  error: (text = '未知错误') => Message({
    text,
    type: 'error'
  })
}