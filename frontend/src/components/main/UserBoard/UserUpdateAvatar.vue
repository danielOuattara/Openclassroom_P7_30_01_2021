<template>
    <div class="user-update-background-image" >
        <div>
            <input type="file"
                   accept="image/jpg image/jpeg image/png"
                   @change="selectAndUpdateAvatar"
                   ref="avatar"
                   style="display:none" />

            <span type="button" aria-role="button" tabindex="0" role="button"
                  @click="$refs.avatar.click()"> avatar
                <font-awesome-icon v-if="!fileSelected" id="icon-update-avatar" icon="user-circle"/> 
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
            selectedFile: '',
            fileSelected: false,
            message:'',
            successful: false
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        ...mapActions(["updateUserAvatarAction", "getOneUserAction"]),

        async selectAndUpdateAvatar(event) {
            this.selectedFile = event.target.files[0];
            this.fileSelected = !this.fileSelected;
            try {
                const userUuid = this.currentUser.uuid;
                const formData = new FormData();
                const multerEvent = "avatars";
                formData.append("event", multerEvent);
                formData.append("image", this.selectedFile, this.selectedFile.name);
                const config = {
                        header: { "Content-Type": "multipart/form-data" }
                };
                
                const data = { userUuid, formData, config }
                const response = await userService.updateUserAvatar( userUuid, data, config)
                this.message= response.data;
                this.successful = true;
                this.getOneUserAction(userUuid);
            } catch(error) {
                this.successful= false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
           }
        },
    }
};
</script>
