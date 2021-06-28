
import userService from "../../services/user.service";

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

        updateUserInfosMutation: (state, user) => state.user = user,
        errUpdateUserInfosMutation: (state) => state.user = {},
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

        async updateUserInfosAction( {commit}, data) {
            try {
                const user = await userService.updateUserInfos(data.userUuid, data)
                commit("updateUserInfosMutation");
                return Promise.resolve(user.data);
            } catch (err) {
                commit( "errUpdateUserInfosMutation");
                return Promise.reject(err);
            }
        },
    },
}