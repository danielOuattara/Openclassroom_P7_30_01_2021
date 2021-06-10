
import userService from "../../services/user.service";
// import authService from '../../services/auth.service';

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

        updateUserAction( {commit}, data) {
            return userService.updateOneUser(data.userUuid, data)
            .then( response => {
                commit("updateUserSuccessMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "updateUserFailureMutation");
                    return Promise.reject(error);
                }                
            );
        }
    },

    mutations: {
        fetchOneUserMutation: (state, user) => state.user = user,
        errorFetchOneUser: (state) => state.user = {},

        updateUserSuccessMutation: (state, user) => state.user = user,
        updateUserFailureMutation: (state) => state.user = {},


    
    }
}