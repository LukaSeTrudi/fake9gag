import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);
const BaseURI = "http://localhost:80/9gag-api/";


export default new Vuex.Store({
    state: {
        user_id: null,
        user_name: null,
        user_picture: null,
        user_email: null,
        categories: {},
    },

    getters : {

    },

    mutations: {
        FETCH_CATEGORIES(state, categories){
            state.categories = categories;
        },
        UPDATE_ID(state, user_data){
            state.user_id = user_data.id;
            state.user_name = user_data.name;
            state.user_email = user_data.email;
            state.user_picture = user_data.picture;
        }
    },

    actions: {
        fetch_categories({commit}){
            Vue.http.get(BaseURI.concat("getCategories.php"))
            .then((result) => {
                commit("FETCH_CATEGORIES", result.data);
            }).catch((error) => {
                console.log(error);
            });
        },
        login_external({commit}, user){
            Vue.http.post(BaseURI.concat("getIdFromExternal.php"), {
                external: user.external,
                user_id: user.personalID,
                user_name: user.name,
                user_picture: user.picture,
                user_email: user.email,
            })
            .then((result) => {
                commit("UPDATE_ID", result.data);
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
    },
});