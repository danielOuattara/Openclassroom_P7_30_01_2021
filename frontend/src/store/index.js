
import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth.js";
// import photo from "./modules/photo.js";
import { photo } from "./modules/photo.js";
import { user } from "./modules/user.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { 
        auth,
        photo,
        user
    }
});

