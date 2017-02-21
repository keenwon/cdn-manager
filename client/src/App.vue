<template>
  <div id="app">
    <comHeader></comHeader>
    <router-view></router-view>
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
  import comMessage from './components/Message';

  export default {
    name: 'app',
    components: {
      comHeader,
      comFoot,
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
      ])
    }
  }
</script>