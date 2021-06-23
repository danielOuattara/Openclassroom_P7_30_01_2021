
// import userService from "../../services/user.service";
// import authService from '../../services/auth.service';

export const sharedData = {
    
    state: {
        // user: {},
    },

    getters: {
        // userData:(state) => state.user
    },

    mutations: {
        // fetchOneUserMutation: (state, user) => state.user = user,
        // errorFetchOneUser: (state) => state.user = [],

        // updateUserSuccessMutation: (state, user) => state.user = user,
        // updateUserFailureMutation: (state) => state.user = {},
    },

    actions: {
        // async fetchOneUserAction( {commit}, userUuid) {
        //     try {
        //         const user = await userService.getOneUser(userUuid);
        //         commit('fetchOneUserMutation', user.data);
        //         return  Promise.resolve(user.data);
        //     }      
        //     catch(error) {
        //         commit("errorFetchOneUser");
        //         return Promise.reject(error);
        //     }
        // },

        // updateUserAction( {commit}, data) {
        //     return userService.updateUserInfos(data.userUuid, data)
        //     .then( response => {
        //         commit("updateUserSuccessMutation");
        //         return Promise.resolve(response.data);
        //         },
        //         error => {
        //             commit( "updateUserFailureMutation");
        //             return Promise.reject(error);
        //         }                
        //     );
        // }
    },
}