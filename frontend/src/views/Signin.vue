
<template>
  <div class="col-md-12">
    <div class="card card-container">
       <img id="profile-img" 
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" 
            class="profile-img-card" alt="standard profile icon "/>
        <form name="form" @submit.prevent="handleSignin">
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

                <div class="form-check">
                    <input class="form-check-input" 
                           type="checkbox" 
                           id="defaultCheck1"
                           v-validate="'required'"
                           name='gtu'>
                    <label class="form-check-label" for="defaultCheck1" >
                         <span style="font-size:14px">Please, check-in to agree with</span>
                         <router-link style="display:inline; 
                                             font-size:14px; 
                                             margin-left:-12px;
                                             font-weight:600" 
                                      to="/gtu" 
                                      class="nav-link" 
                                      id="nav-link"> GTU
                        </router-link>
                    </label>
                    <div  class="alert alert-danger" 
                          v-if="errors.has('gtu')" 
                      role="alert"> Please, accept the UCGs
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-success btn-block"
                             style=""
                             :disabled="loading">
                        <span v-show="loading" 
                              class="spinner-border spinner-border-sm"></span>
                        <span class="signin">Signin</span>
                    </button>
                </div>
        </form>
        <div>
            <router-link to="/login" class="nav-link" id="nav-link">Switch to login
                <font-awesome-icon icon="sign-in-alt" /> 
            </router-link>
        </div>

        <div v-if="message" 
             class="alert" 
             :class="successful ? 'alert-success' : 'alert-danger'">{{message}}
        </div>

        <div class="form-check">
            <router-link style="display:inline; 
                                font-size:14px; 
                                margin-left:-10px; 
                                padding-bottom: 0.5rem;
                                color:black;
                                border-bottom: 2px dotted blue;"
                         to="/help" 
                         class="nav-link"> 
                Troubles with registration ? 
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import User from './../models/user';
export default {
    name: 'Signin',
    data() {
        return {
            user: new User('', ''),
            loading: false,
            submitted: false,
            successful: false,
            message: '',
        };
    },

    computed: {
        loggedIn() {
         return this.$store.state.auth.status.loggedIn;
        }
    },

    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },

    methods: {
        async handleSignin() {
            try {
                this.message = '';
                this.submitted = true;
                this.loading = true;
                const isValid = await this.$validator.validateAll();
                if (!isValid) {
                    this.loading = false;
                    return;
                }
                const response = await this.$store.dispatch('auth/signin', this.user)
                this.message = response;
                this.successful = true;
                this.loading = false;
                setTimeout(()=> {
                    this.$router.push("/login");
                }, 1500)

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

label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px;
  padding: 40px 40px;
  border-radius: 8px;
}

.card {
  background-color: rgba(247, 247, 247, 0.6);
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
.btn-success {
    font-size: 22px!important
}
.signin {
    font-size:1.5rem;
}
#nav-link {
    // margin-top: 10px;
    text-align: right;
    font-size: 1.25rem;
    color: blue
}

.form-check {
    margin:20px 0;
}
</style>
