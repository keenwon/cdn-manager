<template>
  <div id="app">
    <comHeader></comHeader>
    <comWorkspace></comWorkspace>
  </div>
</template>

<script>
  import comHeader from './components/Head';
  import comWorkspace from './components/Workspace';

  export default {
    name: 'app',
    components: {
      comHeader,
      comWorkspace
    }
  }
</script>