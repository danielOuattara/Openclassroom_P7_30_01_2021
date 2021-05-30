
<template>
  <div class="container">
    <div class="jumbotron">
      <h3>
        <strong>{{currentUser.username}}</strong> Profile
      </h3>
    </div>

    <div>
        <button @click="fetchUser">Click to fecth user</button>
        <ul>
          <li v-for=" item, index in user" :key='index'>
              {{user.item}}
          </li>
        </ul>
    </div>



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

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
export default {
  
  name: 'Profile',

  data() {
    return {
      message: '',
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
            console.log("hello");      
            await this.$store.dispatch("user/fetchUserAction", userUuid)
        } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
        }
    },




   },

  created() { }
};
</script>
