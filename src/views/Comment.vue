<template>
    <div>
        <div class="comment-entry">
            <div class="avatar">
                <div class="image-container">
                    <router-link :to="getUserLink(user)" target="_blank"><img :src="picture"></router-link>
                </div>
            </div>
            <div class="payload">
                <div class="info">
                    <div class="info-container"><router-link :to="getUserLink(user)" target="_blank" class="username">{{user}}</router-link>
                        <!---->
                        <!---->
                        <!----><span class="meta"><!----> <span><span class="points">{{this.reply_likes}}</span> <span> · </span></span> <span class="time"><a href="javascript:void(0)" target="_blank" class="comment-permalink"></a></span>{{calculateTime(date)}}</span>
                    </div>
                </div>
                <div class="content">{{comment}} </div>
                <!---->
                <div class="action"><span><a href="javascript:void(0);" class="reply">Reply</a></span>
                    <div class="vote-buttons"><a href="javascript:void(0);" class=""><span class="icn-up"></span></a> <span class="seperator"></span> <a href="javascript:void(0);" class=""><span class="icn-down"></span></a></div>
                    <!---->
                    <!---->
                </div>
            </div>
            <div class="extra-menu"><a href="javascript:void(0);" class="menu-trigger"><span class="drop"></span></a>
                <div class="comment-pop-menu hide">
                    <ul>
                        <li><a href="javascript:void(0);">Follow Comment</a></li>
                        <!---->
                        <!---->
                        <li><a href="javascript:void(0);">Report comment</a></li>
                        <li><a href="javascript:void(0);">I just don't like it</a></li>
                    </ul>
                </div>
            </div>
            <div class="clearfix"></div>
        </div>
        <!---->
        <!----><a href="javascript:void(0);" v-if="this.replies > 0" class="collapsed-comment"><span>View {{this.replyes}} replies</span> <!----></a>
        <div></div>
    </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.prototype.$http = axios;
Vue.use(Vuex);

export default {
    name: 'Comment',
    data() {
        return {
            comment_id: this.id,
            comment: this._comment, 
            picture: this._picture,
            user: this._user,
            date: this._date,
            replyes: null,
            reply_likes: null,
            user_liked: null,
        }
    },
    methods: {
        created() {
            this.getLikesAndComments();
        },
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
        getLikesAndComments(){
            let formData = new FormData();
            formData.append('id', this.comment_id);
            if(this.$session.get('user_id') > 0){
                formData.append('user_id', this.$session.get('user_id'));
            }
            Vue.http.post(this.$store.state.basicURL.concat("getCommentLikes.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                this.replyes = result.data[0];
                this.reply_likes = result.data[1];
                this.user_liked = result.data[2];
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    props: [
            '_id',
            '_comment',
            '_picture',
            '_user',
            '_date',
    ],
}
</script>

<style>

</style>