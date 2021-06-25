
import Vue from "vue";
import Vuex from "vuex";

import { admin } from "./modules/admin.store.js";
import { auth } from "./modules/auth.store.js";
import { photo } from "./modules/photo.store.js";
import { user } from "./modules/user.store.js";
import { likes } from "./modules/photo.likes.store.js";
import { photoComments } from "./modules/photo.comments.store.js";
import { sharedData } from "./modules/shared.data.store.js";

Vue.use(Vuex);

export default new Vuex.Store({
    strict : true,
    modules: { 
        admin,
        auth,
        photo,
        user,
        likes,
        photoComments,
        sharedData,
    }
});

