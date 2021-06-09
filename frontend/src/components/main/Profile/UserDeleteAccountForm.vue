<template>
    <div class="password-update-form">
        <h2>Delete your account</h2>
        <form name="form" @submit.prevent="handlePasswordUpdate">

            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" 
                        placeholder=" enter your password..."
                        v-model="password.password" 
                        v-validate="'required|min:6|max:40'" 
                        class="form-control" 
                        ref="password"
                        name="password"/>

                <div   class="alert alert-danger" 
                        v-if="errors.has('password')" 
                        role="alert"> The new password is required !
                </div>
            </div>
            
            <div class="form-group">
                <button class="btn btn-primary btn-block"  :disabled="loading">
                    <span v-show="loading" 
                            class="spinner-border spinner-border-sm"></span>
                    <span class="">Delete my account</span>
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

    methods: {
        async handlePasswordUpdate() {
        //     try {
        //         this.loading = true;
        //         const isValid = await this.$validator.validateAll();
        //         if (!isValid) {
        //             this.loading = false;
        //             return;
        //         }
        //         if (this.user.emailOrUsername && this.user.password) {
        //             await this.$store.dispatch("auth/loginAction", this.user)
        //         }
        //     } catch(error) {
        //         this.loading = false;
        //         this.message = (error.response && error.response.data) || error.message || error.toString();
        //    }
        },
    }
};
</script>


<style lang="scss" scoped>

label {
  display: block;
  margin: 1rem 0;
}
h2 {
    font-size: 1.2rem;
    padding: 0 1.5rem;
    border-bottom: 2px solid rgb(255, 0, 0);
    margin: 1rem 0 2rem 0;
    color: red;
    display: inline-block;
}

.btn-primary { }

/* .form-check {
    margin:20px 0;
} */

</style>