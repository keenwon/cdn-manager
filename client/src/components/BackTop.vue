<template>
  <a class="cdn-backtop"
     ref="el"
     :style="styleObject"
     @click="click"
     href="javascript:;">
    <i class="chevron big up icon"></i>
  </a>
</template>

<script>
  let timer;

  export default {
    data() {
      return {
        show: false,
        scrollTop: 0,
        clientHeight: 0
      }
    },

    computed: {
      styleObject() {
        return this.show
          ? { visibility: 'visible' }
          : { visibility: 'hidden' };
      }
    },

    methods: {
      click() {
        window.scroll(0, 0);
      }
    },

    mounted() {
      timer = setInterval(() => {
        this.clientHeight = document.body.clientHeight;
        this.scrollTop = document.body.scrollTop;

        this.show = this.scrollTop > this.clientHeight * 0.8;
      }, 1000);
    },

    beforeDestroy() {
      clearInterval(timer);
    }
  }
</script>

<style>
  .cdn-backtop {
    text-align: center;
    position: fixed;
    z-index: 10;
    right: 20px;
    bottom: 50px;
  }
  .cdn-backtop i {
    margin: 0;
  }
</style>