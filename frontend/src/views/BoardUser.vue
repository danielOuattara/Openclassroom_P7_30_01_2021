
<template>
  <section class="user-board">  
    <WallHeader/>
    <AddPhoto class="add-photo"/>
    <UserPhotosWall class="user-photos"/>
  </section>
</template>

<script>
// import UserService from './../services/user.service.js';
import {mapActions } from 'vuex';

import WallHeader from './../components/main/userBoard/WallHeader.vue';
import AddPhoto from './../components/main/global_components/AddPhoto.vue';
import UserPhotosWall from './../components/main/userBoard/UserPhotosWall.vue';

export default {
    name: 'UserBoard',
    components: {
      WallHeader,
      AddPhoto,
      UserPhotosWall,
    },

    computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }, 
    },
      
    methods: {
      ...mapActions(['getOneUserAction']),

      async fetchUser() { 
        try { 
            const userUuid = this.currentUser.uuid; 
            await this.$store.dispatch("getOneUserAction", userUuid)
        } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
        }
      },
    },

    mounted() {
      // UserService.getUserBoard()
      // .then( response => {
      //     this.content = response.data
      // })
      // .catch( err => {
      //   this.content = (err.response && err.response.data) || err.message || err.toString();
      // })
      
      if (!this.currentUser) {
        this.$router.push('/login');
      }

      this.fetchUser();
    },
};
</script>

<style lang="scss" scoped>

.user-board{
  margin:auto;
}
.add-photo{
  max-width: 80vw;
  margin: auto;
  margin-top: 1rem;
}

.user-photos {
  max-width: 80vw;
  margin: auto;
  margin-top: 1rem;
  // margin-top: 2rem;
  padding-top: 1rem;

}
.photos {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%; 
  height: auto;
  transition: transform 200ms;
  &:hover {
    transform: scale(0.98);    
    box-shadow: 0 0 2px 3px rgba(18, 34, 253, 0.6);
    border-radius: 4px;  /* Rounded border */
  }

}
.photo-block {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
  overflow-x: hidden;
}

.profile-container {
  display: grid;
  width: 84vw;
  margin: auto;
  padding: 20px;
  height: auto;
  border: 1px solid black;
  background: #c7c7c7;
  border-radius: 5px;
  grid-gap: 10px;
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


.user-photos {

}





</style>
