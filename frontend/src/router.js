import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signin from './views/Signin.vue';
import Login from './views/Login.vue';
import GTU from './views/GTU.vue';
import Help from './views/Help.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/home'    , name: ''         , component: Home                                   },
    { path: '/login'   , name: ''         , component: Login                                  },
    { path: '/signin'  , name: ''         , component: Signin                                 },
    { path: '/gtu'     , name: ''         , component: GTU                                    },
    { path: '/profile' , name: 'profile'  , component: () => import('./views/Profile.vue')    },
    { path: '/admin'   , name: 'admin'    , component: () => import('./views/BoardAdmin.vue') },
    { path: '/user'    , name: 'user'     , component: () => import('./views/BoardUser.vue')  },
    { path: '/help'    , name: ''         , component: Help                                   },
  ]
});


/* If you want to check Authorized status everytime a navigating 
   action is trigger, just add router.beforeEach():
 */

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/signin'  /*, '/home' */, '/gtu', '/help-center'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

  /* trying to access a restricted page + not logged in => redirect to login page*/
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
