import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
//const BaseURI = "http://localhost:80/9gag-api/";


export default new Vuex.Store({
    state: {
        categories: [],
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
            Vue.$http.get("http://localhost:80/9gag-api/getCategories.php", { crossdomain: true})
            .then((result) => {
                commit("FETCH_CATEGORIES", result.body);
            })
        },
    },
});