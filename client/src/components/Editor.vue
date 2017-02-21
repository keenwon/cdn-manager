<template>
  <div id="editor"
       class="editor-containor"
       contenteditable="true"
       spellcheck="false"
       @input="input"
       @focus="focus"
       @blur="blur"
       @paste="paste">
  </div>
</template>

<script>
  export default {
    props: {
      // 初始值
      initList: {
        type: Array,
        default: () => []
      },

//      // 自动以placeholder
//      placeholder: {
//        type: String,
//        default: '请输入...'
//      },

      // 激活状态的文字颜色
      activeColor: {
        type: String,
        default: '#333'
      },

      // 非激活状态的文字颜色
      inactiveColor: {
        type: String,
        default: '#999'
      },

      // 激活状态的背景
      activeBackground: {
        type: String,
        default: '#fff'
      },

      // 非激活状态的背景
      inactiveBackground: {
        type: String,
        default: '#f7f7f7'
      },

      // 错误状态的文字颜色
      errorClass: {
        type: [Array, String],
        default: 'editor-error'
      }
    },

    data() {
      let defaultSlot = this.$slots.default;
      let placeholder;

      if (!defaultSlot || !defaultSlot.length || !defaultSlot[0].text) {
        placeholder = '请输入...';
      } else {
        placeholder = defaultSlot[0].text.trim();
      }

      return {
        isValid: false,
        editorList: this.initList,
        placeholder
      }
    },

    watch: {
      initList() {
        this.editorList = this.initList;
        this.init();
      }
    },

    computed: {
      errorClassName() {
        return Array.isArray(this.errorClass)
          ? this.errorClass.join(' ')
          : this.errorClass;
      }
    },

    methods: {

      /**
       * 初始化：根据props传入的值初始化Editor
       */
      init() {
        let $editor = document.getElementById('editor');
        let defaultContent = '';
        let triggerValidate = false;

        if (this.editorList.length) {
          this.editorList.forEach(item => {
            defaultContent += `<p>${item}</p>`;
          });
          triggerValidate = true;
        } else {
          defaultContent = `<p>${this.placeholder}</p>`;
        }

        $editor.innerHTML = defaultContent;
        $editor.style.background = this.inactiveBackground;
        $editor.style.color = this.inactiveColor;

        this.$editor = $editor;

        if (triggerValidate) {
          this.input();
        }
      },

      input() {
        this.isValid = this.validate();
        this.editorList = this.$editor.innerHTML
          .split(/<.+?>/)
          .filter(item => !!item);

        this.send();
      },

      focus() {
        let $editor = this.$editor;

        if ($editor.innerText.trim() === this.placeholder) {
          $editor.innerHTML = '<p></p>';
        }

        $editor.style.background = this.activeBackground;
        $editor.style.color = this.activeColor;
      },

      blur() {
        let $editor = this.$editor;

        if (!$editor.innerText.trim()) {
          $editor.innerHTML = `<p>${this.placeholder}</p>`;
        }

        $editor.style.background = this.inactiveBackground;
        $editor.style.color = this.inactiveColor;
      },

      paste(event) {
        event.preventDefault();

        let rawHtml = event.clipboardData.getData("text/html");
        let html = this.cleanPaste(rawHtml);

        document.execCommand("insertHTML", false, html);
      },

      /**
       * 简化html
       */
      cleanPaste(html) {
        if (!html) {
          return html;
        }

        let blockTags = [
          'address', 'article', 'aside', 'audio', 'blockquote', 'canvas', 'dd',
          'div', 'dl', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
          'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr', 'br',
          'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table', 'tfoot',
          'ul', 'video'
        ];

        // 替换换行
        html = html.replace(/\n/g, '<br>');

        // 统一标签，去掉/，去掉各种属性
        html = html.replace(/<\/?([\w\d]+).*?>/g, '<$1>');

        // 清除行内标签
        html = html.replace(/<(.+?)>/g, function (matchedStr, tag) {
          return blockTags.includes(tag) ? matchedStr : '';
        });

        return html.split(/<.+?>/).filter(item => !!item).join('</p><p>');
      },

      /**
       * 验证Editor内容
       */
      validate () {
        let isValid = true;
        let $editor = this.$editor;
        let $p = $editor.querySelectorAll('p');

        $p.forEach(p => {
          if (p.innerText === '1') {
            isValid = false;
            p.setAttribute('class', this.errorClassName);
          } else {
            p.removeAttribute('class');
          }
        });

        return isValid;
      },

      /**
       * 触发组件上的事件
       */
      send() {
        this.$emit('input', {
          isValid: this.isValid,
          list: this.editorList
        });
      }
    },

    mounted() {
      this.init();
    }
  };
</script>

<style>
  .editor-containor {
    padding: 5px;
    min-height: 200px;
    border: 1px solid #ccc;
  }
  .editor-containor p {
    height: 20px;
    line-height: 20px;
    margin: 0;
  }
  .editor-containor p.editor-error {
    color: #fd5555;
  }
</style>