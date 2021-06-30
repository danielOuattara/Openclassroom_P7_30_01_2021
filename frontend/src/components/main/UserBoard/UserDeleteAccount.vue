<template>
    <div class="password-update-form">
        <form name="form" @submit.prevent="deleteUserAccount">
            <div class="form-group">
                <label for="password">Password : </label>
                <input type="password" 
                        v-validate="'required|min:6|max:40'" 
                        placeholder="enter your password..."
                        v-model="user.password" 
                        class="form-control" 
                        name="password"
                        id="password"/>
                <div   class="alert alert-danger"  v-if="errors.has('password')" 
                        role="alert"> The current password is required !
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-danger btn-block" :disabled="loading">
                    <span v-show="loading" 
                            class="spinner-border spinner-border-sm"></span>
                    <span class=""> confirm 
                    </span>
                </button>
            </div>
            <input type="reset" @click="onReset" class=" btn-reset-update btn btn-outline-info btn-block" aria-label="Reset" value="Reset">
            <div class="form-group">
            <div v-if="message" 
                class="alert" 
                :class="successful ? 'alert-success' : 'alert-danger'">{{message}}
            </div>
            </div>
        </form>
    </div>
</template>

<script>
import User from '../../../models/user';
export default {
    data() {
        return {
            visible:false,
            user: new User(''),
            loading: false,
            submitted: false,
            successful: false,
            message: '',
            password:'',
        };
    },
    computed: {
        currentUser() {
            return this.$store.state.auth.user;
        },
        
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    }, 

    methods: { 
        onReset() {
          this.$validator.reset();
          this.password ="";
        },

        async deleteUserAccount() {
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
                const data = { userUuid, ...this.user};
                const response = await this.$store.dispatch("auth/signoutAction", data);
                this.$validator.reset();
                this.message = response;
                this.successful = true;
                this.loading = false;
                localStorage.removeItem("user");
                setTimeout(()=> {
                    this.$router.push('/signin');
                }, 1500);
            
            } catch(error) {
                this.loading = false;
                 this.$validator.reset();
                this.password= ''
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

.modal-body {
    font-size: 2.5vh;
    color: rgb(136, 8, 8); 
}

.btn-reset-update {
    color: blue;
    &:hover {
        background: blue;
        color: white
    }
}
</style>