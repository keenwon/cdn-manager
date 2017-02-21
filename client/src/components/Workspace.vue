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
        <comEditor :init-list="initList" @input="updateEditor"></comEditor>
      </div>
      <div class="ui primary button">
        <i class="icon send"></i>
        Submit
      </div>
      <div class="ui button" @click="reset">
        <i class="icon trash"></i>
        Reset
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import comEditor from './Editor';

  export default {
    components: {
      comEditor
    },

    data() {
      return {
        initList: []
      }
    },

    computed: {
      ...mapState({
        editorList: state => state.editor.list
      })
    },

    methods: {
      ...mapActions([
        'updateEditor',
        'cleanEditor'
      ]),

      reset() {
        this.initList = [];
        this.cleanEditor();
      }
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