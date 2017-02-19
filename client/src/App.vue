<template>
  <div id="app">
    <comHeader></comHeader>
    <comWorkspace @change="editorUpdate"></comWorkspace>
    <comMessage
      :active="message.active"
      :text="message.text"
      :class-name="message.className"
      :hideFn="hideMessage">
    </comMessage>
    <comFoot></comFoot>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

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
    },
    computed: {
      ...mapState({
        message: state => state.message
      })
    },
    methods: {
      ...mapActions([
        'hideMessage'
      ]),
      editorUpdate(data) {
        console.log(data); // eslint-disable-line
      }
    }
  }
</script>