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
    <comBackTop></comBackTop>
    <comFoot></comFoot>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { MESSAGE_HIDE } from './store/actionTypes';

  import comHeader from './components/Head';
  import comFoot from './components/Foot';
  import comMessage from './components/Message';
  import comBackTop from './components/BackTop';

  export default {
    name: 'app',
    components: {
      comHeader,
      comFoot,
      comMessage,
      comBackTop
    },
    computed: {
      ...mapState({
        message: state => state.message
      })
    },
    methods: {
      ...mapActions({
        hideMessage: MESSAGE_HIDE
      })
    }
  }
</script>