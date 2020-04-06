<template>
<div class="page post-page">
<div class="main-wrap">
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
    <section class="post-comment">
        <div class="CS3">
            <div class="tab-bar clearfix">
                <div class="tab-bar-right">
                    <ul class="tab">
                        <li class="active"><a href="javascript:void(0);">Hot</a></li>
                        <li class=""><a href="javascript:void(0);">Fresh</a></li>
                    </ul>
                </div>
            </div>
            <div class="comment-embed">
                <div class="comment-box first">
                    <div class="avatar">
                        <div class="image-container">
                            <router-link :to="getUserLink(null)" target="_blank"><img :src="getUserPic(null)"></router-link>
                        </div>
                    </div>
                    <div class="payload">
                        <div class="textarea-container">
                            <div>
                                <textarea placeholder="Write comments..." class="post-text-area focus" v-model="comment"></textarea>
                            </div>
                        </div>
                        <div class="action">
                            <div class="rhs">
                                <a href="javascript:void(0);" class="cancel-input" @click="comment = ''">Cancel</a>
                                <a href="javascript:void(0);" class="cmnt-btn size-30 submit-comment" @click="addComment(null)">Post</a></div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
                <div>
                </div>
                <div v-for="comment_ in comments" :key="comment_.id">
                    <Comment
                    :_id="comment_.id"
                    :_comment="comment_.reply"
                    :_picture = "comment_.picture"
                    :_user = "comment_.username"
                    :_date ="comment_.date"
                    >
                    </Comment>    
                </div>
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
import Post from '../views/Post.vue'
import Comment from '../views/Comment.vue'

Vue.prototype.$http = axios;
Vue.use(Vuex);

export default {
    name: 'Gag',
    data(){
        return{
            posts: [],
            comments: [],
            comment: '',
        }
    },
    created(){
        this.getPost();
    },
    components: {
        Post,
        Comment,
    },
    methods: {
        getUserLink(username){
            if(username == null){
                return "/u/"+this.$store.state.username;
            }
            return "/u/"+username;
        },
        getUserPic(username){
            if(username == null){
                return this.$store.state.user_picture;
            }
        },
        addComment(top_id){
            let formData = new FormData();
            formData.append('user_id', this.$store.state.user_id);
            formData.append('post_id', this.posts[0].id);
            formData.append('comment', this.comment);
            if(top_id != null){
                formData.append('top_reply', top_id);
            }
            Vue.http.post(this.$store.state.basicURL.concat("addComment.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                console.log(result);
                this.comment = "";
            }).catch((error) => {
                console.log(error);
            });
        },
        getPost() {
            let formData = new FormData();
            formData.append('post', this.$route.params.posthash);
            Vue.http.post(this.$store.state.basicURL.concat("getPost.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                this.posts = result.data;
                this.getComments();
            }).catch((error) => {
                console.log(error);
            });
        },
        getComments() {
            let formData = new FormData();
            formData.append('post_id', this.posts[0].id);
            Vue.http.post(this.$store.state.basicURL.concat("getComments.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                this.comments = result.data;
                console.log(this.comments);
            }).catch((error) => {
                console.log(error);
            });
        }
    },
}
</script>

<style>
section.post-comment {
    padding-bottom: 30px;
    margin-top: 20px;
}
.CS3 {
    font: 13px Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: none;
}
.CS3 .tab-bar {
    height: 43px;
    border-bottom: 1px solid #ddd;
}
.CS3 .tab-bar-right {
    float: right;
    cursor: pointer;
}
.CS3 .tab-bar ul.tab {
    list-style-type: none;
    overflow: hidden;
}
.CS3 .tab-bar-right .tab {
    float: left;
}
.CS3 .tab-bar .tab li {
    float: left;
}
.CS3 .tab-bar ul.tab a {
    display: block;
    font-size: 13px;
    font-weight: 700;
    color: #999;
    line-height: 20px;
    padding: 12px;
}
.CS3 .comment-embed {
    margin-top: 10px;
    min-height: 300px;
}
.CS3 .comment-box.first {
    border-top: none;
    padding-top: 10px;
}
.CS3 .comment-box .avatar {
    float: left;
    overflow: hidden;
}
.CS3 .comment-box .avatar .image-container {
    width: 50px;
    height: 50px;
    overflow: hidden;
    background-color: #f4f4f4;
    border-radius: 50%;
}
.CS3 .comment-box .payload {
    margin-left: 60px;
}
.CS3 .comment-box.indent-1 .payload .textarea-container textarea, .CS3 .comment-box .payload .textarea-container textarea.focus {
    height: 50px;
    cursor: text;
    border-bottom: none;
}
.CS3 .comment-box .payload input[type=url], .CS3 .comment-box .payload textarea {
    width: 100%;
    margin: 0;
    height: 50px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    border-radius: 0;
    line-height: 1.6em;
    cursor: pointer;
}
.CS3 .comment-box .action {
    height: auto;
}
.CS3 .comment-box .action {
    height: 30px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-top-color: #eee;
}
.CS3 .comment-box .action .lhs {
    float: left;
}
.CS3 .comment-box .action .rhs {
    float: right;
}
.CS3 .comment-box .action .cancel-input {
    float: left;
    height: 30px;
    line-height: 31px;
    color: #999;
    margin-left: 8px;
}
.CS3 .comment-box .action .submit-comment, .CS3 .comment-box .action .submit-reaction {
    float: left;
}
.CS3 .comment-box .action .cmnt-btn {
    margin-left: 10px;
}
.CS3 a.cmnt-btn.size-30 {
    font-size: 12px;
    padding: 4px 15px;
}
.CS3 a.cmnt-btn {
    color: #fff;
    background-color: #09f;
    padding: 9px 20px;
    border: 1px solid #09f;
    border-radius: 3px;
    font: 700 14px/20px Helvetica Neue,Arial,Helvetica,Geneva,sans-serif;
    cursor: pointer;
    text-decoration: none;
    display: inline-block;
    text-align: center;
    -webkit-appearance: none;
}
.CS3 .comment-box .avatar {
    float: left;
    overflow: hidden;
}
.CS3 .comment-box .avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
}
.CS3 .comment-entry {
    position: relative;
    padding-top: 8px;
}
.CS3 .comment-entry .avatar {
    float: left;
    width: 50px;
    height: 50px;
    overflow: hidden;
}
.CS3 .comment-entry .avatar .image-container {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    border-radius: 50%;
    overflow: hidden;
}
.CS3 .comment-entry .avatar img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
}
.CS3 .comment-entry .payload {
    margin-left: 60px;
    padding-bottom: 8px;
}
.CS3 .comment-entry .payload .info {
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    color: #999;
    margin-bottom: 4px;
}
.CS3 .comment-entry .info .info-container {
    display: inline-flex;
    align-items: center;
}
.CS3 .comment-entry .info .badge, .CS3 .comment-entry .info .points, .CS3 .comment-entry .info .status, .CS3 .comment-entry .info .time, .CS3 .comment-entry .info .username {
    vertical-align: middle;
}
.CS3 .comment-entry .info .badge, .CS3 .comment-entry .info .points, .CS3 .comment-entry .info .status, .CS3 .comment-entry .info .time, .CS3 .comment-entry .info .username {
    vertical-align: middle;
}
.CS3 .comment-entry .info .meta {
    vertical-align: -3%;
}
.CS3 .comment-entry .info .badge, .CS3 .comment-entry .info .meta {
    margin-left: 4px;
}
.CS3 .comment-entry .info .points {
    color: #999;
}
.CS3 .comment-permalink {
    color: #999;
}
.CS3 .comment-entry .payload .content {
    word-break: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
}
.CS3 .comment-entry .payload .content {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 4px;
}
.CS3 .comment-entry .payload .action {
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    color: #999;
}
.CS3 .comment-entry .action .admin, .CS3 .comment-entry .action .delete, .CS3 .comment-entry .action .message, .CS3 .comment-entry .action .reply, .CS3 .comment-entry .action .vote-buttons {
    display: block;
    float: left;
    margin-right: 10px;
}
.CS3 .comment-entry .action a {
    color: #999;
    font-weight: 700;
}
.CS3 .comment-entry .action .admin, .CS3 .comment-entry .action .delete, .CS3 .comment-entry .action .message, .CS3 .comment-entry .action .reply, .CS3 .comment-entry .action .vote-buttons {
    display: block;
    float: left;
    margin-right: 10px;
}
.CS3 .comment-entry .action .vote-buttons .icn-down, .CS3 .comment-entry .action .vote-buttons .icn-up, .CS3 .comment-entry .action .vote-buttons a {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
}
.CS3 .comment-entry .action .vote-buttons a {
    line-height: 20px;
    text-indent: -9999px;
    position: relative;
    margin-right: 10px;
}
.CS3 .comment-entry .action .vote-buttons .icn-up {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/b1e59581a692207be03ac079fdd1f1f5c74ba5f6/static/dist/comment/img/comment-sprite.png) no-repeat 0 0;
}
.CS3 .comment-entry .action .vote-buttons .icn-down, .CS3 .comment-entry .action .vote-buttons .icn-up, .CS3 .comment-entry .action .vote-buttons a {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
}
.CS3 .comment-entry .action .seperator {
    display: none;
    float: left;
    width: 1px;
    background-color: #eee;
    height: 14px;
    margin: 3px 5px 0 7px;
}
.CS3 .comment-entry .action .vote-buttons .icn-down, .CS3 .comment-entry .action .vote-buttons .icn-up, .CS3 .comment-entry .action .vote-buttons a {
    width: 20px;
    height: 20px;
    display: block;
    float: left;
}
.CS3 .comment-entry .action .vote-buttons a {
    line-height: 20px;
    text-indent: -9999px;
    position: relative;
    margin-right: 10px;
}
.CS3 .comment-entry .action .vote-buttons .icn-down {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/b1e59581a692207be03ac079fdd1f1f5c74ba5f6/static/dist/comment/img/comment-sprite.png) no-repeat -20px 0;
}
.CS3 .comment-highlight {
    background-color: rgba(0,0,0,.03);
    transition: background-color .2s;
    cursor: pointer;
}
.CS3 .collapsed-comment {
    font-size: 14px;
    line-height: 24px;
    margin: 0;
    padding: 0 0 8px 60px;
    display: block;
    font-weight: 700;
    position: relative;
    color: #000;
}
.CS3 .comment-entry.indent-1 {
    padding-left: 20px;
    padding-top: 0;
    border-bottom: none;
}
.CS3 .comment-entry.indent-1 .avatar, .CS3 .comment-entry.indent-1 .avatar .image-container, .CS3 .comment-entry.indent-1 .avatar img {
    width: 30px;
    height: 30px;
}
.CS3 .comment-entry.indent-1 .payload {
    margin-left: 40px;
}
</style>