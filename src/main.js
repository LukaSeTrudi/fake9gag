import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store/index.js'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import CategoryPosts from './components/CategoryPosts';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);

const routes = [
  { path: '/user/:username'},
  { path: '/gag/:posthash'},
  { path: '/'},
  { path: '/Hot'},
  { path: '/Trending'},
  { path: '/Fresh'},
  { path: '/:category', 
    children: [
      { path: ''},
      { path: '/Hot'},
      { path: '/Fresh' }
    ],
    component: CategoryPosts,
  },
];
const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
