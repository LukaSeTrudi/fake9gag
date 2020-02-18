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
                <div id="jsid-visiton-function" class="visitor-function">                
                    <a href="javascript:void(0)" class="btn-mute" @click="showLoginModal = true">Log In</a>
                    <a href="javascript:void(0)" class="btn-primary">Sign Up</a>
                </div>
            </div>
        </div>
        <div id="backgroundLogin" v-if="showLoginModal" @click="toggleLoginModal($event)"><LoginModal></LoginModal></div>
    </header>
</template>

<script>
    import LoginModal from '../views/LoginModal';
    export default {
        name: 'Navbar',
        data() {
            return {
                showLoginModal: false,
            }
        },
        methods: {
            toggleLoginModal: function(event) {
                if(event.srcElement.id == 'backgroundLogin'){
                    this.showLoginModal = !this.showLoginModal;
                }
            },
            toggleDark: function(){

            },
        },
        components: {
            LoginModal,
        }
    }
</script>

<style>
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
</style>