
// BACK UP : WORKING !
// import photoService from "./../../services/photo.service";

//   const state = {
//         photos: [ ],
//     };

//   const getters = {
//         allPhotos:(state) => state.photos,
//     };

//    const  actions = {

//         async fetchAllPhotosAction( {commit}) {
//             try {
//                 const photos = await photoService.getAllPhoto();
//                 commit('getAllPhotosMutation', photos.data);
//                 return await Promise.resolve(photos.data);
//             } catch (err) {
//                 commit("errGetAllPhotosMutation");
//                 return Promise.reject(err);
//             }
//         },
              
//         async addOnePhotoAction( {commit}, title, image) {
//             try {
//                 const photos = await photoService.addPhoto(title, image);
//                 commit('addOnePhotoMutation', photos.data);
//                 return await Promise.resolve(photos.data);
//             } catch (err) {
//                 commit("errAddOnePhoto");
//                 return Promise.reject(err);
//             }
//         },
//     };

//     const mutations = {

//         getAllPhotosMutation: (state, photos) => state.photos = photos,
//         errGetAllPhotosMutation: (state) => state.photos = [],

//         addOnePhotoMutation:(state, photo) => state.photos.unshift(photo),
//         errAddOnePhoto: (state) => state.photos,
//     };


// export default {
//   state,
//   getters,
//   actions,
//   mutations
// };


// BACKUP : WORKING!
import photoService from "./../../services/photo.service";

export const photo = {
    state: {
        photos: [ ],
    },

    getters: {
        allPhotos:(state) => state.photos,
    },

    actions: {

        async fetchAllPhotosAction( {commit}) {
            try {
                const photos = await photoService.getAllPhoto();
                commit('getAllPhotosMutation', photos.data);
                return await Promise.resolve(photos.data);
            } catch (err) {
                commit("errGetAllPhotosMutation");
                return Promise.reject(err);
            }
        },
        
          //  addOnePhotoAction      
        async addOnePhotoAction( {commit}, title, image) {
            try {
                const photos = await photoService.addPhoto(title, image);
                commit('addOnePhotoMutation', photos.data);
                return await Promise.resolve(photos.data);
            } catch (err) {
                commit("errAddOnePhoto");
                return Promise.reject(err);
            }
        },
    },

    mutations: {

        getAllPhotosMutation: (state, photos) => state.photos = photos,
        errGetAllPhotosMutation: (state) => state.photos = [],

        addOnePhotoMutation:(state, photo) => state.photos.unshift(photo),
        errAddOnePhoto: (state) => state.photos,
    }
}
