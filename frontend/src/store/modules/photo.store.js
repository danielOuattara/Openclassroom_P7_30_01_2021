

import photoService from "../../services/photo.service";

export const photo = {
    
    state: {
        allPhotos: [ ],
        oneUserPhotos: [ ]
    },

    getters: {
        allPhotos:(state) => state.allPhotos,
        userAllPhotos: (state) => state.oneUserPhotos
    },

    actions: {

        async fetchAllPhotosAction( {commit}) {
            try {
                const allPhotos = await photoService.getAllPhotos();
                commit('fetchAllPhotosMutation', allPhotos.data);
                return await Promise.resolve(allPhotos.data);
            } catch (err) {
                commit("errFetchAllPhotosMutation");
                return Promise.reject(err);
            }
        },

        async fetchUserAllPhotosAction( {commit}, userUuid) {
            try {
                const photos = await photoService.getAllPhotosFromOneUser(userUuid);
                commit('fetchUserAllPhotosMutation', photos.data);
                return await Promise.resolve(photos.data);
            } catch (err) {
                commit("errFetchUserAllPhotosMutation");
                return Promise.reject(err);
            }
        },
        
        async addOnePhotoAction( {commit}, formData) {
            try {
                const photo = await photoService.addPhoto(formData);
                commit('addOnePhotoMutation', photo);
                return await Promise.resolve(photo);
            } catch (err) {
                commit("errAddOnePhoto");
                return Promise.reject(err);
            }
        },
    },

    mutations: {

        fetchAllPhotosMutation: (state, photos) => state.allPhotos = photos,
        errFetchAllPhotosMutation: (state) => state.allPhotos = [],

        addOnePhotoMutation:(state, photo) => state.allPhotos = photo,
        errAddOnePhoto: (state) => state.allPhotos = [],

        fetchUserAllPhotosMutation: (state, photos) => state.oneUserPhotos = photos,
        errFetchUserAllPhotosMutation: (state) => state.oneUserPhotos = [],
    }
}
