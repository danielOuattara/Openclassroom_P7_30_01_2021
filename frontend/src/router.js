import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Signin from './views/Signin.vue';
import Login from './views/Login.vue';


Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/home'    , name: ''         , component: Home                                   },
    { path: '/login'   , name: ''         , component: Login                                  },
    { path: '/signin'  , name: ''         , component: Signin                                 },
    { path: '/admin'   , name: 'admin'    , component: () => import('./views/BoardAdmin.vue') },
    { path: '/user'    , name: 'user'     , component: () => import('./views/BoardUser.vue')  },
    { path: '/gtu'     , name: 'gtu'      , component: () => import('./views/GTU.vue')        },
    { path: '/help'    , name: 'help'     , component: () => import('./views/Help.vue')       },
  ]
});


/* If you want to check Authorized status everytime a navigating 
   action is trigger, just add router.beforeEach():
 */

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/signin', '/gtu', '/help-center'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

  /* trying to access a restricted page + not logged in => redirect to login page*/
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});
