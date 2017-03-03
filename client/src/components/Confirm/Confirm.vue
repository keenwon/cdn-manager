<template>
  <div class="ui dimmer modals page" :class="{active: active}">
    <div class="ui small basic modal cdn-confirm" :class="{active: active}">
      <div class="ui icon header">
        <i class="warning sign icon"></i>
      </div>
      <div class="content center">
        <p class="cdn-confirm-message">{{message}}</p>
      </div>
      <div class="actions">
        <div class="ui red basic cancel inverted button" @click="confirmFn">
          <i class="remove icon"></i>
          No
        </div>
        <div class="ui green ok inverted button" @click="cancelFn">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 确认回调
      confirm: {
        type: Function,
        default: () => {
        }
      },

      // 取消回调
      cancel: {
        type: Function,
        default: () => {
        }
      },

      // 提示信息
      message: {
        type: String,
        default: '提示'
      }
    },

    data() {
      return {
        // 是否显示
        active: false
      }
    },

    methods: {
      open() {
        this.active = true;
        document.body.style.overflowY = 'hidden';
      },

      close() {
        this.active = false;
        document.body.style.overflowY = 'auto';
      },

      confirmFn() {
        this.close();
        this.confirm();
      },

      cancelFn() {
        this.close();
        this.cancel();
      }
    }
  }
</script>

<style>
  .cdn-confirm {
    margin-top: -130px !important;
  }
  .cdn-confirm-message {
    text-align: center;
  }
</style>