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

  /**
   * 返回顶部
   * @param duration 动画时长
   */
  const backTop = (duration = 350) => {
    // 单次执行时间
    const frame = 16.66667;

    // 单次步长
    let step = document.body.scrollTop / (duration / frame);

    const run = () => {
      if (document.body.scrollTop <= 0) {
        return;
      }

      setTimeout(() => {
        document.body.scrollTop -= step;
        run();
      }, frame);
    };

    run();
  };

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
        backTop(150);
      }
    },

    mounted() {
      timer = setInterval(() => {
        this.clientHeight = document.body.clientHeight;
        this.scrollTop = document.body.scrollTop;

        this.show = this.scrollTop > this.clientHeight * 0.8;
      }, 100);
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
    right: 30px;
    bottom: 50px;
  }
  .cdn-backtop i {
    margin: 0;
  }
</style>