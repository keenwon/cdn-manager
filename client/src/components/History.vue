<template>
  <div class="ui bottom attached tab segment">
    <table class="ui striped table cdn-history-table" v-show="!isEmpty">
      <thead>
      <tr>
        <th>文件类型</th>
        <th style="width: 60%">文件url</th>
        <th>执行时间</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in list" :key="item.id">
        <td>file</td>
        <td>{{item.value}}</td>
        <td>{{timeage(item.timestamp)}}</td>
        <td class="right aligned">
          <button class="ui primary basic button icon mini">
            <i class="plus icon"></i>
          </button>
          <button class="ui negative basic button icon mini" @click="remove(item.id)">
            <i class="minus icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
    <p class="cdn-empty" v-show="isEmpty">暂无历史记录</p>
  </div>
</template>

<script>
  import timeago from 'timeago.js';

  export default {
    props: {
      list: {
        type: Array,
        required: true
      },
      remove: {
        type: Function,
        required: true
      }
    },

    computed: {
      isEmpty() {
        return !this.list.length;
      }
    },

    methods: {
      timeage(timestamp) {
        return new timeago().format(timestamp);
      }
    }
  }
</script>

<style>
  .ui.table.cdn-history-table {
    margin: 15px auto;
  }
  .cdn-history-date {
    vertical-align: middle;
  }
</style>