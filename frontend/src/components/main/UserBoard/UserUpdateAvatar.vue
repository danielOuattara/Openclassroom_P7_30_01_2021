<template>
    <!-- <div class="user-update-form" v-if="formToggler">
        <h2>Update your profile</h2>
            <form name="form" @submit.prevent="userUpdateAvatar">
                <div class="form-group">
                    <label for="useravatar">Avatar: </label>
                    <input  type="file" 
                            class="form-control" 
                            ref="file"
                            @change="changeAvatar"
                            name="username"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('username')" 
                            role="alert"> Error with username !
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block"  :disabled="loading">
                        <span v-show="loading" 
                                class="spinner-border spinner-border-sm"></span>
                        <span class="">Update profile <font-awesome-icon id="icon-paper-plane-user-data" icon="paper-plane" /></span>
                    </button>
                </div>
            </form>
    </div> -->

    <!-- <div class="hello">
        <input type="file" accept="image/*" class="hidden" ref="file" @change="change" style="display:none">
        <button @click="browse" >Browse Image</button>
        <img :src="avatarSelected" alt="avatar">
  </div> -->
  <div></div>
</template>

<script>
// import { mapActions} from "vuex";
export default {
    // props:['formToggler'],
    props: {
    value: File,
  }, 
    data() {
        return {
            // loading: false,
            // submitted: false,
            // successful: false,
            // selectedFile: '',
            // fileSelected: false,
            // message: '',
            avatarSelected: null,
        };
    },
    // computed: {
    //     loggedIn() {
    //         return this.$store.state.auth.status.loggedIn;
    //     },

    //     currentUser() {
    //         return this.$store.state.auth.user;
    //     },
    // },

    methods: {
        browse() {
            this.$refs.file.click()
        },

      change(event) {
        this.$emit('input', event.target.files[0]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0])
        reader.onload = (event) => {
            this.avatarSelected = event.target.result;
        }

    }
        // ...mapActions(["updateUserAvatarAction", "getOneUserAction"]),

        // onFileSelect(event) {
        //     this.selectedFile = event.target.files[0];
        //     this.fileSelected = !this.fileSelected;
        // },

        // onReset() {
        //   this.selectedFile = "";
        //   this.fileSelected= false;
        //   this.photo.title = "";
        //   this.$validator.reset();
        // },

        // async userUpdateAvatar() {
        //     try {
        //         this.message = '';
        //         this.submitted = true;
        //         this.loading = true;
        //         const isValid = await this.$validator.validateAll();
        //         if (!isValid) {
        //             this.loading = false;
        //             return;
        //         }
        //         const userUuid = this.currentUser.uuid;
        //         const formData = new FormData();
        //         const config = {
        //                 header: { "Content-Type": "multipart/form-data" }
        //         };
        //         formData.append("image", this.selectedFile, this.selectedFile.name);
        //         const data = { userUuid, formData, config }

        //         const response = await this.$store.dispatch("updateUserAvatarAction", data);
        //         this.message = response;
        //         this.getOneUserAction(userUuid)
        //         this.successful = true;
        //         this.loading = false;

        //     } catch(error) {
        //         this.loading = false;
        //         this.message = (error.response && error.response.data) || error.message || error.toString();
        //    }
        // },
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
// label {
// //   display: block;
// //   margin: 1rem 0;

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