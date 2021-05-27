
import photoService from "./../../services/photo.service";

export  const photos = {

    state: {
        photos: [ ],
    },

    getters: {
        allPhotos:(state) => state.photos,
    },

    actions: {

        async fetchAllPhotos( {commit}) {
            try {
                const res = await photoService.getAllPhoto();
                commit('getAllPhotos', res.data);
                return await Promise.resolve(res.data);
            } catch (err) {
                commit("errGetAllPhotos");
                return Promise.reject(err);
            }
        }
    },

    mutations: {

        getAllPhotos: (state, photos) => state.photos = photos,
        errGetAllPhotos: (state) => state.photos = [],
    }
}
