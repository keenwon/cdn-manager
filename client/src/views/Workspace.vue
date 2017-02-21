<template>
  <div class="ui container">
    <div class="ui info message">
      <div class="header">操作说明：</div>
      <ul class="list">
        <li>一行填写一个url，单次最多20条。</li>
        <li>url必须代表一个文件，不可以按目录清理。</li>
      </ul>
    </div>
    <div class="ui form">
      <div class="field">
        <!--<label>待清理的urls:</label>-->
        <comEditor :init-list="initList" @input="updateEditor">
          <slot>请输入待清理的urls...</slot>
        </comEditor>
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
  import comEditor from '../components/Editor';

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
  .ui.form {
    margin-top: 2em;
  }
</style>