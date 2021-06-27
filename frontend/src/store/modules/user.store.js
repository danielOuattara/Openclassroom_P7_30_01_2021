
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

        updateUserAvatarMutation: (state, user) => state.user = user,
        errUpdateUserAvatarMutation: (state) => state.user = {},

        updateUserBackgroundImageMutation: (state, user) => state.user = user,
        errUpdateUserBackgroundImageMutation: (state) => state.user = {},
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

        updateUserInfosAction( {commit}, data) {
            return userService.updateUserInfos(data.userUuid, data)
            .then( response => {
                commit("updateUserInfosMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "errUpdateUserInfosMutation");
                    return Promise.reject(error);
                }                
            );
        },

        updateUserAvatarAction( {commit}, data) {
            return userService.updateUserAvatar(data.userUuid, data)
            .then( response => {
                commit("updateUserAvatarMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "errUpdateUserAvatarMutation");
                    return Promise.reject(error);
                }                
            );
        },

        updateUserBackgroundImageAction( {commit}, data) {
            return userService.updateUserBackgroundImage(data.userUuid, data)
            .then( response => {
                commit("updateUserBackgroundImageMutation");
                return Promise.resolve(response.data);
                },
                error => {
                    commit( "errUpdateUserBackgroundImageMutation");
                    return Promise.reject(error);
                }                
            );
        }
    },
}