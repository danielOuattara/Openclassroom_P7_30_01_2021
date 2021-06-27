<template>
    <div class="user-update-background-image" >

         <!-- <form name="form" @submit.prevent="addPhoto" class="block-add-photo">
              <div class="form-group">
                <label for="filename" 
                       id="image-label" 
                       @click="$refs.imageFile.click()"
                       type="button"
                       class= "btn btn-primary btn-block"> 
                    <span v-if="!fileSelected">Click to choose a photo </span>
                    <span v-if="fileSelected" id="photo-is-selected"> Photo Selected</span>
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
        </form> -->


        <div>
            <input type="file"
                   accept="image/jpg image/jpeg image/png"
                   @change="selectAndUpdate"
                   ref="backgroundImage"
                   style="display:none" />

            <span type="button" 
                  @click="$refs.backgroundImage.click()"> background
                <font-awesome-icon v-if="!fileSelected" id="icon-add-background" icon="image"/> 
            </span>
        </div>


        <!-- <label for="filename" 
            id="image-label" 
            @click="$refs.imageFile.click()"
            class= "btn"> 
            <span type="button" v-if="!fileSelected">
                Avatar 
                <font-awesome-icon v-if="!fileSelected" id="icon-add-photo" icon="user-circle"/> 
            </span>
            <span type="button" v-if="fileSelected" id="photo-is-selected"> Photo Selected</span>
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
    </div>-->
    </div> 
</template>

<script>
import { mapActions} from "vuex";
export default {
    name: "Login",
    props:['formToggler'],
    data() {
        return {
            loading: false,
            submitted: false,
            successful: false,
            selectedFile: '',
            message: '',
            fileSelected: false,
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },

        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        ...mapActions(["updateUserBackgroundImageAction", "getOneUserAction"]),

        async selectAndUpdate(event) {
            this.selectedFile = event.target.files[0];
            this.fileSelected = !this.fileSelected;

            try {
                // this.message = '';
                // this.submitted = true;
                // this.loading = true;
                // const isValid = await this.$validator.validateAll();
                // if (!isValid) {
                //     this.loading = false;
                //     return;
                // }
                const userUuid = this.currentUser.uuid;
                const formData = new FormData();
                const multerEvent = "backgrounds";
                formData.append("event", multerEvent);
                formData.append("image", this.selectedFile, this.selectedFile.name);
                const config = {
                        header: { "Content-Type": "multipart/form-data" }
                };

                const data = { userUuid, formData, config }
                /* const response =  */await this.$store.dispatch("updateUserBackgroundImageAction", data);
                // this.message = response;
                this.getOneUserAction(userUuid);
                // this.successful = true;
                // this.loading = false;

            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
           }
        },
    }
};
</script>

<style lang="scss" scoped>

// h2 {
//     font-size: 1.5rem;
//     padding: .25rem;
//     margin: 1rem 0 2rem 0;
//     border-bottom: 2px solid grey;
// }

// .btn-send-form {
//     font-size: 20px;
//     display: inline;
//     margin: 0 2rem;
//     padding: 0.25rem 2rem;
//     // margin: auto;
//     border-bottom: 2px dotted grey;
//     &:hover{
//         border-bottom: none;
//         background: rgba(255, 0, 0, 0.392);
//         border-radius: 0.5rem;
//     }
// }

// #icon-paper-plane-user-data{
//   margin-left: 1rem;
// }


</style>