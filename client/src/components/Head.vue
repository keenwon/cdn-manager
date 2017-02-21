<template>
  <div class="ui attached stackable menu cdn-head">
    <div class="ui container">
      <div class="item">
        <h2>CDN管理工具</h2>
      </div>
      <router-link to="/" class="item" active-class="active" exact>
        <i class="recycle icon"></i>
        缓存清理
      </router-link>
      <router-link to="/about" class="item" active-class="active" exact>
        <i class="help circle icon"></i>
        关于
      </router-link>
    </div>
  </div>
</template>

<style>
  .ui.attached.menu.cdn-head {
    margin-bottom: 2em;
  }
</style>