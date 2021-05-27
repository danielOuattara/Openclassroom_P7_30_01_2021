
<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </header>
    <p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>
    <p>
      <strong>Id:</strong>
      {{currentUser.id}}
    </p>
    <p>
      <strong>Email:</strong>
      {{currentUser.email}}
    </p>
    <strong>Authorities:</strong>
    <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul>

    <br><br><br>
    <hr><hr>
    <br><br><br>

    <div>
      <h3>Photos</h3>
      <p>{{allPhotos}}</p>
      <div class="todos">
        <div v-for="photo in allPhotos" 
             :key="photo.id">
              <img :src="photo.imageUrl" :alt="photo.title">
        </div>
      </div>
    </div>



  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';

export default {
  
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    ...mapGetters(['allPhotos']), 
  },
  
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: {
      ...mapActions(['fetchAllPhotos']),
  },

  created() {
      this.fetchAllPhotos();
    }
};
</script>
