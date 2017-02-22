<template>
  <div ref="editor"
       contenteditable="true"
       spellcheck="false"
       :class="className"
       @input="input"
       @focus="focus"
       @blur="blur"
       @paste="paste">
  </div>
</template>

<script>
  const placeholderId = '__editor__placeholder__';

  export default {
    props: {
      // 初始值
      initList: {
        type: Array,
        default: () => []
      },

      className: {
        type: [Array, String],
        default: 'editor-containor'
      },

      // 错误状态的文字颜色
      errorClass: {
        type: [Array, String],
        default: 'editor-error'
      },

      match: {
        type: [RegExp, Function],
        default: () => true
      }
    },

    data() {
      let defaultSlot = this.$slots.default;
      let placeholder;

      // 这里placeholder不能使用纯css实现，否则第一行没有p元素包裹
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
        let $editor = this.$refs.editor;
        let defaultContent = '';

        if (this.editorList.length) {
          this.editorList.forEach(item => {
            defaultContent += `<p>${item}</p>`;
          });
        } else {
          defaultContent = `<p id="${placeholderId}">${this.placeholder}</p>`;
        }

        $editor.innerHTML = defaultContent;

        this.input();
      },

      input() {
        let editorNode = this.$refs.editor.cloneNode(true);
        let placeholderNode = editorNode.querySelector(`#${placeholderId}`);

        if (placeholderNode) {
          editorNode.removeChild(placeholderNode);
        }

        this.isValid = this.validate();
        this.editorList = editorNode.innerHTML
          .split(/<.+?>/)
          .filter(item => !!item);

        this.send();
      },

      focus() {
        let $editor = this.$refs.editor;

        if ($editor.innerText.trim() === this.placeholder) {
          $editor.innerHTML = '<p></p>';
        }
      },

      blur() {
        let $editor = this.$refs.editor;

        if (!$editor.innerText.trim()) {
          $editor.innerHTML = `<p id="${placeholderId}">${this.placeholder}</p>`;
        }
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
        let $editor = this.$refs.editor;
        let $p = $editor.querySelectorAll('p');
        let len = $p.length;
        let innerText, p;

        while (len--) {
          p = $p[len];
          innerText = p.innerText.trim();

          // 忽略空行
          if (!innerText) {
            continue;
          }

          if (this.test(innerText) || p.id === placeholderId) {
            p.removeAttribute('class');
          } else {
            isValid = false;
            p.setAttribute('class', this.errorClassName);
          }
        }

        return isValid;
      },

      /**
       * 测试是否合法
       */
      test(value) {
        return typeof this.match === 'function'
          ? this.match.call(this, value)
          : this.match.test(value)
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
    color: #999;
    background: #f7f7f7;
    border: 1px solid #ccc;
  }
  .editor-containor:focus {
    color: #333;
    background: #fff;
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