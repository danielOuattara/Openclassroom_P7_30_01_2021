
import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth.js";
import { photos } from "./modules/photo.js";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { 
        auth,
        photos 
    }
});

