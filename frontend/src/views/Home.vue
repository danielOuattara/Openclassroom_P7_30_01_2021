<template>
  <div class="container">
    <div class="jumbotron">
      <h3>Wall of photo</h3>
    </div>
    <div>
      <h3>Add Photo</h3> <!-- --------------------------------  Section: Add  Photo-->
        <form name="form" @submit.prevent="addOnePhoto">
                <div class="form-group">
                    <label for="title">Choose a title  : </label>
                    <input  
                        v-validate="'required'" 
                        type="text" 
                        v-model="photo.title" 
                        class="form-control" 
                        ref="title"
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

      <h3>View Photo</h3>  <!-- ---------------------------------------------- Section: Get All photos -->
      <div class="photos">
        <div v-for="photo in allPhotos" 
             :key="photo.id"
             class="photo-container">
              <!-- <h4>{{photo}}</h4> -->

              <div>
                <span> {{photo.title}}</span>
                <span> {{photo.ownerId}}</span>
                <!-- <span> {{photo.imageUrl}}</span> -->
                <!-- <span> {{photo.owner.firstName}}</span> -->
                <!-- <span> {{photo.owner.firstName}}</span> -->


              </div>
              <img :src="photo.imageUrl" 
                   :alt='"picture of " + photo.title'
                   class="photos">
              <br><hr><br>
        </div> 
        <!-- ----------------------------------------------------- -->
      </div> 
  </div>
</template>

<script>
// import axios from "axios";
import Photo from './../models/photo.js';
// import authHeader from "./../services/auth.header.js";
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'Home',
    data() {
        return {
          photo: new Photo('', ''),
          loading: false,
          title:'',
          message:'',
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

      ...mapActions(['fetchAllPhotosAction'/* , 'addOnePhotoAction' */]),


      //   setInterval(() => { 
      //     console.log("hello refresh one") }, 3000)
      // })

      // setInterval(()=> { console.log("refresh photos : "); this.fetchAllPhotosAction()}, 5000),


      // refreshPhotos: ()=> {
      //   setInterval(()=> {
      //     console.log("hello refresh ");
      //     this.fetchAllPhotosAction()
      //     }, 1000)
      // },

      onFileSelect(event) {
        this.selectedFile =  event.target.files[0];
      },

      async addOnePhoto() { //
          try{
            this.loading = true;
            const isValid = await this.$validator.validateAll()
            if(!isValid) {
                this.loading = false;
                this.photo.title= "";
                return;
            }
            
            await this.$store.dispatch("photo/addOnePhotoAction", this.photo)
            await this.fetchAllPhotosAction()
            this.loading = false;
            this.$refs.imageFile.value = '';
            this.$refs.title.value = '';
            // this.photo.title = '';

          } catch(error) {
              this.loading = false;
              this.photo.title ='';
              this.$refs.title.value = '';
              this.message = (error.response && error.response.data) || error.message || error.toString();
            }
      },

      // addOnePhoto() { //  // BACK UP ###
      //   this.loading = true;
      //   this.$validator.validateAll()
      //   .then( isValid => {
      //       if(!isValid) {
      //           this.loading = false;
      //           this.photo.title= "";
      //           return;
      //       }

      //       if(this.photo.title ) {     //addOnePhotoAction
      //         this.$store.dispatch("photo/addOnePhotoAction", this.photo)
      //         .then(() => {
      //             this.fetchAllPhotosAction()
      //             this.loading = false;
      //             this.$refs.imageFile.value = '';
      //             this.$refs.title.value = '';
      //           },
      //             error => {
      //               this.loading = false;
      //               this.photo.title ='';
      //               this.message = (error.response && error.response.data) || error.message || error.toString();
      //             }
      //         )
      //     }
      //   });
      // },


      // addOnePhoto() { // BACK UP: OK <<<<-----
      //   this.loading = true;
      //   this.$validator.validateAll()
      //   .then( isValid => {
      //       if(!isValid) {
      //           this.loading = false;
      //           this.photo.title= "";
      //           return;
      //       }
      //         const data = new FormData();
      //         data.append('title', this.photo.title)
      //         data.append('image', this.selectedFile, this.selectedFile.name)
      //         const config =  {
      //           header : {'Content-Type': 'multipart/form-data' }
      //         }

      //       if(this.photo.title ) {
      //         axios.post( 'http://localhost:4200/api/photos', data, { headers: authHeader() }, config )
      //         .then(() => {
      //             this.loading = false;
      //             this.$refs.imageFile.value = '';
      //             this.$refs.title.value = '';
      //             this.fetchAllPhotosAction()
      //           },
      //             error => {
      //               this.loading = false;
      //               this.photo.title ='';
      //               this.message = (error.response && error.response.data) || error.message || error.toString();
      //             }
      //         )
      //     }
      //   });
      // },
      
      
    },

    created() {
      this.fetchAllPhotosAction();
    },

    mounted() {
      // setInterval(()=> { console.log("refresh photos : "); this.fetchAllPhotosAction()}, 5000) 
    }

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