
import photoCommentService from './../../services/photo.comments.service.js';

export const photoComments =  {

    state : {
        allCommentsForOnePhoto: [],
    },

    getters: {
        allPhotoCommments: (state) => state.photoComment,
    },

    actions: {

        async addPhotoCommentAction({commit}, data) {
            try {
                const comment = await photoCommentService.createPhotoComment(data.photoUuid, data);
                commit('addPhotoCommentMutation', comment.data);
                return Promise.resolve(comment.data);
            } catch(err) {
                commit('errorAddPhotoCommentMutation');
                return Promise.reject(err);
            }
        },
    },

    mutations: {
        addPhotoCommentMutation: (state, comment) => state.allCommentsForOnePhoto = comment,
        errorAddPhotoCommentMutation: (state) => state.allCommentsForOnePhoto = [],
    },

}