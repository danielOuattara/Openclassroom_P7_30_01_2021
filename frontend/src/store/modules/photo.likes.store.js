
import photoLikes from "./../../serv";
import authService from '../../services/auth.service';

export const user = {
    
    state: {
        user: {},
    },

    getters: {
        userData:(state) => state.user
    },

    actions: {

        async fetchOneUserAction( {commit}, userUuid) {
            try {
                const oneUser = await userService.getOneUser(userUuid);
                commit('fetchOneUserMutation', oneUser.data);
                return  Promise.resolve(oneUser.data);
            }      
            catch(error) {
                commit("errorFetchOneUser");
                return Promise.reject(error);
            }
        },

        async deleteUserAccountAction( {commit}, userUuid) {
            try {
                const oneUser = await authService.signout(userUuid);
                commit('deleteUserAccountMutation', oneUser.data);
                return  Promise.resolve(oneUser.data);
            }      
            catch(error) {
                commit("errorDeleteUserAccountMutation");
                return Promise.reject(error);
            }
        }
    },

    mutations: {
        fetchOneUserMutation: (state, oneUser) => state.user = oneUser,
        errorFetchOneUser: (state) => state.user = {},

        deleteUserAccountMutation: (state) => state.user = [],
        errorDeleteUserAccountMutation: (state) => state.user = user

    }
}