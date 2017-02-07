<template>
  <div id="app">
    <comHeader></comHeader>
    <comWorkspace></comWorkspace>
    <comMessage></comMessage>
    <comFoot></comFoot>
  </div>
</template>

<script>
  import comHeader from './components/Head';
  import comFoot from './components/Foot';
  import comWorkspace from './components/Workspace';
  import comMessage from './components/Message';

  export default {
    name: 'app',
    components: {
      comHeader,
      comFoot,
      comWorkspace,
      comMessage
    }
  }
</script>