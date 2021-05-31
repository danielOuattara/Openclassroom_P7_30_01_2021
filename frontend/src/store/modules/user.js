
import userService from "../../services/user.service";

export const user = {
    
    state: {
        user: {},
    },

    getters: {
        userData:(state) => state.user
    },

    actions: {

        async fetchUserAction( {commit}, userUuid) {
            try {
                console.log(userUuid);
                const user = await userService.getOneUser(userUuid);
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