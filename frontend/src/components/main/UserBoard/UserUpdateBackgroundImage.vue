<template>
    <div class="user-update-background-image" >
        <div>
            <input type="file"
                   accept="image/jpg image/jpeg image/png"
                   @change="selectAndUpdateBackgroundImage"
                   ref="backgroundImage"
                   style="display:none" />

            <span type="button" 
                  @click="$refs.backgroundImage.click()"> background
                <font-awesome-icon v-if="!fileSelected" id="icon-update-background" icon="image"/> 
            </span>
        </div>
        <!-- <div v-if="message" class="alert message-zone" 
             :class="successful ? 'alert-success' : 'alert-danger'">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> {{message}}
        </div> -->
    </div> 
</template>

<script>
import { mapActions} from "vuex";
import userService from './../../../services/user.service';
export default {
    data() {
        return {
            successful: false,
            selectedFile: '',
            message: '',
            fileSelected: false,
        };
    },
    computed: {

        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        ...mapActions(["getOneUserAction"]),

        async selectAndUpdateBackgroundImage(event) {
            this.selectedFile = event.target.files[0];
            this.fileSelected = !this.fileSelected;
            try {
                const userUuid = this.currentUser.uuid;
                const formData = new FormData();
                const multerEvent = "backgrounds";
                formData.append("event", multerEvent);
                formData.append("image", this.selectedFile, this.selectedFile.name);
                const config = {
                        header: { "Content-Type": "multipart/form-data" }
                };

                const data = { userUuid, formData, config }
                const response = await userService.updateUserBackgroundImage( userUuid, data, config)
                this.message = response.data;
                this.successful = true;
                this.getOneUserAction(userUuid);
            } catch(error) {
                this.successful = false;
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