<template>
    <div>
        <div :class="['comment-entry', indent]">
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
                        <!----><span class="meta"><!----> <span><span class="points">{{reply_likes}}</span> <span> · </span></span> <span class="time"><a href="javascript:void(0)" target="_blank" class="comment-permalink"></a></span>{{calculateTime(date)}}</span>
                    </div>
                </div>
                <div class="content">{{comment}} </div>
                <!---->
                <div class="action"><span v-if="this.current_indent < 1"><a href="javascript:void(0);" class="reply" @click="isReplying = !isReplying">Reply</a></span>
                    <div class="vote-buttons">
                        <a href="javascript:void(0);" :class="{ up: user_liked == 1 }" @click="updateComment(1)"><span class="icn-up"></span></a> 
                        <span class="seperator"></span>
                        <a href="javascript:void(0);" :class="{ down: user_liked == -1 }" @click="updateComment(-1)"><span class="icn-down"></span></a></div>
                    <!---->
                    <!---->
                </div>
            </div>
            <div class="extra-menu" v-if="user == this.$store.state.username"><a href="javascript:void(0);" class="menu-trigger" @click="extra_menu = !extra_menu"><span class="drop"></span></a>
                <div :class="{'comment-pop-menu' : true, 'hide' : !extra_menu}">
                    <ul>
                        <!--<li><a href="javascript:void(0);">Follow Comment</a></li>
                        <li><a href="javascript:void(0);">Report comment</a></li>
                        <li><a href="javascript:void(0);">I just don't like it</a></li>
                        -->
                        <li><a href="javascript:void(0);" @click="deleteComment()">Delete Comment</a></li>
                    </ul>
                </div>
            </div>
            <div class="clearfix"></div>
            <div class="comment-box first indent-1" v-if="isReplying">
                <div class="avatar">
                    <div class="image-container">
                        <router-link :to="getUserLink(null)" target="_blank"><img :src="getUserPic(null)"></router-link>
                    </div>
                </div>
                <div class="payload">
                    <div class="textarea-container">
                        <div>
                            <textarea placeholder="Write comments..." class="post-text-area focus" v-model="newComment"></textarea>
                        </div>
                    </div>
                    <div class="action">
                        <div class="rhs">
                            <a href="javascript:void(0);" class="cancel-input" @click="newComment = ''">Cancel</a>
                            <a href="javascript:void(0);" class="cmnt-btn size-30 submit-comment" @click="addComment(comment_id)">Post</a></div>
                    </div>
                </div>
                <div class="clearfix"></div>
            </div>
        </div>
        <!---->
        <!----><a href="javascript:void(0);" v-if="this.replyes > 0 && this.current_indent < 1" class="collapsed-comment" @click="getSubComments()"><span>{{subComments.length>0 ? 'Hide' : 'View'}} {{replyes}} replies</span> <!----></a>
                <div v-for="comment_ in subComments" :key="comment_.id">
                    <Comment
                    :_ind="current_indent+1"
                    :_id="comment_.id"
                    :_comment="comment_.reply"
                    :_picture = "comment_.picture"
                    :_user = "comment_.username"
                    :_date ="comment_.date"
                    :_postid = "comment_.post_id"
                    >
                    </Comment>    
                </div>
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
            current_indent : this._ind,
            comment_id: this._id,
            comment: this._comment, 
            post_id: this._postid,
            isReplying: false,
            newComment: '',
            picture: this._picture,
            user: this._user,
            date: this._date,
            replyes: 0,
            extra_menu: false,
            reply_likes: 0,
            user_liked: null,
            subComments: [],
        }
    },
    created() {
        this.getLikesAndComments();
    },
    computed: {
        indent(){
            return 'indent-'+this.current_indent;
        }
    },
    methods: {
        calcNumbrs(points, suff) {
                if(points == null) {
                    return '· ' + suff;
                } else return points + ' ' + suff;
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
            formData.append('comment_id', this.comment_id);
            if(this.$session.get('user_id') > 0){
                formData.append('user_id', this.$session.get('user_id'));
            }
            Vue.http.post(this.$store.state.basicURL.concat("getCommentLikes.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                this.reply_likes = result.data[0];
                this.replyes = result.data[1];
                this.user_liked = result.data[2];
                //console.log(result);
            }).catch((error) => {
                console.log(error);
            });
        },
        getSubComments(){
            if(this.subComments.length > 0) {
                this.subComments = [];
                return;
            }
            let formData = new FormData();
            formData.append('comment_id', this.comment_id);
            Vue.http.post(this.$store.state.basicURL.concat("getSubComments.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                this.subComments = (result.data);
            }).catch((error) => {
                console.log(error);
            });
        },
        addComment(top_id){
            let formData = new FormData();
            formData.append('user_id', this.$store.state.user_id);
            formData.append('post_id', this.post_id);
            formData.append('comment', this.newComment);
            if(top_id != null){
                formData.append('top_reply', top_id);
            }
            Vue.http.post(this.$store.state.basicURL.concat("addComment.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(() => {
                //console.log(result);
                this.isReplying = false,
                this.getSubComments();
                this.getLikesAndComments();
            }).catch((error) => {
                console.log(error);
            });
        },
        updateComment(val){
            let formData = new FormData();
            formData.append('user_id', this.$store.state.user_id);
            formData.append('comment_id', this.comment_id);
            formData.append('val', val);
            Vue.http.post(this.$store.state.basicURL.concat("updateCommentLike.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(() => {
                //console.log(result);
                this.getLikesAndComments();
            }).catch((error) => {
                console.log(error);
            });
        },
        deleteComment() {
            let formData = new FormData();
            formData.append('comment_id', this.comment_id);
            Vue.http.post(this.$store.state.basicURL.concat("deleteComment.php"), formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then((result) => {
                console.log(result);
                this.getLikesAndComments();
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    props: [
            '_ind',
            '_id',
            '_comment',
            '_picture',
            '_user',
            '_date',
            '_postid',
    ],
}
</script>

<style>
    .CS3 span.drop {
    display: block;
    float: left;
    width: 20px;
    height: 20px;
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/b1e59581a692207be03ac079fdd1f1f5c74ba5f6/static/dist/comment/img/dropdown.png) 0 -20px no-repeat;
    opacity: .3;
}
    .CS3 .comment-pop-menu {
    position: absolute;
    min-width: 140px;
    top: 20px;
    right: 5px;
    z-index: 1;
}
.CS3 ol, .CS3 ul {
    list-style: none;
}
.CS3 .comment-pop-menu a {
    display: block;
    color: #777;
    background-color: #fff;
    line-height: 30px;
    padding: 0 15px;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
}
.CS3 .comment-entry .extra-menu {
    position: absolute;
    top: 10px;
    right: 0;
}
.CS3 .comment-pop-menu ul {
    list-style-type: none;
    overflow: hidden;
    padding: 5px 0;
    background-color: #fff;
    background-clip: padding-box;
    box-shadow: 0 0 0 1px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.2);
}
.CS3 a.menu-trigger.selected, .CS3 a.menu-trigger:hover {
    color: #000;
}
.CS3 .comment-entry .extra-menu .inline-icon:hover, .CS3 .comment-entry .menu-trigger.active span.drop, .CS3 .comment-entry .menu-trigger:hover span.drop {
    opacity: 1;
}
.CS3 a.menu-trigger:hover span.drop {
    opacity: 1;
}   
.CS3 .comment-highlight {
    background-color: rgba(0,0,0,.03);
    transition: background-color .2s;
    cursor: pointer;
}
.CS3 .comment-pop-menu {
    position: absolute;
    min-width: 140px;
    top: 20px;
    right: 5px;
    z-index: 1;
}
.CS3 .comment-entry .action .vote-buttons .up .icn-up {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/b1e59581a692207be03ac079fdd1f1f5c74ba5f6/static/dist/comment/img/comment-sprite.png) no-repeat 0 -40px;
}
.CS3 .comment-entry .action .vote-buttons .down .icn-down {
    background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/b1e59581a692207be03ac079fdd1f1f5c74ba5f6/static/dist/comment/img/comment-sprite.png) no-repeat -20px -40px;
}
.CS3 .comment-box.indent-1 {
    margin-left: 20px;
    padding-top: 10px;
    margin-bottom: 20px;
}
.CS3 .comment-box.indent-1 .avatar, .CS3 .comment-box.indent-1 .avatar .image-container, .CS3 .comment-box.indent-1 .avatar img {
    width: 30px;
    height: 30px;
}
.CS3 .comment-box.indent-1 .payload {
    margin-left: 40px;
}
.CS3 .comment-entry.indent-1 {
    padding-left: 20px;
    padding-top: 0;
    border-bottom: none;
}
.CS3 .comment-box.indent-2 .payload {
    margin-left: 40px;
}
.CS3 .comment-entry.indent-2 {
    padding-left: 40px;
    padding-top: 0;
    border-bottom: none;
}
.CS3 .comment-box.indent-2 {
    margin-left: 20px;
    padding-top: 10px;
    margin-bottom: 20px;
}
.CS3 .comment-box.indent-2 .avatar, .CS3 .comment-box.indent-2 .avatar .image-container, .CS3 .comment-box.indent-2 .avatar img {
    width: 30px;
    height: 30px;
}
.CS3 .comment-entry.indent-2 .avatar, .CS3 .comment-entry.indent-2 .avatar .image-container, .CS3 .comment-entry.indent-2 .avatar img {
    width: 30px;
    height: 30px;
}
.CS3 .comment-entry .payload {
    margin-left: 40px;
    padding-bottom: 8px;
}
</style>