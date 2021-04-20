import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './../views/Home.vue';
import Login from './../views/Login.vue';
import Signin from './../views/Signin.vue';

Vue.use(VueRouter)

const routes = [
  { path: '/home'   , name: 'home'   , component: Home  },
  { path: '/login'  , name: 'login'  , component: Login },
  { path: '/signin' , name: 'signin' , component: Signin },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
