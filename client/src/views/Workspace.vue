<template>
  <div class="ui container">
    <div class="ui info message">
      <div class="header">操作说明：</div>
      <ul class="list">
        <li>一行填写一个url，单次最多20条。</li>
        <li>url必须代表一个文件，不可以按目录清理。</li>
      </ul>
    </div>
    <div class="ui form" :class="{ loading: formLoading }">
      <div class="field">
        <!--<label>待清理的urls:</label>-->
        <comEditor :init-list="initList" @input="updateEditor" :match="/^[\w:\/]*$/">
          <slot>请输入待清理的urls...</slot>
        </comEditor>
      </div>
      <div class="ui primary button" @click="submit">
        <i class="icon send"></i>
        提交
      </div>
      <div class="ui green button" @click="createCollection">
        <i class="icon plus"></i>
        创建集合
      </div>
      <div class="ui button" @click="reset">
        <i class="icon trash"></i>
        清空
      </div>
    </div>
    <div class="cdn-manifest">
      <div class="ui top attached tabular menu">
        <a class="item"
           :class="{active: activeTab === 'history'}"
           @click="tabSwitch('history')">
          清理历史
        </a>
        <a class="item"
           :class="{active: activeTab === 'collection'}"
           @click="tabSwitch('collection')">
          集合
        </a>
      </div>
      <comHistory
        :list="historyList"
        :loadingId="historyLoadingId"
        :class="{active: activeTab === 'history'}"
        :remove="removeHistory"
        :purge="purgeHistory">
      </comHistory>
      <comCollection :class="{active: activeTab === 'collection'}"></comCollection>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import {
    EDITOR_UPDATE,
    EDITOR_CLEAN,
    WORKSPACE_PURGE,
    WORKSPACE_TAGSWITCH,
    WORKSPACE_HISTORY_REMOVE,
    WORKSPACE_HISTORY_PURGE,
    WORKSPACE_COLLECTION_UPDATE
  } from '../store/actionTypes';

  import comEditor from '../components/Editor';
  import comHistory from '../components/History';
  import comCollection from '../components/Collection';

  import Message from '../components/Message';
  import Dialog from '../components/CollectionDialog';

  export default {
    components: {
      comEditor,
      comHistory,
      comCollection
    },

    data() {
      return {
        initList: []
      }
    },

    computed: {
      ...mapState({
        editorIsValid: state => state.editor.isValid,
        editorList: state => state.editor.list,
        formLoading: state => state.workspace.formLoading,
        activeTab: state => state.workspace.activeTab,
        historyList: state => state.workspace.historyList,
        historyLoadingId: state => state.workspace.historyLoadingId
      })
    },

    methods: {
      ...mapActions({
        updateEditor: EDITOR_UPDATE,
        cleanEditor: EDITOR_CLEAN,
        purge: WORKSPACE_PURGE,
        tabSwitch: WORKSPACE_TAGSWITCH,
        removeHistory: WORKSPACE_HISTORY_REMOVE,
        _purgeHistory: WORKSPACE_HISTORY_PURGE,
        _createCollection: WORKSPACE_COLLECTION_UPDATE
      }),

      /**
       * 清空editor
       */
      reset() {
        this.initList = [];
      },

      /**
       * 清理缓存
       */
      submit() {
        if (!this.editorIsValid) {
          return Message.error('输入的内容有误，请修改后重试！');
        }

        if (!this.editorList.length) {
          return Message.error('请输入待清理的URL');
        }

        if (this.editorList.length > 20) {
          return Message.error('单次清理最多20条');
        }

        this.purge()
          .then(message => {
            Message.success(message);
            this.reset();
          })
          .catch(error => {
            Message.error(error);
          });
      },

      /**
       * 清理单条历史记录的缓存
       */
      purgeHistory(id, url) {
        let options = { id, url };
        this._purgeHistory(options)
          .then(message => Message.success(message))
          .catch(error => Message.error(error));
      },

      /**
       * 创建集合
       */
      createCollection() {
        if (!this.editorIsValid) {
          return Message.error('输入的URL有误，请修改后重试！');
        }

        if (!this.editorList.length) {
          return Message.error('请输入待清理的url');
        }

        if (this.editorList.length > 20) {
          return Message.error('一个集合最多20条url');
        }

        Dialog({
          title: '创建合集',
          list: this.editorList,
          save: data => {
            this._createCollection(data)
              .then(message => Message.success(message))
          }
        });
      }
    }
  }
</script>

<style>
  .ui.form {
    margin-top: 2em;
  }
  .cdn-manifest {
    margin-top: 5em;
  }
  .cdn-empty {
    text-align: center;
    line-height: 10em;
  }
</style>