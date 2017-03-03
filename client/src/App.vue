<template>
  <div>
    <comHeader></comHeader>
    <router-view></router-view>
    <comBackTop></comBackTop>
    <comFoot></comFoot>
  </div>
</template>

<script>
  import comHeader from './components/Head';
  import comFoot from './components/Foot';
  import comBackTop from './components/BackTop';

  export default {
    name: 'app',
    components: {
      comHeader,
      comFoot,
      comBackTop
    }
  }
</script>