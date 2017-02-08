<template>
  <div class="ui container">
    <div class="ui info message" style="margin-top: 2em;">
      <div class="header">操作说明：</div>
      <ul class="list">
        <li>一行填写一个url，单次最多20条。</li>
        <li>url必须代表一个文件，不可以按目录清理。</li>
      </ul>
    </div>
    <div class="ui form">
      <div class="field">
        <label>待清理的urls:</label>
        <textarea></textarea>
      </div>
      <div class="ui primary button" @click="showSuccessMessage('成功')">
        <i class="icon send"></i>
        Submit
      </div>
      <div class="ui button" @click="showFailMessage('失败')">
        <i class="icon trash"></i>
        Reset
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    methods: {
      ...mapActions([
        'showSuccessMessage',
        'showFailMessage'
      ])
    }
  }
</script>