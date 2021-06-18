<template>
    <section class="wall-header">
        <div class="background-image" v-if="userData.backgroundImage" v-bind:style="{backgroundImage:`url(${userData.backgroundImage})`}"></div>
        <div class="background-image" v-else v-bind:style="{'background-image': 'url(' + require('@/assets/images/icon.png') + ')'}"></div>

         <img v-if="userData.avatar" 
              class="user-avatar"
              :src="userData.avatar" 
              :alt="userData.firstName + ' ' + userData.lastName + ' picture'"
              data-toggle="modal"
              :data-target="'#avatar'+ userData.uuid"/>
              <i class="fas fa-camera-retro"></i>
              <font-awesome-icon id="icon-camera-retro" icon="camera-retro" />


        <!-- Modal -->
        <div class="modal fade" :id="'avatar'+userData.uuid" tabindex="-1" aria-labelledby="photoModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close btn " data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body photo-modal">
                          <img :src="userData.avatar" 
                               :alt='"picture of " + userData.uuid' 
                               class="image-modal"/>               
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                    </div>
                </div>
            </div>
        </div>

        <div class="user-infos">

          <span class="username-value"><b>Username :</b> {{userData.username}}  </span>

          <span class="name-value">  {{userData.firstName + ' ' + userData.lastName}} </span>
  
          <span class="email-value"> <b>email :</b> {{userData.email}} </span>
          
          <span class="about-me-value"> <b>About me :</b> {{userData.aboutMe}} </span>
        </div>

    </section>
    
</template>

<script>
export default {
    props: {
        userData: {
            type: Object,
            default: () => { 
                return {}
            }
        }
    },

    components: { },

    computed: {
     
      currentUser() {
          return this.$store.state.auth.user;
      }, 
    },
    
}
</script>


<style lang="scss" scoped>
.wall-header{
    min-width: 100vw;
    height: 50vh;
    position: relative;

}
.background-image{
    // min-width: 100%;
    height: 60%;
    background-size: cover;
    background-repeat: no-repeat;
}
.user-infos{
    height: 40%;
    // border: 2px solid black;
    // position: relative;
    display: grid;
}

.user-avatar{
//   grid-row: 1 / span 1 ;
//   grid-column: 1 / span 1 ;
  padding-bottom: 1rem;
  max-width: 20vw; 
  position: absolute;
  bottom: 8rem;
  left: 40%;
  border-radius: 50% ;
  cursor: pointer;
}

.image-modal {
    max-width:100%; 
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%; 
}

#icon-camera-retro{
    font-size: 24px;
    color: rgb(80, 80, 80);
    position: absolute;
    right: 25%;
    bottom: 9rem;
    cursor: pointer;
}

.name-value {
    grid-row: 1 ;
    grid-column: 1 ;
    // max-width: 50%;
    font-size: 1.5rem;
    margin: auto;
}

.username-value {
    grid-row: 2 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}
.about-me-value {
    grid-row: 3 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}
.email-value {
    grid-row: 4 ;
    grid-column: 1 ;
    font-size: 0.95rem;
}
      
</style>