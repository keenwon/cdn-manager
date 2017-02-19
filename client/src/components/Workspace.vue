<template>
  <div class="ui container">
    <div class="ui info message" style="margin-top: 2em;">
      <div class="header">操作说明：</div>
      <ul class="list">
        <li>一行填写一个url，单次最多20条。</li>
        <li>url必须代表一个文件，不可以按目录清理。</li>
      </ul>
    </div>
    <div class="ui form">
      <div class="field">
        <label>待清理的urls:</label>
        <div id="editor"
             class="editor-containor"
             contenteditable="true"
             spellcheck="false"
             @input="input"
             @focus="focus"
             @blur="blur"
             @paste="paste">
        </div>
      </div>
      <div class="ui primary button">
        <i class="icon send"></i>
        Submit
      </div>
      <div class="ui button" @click="clean()">
        <i class="icon trash"></i>
        Reset
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: '请输入...'
      },
      activeColor: {
        type: String,
        default: '#333'
      },
      inactiveColor: {
        type: String,
        default: '#999'
      },
      activeBackground: {
        type: String,
        default: '#fff'
      },
      inactiveBackground: {
        type: String,
        default: '#f7f7f7'
      },
      errorColor: {
        type: String,
        default: '#fd5555'
      }
    },

    data: () => ({
      isValid: false,
      list: []
    }),

    methods: {
      init() {
        let $editor = document.getElementById('editor');
        let defaultContent = '';
        let triggerValidate = false;

        if (this.value.length) {
          this.value.forEach(item => {
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
        let list;
        let isValid = this.validate();

        if (isValid) {
          list = this.$editor.innerHTML
            .split(/<.+?>/)
            .filter(item => !!item);
        } else {
          list = [];
        }

        this.list = list;
        this.isValid = isValid;

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

      clean() {
        this.$editor.innerHTML = '<p></p>';
        this.blur();
      },

      validate () {
        let isValid = true;
        let $editor = this.$editor;
        let $p = $editor.querySelectorAll('p');

        $p.forEach(p => {
          if (p.innerText === '1') {
            isValid = false;
            p.style.color = this.errorColor;
          } else {
            p.style.color = null;
          }
        });

        return isValid;
      },

      send() {
        this.$emit('change', {
          idValid: this.isValid,
          list: this.list
        })
      }
    },

    mounted: function () {
      this.init();
    }
  }
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
</style>