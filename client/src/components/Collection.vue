<template>
  <div class="ui bottom attached tab segment">
    <div class="ui icon input cdn-collection-filter" v-show="!isEmpty">
      <input type="text" placeholder="筛选集合" v-model="keywords">
      <i class="remove link icon" @click="cleanKeywords"></i>
    </div>
    <table class="ui green striped table cdn-collection-table" v-show="!isEmpty && hasFilterResult">
      <thead>
      <tr>
        <th style="width: 25%">集合名称</th>
        <th style="width: 45%">集合urls</th>
        <th>编辑时间</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in filteredList" :key="item.id">
        <td v-html="highlight(item.value.name)"></td>
        <td v-html="item.value.list.join('<br />')"></td>
        <td>
          <span :title="formatDate(item.timestamp)">{{timeage(item.timestamp)}}</span>
        </td>
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
    <p class="cdn-empty" v-show="isEmpty">暂无集合</p>
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
            return item.value.name.toLowerCase()
              .includes(this.keywords.toLowerCase());
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
  .ui.table.cdn-collection-table {
    margin: 15px auto;
  }
  .cdn-collection-table em {
    font-style: normal;
    font-weight: 600;
    background-color: rgba(255, 255, 140, 0.7);
  }
  .cdn-collection-filter {
    width: 30%;
  }
</style>