<template>
    <div class="col-md-12">
        <div class="card card-container">
            <img id="profile-img" 
                 src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" 
                 class="profile-img-card" alt="standard profile icon ">
            <form name="form" @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="emailOrUsername">Username OR email : </label>
                    <input  type="text" 
                            placeholder="entre email OR username ..."
                            v-model="user.emailOrUsername" 
                            v-validate="'required'" 
                            class="form-control" 
                            name="emailOrUsername"/>

                    <div    class="alert alert-danger" 
                            v-if="errors.has('emailOrUsername')" 
                            role="alert"> Email OR Username required !
                    </div>
                </div>
                <div class="form-group">
                    <label for="password">Password : </label>
                    <input type="password" 
                           placeholder=" enter a password ..."
                           v-model="user.password" 
                           v-validate="'required'" 
                           class="form-control" 
                           name="password"/>

                    <div   class="alert alert-danger" 
                           v-if="errors.has('password')" 
                           role="alert"> Password is required !
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" 
                              class="spinner-border spinner-border-sm"></span>
                        <span class="">Login</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" 
                         class="alert alert-danger" 
                         role="alert">{{message}}</div>
                </div>
            </form>
            <div>
                <router-link to="/signin" class="nav-link" id="nav-link">
                    <font-awesome-icon icon="user-plus" /> Go to signin ?
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import User from './../models/user.js';
export default {
    name: "Login",
    data() {
        return {
            user: new User('',''),
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
  background-color: #f7f7f7;
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

</style>