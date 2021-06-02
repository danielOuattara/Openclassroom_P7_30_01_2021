
import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth.store.js";
import { photo } from "./modules/photo.store.js";
import { user } from "./modules/user.store.js";
import { likes } from "./modules/photo.likes.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict : true,
    modules: { 
        auth,
        photo,
        user,
        likes
    }
});

