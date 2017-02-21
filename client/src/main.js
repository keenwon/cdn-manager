import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from './store';
import App from './App';
import WorkspaceView from './views/Workspace';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: WorkspaceView
    },
    {
      path: '*',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return {
      x: 0,
      y: 0
    };
  }
});

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
