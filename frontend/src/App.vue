<template>
  <div>
      <div id="app">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link>
        </div>
        <router-view/>
      </div>

      <!-- <div class="">
        <label for="email">Email</label>
        <input v-model="user.email" v-validate="'required'" type="text" class="" name="email" placeholder="Entrez votre Email ..."  />
        <div v-if="errors.has('email')" class="alert alert-danger" role="alert" >Votre Email est requis!</div>
    </div> -->

    <!-- <div class="">
      <label for="password">Mot de passe</label>
      <input v-model="user.password" v-validate="'required'" type="password" class="form-control" name="password" placeholder="Entre votre mot de passe ..." />
      <div v-if="errors.has('password')" class="alert alert-danger" role="alert" >Votre mot de passe est requis  </div>
    </div>

    <div class="">
      <button class="btn btn-primary btn-block" :disabled="loading">
        <span v-show="loading" class=""></span>
        <span>Connexion</span>
      </button>
    </div> -->
  </div>

</template>

<style lang="scss">

 /*---------------------------------------------------*/
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
