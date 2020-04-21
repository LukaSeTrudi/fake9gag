import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.prototype.$http = axios;
Vue.use(Vuex);
const BaseURI = "http://localhost:80/9gag-api/9GagAPI/";


let store = new Vuex.Store({
    state: {
        basicURL: BaseURI,
        user_id: null,
        user_picture: null,
        username: null,
        user_name: null,
        user_email: null,
        user_gender: null,
        user_bday: null,
        user_desc: null,
        categories: {},
        category_urls: [],
        dark_mode: false,
        loginError: '',
        fileUploadError: '',
        registerError: '',
        openedModal: 'none',
    },

    getters : {
        isLoggedIn:  function(){
            return store.state.user_id > 0;
        },
        getUserId: function(){
            return store.state.user_id;
        }
    },

    mutations: {
        CHANGE_MODAL(state, _modal){
            state.openedModal = _modal;
        },
        FETCH_CATEGORIES(state, categories){
            state.categories = categories;
            for(let index in categories){
                state.category_urls.push(categories[index].url);
            }
        },
        UPDATE_ID(_state, user_data){
            if(!store._vm.$session.exists()) store._vm.$session.start();
            store._vm.$session.set('user_id', user_data.id);
            Vue.http.headers.common['Authorization'] = 'Bearer ' + user_data.id;
            window.location.reload(0);
        },
        SET_DEFAULT(state){
            state.user_id= null;
            state.user_picture= "https://accounts-cdn.9gag.com/media/default-avatar/1_0_100_v0.jpg";
            state.username= null;
            state.user_name= null;
            state.user_email= null;
        },
        SET_SESSION(state, data){
            state.user_id= data.id;
            state.user_picture= data.picture;
            state.username= data.username;
            state.user_name= data.name;
            state.user_email= data.email;
            state.user_gender =data.gender;
            state.user_bday = data.bday;
            state.user_desc = data.description;
        },
        SET_DARK(state, data){
            state.dark_mode = data;
            if(!store._vm.$session.exists()){
                store._vm.$session.start();
            }
            store._vm.$session.set('dark_mode', data);
            if(data){
                document.body.style.backgroundColor = "black";
            } else {
                document.body.style.backgroundColor = "white";
            }
        },
        RELOAD(){
            window.location.reload();
        }
    },

    actions: {
        change_modal({commit}, _modal){
            commit("CHANGE_MODAL", _modal);
        },
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
                console.log(result);
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
        login({commit, state}, data){
            let formData = new FormData();
            formData.append('email', data._email);
            formData.append('pass', data._pass);
            Vue.http.post(BaseURI.concat("login.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((result) => {
                console.log(result.body);
                if(result.data == "Invalid Password" ||result.data == "Invalid Email"){
                    state.loginError = result.data;
                    return;
                }
                commit("UPDATE_ID", result.data);
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
        upload_file({state}, data){
            let formData = new FormData();
            formData.append('file', data.file);
            formData.append('user_id', state.user_id);
            formData.append('description', data.description);
            formData.append('sensitive', data.isSensitive);
            formData.append('category', data.selectedCategory);
            Vue.http.post(BaseURI.concat("uploadFile.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((result) => {
               state.fileUploadError = result.data;
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
        getDataFromSession({commit}, data){
            let formData = new FormData();
            formData.append('id', data);
            Vue.http.post(BaseURI.concat("getDataFromId.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((result) => {
                commit("SET_SESSION", result.data);
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
        registerUser({commit}, data){
            let formData = new FormData();
            formData.append('full', data._fullname);
            formData.append('email', data._email);
            formData.append('pass', data._pass);
            Vue.http.post(BaseURI.concat("registerUser.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then((result) => {
                
                console.log(result.body);
                if(result.data == ""){
                    return;
                }
                commit("UPDATE_ID", result.data);
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
        setDark({commit},data){
            commit("SET_DARK", data);
        },
        checkSession({commit}){
            if(store._vm.$session.exists()){
                if(store.state.user_id == null){
                    store.dispatch("getDataFromSession",(store._vm.$session.get("user_id")));
                }
                if(store._vm.$session.has("dark_mode")){
                    this.state.dark_mode=store._vm.$session.get("dark_mode");
                }
            } else if(!store._vm.$session.exists()) {
                commit("SET_DEFAULT");
            }
            if(this.state.dark_mode){
                document.body.style.backgroundColor = "black";
            } else {
                document.body.style.backgroundColor = "white";
            }
            
        },
        updateProfile({commit}, data){
            Vue.http.post(BaseURI.concat("updateProfile.php"), data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(() => {
                commit("RELOAD");
            })
            .catch((error) =>{
                console.log(error, "catch");
            });
        },
    },
});
export default store
