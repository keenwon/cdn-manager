<template>
  <div id="app">
    <comHeader></comHeader>
    <comWorkspace></comWorkspace>
    <comMessage></comMessage>
  </div>
</template>

<script>
  import comHeader from './components/Head';
  import comWorkspace from './components/Workspace';
  import comMessage from './components/Message';

  export default {
    name: 'app',
    components: {
      comHeader,
      comWorkspace,
      comMessage
    }
  }
</script>