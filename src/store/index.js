import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);
const BaseURI = "http://localhost:80/9gag-api/";


export default new Vuex.Store({
    state: {
        categories: {},
    },

    getters : {

    },

    mutations: {
        FETCH_CATEGORIES(state, categories){
            state.categories = categories;
        }
    },

    actions: {
        fetch_categories({commit}){
            Vue.http.get(BaseURI.concat("getCategories.php"), { crossdomain: true})
            .then((result) => {
                console.log(result.data);
                commit("FETCH_CATEGORIES", result.data);
            })
        },
    },
});