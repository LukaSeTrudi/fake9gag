<template>
  <div id="app" :class="{ 'dark-theme' : this.$store.state.dark_mode }">
    <Navbar></Navbar>
    <br><br>
    <div id="container">
      <Sidebar></Sidebar>
      <Main></Main>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
    Main,
  },
  data(){
    return{
    }
  },
}
</script>
  
<style>
#app img {
  background: white !important;
}
#app.dark-theme{
  background-color: black;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: white;
  color: black;
  width: 100%;
  left: 0;
  top: 0;
}
#container {
    width: 1196px;
    height: 100%;
    padding: 48px 16px 32px;
    position: relative;
}
#container {
    overflow: hidden;
    margin: 0 auto;
    clear: both;
}
</style>
