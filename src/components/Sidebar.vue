<template>
    <div class="sidebar">
        <div class="scrollbar">
            <section class="popular">
                <ul class="navigation">
                    <li>
                        <a href="./hot" class="label"><i class="icon hot"></i>Hot</a>
                    </li>
                    <li>
                        <a href="./trending" class="label"><i class="icon trending"></i>Trending</a>
                    </li>
                    <li>
                        <a href="./fresh" class="label"><i class="icon fresh"></i>Fresh</a>
                    </li>
                </ul>
            </section>
            <section>
                <header>POPULAR</header>
                <ul class="navigation">
                    {{ this.$store.state.categories}}
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Sidebar',
        methods: {

        },
        created(){
            this.$store.dispatch("fetch_categories");
        },
    }
</script>
<style>
    .sidebar {
        margin-left: 7vw;
        margin-right: 77vw;
        margin-top: 4vh;
        background-color: white;
    }
    .scrollbar {
        will-change: transform;
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
</style>