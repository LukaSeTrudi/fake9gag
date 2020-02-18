<template>
  <div id="app">
    <Navbar></Navbar>
    <br><br>
    <Sidebar></Sidebar>
    <br>
    <Main></Main>
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
</style>
