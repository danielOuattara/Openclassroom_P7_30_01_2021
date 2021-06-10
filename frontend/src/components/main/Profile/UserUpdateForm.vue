<template>
    <div class="user-update-form">
        <h2>Update your profile</h2>
            <form name="form" @submit.prevent="userUpdate">
                <div class="form-group">
                    <label for="firstname">Firstname : </label>
                    <input  type="text" 
                            placeholder="enter your firstname ..."
                            v-model="user.firstName" 
                            class="form-control" 
                            name="firstName"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('firstname')" 
                            role="alert"> Error with firstname !
                    </div>
                </div>

                <div class="form-group">
                    <label for="lastname">Lastname : </label>
                    <input  type="text" 
                            placeholder="enter your lastname ..."
                            v-model="user.lastName" 
                            class="form-control" 
                            name="lastName"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('lastname')" 
                            role="alert"> Error with lastname !
                    </div>
                </div>

                <div class="form-group">
                    <label for="username">Username : </label>
                    <input  type="text" 
                            placeholder="enter your username ..."
                            v-model="user.username" 
                            class="form-control" 
                            name="username"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('username')" 
                            role="alert"> Error with username !
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email : </label>
                    <input  type="email" 
                            placeholder="enter email ..."
                            v-model="user.email" 
                            class="form-control" 
                            name="email"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('email')" 
                            role="alert"> email must be valid
                    </div>
                </div>

                <div class="form-group">
                    <label for="avatar">Choose an avatar : </label>
                    <input  type="file" 
                            placeholder="choose an avatar ..."
                            class="form-control" 
                            name="avatar"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('avatar')" 
                            role="alert"> Error with avatar !
                    </div>
                </div>

                <div class="form-group">
                    <label for="value">About you : </label>
                    <textarea  name="aboutMe" 
                               placeholder="what about you ?"
                               type="text" 
                               cols="30" rows="2" 
                               class="form-control"
                               v-model="user.aboutMe">
                    </textarea>
                    <div class="alert alert-danger" 
                        v-if="errors.has('aboutMe')" 
                        role="alert"> Error with about me
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block"  :disabled="loading">
                        <span v-show="loading" 
                                class="spinner-border spinner-border-sm"></span>
                        <span class="">Update password</span>
                    </button>
                </div>
            </form>
            <div v-if="message" 
                class="alert" 
                :class="successful ? 'alert-success' : 'alert-danger'">{{message}}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import User from './../../../models/user';
export default {
    name: "Login",
    data() {
        return {
            user: new User('','','','','','','',''),
            loading: false,
            submitted: false,
            successful: false,
            selectedFile: '',
            message: '',

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
        ...mapActions(["updateUserAction"]),

        onFileSelect(event) {
            this.selectedFile = event.target.files[0];
        },
        async userUpdate() {
            try {
                this.message = '';
                this.submitted = true;
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }

                const userUuid = this.currentUser.uuid;
                // const file = new FormData();
                // file.append("image", this.selectedFile, this.selectedFile.name);
                // const config = {
                //     header: { "Content-Type": "multipart/form-data" },
                // };
                const data = { userUuid, ...this.user,/* ...file, config */ }
                console.table(data);
                const response = await this.$store.dispatch("updateUserAction", data);
                this.message = response;
                this.successful = true;
                this.loading = false;
            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
           }
        },
    }
};
</script>

<style lang="scss" scoped>

h2 {
    font-size: 1.5rem;
    padding: .25rem;
    margin: 1rem 0 2rem 0;
    border-bottom: 2px solid grey;
}
label {
  display: block;
//   margin: 1rem 0;

}


.btn-send-form {
    font-size: 20px;
    display: inline;
    margin: 0 2rem;
    padding: 0.25rem 2rem;
    // margin: auto;
    border-bottom: 2px dotted grey;
    &:hover{
        border-bottom: none;
        background: rgba(255, 0, 0, 0.392);
        border-radius: 0.5rem;
    }
}


</style>