<template>
  <div class="container">
    <header class="jumbotron">
      <h3>Wall of photo</h3>
    </header>
    <div>
      <h3>Add Photo</h3> <!-- --------------------------------  Section: Add  Photo-->
    
        <form name="form" @submit.prevent="onUpload">
                <div class="form-group">
                    <label for="title">Choose a title  : </label>
                    <input  
                        @change="showEvent"
                        id="title"
                        v-validate="'required'" 
                        type="text" 
                        v-model="photo.title" 
                        class="form-control" 
                        name="title"/>
                    <div    
                      class="alert alert-danger" 
                      v-if="errors.has('title')" 
                      role="alert"> A title is required !
                    </div>
                </div>

                <div class="form-group">
                    <!-- <label for="filename" id="file-label"> choose a file ... : </label> -->
                    <!-- next: hide input area, replace it by button -->
                    <input 
                        id="file"
                        type="file" 
                        v-validate="'required'"
                        accept="image/*"
                        class="form-control input-photo" 
                        name="file"
                        @change="onFileSelect"
                        ref="imageFile"
                     />

                    <!-- <button @click="$refs.imageFile.click()"> Pick an image</button> -->

                    <!-- <button @click="onUpload">Upload</button> -->

                    <div 
                        class="alert alert-danger" 
                        v-if="errors.has('file')" 
                        role="alert"> An Image is required to submit a new photo!
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" 
                              class="spinner-border spinner-border-sm"></span>
                        <span class="">Post photo</span>
                    </button>
                </div>

                <div class="form-group">
                    <div 
                        v-if="message" 
                        class="alert alert-danger" 
                        role="alert">{{message}}
                    </div>
                </div>
            </form>
      </div>

      <!-- ---------------------------------------------- Section: Get All photos -->
      <h3>View Photo</h3>
      <div class="todos">
        <div v-for="photo in allPhotos" 
             :key="photo.id"
             class="photo-container">
              <img :src="photo.imageUrl" 
                   :alt='"picture of " + photo.title'
                   class="photos">
        </div>
    </div>

    <!-- ----------------------------------------------------- -->

  </div>
</template>

<script>
import axios from "axios";
import Photo from './../models/photo.js';
import authHeader from "./../services/auth.header.js";
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Home',
    data() {
        return {
          photo: new Photo(''),
          loading: false,
          message:'',
          // filename: '',
          selectedFile:'',

          content: '',
          comments: '',
          likes:'',
        };
    },

    computed: {
          ...mapGetters(['allPhotos']),
    },

    methods: {

      showEvent(event) {
        console.log(event);
      },

      onFileSelect(event) {
        this.selectedFile =  event.target.files[0];
        console.log( "selectedFile  ="  , this.selectedFile)
      },

      onUpload() { // BACK UP: OK <<<<-----

        this.loading = true;
        this.$validator.validateAll()
        .then( isValid => {
            if(!isValid) {
                this.loading = false;
                return;
            }
            const data = new FormData();
            data.append('title', this.photo.title)
            data.append('image', this.selectedFile, this.selectedFile.name)
            const config =  {
              header : {
                  'Content-Type': 'multipart/form-data'
              }
            }
            axios.post(
              'http://localhost:4200/api/photos',  
              data, 
              { headers: authHeader() },
              config,
              // { onUploadProgress: uploadEvent => {
              //     console.log('Upload Progress : ' + Math.round( uploadEvent.loading / uploadEvent.total * 100 ) + ' %' )
              //   } 
              // }
            )
            .then( () => {
                // console.log(res);
                this.loading = false;
                this.input.value = ''
                this.fetchAllPhotosAction()
              },
                error => {
                  this.loading = false;
                  this.photo.title ='';
                  this.input.value= '';

                  this.message = (error.response && error.response.data) || error.message || error.toString();
                }
            )
        });
      },



      // onUpload() { // BACK UP: OK <<<<-----
      //   const data = new FormData();
      //   data.append('title', this.photo.title)
      //   data.append('image', this.selectedFile, this.selectedFile.name)
      //   const config =  {
      //     header : {
      //         'Content-Type': 'multipart/form-data'
      //     }
      //   }
      //   axios.post(
      //     'http://localhost:4200/api/photos',  
      //     data, 
      //     { headers: authHeader() },
      //     config,
      //     // { onUploadProgress: uploadEvent => {
      //     //     console.log('Upload Progress : ' + Math.round( uploadEvent.loading / uploadEvent.total * 100 ) + ' %' )
      //     //   } 
      //     // }
      //   )
      //   .then( res=> {
      //       console.log(res);
      //       // this.$forceUpdate();
      //       this.fetchAllPhotosAction()
      //     },
      //       error => {
      //          this.loading = false;
      //          this.photo.title ='';
      //          this.input.value= '';

      //          this.message = (error.response && error.response.data) || error.message || error.toString();
      //       }
      //   )
      // },


//==============================================================

      ...mapActions(['fetchAllPhotosAction', 'addOnePhotoAction']),
  
    },

    created() {
      this.fetchAllPhotosAction();
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
.photo-container {
  margin : 30px; 
  border: 1px solid lightblue;
  padding: 20px;
}

</style>