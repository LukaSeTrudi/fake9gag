<template>
    <div class="nav">
        <div class="logo">
            <h2><a href="localhost:8080" style="font-weight: bold">9GAG</a></h2>
        </div>
        <div class="secondary">
            <a href="https://about.9gag.com/app" >9GAG App📱</a>
            <a href="https://shop.9gag.com/" >9GAG Shop 👕</a>
            <a href="#" >Valentine's Day❤️</a>
            <a href="#" >Car🚙</a>
            <a href="#" >Local📍</a>
            <a href="#" >Cosplay🧝‍♀️</a>
            <a href="#" >Random 🎲</a>
        </div>
        <div class="functions">
            <a @click="toggleDark" class="darkmode-toggle" href="javascript:void(0)">Dark mode</a>
            <a class="searchIcon" href="javascript:void(0)">sd</a>

            <div class="notLoggedIn">                
                <a href="javascript:void(0)">Log In</a>
                <a href="javascript:void(0)" class="btn-primary">Sign Up</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        methods: {
            toggleDark: function(){

            },
        },
    }
</script>

<style>
    .nav {
        margin: 0px 150px;
        display: flex;
    }
    .secondary {
        display: flex;
    }
    .nav div {
        margin-left: 10px;
    }
    .secondary a {
        margin: 10px;
        margin-top: 13px;
        font-weight: normal;
        font-size: medium;
    }
    .functions {
        padding-left: 150px;
    }
    a {
        color: white;
        text-decoration-line: none;
    }
    a:hover{
        color: #aaa;
    }
    h2 {
        margin: 10px;
        margin-right: 0px;
        color: white;
    }
    .darkmode-toggle {
        display: block;
        width: 30px;
        height: 30px;
        margin-top: 9px;
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
        margin-top: 9px;
        text-indent: -999px;
        overflow: hidden;
        background: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/354c0f36c244842cd392d54712af2d3ab99a62a8/static/dist/web6/img/sprite.png) 0 0 no-repeat;
        background-size: 510px 120px;
        float: left;    
    }
    
    .notLoggedIn{
        float: right;
        padding-left: 14px;
        margin-top: 10px;
    }
    .notLoggedIn a {
        color: #aaa;
        padding-left: 13px;
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
</style>