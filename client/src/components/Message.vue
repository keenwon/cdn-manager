<template>
  <div class="ui info message cdn-message">
    <i class="close icon"></i>
    <div class="header">提示</div>
    <p>这里是提示信息</p>
  </div>
</template>

<style>
  .cdn-message.ui.message {
    width: 400px;
    max-height: 92px;
    overflow-x: hidden;
    overflow-y: scroll;
    position: fixed;
    bottom: 30px;
    right: 30px;
  }
</style>