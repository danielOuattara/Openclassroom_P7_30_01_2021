
import photoLikesService from "./../../services/photo.likes.services.js";

export const likes = {
    
    state: {
        likesState: {},
    },

    getters: {
        likesData:(state) => state.likes
    },

    actions: {

        // async fetchOnePhotoLikesAction( {commit}, photoUuid) {
        //     try {
        //         const photoLikes = await photoLikesService.fetchPhotoLikesCounting(photoUuid);
        //         commit('fetchOnePhotoLikesMutation', photoLikes.data);
        //         return  Promise.resolve(photoLikes.data);
        //     }      
        //     catch(error) {
        //         commit("errorFetchOnePhotoLikesMutation");
        //         return Promise.reject(error);
        //     }
        // },

        async sendOnePhotoLikesAction( {commit}, photoUuid) {
            try {
                const photoLikes = await photoLikesService.sendPhotoLikes(photoUuid);
                commit('sendOnePhotoLikesMutation', photoLikes.data);
                return  Promise.resolve(photoLikes.data);
            }      
            catch(error) {
                commit("errorSendOnePhotoLikesMutation");
                return Promise.reject(error);
            }
        },

    },

    mutations: {
        // fetchOnePhotoLikesMutation: (state, likes) => state.likesState = likes,
        // errorFetchOnePhotoLikesMutations: (state) => state.likesState = {},

        sendOnePhotoMutation: (state, likes) => state.likesState = likes,
        errorSendOnePhotoMutations: (state) => state.likesState = {},
    }
}