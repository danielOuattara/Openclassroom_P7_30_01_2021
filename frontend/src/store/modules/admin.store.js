
// import AuthService from "./../../services/auth.service.js";
// import photoCommentService from './../../services/photo.comments.service.js';
// import photoLikesService from "./../../services/photo.likes.services.js";
// import photoService from "./../../services/photo.service";
// import userService from "./../../services/user.service";
import adminService from "./../../services/admin.service";


export const admin =  {
    state : {
        allPhotosReports: [],
        allPhotoCommentsReports: [] ,
    },

    getters: {
        photosReportsGetters: (state) => state.allPhotosReports,
        photoCommentsReportsGetters: (state) => state.allPhotoCommentsReports,
    },

    mutations: {
        getPhotosReportsMutation: (state, photosReports) => state.allPhotosReports = photosReports,
        errGetPhotosReportsMutation: (state) => state.allCommentsForOnePhoto = [],

        getPhotoCommentsReportsMutation: (state, photoCommentsReports) => state.allPhotoCommentsReports = photoCommentsReports,
        errGetPhotoCommentsReportsMutation: (state) => state.photoCommentsReports = [],
    },

    actions: {
        async getPhotosReportsAction({commit}) {
            try {
                const photosReports = await adminService.getPhotosReports();
                commit('getPhotosReportsMutation', photosReports.data);
                return await Promise.resolve(photosReports.data);
            } catch(err) {
                commit('errGetPhotosReportsMutation');
                return Promise.reject(err);
            }
        },

        async getPhotoCommentsReportsAction({commit}) {
            try {
                const photoCommentsReports = await adminService.getPhotoCommentsReports();
                commit('getPhotoCommentsReportsMutation', photoCommentsReports.data);
                return Promise.resolve(photoCommentsReports.data);
            } catch(err) {
                commit('errGetPhotoCommentsReportsMutation');
                return Promise.reject(err);
            }
        },
    },
}