import Vue from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import store from './store/index.js'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import moment from 'moment';
import VueMoment from 'vue-moment';
import VueSession from 'vue-session';

import CategoryPosts from './components/CategoryPosts';
import User from './components/User';
import Gag from './components/Gag';

Vue.config.productionTip = false
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VueMoment, { moment });
Vue.use(VueSession, {persist: true});

const routes = [
  { path: '/u/:username', component: User},
  { path: '/gag/:posthash', component: Gag},
  { path: '*', redirect: '/hot'},
  { path: '/:category',
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
