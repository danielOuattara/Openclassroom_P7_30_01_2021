
import userService from "../../services/user.service";
// import authService from '../../services/auth.service';

export const user = {
    
    state: {
        user: {},
    },

    getters: {
        userDataGetters:(state) => state.user,
    },

    mutations: {
        getOneUserMutation: (state, user) => state.user = user,
        errGetOneUserMutation: (state) => state.user = {},

        // updateUserSuccessMutation: (state, user) => state.user = user,
        // updateUserFailureMutation: (state) => state.user = {},
    },

    actions: {

        async getOneUserAction( {commit}, userUuid) {
            try {
                const user = await userService.getOneUser(userUuid);
                commit('getOneUserMutation', user.data);
                return  Promise.resolve(user.data);
            }      
            catch(error) {
                commit("errGetOneUserMutation");
                return Promise.reject(error);
            }
        },

        // updateUserPasswordAction( {commit}, data) {
        //     return userService.updateUserPassword(data.userUuid, data)
        //     .then( response => {
        //         commit("updateUserPasswordMutation");
        //         return Promise.resolve(response.data);
        //         },
        //         error => {
        //             commit( "errUpdateUserPasswordMutation");
        //             return Promise.reject(error);
        //         }                
        //     );
        // }


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