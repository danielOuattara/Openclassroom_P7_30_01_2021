
import Vue from "vue";
import Vuex from "vuex";

import { auth } from "./modules/auth";
import { photos } from "./modules/photos.js"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { auth, photos }
});

