<template>
  <div class="ui bottom attached tab segment">
    <div class="ui icon input cdn-history-filter" v-show="!isEmpty">
      <input type="text" placeholder="筛选历史记录" v-model="keywords">
      <i class="remove link icon" @click="cleanKeywords"></i>
    </div>
    <table class="ui striped table cdn-history-table" v-show="!isEmpty && hasFilterResult">
      <thead>
      <tr>
        <th>文件类型</th>
        <th style="width: 60%">文件url</th>
        <th>执行时间</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in filteredList" :key="item.id">
        <td>file</td>
        <td v-html="item.valueForShow || item.value"></td>
        <td>{{timeage(item.timestamp)}}</td>
        <td class="right aligned">
          <button class="ui primary basic button icon mini"
                  :class="{loading: loadingId===item.id}"
                  @click="purge(item.id, item.value)">
            <i class="recycle icon"></i>
          </button>
          <button class="ui negative basic button icon mini" @click="remove(item.id)">
            <i class="minus icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <p class="cdn-empty" v-show="!isEmpty && !hasFilterResult">
      找不到 <b>{{this.keywords}}</b> 相关的记录
    </p>
    <p class="cdn-empty" v-show="isEmpty">暂无历史记录</p>
  </div>
</template>

<script>
  import Timeago from 'timeago.js';

  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      loadingId: {
        type: String,
        default: ''
      },
      remove: {
        type: Function,
        required: true
      },
      purge: {
        type: Function,
        required: true
      }
    },

    data() {
      return {
        keywords: ''
      }
    },

    computed: {
      isEmpty() {
        return !this.list.length;
      },

      filteredList() {
        return this.filteredList = this.list
          .filter(item => {
            return item.value.toLowerCase().includes(this.keywords.toLowerCase());
          })
          .map(item => {
            item.valueForShow = item.value
              .replace(new RegExp(this.keywords, 'ig'), `<em>${this.keywords}</em>`);
            return item;
          });
      },

      hasFilterResult() {
        return !!this.filteredList.length;
      }
    },

    methods: {
      timeage(timestamp) {
        return new Timeago().format(timestamp);
      },

      cleanKeywords() {
        if (!this.keywords) {
          return;
        }

        this.keywords = '';
      }
    }
  }
</script>

<style>
  .ui.table.cdn-history-table {
    margin: 15px auto;
  }
  .cdn-history-table em {
    font-style: normal;
    font-weight: 600;
    background-color: rgba(255, 255, 140, 0.7);
  }
  .cdn-history-filter {
    width: 30%;
  }
</style>