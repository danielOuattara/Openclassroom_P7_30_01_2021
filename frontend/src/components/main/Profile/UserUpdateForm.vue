<template>
    <div class="user-update-form">
            <form name="form" @submit.prevent="handleUserUpdate">

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
                            role="alert"> Valid email is required !
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
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" 
                              class="spinner-border spinner-border-sm"></span>
                        <span class="">Send Update</span>
                    </button>
                </div>
                <div class="form-group">
                    <div v-if="message" 
                         class="alert alert-danger" 
                         role="alert">{{message}}
                    </div>
                </div>
            </form>
    </div>
</template>

<script>
import User from './../../../models/user';
export default {
    name: "Login",
    data() {
        return {
            user: new User('','','','','','','',''),
            loading: false,
            message: ''
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    // created() {
    //     if (this.loggedIn) {
    //         this.$router.push("/profile");
    //     }
    // },
    methods: {
        async handleUserUpdate() {
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                    await this.$store.dispatch("auth/loginAction", this.user)
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