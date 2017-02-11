<template>
  <transition name="a-message">
    <div class="ui info message cdn-message" v-show="active" :class="className">
      <i class="close icon" @click="hideMessage()"></i>
      <div class="header">提示</div>
      <p>{{text}}</p>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState({
        active: state => state.message.active,
        text: state => state.message.text,
        className: state => state.message.className
      })
    },
    methods: {
      ...mapActions([
        'hideMessage'
      ])
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
    bottom: 30px;
    right: 40px;
    transition: right .5s;
  }
  .cdn-message.ui.message.a-message-enter {
    right: -1000px;
  }
  .cdn-message.ui.message.a-message-leave-active {
    display: none;
  }
</style>