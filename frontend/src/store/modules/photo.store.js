
import photoService from "../../services/photo.service";

export const photo = {
    
    state: {
        allPhotos: [ ],
        oneUserPhotos: [ ],
        photoReport: [ ],
        onePhoto: [],
    },

    getters: {
        allPhotosGetters:(state) => state.allPhotos,
        userAllPhotos: (state) => state.oneUserPhotos,
        getOnePhoto:(state) => state.onePhoto,
    },

    mutations: {
        addOnePhotoMutation:(state, photo) => state.allPhotos = photo,
        errAddOnePhoto: (state) => state.allPhotos = [],

        getAllPhotosMutation: (state, photos) => state.allPhotos = photos,
        errGetAllPhotosMutation: (state) => state.allPhotos = [],

        deleteOnePhotoMutation:(state) => state.allPhotos = [],
        errDeleteOnePhotoMutation: (state, photo) => state.allPhotos = photo,

        createPhotoReportMutation:(state, report) => state.photoReport = report,
        errCreatePhotoReportMutation: (state) => state.photoReport = [],
        
        getOnePhotoMutation: (state, photo) => state.onePhoto = photo,
        errGetOnePhotoMutation: (state) => state.onePhoto = [],

        // fetchUserAllPhotosMutation: (state, photos) => state.oneUserPhotos = photos,
        // errFetchUserAllPhotosMutation: (state) => state.oneUserPhotos = [],
    },

    actions: {

        async addOnePhotoAction( {commit}, formData) {
            try {
                const photo = await photoService.addPhoto(formData);
                commit('addOnePhotoMutation', photo.data);
                return await Promise.resolve(photo.data);
            } catch (err) {
                commit("errAddOnePhoto");
                return Promise.reject(err);
            }
        },
        
        async getAllPhotosAction( {commit}) {
            try {
                const allPhotos = await photoService.getAllPhotos();
                commit('getAllPhotosMutation', allPhotos.data);
                return await Promise.resolve(allPhotos.data);
            } catch (err) {
                commit("errGetAllPhotosMutation");
                return Promise.reject(err);
            }
        },

        async deleteOnePhotoAction( {commit}, photoUuid) {
            try {
                const photo = await photoService.deleteOnePhoto(photoUuid);
                commit('deleteOnePhotoMutation', photo);
                return await Promise.resolve(photo);
            } catch (err) {
                commit("errDeleteOnePhotoMutation");
                return Promise.reject(err);
            }
        },
        
         async createPhotoReportAction({commit}, data) {
             try {
                 const report = await photoService.createPhotoReport(data.photoUuid, data.message);
                 commit('createPhotoReportMutation', report);
                 return Promise.resolve(report);
             } catch (err) {
                 commit("errCreatePhotoReportMutation");
                 return Promise.reject(err); 
             }
         },

        async getOnePhotoAction( {commit}, photoUuid) {
            try {
                const photo = await photoService.getOnePhoto(photoUuid);
                commit('getOnePhotoMutation', photo.data);
                return await Promise.resolve(photo.data);
            } catch (err) {
                commit("errGetOnePhotoMutation");
                return Promise.reject(err);
            }
        },

        // async fetchUserAllPhotosAction( {commit}, userUuid) {
        //     try {
        //         const photos = await photoService.getAllPhotosFromOneUser(userUuid);
        //         commit('fetchUserAllPhotosMutation', photos.data);
        //         return await Promise.resolve(photos.data);
        //     } catch (err) {
        //         commit("errFetchUserAllPhotosMutation");
        //         return Promise.reject(err);
        //     }
        // },
    },
}
