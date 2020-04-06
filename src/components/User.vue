<template>
    <div class="page">
    <div class="main-wrap">
        <div class="profile">
            <section class="profile-header">
                <div class="img-container round"><img :src="profile.picture" alt="Profile Pic"></div>
                <header>
                    <h2>
                    {{ profile.name }}
                    <!---->
                    <!----></h2>
                    <p>
                        @{{profile.username}}
                    </p>
                </header>
            </section>
            <section class="profile-about">My Funny Collection</section>
            <div class="tab-bar">
                <ul class="menu">
                    <li><a href="javascript:void(0);" @click="changeSort('home')" v-bind:class="{selected : (sort=='home')}">
                        Home
                    </a></li>
                    <li><a href="javascript:void(0);" @click="changeSort('posts')" v-bind:class="{selected : (sort=='posts')}">
                        Posts
                    </a></li>
                    <li><a href="javascript:void(0);" @click="changeSort('comments')" v-bind:class="{selected : (sort=='comments')}">
                        Comments
                    </a></li>
                    <!---->
                </ul>
                <div class="clearfix"></div>
                <div class="popup-menu profile-more hide">
                    <ul>
                        <li><a href="javascript:void(0);">Report</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <!---->
        <section id="list-view-2">
            <div id="stream-0" class="list-stream" style="min-height: 0px;">
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
    name: 'User',
    components: {
            Post,
    },
    data() {
        return {
            sort: 'home',
            posts: {},
            profile: {},
        };
    },
    methods: {
        changeSort(_sort){
            this.sort = _sort;
        },
    },
    created() {
        let formData = new FormData();
        formData.append('username', this.$route.params.username);
        Vue.http.post(this.$store.state.basicURL.concat("getProfile.php"), formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    this.profile = (result.data[0]);
                    console.log(this.profile);
                }).catch((error) => {
                    console.log(error);
                    //window.location.href="/";
                });
    },
}
</script>
<style>
.profile-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}
.profile-header .img-container.round {
    border-radius: 50%;
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
.profile-header .img-container img {
    display: block;
    width: 100%;
}
.profile-header header h2 {
    font-size: 24px;
    line-height: 28px;
}
.profile-header header p {
    color: #999;
}
.profile-about, .profile .tab-bar {
    margin-bottom: 12px;
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
</style>