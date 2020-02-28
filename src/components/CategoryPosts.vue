<template>
    <div class="page">
        <div class="main-wrap">
            <div class="profile">
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
                            <router-link to="/funny" class="selected">Hot</router-link>
                        </li>
                        <li>
                            <router-link to="/funny/fresh" class="">Fresh</router-link>
                        </li>
                    </ul>
                </div>
            </div> 
            <section id="list-view-2">
                <div id="stream-0" class="list-stream" style="min-height: 0px;">
                    <div>
                        <article id="jsid-post">
                            <header>
                                <div class="post-section">
                                    <a target="_blank" href="https://9gag.com/funny?ref=post-section" class="icon">
                                        <picture>
                                            <source srcset="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100wp.webp"
                                                type="image/webp">
                                            <img src="https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557376304.186_U5U7u5_100x100.jpg" loading="lazy">
                                        </picture>
                                    </a> 
                                    <p class="message">
                                        <a target="_blank" href="https://9gag.com/funny?ref=post-section" class="section">
                                            Funny
                                        </a>
                                          · 47m <!---->
                                    </p>
                                </div>
                                <a data-evt="PostList,TapPost,Funny-Hot,,PostTitle" data-entry-id="aBgbnjQ" data-position="1" 
                                track="post,v,,,d,aBgbnjQ,l" href="/gag/aBgbnjQ" target="_blank" class="badge-evt badge-track">
                                    <h1>So yeah, we have that too I guess</h1>
                                </a>
                            </header>
                            <div class="post-container">
                                <div>
                                    <div class="post-container">
                                        <a data-evt="PostList,TapPost,Funny-Hot,,PostImage" data-entry-id="aBgbnjQ" 
                                        data-position="1" href="/gag/aBgbnjQ" target="_blank" class="badge-evt badge-track" 
                                        style="min-height: 979.348px;">
                                            <picture>
                                                <source srcset="https://img-9gag-fun.9cache.com/photo/aBgbnjQ_460swp.webp" type="image/webp">
                                                    <img src="https://img-9gag-fun.9cache.com/photo/aBgbnjQ_460s.jpg"
                                                    alt="So yeah, we have that too I guess" style="min-height: 979.348px;">
                                            </picture>
                                        </a> <!---->
                                    </div>
                                </div>
                                <div class="post-text-container">

                                </div>
                            </div>
                            <p class="post-meta">
                                <a data-evt="PostList,TapPost,Funny-Hot,,Point" data-entry-id="aBgbnjQ" data-position="1" 
                                href="/gag/aBgbnjQ" target="_blank" class="point badge-evt">
                                    • points
                                </a> ·
                                <a data-evt="PostList,TapPost,Funny-Hot,,CommentCountText" data-entry-id="aBgbnjQ" data-position="1"
                                href="/gag/aBgbnjQ#comment" target="_blank" class="comment badge-evt">
                                48 comments
                                </a>
                            </p>
                            <div class="post-afterbar-a in-list-view">
                                <ul class="btn-vote left">
                                    <li>
                                        <a href="javascript:void(0);" rel="nofollow" class="up">
                                            <span>UP</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" rel="nofollow" class="down">
                                            <span>DOWN</span>
                                        </a>
                                    </li>
                                </ul>
                                <ul class="btn-vote left">
                                    <li>
                                        <a data-evt="PostList,TapPost,Funny-Hot,,Comment" data-entry-id="aBgbnjQ" 
                                        data-position="1" target="_blank" href="/gag/aBgbnjQ#comment" class=" comment badge-evt">
                                            Comment
                                        </a>
                                    </li>
                                </ul>
                                <div>
                                    <ul class="btn-vote left">
                                        <a href="javascript:void(0);" class="more">
                                            More
                                        </a>
                                    </ul>
                                </div> 
                                <div class="clearfix">
                                </div>
                            </div>
                        </article>
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

    Vue.prototype.$http = axios;
    Vue.use(Vuex);
    export default {
        name: 'CategoryPosts',
        data() {
            return {
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
                }).catch((error) => {
                    console.log(error);
                    window.location.href="/";
                });
            },
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
section#list-view-2 .list-stream:first-child article:first-child {
    border: 0;
    padding: 0;
}
section#list-view-2 article {
    margin-bottom: 24px;
    border-top: 1px solid rgba(0,0,0,.1);
    padding: 20px 0 0;
    box-sizing: border-box;
}
section#list-view-2 header {
    margin-bottom: 8px;
    position: relative;
}
section#list-view-2 .post-section {
    height: 20px;
    color: #999;
    font-size: 12px;
    margin-bottom: 8px;
}
section#list-view-2 .post-section .icon {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    border-radius: 2px;
    background-color: #f4f4f4;
    margin-right: 4px;
    overflow: hidden;
}
section#list-view-2 header a {
    cursor: pointer;
    color: #000;
}
section#list-view-2 .post-section .icon img {
    display: block;
    width: 100%;
}
section#list-view-2 .post-section .message {
    display: inline-block;
    vertical-align: middle;
    line-height: 20px;
}
section#list-view-2 .post-section .message a {
    color: #999;
}
section#list-view-2 h1 {
    word-wrap: break-word;
    font-size: 20px;
    color: #000;
}
section#list-view-2 .post-container {
    width: 500px;
    position: relative;
    margin-bottom: 8px;
}
section#list-view-2 .post-container a {
    display: block;
}
section#list-view-2 .post-container a img {
    display: block;
    width: 500px;
    border: 0;
}
section#list-view-2 .post-text-container {
    margin: 8px 0 0;
}
.post-text-container {
    font-size: 16px;
    margin: 16px 0;
    line-height: 24px;
}
section#list-view-2 p.post-meta {
    color: #999;
    margin: 0 0 12px;
}
.post-afterbar-a.in-list-view {
    width: 500px;
}
.post-afterbar-a {
    position: relative;
}
.left {
    float: left!important;
}
.btn-vote {
    overflow: hidden;
}
.btn-vote li {
    margin: 0 8px 0 0;
    float: left;
    list-style: none;
}
.btn-vote a {
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
    width: 44px;
    height: 34px;
    display: block;
    text-indent: -999px;
    position: relative;
}
.clearfix {
    clear: both;
}
article {
    display: block;
}
</style>