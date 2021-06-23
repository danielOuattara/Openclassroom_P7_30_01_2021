
import photoCommentService from './../../services/photo.comments.service.js';

export const photoComments =  {

    state : {
        // allCommentsOnePhoto: [],
    },

    getters: {
        // allPhotoCommments: (state) => state.photoComment,
        // allCommentsOnePhoto: (state) => state.allCommentsOnePhoto,
    },

    actions: {
        async addPhotoCommentAction({commit}, data) {
            try {
                const comment = await photoCommentService.addPhotoComment(data.photoUuid, data);
                commit('addPhotoCommentMutation', comment.data);
                return Promise.resolve(comment.data);
            } catch(err) {
                commit('errorAddPhotoCommentMutation');
                return Promise.reject(err);
            }
        },

        async deletePhotoCommentAction({commit}, data ) {
            try {
                const comment = await photoCommentService.deleteOneComment(data.photoUuid, data.commentUuid, data.message);
                commit('deletePhotoCommentMutation', comment.data);
                return Promise.resolve(comment.data);
            } catch(err) {
                commit('errDeletePhotoCommentMutation');
                return Promise.reject(err);
            }
        },

        async createCommentReportAction({commit}, data) {
             try {
                 const report = await photoCommentService.createCommentReportAction(data.photoUuid, data.commentUuid, data.message);
                 commit('createPhotoCommentReportMutation', report);
                 return Promise.resolve(report);
             } catch (err) {
                 commit("errCreatePhotoCommentReportMutation");
                 return Promise.reject(err); 
             }
         }

        // async getAllCommentsForOnePhotoAction({commit}, photoUuid ) {
        //     try {
        //         const comments = await photoCommentService.getAllCommentsForOnePhoto(photoUuid);
        //         commit('getAllCommentsForOnePhotoMutation', comments.data);
        //         return Promise.resolve(comments.data);
        //     } catch(err) {
        //         commit('errgetAllCommentsForOnePhotoMutation');
        //         return Promise.reject(err);
        //     }
        // },
    },

    mutations: {
        addPhotoCommentMutation: (state, comment) => state.allCommentsForOnePhoto = comment,
        errorAddPhotoCommentMutation: (state) => state.allCommentsForOnePhoto = [],

        deletePhotoCommentMutation: (state) => state.allCommentsForOnePhoto = [],
        errDeletePhotoCommentMutation: (state, comment) => state.allCommentsForOnePhoto = comment,

        createPhotoCommentReportMutation:(state, report) => state.CommentReport = report,
        errcreatePhotoCommentReportMutation: (state) => state.CommentReport = []

        // getAllCommentsForOnePhotoMutation: (state, comments) => state.allCommentsOnePhoto = comments,
        // errgetAllCommentsForOnePhotoMutation: (state) => state.allCommentsOnePhoto = []
    },
}