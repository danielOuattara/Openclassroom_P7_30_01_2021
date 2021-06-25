<template>
    <div class="block-add-photo">
        <h3>Add some photo</h3>
        <!-- --------------------------------  Section: Add  Photo-->
        <form name="form" @submit.prevent="addPhoto">
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
                       class= "btn btn-info btn-block"> 
                    Click to choose a photo 
                    <font-awesome-icon id="icon-add-photo" icon="camera-retro" /> 
                </label>
                <!-- next: hide input area, replace it by button -->
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

              <div class="form-group">
                <button class="btn btn-primary btn-block" :disabled="loading">
                  <span v-show="loading"
                        class="spinner-border spinner-border-sm">
                  </span>
                  <span class="">Post photo  
                    <font-awesome-icon id="icon-paper-plane" icon="paper-plane" />
                  </span>
                </button>
              </div>
        </form>
  </div>
</template>

<script>
import Photo from "../../models/photo.js";
import { mapActions} from "vuex";
export default {
    name: "AddPhoto",
    data() {
        return {
            photo: new Photo(""),
            loading: false,
            selectedFile: "",
        };
    },

    methods: {
        ...mapActions(["addOnePhotoAction", "getAllPhotosAction"]),

        onFileSelect(event) {
          this.selectedFile = event.target.files[0];
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
              this.$validator.reset();
              this.photo.title= ''
              this.clearInputFileAfterSubmit();
          } catch(error) {
              this.loading = false;
              this.message = (error.response && error.response.data) || error.message || error.toString();
          }
      },

      clearInputFileAfterSubmit() {
        document.getElementById("file").value = '';
      }
  },
};
</script>

<style lang="scss" scoped>
.block-add-photo {
  margin-top: 1rem;
  background: rgb(213, 213, 213);
  border: 1px solid rgb(138, 138, 138);
  padding: 1rem 2rem;
  border-radius: 8px;
}
#icon-add-photo{
  margin-left: 1rem;
}
#icon-add-photo{
  margin-left: 1rem;
}

#icon-paper-plane{
  margin-left: 1rem;
}
</style>
