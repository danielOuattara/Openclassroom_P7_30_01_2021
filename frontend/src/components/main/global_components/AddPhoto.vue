<template>
    <section  class="add-photo-section">
        <h2>Add a photo</h2>
        <!-- --------------------------------  Section: Add  Photo-->
        <form name="form" @submit.prevent="addPhoto" class="block-add-photo">
              <div class="form-group">
                <label for="title">Choose a title : </label>
                <input v-validate="'required'"  
                       type="text" 
                       placeholder="enter a photo title ..."
                       v-model="photo.title"
                       class="form-control" 
                       ref="title" 
                       name="title"/>
                <div class="alert alert-danger" 
                     v-if="errors.has('title')" role="alert">
                    A title is required
                </div>
              </div>

              <div class="form-group">
                <label for="filename" 
                       id="image-label" 
                       @click="$refs.imageFile.click()"
                       type="button"
                       class= "btn btn-primary btn-block"> 
                    <span v-if="!fileSelected">Click to choose a photo </span>
                    <span v-if="fileSelected" id="photo-is-selected"> Photo Selected</span>
                    
                    <font-awesome-icon v-if="!fileSelected" id="icon-add-photo" icon="camera-retro" /> 
                    <font-awesome-icon v-if="fileSelected"  id="icon-check-circle" icon="check-circle" /> 
                </label>
                <input id="file" 
                       type="file" 
                       v-validate="'required'" 
                       accept="image/jpg image/jpeg image/png"
                       class="form-control input-photo" 
                       name="file" 
                       style="display:none"
                       @change="onFileSelect" 
                       placeholder="choose a file"
                       ref="imageFile" />
                
                <div class="alert alert-danger" 
                     v-if="errors.has('file')" role="alert">
                    A image file is required to submit a new photo
                </div>
              </div>

              <div class="form-group" v-show="fileSelected || this.photo.title">
                <span @click="onReset" type="button" class="btn btn-dark btn-block">
                  Cancel
                 <font-awesome-icon id="icon-times-circle" icon="times-circle" />
                </span>
              </div>

              <div class="form-group">
                <button v-show="fileSelected && this.photo.title" class="btn btn-success btn-block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm"></span>
                  <span>
                    Sent post  
                    <font-awesome-icon id="icon-paper-plane" icon="paper-plane" />
                  </span>
                </button>
              </div>

        </form>
  </section>
</template>

<script>
import Photo from "../../../models/photo.js";
import { mapActions} from "vuex";
export default {
    name: "AddPhoto",
    data() {
        return {
            photo: new Photo(""),
            loading: false,
            selectedFile: "",
            fileSelected: false,
        };
    },
    computed: {
      currentUser() {
          return this.$store.state.auth.user;
      }, 
    },

    methods: {
        ...mapActions(["addOnePhotoAction", "getAllPhotosAction","getOneUserAction"]),

        onFileSelect(event) {
          this.selectedFile = event.target.files[0];
          this.fileSelected = !this.fileSelected;
        },

        onReset() {
          this.selectedFile = "";
          this.fileSelected= false;
          this.photo.title = "";
          this.$validator.reset();
        },

        async addPhoto() {
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const formData = new FormData();
                formData.append("title", this.photo.title);
                formData.append("image", this.selectedFile, this.selectedFile.name);
                await this.$store.dispatch("addOnePhotoAction", formData);
                this.loading = false;
                this.getAllPhotosAction();
                this.getOneUserAction(this.currentUser.uuid);
                this.onReset();
            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        },
  },
};
</script>

<style lang="scss" scoped>

.block-add-photo {
  margin: 1rem 0 3rem;
  border: 1px solid rgb(194, 194, 194);
  padding: 1rem;
  border-radius: 10px;
}
h2 {
  font-size: 22px;
  border-bottom: 1px solid rgb(199, 199, 199);
  padding-bottom: 1rem;
  margin-top: 2rem;
}
#icon-add-photo{
  margin-left: 1rem;
}

#icon-paper-plane{
  margin-left: 4rem;
}

#icon-check-circle{
  margin-left: 2rem
}
#icon-times-circle{
  margin-left: 5rem;
}
</style>
