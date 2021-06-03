<template>
    <div class="block-add-photo">
        <h3>Add some photo</h3>
        <!-- --------------------------------  Section: Add  Photo-->
        <form name="form" @submit.prevent="addOnePhoto">
              <div class="form-group">
                <label for="title">Choose a title : </label>
                <input  v-validate="'required'"  type="text" v-model="photo.title"
                        class="form-control" ref="title" name="title"/>
                <div class="alert alert-danger" v-if="errors.has('title')" role="alert">
                     A title is required
                </div>
              </div>

              <div class="form-group">
                <!-- <label for="filename" id="file-label"> choose a file ... : </label> -->
                <!-- next: hide input area, replace it by button -->
                <input 
                    id="file" type="file" 
                    v-validate="'required'" accept="image/*"
                    class="form-control input-photo" name="file" 
                    @change="onFileSelect" ref="imageFile"
                />
                <!-- <button @click="$refs.imageFile.click()"> Pick an image</button> -->
                <div 
                  class="alert alert-danger" v-if="errors.has('file')" 
                  role="alert">
                    An image required to submit a new photo
                </div>
              </div>

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span
                    v-show="loading"
                    class="spinner-border spinner-border-sm"
                  ></span>
                  <span class="">Post photo</span>
                </button>
              </div>

              <div class="form-group">
                <div v-if="message" class="alert alert-danger" role="alert">
                  {{ message }}
                </div>
              </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import Photo from "../../models/photo.js";
import authHeader from "../../services/auth.header.js";
import { mapActions } from "vuex";
export default {
  name: "AddPhoto",
  data() {
    return {
      photo: new Photo(""),
      loading: false,
      title: "",
      message: "",
      selectedFile: "",
      //   content: '',
      //   comments: '',
      //   likes:'',
    };
},

  methods: {
    ...mapActions(["addOnePhotoAction", "fetchAllPhotosAction"]),

    onFileSelect(event) {
      this.selectedFile = event.target.files[0];
    },

    async addOnePhoto() {
      // BACK UP: OK <<<<-----
      try {
          this.loading = true;
          const isValid = await this.$validator.validateAll();
          if (!isValid) {
            this.loading = false;
            this.photo.title = "";
            return;
          }
          const data = new FormData();
          data.append("title", this.photo.title);
          data.append("image", this.selectedFile, this.selectedFile.name);
          const config = {
            header: { "Content-Type": "multipart/form-data" },
          };
          await axios.post( "http://localhost:4200/api/photos", data, { headers: authHeader() },
            config );
          this.loading = false;
          this.$refs.imageFile.value = "";
          this.$refs.title.value = "";
          this.fetchAllPhotosAction();
      } catch (err) {
            this.loading = false;
            this.photo.title = "";
            this.message =
            (err.response && err.response.data) || err.message || err.toString();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.block-add-photo {
  background: rgb(213, 213, 213);
  border: 1px solid rgb(138, 138, 138);
  padding: 30px;
  border-radius: 8px;
}
</style>
