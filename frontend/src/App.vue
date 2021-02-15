<template>
  <div id='app-in'>
    <Header/>
    <div id="nav">
      <router-link to="/login">Connexion</router-link> | 
      <router-link to="/signup">Inscription</router-link> 
      
    </div> 
    <router-view/> 
    
    <Footer/>
  </div>
</template>



<script>

import Header from './components/Header.vue';
import Footer from './components/Footer';

export default {
  
  components: {
    Header,
    Footer

  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app-in {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  backgroundcolor: lightgreen;

 display: grid;
 grid-template-rows: auto 1fr  auto;  /* key rule */
 height: 100vh;
}



#nav {
  padding: 30px;
  // border: 1px solid green;
  // display: flex;
  // justify-content: center ;
  // align-content: center;
  // height: 30vh;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
