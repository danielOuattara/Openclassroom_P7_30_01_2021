
<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Wall of photo</h3>
    </header>
    <!-- <h3>{{content}}</h3> -->

    <ul> 
      <li v-for='(item, index) in this.content' :key='index'>
        <div>
          <img :src='item.imageUrl'
                :alt='"picture of " + item.title'
                class="photos">
          <!-- <p :></p> -->
        </div>
      </li>
    </ul>
  </div>

  
</template>

<script>

import PhotoService from './../services/photo.service.js'
import PhotoServiceComments from './../services/photo.service.comments.js'
import PhotoServiceLikes from './../services/photo.service.likes.js'
export default {
    name: 'Home',
    data() {
        return {
        content: '',
        comments: '',
        likes:'',
        };
    },

    mounted() {

        PhotoService.getAllPhoto()
        .then( response => this.content = response.data,
               error => this.content = (error.response && error.response.data) || error.message || error.toString()  
          )

        PhotoServiceComments.getAllPhotoComment() 
          .then (res => this.comments = res.data)
          .catch(err => this.comments = (err.response && err.response.data) || err.message || err.toString()
        )
        
        PhotoServiceLikes.photoLikesCounting() 
          .then (res => this.likes = res.data)
          .catch(err => this.likes = (err.response && err.response.data) || err.message || err.toString()
        )
        




      },


};

</script>

<style scoped>

* {
  list-style-type: none;
}
/* img {
  width: 500px;
  height: inherit;
  margin: auto
} */

.photos {
  /* display: block; */
  /* margin-left: auto;
  margin-right: auto; */
  max-width: 100%; 
  height: auto;
  /* border: 5px solid #ddd; Gray border */
  /* border-radius: 4px;  Rounded border */
  /* padding: 5px; Some padding */
  /* width: 150px; Set a small width */
  /* margin: 10px; */
}
</style>