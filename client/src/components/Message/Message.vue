<template>
  <transition name="a-message">
    <div class="ui info message cdn-message" v-show="active" :class="className">
      <i class="close icon" @click="close"></i>
      <div class="header">提示</div>
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      active: Boolean,
      text: String,
      className: String
    },

    methods: {
      close() {
        this.active = false;
        this.text = '';
      }
    }
  }
</script>

<style>
  .cdn-message.ui.message {
    width: 300px;
    max-height: 92px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    z-index: 100;
    bottom: 30px;
    right: 30px;
    transition: right .5s;
  }
  .cdn-message.ui.message.a-message-enter {
    right: -1000px;
  }
  .cdn-message.ui.message.a-message-leave-active {
    display: none;
  }
</style>