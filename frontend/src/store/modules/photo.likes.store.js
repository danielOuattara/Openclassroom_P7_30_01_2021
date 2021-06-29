
import photoLikesService from "./../../services/photo.likes.services.js";

export const likes = {
    
    state: {
        likesState: {},
    },

    getters: {
        likesDataGetters:(state) => state.likesState
    },

    mutations: {
        fetchOnePhotoLikesMutation: (state, likes) => state.likesState = likes,
        errorFetchOnePhotoLikesMutations: (state) => state.likesState = {},

        sendOnePhotoLikesMutation: (state, likes) => state.likesState = likes,
        errorSendOnePhotoLikesMutation: (state) => state.likesState = {},
    },

    actions: {

        async fetchOnePhotoLikesAction( {commit}, photoUuid) {
            try {
                const photoLikes = await photoLikesService.fetchPhotoLikesCounting(photoUuid);
                commit('fetchOnePhotoLikesMutation', photoLikes.data);
                return  Promise.resolve(photoLikes.data);
            }      
            catch(error) {
                commit("errorFetchOnePhotoLikesMutation");
                return Promise.reject(error);
            }
        },

        async sendOnePhotoLikesAction( {commit}, data) {
            try {
                const photoLikes = await photoLikesService.sendPhotoLikes(data);
                commit('sendOnePhotoLikesMutation', photoLikes.data);
                return  Promise.resolve(photoLikes.data);
            }      
            catch(error) {
                commit("errorSendOnePhotoLikesMutation");
                return Promise.reject(error);
            }
        },

    },

}