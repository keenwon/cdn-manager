import Vue from 'vue';
import VueRouter from 'vue-router';
import { sync } from 'vuex-router-sync';
import store from './store';

import App from './App';
import WorkspaceView from './views/Workspace';
import AboutView from './views/About';

Vue.use(VueRouter);

const originalTitle = document.title;

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'workspace',
      meta: {
        title: '缓存清理'
      },
      component: WorkspaceView
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: '关于'
      },
      component: AboutView
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

// update document title
router.afterEach(route => {
  document.title = route.meta.title
    ? `${route.meta.title} | ${originalTitle}`
    : originalTitle;
});

sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
