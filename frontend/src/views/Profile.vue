
<template>
  <div class="profile-container">
      <img class="user-avatar"
           :src="userData.avatar" 
           :alt="userData.firstName + ' ' + userData.lastName + ' picture'"/>
      <span  class="username" v-if="currentUser.uuid" > <b>Username</b> : </span>
      <span  class="username-value"> {{userData.userName}}  </span>
      <span class="firstname"> <b>Firstname</b> : </span>
      <span class="firstname-value"> {{userData.firstName}} </span>
      <span class="lastname"> <b>LastName</b> : </span>
      <span class="lastname-value"> {{userData.lastName}} </span>
      <span class="email"> <b>Email</b> : </span>
      <span class="email-value">{{userData.email}} </span>
      <!-- <span class="about-user">  </span> -->
      <span class="about-user-value"> <b>About me:</b>:{{userData.aboutMe}} </span>

          <button class="btn btn-primary btn-update-collapser" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Update Profile
    </button>
    <div class="collapse" id="collapseExample">
      <div class="card card-body">
        <UserUpdateForm/>
      </div>
    </div>

    <!-- <div class="bloc bloc-user-modifications"> -->
      <UpdateUser class="update-user-component" />
      <DeleteUser  class="delete-user-component"/>
    <!-- </div> -->

  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import UpdateUser from './../components/main/Profile/Profile_UpdateUser'
import UserUpdateForm from './../components/main/Profile/UserUpdateForm.vue'
import DeleteUser from './../components/main/Profile/Profile_DeleteUser'
export default {
  
  name: 'Profile',
  components: {
    DeleteUser,
    UpdateUser,
    UserUpdateForm,
  },

  data() {
    return {
      message: '',
      user: '',
      // photos: this.userData.photos,
      aboutMeVisible: false,
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

    ...mapActions(['fetchOneUserAction']),

    async fetchUser() { 
        try{ 
            const userUuid = this.currentUser.uuid; 
            await this.$store.dispatch("fetchOneUserAction", userUuid)
        } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
        }
    },

    async updateUser() {
      try {"hello"} catch(err) { "hello"}
    },
  },

  created() {
    this.fetchUser()
   }
};
</script>


<style lang="scss" scoped>
.profile-container {
  display: grid;
  width: 84vw;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  height: auto;
  border: 1px solid black;
  background: #c7c7c7;
  border-radius: 5px;
  // grid-gap: 10px;
  // grid-template-rows: repeat(10, 0.2fr);
  // grid-template-columns: repeat(10, 0.2fr);
}
.user-avatar{
  grid-row: 1 / span 1 ;
  grid-column: 1 / span 1 ;
}
.about-user-value{
  grid-row: 1 / span 1 ;
  grid-column: 2 / span 1 ;
}
.username {
  grid-row: 3 / span 1 ;
  grid-column: 1 / span 1;
}
.username-value {
  grid-row: 3 / span 1 ;
  grid-column: 2 / span 1;
}
.firstname {
  grid-row: 4 / span 1 ;
  grid-column: 1 / span 1;
}
.firstname-value {
  grid-row: 4 / span 1 ;
  grid-column: 2 / span 1;
}
.lastname {
  grid-row: 5 / span 1 ;
  grid-column: 1 / span 1;
}
.lastname-value {
  grid-row: 5 / span 1 ;
  grid-column: 2 / span 1;
}
.email {
  grid-row: 6 / span 1 ;
  grid-column: 1 / span 1;
}
.email-value {
  grid-row: 6 / span 1 ;
  grid-column:  2/ span 1;
}
.user-avatar {
  max-width: 20vw;
}
.update-user-component {
  grid-row: 7 / span 1 ;
  grid-column:  1 / span 2;
}
.delete-user-component {
  grid-row: 8 / span 1 ;
  grid-column:  1 / span 2 ;
}
.btn-update-collapser {
  grid-row: 9 / span 1 ;
  grid-column:  1 / span 2 ;
}
#collapseExample {
  grid-row: 10   ;
  grid-column:  1 / span 2 ;

}

/* --------------------------------- */

</style>