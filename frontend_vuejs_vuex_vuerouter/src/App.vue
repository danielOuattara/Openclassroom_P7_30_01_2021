<template>

  <!--
   Our navbar looks more professional when using font-awesome-icon.
   We also make the navbar dynamically change by current User’s roles
   which are retrieved from Vuex Store state.-->

  <div id="app">

    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <a href="#" class="navbar-brand" @click.prevent>
        <img src="./assets/images/image_Groupomania/icon-left-font-monochrome-white.svg" style="width:200px" alt=" image logo Groupomania"/>
      </a>

      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <div class="navbar-nav mr-auto">
            <ul class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/home" class="nav-link">
                    <font-awesome-icon icon="home" />Accueil
                  </router-link>
                </li>
                <li v-if="showAdminBoard" class="nav-item">
                  <router-link to="/admin" class="nav-link">Admin Board</router-link>
                </li>
                <li class="nav-item">
                  <router-link v-if="currentUser" to="/user" class="nav-link">User</router-link>
                </li>
            </ul>
          </div>

          <div v-if="!currentUser" class="navbar-nav ml-auto">

            <ul class="navbar-nav">
               <li class="nav-item">
                  <router-link to="/signin" class="nav-link">
                    <font-awesome-icon icon="user-plus" />Inscription
                  </router-link>
               </li>
               <li class="nav-item">
                  <router-link to="/login" class="nav-link">
                    <font-awesome-icon icon="sign-in-alt" />Connexion
                  </router-link>
               </li>
            </ul>

          </div>

          <div v-if="currentUser" class="navbar-nav ml-auto">
            <ul class="navbar-nav">
              <li class="nav-item">
               <router-link to="/profile" class="nav-link">
                  <font-awesome-icon icon="user" />
                    {{ currentUser.username }}
                </router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link" href @click.prevent="logOut">
                  <font-awesome-icon icon="sign-out-alt" />Déconnexion
                </a>
              </li>
            </ul>

          </div>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  
  computed: {

    currentUser() {
      return this.$store.state.auth.user;
    },

    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
  },
  
  methods: {
    
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>
