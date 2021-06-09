<template>
    <div class="password-update-form">
        <h2>Delete your account</h2>
        <form name="form" @submit.prevent="deleteUserAccount">
        <!-- <form name="form" @click.prevent="" data-toggle="modal" data-target="#deleteModal" > -->
            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" 
                        placeholder="enter your password..."
                        v-model="user.password" 
                        v-validate="'required|min:6|max:40'" 
                        class="form-control" 
                        ref="password"
                        name="password"/>
                <div   class="alert alert-danger"  v-if="errors.has('password')" 
                        role="alert"> The current password is required !
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-danger btn-block"   data-toggle="modal" data-target="#deleteModal"  :disabled="loading">
                    <span v-show="loading" 
                            class="spinner-border spinner-border-sm"></span>
                    <span class=""> confirm </span>
                </button>
            </div>
            <div class="form-group">
                <div v-if="message" 
                        class="alert alert-danger" 
                        role="alert">{{message}}
                </div>
            </div>
        </form>

        <!-- Button trigger modal -->
        <!-- <button type="button" class="btn btn-danger btn-block" data-toggle="modal" data-target="#deleteModal">
            Delete your Account
        </button> -->

         <!-- Modal -->
        <!-- <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="deleteModalLabel">Delete Your Account</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Confirm ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-danger" @submit.prevent="deleteUserAccount" data-dismiss="modal">Delete</button>
                </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import User from '../../../models/user';
export default {
    data() {
        return {
            user: new User(''),
            loading: false,
            message: '',
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
    }, 

    methods: { 

         async deleteUserAccount() {
            try {
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const userUuid = this.currentUser.uuid;
                console.log(userUuid),
                console.log(this.user.password)
                if(this.user.password) {
                    await this.$store.dispatch("auth/signoutAction", this.user, userUuid)
                    localStorage.removeItem("user");
                    this.$router.push("/signin");
                }
            } catch(error) {
            this.message = (error.response && error.response.data) || error.message || error.toString();
            }
        }
     },

    mounted() {
        if (!this.currentUser) {
            this.$router.push('/sigin');
        }
    }
}
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

.modal-body {
    font-size: 2.5vh;
    color: rgb(136, 8, 8); 
}
</style>