<template>
    <div class="page">
        <div class="main-wrap">
            <div class="profile" v-if="this.isCategory">
                <section class="profile-header">
                    <div class="img-container">
                        <picture>
                            <img :src="category_icon" width="80px">
                        </picture>
                    </div>
                    <header>
                        <h2>{{ category_title}}</h2>
                        <p>{{ category_desc }}</p>
                    </header>
                </section>
                <div class="tab-bar">
                    <ul class="menu">
                        <li>
                            <a href="javascript:void(0);" @click="changeSort('hot')"  v-bind:class="{ selected: (selected_sort == 'hot')}" >Hot</a>
                        </li>
                        <li>
                            <a href="javascript:void(0);" @click="changeSort('fresh')" v-bind:class="{ selected: (selected_sort == 'fresh')}"> Fresh</a>
                        </li>
                    </ul>
                </div>
            </div> 
            <section id="list-view-2">
                <div id="stream" class="list-stream" style="min-height: 0px;">
                    <div v-for="post in posts" :key="post.id">
                        <Post
                        :c_title = "post.title"
                        :c_url = "post.c_url"
                        :c_icon = "post.icon"
                        :p_desc = "post.description"
                        :p_url = "post.url"
                        :p_id = "post.id"
                        :p_hash = "post.post_hash"
                        :p_date = "post.date"
                        ></Post>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'
    import Post from '../views/Post.vue';

    Vue.prototype.$http = axios;
    Vue.use(Vuex);
    export default {
        name: 'CategoryPosts',
        components: {
            Post,
        },
        data() {
            return {
                selected_sort: 'hot',
                isCategory: false,
                category_title: '',
                category_url: '',
                category_icon: '',
                category_desc: '',
                posts: {},
            };
        },
        watch: {
            '$route' (to) {
                this.updateEverything(to);
            },
        },
        methods: {
            updateEverything(to) {
                let formData = new FormData();
                this.selected_sort= 'hot';
                this.category_title= '';
                this.category_url= '';
                this.category_icon= '';
                this.category_desc= '';
                this.isCategory=false;
                if(to.params.category == 'hot' || 
                    to.params.category == 'trending' ||
                    to.params.category == 'fresh' ||
                    to.params.category == ''){
                    this.getPosts();
                    return;
                }
                if(!this.$store.state.category_urls.includes(to.params.category)){
                    this.$router.push('/');
                }
                formData.append('url', to.params.category);
                Vue.http.post(this.$store.state.basicURL.concat("getCategory.php"), formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    this.category_title = result.data[0].title;
                    this.category_url = result.data[0].url;
                    this.category_desc = result.data[0].description;
                    this.category_icon = result.data[0].icon;
                    this.isCategory = true;
                    this.getPosts();
                }).catch((error) => {
                    console.log(error);
                    //window.location.href="/";
                });
            },
            getPosts() {
                let formData = new FormData();
                if(this.isCategory){
                    formData.append('sort', this.selected_sort);
                } else {
                    formData.append('sortBy', true);
                }
                formData.append('user_id', this.$session.get('user_id'));
                formData.append('url', this.$route.params.category);
                Vue.http.post(this.$store.state.basicURL.concat("getPostsFromCategory.php"), formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    this.posts = result.data;
                }).catch((error) => {
                    console.log(error);
                });
            },
            changeSort(sort){
                this.selected_sort = sort;
                this.getPosts();
            }
        },
        created() {
            this.updateEverything(this.$route);
        }
    }
</script>
<style>
.main-wrap {
    float: left;
    width: 640px;
}
.page {
    width: 972px;
    padding-top: 24px;
    margin: 0 0 32px 224px;
}
.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}
.profile-header .img-container {
    width: 80px;
    height: 80px;
    background-color: rgba(0,0,0,.1);
    overflow: hidden;
    border-radius: 2px;
    margin-right: 16px;
    flex-shrink: 0;
}
.profile-header header h2 {
    font-size: 24px;
    line-height: 28px;
}
.profile-header header p {
    color: #999;
}
.profile .tab-bar {
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.1);
    position: relative;
    width: 100%;
    display: flex;
}
.profile-about, .profile .tab-bar {
    margin-bottom: 12px;
}
.profile .tab-bar>ul.menu {
    list-style-type: none;
    display: flex;
}
.profile .tab-bar ul.menu a.selected {
    color: #000;
    font-weight: 700;
    border-bottom: 2px solid #000;
}
.profile .tab-bar ul.menu a {
    color: #999;
    font-weight: 700;
    display: block;
    box-sizing: border-box;
    line-height: 20px;
    height: 40px;
    padding: 10px 16px;
}
section#list-view-2 .list-stream {
    margin-bottom: 24px;
}
</style>