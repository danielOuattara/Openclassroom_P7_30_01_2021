
import userService from "../../services/user.service";

export const user = {
    
    state: {
        user: {},
    },

    getters: {
        userData:(state) => state.user
    },

    actions: {

        async fetchUserAction( {commit}, uuid) {
            try {

                const user = await userService.getOneUser(uuid);
                commit('fetchUserMutation', user.data);
                return await Promise.resolve(user.data);
            }      
            catch(error) {
                commit("errorFetchUser");
                return await Promise.reject(error);
            }
        }
    },

    mutations: {
        fetchUserMutation: (state, user) => state.user= user,
        errorFetchUser: (state) => state.user
    }
}