<template>
  <div id="app">
          <router-view/>
  </div>



</template>

<style lang="scss">
.enter {
   border: 2px solid grey;
   margin-left: auto;
   margin-right: auto;
   margin-top: 40vh;
   border-radius: 5px;
   max-width: 80vw;

}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
