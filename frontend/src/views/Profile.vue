
<template>
  <div class="profile-container">
      <img class="user-avatar"
           :src="userData.avatar" 
           :alt="userData.firstName + ' ' + userData.lastName + ' picture'"/>
      <span class="username" v-if="currentUser.uuid" > <b>Username</b> : </span>
      <span class="username-value"> {{userData.userName}}  </span>
      <span class="firstname"> <b>Firstname</b> : </span>
      <span class="firstname-value"> {{userData.firstName}} </span>
      <span class="lastname"> <b>LastName</b> : </span>
      <span class="lastname-value"> {{userData.lastName}} </span>
      <span class="email"> <b>Email</b> : </span>
      <span class="email-value">{{userData.email}} </span>
      <span class="about-user-value"> <b>About me :</b> {{userData.aboutMe}} </span>
      <p class="user-update-collapser" 
         type="button" 
         data-toggle="collapse" data-target="#user-update" 
         aria-expanded="false" aria-controls="user-update">
          Update Profile
      </p>
      <div class="collapse" id="user-update">
          <div class="card card-body">
            <UserUpdateForm/>
          </div>
      </div>


      <p class="password-update-collapser" 
              type="button" 
              data-toggle="collapse" data-target="#password-update" 
              aria-expanded="false" aria-controls="password-update">
          Update Password
      </p>
      <div class="collapse" id="password-update">
          <div class="card card-body">
              <PasswordUpdateForm />
          </div>
      </div>


      <p class="account-delete-collapser" 
              type="button" 
              data-toggle="collapse" data-target="#account-delete" 
              aria-expanded="false" aria-controls="account-delete">
          Delete account
      </p>
      <div class="collapse" id="account-delete">
          <div class="card card-body">
              <UserDeleteAccountForm />
          </div>
      </div>


  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import UserUpdateForm from './../components/main/Profile/UserUpdateForm.vue';
import PasswordUpdateForm from './../components/main/Profile/PasswordUpdateForm.vue';
import UserDeleteAccountForm from './../components/main/Profile/UserDeleteAccountForm.vue';
export default {
  
  name: 'Profile',
  components: {
    // DeleteUser,
    // UpdateUser,
    UserUpdateForm,
    PasswordUpdateForm,
    UserDeleteAccountForm,
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
  grid-gap: 10px;
  // grid-template-rows: repeat(10, 0.2fr);
  // grid-template-columns: repeat(10, 0.2fr);
}
.user-avatar{
  grid-row: 1 / span 1 ;
  grid-column: 1 / span 1 ;
  border-bottom: 2px solid rgb(0, 0, 255);
  padding-bottom: 1rem;
  
}
.about-user-value{
  grid-row: 1 / span 1 ;
  grid-column: 2 / span 1 ;
  font-size: 0.85rem;
  // margin-left: 1rem;
  text-align: justify;
}
.username {
  grid-row: 3 / span 1 ;
  grid-column: 1 / span 1;
  // margin-top: 2rem
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
  margin-bottom: 2rem;
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
.user-update-collapser {
  grid-row: 9 / span 1 ;
  grid-column:  1 / span 2 ;
 font-size: 1rem;
  color: blue;
  display: inline;
  margin: 0 2rem;
  text-align: center;
  padding: 0.25rem 2rem;
  background: rgb(0, 138, 0);
  color: white;
  &:hover{
      border: 2px solid white;
      border-radius: 0.25rem;
      padding: 2px;
    }
}
#user-update {
  grid-row: 10   ;
  grid-column:  1 / span 2 ;
  margin: 1rem 0;
}

.password-update-collapser {
  color: blue;
  grid-row: 11   ;
  grid-column:  1 / span 2 ;
  font-size: 1rem;
  display: inline;
  margin: 0 2rem;
  padding: 0.25rem 2rem;
  text-align: center;
  // margin: auto;
  background: rgb(25, 0, 255);
  color: white;
  &:hover{
      border: 2px solid white;
      border-radius: 0.25rem;
      padding: 2px;
  }
}
 #password-update {
  grid-row: 12   ;
  grid-column:  1 / span 2 ;
  
}

.account-delete-collapser {
  grid-row: 13   ;
  grid-column:  1 / span 2 ;
  font-size: 1rem;
  display: inline;
  margin: 0 2rem;
  padding: 0.25rem;
  text-align: center;
  // margin: auto;
  // border: 1px solid red;
      background: rgb(220, 0, 0);
      color: white;
  &:hover{
      border-radius: 0.25rem;
      background: rgb(255, 0, 0);
      border: 2px solid white;
      padding: 2px;
  }
}
 #account-delete {
  grid-row: 14   ;
  grid-column:  1 / span 2 ;
}

/* --------------------------------- */

</style>