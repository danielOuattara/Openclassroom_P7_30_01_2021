// (Vuex Store that contains all modules)

import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth
  }
});

/*
Then we start to define Vuex Authentication module that contains:

  >  state: { status, user }
  >  actions: { login, logout, register }
  >  mutations: { loginSuccess, loginFailure, logout, registerSuccess, registerFailure }
*/
