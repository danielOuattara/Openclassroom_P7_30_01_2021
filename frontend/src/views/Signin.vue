
<template>
  <div class="col-md-12">
    <div class="card card-container">
       <img id="profile-img" 
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" 
            class="profile-img-card" alt="standard profile icon "/>

        <form name="form" @submit.prevent="handleSignin">
            <div v-if="!successful">
                <div class="form-group">
                    <label for="email">Enter an e-mail : </label>
                    <input v-model="user.email" 
                           v-validate="'required|email|max:50'" 
                           placeholder=" enter your email ..."
                           type="email" 
                           class="form-control" 
                           name="email"/>
                    <div v-if="submitted && errors.has('email')" 
                         class="alert-danger" >
                            {{errors.first('email')}}
                    </div>
                </div>

                <div class="form-group">
                    <label for="password"> Enter a password : </label>
                    <input v-model="user.password" 
                           placeholder=" enter a password ..."
                           v-validate="'required|min:6|max:40'" 
                           type="password" 
                           class="form-control" 
                           name="password" />
                    <div v-if="submitted && errors.has('password')" 
                         class="alert-danger">
                            {{errors.first('password')}}
                    </div>
                </div>

                <div class="form-check">
                    <input class="form-check-input" 
                           type="checkbox" 
                           id="defaultCheck1"
                           v-validate="'required'"
                           name='GTU'>
                    <label class="form-check-label" for="defaultCheck1" >
                         <span style="font-size:14px">Please, check next to agree with</span>
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
                          v-if="errors.has('GTU')" 
                      role="alert"> Please, accept the UCGs
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-success btn-block">Signin</button>
                </div>
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
                                color:black;
                                text-decoration: underline dotted blue;"
                         to="/help" class="nav-link" id="nav-link"> 
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
            submitted: false,
            successful: false,
            message: ''
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
        handleSignin() {
            this.message = '';
            this.submitted = true;
            this.$validator.validate()
            .then(isValid => {
                if (isValid) {
                    this.$store.dispatch('auth/signin', this.user)
                    .then( data => {
                            this.message = data;
                            this.successful = true;
                            this.$router.push("/login");
                        },
                        error => {
                            this.message = (error.response && error.response.data) || error.message || error.toString();
                            this.successful = false;
                        }
                    );
                }
            });
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
    font-size: 24px!important
}

#nav-link {
    // margin-top: 10px;
    text-align: right;
}

.form-check {
    margin:20px 0;
}
</style>
