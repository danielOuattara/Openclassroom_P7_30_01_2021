import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Signin from './views/Signin.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/'       , name: 'home'   , component: Home },
    { path: '/home'   , name: ''       , component: Home  },
    { path: '/login'  , name: ''       , component: Login },
    { path: '/signin' , name: ''       , component: Signin },
    { path: '/profile', name: 'profile', component: () => import('./views/Profile.vue')  },  /* lazy-loaded*/
    { path: '/admin'  , name: 'admin'  , component: () => import('./views/BoardAdmin.vue') }, /* lazy-loaded*/
    { path: '/user'   , name: 'user'   , component: () => import('./views/BoardUser.vue')  }  /* lazy-loaded*/
  ]
});


/*Handle Unauthorized Access
-----------------------------

If you want to check Authorized status everytime a navigating action
is trigger, just add router.beforeEach() at the end of src/router.js
like this:*/

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signin', '/home'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
