<template>
  <div class="ui bottom attached tab segment">
    <div class="ui icon input cdn-history-filter" v-show="!isEmpty">
      <input type="text" placeholder="筛选历史记录" v-model="keywords">
      <i class="remove link icon" @click="cleanKeywords"></i>
    </div>
    <table class="ui blue striped table cdn-history-table" v-show="!isEmpty && hasFilterResult">
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
        <td>
          <div class="ui purple horizontal label"
               v-if="item.value.collectionName"
               :title="'来自集合：' + item.value.collectionName">
            {{item.value.collectionName}}
          </div>
          <span v-html="highlight(item.value.url)"></span>
        </td>
        <td>
          <span :title="formatDate(item.timestamp)">{{timeage(item.timestamp)}}</span>
        </td>
        <td class="right aligned">
          <button class="ui primary basic button icon mini"
                  :class="{loading: loadingId===item.id}"
                  @click="purge(item.id, item.value.url)">
            <i class="recycle icon"></i>
          </button>
          <button class="ui negative basic button icon mini" @click="remove(item.id)">
            <i class="minus icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <th colspan="4">
          共 {{filteredList.length}} 条记录
        </th>
      </tr>
      </tfoot>
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
        return this.list
          .filter(item => {
            return item.value.url.toLowerCase().includes(this.keywords.toLowerCase());
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

      formatDate(timestamp) {
        let date = new Date(+timestamp);

        let o = {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate(),
          hour: date.getHours(),
          min: date.getMinutes(),
          sec: date.getSeconds()
        };

        Object.keys(o).forEach(key => {
          if (o[key] < 10) {
            o[key] = '0' + o[key];
          }
        });

        return `${o.year}-${o.month}-${o.day} ${o.hour}:${o.min}:${o.sec}`;
      },

      highlight(value) {
        if (!this.keywords) {
          return value;
        }

        return value.replace(
          new RegExp(this.keywords, 'ig'),
          `<em>${this.keywords}</em>`
        );
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