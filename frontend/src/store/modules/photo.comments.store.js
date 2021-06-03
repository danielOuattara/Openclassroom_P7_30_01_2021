
import photoCommentService from './../../services/photo.comments.service.js';

export const photoComments =  {

    state : {
        photoComments: {},
    },

    getters: {
        allPhotoCommments: (state) => state.photoComment,
    },

    actions: {

        async addPhotoCommentAction({commit}, photoUuid, comment) {
            try {
                const oneComment = await photoCommentService.createPhotoComment(photoUuid, comment);
                commit('addPhotoCommentMutation', oneComment.data);
                return Promise.resolve(oneComment.data);
            } catch(err) {
                commit('errorAddPhotoCommentMutation');
                return Promise.reject(err);
            }
        },

    },

    mutations: {
        addPhotoCommentMutations: (state, oneComment) => state.photoComments = oneComment,
        errorAddPhotoCommentMutation: (state) => state.photoComment = [],

    },








}