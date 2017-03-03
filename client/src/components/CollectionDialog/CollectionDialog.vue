<template>
  <div class="ui dimmer modals page" :class="{active: active}" @click.self="close">
    <div class="ui small modal cdn-collection-dialog" :class="{active: active}">
      <div class="header">{{title}}</div>
      <div class="content">
        <div class="ui form" :class="{error: error}">
          <div class="field" :class="{error: error}">
            <label for="name">集合名称</label>
            <input id="name" type="text" v-model="name" @input="validate">
          </div>
          <div class="field">
            <label for="urls">URLs</label>
            <textarea id="urls" readonly v-html="listForShow"></textarea>
          </div>
          <div class="ui error message">
            <p>集合名称输出有误，可输入"汉字，英文，数字，下划线"。</p>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui primary button" :class="{disabled: error || !name}" @click="saveFn">保存</div>
        <div class="ui button" @click="close">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 弹窗title
      title: {
        type: String,
        default: '创建集合'
      },

      // 集合名称
      collectionName: {
        type: String,
        default: ''
      },

      // url列表
      list: {
        type: Array,
        default: () => ([])
      },

      // 保存操作
      save: {
        type: Function,
        default: () => {
        }
      }
    },

    data(){
      return {
        // 弹窗状态
        active: true,
        // 名称
        name: this.collectionName,
        // 名称错误
        error: false
      }
    },

    computed: {
      listForShow() {
        return this.list.join('\n');
      }
    },

    methods: {
      open() {
        this.active = true;
      },

      close() {
        this.active = false;
      },

      saveFn() {
        if (!this.validate()) {
          return;
        }

        this.save({
          name: this.name,
          list: this.list
        });

        this.close();
      },

      validate() {
        let reg = /^[\u4e00-\u9fa5a-zA-Z][\u4e00-\u9fa5\w]*$/;
        let isValid = reg.test(this.name);

        this.error = !isValid;

        return isValid;
      }
    }
  };
</script>

<style>
  .cdn-collection-dialog {
    top: 60px !important;
  }
  .cdn-collection-dialog .ui.form {
    margin-top: 0;
  }
  .cdn-collection-dialog textarea {
    resize: none !important;
  }
</style>