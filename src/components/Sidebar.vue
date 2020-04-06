<template>
    <div class="sidebar">
        <div class="scrollbar">
            <section class="popular">
                <ul class="navigation">
                    <li>
                        <router-link to="/hot" class="label"><i class="icon hot"></i>Hot</router-link>
                    </li>
                    <li>
                        <router-link to="/trending" class="label"><i class="icon trending"></i>Trending</router-link>
                    </li>
                    <li>
                        <router-link to="/fresh" class="label"><i class="icon fresh"></i>Fresh</router-link>
                    </li>
                </ul>
            </section>
            <section>
                <header><h3>POPULAR</h3></header>
                <ul class="nav">
                    <li v-for="category in this.$store.state.categories" :key="category.id">
                        <router-link :to="getCategoryUrl(category.url)" class="label"><i class="thumbnail" v-bind:style="getImageUrl(category.icon)"></i>{{ category.title}}</router-link>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        methods: {
            getCategoryUrl: function(link){
                return "/" + link;
            },
            getImageUrl: function(link){
                return "background-image: url(" + link + ");";
            }
            
        },
        created(){
            this.$store.dispatch("fetch_categories");
        },
    }
</script>
<style>
    .sidebar {
        width: 192px;
        height: calc(100% - 48px);
        position: fixed;
        z-index: 1;
        overflow: hidden;
        overscroll-behavior: contain;
    }
    .scrollbar section .navigation {
        list-style: none;
    }
    .scrollbar section .navigation li {
        position: relative;
    }
    .scrollbar section .navigation li:hover {
        background-color: #ddd;
    }
    .scrollbar section .navigation .label {
        color: #000;
        font-size: 14px;
        height: 36px;
        line-height: 20px;
        padding: 8px 0 8px 36px;
        box-sizing: border-box;
        display: block;
        position: relative;
        border-radius: 2px;
        transition: background-color .15s,padding-right .15s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 8px;
    }
    .scrollbar .icon.hot{
        background-position: -168px 0;
    }
    .scrollbar .icon.trending{
        background-position: -192px 0;
    }
    .scrollbar .icon.fresh{
        background-position: -216px 0;
    }
    .scrollbar .icon {
        position: absolute;
        width: 24px;
        height: 24px;
        background-size: 264px 48px;
        background-image: url(https://assets-9gag-fun.9cache.com/s/fab0aa49/354c0f36c244842cd392d54712af2d3ab99a62a8/static/dist/web6/img/post-action-sprite.png);
        left: 4px;
        top: 50%;
        margin-top: -12px;
    }
    .scrollbar header{
        line-height: 16px;
        height: 16px;
        margin-bottom: 8px;
        color: #999;
        font-size: 12px;
        text-transform: uppercase;
    }
    .scrollbar section .nav {
        list-style: none;
    }
    .scrollbar .nav .label {
        color: #000;
        font-size: 14px;
        height: 36px;
        line-height: 20px;
        padding: 8px 0 8px 36px;
        box-sizing: border-box;
        display: block;
        position: relative;
        border-radius: 2px;
        transition: background-color .15s,padding-right .15s;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 8px;
    }
    .sidebar .nav .thumbnail {
        background-color: rgba(0,0,0,.05);
        border-radius: 2px;
        overflow: hidden;
        position: absolute;
        width: 24px;
        height: 24px;
        background-size: 24px 24px;
        left: 4px;
        top: 50%;
        margin-top: -12px;
    }
</style>