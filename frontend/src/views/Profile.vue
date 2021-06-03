
<template>
  <div class="profile-container">
    <div class="bloc bloc-avatar">
      <img 
        class="user-avatar"
        :src="userData.avatar" 
        :alt="userData.firstName + ' ' + userData.lastName + ' picture'"/>
    </div>

    <div class="bloc bloc-infos-user">
        <p> <b>Username</b> :  {{userData.userName}} 
            <font-awesome-icon class="icon-edit" icon="edit" />
        </p>
        <p> <b>Firstname</b> :  {{userData.firstName}}
            <font-awesome-icon class="icon-edit" icon="edit" />
        </p>
        <p> <b>LastName</b> :  {{userData.lastName}}
            <font-awesome-icon class="icon-edit" icon="edit" />
        </p>
        <p> <b>Email</b> :  {{userData.email}}
        <font-awesome-icon class="icon-edit" icon="edit" /> 
        </p>
    </div>
    <div class="bloc bloc-about-user">
        <p> <b>About me:</b>: {{userData.aboutMe}} </p>
    </div>
    <div class="bloc bloc-user-modifications">
      <UpdateUser />
      <DeleteUser />
    </div>
  </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import UpdateUser from './../components/main/Profile/Profile_UpdateUser'
import DeleteUser from './../components/main/Profile/Profile_DeleteUser'
export default {
  
  name: 'Profile',
  components: {
    DeleteUser,
    UpdateUser
  },

  data() {
    return {
      message: '',
      user: '',
      // photos: this.userData.photos,
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
}

.profile-container > div {
  background: rgb(228, 228, 228);
  padding: 5px;
  border: 2px solid lightblue;
  border-radius: 5px;
}

/* ---- CSS Item Grid */
.bloc-avatar {
  grid-column: 1 /span 2;
  grid-row: 1 /span 2;
}
.bloc-infos-user {
  grid-column: 3 /span 5;
  grid-row: 1 /span 2;
}
.bloc-about-user {
  grid-column: 3 /span 5;
  grid-row: 3 /span 2;
}
.bloc-user-modifications {
  grid-column: 3 /span 5;
  grid-row: 5;
}
/* ---- END CSS Item Grid */


.user-avatar {
  max-width: 20vw;
}

.bloc-user-modifications {
  display: flex;
  flex-direction: row ;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.icon-edit {
  font-size: 16px;
  color: rgb(169, 169, 169);
  margin-left: 20px;
  &:hover{
    color: rgb(95, 95, 95);
    cursor: pointer;
  }
}

@media screen and (max-width: 580px) {
  .profile-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
  }
}

/* --------------------------------- */

</style>