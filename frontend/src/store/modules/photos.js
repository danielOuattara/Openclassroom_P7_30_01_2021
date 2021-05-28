
import photoService from "./../../services/photo.service";

export  const photos = {

    state: {
        photos: [ ],
    },

    getters: {
        allPhotos:(state) => state.photos,
    },

    actions: {

        async fetchAllPhotosAction( {commit}) {
            try {
                const res = await photoService.getAllPhoto();
                commit('getAllPhotosMutation', res.data);
                return await Promise.resolve(res.data);
            } catch (err) {
                commit("errGetAllPhotosMutation");
                return Promise.reject(err);
            }
        },

        async addOnePhotoAction( {commit}, title, file) {
            try {
                const res = await photoService.addPhoto(title, file);
                commit('addOnePhotoMutation', res.data);
                return await Promise.resolve(res.data);
            } catch (err) {
                commit("errAddOnePhoto");
                return Promise.reject(err);
            }
        },



    },

    mutations: {

        getAllPhotosMutation: (state, photos) => state.photos = photos,
        errGetAllPhotosMutation: (state) => state.photos = [],

        addOnePhotoMutation:( state, photo) => state.photos.unshift(photo),
        errAddOnePhoto: (state) => state.photos,
    }
}
