<template>

<div class="bloc-likes">
<!-- Before tEsting !!! -->
    <button class='btn-thumbs thumbs-up' 
            :disabled="disLikeBtnClicked"
            @click="likeBtnClicked=!likeBtnClicked, disLikeBtnInactive=!disLikeBtnInactive, onBtnDisLikeClick"
            id="thumbs-up" type="button"
            data-toggle="tooltip" data-placement="top" title="Like photo">
        <font-awesome-icon icon="thumbs-up" class="thumbs thumbs-likes"/>
        <span class="output likes-output"> {{countingLikes()}} </span>
    </button>
    <!-- <p>{{this.likeBtnClicked}}</p>
    <p>{{this.disLikeBtnInactive}}</p> -->

    <button class="btn-thumbs thumbs-down" 
            :disabled="likeBtnClicked" 
            @click="disLikeBtnClicked=!disLikeBtnClicked, likeBtnInactive=!likeBtnInactive, onBtnDisLikeClick"
            id="thumbs-down" type="button"
            data-toggle="tooltip" data-placement="top" title="Dislike photo">
        <font-awesome-icon icon="thumbs-down" class=" thumbs thumbs-dislikes" />
        <span class="output dislikes-output"> {{countingDisLikes()}} </span>
    </button>

    <!-- <p>{{this.disLikeBtnClicked}}</p>
    <p>{{this.likeBtnInactive}}</p> -->

    <!-- <p>{{photo.uuid}}</p> -->

    <!-- <button @click="getPhotoUuid"> Click</button> -->
</div>
</template>

<script>
import Like from '../../models/comment.js';
export default {
    props: ['item'],
    data() {
        return {
          like: new Like(''),

          likeBtnClicked: false,
          disLikeBtnClicked: false,
          
          likeBtnInactive: false,
          disLikeBtnInactive: false,

          disLikeBtnDisabled: false,
          likeBtnDisabled: false
        }
    },

    computed: {      
        currentUser() {
            return this.$store.state.auth.user;
        },

        gettingPhotoData() {
            return this.item;
        }
    },

    methods: {
      getPhotoUuid() {
        console.log(this.gettingPhotoData.uuid)
      },

      countingLikes() {
          let likesVotes = 0;
          for ( let vote of this.item.likes) {
            if (vote.value == 1) likesVotes++;
          }
          return likesVotes;
      },

      countingDisLikes() {
          let disLikesVotes = 0;
          for ( let vote of this.item.likes) {
            if (vote.value == -1) disLikesVotes++;
          }
          return disLikesVotes;
      },

      async onBtnLikeClick() {   
          console.log(this.likeBtnClicked);
          if(!this.likeBtnClicked) {
              try {
                //   this.likeBtnClicked = true;
                //   this.disLikeBtnInactive = true;
                  // document.getElementById("thumbs-up").classList.add("")
                  this.like = {value: 1}            
                  await this.$store.dispatch("sendOnePhotoLikesAction", this.like)
              } catch(error) {
                    this.message = (error.response && error.response.data) || error.message || error.toString();
              }
          }
          if(this.likeBtnClicked) {
              try {
                //   this.likeBtnClicked = false;
                //   this.disLikeBtnInactive = false;
                  document.getElementById("thumbs-up").classList.add(".btn-thumbs")
                  this.like = { value: -1}   
                  const data = {photoUuid: this.getPhotoUuid, value: -1 }         
                  await this.$store.dispatch("sendOnePhotoLikesAction", {data})
              } catch(error) {
                    this.message = (error.response && error.response.data) || error.message || error.toString();
              }
          }
      },


      async onBtnDisLikeClick() {
          if(!this.disLikeBtnClicked) {
              try {
                  this.disLikeBtnClicked = true;
                  this.likeBtnInactive = true;
                  // document.getElementById("thumbs-up").classList.add("")
                  this.like = { photoUuid: this.getPhotoUuid, value: -1}            
                  await this.$store.dispatch("sendOnePhotoLikesAction", this.like)
              } catch(error) {
                    this.message = (error.response && error.response.data) || error.message || error.toString();
              }
          }
          if(this.likeBtnClicked) {
              try {
                  this.disLikeBtnClicked = false;
                  this.likeBtnInactive = false;
                  document.getElementById("thumbs-down").classList.add(".btn-thumbs")
                  const data = { uuid: this.getPhotoUuid, value: 1}            
                  await this.$store.dispatch("sendOnePhotoLikesAction", data)
              } catch(error) {
                    this.message = (error.response && error.response.data) || error.message || error.toString();
              }
          }
      },

    },

    mounted() {
      this.countingLikes();
      this.countingDisLikes();
    }, 

}

</script>

<style lang="scss" >
/* ---- likes & dislikes button */

.bloc-likes {
    grid-row: 7 / span 1;
    grid-column: 4 / span 3;
    // border: 1px solid grey;
    display: inline-block;
}
.btn-thumbs {
    font-size: 1rem;
    border-style: none;
    // border-radius: 5px;
    color: grey;
    margin:  10px 0.5rem;
    padding: 0.1rem 0.55rem;
}
.thumbs-up {
    grid-row: 7 / span 1;
    grid-column: 3 / span 1;
    &:hover{
        cursor: pointer;
        background: black;
        color: white;
    }
}
.thumbs-down {
    grid-row: 7 / span 1;
    grid-column: 4 / span 1;
    &:hover{
        cursor: pointer;
        background: black;
        color: white;

    }
}
.output{
    font-size: 1rem;
}


button.thumbs-up:disabled {
  background: rgb(184, 184, 184);
}
button.thumbs-up:focus {
  background: rgba(14, 66, 163, 0.576);
  color: white;
  border-bottom: 1px solid blue;
}

button.thumbs-down:disabled {
  background: rgb(181, 181, 181);
}
button.thumbs-down:focus {
  background: #d6a606;
  border-bottom: 1px solid rgb(255, 89, 0);
}

</style>
