<template>
    <article>
        <header>
            <div class="post-section">
                <router-link target="_blank" :to="category_url" class="icon">
                    <picture>
                        <img :src="category_icon" loading="lazy">
                    </picture>
                </router-link> 
                <p class="message">
                    <router-link target="_blank" :to="category_url" class="section">
                        {{ category_title }}
                    </router-link>
                      · {{ calculateTime(post_date) }} <!---->
                </p>
            </div>
            <router-link :to="toGag(post_hash)" target="_blank" class="badge-evt badge-track">
                <h1>{{ post_desc }}</h1>
            </router-link>
        </header>
        <div class="post-container">
            <div>
                <div class="post-container">
                    <router-link :to="toGag(post_hash)" target="_blank" class="badge-evt badge-track">
                        <picture>
                        <source :srcset="getFullLink(post_url)"
                        type="image/webp">
                                <img :src="getFullLink(post_url)"
                                :alt="post_desc">
                        </picture>
                    </router-link> <!---->
                </div>
            </div>
            <div class="post-text-container">

            </div>
        </div>
        <p class="post-meta">
            <router-link :to="toGag(post_hash)" target="_blank" class="point badge-evt">
                {{ calcNumbrs(post_likes, 'points') }}
            </router-link>
            <router-link :to="toGag(post_hash)" target="_blank" class="comment badge-evt">
                {{ calcNumbrs(post_comments, 'comments') }}
            </router-link>
        </p>
        <div class="post-afterbar-a in-list-view">
            <ul class="btn-vote left">
                <li>
                    <a href="javascript:void(0);" rel="nofollow" :class="{ up : true, active : user_liked == 1}" @click="updateLike(1)">
                        <span>UP</span>
                    </a>
                </li>
                <li>
                    <a href="javascript:void(0);" rel="nofollow" :class="{ down : true, active: user_liked == -1}" @click="updateLike(-1)">
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
</template>

<script>
    import moment from 'moment';
    
    import Vue from 'vue'
    import Vuex from 'vuex'
    import axios from 'axios'

    Vue.prototype.$http = axios;
    Vue.use(Vuex);
    export default {
        name: 'Post',
        data() {
            return {
                category_title: this.c_title,
                category_url: this.c_url,
                category_icon: this.c_icon,
                post_desc: this.p_desc,
                post_url: this.p_url,
                post_id: this.p_id,
                post_hash: this.p_hash,
                post_date: this.p_date,
                post_likes: this.num_likes,
                post_comments: this.num_comments,
                user_liked: this.init_liked,
            }
        },
        props: [
            'c_title',
            'c_url',
            'c_icon',
            'p_desc',
            'p_url',
            'p_id',
            'p_hash',
            'p_date',
            'num_likes',
            'num_comments',
            'init_liked',
        ],
        methods: {
            calculateTime(init_date) {
                var now = moment();
                var start = init_date;

                const duration = moment.duration(now.diff(start));
                //const timespan = duration.get("hours").toString().padStart(2, '0') +":"+ duration.get("minutes").toString().padStart(2, '0') +":"+ duration.get("seconds").toString().padStart(2, '0');

                if(duration._data.months > 0)
                    return duration._data.months + " Months";
                else if (duration._data.days > 0)
                    return duration._data.days + "d";
                else if(duration._data.hours > 0)
                    return duration._data.hours + "h";
                else if(duration._data.minutes > 0)
                    return duration._data.minutes + "m";
                else if(duration._data.seconds > 0)
                    return "Just now";
                return "";
            },
            toGag(gag){
                return '/gag/' + gag;
            },
            getFullLink(link) {
                return this.$store.state.basicURL + link;
            },
            calcNumbrs(points, suff) {
                if(points == null) {
                    return '· ' + suff;
                } else return points + ' ' + suff;
            },
            updateLike(point){
                if(this.$store.state.user_id == null){
                    this.$store.state.openedModal = 'loginModal';
                    return;
                }
                let formData = new FormData();
                formData.append('user_id', this.$store.state.user_id);
                formData.append('post_id', this.post_id);
                formData.append('points', point);
                Vue.http.post(this.$store.state.basicURL.concat("updateLike.php"), formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    this.user_liked = result.data;
                    this.getLikesAndComments();
                }).catch((error) => {
                    console.log(error);
                });
            },
            getLikesAndComments(){
                let formData = new FormData();
                formData.append('post_id', this.post_id);
                Vue.http.post(this.$store.state.basicURL.concat("getLikes.php"), formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then((result) => {
                    this.post_likes = result.data[0];
                    this.post_comments = result.data[1];
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>

<style>

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
.btn-vote .up:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -120px 0 no-repeat;
    background-size: 510px 120px;
}
.btn-vote .down:after, .btn-vote .up:after {
    position: absolute;
    content: " ";
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    margin-top: -15px;
    margin-left: -15px;
}
.btn-vote .down:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -150px 0 no-repeat;
    background-size: 510px 120px;
}
.btn-vote .comment:after, .btn-vote .more:after {
    position: absolute;
    content: " ";
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    margin-top: -15px;
    margin-left: -15px;
}
.btn-vote .comment:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -180px 0 no-repeat;
    background-size: 510px 120px;
}
.btn-vote .more:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -300px 0 no-repeat;
    background-size: 510px 120px;
}
.btn-vote .up.active:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -120px -90px no-repeat;
    background-size: 510px 120px;
}
.btn-vote .down.active:after, .btn-vote .up.active:after {
    position: absolute;
    content: " ";
    width: 30px;
    height: 30px;
    left: 50%;
    top: 50%;
    margin-top: -15px;
    margin-left: -15px;
}
.btn-vote .down.active:after {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -150px -90px no-repeat;
    background-size: 510px 120px;
}
</style>