
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </div>

    <div class="profil-container">
        <img 
          class="user-avatar"
          :src="userData.avatar" 
          :alt="userData.firstName + ' ' + userData.lastName + ' picture'"
        >
        <h2>FirstName :  {{userData.firstName}}</h2>
        <h2> LastName : {{userData.lastName}} </h2>
        <p> About me: {{userData.aboutMe}} </p>
    </div>

    <button @click="updateUser">Update profile</button>
    <button @click="deleteUser">Delete account</button>

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
  
  name: 'Profile',

  data() {
    return {
      message: '',
      user: '',
      photos: this.userData.photos,
    }
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }, 

    ...mapGetters(['userData']),
  },
  
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  },

  methods: { 

    ...mapActions(['fetchUserAction']),

    async fetchUser() { 
        try{ 
            const userUuid = this.currentUser.uuid; 
            await this.$store.dispatch("fetchUserAction", userUuid)
        } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
        }
    },

    async updateUser() {
      try {"hello"} catch(err) { "hello"}
    },


    async deleteUser() {
      try {"hello"} catch(err) { "hello"}
    }

  },

  created() {
    // this.fetchUserAction();
    this.fetchUser()
   }
};
</script>


<style scoped>
.profile-container {
  display: grid;
}

.user-avatar {
  max-width: 20vw;
}
</style>