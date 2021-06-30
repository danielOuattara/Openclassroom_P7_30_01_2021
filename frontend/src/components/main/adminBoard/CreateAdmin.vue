
<template>
    <div class="create-admin">
        <h2>Create Admin</h2>
             <form name="form" @submit.prevent="createAdmin">

                <div class="form-group">
                    <label for="email">Enter an e-mail : </label>
                    <input type="email"
                           v-validate="'required|email|max:50'" 
                           placeholder=" enter your email ..."
                           v-model="user.email"  
                           class="form-control" 
                           id="email"
                           name="email"/>

                    <div    v-if="submitted && errors.has('email')" 
                            class="alert alert-danger" >
                            {{errors.first('email')}}
                    </div>
                </div>

                <div class="form-group">
                    <label for="password"> Enter a password : </label>
                    <input type="password" 
                           placeholder=" enter a password ..."
                           v-model="user.password" 
                           v-validate="'required|min:6|max:40'"  
                           class="form-control" 
                           name="password"
                           id="password" />
                    
                    <div  v-if="submitted && errors.has('password')" 
                          class="alert alert-danger">
                          {{errors.first('password')}}
                    </div>
                </div>
                <div class="form-group">
                    <label for="special"> Enter authorization password : </label>
                    <input type="password" 
                           placeholder=" enter a special ..."
                           v-model="special" 
                           v-validate="'required|min:6|max:40'"  
                           class="form-control" 
                           name="special"
                           id="special" />
                    
                    <div  v-if="submitted && errors.has('special')" 
                          class="alert alert-danger">
                          {{errors.first('special')}}
                    </div>
                </div>
                <div class="form-group">
                    <span @click="onReset" type="button" class="btn btn-dark btn-block">
                  Cancel
                    <font-awesome-icon id="icon-times-circle" icon="times-circle" />
                </span>
              </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block" :disabled="loading">
                        <span v-show="loading" 
                                class="spinner-border spinner-border-sm"></span>
                        <span class="">Create Admin <font-awesome-icon 
                              id="icon-paper-plane-user-data" icon="paper-plane" /></span>
                    </button>
                </div>
            </form>
            <div v-if="message" class="alert" 
                 :class="successful ? 'alert-success' : 'alert-danger'">{{message}}
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
    </div>
</template>


<script>
import User from './../../../models/user';
// import User from './../../../models/user';
export default {
    name: 'Signin',
    data() {
        return {
            user: new User('', ''),
            loading: false,
            submitted: false,
            successful: false,
            message: '',
            special:'',
        };
    },

    computed: {
        loggedIn() {
         return this.$store.state.auth.status.loggedIn;
        }
    },

    methods: {
        
        onReset() {
          this.user = {};
          this.special= "";
          this.$validator.reset();
        },
        async createAdmin() {
            try {
                this.message = '';
                this.submitted = true;
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const roles =  ["user", "admin"];
                const special = this.special;
                const data = {roles, special, ...this.user}
                console.log(data)
                const response = await this.$store.dispatch('auth/signin', data)
                this.message = response;
                this.successful = true;
                this.loading = false;

            } catch(err){
                this.message = (err.response && err.response.data) || err.message || err.toString();
                this.successful = false;
                this.loading = false;
            }
        }
    }
};
</script>


<style lang="scss" scoped>

.create-admin {
    border: 1px solid grey;
    margin: 2rem 0;
    padding: 2rem;
    border-radius: 5px;
}

h2 {
    font-size: 1.5rem;
    padding: .5rem;
    margin: 1rem 0 2rem 0;
    border-bottom: 2px solid grey;
}
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

// label {
//   display: block;
//   margin-top: 10px;
// }

// .card-container.card {
//   max-width: 350px;
//   padding: 40px 40px;
//   border-radius: 8px;
// }

// .card {
//   background-color: rgba(247, 247, 247, 0.6);
//   padding: 20px 25px 30px;
//   margin: 0 auto 25px;
//   margin-top: 50px;
//   -moz-border-radius: 2px;
//   -webkit-border-radius: 2px;
//   border-radius: 2px;
//   -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
//   box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
// }

// .profile-img-card {
//   width: 96px;
//   height: 96px;
//   margin: 0 auto 10px;
//   display: block;
//   -moz-border-radius: 50%;
//   -webkit-border-radius: 50%;
//   border-radius: 50%;
// }
// .btn-success {
//     font-size: 22px!important
// }
// .signin {
//     font-size:1.5rem;
// }
// #nav-link {
//     // margin-top: 10px;
//     text-align: right;
//     font-size: 1.25rem;
//     color: blue
// }

// .form-check {
//     margin:20px 0;
// }
</style>