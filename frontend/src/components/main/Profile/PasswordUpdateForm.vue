<template>
    <div class="password-update-form">
        <h2>Update your password</h2>
        <form name="form" @submit.prevent="updatePassword">
            <div class="form-group">
                <label for="passwordOld">Old Password : </label>
                <input  type="password" 
                        v-validate="'required|min:6|max:40'" 
                        placeholder="enter the old password "
                        v-model="passwords.passwordOld" 
                        class="form-control" 
                        name="passwordOld"/>

                <div    class="alert alert-danger" 
                        v-if="errors.has('passwordOld')" 
                        role="alert"> The old password is required !
                </div>
            </div>

            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" 
                        placeholder=" enter your new password..."
                        v-model="passwords.password" 
                        v-validate="'required|min:6|max:40'" 
                        class="form-control" 
                        ref="password"
                        name="password"/>

                <div   class="alert alert-danger" 
                        v-if="errors.has('password')" 
                        role="alert"> new password is required
                </div>
            </div>

            <div class="form-group">
                <label for="passwordConfirm">Confirm password : </label>
                <input type="password" 
                        placeholder=" enter again your new password..."
                        v-model="passwordConfirm" 
                        v-validate="'required|min:6|max:40|confirmed:password'" 
                        data-vv-as="password" 
                        class="form-control" 
                        name="passwordConfirm"/>

                <div   class="alert alert-danger" 
                        v-if="errors.has('passwordConfirm')" 
                        role="alert"> Passwords must be identical!
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

        <div v-if="message"  class="alert" 
             :class="successful ? 'alert-success' : 'alert-danger'">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> {{message}}
        </div>

    </div>
</template>

<script>
import Password from '../../../models/password';
export default {
    name: "Login",
    data() {
        return {
            passwords: new Password('',''),
            loading: false,
            submitted: false,
            successful: false,
            message: '',
            passwordConfirm: '',
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    },

    methods: {
        async updatePassword() {
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
                const data = { userUuid, ...this.passwords}
                const response = await this.$store.dispatch("auth/updatePasswordAction", data)
                this.message = response;
                this.successful = true;
                this.loading = false;
                // this.passwordConfirm = '';
                // this.passwords.password = '';
                // this.passwords.passwordOld = '';

            } catch(error) {
                this.loading = false;
                this.message = (error.response && error.response.data) || error.message || error.toString();
           }
        },
    }
};
</script>


<style lan="scss" scoped>
label {
  display: block;
  margin-top: 10px;
}
h2 {
    font-size: 1.25rem;
    padding: 0 1.5rem;
    border-bottom: 2px solid grey;
    margin: 1rem 0 2rem 0;
}

</style>