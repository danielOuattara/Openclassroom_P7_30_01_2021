

import photoService from "./../../services/photo.service";

export const photo = {
    state: {
        photos: [ ],
        userPhotos: []
    },

    getters: {
        allPhotos:(state) => state.photos,
        userAllPhotos: (state) => state.userPhotos
    },

    actions: {

        async fetchAllPhotosAction( {commit}) {
            try {
                const photos = await photoService.getAllPhotos();
                commit('fetchAllPhotosMutation', photos.data);
                return await Promise.resolve(photos.data);
            } catch (err) {
                commit("errFetchAllPhotosMutation");
                return Promise.reject(err);
            }
        },

        async fetchUserAllPhotosAction( {commit}) {
            try {
                const photos = await photoService.getAllPhotosFromOneUser();
                commit('getAllPhotosMutation', photos.data);
                return await Promise.resolve(photos.data);
            } catch (err) {
                commit("errGetAllPhotosMutation");
                return Promise.reject(err);
            }
        },
        
        // async addOnePhotoAction( {commit}, data) {
        //     try {
        //         const photo = await photoService.addPhoto(data);
        //         commit('addOnePhotoMutation', photo);
        //         return await Promise.resolve(photo);
        //     } catch (err) {
        //         commit("errAddOnePhoto");
        //         return Promise.reject(err);
        //     }
        // },
    },

    mutations: {

        fetchAllPhotosMutation: (state, photos) => state.photos = photos,
        errFetchAllPhotosMutation: (state) => state.photos = [],

        // addOnePhotoMutation:(state, photo) => state.photos.unshift(photo),
        // errAddOnePhoto: (state) => state.photos,

        fetchUserAllPhotosMutation: (state, photos) => state.userPhotos = photos,
        errFetchUserAllPhotosMutation: (state) => state.userPhotos = [],
    }
}
