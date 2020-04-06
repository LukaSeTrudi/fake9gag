<template>
    <header id="top-nav">
        <div class="nav-wrap">
            <a class="logo" href="localhost:8080" style="font-weight: bold">9GAG</a>
            <nav class="nav-menu">
                <ul class="secondary">
                    <li><a href="https://about.9gag.com/app" >9GAG App📱</a></li>
                    <li><a href="https://shop.9gag.com/" >9GAG Shop 👕</a></li>
                    <li><a href="#" >Valentine's Day❤️</a></li>
                    <li><a href="#" >Car🚙</a></li>
                    <li><a href="#" >Local📍</a></li>
                    <li><a href="#" >Cosplay🧝‍♀️</a></li>
                    <li><a href="#" >Random 🎲</a></li>
                </ul>
            </nav>
            <div class="function-wrap">
                <div class="general-function">
                    <a @click="toggleDark" class="darkmode-toggle" href="javascript:void(0)">Dark mode</a>
                    <a class="searchIcon" href="javascript:void(0)">sd</a>
                </div>
                <div id="jsid-visiton-function" class="visitor-function" v-if="!this.$store.getters.isLoggedIn">                
                    <a href="javascript:void(0)" class="btn-mute" @click="$store.dispatch('change_modal', 'loginModal');">Log In</a>
                    <a href="javascript:void(0)" class="btn-primary">Sign Up</a>
                </div>
                <div id="jsid-user-function" class="user-function" v-if="this.$store.getters.isLoggedIn">
                    <div id="jsid-header-notification-menu" class="notification badge-evt" @click = "showNotificationMenu = !showNotificationMenu">
                        <a id="jsid-notification-unread-count" class="bell" href="javascript:void(0);" rel="nofollow"></a>
                    </div>
                    <div id="jsid-header-user-menu" class="avatar" @click ="showUserMenu = !showUserMenu">
                        <a class="avatar-container" href="javascript:void(0);" rel="nofollow">
                            <img id="jsid-avatar" :src="this.$store.state.user_picture" alt="avatar">
                        </a>
                    </div>
                    <div class="upload" @click="$store.dispatch('change_modal', 'uploadModal');">
                        <a id="jsid-upload-btn" class="btn-primary" href="javascript:void(0);" rel="nofollow">Upload</a>
                    </div>
                    <div id="jsid-header-notification-items" class="notification-menu" v-if="showNotificationMenu">
                        <div><div id="jsid-header-notification-tab-bar" class="tab-bar"><a href="javascript:void(0)" class="active">
                        All
                    </a> <a href="javascript:void(0)" class="">
                        Mentions
                    </a></div> <div class="notification-list viewport"><ul id="jsid-header-notification-items-container" class="overview"><li class="empty"><div class="empty-message"><div class="simple-spinner"></div></div></li></ul></div> <div class="bumper"><a href="/notifications" rel="nofollow" class="see-all">See all</a></div></div>
                    </div>
                    <div id="jsid-header-user-menu-items" class="popup-menu user" v-if="showUserMenu">
                        <span class="arrow-wrap">
                            <span class="arrow"></span>
                        </span>
                            <ul>
                                <li><a id="jsid-my-profile" href="/u/lukapavcnik123" rel="nofollow">My Profile</a></li>
                                <li><a href="https://9gag.com/settings" rel="nofollow">Settings</a></li>
                                <li><a class="badge-logout-btn" href="javascript:void(0)" rel="nofollow" @click="destroySession()">Logout</a></li>
                            </ul>
                    </div>
                </div>
            </div>
        </div>
        <div id="backgroundLogin" v-if="this.$store.state.openedModal != 'none'" @click="toggleModal($event);">
            <LoginModal v-if="this.$store.state.openedModal == 'loginModal'"></LoginModal>
            <UploadModal v-if="this.$store.state.openedModal == 'uploadModal'"></UploadModal>
        </div>
        <div id="backgroundLogin" v-if="showUploadModal" @click="toggleUploadModal($event)"><UploadModal></UploadModal></div>

    </header>
</template>

<script>
    import LoginModal from '../views/LoginModal';
    import UploadModal from '../views/UploadModal';

    export default {
        name: 'Navbar',
        data() {
            return {
                showLoginModal: false,
                showUploadModal: false,
                showNotificationMenu: false,
                showUserMenu: false,
            }
        },
        watch: {
            showNotificationMenu: function(){
                this.showUserMenu = false;
                this.showLoginModal = false;
            },
            showLoginModal: function(){
                this.showNotificationMenu = false;
                this.showUserMenu = false;
            },
            showUserMenu: function() {
                this.showNotificationMenu = false;
                this.showLoginModal = false;    
            }
        },
        methods: {
            toggleModal: function(event){
                if(event.srcElement.id == 'backgroundLogin'){
                    this.$store.dispatch("change_modal", 'none');
                }
            },
            toggleDark: function(){

            },
            destroySession(){
                this.$session.destroy();
                window.location.reload(0);
            },
        },
        components: {
            LoginModal,
            UploadModal,
        },
        created(){
            this.$store.dispatch("checkSession");
        },
    }
</script>

<style>
    input[type=email], input[type=password], input[type=text], input[type=url] {
        line-height: 20px;
        height: 20px;
        padding: 9px;
        border-radius: 2px;
        display: block;
        margin: 6px 0;
        width: 440px;
    }
    #backgroundLogin {
        position: absolute;
        top: 0;
        z-index: 9997;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0,0,0,.3);
    }
    #top-nav{
        will-change: transform;
        background-color: #000;
        width: 100%;
        z-index: 13;
        position: fixed;
    }
    header {
        display: block;
    }
    .nav-wrap {
        max-width: 1196px;
        padding: 0 16px;
        margin: 0 auto;
        position: relative;
    }
    .nav-wrap:after, .nav-wrap:before {
        content: " ";
        display: table;
    }
    .nav-wrap:after {
        clear: both;
    }
    #top-nav a.logo {
        display: block;
        width: 72px;
        height: 48px;
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/354c0f36c244842cd392d54712af2d3ab99a62a8/static/dist/web6/img/sprite-logo.png) 50% no-repeat;
        background-size: 72px 48px;
        text-indent: -9999px;
        overflow: hidden;
        float: left;
        margin-left: -12px;
    }
    #top-nav a {
        text-decoration: none;
    }
    a {
        color: #09f;
        text-decoration: none;
    }
    .nav-menu {
        margin-right: 256px;
    }
    nav {
        display: block;
    }
    .nav-menu ul {
        list-style-type: none;
        overflow: hidden;
        height: 48px;
    }
    ul {
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }
    .nav-menu .secondary li {
        display: block;
        float: left;
    }
    .nav-menu ul {
        list-style-type: none;
        overflow: hidden;
        height: 48px;
    }
    #top-nav a {
        text-decoration: none;
    }
    .nav-menu .secondary a {
        display: block;
        color: #fff;
        position: relative;
        line-height: 48px;
        font-size: 14px;
        padding: 0 12px;
        text-align: center;
        box-sizing: border-box;
    }
    .function-wrap {
        position: absolute;
        right: 16px;
        top: 0;
    }
    div {
        display: block;
    }
    .general-function {
        float: left;
        padding: 9px 0;
    }
    .user-function, .visitor-function {
        float: left;
        padding: 9px 0 9px 10px;
    }
    .visitor-function {
        float: right;
    }
    .user-function .btn-mute, .visitor-function .btn-mute {
        display: inline-block;
        color: #bbb;
        line-height: 30px;
        height: 30px;
        padding: 0 12px;
    }
    .darkmode-toggle {
        display: block;
        width: 30px;
        height: 30px;
        float: left;
        text-indent: -999px;
        overflow: hidden;
        margin-right: 8px;
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/354c0f36c244842cd392d54712af2d3ab99a62a8/static/dist/web6/img/moon-sprite.png) 0 0 no-repeat;
        background-size: 30px 60px;
    }
    .darkmode-toggle:hover {
        background-position-y: -30px;
    }
    .searchIcon {
        display: block;
        width: 30px;
        height: 30px;
        text-indent: -999px;
        overflow: hidden;
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/354c0f36c244842cd392d54712af2d3ab99a62a8/static/dist/web6/img/sprite.png) 0 0 no-repeat;
        background-size: 510px 120px;
        float: left;    
    }
    
    .notLoggedIn a {
        color: #aaa;
    }
    .btn-primary {
        color: #fff !important;
        display: inline-block;
        line-height: 30px;
        height: 30px;
        padding: 0 16px;
        border-radius: 2px;
        font-size: 14px;
        font-weight: 600;
        margin-left: 10px;
        background-color: #09f;
    }
    .btn-primary:hover{
        background-color: #09e;
    }

    a, blockquote, body, dd, div, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, html, img, input, label, li, ol, p, pre, td, th, ul {
    margin: 0;
    padding: 0;
    outline: 0;
    }
    .notification .bell {
        display: block;
        width: 30px;
        height: 30px;
        position: relative;
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/8a3718381d1d5f168fffc2e3f67b2e1300a5c9a3/static/dist/web6/img/sprite.png) -30px 0 no-repeat;
        background-size: 510px 120px;
        color: #fff;
        font-weight: 700;
        text-align: center;
        line-height: 29px;
    }
    .user-function .notification {
        float: left;
        margin-right: 10px;
    }
    .user-function .avatar {
        float: left;
        position: relative;
    }
    .user-function .upload, .visitor-function .upload {
        float: right;
    }
    .user-function .avatar-container {
        display: block;
        height: 30px;
        width: 30px;
        background-color: hsla(0,0%,100%,.2);
        border-radius: 50%;
        overflow: hidden;
        position: relative;
    }
    .user-function .avatar-container img {
        width: 30px;
        height: 30px;
        display: block;
        border: 0;
    }
    .user-function .upload, .visitor-function .upload {
        float: right;
    }
    .hide {
        display: none!important;
    }
    .notification-menu {
        position: absolute;
        top: 48px;
        right: 10px;
        background-color: #fff;
        width: 320px;
        box-shadow: 0 5px 10px rgba(0,0,0,.2);
        z-index: 12;
    }
    .notification-menu .tab-bar {
        display: flex;
    }
    .notification-menu .viewport {
        width: 320px;
        height: 490px;
        overflow-x: hidden;
        overflow-y: scroll;
        overscroll-behavior: contain;
        position: relative;
    }
    .notification-menu .bumper {
        width: 320px;
        height: 40px;
        border-radius: 0 0 3px 3px;
        border-top: 1px solid #ddd;
    }
    .notification-menu .tab-bar a {
        flex: 1;
        font-size: 14px;
        line-height: 38px;
        font-weight: 700;
        color: #999;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
    }
    .notification-menu .tab-bar a.active {
        color: #000;
        border-bottom: 2px solid #000;
    }
    .notification-menu .overview {
        list-style: none;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0;
        margin: 0;
        width: 320px;
    }
    .notification-menu li.empty {
        position: relative;
        height: 490px;
        cursor: default;
    }
    .notification-menu .empty-message {
        position: relative;
        top: 50%;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        font-weight: 700;
        font-size: 15px;
    }
    .simple-spinner {
        min-width: 24px;
        min-height: 24px;
    }
    .notification-menu .bumper a.see-all {
        display: block;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #999;
        font-size: 14px;
        font-weight: 700;
    }
    .popup-menu.user {
        margin-left: auto;
        left: auto;
        right: 10px;
        top: 48px;
        z-index: 13;
        min-width: 10px;
        width: 160px;
    }
    .popup-menu {
        position: absolute;
        left: 50%;
        margin-left: -60px;
        z-index: 13;
        min-width: 160px;
    }
    .popup-menu.user .arrow-wrap {
        margin-left: 30px;
    }
    .popup-menu .arrow-wrap {
        position: absolute;
        border-bottom: 7px solid #ccc;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        top: 0;
        left: 50%;
        margin-left: -6px;
        display: none;
    }
    .popup-menu .arrow-wrap .arrow {
        border-bottom: 6px solid #fff;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        top: 2px;
        left: -5px;
        position: absolute;
    }
    .popup-menu ul {
        list-style-type: none;
        overflow: hidden;
        padding: 4px 0;
        background-color: #fff;
        box-shadow: 0 5px 10px rgba(0,0,0,.2);
        box-sizing: border-box;
    }
    .popup-menu a {
        display: block;
        color: #000;
        line-height: 34px;
        padding: 0 16px;
        font-size: 14px;
    }
</style>