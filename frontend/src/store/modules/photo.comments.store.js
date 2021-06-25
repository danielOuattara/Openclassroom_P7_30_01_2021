
import photoCommentService from './../../services/photo.comments.service.js';
export const photoComments =  {
    state : {
        // allCommentsOnePhoto: [],
        comment: '',
    },

    getters: {
        // allPhotoCommments: (state) => state.photoComment,
        // allCommentsOnePhoto: (state) => state.allCommentsOnePhoto,
    },

        mutations: {
        addPhotoCommentMutation: (state, comment) => state.allCommentsForOnePhoto = comment,
        errorAddPhotoCommentMutation: (state) => state.allCommentsForOnePhoto = [],

        deletePhotoCommentMutation: (state) => state.allCommentsForOnePhoto = [],
        errDeletePhotoCommentMutation: (state, comment) => state.allCommentsForOnePhoto = comment,

        createPhotoCommentReportMutation:(state, report) => state.CommentReport = report,
        errCreatePhotoCommentReportMutation: (state) => state.CommentReport = [],

        updatePhotoCommentMutation:(state, comment) => state.comment = comment,
        errUpdatePhotoCommentMutation:(state) => state.comment = [],

        // getAllCommentsForOnePhotoMutation: (state, comments) => state.allCommentsOnePhoto = comments,
        // errgetAllCommentsForOnePhotoMutation: (state) => state.allCommentsOnePhoto = []
    },

    actions: {
        async addPhotoCommentAction({commit}, data) {
            try {
                const comment = await photoCommentService.addPhotoComment(data.photoUuid, data.comment);
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

        async createPhotoCommentReportAction({commit}, data) {
             try {
                 const report = await photoCommentService.createPhotoCommentReport(data.photoUuid, data.commentUuid, data.message);
                 commit('createPhotoCommentReportMutation', report);
                 return Promise.resolve(report);
             } catch (err) {
                 commit("errCreatePhotoCommentReportMutation");
                 return Promise.reject(err); 
             }
        },

        async updatePhotoCommentAction({commit}, data) {
             try {
                 const comment = await photoCommentService.updatePhotoComment(data.photoUuid, data.commentUuid, data.content);
                 commit('updatePhotoCommentMutation', comment);
                 return Promise.resolve(comment);
             } catch (err) {
                 commit("errUpdatePhotoCommentMutation");
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
}