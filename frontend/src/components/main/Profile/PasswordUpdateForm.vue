<template>
    <div class="password-update-form">
            <form name="form" @submit.prevent="handlePasswordUpdate">

                <div class="form-group">
                    <label for="oldPassword">Old Password : </label>
                    <input  type="text" 
                            placeholder="enter the old password "
                            v-model="password.oldPassword" 
                            v-validate="'required'" 
                            class="form-control" 
                            name="oldPassword"/>

                    <div    class="alert alert-danger" 
                            v-if="errors.has('oldPassword')" 
                            role="alert"> The old password is required !
                    </div>
                </div>

                <div class="form-group">
                    <label for="newPasswordOne">Password : </label>
                    <input type="password" 
                           placeholder=" enter your new password..."
                           v-model="password.passwordNewOne" 
                           v-validate="'required'" 
                           class="form-control" 
                           name="password"/>

                    <div   class="alert alert-danger" 
                           v-if="errors.has('newPasswordOne')" 
                           role="alert"> The new password is required !
                    </div>
                </div>

                <div class="form-group">
                    <label for="newPasswordTwo">Password : </label>
                    <input type="password" 
                           placeholder=" enter again your new password..."
                           v-model="password.passwordNewTwo" 
                           v-validate="'required'" 
                           class="form-control" 
                           name="password"/>

                    <div   class="alert alert-danger" 
                           v-if="errors.has('newPasswordTwo')" 
                           role="alert"> The new password is required !
                    </div>
                </div>
                
                <div class="form-group">
                    <button class="btn btn-primary btn-block" style="margin:64px 0px 16px 0" :disabled="loading">
                        <span v-show="loading" 
                              class="spinner-border spinner-border-sm"></span>
                        <span class="">Login</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" 
                         class="alert alert-danger" 
                         role="alert">{{message}}
                    </div>
                </div>
            </form>
            <div>
                <router-link to="/signin" class="nav-link" id="nav-link">
                    Switch to signin <font-awesome-icon icon="user-plus" /> 
                </router-link>
            </div>
        <div class="form-check">
            <router-link 
                    style="display:inline; 
                           font-size:14px; 
                           margin-left:-10px;
                           color:black;
                           text-decoration: underline dotted blue;"
                    to="/help" 
                    class="nav-link" 
                    id="nav-link"> 
                Troubles with login ? 
            </router-link>
        </div>
    </div>
</template>

<script>
import Password from '../../../models/password';
export default {
    name: "Login",
    data() {
        return {
            password: new Password('','',''),
            loading: false,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        async handleLogin() {
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                if (this.user.emailOrUsername && this.user.password) {
                    await this.$store.dispatch("auth/loginAction", this.user)
                    this.$router.push("/home");
                }
            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
           }
        },
    }
};
</script>


<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
  border-radius: 8px;
}

.card {
  background-color: rgba(247, 247, 247, 0.6);;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}

.btn-primary {
    font-size: 24px!important
}

#nav-link {
    text-align: right;
    color:#23923d
}
.form-check {
    margin:20px 0;
}

</style>