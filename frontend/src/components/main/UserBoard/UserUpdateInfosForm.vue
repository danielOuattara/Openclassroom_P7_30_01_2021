<template>
    <div class="user-update-form" v-if="formToggler">
        <h2>Update your profile</h2>
            <form name="form" @submit.prevent="userUpdate">
                <div class="form-group">
                    <label for="firstName">Firstname : </label>
                    <input type="text" 
                           placeholder="enter your firstname ..."
                           v-model="user.firstName" 
                           class="form-control" 
                           name="firstName"
                           id="firstName"/>
                    <div   class="alert alert-danger" 
                           v-if="errors.has('firstname')" 
                           role="alert"> Error with firstname !
                    </div>
                </div>

                <div class="form-group">
                    <label for="lastName">Lastname : </label>
                    <input type="text" 
                           placeholder="enter your lastname ..."
                           v-model="user.lastName" 
                           class="form-control" 
                           name="lastName"
                           id="lastName"/>
                    <div class="alert alert-danger" 
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
                            name="username"
                            id="username"/>
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
                            name="email"
                            id="email"/>
                    <div    class="alert alert-danger" 
                            v-if="errors.has('email')" 
                            role="alert"> email must be valid
                    </div>
                </div>

                <div class="form-group">
                    <label for="aboutMe">About you : </label>
                    <textarea  name="aboutMe" 
                               placeholder="what about you ?"
                               type="text" 
                               cols="30" rows="2" 
                               class="form-control"
                               id="aboutMe"
                               v-model="user.aboutMe">
                    </textarea>
                    <div class="alert alert-danger" 
                        v-if="errors.has('aboutMe')" 
                        role="alert"> Error with about me
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading"
                            style="backgroundColor:blue">
                        <span v-show="loading" 
                                class="spinner-border spinner-border-sm"></span>
                        <span class="">Update profile <font-awesome-icon id="icon-paper-plane-user-data" icon="paper-plane" /></span>
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
import { mapActions} from "vuex";
import userService from './../../../services/user.service.js'
import User from '../../../models/user';
export default {
    name: "Login",
    props:['formToggler'],
    data() {
        return {
            user: new User("", "", "", "", "", "", ""),
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
        ...mapActions(["updateUserInfosAction", "getOneUserAction"]),

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
                const formData = new FormData();

                if( this.user.firstName) {
                    formData.append("firstName", this.user.firstName);
                }
                if( this.user.lastName) {
                    formData.append("lastName", this.user.lastName);
                }
                if( this.user.email) {
                    formData.append("email", this.user.email);
                }
                if( this.user.aboutMe) {
                    formData.append("aboutMe", this.user.aboutMe);
                }
                if( this.user.username) {
                    formData.append("username", this.user.username);
                }        
                const data = { userUuid, formData }
                // const response = await this.$store.dispatch("updateUserInfosAction", data);
                const response = await userService.updateUserInfos(userUuid, data);
                this.getOneUserAction(userUuid);
                this.successful = true;
                this.loading = false;
                this.message = response.data;

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
//   display: block;
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

#icon-paper-plane-user-data{
  margin-left: 1rem;
}


</style>